import { Test, TestingModule } from '@nestjs/testing';
import { DynamicService } from './dynamic.service';

describe('DynamicService', () => {
  let service: DynamicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicService],
    }).compile();

    service = module.get<DynamicService>(DynamicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
