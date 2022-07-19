import useSWR, { useSWRConfig } from "swr";
import { add, getAll } from "../api/product";

const useProduct = () => {
    // swr - api
    const { mutate } = useSWRConfig();
    const fetcher = async (url: string) => {
        const { data } = await getAll(url);
        return data;
    };

    const { data, error } = useSWR("/products", fetcher, {
        dedupingInterval: 5000,
    });

    // create
    const create = async (item: any) => {
        mutate("/products", async () => {
            const { data: product } = await add(item);
            return [...data, product];
        });
    };
    // update
    const update = async (item: any) => {
        mutate("/products", async () => {
            const { data: product } = await add(item);
            return [...data, product];
        });
    };
    // delete

    return {
        create,
        // update,
        // delete,
        data,
        error,
    };
}

export default useProduct