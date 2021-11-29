import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    if (!req.headers.authorization)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    next();
  }
}
