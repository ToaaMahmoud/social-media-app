import jwt, { SignOptions } from "jsonwebtoken";
import { AppError } from "../error-handling/app-error";
import {
  IUserDocument,
  UserRoles,
} from "../../interfaces/db-interfaces/user.db.interface";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new AppError(
    "ERROR: JWT_SECRET must be defined in .env and at least 32 characters long",
    500,
  );
}

export interface TokenPayload {
  id: string;
  role: UserRoles;
}
interface GenerateTokenParams {
  payload: TokenPayload;
  options?: SignOptions;
}

export const generateToken = ({
  payload,
  options = { expiresIn: "1h" },
}: GenerateTokenParams): string => {
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
  if (!token) {
    throw new AppError("Token is required", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    if (!decoded.id || !decoded.role) {
      throw new AppError("Invalid token payload", 401);
    }

    return decoded;
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
};

export const generateTokens = (user: IUserDocument) => {
  const access_token: string = generateToken({
    payload: { id: user._id.toString(), role: user.role },
    options: {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRE ||
        "15m") as SignOptions["expiresIn"],
    },
  });

  const refresh_token = generateToken({
    payload: { id: user._id.toString(), role: user.role },
    options: {
      expiresIn: (process.env.REFRESH_TOKEN_EXPIRE ||
        "7d") as SignOptions["expiresIn"],
    },
  });

  return { access_token, refresh_token };
};
