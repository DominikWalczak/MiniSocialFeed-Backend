import type { NextFunction, Response } from "express";
import _ from 'lodash';
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { db } from "../db/db.js";
import { PostCreateSchema, PostSchema } from "../utils/schemas/post.js";

interface PostResponse{
    id: number;
    authorId: number;
    content: string;
    createdAt: Date;
}

type PostResponseList = PostResponse[]

class PostController {

    public getList = async (req: AuthRequest, res: Response<PostResponseList>, next: NextFunction) => {
        try {
            if (!req.user) throw { message: "Id wasnt passed", status: 401};

            const result = await db.post.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
            });

            const listCheck = PostSchema.safeParse(result);

            if (!listCheck.success) throw { message: listCheck.error.message, status: 404}

            res.status(200).json(listCheck.data);
        } catch (error) {
            next(error);
        }
    }

    public post = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {   
            if (!req.user) throw { message: "Id wasnt passed", status: 401};
            if (!req.body) throw { message: "Data wasnt provided", status: 400};

            const post = {content: req.body.content, id: req.user.userId};

            const contentCheck = PostCreateSchema.safeParse(post);

            if (!contentCheck.success) throw { message: contentCheck.error.message, status: 400}

            const result = await db.post.create({
                data: {
                    authorId: contentCheck.data.id,
                    content: contentCheck.data.content,
                }
            });


            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    public deletePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user) throw { message: "Id wasnt passed", status: 401};
            const id: number = Number(req.user.userId);
            const paramId: number = Number(req.params.id);

            const result = await db.post.deleteMany({
                where: {
                    id: paramId,
                    authorId: id,
                }
            });

            if (result.count === 0) {
            throw { 
                message: "Post not found or you do not have permission to delete it", 
                status: 403 
            };
        }

            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}

export const postController = new PostController();