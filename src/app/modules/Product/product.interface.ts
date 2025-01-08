import { OrderProduct, Shop, User } from "@prisma/client";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  thumbnailImage: string;
  additionalImages: string[];
  discount: number; // Regular discount, default is 0.0 if not provided
  shopId: string; // Foreign key to the Shop
  shop: Shop; // Reference to the Shop object
  orders: OrderProduct[]; // Array of OrderProduct objects related to this product

  // Flash Sale Fields
  flashSaleIsActive: boolean; // Whether the flash sale is active
  flashSaleDiscount: number; // Discount percentage during flash sale
  flashSaleStartTime: Date | null; // Start time of the flash sale
  flashSaleEndTime: Date | null; // End time of the flash sale

  // New fields for reviews and ratings
  reviews: Review[]; // Array of Review objects related to this product
  averageRating: number; // Average rating for the product, default is 0.0
}

export interface Review {
  id: string;
  userId: string; // Foreign key to the User
  user: User; // Reference to the User object
  productId: string; // Foreign key to the Product
  comment: string; // Review comment
  rating: number; // Rating given by the user (e.g., 1 to 5)
  createdAt: Date; // Timestamp when the review was created
}
