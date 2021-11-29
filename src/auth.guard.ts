import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
const PRIV_KEY = 'asdasdasdaaaasdadawsd';

const verifyToken = async (token): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jwt = require('jsonwebtoken');
    jwt.verify(token, PRIV_KEY, (error) => {
      if (error) return reject(false);
      return resolve(true);
    });
  });
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) return false;

    const [_bearer, token] = authorization.split(' ');

    try {
      const isValidToken = verifyToken(token);
      return isValidToken;
    } catch (_e) {
      return false;
    }
  }
}
