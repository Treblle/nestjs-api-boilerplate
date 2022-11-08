import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards/local.guard';
import { AuthUser } from './auth-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@AuthUser() authUser: AuthUser) {
    return this.authService.login(authUser);
  }
}
