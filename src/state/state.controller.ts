import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(private readonly service: StateService) {}

  @Get(':id')
  get(@Param('id') id: string): any {
    return this.service.get(id);
  }

  @Put(':id')
  put(@Param('id') id: string) {
    return this.service.put(id);
  }

  @Delete('id')
  delete(@Param('id') id: string) {
    return this.service.get(id);
  }
}
