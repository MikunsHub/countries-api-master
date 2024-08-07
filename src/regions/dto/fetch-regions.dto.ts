import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FetchRegionsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort?: 'name' | 'population';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty({ required: false, minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @ApiProperty({ required: false, minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit: number = 10;
}