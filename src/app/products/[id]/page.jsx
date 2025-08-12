import React from 'react'
import { makeStore } from "../../../../store/store";
import { api } from "../../../../store/api";
import Image from 'next/image';



export async function generateMetadata({ params }) {
    // Create a server-only store
    const store = makeStore({}, { isServer: true });

    // Prefetch product
    const res = await store.dispatch(
        api.endpoints.getProduct.initiate(params.id)
    );

    const product = res.data || {};

    return {
        title: product.title || "Product",
        description: product.description || "",
        openGraph: {
            title: product.title || "Product",
            description: product.description || "",
            images: product.images && product.images.length > 0 ? [
                {
                    url: product.images[0],
                    width: 500,
                    height: 300,
                    alt: product.title || "Product"
                }
            ] : undefined,
        },
    };
}


const page = async ({ params }) => {

    const store = makeStore({}, { isServer: true });
    const res = await store.dispatch(api.endpoints.getProduct.initiate(params.id));


    if (res.isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <Image src={res.data.images[0]} width={500} height={300} alt={res.data.title} />
            {res.data.title} </div>
    )
}

export default page