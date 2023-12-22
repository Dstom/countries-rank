import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/ApiService';
import { HttpClientModule } from '@angular/common/http';
import { Country, Region, SortInterface, Sorts } from './models/Country';
import { FormsModule } from '@angular/forms';
import { countReset } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})

export class AppComponent {
  title = 'Countries App';  
}