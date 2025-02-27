import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion011714880124851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "USERS" RENAME COLUMN "name"  TO "fullname"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "USERS" RENAME COLUMN "fullname"  TO "name"',
    );
  }
}

