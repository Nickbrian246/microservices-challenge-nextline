import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddZidCodeToUsers1732059882183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD COLUMN \`zipCode\` VARCHAR(10) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`zipCode\``);
  }
}
