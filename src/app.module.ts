import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogMiddleware } from './module/log/log.middleware';
import { StateModule } from './resource/state/state.module';
import { StoreModule } from './module/store/store.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthMiddleware } from './module/auth/auth.middleware';

@Module({
  imports: [StateModule, StoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('/');
    consumer.apply(AuthMiddleware).forRoutes('/state');
  }
}
