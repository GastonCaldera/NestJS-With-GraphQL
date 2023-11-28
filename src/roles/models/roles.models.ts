import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  created_at?: string;
}
