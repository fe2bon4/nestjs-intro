import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard, Roles, RolesGuard } from 'src/module/auth/auth.guard';
import { ERole } from 'src/module/auth/types';
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
  @Roles(ERole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  put(@Param('id') id: string) {
    return this.service.put(id);
  }

  @Delete('id')
  @Roles(ERole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  delete(@Param('id') id: string) {
    return this.service.get(id);
  }
}
