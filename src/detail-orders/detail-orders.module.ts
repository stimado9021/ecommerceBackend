import { Module } from '@nestjs/common';
import { DetailOrdersService } from './detail-orders.service';
import { DetailOrdersController } from './detail-orders.controller';

@Module({
  controllers: [DetailOrdersController],
  providers: [DetailOrdersService],
})
export class DetailOrdersModule {}
