import { Module } from '@nestjs/common';
import { StoreModule } from 'src/store/store.module';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  imports: [StoreModule],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
