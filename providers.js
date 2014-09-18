var providers = {
  defaults : [ '54', '11', '8', '35', '9', '31', '45', '5', '3', '53', '40',
      '39' ],
  // '2' : {
  // title : 'Translate',
  // lookup_url : 'http://qwickup.com/google?query={{query}}',
  // tags : 'multi en'
  // },
  '3' : {
    title : 'TheFreeDict.',
    suggestion_weight : 0.2,
    lookup_url : 'http://www.thefreedictionary.com/{{query}}',
    tags : 'en'
  },
  '4' : {
    title : 'Merriam-Webster',
    lookup_url : 'http://www.merriam-webster.com/dictionary/{{query}}',
    suggestion_weight : 1,
    suggestion_url : 'http://www.merriam-webster.com/autocomplete?ref=1&query={{query}}',
    suggestion_path : 'jpath:$.suggestions[*]',
    tags : 'en'
  },
  '5' : {
    title : 'Dictionary.com',
    lookup_url : 'http://dictionary.reference.com/browse/{{query}}',
    tags : 'en'
  },
  '8' : {
    title : 'Wiktionary',
    lookup_url : 'http://en.wiktionary.org/wiki/{{query}}',
    suggestion_weight : 1.2,
    suggestion_url : 'http://en.wiktionary.org/w/api.php?action=opensearch&limit=10&format=json&search={{query}}',
    suggestion_path : 'jpath:$[1][*]',
    tags : 'en'
  },
  '9' : {
    title : 'Forvo',
    lookup_url : 'http://www.forvo.com/word/{{query}}/',
    tags : 'en'
  },
  '11' : {
    title : 'WordNet',
    lookup_url : 'http://dict.qwickup.com/wordnet/q={{query}}',
    tags : 'en'
  },
  '31' : {
    title : 'Longman',
    lookup_url : 'http://www.ldoceonline.com/search/?q={{query}}',
    tags : 'en'
  },
  '35' : {
    title : 'Wikipedia',
    lookup_url : 'http://en.wikipedia.org/w/index.php?&search={{query}}',
    suggestion_weight : 0.4,
    suggestion_url : 'http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&search={{query}}',
    suggestion_path : 'jpath:$[1][*]',
    tags : 'en'
  },
  '37' : {
    title : 'MW Learner\'s',
    lookup_url : 'http://www.learnersdictionary.com/search/{{query}}',
    tags : 'en'
  },
  '38' : {
    title : 'Vocabulary',
    lookup_url : 'http://www.vocabulary.com/definition/{{query}}',
    tags : 'en'
  },
  '39' : {
    title : 'Urban',
    lookup_url : 'http://www.urbandictionary.com/define.php?term={{query}}',
    tags : 'en'
  },
  '40' : {
    title : 'Dictionarist',
    lookup_url : 'http://www.dictionarist.com/{{query}}',
    tags : 'multi en'
  },
  '41' : {
    title : 'YourDict.',
    lookup_url : 'http://www.yourdictionary.com/{{query}}',
    tags : 'en'
  },
  '42' : {
    title : 'Wordnik',
    lookup_url : 'http://www.wordnik.com/words/{{query}}',
    tags : 'en'
  },
  '43' : {
    title : 'BeeDict.',
    lookup_url : 'http://www.beedictionary.com/meaning/{{query}}',
    tags : 'en'
  },
  '44' : {
    title : 'Macmillan',
    lookup_url : 'http://www.macmillandictionary.com/search/american/direct/?q={{query}}',
    tags : 'en'
  },
  '45' : {
    title : 'Cambridge',
    suggestion_weight : 1,
    lookup_url : 'http://dictionary.cambridge.org/search/learner-english/direct/?q={{query}}',
    suggestion_url : 'http://dictionary.cambridge.org/autocomplete/learner-english/?multi=0&q={{query}}',
    suggestion_path : 'jpath:$.results[*]',
    tags : 'en'
  },
  '47' : {
    title : 'Bing',
    lookup_url : 'http://www.bing.com/Dictionary/search?q=define+{{query}}',
    tags : 'en'
  },
  '48' : {
    title : 'NinjaWords',
    lookup_url : 'http://ninjawords.com/{{query}}',
    tags : 'en'
  },
  '49' : {
    title : 'Definr',
    lookup_url : 'http://definr.com/{{query}}',
    tags : 'en'
  },
  '50' : {
    title : 'Definely',
    lookup_url : 'http://definely.com/word/{{query}}',
    tags : 'en'
  },
  '51' : {
    title : 'Thsrs',
    lookup_url : 'http://www.ironicsans.com/thsrs/?q={{query}}',
    tags : 'en'
  },
  '52' : {
    title : 'howjsay',
    lookup_url : 'http://www.howjsay.com/index.php?word={{query}}&submit=Submit',
    tags : 'en'
  },
  '53' : {
    title : 'Definitions',
    lookup_url : 'http://translate.definitions.net/{{query}}',
    tags : 'multi en'
  },
  '54' : {
    title : 'Collins',
    lookup_url : 'http://www.collinsdictionary.com/dictionary/english/{{query}}',
    suggestion_weight : 1,
    suggestion_url : 'http://www.collinsdictionary.com/search/autocomplete/ENGLISH_DICTIONARY?term={{query}}',
    suggestion_path : 'jpath:$[*]',
    tags : 'en'
  },
  '55' : {
    title : 'IATE',
    lookup_url : 'http://iate.europa.eu/iatediff/SearchByQuery.do?method=search&sourceLanguage=s&targetLanguages=s&domain=0&typeOfSearch=s&query={{query}}',
    tags : 'term multi en'
  },
  '56' : {
    title : 'Oxford',
    lookup_url : 'http://oxforddictionaries.com/definition/english/{{query}}',
    suggestion_weight : 1,
    suggestion_url : 'http://oxforddictionaries.com/autocomplete/english/?multi=0&q={{query}}',
    suggestion_path : 'jpath:$.results[*]',
    tags : 'en'
  },
  '57' : {
    title : 'Thesaurus',
    lookup_url : 'http://thesaurus.com/browse/{{query}}',
    tags : 'en'
  },
  '58' : {
    title : 'CNRTL',
    lookup_url : 'http://www.cnrtl.fr/definition/{{query}}',
    tags : 'fr'
  },
  '59' : {
    title : 'Treccani',
    lookup_url : 'http://www.treccani.it/vocabolario/tag/{{query}}/',
    tags : 'it'
  }
};