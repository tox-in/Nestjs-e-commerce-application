/* eslint-disable prettier/prettier */
import { User } from './user';
import { Product } from './product';

interface ProductOrder {
  product: Product;
  quantinty: number;
}

export interface Order extends Document {
  owner: User;
  totalPrice: number;
  products: ProductOrder[];
  created: Date;
}
