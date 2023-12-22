import { Component } from '@angular/core';
import { Country } from '../../models/Country';
import { ApiService } from '../../services/ApiService';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent {
  country?: Country;
  neighbouringCountries?: Country[];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({ id }) => this.apiService.getCountry(id.replaceAll('-', ' ')))
    ).subscribe(country => {
      if (!country) {
        return this.router.navigateByUrl('');
      }
      this.country = country;
      this.apiService.getBorders(this.country.borders).subscribe(countries => {
        this.neighbouringCountries = countries;
      })
      return;
    })
  }
  
  getLanguages() {
    return Object.values(this.country!.languages).join(', ')
  }

  getCurrencies() {
    const currencyKeys = Object.keys(this.country!.currencies);
    return currencyKeys
      .reduce((a, b, index) => `${a}${this.country!.currencies[b].name}${index !== currencyKeys.length - 1 ? ', ' : ''}`, '');
  }
}
