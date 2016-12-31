import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/toPromise';

// SettingsService contain all game settings and language/dictionary information
// Settings are saved to local memory

@Injectable()
export class SettingsService {

  // Changeable settings
  settings = {
    language: 'english',
    dictionary: 'english',
    difficulty: 0,
    onlineMode: true
  }

  // Set based on settings
  lang: any = {};
  wordList: string[] = [];
  alphabet: string[] = [];

  // Constants
  readonly max_guesses = 9;

  // Supported languages
  readonly languages:string[] = ['english', 'finnish', 'swedish'];

  initialized = false;
  
  constructor(private http: Http, private storage: Storage) {
  }

  // Initialises settings, returns a promise
  init(){
    return this.storage.get('settings').then((settings) => {
      if(settings !== null){
        settings.difficulty = parseInt(settings.difficulty);
        this.settings = settings;
        this.initialized = true;
      }
    })
    .then(() => {
      return this.getFiles();
    })    
  }
  // Gets language file which contains all text inside the app, returns a promise.
  getLanguageFile(){
    return this.http.get('languages/' + this.settings.language + '.json').toPromise().then((data) =>{
      this.lang = data.json();
    })
  }

  // Gets dictionary file which contains a list of words, returns a promise.
  getDictionaryFile(){
    return this.http.get('dictionaries/' + this.settings.dictionary + '.json').toPromise().then((data) =>{
      let dictData = data.json();
      this.alphabet = dictData.alphabet;
      this.wordList = dictData.words;
    });
  }

  // Gets language and dictionary files, returns a promise
  getFiles(){
    return Promise.all([
      this.getLanguageFile(),
      this.getDictionaryFile()
    ])
  }

  // Updates language setting
  updateLanguage(lang: string): Promise<any>{
    this.settings.language = lang;
    return this.storage.set('settings', this.settings).then(() => {
      this.initialized = true;
      return this.getLanguageFile();
    });
  }

  // Updates dictionary setting
  updateDictionary(dict: string): Promise<any>{
    this.settings.dictionary = dict;
    return this.storage.set('settings',this.settings).then(() => {
      return this.getDictionaryFile();
    })
  }

  // Updates difficulty setting
  updateDifficulty(difficulty: number){
    this.settings.difficulty = difficulty;
    this.storage.set('settings', this.settings);
  }

  // Updates onlineMode setting
  updateOnlineMode(online: boolean){
    this.settings.onlineMode = online;
    this.storage.set('settings', this.settings);
  }
}