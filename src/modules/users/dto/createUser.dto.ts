import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class NewUser {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
