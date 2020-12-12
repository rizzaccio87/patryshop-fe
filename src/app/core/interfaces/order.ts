export interface Order {
  id?: number;
  orderId?: number;
  cakeId?: number;
  cakeName: string;
  amount: number;
  creationTimestamp?: Date;
  price: number;
}
