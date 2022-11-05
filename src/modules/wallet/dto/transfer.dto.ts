import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TransferFundDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  sender_email: string;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  sender_wallet_number: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  amount: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  receiver_email: string;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  receiver_wallet_number: number;
}
