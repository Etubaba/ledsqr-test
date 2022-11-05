import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class WalletDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  user_email: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  amount: number;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  wallet_number: number;
}
