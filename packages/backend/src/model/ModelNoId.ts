import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Generated,
  UpdateDateColumn,
} from "typeorm";
import { z } from "zod";

// Schéma Zod pour validation
export const ModelNoIdSchema = z.object({
  uuid: z.string().uuid().optional(), // sera généré si absent
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export interface IModelNoId {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

export default abstract class ModelNoId
  extends BaseEntity
  implements IModelNoId
{
  @Column("uuid")
  @Generated("uuid")
  uuid!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  validate(): void {
    // Valide l'instance actuelle
    const result = ModelNoIdSchema.safeParse(this);

    if (!result.success) {
      // Lance une erreur avec les détails de validation
      throw new Error(
        "Validation failed: " + JSON.stringify(result.error.format())
      );
    }
  }
}
