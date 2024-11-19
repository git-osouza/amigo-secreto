import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AmigoSecretoService } from './amigo-secreto.service';
import { join } from 'path';
import { Response } from 'express';

@Controller('secret-friend')
export class AmigoSecretoController {
  constructor(private readonly amigoSecretoService: AmigoSecretoService) { }

  @Get('/adicionar')
  adicionar(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'adicionar.html'));
  }

  @Get()
  getIndex(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'index.html'));
  }

  @Get('participants')
  async getAllParticipants() {
    return await this.amigoSecretoService.getAllParticipants();
  }

  @Post('add')
  async addParticipant(@Body('name') name: string) {
    return await this.amigoSecretoService.addParticipant(name);
  }

  @Post('draw')
  async sortearAmigo(@Body('name') name: string) {
    return await this.amigoSecretoService.drawFriend(name.toUpperCase());
  }

  @Get('update')
  async update(){
    return await this.amigoSecretoService.updateAll();
  }

  @Get('remove')
  async remove(){
    return await this.amigoSecretoService.removeAll();
  }
}
