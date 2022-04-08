
export class LocationInfo {
  continent: string;
  country: string;
  country_capital:string;
  ip: string;

  constructor(continent: string, country: string, country_capital: string, ip: string) {
    this.continent = continent
    this.country = country
    this.country_capital = country_capital
    this.ip = ip
  }

}
