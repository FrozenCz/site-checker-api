import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RefreshLoginDTO, User } from './model';
import { GetUser } from './decorators/getUser.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body(ValidationPipe) loginDTO: LoginDTO,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.login({ pass: loginDTO.pass, user: loginDTO.name });
  }

  @Post('login-refresh')
  loginRefresh(
    @Body(ValidationPipe) refreshLoginDTO: RefreshLoginDTO,
  ): Promise<{ refresh_token: string }> {
    return this.authService.loginRefresh({
      refresh_token: refreshLoginDTO.refresh_token,
    });
  }

  @UseGuards(AuthGuard())
  @Get('test')
  getTest(@GetUser() user: User): void {
    console.log(user);
    console.log('anotherTest');
  }
}
