import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
    //
  }

  store(key: string, value: string) {
    // Todo: implement object to json string conversion for complex type storage
    localStorage.setItem(key, value);
  }

  retrieve(key: string) {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
