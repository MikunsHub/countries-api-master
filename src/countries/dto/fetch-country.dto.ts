import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FetchCountryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    officialName?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    commonName?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    cca2?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    cca3?: string;
  }