import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { Country } from '../core/entities/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
  exports: [LanguagesService],
})
export class LanguagesModule {}
