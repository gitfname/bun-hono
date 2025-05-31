import "reflect-metadata"
import { Hono } from 'hono'
import { sign, verify } from "hono/jwt"
import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"
import { plainToInstance } from "class-transformer"
import { UsersSerializer } from "./users.serializer"

const app = new Hono()

const JWT_SECRET = "hello world"

const authMiddleware = createMiddleware<{
  Variables: {
    user: {
      id: number,
      username: string
    }
  }
}>(async (c, next) => {
  const token = c.req.header("Authorization")?.split?.(" ")?.[1] || ""

  if (!token) throw new HTTPException(400, { message: "token not found" });

  try {
    await verify(token, JWT_SECRET)
  } catch (error) {
    throw new HTTPException(403, { message: "invalid token" })
  }

  c.set("user", {
    id: 1,
    username: "user 1"
  })

  next()
})



app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/users", authMiddleware, c => {
  const users = Array.from({ length: 50 }).map((_, index) => ({
    id: index,
    username: "user " + index,
    firstName: "user " + index + " firstName",
    lastName: "user " + index + " lastName",
    createdAt: new Date().toISOString(),
    password: "937rbc97r7813tv0rc138v175v8"
  }))

  return c.json(plainToInstance(UsersSerializer, users))
})

app.get("/login", async c => {
  const token = await sign(
    {
      message: "this is your jwt payload",
      exp: Math.floor(Date.now() / 1000) + 60 * 30
    },
    JWT_SECRET
  )
  return c.text(token)
})

app.get("/my-profile", authMiddleware, c => {
  return c.json(c.get("user"))
})

export default app
