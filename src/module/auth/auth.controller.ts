import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async post(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ token: string }> {
    if (!username || !password)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = await this.authService.auth(username, password);

    if (!token) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return { token };
  }
}
