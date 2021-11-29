import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { StoreModule } from 'src/store/store.module';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  imports: [StoreModule, AuthModule],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
