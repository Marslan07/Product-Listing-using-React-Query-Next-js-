// app/product/[id]/page.tsx or pages/product/[id].tsx

import ProductDetail from "@/component/ProductDetails";
import React from "react";
export async function generateMetadata({ params }: any) {
  return {
    title: `Product ${params.id}`,
    description: `Details of product with ID ${params.id}`,
  };
}

// Main component export
export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetail id={params.id} />;
}
