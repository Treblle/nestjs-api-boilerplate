import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersPosts1666871115593 implements MigrationInterface {
  name = 'CreateUsersPosts1666871115593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_852036802b135c3f93089c8513" ON "post" ("uuid") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a95e949168be7b7ece1a2382fe"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_852036802b135c3f93089c8513"`,
    );
    await queryRunner.query(`DROP TABLE "post"`);
  }
}
