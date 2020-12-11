export interface Order {
  orderId?: number;
  cakeId?: number;
  cakeName: string;
  amount: number;
  creationTimestamp?: Date;
  price: number;
}
