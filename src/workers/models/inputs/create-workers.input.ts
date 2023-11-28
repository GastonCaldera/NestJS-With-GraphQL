import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWorkerInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  role: string;

  @Field({ nullable: true })
  boss: string;

  @Field()
  email: string;

  @Field()
  version: number;
}
