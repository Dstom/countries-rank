import { Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { AppComponent } from './app.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';

export const routes: Routes = [
    { path: '', component: CountryComponent },
    { path: 'country/:id', component: CountryDetailComponent },
];
