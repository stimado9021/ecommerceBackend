import { Test, TestingModule } from '@nestjs/testing';
import { DetailOrdersController } from './detail-orders.controller';
import { DetailOrdersService } from './detail-orders.service';

describe('DetailOrdersController', () => {
  let controller: DetailOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailOrdersController],
      providers: [DetailOrdersService],
    }).compile();

    controller = module.get<DetailOrdersController>(DetailOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
