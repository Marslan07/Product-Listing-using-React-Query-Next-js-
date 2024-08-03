'use client';

import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loader from './Loader';

type Product = {
  id: number;
  title: string;
  description: string;
  images: string[];
  category: string;
  price: number;
  rating: number;
  brand: string;
  stock: number;
};

// Fetch product by ID from API
const fetchProductById = async (id: number) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export default function ProductDetail({id}:any) {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {

    if (id) {
      const cachedData = queryClient.getQueryData<{ products: Product[] }>('courses');
      if (cachedData) {
        const foundProduct = cachedData.products.find((p) => p.id === Number(id));
        setProduct(foundProduct || null);
      }
    }
  }, [id, queryClient]);

  // Fetch product data if not found in cache
  const { data, error, isLoading } = useQuery(['product', id], () => fetchProductById(Number(id)), {
    enabled: !product && !!id, // Only fetch if product is not in state and id is available
  });

  useEffect(() => {
    if (data && !product) {
      setProduct(data);
    }
  }, [data, product]);

  if (isLoading) return <Loader isLoading={true}/>;
  if (error) return <p>Error loading product details</p>;

  return (
    <div className=" flex flex-col mx-auto justify-center items-center p-4 my-5">
      <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
      <Image src={`${product?.images[0]}`} width={300} height={300} alt={`${product?.title}`} loading='lazy' className="w-full max-w-md border rounded-lg" />
      <p className="mt-2">Category: {product?.category}</p>
      <p className="mt-2">Brand: {product?.brand}</p>
      <p className="mt-2">Price: ${product?.price}</p>
      <p className="mt-2">Rating: {product?.rating}</p>
      <p className="mt-4">{product?.description}</p>
      <p className="mt-4">Stock: {product?.stock}</p>
    </div>
  );
}
