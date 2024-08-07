import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/app.config';
import { validate } from './config/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { CountryService } from './countries/countries.service';
import { RegionsModule } from './regions/regions.module';
import { LanguagesModule } from './languages/languages.module';
import { StatisticsModule } from './statistics/statistics.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmAsyncConfig } from './config/typeorm-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CountriesModule,
    RegionsModule,
    LanguagesModule,
    StatisticsModule,
    AuthModule, // Add the AuthModule here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
