import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from '../core/entities/regions.entity';
import { FetchRegionsDto } from './dto/fetch-regions.dto';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class RegionsService {
  private readonly logger = new Logger(RegionsService.name);

  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    private readonly utilityService: UtilityService,
  ) {}

  async getRegions(query: FetchRegionsDto) {
    const { sort, order, page, limit } = query;
    const cacheKey = `regions_${sort}_${order}_${page}_${limit}`;
    const cachedData = await this.utilityService.getCache(cacheKey);

    if (cachedData) {
      this.logger.log(`Cache hit for key: ${cacheKey}`);
      return JSON.parse(cachedData);
    }

    this.logger.log(`Cache miss for key: ${cacheKey}`);

    const offset = (page - 1) * limit;

    const queryBuilder = this.regionRepository.createQueryBuilder('region')
      .leftJoinAndSelect('region.countries', 'country')
      .select([
        'region.id',
        'region.name',
        'country.id',
        'country.commonName',
        'country.officialName',
        'country.population',
        'country.area',
        'country.capital',
        'country.flag',
      ])
      .addSelect('SUM(country.population)', 'totalPopulation')
      .addSelect('SUM(country.area)', 'totalArea')
      .groupBy('region.id')
      .addGroupBy('country.id');

    if (sort) {
      queryBuilder.orderBy(sort === 'name' ? 'region.name' : 'totalPopulation', order);
    }

    const [regions, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    const regionsWithAggregatedData = regions.map(region => {
      const totalPopulation = region.countries.reduce((sum, country) => sum + (country.population || 0), 0);
      const totalArea = region.countries.reduce((sum, country) => sum + (country.area || 0), 0);
      return {
        ...region,
        totalPopulation,
        totalArea,
      };
    });

    const response = {
      data: regionsWithAggregatedData,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    await this.utilityService.setCache(cacheKey, response, 300); // Cache for 5 minutes

    return response;
  }
}
