import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { AuthUser } from './auth-user.decorator';
import { HashingService } from './hashing.service';

import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthUser | undefined> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return undefined;
    }
    const isPasswordMatching = await this.hashingService.compareWithHashed(
      password,
      user.password,
    );
    if (!isPasswordMatching) {
      return undefined;
    }
    return {
      id: user.id,
      uuid: user.uuid,
      email: user.email,
    };
  }

  async login(authUser: AuthUser) {
    const payload: JwtPayload = {
      authUser: authUser,
      sub: authUser.id.toString(),
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
