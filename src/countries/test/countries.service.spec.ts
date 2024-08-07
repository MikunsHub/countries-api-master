import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../core/entities/countries.entity';
import { NotFoundException } from '@nestjs/common';
import { CountryService } from '../countries.service';
import { RegionsService } from '../../regions/regions.service';

describe('CountryService', () => {
  let service: CountryService;
  let countryRepository: Repository<Country>;

  const mockCountryRepository = {
    createQueryBuilder: jest.fn(() => ({
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
      getCount: jest.fn(),
      getOne: jest.fn(),
    })),
    find: jest.fn(),
  };

  const mockRegionsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(Country),
          useValue: mockCountryRepository,
        },
        {
          provide: RegionsService,
          useValue: mockRegionsService,
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    countryRepository = module.get<Repository<Country>>(getRepositoryToken(Country));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCountryDetail', () => {

    it('should throw NotFoundException when country is not found', async () => {
      mockCountryRepository.createQueryBuilder().getOne.mockResolvedValue(null);

      await expect(service.getCountryDetail({ commonName: 'Non-existent Country' }))
        .rejects.toThrow(NotFoundException);
    });
  });
});