import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/countries.schema';
import {
  CountryNewInfos,
  CountryNewInfosSchema,
} from './schemas/country.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Country.name, schema: CountrySchema },
      {
        name: CountryNewInfos.name,
        schema: CountryNewInfosSchema,
      },
    ]),
  ],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
