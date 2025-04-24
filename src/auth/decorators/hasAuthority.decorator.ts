import { SetMetadata } from '@nestjs/common';

export enum AuthorityEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const HasAuthority = (authority: AuthorityEnum) =>
  SetMetadata('HasAuthority', authority);
