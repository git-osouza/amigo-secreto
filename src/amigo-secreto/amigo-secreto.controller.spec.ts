import { Test, TestingModule } from '@nestjs/testing';
import { AmigoSecretoController } from './amigo-secreto.controller';

describe('AmigoSecretoController', () => {
  let controller: AmigoSecretoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmigoSecretoController],
    }).compile();

    controller = module.get<AmigoSecretoController>(AmigoSecretoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
