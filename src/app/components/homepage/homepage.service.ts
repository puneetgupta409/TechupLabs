import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  , BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private http: HttpClient) { }

  // TO GET THE CHAT RESPONSE OF THE APPLICATION API
  getRegionData(): Observable<any> {
    const apiUrl = 'https://api.first.org/data/v1/countries'
    const headers = new HttpHeaders({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
    });
    return this.http.get<any>(apiUrl);
  }
  // TO GET THE CHAT RESPONSE OF THE APPLICATION API


}
