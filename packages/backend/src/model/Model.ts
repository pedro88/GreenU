import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IModelNoId, ModelNoIdSchema } from "./ModelNoId";
import z from "zod";

const ModelSchema = ModelNoIdSchema.extend({
  id: z.number().optional(),
  deletedAt: z.date().optional().nullable(),
});

export interface IModel extends IModelNoId {
  id?: number;
  deletedAt?: Date;
}

export default abstract class Model extends BaseEntity implements IModel {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  validate(): void {
    // Valide l'instance actuelle
    const result = ModelSchema.safeParse(this);

    if (
      this.deletedAt !== null &&
      this.deletedAt !== undefined &&
      !(this.deletedAt instanceof Date)
    ) {
      throw new Error(
        `Invalid input: expected date or null, received ${typeof this
          .deletedAt}`
      );
    }

    if (!result.success) {
      // Lance une erreur avec les détails de validation
      throw new Error(
        "Validation failed: " + JSON.stringify(result.error.format())
      );
    }
  }
}
