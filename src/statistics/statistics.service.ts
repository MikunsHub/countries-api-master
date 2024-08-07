import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../core/entities/countries.entity';
import { createApiResponsePaginated } from '../utility/utility.core';

// Define CountryData type to reflect the correct structure
interface CountryData {
  name: string; // Adjust if you're using `commonName` or `officialName`
  area: number;
  population: number;
  language_key: string;
  language_value: string;
}

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async getStatistics() {
    const rawQuery = `
      SELECT 
        country."commonName" AS name,  -- Adjusted for case sensitivity
        country.area, 
        country.population, 
        jt.key AS language_key, 
        jt.value AS language_value
      FROM country
      CROSS JOIN LATERAL jsonb_each_text(country.languages) AS jt
    `;

    const rawCountQuery = `
      SELECT COUNT(*) AS total
      FROM country
    `;

    const countries = await this.countryRepository.query(rawQuery);
    const countResult = await this.countryRepository.query(rawCountQuery);
    const total = countResult[0]?.total || 0;

    const largestCountryByArea = countries.length > 0
      ? countries.reduce(
          (prev: CountryData, current: CountryData) =>
            prev.area > current.area ? prev : current,
        )
      : null;

    const smallestCountryByPopulation = countries.length > 0
      ? countries.reduce(
          (prev: CountryData, current: CountryData) =>
            prev.population < current.population ? prev : current,
        )
      : null;

    const mostWidelySpokenLanguage = countries.reduce(
      (prev: Record<string, number>, current: CountryData) => {
        const language = current.language_value; // Use language_value or adjust as needed
        if (prev[language]) {
          prev[language] += 1;
        } else {
          prev[language] = 1;
        }
        return prev;
      },
      {},
    );

    const mostWidelySpokenLanguageKey = Object.keys(mostWidelySpokenLanguage).reduce(
      (a, b) =>
        mostWidelySpokenLanguage[a] > mostWidelySpokenLanguage[b] ? a : b,
    );

    const data = {
      totalCountries: total,
      largestCountryByArea: largestCountryByArea
        ? {
            name: largestCountryByArea.name,
            area: largestCountryByArea.area,
          }
        : null,
      smallestCountryByPopulation: smallestCountryByPopulation
        ? {
            name: smallestCountryByPopulation.name,
            population: smallestCountryByPopulation.population,
          }
        : null,
      mostWidelySpokenLanguage: mostWidelySpokenLanguageKey,
    };

    return createApiResponsePaginated('Aggregated statistics data', data, {
      totalItems: total,
      itemCount: countries.length,
      itemsPerPage: countries.length, // All items on a single page
      totalPages: 1,
      currentPage: 1,
    });
  }
}
