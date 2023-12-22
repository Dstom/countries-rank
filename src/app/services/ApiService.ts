import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../models/Country';
import { environment } from '../../environments/environment';


@Injectable()
export class ApiService {

    //apiUrl = 'https://restcountries.com/v3.1';
    constructor(private http: HttpClient) { }

    getAllCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(`${environment.apiUrl}/all?fields=name,flags,population,independent,unMember,area,region,subregion,languages,currencies,borders,cca3`);
    }

    getBorders(borders: string[]): Observable<Country[]> {
        return this.http.get<Country[]>(`${environment.apiUrl}/alpha?codes=${borders.join(',')}`);
    }

    getCountry(name: string): Observable<Country | null> {
        return this.http.get<Country[]>(`${environment.apiUrl}/name/${name}??fullText=true`)
            .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null))
            )

    }
}

