# Hangman

Hangman is a simple game where you need to guess characters of a word. Each correct guess shows more of the word. If player guesses wrong, a part of the gallows gets build. Player loses if gallows gets built and stick figure gets hung.

This version of Hangman is made with Ionic 2 framework, and it is now available on Google Play store for free! You can download it from here: https://play.google.com/store/apps/details?id=com.voyacode.hangman. It is also my very first mobile app, so I hope you enjoy it. :)

# App features

The game consists of three pages: Main page, statistics and settings. Main page has the main game, statistics has all history data (wins and losses) and settings allow changing language or difficulty (how many attempts before game ends).

At the moment the game has support for English, Finnish and Swedish. English words are fetched from Wordnik API 
(http://www.wordnik.com/about), which has over 30,000 words. This app won't however use all of them, because many of them are
quite obscure, too short, too long, not in their base form, etc. App uses only words with high enough "corpus count", which means roughly how common they are. With the app's settings the app can access over 4,000 words from Wordnik.

Because Wordnik API requires online access, and its use has some limitations, app also has a smaller list of words it can use
offline. Because I haven't found any good APIs for non-english languages, all non-english languages will need to use limited word lists, stored in local memory.

App has been implemented so that new languages are really easy to add. Each language has two JSON files: app language (stored in languages/ folder) and dictionary (stored in dictionaries/folder). Once those are added and they are added to settings, nothing else needs to be done. App and dictionary language settings are kept seperately, so it is in theory possible to add custom dictionaries that don't need to be linked to any specific languahe - like "Harry Potter" dictionary, which could contain all words related to Harry Potter (just a random example - it could be absolutely anything).

# Supported languages
- English (500 words, 4000+ when online)
- Finnish (400 words)
- Swedish (250 words)

# More languages?

Like I said, I have made it really easy to add new languages and dictionaries. I could add only three, because I don't have experience with other spoken languages. If you have more experience with languages and would like to contribute, feel free to do so.

Some intructions:

App language file (JSON)
- Must contain all the same attributes as other languages, and their meaning should be more or less the same. Some small differences are allowed.
- Attribute values shouldn't be hugely longer than other languages (don't replace a single word with a novel).
- A translation of the new language needs to be added to all language files.
- Examples in www/languages/ folder.

Dictionary file (JSON)
- Words should be 4-14 characters long.
- Words should be in their base forms.
- Words should by default contain only nouns and adjectives, but exceptions can be made.
- Words should be real words.
- Words shouldn't contain inappropriate language.
- It's recommended to have at least 100 words. The more words, the better (as long as it doesn't go to higher thousands).
- File must have an alphabet list.
- Alphabet list should contain all common characters the words use, but it doesn't need to include rarer cases (like dashes or foreign characters). All characters that are not in the alphabet list are filled in automatically. 
- It's recommended that alphabet list isn't longer than 32 characters (40 absolute maximum). Over 32 characters will mean that buttons need 5 rows, which means less space for the picture.
- Examples in www/dictionaries/ folder
