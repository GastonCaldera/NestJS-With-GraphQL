import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EditWorkerRoleInput {
  @Field()
  id: string;

  @Field()
  roleId: string;

  @Field({ nullable: true })
  bossId: string;
}
