import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly login: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly email: string;
}
