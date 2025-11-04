import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, Shield, Truck, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '@shared/schema';
import heroImage from '@assets/generated_images/Hero_festive_fireworks_display_248554a9.png';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    import('@/data/products.json').then((data) => {
      const productsData = data.default;
      setProducts(productsData.slice(0, 8));
      setFeaturedProducts(productsData.filter((p: Product) => p.featured).slice(0, 3));
    });
  }, []);

  return (
    <div>
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        data-testid="section-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
            Light Up Your Celebrations
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Premium Fireworks & Crackers with 90% OFF Storewide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-primary/90 backdrop-blur-md border border-primary-border"
                data-testid="button-shop-now"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-background/20 backdrop-blur-md text-white border-white/30 hover:bg-background/30"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <Shield className="h-12 w-12 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">100% Certified</h3>
                <p className="text-sm text-muted-foreground">Safety guaranteed products</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Truck className="h-12 w-12 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Award className="h-12 w-12 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Trusted by thousands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">
              Handpicked premium crackers for your celebrations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Best Sellers</h2>
            <p className="text-muted-foreground text-lg">
              Most popular items this season
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" data-testid="button-view-all">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Special Offer: 50% Extra Off!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Use coupon code <span className="font-bold text-primary">DEMO50</span> at checkout to get an additional 50% off on your discounted total
              </p>
              <Link href="/products">
                <Button size="lg" data-testid="button-shop-special">
                  Shop Now & Save
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
