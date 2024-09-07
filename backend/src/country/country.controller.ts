import { Controller, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAllCountries() {
    return this.countryService.getAvailableCountries();
  }

  @Post()
  async returnCountriesDB() {
    return this.countryService.saveCountries();
  }

  @Get('list')
  async listCountries() {
    return this.countryService.listCountries();
  }

  @Get(':countryCode/infos')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryInfo(countryCode);
  }

  @Get(':countryCode/flag')
  async getCountryFlag(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryFlag(countryCode);
  }

  @Get(':countryCode')
  async getCountryNewInfos(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryNewInfos(countryCode);
  }

  @Post(':countryCode/create')
  async createCountryInfos(@Param('countryCode') countryCode: string) {
    return this.countryService.createdNewInfosCountry(countryCode);
  }
}
