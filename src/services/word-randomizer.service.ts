import { Injectable } from '@angular/core';
import { apiKey } from './apiKey'
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SettingsService } from './settings.service'

@Injectable()
export class WordRandomizerService {

  words: string[] = [];
  
  // Hard: 1000-25000, Medium: 25000-250000, Easy: 250000
  difficulty = 1000000;

  constructor(private http: Http,
              private settings: SettingsService) { }

  // Gets 15 new words from API and saves them to words. Returns a promise.
  getWords(){
    let url = "http://api.wordnik.com/v4/words.json/randomWords?minCorpusCount=250000&maxCorpusCount=-1&minDictionaryCount=10&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&hasDictionaryDef=true&includePartOfSpeech=noun,adjective&limit=15&maxLength=14&api_key=" + apiKey;


    return this.http.get(url).toPromise().then((response) => {
      let newWords = response.json().map(o => o.word);
      // Randomize words (default: alphabetical)
     let len = newWords.length;
     while(len){
       len--;
       let i = Math.floor(Math.random() * len);
       let word2 = newWords[i];
       newWords[i] = newWords[len];
       newWords[len] = word2;
     }
     this.words = newWords;
     console.log(this.words);
    });
  }

  // Returns a promise of a random word.
  // If word list has words, word is taken from there.
  // If word list is empty or becomes empty with this method, new words are fetched immediately
  // If fetching new words fails, or language isn't english, a word is taken from intalled word list
  // This method should always fulfill the promise - errors shouldn't be possible
  getWord(): Promise<string>{
    let promise = new Promise((resolve, reject) => {
      let resolved = false;
      if(this.settings.language !== 'english'){
        resolve(this.getWordFromList());
        return;
      }

      // Enough words in the word list
      if(this.words.length >= 1){
        resolve(this.words.pop().toUpperCase());
        resolved = true;
      }
      // If list is empty, get more words
      if(this.words.length == 0){
        this.getWords()
            .then(() => {
              if(!resolved){
                resolve(this.words.pop().toUpperCase())
              }
            })
            .catch(() => {
              if(!resolved){
                resolve(this.getWordFromList());
                console.log("Error caught")
              }
            })
      }
    });
    return promise;
  }

  getWordFromList(){
    return this.settings.wordList[Math.floor(Math.random()*this.settings.wordList.length)].toUpperCase();
  }

}