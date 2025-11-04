import { Invoice } from '../Invoice';
import type { Order } from '@shared/schema';

export default function InvoiceExample() {
  const sampleOrder: Order = {
    id: 'ORD-2024-001',
    items: [
      {
        productId: '1',
        quantity: 2,
        product: {
          id: '1',
          name: 'Premium Red Crackers',
          description: 'Traditional red firecrackers',
          category: 'Crackers',
          originalPrice: 2000,
          discountedPrice: 200,
          image: '',
          inStock: true,
        },
      },
      {
        productId: '2',
        quantity: 1,
        product: {
          id: '2',
          name: 'Golden Sparkler Box',
          description: 'Premium golden sparklers',
          category: 'Sparklers',
          originalPrice: 1500,
          discountedPrice: 150,
          image: '',
          inStock: true,
        },
      },
    ],
    subtotal: 550,
    discount: 4950,
    couponCode: 'DEMO50',
    total: 275,
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    shippingAddress: '123 Main St, Mumbai, Maharashtra 400001',
    orderDate: new Date().toISOString(),
  };

  return (
    <div className="p-8 max-w-4xl">
      <Invoice order={sampleOrder} />
    </div>
  );
}
