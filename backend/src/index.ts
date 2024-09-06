import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/api/v1/signup", (c) => {
  return c.json({
    msg: "signup"
  })
})

app.post("/api/v1/signin", (c) => {
  return c.json({
    msg: "signin"
  })
})

app.post("/api/v1/blog", (c) => {
  return c.json({
    msg: "signin"
  })
})

app.put("/api/v1/blog", (c) => {
  return c.json({
    msg: "signin"
  })
})

app.get("/api/v1/blog/:id", (c) => {
  return c.json({
    msg: "signin"
  })
})

export default app
