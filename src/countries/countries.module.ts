import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from './countries.service';
import { CountriesController } from './countries.controller';
import { RegionsModule } from '../regions/regions.module';
import { Country } from 'src/core/entities/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), RegionsModule],
  controllers: [CountriesController],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountriesModule {}
