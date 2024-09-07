import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
