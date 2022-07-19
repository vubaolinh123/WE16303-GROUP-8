import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import useProduct from '../../hooks/use-product'

type ProductProps = {
    product: any[]
}

const Product = ({ product }: ProductProps) => {
    const { data, error, create } = useProduct()
    if (!data) return <div>Loading...</div>;
    if (error) return <div>Failed to load</div>;


    return (
        <div>
            {data.map((item: any) => (
                <div key={item.id}>
                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                </div>
            ))}

            <button onClick={() => create({ name: "Product F" })}>Add Product</button>
        </div>
    )
}

// Server 
// export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
//     const response = await fetch(`https://6110f09bc38a0900171f0ed0.mockapi.io/products`);
//     const data = await response.json();
//     return {
//         props: {
//             product: data
//         }
//     }
// }

export default Product