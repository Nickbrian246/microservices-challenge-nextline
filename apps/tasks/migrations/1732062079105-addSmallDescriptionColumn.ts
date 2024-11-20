import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSmallDescriptionColumn1732062079105
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`task\` ADD COLUMN \`smallDescription\` VARCHAR(10) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`task\` DROP COLUMN \`smallDescription\``,
    );
  }
}
