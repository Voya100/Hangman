import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingsService {

  language: string = 'english';
  lang: any;
  wordList: string[] = [];

  max_guesses = 9;
  difficulty = 1;

  constructor(private http: Http) { 
  }

  // Updates language setting
  updateLanguage(lang: string): Promise<any>{
    this.language = lang;

    return Promise.all([
      this.http.get('../lang/' + lang + '.json').toPromise().then((data) =>{
        this.lang = data.json();
      }),
      this.http.get('../lang/word-lists/' + lang + '-words.json').toPromise().then((data) =>{
        this.wordList = data.json();
      })
    ]);
  }
}