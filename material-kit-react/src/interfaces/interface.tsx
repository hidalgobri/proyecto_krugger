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

