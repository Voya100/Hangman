import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingsService {

  language: string = 'english';
  lang: any;
  wordList: string[] = [];

  max_guesses = 9;
  difficulty = 1;

  initialized = false;

  // Supported languages
  readonly languages:string[] = ['english'];

  constructor(private http: Http, private storage: Storage) {
  }

  // Initialises settings
  init(){
    return this.storage.get('language').then((lang) => {
      if(lang !== null){
        this.language = lang;
      }
      console.log("Setting test:", lang);
    }).then(() => {
      return this.getLanguageFiles();
    }).then(() => {
        return this.storage.get('difficulty').then((value) => {
          if(value !== null){
            this.difficulty = value;
          }
      })
    }).then(() => {
      this.initialized = true;
    })    
  }

  getLanguageFiles(){
    return Promise.all([
      this.http.get('lang/' + this.language + '.json').toPromise().then((data) =>{
        this.lang = data.json();
      }),
      this.http.get('lang/word-lists/' + this.language + '-words.json').toPromise().then((data) =>{
        this.wordList = data.json();
      })
    ]);
  }

  // Updates language setting
  updateLanguage(lang: string): Promise<any>{
    this.language = lang;
    return this.storage.set('language', lang).then(() => {
      return this.getLanguageFiles();
    });
  }
}