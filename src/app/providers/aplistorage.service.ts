import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';



@Injectable({
  providedIn: 'root'
})
export class AplistorageService {

  static key = {
    error : 'error',
    search : 'search',
    history : 'history',
  };

  constructor(
    private storage: Storage,
  ) { 
    this.storage.create();
  }
  //ストレージにデータを入れる
  set(key: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.set(key, data)
        .then(data => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
      });
    });
  }

  //ストレージからデータ取得
   get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get(key)
        .then(data => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
      });
    });
  }
  
}