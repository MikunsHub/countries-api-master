import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class FetchCountriesDto {
  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @Transform(({ value }) => value ? parseInt(value) : undefined)
  @IsNumber()
  @Min(0)
  minPopulation?: number;

  @IsOptional()
  @Transform(({ value }) => value ? parseInt(value) : undefined)
  @IsNumber()
  @Min(0)
  maxPopulation?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined) return 1;
    const parsed = parseInt(value);
    return isNaN(parsed) ? 1 : Math.max(1, parsed);
  })
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined) return 10;
    const parsed = parseInt(value);
    return isNaN(parsed) ? 10 : Math.max(1, parsed);
  })
  @IsNumber()
  @Min(1)
  limit: number = 10;
}