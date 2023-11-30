import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../../roles/models/roles.models';

@ObjectType()
export class Worker {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => Role, { nullable: true })
  role?: Role | string;

  @Field({ nullable: true })
  version?: number;

  @Field(() => Worker, { nullable: true })
  boss?: Worker | null | string;
}
