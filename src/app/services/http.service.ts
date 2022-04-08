import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getIpInfo(ip: string) {
    const headers = new HttpHeaders({});
    const endpoint = `http://ipwhois.app/json/${ip}?objects=continent,country,country_capital,ip`

    return this.http.get(endpoint);
  }

}
