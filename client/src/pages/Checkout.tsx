import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/lib/CartContext';
import { formatPrice, calculateTotals, COUPON_CODE } from '@/lib/pricing';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tag } from 'lucide-react';
import type { Order } from '@shared/schema';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | undefined>();
  const [couponError, setCouponError] = useState('');

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
    },
  });

  const pricing = calculateTotals(items, appliedCoupon);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === COUPON_CODE) {
      setAppliedCoupon(couponCode);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(undefined);
    }
  };

  const onSubmit = (data: CheckoutForm) => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items,
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      couponCode: appliedCoupon,
      total: pricing.total,
      customerName: data.name,
      customerEmail: data.email,
      shippingAddress: `${data.address}, ${data.city}, ${data.zipCode}`,
      orderDate: new Date().toISOString(),
    };

    localStorage.setItem('lastOrder', JSON.stringify(order));
    clearCart();
    setLocation('/order-confirmation');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => setLocation('/products')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold mb-8" data-testid="text-page-title">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} data-testid="input-address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-city" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-zip" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" data-testid="button-place-order">
                    Place Order
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="truncate mr-2">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="whitespace-nowrap">
                      {formatPrice(item.product.discountedPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span data-testid="text-subtotal">{formatPrice(pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount (90% OFF):</span>
                  <span>-{formatPrice(pricing.discount)}</span>
                </div>
                {pricing.couponDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon ({appliedCoupon}):</span>
                    <span>-{formatPrice(pricing.couponDiscount)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary" data-testid="text-total">
                    {formatPrice(pricing.total)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="mb-2 block">Coupon Code</Label>
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError('');
                    }}
                    placeholder="Enter code"
                    disabled={!!appliedCoupon}
                    data-testid="input-coupon"
                  />
                  {appliedCoupon ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAppliedCoupon(undefined);
                        setCouponCode('');
                      }}
                      data-testid="button-remove-coupon"
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      data-testid="button-apply-coupon"
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {couponError && (
                  <p className="text-sm text-destructive mt-1">{couponError}</p>
                )}
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-1">Coupon applied successfully!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
