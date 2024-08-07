import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedCountriesSchemaToFitNewDataPipeline1723020642996 implements MigrationInterface {
    name = 'ChangedCountriesSchemaToFitNewDataPipeline1723020642996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP CONSTRAINT "FK_b13bcf570df3e60a7bfb7e741a2"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "region"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "regionEntityId"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "commonName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "cca2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "cca3" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "cioc" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "independent" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "lat" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "lng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "demonyms" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "continent" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "regionId" integer`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "currencies"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "currencies" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "capital"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "capital" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "area" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "languages"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "languages" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "borders"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "borders" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD CONSTRAINT "FK_adda353c674d16613298959d5bc" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP CONSTRAINT "FK_adda353c674d16613298959d5bc"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "borders"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "borders" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "languages"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "languages" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "area" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "capital"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "capital" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "currencies"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "currencies" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "regionId"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "continent"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "demonyms"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "independent"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "cioc"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "cca3"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "cca2"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "commonName"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "regionEntityId" integer`);
        await queryRunner.query(`ALTER TABLE "country" ADD "region" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD CONSTRAINT "FK_b13bcf570df3e60a7bfb7e741a2" FOREIGN KEY ("regionEntityId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
