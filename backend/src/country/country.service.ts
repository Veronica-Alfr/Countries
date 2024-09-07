import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Country, CountryDocument } from './schemas/country.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CountryService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>,
  ) {}

  async getAvailableCountries(): Promise<Country[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get('https://date.nager.at/api/v3/AvailableCountries'),
      );
      return response?.data || null;
    } catch (error) {
      console.error('Error fetching available countries:', error);
      throw new Error('Failed to fetch available countries');
    }
  }

  async saveCountries(): Promise<Country[]> {
    try {
      const countries = await this.getAvailableCountries();
      if (!countries) {
        throw new Error('No countries available from the API');
      }

      const hasCountries = await this.countryModel.countDocuments();

      if (hasCountries > 0) {
        throw new Error(
          'You already have countries registered in the database!',
        );
      }

      const insertedCountries = await this.countryModel.insertMany(
        countries.map((country) => ({
          countryCode: country.countryCode,
          name: country.name,
        })),
      );

      console.log('Countries successfully saved to the database');
      return insertedCountries;
    } catch (error) {
      console.error('Error saving countries to the database:', error);
      throw new Error('Failed to save countries to the database');
    }
  }

  async listCountries(): Promise<Country[]> {
    try {
      return await this.countryModel.find().exec();
    } catch (error) {
      console.error('Error listing countries:', error);
      throw new Error('Failed to list countries');
    }
  }
}
