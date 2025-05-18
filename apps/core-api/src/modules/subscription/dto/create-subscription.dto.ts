import { IsString, IsObject, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsObject()
  @IsNotEmpty()
  filter: any; // e.g., { location: string; category: string }
}