import type { Order } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { formatPrice } from '@/lib/pricing';
import { useRef } from 'react';

interface InvoiceProps {
  order: Order;
}

export function Invoice({ order }: InvoiceProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!invoiceRef.current) return;

    const invoiceHtml = invoiceRef.current.innerHTML;
    const blob = new Blob(
      [
        `<!DOCTYPE html>
<html>
<head>
  <title>Invoice ${order.id}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #f5f5f5; }
    .total { font-weight: bold; font-size: 1.2em; }
  </style>
</head>
<body>
  ${invoiceHtml}
</body>
</html>`,
      ],
      { type: 'text/html' }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${order.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('Invoice downloaded');
  };

  return (
    <Card data-testid="card-invoice">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Invoice #{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Date: {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
          <Button onClick={handleDownload} data-testid="button-download-invoice">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>

      <CardContent ref={invoiceRef}>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">From:</h3>
              <p className="text-sm">
                <strong>ATM Crackers</strong>
                <br />
                123 Fireworks Lane
                <br />
                Mumbai, Maharashtra 400001
                <br />
                India
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">To:</h3>
              <p className="text-sm" data-testid="text-customer-name">
                <strong>{order.customerName}</strong>
                <br />
                {order.customerEmail}
                <br />
                {order.shippingAddress}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Order Items:</h3>
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-right">Qty</th>
                    <th className="p-3 text-right">Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b" data-testid={`row-item-${index}`}>
                      <td className="p-3">{item.product.name}</td>
                      <td className="p-3 text-right">{item.quantity}</td>
                      <td className="p-3 text-right">
                        {formatPrice(item.product.discountedPrice)}
                      </td>
                      <td className="p-3 text-right">
                        {formatPrice(item.product.discountedPrice * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span data-testid="text-subtotal">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span>Discount (90% OFF):</span>
                <span className="text-green-600">-{formatPrice(order.discount)}</span>
              </div>
            )}
            {order.couponCode && (
              <div className="flex justify-between text-sm">
                <span>Coupon ({order.couponCode}):</span>
                <span className="text-green-600">
                  -{formatPrice(order.subtotal - order.total)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total:</span>
              <span className="text-primary" data-testid="text-total">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
