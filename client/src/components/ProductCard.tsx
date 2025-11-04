import type { Product } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/pricing';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  const imageUrl = product.image.startsWith('@assets/')
    ? product.image.replace('@assets/', '/attached_assets/')
    : product.image;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="hover-elevate cursor-pointer h-full flex flex-col" data-testid={`card-product-${product.id}`}>
        <CardContent className="p-4 flex-1">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-md bg-muted">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Badge
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground"
              data-testid={`text-discount-${product.id}`}
            >
              {discountPercent}% OFF
            </Badge>
            {product.featured && (
              <Badge className="absolute top-2 left-2" data-testid={`badge-featured-${product.id}`}>
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <Badge variant="secondary" className="mb-2" data-testid={`text-category-${product.id}`}>
            {product.category}
          </Badge>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-testid={`text-description-${product.id}`}>
            {product.description}
          </p>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${product.id}`}>
              {formatPrice(product.originalPrice)}
            </p>
            <p className="text-2xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
              {formatPrice(product.discountedPrice)}
            </p>
            <p className="text-sm text-green-600 font-medium">
              Save {formatPrice(product.originalPrice - product.discountedPrice)}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
