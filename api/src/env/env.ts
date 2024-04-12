import { z } from "zod"

const envSchema = z.object({
    NODE_ENV: z.enum(["dev","production"]).default("dev"),
    PORT: z.coerce.number().default(3333),
    HOST: z.string().default("0.0.0.0"),
    DATABASE_URL: z.string().default("mysql://johndoe:randompassword@localhost:3306/mydb"),
    AUTH_SECRET_TOKEN: z.string()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.log("Variaveis de ambiente invalidas ❌", _env.error.format())
    throw new Error("Variaveis de ambiente invalidas ❌")
}

export const env = _env.data