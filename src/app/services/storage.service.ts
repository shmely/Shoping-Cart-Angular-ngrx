import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})

export class StorageService {

    saveToStorage(key: string, val) {
        localStorage.setItem(key, JSON.stringify(val))
    }
    loadFromStorage(key: string): any {
        var val = localStorage.getItem(key)
        return JSON.parse(val)
    }
    removeFromStorage(key) {
        localStorage.removeItem(key);
    }
}



