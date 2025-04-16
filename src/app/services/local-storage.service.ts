import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageKey = 'favoriteCities';

  saveCity(city: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  getFavorites(): string[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
  clearFavorites(): void {
    localStorage.removeItem(this.storageKey);
  }
  
}
