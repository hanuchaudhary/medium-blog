import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

export const createBlogInput = z.object({
    title: z.string().min(10).max(200),
    content: z.string().min(20),
    shortDescription: z.string().min(10),
});

export type CreateBlogType = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export type UpdateBlogType = z.infer<typeof updateBlogInput>;