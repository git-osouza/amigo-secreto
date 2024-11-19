import { Test, TestingModule } from '@nestjs/testing';
import { AmigoSecretoService } from './amigo-secreto.service';

describe('AmigoSecretoService', () => {
  let service: AmigoSecretoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmigoSecretoService],
    }).compile();

    service = module.get<AmigoSecretoService>(AmigoSecretoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
