import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/transports/nats.module';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { NATS_SERVICE, envs } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],

  imports: [
    // ClientsModule.register([
    //   {
    //     name: NATS_SERVICE,
    //     transport: Transport.NATS,
    //     options: {
    //       servers: envs.natsServers,
    //     },
    //   },
    // ]),
    NatsModule,
  ],
})
export class ProductsModule {}
