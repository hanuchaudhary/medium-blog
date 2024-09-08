import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });

        const token = await sign({ id: user.id, email: user.email }, c.env.JWT_SECRET);
        return c.json({ token: token, email: user.email });

    } catch (error) {
        if (error) {
            return c.json({ error: 'Email already exists' }, 400);
        }

        return c.json({
            error: 'User creation failed!!',
            message: 'An error occurred'
        }, 500);
    }
});

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });


    if (!user) {
        c.status(401);
        return c.json({ error: "User Not Found!!!" });
    }

    const unhashPassword = await bcrypt.compare(body.password, user.password);
    if (!unhashPassword) {
        c.status(400);
        c.json({ error: " Invalid Credentials!!!" })
    }

    const token = await sign({ id: user.id, email: user.email }, c.env.JWT_SECRET);

    return c.json({ token });
});

