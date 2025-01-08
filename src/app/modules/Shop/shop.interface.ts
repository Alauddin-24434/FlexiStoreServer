import { TUser } from "../Auth/auth.interface";
import { Product } from "../Product/product.interface";

export interface Shop {
    id: string;
    name: string;
    logo?: string;  // Optional logo URL
    description: string;
    vendorId: string;  // ID of the vendor (user)
    vendor: TUser;  // Reference to the vendor (user) object
    products: Product[];  // Array of products associated with this shop
  }
  