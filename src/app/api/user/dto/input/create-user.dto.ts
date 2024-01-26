import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateUserDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  role: string;
}
