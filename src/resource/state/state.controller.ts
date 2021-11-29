import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/module/auth/auth.guard';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(private readonly service: StateService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  get(@Param('id') id: string): any {
    return this.service.get(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  put(@Param('id') id: string) {
    return this.service.put(id);
  }

  @Delete('id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.service.get(id);
  }
}
