import { OrderProduct, Shop } from "@prisma/client";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl: string;
    discount: number;  // Default is 0.0 if not provided
    shopId: number;  // Foreign key to the Shop
    shop: Shop;  // Reference to the Shop object
    orders: OrderProduct[];  // Array of OrderProduct objects related to this product
  }
  