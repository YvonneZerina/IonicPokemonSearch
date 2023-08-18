import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../providers/api';

import * as constant from 'src/app/constant';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  types: any[] = constant.types;
  pokemon_name: any = constant.pokemon_name;

  search_result_pokemons = [];

  // search_type -> name, type, number
  search_type: string = 'name';

  input_name_value: string = '';
  input_number_value: number = 1;
  input_type_value: number = 1;

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  // 検索ボタンをクリックした時
  search() {
    this.search_result_pokemons = [];

    let search_url = 'pokemon/1'
    if (this.search_type === 'name') {
      const english_name = Object.keys(this.pokemon_name).find(key => this.pokemon_name[key] === this.input_name_value);
      search_url = 'pokemon/' + english_name;
    } else if (this.search_type === 'number') {
      search_url = 'pokemon/' + this.input_number_value;
    } else if (this.search_type === 'type') {
      search_url = 'type/' + this.input_type_value;
    }
    const url = constant.urls.api_base + search_url;

    // apiからデータを取得する
    this.api.get(url)
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          if (this.search_type === 'name') {
            if (data.data.name) {
              // 画面の移動
              this.router.navigate(['/detail', {name: data.data.name}]);
            } else {
              alert('ポケモンは見つかりませんでした。');
            }
          } else if (this.search_type === 'number') {
            if (data.data.name) {
              // 画面の移動
              this.router.navigate(['/detail', {name: data.data.name}]);
            } else {
              alert('ポケモンは見つかりませんでした。');
            }
          } else if (this.search_type === 'type') {
            if (data.data.pokemon) {
              this.search_result_pokemons = data.data.pokemon;
            } else  {
              alert("ポケモンは見つかりませんでした。");
            }
          }
        } else if (data.status === 404) {
          alert("ポケモンは見つかりませんでした。");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // ポケモンを選択した時
  clickPokemon(pokemon: any) {
    // 画面の移動
    this.router.navigate(['/detail', {name: pokemon['pokemon']['name']}]);
  }
}