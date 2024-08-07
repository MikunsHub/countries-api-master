import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedDefaultValueOfIsactiveOnUserEntity1723015353738 implements MigrationInterface {
    name = 'ChangedDefaultValueOfIsactiveOnUserEntity1723015353738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

}
