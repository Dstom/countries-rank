import { Component, Input } from '@angular/core';
import { Country, Region, SortInterface, Sorts } from '../../models/Country';
import { ApiService } from '../../services/ApiService';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
  providers: [ApiService]

})
export class CountryComponent {
  sortByLabels: SortInterface[] = [
    { key: Sorts.Population, name: 'Population' },
    { key: Sorts.Name, name: 'Name' },
    { key: Sorts.Area, name: 'Area' }
  ];
  selectedOption: SortInterface = this.sortByLabels[0];
  initCountries: Country[] = [];
  unMemberCheck: boolean = true;
  independentCheck: boolean = true;

  searchFilter = '';

  sortTypes = {
    [Sorts.Population]: (data: Country[]) => {
      return [...this.filterByRegions(data).sort((a, b) => b.population - a.population)]
    },
    [Sorts.Name]: (data: Country[]) => {
      return [...this.filterByRegions(data).sort((a, b) => a.name.common.localeCompare(b.name.common))]
    },
    [Sorts.Area]: (data: Country[]) => {
      return [...this.filterByRegions(data).sort((a, b) => b.area - a.area)]
    }
  }
  regions: Region[] = [
    { label: "Americas", isChecked: false },
    { label: "Antarctic", isChecked: false },
    { label: "Africa", isChecked: false },
    { label: "Asia", isChecked: false },
    { label: "Europe", isChecked: false },
    { label: "Oceania", isChecked: false }
  ]
  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit() {
    this.apiService.getAllCountries().subscribe((data: Country[]) => {
      this.initCountries = data;
    });
  }

  filterByStatus(data: Country[]) {
    return data.filter(x => x.unMember === this.unMemberCheck && x.independent === this.independentCheck);
  }

  filterByRegions(data: Country[]) {
    const checked = this.regions.filter(x => x.isChecked).map(x => x.label);
    const unchecked = this.regions.filter(x => !x.isChecked).map(x => x.label);
    return checked.length > 0 ?
      data.filter(x => checked.includes(x.region)) :
      data.filter(x => unchecked.includes(x.region))
  }

  filterCountriesBySearch() {
    if (this.searchFilter !== null && this.searchFilter.length > 1) {
      const searchText = this.searchFilter.toLowerCase()
      return this.initCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchText) ||
        country.region.toLowerCase().includes(searchText) ||
        country.subregion.toLowerCase().includes(searchText))
    } else {
      return this.initCountries;
    }
  }

  sortedCountries() {
    const filteredByStatus = this.filterByStatus(this.filterCountriesBySearch());
    const name = this.selectedOption.key;
    return this.sortTypes[name](filteredByStatus);
  }

  setRegionCheckBoxValue(controlName: string) {
    const indexRegionChecked = this.regions.findIndex(x => x.label === controlName);
    this.regions[indexRegionChecked].isChecked = !this.regions[indexRegionChecked].isChecked;
  }

  setUnMemberCheck() {
    this.unMemberCheck = !this.unMemberCheck;
  }

  setIndenpendentCheck() {
    this.independentCheck = !this.independentCheck;
  }

  goCountries(countryName: string) {

    const countrySlug = countryName.replaceAll(' ', '-');
    this.router.navigate(["country", countrySlug]);
  }
}
