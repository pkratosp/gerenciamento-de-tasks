export { default } from "next-auth/middleware"

// garante também a atutenticação do painel
export const config = { matcher: ["/home"] }