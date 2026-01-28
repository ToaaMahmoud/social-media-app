import bcrypt from "bcrypt"

interface HashOptions{
    password: string;
    saltRound?: number
}
interface CompareOptions{
    password: string;
    hashedPassword: string;
}

export const hashPassword = async({password="", saltRound = Number(process.env.SALT_ROUND) || 10}: HashOptions): Promise<string> =>{
    return await bcrypt.hash(password, saltRound)
}

export const comparePassword = async({password="", hashedPassword} : CompareOptions) :Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}