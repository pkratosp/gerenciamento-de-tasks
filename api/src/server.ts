import { app } from "./app"
import { env } from "./env/env"

app.listen({
    port: env.PORT,
    host: env.HOST
}).then(() => {
    console.log("Servidor rodando na porta 3333...")
    console.log("htttp://localhost:3333/")
    console.log("Documentação da API htttp://localhost:3333/docs")
})