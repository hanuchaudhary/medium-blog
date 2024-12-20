import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from '@hanuchaudhary/medium-app'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
        GOOGLE_API_KEY: string,
    },
    Variables: {
        userId: string,
    },
}>();

//middleware 
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";

    try {
        const userVerify = await verify(authHeader, c.env.JWT_SECRET);

        if (userVerify) {
            c.set("userId", userVerify.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({ msg: "Invalid token!!!" });
        }

    } catch (err) {
        c.status(403);
        return c.json({ msg: "Invalid or expired token!!!" });
    }
});

//create blog route--
blogRouter.post("/create", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" });
    }

    const authorId = c.get("userId")
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            shortDescription: body.shortDescription,
            authorId: authorId
        },
        select: {
            author: {
                select: {
                    blog: true,
                    name: true, email: true
                }
            },
            title: true,
            content: true,
            shortDescription: true,
            id: true,
            publishedAt: true
        }
    })

    return c.json({ msg: "Create blog post", blog: blog }
    );

});


//update blog route
blogRouter.put("/update", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" });
    }

    const updateBlog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({ msg: "Update blog post", updatedTitle: updateBlog.title });
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL,
            },
        },
    }).$extends(withAccelerate());

    try {
        const filter = c.req.query("filter") || "";
        console.log("Filter:", filter);
        // const allBlogs = await prisma.blog.findMany();
        const blogs = await prisma.blog.findMany({
            where: {
                OR: [
                    { title: { contains: filter, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                title: true,
                content: true,
                shortDescription: true,
                publishedAt: true,
                author: {
                    select: {
                        email: true,
                        blog: true,
                        id: true,
                        name: true,
                    }
                }
            },
            orderBy: {
                publishedAt: "desc"
            }
        });

        console.log("Filtered Blogs:", blogs);
        return c.json({
            success: true,
            message: "Blogs Retrieved Successfully!!!",
            blogs
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({
            success: false,
            message: "Failed to Retrieve Blogs!!!",
            error: error,
        }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

//get single blog via id--
blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id");
    try {
        const getBlog = await prisma.blog.findFirst({
            where: {
                id: String(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (!getBlog) {
            c.status(400);
            c.json({
                msg: "No blog found!!"
            })
        }
        return c.json({ blog: getBlog });
    } catch (error) {
        c.status(411);
        c.json({ err: error })
    }
});

//delete blog route--
blogRouter.delete("/delete", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        const delBlog = await prisma.blog.delete({
            where: {
                id: body.id,
            },
        });

        c.status(200);
        return c.json({
            message: "Blog Deleted!!",
            deletedBlogTitle: delBlog.title,
        });
    } catch (error) {
        c.status(400);
        return c.json({
            message: "Error while deleting Blog!!",
            error: error
        });
    }
});


blogRouter.post("/generate-content", async (c) => {
    const genAI = new GoogleGenerativeAI(c.env.GOOGLE_API_KEY);

    const body = await c.req.json();
    const prompt = body.prompt;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(response);

        console.log(text);


        c.status(200);
        return c.json({
            message: "Content generated successfully!!",
            content: text
        });
    } catch (error) {
        c.status(400);
        return c.json({
            message: "Error while generating content!!",
            error: error
        });
    }
});

// blogRouter.delete("/deletemany", async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate());

//     try {
//         await prisma.blog.deleteMany({
//             where: {
//                 author: {
//                     email: { contains: "@" }
//                 }
//             }
//         });

//         c.status(200);
//         return c.json({
//             message: "Blog Deleted!!"
//         });
//     } catch (error) {
//         c.status(400);
//         return c.json({
//             message: "Error while deleting Blog!!",
//             error: error
//         });
//     }
// });

