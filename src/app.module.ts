import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogMiddleware } from './module/log/log.middleware';
import { StateModule } from './resource/state/state.module';
import { StoreModule } from './module/store/store.module';
import { AuthModule } from './module/auth/auth.module';
import {
  AuthDecodeMiddleware,
  AuthMiddleware,
} from './module/auth/auth.middleware';
@Module({
  imports: [
    StateModule,
    StoreModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env', '.qa.env', '.staging.env'],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('/');
    consumer
      .apply(AuthMiddleware, AuthDecodeMiddleware)
      .forRoutes('/state', '/config', '/store');
  }
}
