import { useParams, Link } from 'wouter';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingCart, ArrowLeft, Shield, Star, Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/pricing';
import type { Product } from '@shared/schema';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    import('@/data/products.json').then((data) => {
      const productsData = data.default;
      const foundProduct = productsData.find((p: Product) => p.id === id);
      setProduct(foundProduct || null);

      if (foundProduct) {
        const related = productsData
          .filter((p: Product) => p.category === foundProduct.category && p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Product not found</p>
        <Link href="/products">
          <Button className="mt-4">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  const imageUrl = product.image.startsWith('@assets/')
    ? product.image.replace('@assets/', '/attached_assets/')
    : product.image;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/products">
        <Button variant="ghost" className="mb-6" data-testid="button-back">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
              {discountPercent}% OFF
            </Badge>
            {product.featured && (
              <Badge className="absolute top-4 left-4 text-lg px-3 py-1">
                <Star className="h-4 w-4 mr-1" />
                Featured
              </Badge>
            )}
          </div>
        </div>

        <div>
          <Badge variant="secondary" className="mb-4" data-testid="text-category">
            {product.category}
          </Badge>

          <h1 className="font-serif text-4xl font-bold mb-4" data-testid="text-product-name">
            {product.name}
          </h1>

          <div className="mb-6">
            <p className="text-2xl text-muted-foreground line-through mb-2">
              {formatPrice(product.originalPrice)}
            </p>
            <div className="flex items-baseline gap-4">
              <p className="text-4xl font-bold text-primary" data-testid="text-price">
                {formatPrice(product.discountedPrice)}
              </p>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Save {formatPrice(product.originalPrice - product.discountedPrice)}
              </Badge>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-8" data-testid="text-description">
            {product.description}
          </p>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Safety Rating: {product.safetyRating}</p>
                    <p className="text-sm text-muted-foreground">Certified safe product</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Premium Quality</p>
                    <p className="text-sm text-muted-foreground">Best materials guaranteed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-serif text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
