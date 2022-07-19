import instance from "./config";

export const getAll = (url: string) => {
    return instance.get(url);
};
export const add = (product: any) => {
    return instance.post("/products", product);
};
