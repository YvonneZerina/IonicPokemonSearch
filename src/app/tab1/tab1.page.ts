import { Component } from '@angular/core';

import { AplistorageService } from '../providers/aplistorage.service';

import * as constant from 'src/app/constant';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  pokemon_name: any = constant.pokemon_name;
  history: any = [];

  constructor(
    private aplistorage: AplistorageService,
  ) {}

  // このページが開かられるたびに呼び出される
  ionViewWillEnter() {
    // ストレージからデータを取得する
    this.aplistorage.get(AplistorageService.key.history)
      .then(data => {
        this.history = data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}