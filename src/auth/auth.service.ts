import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './model';

@Injectable()
export class AuthService {
  private user = 'testUser';
  private pass = 'tu3!';

  constructor(private jwtService: JwtService) {}

  //todo: musi se udelat podle DB, zatim je to jen pro uzivatele testUser

  async login(param: {
    user: string;
    pass: string;
  }): Promise<{ access_token: string; refresh_token: string }> {
    if (param.user === this.user && param.pass === this.pass) {
      const payload: User = { login: this.user };
      return {
        access_token: await this.jwtService.signAsync({
          ...payload,
          createdAt: new Date(),
        }),
        refresh_token: await this.jwtService.signAsync(
          { login: this.user, createdAt: new Date() },
          { expiresIn: '1d' },
        ),
      };
    }
    throw new UnauthorizedException('Aaaaah....');
  }

  async isValid(user: User | undefined): Promise<boolean> {
    console.log(user);
    return this.user === user.login;
  }

  async loginRefresh(param: { refresh_token: string }) {
    const { login } = await this.jwtService.verifyAsync(param.refresh_token);

    if (this.user === login) {
      const payload: User = { login: this.user };
      return {
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: await this.jwtService.signAsync(
          { login: this.user },
          { expiresIn: '1d' },
        ),
      };
    }
    return Promise.resolve({ refresh_token: '' });
  }
}
