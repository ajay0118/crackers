import { ProductCard } from '../ProductCard';
import { CartProvider } from '@/lib/CartContext';
import type { Product } from '@shared/schema';

export default function ProductCardExample() {
  const sampleProduct: Product = {
    id: '1',
    name: 'Premium Red Crackers',
    description: 'Traditional red firecrackers with golden patterns. Safe and certified for family celebrations.',
    category: 'Crackers',
    originalPrice: 2000,
    discountedPrice: 200,
    image: '@assets/generated_images/Red_firecracker_product_shot_2c811400.png',
    inStock: true,
    featured: true,
    safetyRating: 'A+',
  };

  return (
    <CartProvider>
      <div className="p-8 max-w-sm">
        <ProductCard product={sampleProduct} />
      </div>
    </CartProvider>
  );
}
