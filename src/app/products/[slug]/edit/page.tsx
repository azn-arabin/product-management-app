'use client';

import { useRouter, useParams } from 'next/navigation';
import { useGetProductBySlugQuery, useUpdateProductMutation } from '@/lib/api';
import { Header } from '@/components/Header';
import { ProductForm } from '@/components/ProductForm';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductFormData } from '@/lib/types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productSlug = params.slug as string;

  const { data: product, isLoading, error, refetch } = useGetProductBySlugQuery(productSlug);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleSubmit = async (formData: ProductFormData) => {
    if (!product) return;
    
    await updateProduct({
      id: product.id,
      data: {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        images: formData.images,
      },
    }).unwrap();

    router.push(`/products/${product.slug}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        <LoadingState message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        <ErrorState
          message="Failed to load product. The product may not exist."
          statusCode={'status' in (error || {}) ? (error as { status: number }).status : undefined}
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:px-6 lg:py-12 max-w-4xl">
        <div className="mb-8">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Product
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Edit Product
          </h1>
          <p className="text-muted-foreground mt-2">
            Update product information for <span className="font-medium text-foreground/80">{product.name}</span>
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
