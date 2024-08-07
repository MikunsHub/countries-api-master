import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from 'src/core/entities/countries.entity';
import { FetchLanguagesDto } from './dto/fetch-languages.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async getLanguages(query: FetchLanguagesDto) {
    const { search, sort, order, page, limit } = query;

    const offset = (page - 1) * limit;

    const searchCondition = search
      ? `WHERE LOWER(language_key) LIKE LOWER('%${search}%') OR LOWER(language_value) LIKE LOWER('%${search}%')`
      : '';
    const orderCondition = sort
      ? `ORDER BY ${sort === 'language' ? 'language_key' : 'totalSpeakers'} ${order}`
      : '';

    const rawQuery = `
      SELECT language_key AS language, language_value AS fullName, COUNT(country_id) AS countryCount, SUM(population) AS totalSpeakers
      FROM (
        SELECT country.id AS country_id, country.population, jt.key AS language_key, jt.value AS language_value
        FROM country, LATERAL jsonb_each_text(country.languages) AS jt
      ) AS language_table
      ${searchCondition}
      GROUP BY language_key, language_value
      ${orderCondition}
      LIMIT ${limit} OFFSET ${offset}
    `;

    const rawCountQuery = `
    SELECT COUNT(DISTINCT language_key) AS total
    FROM (
      SELECT jt.key AS language_key, jt.value AS language_value
      FROM country, LATERAL jsonb_each_text(country.languages) AS jt
    ) AS language_table
    ${searchCondition}
  `;

    const languages = await this.countryRepository.query(rawQuery);
    const countResult = await this.countryRepository.query(rawCountQuery);
    const total = countResult[0]?.total || 0;

    return {
      data: languages,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
