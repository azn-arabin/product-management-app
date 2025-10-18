'use client';

import { useRouter, useParams } from 'next/navigation';
import { useGetProductsQuery, useUpdateProductMutation } from '@/lib/api';
import { Header } from '@/components/Header';
import { ProductForm } from '@/components/ProductForm';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const product = useMemo(() => {
    return products?.find(p => p.id === productId);
  }, [products, productId]);

  const handleSubmit = async (formData: any) => {
    await updateProduct({
      id: productId,
      data: {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        images: formData.images,
      },
    }).unwrap();

    router.push('/products');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <LoadingState message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ErrorState
          message="Failed to load product. The product may not exist."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground mt-2">
            Update product information
          </p>
        </div>

        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
          mode="edit"
        />
      </main>
    </div>
  );
}
