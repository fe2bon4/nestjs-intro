import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ROLES_KEY } from './role.decorator';
import { ERole } from './types';
import { Request } from 'express';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) return false;

    const [, token] = authorization.split(' ');

    const decoded = await this.authService.decode(token);

    if (!decoded) return false;

    return requiredRoles.some((role) => decoded.roles?.includes(role));
  }
}
