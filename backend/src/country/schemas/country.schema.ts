import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;
export type CountryNewInfosDocument = CountryNewInfos & Document;

@Schema()
export class Country {
  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  name: string;
}

export class CountryNewInfos {
  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  countryName: string;

  @Prop({ required: true })
  borders: string[];

  @Prop({ required: true })
  flagUrl: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
