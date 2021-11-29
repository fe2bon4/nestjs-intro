import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth/auth.module';
import { StoreModule } from 'src/module/store/store.module';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  imports: [StoreModule, AuthModule],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
