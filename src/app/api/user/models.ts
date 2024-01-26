import { EmailToken, User, UserSchema, emailTokenSchema } from "libs/data-access/src";

export const mongooseModels = [
  { name: User.name, schema: UserSchema },
  { name: EmailToken.name, schema: emailTokenSchema },
];
