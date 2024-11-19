import { Module } from '@nestjs/common';
import { AmigoSecretoService } from './amigo-secreto.service';
import { AmigoSecretoController } from './amigo-secreto.controller';
import { Participant } from './participant';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [AmigoSecretoService],
  controllers: [AmigoSecretoController]
})
export class AmigoSecretoModule {}
