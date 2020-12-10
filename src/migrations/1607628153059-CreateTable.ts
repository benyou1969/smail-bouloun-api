import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1607628153059 implements MigrationInterface {
  name = 'CreateTable1607628153059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ProductProperties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "property_name" character varying NOT NULL, "property_value" character varying NOT NULL, "tag_id" uuid, CONSTRAINT "PK_98831381741c8fd1f9e561a619a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "available" boolean NOT NULL DEFAULT true, "price" integer NOT NULL DEFAULT '0', "images" character varying, "reference" character varying, "description" character varying, "tag_id" uuid, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "images" text array, "category_id" uuid, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "images" character varying, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "users_roles_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "is_online" boolean NOT NULL DEFAULT false, "token_version" integer NOT NULL DEFAULT '0', "roles" "users_roles_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_product_properties__product_properties" ("products_id" uuid NOT NULL, "product_properties_id" uuid NOT NULL, CONSTRAINT "PK_ac4639ffa833b4489e24d55ffbd" PRIMARY KEY ("products_id", "product_properties_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6469b9b855b87e0ed92e96baea" ON "products_product_properties__product_properties" ("products_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4ca6a3120892c30aedcf13e2f1" ON "products_product_properties__product_properties" ("product_properties_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "ProductProperties" ADD CONSTRAINT "FK_a60a87d811205954615a4da8a6e" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_69a5bf1bf1a8530a65c99c926ac" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "FK_532cd7f2c2c533a6da470a24b5a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_product_properties__product_properties" ADD CONSTRAINT "FK_6469b9b855b87e0ed92e96baeaf" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_product_properties__product_properties" ADD CONSTRAINT "FK_4ca6a3120892c30aedcf13e2f15" FOREIGN KEY ("product_properties_id") REFERENCES "ProductProperties"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_product_properties__product_properties" DROP CONSTRAINT "FK_4ca6a3120892c30aedcf13e2f15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_product_properties__product_properties" DROP CONSTRAINT "FK_6469b9b855b87e0ed92e96baeaf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "FK_532cd7f2c2c533a6da470a24b5a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_69a5bf1bf1a8530a65c99c926ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ProductProperties" DROP CONSTRAINT "FK_a60a87d811205954615a4da8a6e"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_4ca6a3120892c30aedcf13e2f1"`);
    await queryRunner.query(`DROP INDEX "IDX_6469b9b855b87e0ed92e96baea"`);
    await queryRunner.query(
      `DROP TABLE "products_product_properties__product_properties"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "users_roles_enum"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "ProductProperties"`);
  }
}
