import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { formatPrice, calculateTotals } from '@/lib/pricing';

export default function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const { subtotal, discount, total, savings } = calculateTotals(items);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to get started!
            </p>
            <Link href="/products">
              <Button data-testid="button-continue-shopping">Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold mb-8" data-testid="text-page-title">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const imageUrl = item.product.image.startsWith('@assets/')
              ? item.product.image.replace('@assets/', '/attached_assets/')
              : item.product.image;

            return (
              <Card key={item.productId} data-testid={`card-item-${item.productId}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      <img
                        src={imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between gap-4 mb-2">
                        <Link href={`/products/${item.productId}`}>
                          <h3
                            className="font-semibold text-lg hover:text-primary cursor-pointer"
                            data-testid={`text-item-name-${item.productId}`}
                          >
                            {item.product.name}
                          </h3>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.productId)}
                          data-testid={`button-remove-${item.productId}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {item.product.category}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            data-testid={`button-decrease-${item.productId}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span
                            className="text-lg font-semibold w-12 text-center"
                            data-testid={`text-quantity-${item.productId}`}
                          >
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            data-testid={`button-increase-${item.productId}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.product.originalPrice * item.quantity)}
                          </p>
                          <p
                            className="text-xl font-bold text-primary"
                            data-testid={`text-item-total-${item.productId}`}
                          >
                            {formatPrice(item.product.discountedPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span data-testid="text-subtotal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>You save (90% OFF):</span>
                <span>-{formatPrice(discount)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-primary" data-testid="text-total">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Use code <span className="font-bold">DEMO50</span> at checkout for 50% extra off!
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Link href="/checkout" className="w-full">
                <Button className="w-full" size="lg" data-testid="button-checkout">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/products" className="w-full">
                <Button variant="outline" className="w-full" data-testid="button-continue">
                  Continue Shopping
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
