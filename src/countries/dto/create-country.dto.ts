import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({
    example: 'France',
    description: 'The common name of the country',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'French Republic',
    description: 'The official name of the country',
  })
  @IsString()
  officialName: string;

  @ApiProperty({ example: 'Europe', description: 'The region of the country' })
  @IsString()
  region: string;

  @ApiProperty({
    example: 467000000,
    description: 'The population of the country',
  })
  @IsNumber()
  population: number;

  @ApiProperty({
    example: 643801,
    description: 'The area of the country in square kilometers',
  })
  @IsNumber()
  area: number;

  @ApiProperty({
    example: ['French'],
    description: 'The languages spoken in the country',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @ApiProperty({
    example: ['BEL', 'LUX', 'DEU'],
    description: 'The bordering countries',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  borders: string[];

  @ApiProperty({
    example: ['Paris'],
    description: 'The capital cities of the country',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  capital: string[];

  @ApiProperty({
    example: '🇫🇷',
    description: 'The flag of the country',
  })
  @IsString()
  flag: string;

  @ApiProperty({
    example: ['Euro'],
    description: 'The currencies used in the country',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  currencies: string[];
}
