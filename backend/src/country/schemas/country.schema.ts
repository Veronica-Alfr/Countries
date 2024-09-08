import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryNewInfosDocument = CountryNewInfos & Document;

@Schema()
export class CountryNewInfos {
  @Prop({ required: true })
  countryCode: string;

  countryName: string;

  @Prop({ required: true })
  borders: string[];

  @Prop({ required: true })
  flagUrl: string;
}

export const CountryNewInfosSchema =
  SchemaFactory.createForClass(CountryNewInfos);
