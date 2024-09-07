import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Country, CountryDocument } from './schemas/countries.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CountryNewInfos,
  CountryNewInfosDocument,
} from './schemas/country.schema';

@Injectable()
export class CountryService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>,
    @InjectModel(CountryNewInfos.name)
    private readonly countryInfoModel: Model<CountryNewInfosDocument>,
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

  async listCountries(): Promise<Country[] | []> {
    try {
      const countries = await this.countryModel.find().exec();

      if (!countries || countries.length === 0) {
        console.log('No countries found in the database');
        throw new Error('No countries available');
      }
      return countries;
    } catch (error) {
      console.error('Error listing countries:', error);
      throw new Error('Failed to list countries');
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const countryInfoResponse = await lastValueFrom(
        this.httpService.get(
          `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
        ),
      );

      console.log('countryInfoResponse: ', countryInfoResponse?.data);

      return countryInfoResponse?.data;
    } catch (error) {
      console.error('Error fetching country info:', error);
      throw new Error('Failed to fetch country information');
    }
  }

  async getCountryFlag(countryCode: string) {
    try {
      const countryFlagResponse = await lastValueFrom(
        this.httpService.post(
          'https://countriesnow.space/api/v0.1/countries/flag/images',
          {
            iso2: countryCode,
          },
        ),
      );

      console.log('countryFlagResponse: ', countryFlagResponse?.data);
      return countryFlagResponse?.data?.flag;
    } catch (error) {
      console.error('Error fetching country info:', error);
      throw new Error('Failed to fetch country flag');
    }
  }

  async createdNewInfosCountry(countryCode: string): Promise<CountryNewInfos> {
    try {
      const countryInfos = await this.getCountryInfo(countryCode);
      const countryFlag = await this.getCountryFlag(countryCode);

      const existingCountryInfo = await this.countryInfoModel
        .findOne({ countryCode })
        .exec();

      if (existingCountryInfo) {
        throw new Error('Country info already exists');
      }

      const createdCountry = await this.countryInfoModel.create({
        countryCode,
        countryName: countryInfos?.countryName,
        borders: countryInfos?.borders || [],
        flagUrl: countryFlag,
      });

      return createdCountry;
    } catch (error) {
      console.error('Error creating country:', error);
      throw new Error('Failed to create country');
    }
  }

  async getCountryNewInfos(
    countryCode: string,
  ): Promise<CountryNewInfos | null> {
    try {
      const country = await this.countryInfoModel
        .findOne({ countryCode })
        .exec();

      if (!country) {
        console.log(`No information found for country code: ${countryCode}`);
        return null;
      }

      return country;
    } catch (error) {
      console.error('Error fetching country info:', error);
      throw new Error('Failed to fetch country information');
    }
  }
}
