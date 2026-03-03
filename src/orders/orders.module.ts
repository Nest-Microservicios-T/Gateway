import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NatsModule } from 'src/transports/nats.module';
// import { envs } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  imports: [NatsModule],
})
export class OrdersModule {}
