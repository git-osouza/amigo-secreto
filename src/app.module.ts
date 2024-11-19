import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmigoSecretoModule } from './amigo-secreto/amigo-secreto.module';
import { Participant } from './amigo-secreto/participant';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'localDB.db',
      entities: [Participant],
      synchronize: true,
    }),
    AmigoSecretoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
