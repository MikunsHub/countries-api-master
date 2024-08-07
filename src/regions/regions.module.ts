import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { Region } from '../core/entities/regions.entity';
import { Country } from '../core/entities/countries.entity';
import { UtilityModule } from '../utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([Region, Country]),UtilityModule],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}
