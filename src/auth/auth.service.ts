import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './model';

@Injectable()
export class AuthService {
  private user = 'testUser';
  private pass = 'tu3!';

  constructor(private jwtService: JwtService) {}

  async login(param: {
    user: string;
    pass: string;
  }): Promise<{ access_token: string }> {
    if (param.user === this.user && param.pass === this.pass) {
      const payload: User = { login: this.user };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException('Aaaaah....');
  }

  async isValid(user: User | undefined): Promise<boolean> {
    return this.user === user.login;
  }
}
