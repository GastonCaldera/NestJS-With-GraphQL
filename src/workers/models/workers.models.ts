import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Worker {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
