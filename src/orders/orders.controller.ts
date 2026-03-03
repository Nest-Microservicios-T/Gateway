import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', { id }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.client.send('changeOrderStatus', {
          id,
          status: statusDto.status,
        }),
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() orderpaginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', orderpaginationDto);
  }

  @Get(':status')
  async findAllByStatus(
    @Param('status') status: string,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', {
          ...paginationDto,
          status,
        }),
      );
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
