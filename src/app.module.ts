import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StateModule } from './state/state.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [StateModule, StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
