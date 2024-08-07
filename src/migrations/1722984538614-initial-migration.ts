import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1722984538614 implements MigrationInterface {
    name = 'InitialMigration1722984538614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "officialName" character varying NOT NULL, "region" character varying NOT NULL, "population" integer NOT NULL, "area" double precision NOT NULL, "languages" text NOT NULL, "borders" text NOT NULL, "capital" text NOT NULL, "flag" character varying NOT NULL, "currencies" text NOT NULL, "regionEntityId" integer, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "country" ADD CONSTRAINT "FK_b13bcf570df3e60a7bfb7e741a2" FOREIGN KEY ("regionEntityId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP CONSTRAINT "FK_b13bcf570df3e60a7bfb7e741a2"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
