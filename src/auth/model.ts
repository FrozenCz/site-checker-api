import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  name: string;

  @IsString()
  pass: string;
}

export interface User {
  login: string;
}

export class RefreshLoginDTO {
  @IsString()
  refresh_token: string;
}
