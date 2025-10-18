'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, ImageOff } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onDelete: (product: Product) => void;
}

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VmZjFmMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0ZTZlNWQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center flex-col gap-3 bg-gradient-to-br from-muted via-muted/80 to-muted/50">
              <ImageOff className="h-14 w-14 text-muted-foreground/40" />
              <span className="text-sm font-medium text-muted-foreground/60">No image available</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="font-medium">
            {product.category.name}
          </Badge>
          <p className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/products/${product.slug}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full group/btn">
            <Eye className="mr-2 h-4 w-4 group-hover/btn:text-primary transition-colors" />
            View
          </Button>
        </Link>
        <Link href={`/products/${product.slug}/edit`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full group/btn">
            <Edit className="mr-2 h-4 w-4 group-hover/btn:text-secondary transition-colors" />
            Edit
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(product)}
          className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
