import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Region } from './regions.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commonName: string;

  @Column()
  officialName: string;

  @Column()
  cca2: string;

  @Column()
  cca3: string;

  @Column({ nullable: true })
  cioc: string;

  @Column('boolean')
  independent: boolean;
  
  @Column('jsonb')
  currencies: object;

  @Column({ nullable: true })
  capital: string;
  
  @Column('float')
  lat: number;
  
  @Column('float')
  lng: number;
  
  @Column('float')
  area: number;

  @Column('integer')
  population: number;

  @Column('jsonb')
  demonyms: object;

  @Column()
  continent: string;

  @Column('jsonb')
  languages: object;

  @Column('jsonb')
  borders: string[];

  borderingCountries?: Partial<Country>[];

  @Column()
  flag: string;

  @ManyToOne(() => Region, (region) => region.countries)
  region: Region;
}