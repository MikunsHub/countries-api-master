import { ApiProperty } from '@nestjs/swagger';

export class RegionDto {
  @ApiProperty({ description: 'The unique identifier of the region' })
  id: number;

  @ApiProperty({ description: 'The name of the region' })
  name: string;

  @ApiProperty({ description: 'The total population of the region' })
  totalPopulation: number;

  @ApiProperty({ description: 'The list of countries within the region' })
  countries: CountryDto[];
}

export class CountryDto {
  @ApiProperty({ description: 'The name of the country' })
  name: string;

  @ApiProperty({ description: 'The population of the country' })
  population: number;

  // Add other fields as needed
}
