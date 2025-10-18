'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useGetProductBySlugQuery, useDeleteProductMutation } from '@/lib/api';
import { Header } from '@/components/Header';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Calendar, Tag, ImageOff, ZoomIn } from 'lucide-react';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productSlug = params.slug as string;

  const { data: product, isLoading, error, refetch } = useGetProductBySlugQuery(productSlug);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    if (!product) return;

    try {
      await deleteProduct(product.id).unwrap();
      router.push('/products');
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
          message="Failed to load product details. The product may not exist."
          onRetry={refetch}
        />
      </div>
    );
  }

  const currentImage = product.images && product.images.length > 0 ? product.images[selectedImage] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:px-6 lg:py-12 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div 
              className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-muted via-muted/80 to-muted/50 border shadow-lg"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {currentImage && !imageError ? (
                <>
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-300 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    style={{
                      transformOrigin: isZoomed ? `${mousePosition.x}% ${mousePosition.y}%` : 'center',
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                  {/* Zoom Indicator */}
                  {!isZoomed && (
                    <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md">
                      <ZoomIn className="h-5 w-5 text-foreground/60" />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-full items-center justify-center flex-col gap-3">
                  <ImageOff className="h-16 w-16 text-muted-foreground/40" />
                  <span className="text-sm font-medium text-muted-foreground/60">No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(index);
                      setImageError(false);
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === index
                        ? 'border-primary ring-2 ring-primary/20 shadow-md'
                        : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {product.name}
                  </h1>
                  <Badge variant="secondary" className="mb-4 text-sm">
                    <Tag className="mr-1.5 h-3.5 w-3.5" />
                    {product.category.name}
                  </Badge>
                </div>
              </div>
              
              <div className="text-4xl md:text-5xl font-bold text-primary mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link href={`/products/${product.slug}/edit`} className="flex-1">
                <Button className="w-full shadow-md hover:shadow-lg transition-all" size="lg">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Product
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="lg"
                onClick={() => setDeleteConfirmOpen(true)}
                className="shadow-md hover:shadow-lg transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Description Card */}
            <Card className="shadow-md border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card className="shadow-md border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm font-medium">Product ID</span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {product.id.slice(0, 8)}...
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm font-medium">Slug</span>
                  <span className="text-sm text-primary font-mono">
                    {product.slug}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm font-medium flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Created
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(product.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Last Updated
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(product.updatedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Category Details */}
            {product.category.description && (
              <Card className="shadow-md border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">Category Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    {product.category.image && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border">
                        <Image
                          src={product.category.image}
                          alt={product.category.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                          unoptimized
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold mb-1.5 text-lg">{product.category.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {product.category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={isDeleting}
      />
    </div>
  );
}
