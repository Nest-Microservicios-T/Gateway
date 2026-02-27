import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class StatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatusList, {
    message: `valid status are: ${Object.values(OrderStatus).join(', ')}`,
  })
  status: OrderStatus;
}
