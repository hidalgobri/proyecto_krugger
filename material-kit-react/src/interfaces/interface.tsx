export interface ProductInterface{
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface OrderItemInterface {
  id: string|null;
  items: OrderProductItem[];
}

export interface OrderProductItem {
  id: string|null;
  quantity: number;
  product: ProductInterface;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface OrderItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface User {
  id: string;
  username: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  user: User;
}

