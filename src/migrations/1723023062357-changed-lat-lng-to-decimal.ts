import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedLatLngToDecimal1723023062357 implements MigrationInterface {
    name = 'ChangedLatLngToDecimal1723023062357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "cioc" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "independent"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "independent" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "capital" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "lat" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "lng" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "area" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "demonyms"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "demonyms" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "demonyms"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "demonyms" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "area" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "lng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "lat" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "capital" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "independent"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "independent" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "cioc" SET NOT NULL`);
    }

}
