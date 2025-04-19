import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtModuleOptions: JwtModuleOptions = {
  secret: 'justSiplm3String!',
  global: true,
  signOptions: {
    expiresIn: 3600 * 24 * 365,
  },
};
