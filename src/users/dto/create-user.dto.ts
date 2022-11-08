import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsEmail()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  readonly password!: string;
}
