import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogMiddleware } from './log.middleware';
import { StateModule } from './state/state.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StateModule, StoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('/');
  }
}
