'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/stores/useCartStore'
import { toast } from 'sonner'
import { Star, ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.title} added to cart!`)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className={`group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${className}`}>
        <CardContent className="p-4">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>

            <h3 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-gray-100">
              {product.title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                ${product.price.toFixed(2)}
              </span>

              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
