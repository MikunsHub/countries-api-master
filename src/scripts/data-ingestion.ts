import axios from 'axios';
import { AppDataSource } from '../config/data-source';
import { Country } from '../core/entities/countries.entity';
import { Region } from '../core/entities/regions.entity';

async function ingestData() {
  await AppDataSource.initialize();

  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;

    for (const countryData of countries) {
      let region = await AppDataSource.manager.findOne(Region, { where: { name: countryData.region } });
      if (!region) {
        region = new Region();
        region.name = countryData.region;
        await AppDataSource.manager.save(region);
      }

      let country = await AppDataSource.manager.findOne(Country, { where: { cca3: countryData.cca3 } });
      if (!country) {
        country = new Country();
      }

      country.commonName = countryData.name.common;
      country.officialName = countryData.name.official;
      country.cca2 = countryData.cca2;
      country.cca3 = countryData.cca3;
      country.cioc = countryData.cioc || '';
      country.independent = countryData.independent || false;
      country.currencies = countryData.currencies || {};
      country.capital = countryData.capital ? countryData.capital[0] : '';
      country.lat = countryData.latlng[0];
      country.lng = countryData.latlng[1];
      country.area = countryData.area;
      country.population = countryData.population;
      country.demonyms = countryData.demonyms?.eng || {};
      country.continent = countryData.continents[0];
      country.languages = countryData.languages || {};
      country.borders = countryData.borders || [];
      country.flag = countryData.flag;
      country.region = region;

      await AppDataSource.manager.save(country);
    }

    console.log('Data ingestion completed successfully');
  } catch (error) {
    console.error('Error during data ingestion:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

ingestData();