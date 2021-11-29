import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('route1/:id/:f_id')
  route1(@Param('id') id: string, @Param('f_id') f_id: string): string {
    console.log(id);
    return `Return ${id}-${f_id}`;
  }
}
