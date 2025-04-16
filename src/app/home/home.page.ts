import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WeatherService } from '../services/weather.service';
import { LocalStorageService } from '../services/local-storage.service';
import { WeatherData } from '../../model/weather.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage {
  city: string = '';
  weatherData: WeatherData | null = null;
  favorites: string[] = [];
  favoriteWeather: { [city: string]: WeatherData } = {};

  constructor(
    private weatherService: WeatherService,
    private localStorageService: LocalStorageService
  ) {
    this.loadFavorites();
  }

  getWeather(): void {
    if (!this.city) return;
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => this.weatherData = data,
      error: () => alert('City not found.')
    });
  }

  saveToFavorites(): void {
    if (this.city) {
      this.localStorageService.saveCity(this.city);
      this.loadFavorites();
    }
  }

  loadFavorites(): void {
    this.favorites = this.localStorageService.getFavorites();
    this.favoriteWeather = {};

    for (const favCity of this.favorites) {
      this.weatherService.getWeather(favCity).subscribe({
        next: (data) => this.favoriteWeather[favCity] = data,
        error: () => console.warn(`Could not fetch weather for ${favCity}`)
      });
    }
  }

  fetchFavorite(city: string): void {
    this.city = city;
    this.getWeather();
  }
}

