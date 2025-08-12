'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsClient({ products }) {
  // render directly from SSR props
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>
            <Image src={product.images[0]}  width={500} height={300} alt={product.title} />          
          {product.title}</Link>
        </li>
      ))}
    </ul>
  );
}
