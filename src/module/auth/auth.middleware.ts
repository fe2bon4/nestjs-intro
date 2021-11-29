import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    if (!req.headers.authorization)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    next();
  }
}

@Injectable()
export class AuthDecodeMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const { authorization } = req.headers;

    if (!authorization) return false;

    const [, token] = authorization.split(' ');

    req.user = await this.authService.decode(token);
    next();
  }
}
