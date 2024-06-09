import { Test, TestingModule } from '@nestjs/testing';
import { DetailOrdersService } from './detail-orders.service';

describe('DetailOrdersService', () => {
  let service: DetailOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailOrdersService],
    }).compile();

    service = module.get<DetailOrdersService>(DetailOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
