import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { ERole } from './types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const [, token] = authorization.split(' ');
    return this.authService.verify(token);
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user || !user.role) return false;

    return requiredRoles.some((role) => user.role === role);
  }
}
