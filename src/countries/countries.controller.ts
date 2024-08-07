import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CountryService } from './countries.service';
import { ApiResponsePaginated } from '../core/interfaces/api-response.interface';
import { createApiResponsePaginated } from '../utility/utility.core';
import { Country } from '../core/entities/countries.entity';
import { FetchCountriesDto } from './dto/fetch-countries.dto';
import { FetchCountryDto } from './dto/fetch-country.dto';

@ApiTags('countries')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves list of countries',
  })
  @ApiQuery({ name: 'region', required: false, type: String })
  @ApiQuery({ name: 'minPopulation', required: false, type: Number })
  @ApiQuery({ name: 'maxPopulation', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getCountries(
    @Query() query: FetchCountriesDto,
  ): Promise<ApiResponsePaginated<Country[]>> {
    console.log('Received query:', query);
    const { page, limit } = query;

    const { countries, totalItems } =
      await this.countryService.getCountries(query);

    const totalPages = Math.ceil(totalItems / limit);

    return createApiResponsePaginated(
      'Countries retrieved successfully',
      countries,
      {
        totalItems,
        itemCount: countries.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    );
  }

  @Get('detail')
  @ApiOperation({ summary: 'Get detailed information for a specific country' })
  async getCountryDetail(@Query() query: FetchCountryDto) {
    return this.countryService.getCountryDetail(query);
  }
}
