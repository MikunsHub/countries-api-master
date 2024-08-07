import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Country } from '../core/entities/countries.entity';
import { FetchCountriesDto } from './dto/fetch-countries.dto';
import { FetchCountryDto } from './dto/fetch-country.dto';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);

  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>,
  ) {}

  async getCountries(
    query: FetchCountriesDto
  ): Promise<{ countries: Country[]; totalItems: number }> {
    const { page, limit, region, minPopulation, maxPopulation } = query;
    const queryBuilder = this.countriesRepository.createQueryBuilder('country');

    if (region) {
      queryBuilder
        .innerJoinAndSelect('country.region', 'region')
        .where('region.name = :region', { region });
    }

    if (minPopulation) {
      queryBuilder.andWhere('country.population >= :minPopulation', { minPopulation });
    }

    if (maxPopulation) {
      queryBuilder.andWhere('country.population <= :maxPopulation', { maxPopulation });
    }

    const totalItems = await queryBuilder.getCount();

    const countries = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { countries, totalItems };
  }

  async getCountryDetail(query: FetchCountryDto) {
    const queryBuilder = this.countriesRepository.createQueryBuilder('country')
      .leftJoinAndSelect('country.region', 'region');

    if (query.officialName) {
      queryBuilder.andWhere('country.officialName = :officialName', { officialName: query.officialName });
    }
    if (query.commonName) {
      queryBuilder.andWhere('country.commonName = :commonName', { commonName: query.commonName });
    }
    if (query.cca2) {
      queryBuilder.andWhere('country.cca2 = :cca2', { cca2: query.cca2 });
    }
    if (query.cca3) {
      queryBuilder.andWhere('country.cca3 = :cca3', { cca3: query.cca3 });
    }

    const country = await queryBuilder.getOne();

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    // If you need to fetch the bordering countries, you'll need to do an additional query
    if (country.borders && country.borders.length > 0) {
      const borderingCountries = await this.countriesRepository.find({
        where: { cca3: In(country.borders) },
        select: ['commonName', 'cca3']
      });
      
      // Add the bordering countries information to the result
      country.borderingCountries = borderingCountries;
    }

    return country;
}
}
