import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginUserDTO {
    @Field(() => String)
    email: string

    @Field(() => String)
    password: string; 

}
