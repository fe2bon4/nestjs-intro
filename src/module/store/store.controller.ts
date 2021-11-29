import { Controller, Param, Put, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, Roles, RolesGuard } from 'src/module/auth/auth.guard';
import { ERole } from 'src/module/auth/types';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly service: StoreService) {}

  @Put('database/:database')
  @Roles(ERole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  createDatabase(@Param('database') database: string) {
    return this.service.createDatabase(database);
  }

  @Put('database/:database/:table')
  @Roles(ERole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  createTable(
    @Param('database') database: string,
    @Param('table') table: string,
  ) {
    return this.service.createTable(database, table);
  }

  @Get('database/:database/:table')
  @Roles(ERole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  list(@Param('database') database: string, @Param('table') table: string) {
    return this.service.list(database, table);
  }
}
