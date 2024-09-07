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

  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryInfo(countryCode);
  }
}
