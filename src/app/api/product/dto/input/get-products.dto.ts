import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsPositive, IsNumber, Min } from 'class-validator';

@InputType()
export class GetProductsDTO {
  @IsString()
  @Field({ nullable: true, defaultValue: '' })
  searchText?: string;

  @IsString()
  @Field({ nullable: true, defaultValue: '_id' })
  orderBy?: string;

  @IsString()
  @Field({ nullable: true, defaultValue: 'asc' })
  order?: string;

  @IsPositive()
  @IsNumber()
  @Field({ defaultValue: 5 })
  limit?: number;

  @Min(0)
  @IsNumber()
  @Field({ defaultValue: 0 })
  skip?: number;
}
