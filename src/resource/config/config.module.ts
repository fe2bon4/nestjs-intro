import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { AuthModule } from 'src/module/auth/auth.module';
import { StoreModule } from 'src/module/store/store.module';

@Module({
  imports: [StoreModule, AuthModule],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
