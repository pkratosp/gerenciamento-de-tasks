import Fastify from "fastify"
import cors from "@fastify/cors"
import fastidyJWT from "@fastify/jwt"
import { env } from "./env/env" // variaveis de ambiente
import { ZodError } from "zod"

// rotas
import { appRouteTask } from "./http/controllers/task/routes"
import { appRouteAutentication } from "./http/controllers/authentication/routes"


// TODO
// falantando seed - []
// faltando rotas - [x]

export const app = Fastify({
    logger: env.NODE_ENV === "dev" ? true : false
})

app.register(cors, {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    origin: "*",
    logLevel: "debug",
})

app.register(fastidyJWT, {
    secret: env.AUTH_SECRET_TOKEN
})

app.register(appRouteTask)
app.register(appRouteAutentication)


app.setErrorHandler((error, _, reply) => {

    if (env.NODE_ENV !== "production") {
        console.error(error)
    }

    if (error instanceof ZodError) {
        return reply.status(400).send({
            success: false,
            hasError: true,
            error: error.format(),
            data: null
        })
    } else {
        return reply.status(500).send({
            success: false,
            hasError: true,
            error: "Erro do Servidor Interno",
            data: null
        })
    }

})