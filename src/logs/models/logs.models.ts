import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/roles/models/roles.models';
import { Worker } from 'src/workers/models/workers.models';

@ObjectType()
export class Log {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Role)
  old_role?: string;

  @Field(() => Role)
  new_role?: string;

  @Field(() => Worker)
  old_boss?: string;

  @Field(() => Worker)
  new_boss?: string | null;

  @Field({ nullable: true })
  created_at?: string;
}
