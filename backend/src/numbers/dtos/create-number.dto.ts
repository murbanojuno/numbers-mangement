import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateNumberDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  // Optional fields @IsOptional()
  @IsOptional()
  @IsString()
  prefix?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
