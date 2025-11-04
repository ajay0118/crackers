import type { CartItem } from '@shared/schema';

export const COUPON_CODE = 'DEMO50';
export const COUPON_DISCOUNT = 0.5;
export const FREE_SHIPPING_THRESHOLD = 999;

export interface PricingTotals {
  subtotal: number;
  discount: number;
  couponDiscount: number;
  total: number;
  savings: number;
}

export function calculateTotals(
  items: CartItem[],
  couponCode?: string
): PricingTotals {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  const discount = items.reduce(
    (sum, item) =>
      sum + (item.product.originalPrice - item.product.discountedPrice) * item.quantity,
    0
  );

  const couponDiscount =
    couponCode?.toUpperCase() === COUPON_CODE ? subtotal * COUPON_DISCOUNT : 0;

  const total = subtotal - couponDiscount;

  const savings = discount + couponDiscount;

  return {
    subtotal,
    discount,
    couponDiscount,
    total,
    savings,
  };
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
