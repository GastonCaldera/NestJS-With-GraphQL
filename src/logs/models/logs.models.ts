import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/roles/models/roles.models';
import { Worker } from 'src/workers/models/workers.models';

@ObjectType()
export class Log {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Worker)
  user?: Worker;

  @Field(() => Role)
  old_role?: Role;

  @Field(() => Role)
  new_role?: Role;

  @Field(() => Worker)
  old_boss?: Worker;

  @Field(() => Worker)
  new_boss?: Worker | null;

  @Field({ nullable: true })
  created_at?: string;
}
