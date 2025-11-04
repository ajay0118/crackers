import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Invoice } from '@/components/Invoice';
import { CheckCircle } from 'lucide-react';
import type { Order } from '@shared/schema';

export default function OrderConfirmation() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground mb-4">No order found</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h1 className="font-serif text-4xl font-bold mb-2" data-testid="text-success-message">
            Order Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-sm text-muted-foreground">
            Order ID: <span className="font-bold" data-testid="text-order-id">{order.id}</span>
          </p>
        </CardContent>
      </Card>

      <div className="mb-8">
        <Invoice order={order} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/products">
          <Button variant="outline" data-testid="button-continue-shopping">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/">
          <Button data-testid="button-home">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
