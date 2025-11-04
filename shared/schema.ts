import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  originalPrice: z.number(),
  discountedPrice: z.number(),
  image: z.string(),
  inStock: z.boolean(),
  featured: z.boolean().optional(),
  safetyRating: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  product: productSchema,
});

export type CartItem = z.infer<typeof cartItemSchema>;

export const orderSchema = z.object({
  id: z.string(),
  items: z.array(cartItemSchema),
  subtotal: z.number(),
  discount: z.number(),
  couponCode: z.string().optional(),
  total: z.number(),
  customerName: z.string(),
  customerEmail: z.string(),
  shippingAddress: z.string(),
  orderDate: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
