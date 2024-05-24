import { User } from "./user";

export interface Comment{
    _id?: string,
    userId: User ,
    movie_id: string,
    desc: string,
    type: string,
    replies?:any,
    createdAt?: string,
    updatedAt?: string
}