export interface Comment{
    _id?: string,
    user: string,
    movie_id: string,
    desc: string,
    type: string,
    createdAt?: string,
    updatedAt?: string
}