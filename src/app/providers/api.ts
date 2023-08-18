import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AplistorageService } from './aplistorage.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService{
    constructor(
        private httpClient: HttpClient,
        private aplistorage: AplistorageService
    ){}

    //apiからデータを取得
    public get(url: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
          const options = {
            headers: new HttpHeaders(),
          };
      
          this.httpClient.get(url, options).subscribe({
            next: (data: any) => {
              this.aplistorage.set(AplistorageService.key.search, { options, return: data });
              resolve(data);
            },
            error: (error: HttpErrorResponse) => {
              this.aplistorage.set(AplistorageService.key.error, error);
              console.error(error);
              reject(error);
            }
          });
        });
    }      

}