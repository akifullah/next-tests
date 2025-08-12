import React from 'react'
import { makeStore } from '../../../store/store'
import { api } from '../../../store/api'
import ProductsClient from './ProductsClient';
const page = async () => {
    const store = makeStore({}, { isServer: true });

    const data = await store.dispatch(api.endpoints.getProducts.initiate()).unwrap();


    return <ProductsClient products={data.products} initialState={store.getState()} />;
}

export default page