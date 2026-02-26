import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ORDERS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOneOrder', { id });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersClient.send({ cmd: 'update_order' }, { id, ...updateOrderDto });
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersClient.send({ cmd: 'remove_order' }, { id });
  // }
}
