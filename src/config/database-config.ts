import 'dotenv/config';
import { User } from '../core/entities/user.entity';
import { Country } from '../core/entities/countries.entity';
import { DataSourceOptions } from 'typeorm';
import { parseBoolean } from '../utility/utility.core';
import { Region } from '../core/entities/regions.entity';
import { InitialMigration1722984538614 } from '../migrations/1722984538614-initial-migration';
import { ChangedDefaultValueOfIsactiveOnUserEntity1723015353738 } from '../migrations/1723015353738-changed-default-value-of-isactive-on-user-entity';
import { ChangedCountriesSchemaToFitNewDataPipeline1723020642996 } from '../migrations/1723020642996-changed-countries-schema-to-fit-new-data-pipeline';
import { ChangedLatLngToDecimal1723023062357 } from '../migrations/1723023062357-changed-lat-lng-to-decimal';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: parseBoolean(process.env.DATABASE_SSL || false),
  entities: [User, Country, Region],
  migrations: [
    InitialMigration1722984538614,
    ChangedDefaultValueOfIsactiveOnUserEntity1723015353738,
    ChangedCountriesSchemaToFitNewDataPipeline1723020642996,
    ChangedLatLngToDecimal1723023062357,
  ],
  subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
  synchronize: false, // must always be false in production
  logging: true,
  migrationsRun: false,
};

export default databaseConfig;
