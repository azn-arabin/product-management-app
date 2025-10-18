'use client';

import { useRouter } from 'next/navigation';
import { useCreateProductMutation } from '@/lib/api';
import { Header } from '@/components/Header';
import { ProductForm } from '@/components/ProductForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (formData: any) => {
    await createProduct({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      categoryId: formData.categoryId,
      images: formData.images,
    }).unwrap();

    router.push('/products');
  };

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
          <h1 className="text-3xl font-bold">Create New Product</h1>
          <p className="text-muted-foreground mt-2">
            Add a new product to your inventory
          </p>
        </div>

        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} mode="create" />
      </main>
    </div>
  );
}
