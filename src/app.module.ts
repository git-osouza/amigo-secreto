import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmigoSecretoModule } from './amigo-secreto/amigo-secreto.module';
import { Participant } from './amigo-secreto/repository/participant.entity';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAMEDB,
      entities: [Participant],
      synchronize: true,
    }),
    AmigoSecretoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
