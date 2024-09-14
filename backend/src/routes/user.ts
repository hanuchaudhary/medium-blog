import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';
import { signupInput, signinInput } from '@hanuchaudhary/medium-app'
import { Jwt } from "hono/utils/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    //jwt validation
    const { success, error } = signupInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: "Zod Validation error!!!",
            error: error
        });
    }


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
    const { success, error } = signinInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ message: "invalid input", error: error });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        }
    });

    if (!user) {
        c.status(401);
        return c.json({ error: "User Not Found!!!" });
    }

    const unhashPassword = await bcrypt.compare(body.password, user.password);
    if (!unhashPassword) {
        c.status(400);
        return c.json({ error: " Invalid Credentials!!!" })
    }

    const token = await sign({ id: user.id, email: user.email }, c.env.JWT_SECRET);

    return c.json({ token: token, email: user.email });
});

userRouter.get("/me", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {

        const authHeader = c.req.header("Authorization") || ""
        if (!authHeader) {
            c.status(401);
            return c.json({
                message: "No Auth Header!"
            })
        }

        const jwtVerify = Jwt.decode(authHeader);

        const profile = await prisma.user.findUnique({
            where: {
                id: jwtVerify.payload.id as string
            },
            select: {
                name: true,
                email: true,
                blog: true
            }
        })

        return c.json({ user: profile });
    } catch (error) {
        c.json({
            error: error
        })
    }

})

userRouter.post("/removeuser", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const authHeader =  c.req.header("Authorization") || "" ;
        const decodeUser =  Jwt.decode(authHeader);
        const user = await prisma.user.delete({
            where : {
                id : decodeUser.payload.id as string
            },
            select : {
                id: true,
                email: true
            }
        })
        return c.json({ delUser: user.email });
    } catch (error) {
        c.json({
            error: error
        })
    }
})

// userRouter.get("/users", async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate())

//     const users = await prisma.user.findMany();
//     return c.json({
//         users : users
//     })
// })
