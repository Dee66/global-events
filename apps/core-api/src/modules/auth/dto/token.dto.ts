import { IsString, IsOptional, IsNumber } from 'class-validator';

export class TokenDto {
  @IsString()
  accessToken: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsNumber()
  @IsOptional()
  expiresIn?: number;
}