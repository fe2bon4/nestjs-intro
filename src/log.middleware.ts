import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    Logger.log(`Route: ${req.originalUrl}`);
    next();
  }
}
