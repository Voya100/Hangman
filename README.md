# Hangman

NOTE: Project is still a work in progress. All parts aren't finished yet, and code may have some extra stuff that will be removed at
later date..

This is a Hangman mobile app for Android with support for multiple languages. It is implemented with Ionic 2 framework.

The game consists of three pages: Main page, statistics and settings. Main page has the main game, statistics has all history data
(wins and losses) and settings allow changing language or difficulty (how many attempts before game ends).

At the time of writing this the game has support for English and Finnish. English words are fetched from Wordnik API 
(http://www.wordnik.com/about), which has over 30,000 words. This app won't however use all of them, because many of them are
quite obscure. App uses only words with high enough "corpus count", which means roughly how common they are. I would roughly
estimate that app can use at least 5,000 different English words from Wordnik.

Because Wordnik API requires online access, and its use has some limitations, app also has a smaller list of words it can use
offline. Because I haven't found any good APIs for non-english languages, all non-english languages will need to use limited word
lists.

App has been implemented so that new languages are really easy to add. App only needs two language files: www/lang/lang-name.json 
and www/lang/word-lists/lang-name-words.json, which contain translations for in-app texts and a list of words the game can ask 
the player about. Then they only need to be added to settings service, which contains a list of supported languages.

At the moment English (500 words) and Finnish (400 words) are supported, but I plan to add Swedish soon, before app's 
release to Google Play's app store.
