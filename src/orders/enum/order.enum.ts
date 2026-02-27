export enum OrderStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

export const OrderStatusList = [
  OrderStatus.PENDING,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];
