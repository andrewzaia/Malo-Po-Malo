(function () {
  'use strict';
  const pairs = [['dž','џ'],['lj','љ'],['nj','њ'],['a','а'],['b','б'],['c','ц'],['č','ч'],['ć','ћ'],['d','д'],['đ','ђ'],['e','е'],['f','ф'],['g','г'],['h','х'],['i','и'],['j','ј'],['k','к'],['l','л'],['m','м'],['n','н'],['o','о'],['p','п'],['r','р'],['s','с'],['š','ш'],['t','т'],['u','у'],['v','в'],['z','з'],['ž','ж']];
  function cyrillic(text) {
    return text.replace(/DŽ|Dž|dž|LJ|Lj|lj|NJ|Nj|nj|[abcčćdđefghijklmnoprsštuvzž]/gi, value => {
      const pair = pairs.find(p => p[0] === value.toLowerCase());
      return value[0] === value[0].toUpperCase() ? pair[1].toUpperCase() : pair[1];
    });
  }
  function latin(text) {
    return text.replace(/[а-бвгдђежзијклљмнњопрстћуфхцчџш]/gi, value => {
      const pair = pairs.find(p => p[1] === value.toLowerCase());
      if (!pair) return value;
      return value === value.toUpperCase() ? pair[0][0].toUpperCase() + pair[0].slice(1) : pair[0];
    });
  }
  function normalise(text) { return latin(text).normalize('NFC').toLowerCase().replace(/[.!?,;:]/g,'').trim().replace(/\s+/g,' '); }
  function withoutMarks(text) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'dj'); }
  function assess(input, answers) {
    const value = normalise(input);
    if (!value) return 'empty';
    if (answers.some(a => normalise(a) === value)) return 'correct';
    if (answers.some(a => withoutMarks(normalise(a)) === withoutMarks(value))) return 'accent';
    return 'incorrect';
  }
  const alphabetRows = [
    ['A','ah','Keep it open, like the a in father.','avion','airplane'],
    ['B','b','Like b in book.','baba','grandmother'],
    ['C','ts','Like the ending of cats. Never an English k or s.','cena','price'],
    ['Č','ch','Like ch in chair. Compare with the softer ć.','čaj','tea'],
    ['Ć','soft ch','A softer, forward ch sound; there is no exact English match.','ćao','hi / bye'],
    ['D','d','Like d in dog.','dan','day'],
    ['Dž','j','Like j in jam. Two Latin characters, one letter.','džem','jam'],
    ['Đ','soft j','A softer, forward j sound; distinct from dž.','đak','pupil'],
    ['E','eh','Like e in bed; keep it a single, steady vowel.','eto','there / there you go'],
    ['F','f','Like f in fish.','film','film'],
    ['G','g','Always hard, like g in go.','grad','city'],
    ['H','h','An airy h, sometimes further back in the throat.','hvala','thank you'],
    ['I','ee','Like ee in see; keep it steady.','ime','name'],
    ['J','y','Like y in yes. Never an English j.','ja','I'],
    ['K','k','Like k in kite.','kafa','coffee'],
    ['L','l','Like l in lamp.','leto','summer'],
    ['Lj','ly','A blended sound, close to lli in million. One letter.','ljubav','love'],
    ['M','m','Like m in moon.','mama','mum'],
    ['N','n','Like n in net.','ne','no'],
    ['Nj','ny','A blended sound, close to ny in canyon. One letter.','njiva','field'],
    ['O','oh','A short, rounded vowel; do not glide into an English ow.','oko','eye'],
    ['P','p','Like p in pen.','pet','five'],
    ['R','rolled r','Tap or roll the r with your tongue; it can carry a syllable.','ruka','hand'],
    ['S','s','Like s in sun.','sedam','seven'],
    ['Š','sh','Like sh in shop.','šest','six'],
    ['T','t','Like t in top.','tri','three'],
    ['U','oo','Like oo in food; keep it steady.','ulica','street'],
    ['V','v','Like v in van.','voda','water'],
    ['Z','z','Like z in zoo.','zima','winter'],
    ['Ž','zh','Like the middle sound of measure.','žena','woman']
  ];
  const alphabet = alphabetRows.map((r,i) => ({id:'letter-'+i,latin:r[0],sound:r[1],note:r[2],english:r[4],example:r[3],label:r[0],kind:'letter'}));
  const numbersRows = [
    [1,'jedan','yeh-dahn'],[2,'dva','dvah'],[3,'tri','tree'],[4,'četiri','cheh-tee-ree'],[5,'pet','peht'],[6,'šest','shehst'],[7,'sedam','seh-dahm'],[8,'osam','oh-sahm'],[9,'devet','deh-veht'],[10,'deset','deh-seht'],
    [11,'jedanaest','yeh-dah-nah-ehst'],[12,'dvanaest','dvah-nah-ehst'],[13,'trinaest','tree-nah-ehst'],[14,'četrnaest','cheh-tr-nah-ehst'],[15,'petnaest','peht-nah-ehst'],[16,'šesnaest','shehs-nah-ehst'],[17,'sedamnaest','seh-dahm-nah-ehst'],[18,'osamnaest','oh-sahm-nah-ehst'],[19,'devetnaest','deh-veht-nah-ehst'],[20,'dvadeset','dvah-deh-seht'],
    [30,'trideset','tree-deh-seht'],[40,'četrdeset','cheh-tr-deh-seht'],[50,'pedeset','peh-deh-seht'],[60,'šezdeset','shehz-deh-seht'],[70,'sedamdeset','seh-dahm-deh-seht'],[80,'osamdeset','oh-sahm-deh-seht'],[90,'devedeset','deh-veh-deh-seht'],[100,'sto','stoh'],[1000,'hiljada','hee-lyah-dah'],[10000,'deset hiljada','deh-seht hee-lyah-dah']
  ];
  const numbers = numbersRows.map(r=>({id:'number-'+r[0],latin:r[1],english:r[0].toLocaleString('en-AU'),sound:r[2],label:r[0].toLocaleString('en-AU'),note:r[0]===2?'Dva is the basic counting form. With feminine nouns, two becomes dve.':r[0]===1000?'Hiljada means a thousand. Jedna hiljada also means one thousand.':r[0]===60?'Notice the z in šezdeset.':r[0]===10000?'Two words: deset + hiljada.':'Say it slowly, then repeat without looking.'}));
  const pronounsRows=[
    ['ja','I','yah','The person speaking.'],['ti','you · one person, informal','tee','Use ti with a friend or someone you know well.'],['on','he','ohn','Masculine singular.'],['ona','she','oh-nah','Feminine singular.'],['ono','it · neuter','oh-noh','Neuter singular. Serbian nouns also have grammatical gender.'],['mi','we','mee','You and at least one other person.'],['vi','you · plural or polite','vee','Use vi for several people, or one person politely. Polite Vi is often capitalised.'],['oni','they · masculine or mixed group','oh-nee','For males or a mixed group of people.'],['one','they · feminine','oh-neh','For a group of females, or feminine nouns.'],['ona','they · neuter','oh-nah','For neuter plural nouns. Context distinguishes this from ona meaning she.']
  ];
  const pronouns=pronounsRows.map((r,i)=>({id:'pronoun-'+i,latin:r[0],english:r[1],sound:r[2],note:r[3],label:r[0],sub:r[1]}));
  const beRows=[['ja sam','I am','yah sahm','Ja sam ovde.','I am here.'],['ti si','you are · informal singular','tee see','Ti si ovde.','You are here.'],['on je','he is','ohn yeh','On je ovde.','He is here.'],['ona je','she is','oh-nah yeh','Ona je ovde.','She is here.'],['ono je','it is · neuter','oh-noh yeh','Ono je ovde.','It is here.'],['mi smo','we are','mee smoh','Mi smo ovde.','We are here.'],['vi ste','you are · plural or polite','vee steh','Vi ste ovde.','You are here.'],['oni su','they are · masculine / mixed','oh-nee soo','Oni su ovde.','They are here.'],['one su','they are · feminine','oh-neh soo','One su ovde.','They are here.'],['ona su','they are · neuter','oh-nah soo','Ona su ovde.','They are here.']];
  const be=beRows.map((r,i)=>({id:'be-'+i,latin:r[0],english:r[1],sound:r[2],example:r[3],exampleMeaning:r[4],label:r[0],note:'Ovde means here. The verb changes to match the person.'}));
  const conversationsRows=[
    ['Zdravo','Hello','zdrah-voh','An everyday greeting.'],['Ćao','Hi / bye','chow','Casual: use with friends. The ć is softer than English ch.'],['Dobro jutro','Good morning','doh-broh yoo-troh','Use in the morning.'],['Dobar dan','Good day','doh-bar dahn','A useful, polite daytime greeting.'],['Dobro veče','Good evening','doh-broh veh-cheh','Use when greeting someone in the evening.'],['Laku noć','Good night','lah-koo nohch','A farewell or bedtime wish, rather than an evening greeting.'],['Doviđenja','Goodbye','doh-vee-dyeh-nyah','A polite way to say goodbye. Đ is a soft j-like sound.'],['Kako si?','How are you? · informal','kah-koh see','To one person you know well.'],['Kako ste?','How are you? · polite / plural','kah-koh steh','To one person politely, or several people.'],['Dobro, hvala.','Fine, thank you.','doh-broh hvah-lah','A simple reply to Kako si? or Kako ste?'],['Hvala','Thank you','hvah-lah','Say both the h and v.'],['Molim','Please / you’re welcome','moh-leem','Meaning depends on context; it can also mean “Pardon?”'],['Da','Yes','dah','A short affirmative answer.'],['Ne','No','neh','A short negative answer.'],['Izvinite','Excuse me / sorry · polite','eez-vee-nee-teh','To get attention or apologise politely.'],['Ne razumem.','I don’t understand.','neh rah-zoo-mehm','A useful phrase when you need help.'],['Govorite li engleski?','Do you speak English? · polite','goh-voh-ree-teh lee ehn-gleh-skee','A polite question.'],['Kako se zoveš?','What is your name? · informal','kah-koh seh zoh-vesh','To one person you know well.'],['Zovem se Ana.','My name is Ana.','zoh-vehm seh ah-nah','Replace Ana with your own name.'],['Drago mi je.','Nice to meet you.','drah-goh mee yeh','Use after an introduction.']
  ];
  const conversation=conversationsRows.map((r,i)=>({id:'phrase-'+i,latin:r[0],english:r[1],sound:r[2],note:r[3],label:r[0]}));
  const lessons=[
    {id:'alphabet',title:'The alphabet',serbian:'Abeceda / Azbuka',short:'30 letters',description:'Meet the letters, then say them out loud. Start with five today.',tip:'Serbian has 30 letters. Lj, nj and dž are each one letter in Latin. Their Cyrillic partners are љ, њ and џ.',cards:alphabet},
    {id:'numbers',title:'Numbers',serbian:'Brojevi',short:'1 to 10,000',description:'Start with 1–10, then try the teens and the tens.',tip:'Learn 1–20 first. Then count by tens to 100. For 21, put the words together: dvadeset jedan.',cards:numbers},
    {id:'pronouns',title:'Pronouns',serbian:'Lične zamenice',short:'I, you, we…',description:'Small words that tell us who we are talking about.',tip:'Ti is informal and singular. Vi means several people, or one person politely. They has three forms: oni, one and ona.',cards:pronouns},
    {id:'be',title:'“To be”',serbian:'Biti',short:'sam, si, je…',description:'Build your first sentences with “I am”, “you are” and “we are”.',tip:'The everyday short forms are sam, si, je, smo, ste and su. Practise with a pronoun first: ja sam, ti si. Short forms do not stand alone at the start of a sentence.',cards:be},
    {id:'conversation',title:'Everyday conversation',serbian:'Razgovor',short:'Say your first words',description:'Say hello, introduce yourself, and ask for a little help.',tip:'Begin with Dobar dan, Hvala and Doviđenja. Use Kako si? with a friend and Kako ste? politely.',cards:conversation}
  ];
  // Questions are composed only from the lesson's beginner vocabulary and forms.
  const quiz = Object.fromEntries(lessons.map(l => [l.id, []]));
  const practice = Object.fromEntries(lessons.map(l => [l.id, []]));
  const unique = values => [...new Map(values.map(value => [normalise(String(value)), String(value)])).values()];
  function addQuiz(topic, prompt, answer, candidates, explanation, category, optionsScript = 'display') {
    const wrong = unique(candidates).filter(value => normalise(value) !== normalise(answer));
    if (wrong.length < 3) throw new Error('Not enough distinct choices: ' + prompt);
    const offset = quiz[topic].length % wrong.length;
    const choices = [0, 1, 2].map(i => wrong[(offset + i) % wrong.length]);
    quiz[topic].push([prompt, answer, choices, explanation, {id: topic + '-quiz-' + quiz[topic].length, category, optionsScript}]);
  }
  function addPractice(topic, prompt, answers, hint, category, optionsScript = 'display') {
    practice[topic].push([prompt, answers, hint, {id: topic + '-practice-' + practice[topic].length, category, optionsScript, latinOnly: optionsScript === 'latin'}]);
  }
  const latinLetters = alphabet.map(c => c.latin);
  const cyrillicLetters = latinLetters.map(cyrillic);
  const words = alphabet.map(c => c.example);
  alphabet.forEach(card => {
    const letter = card.latin, cy = cyrillic(letter), word = card.example;
    addQuiz('alphabet', `Which Latin letter matches ${cy}?`, letter, latinLetters, `${cy} is written ${letter} in Latin. ${card.note}`, 'letter-to-latin', 'latin');
    addQuiz('alphabet', `Which Cyrillic letter matches Latin ${letter}?`, cy, cyrillicLetters, `${letter} is written ${cy} in Cyrillic.`, 'letter-to-cyrillic', 'cyrillic');
    addQuiz('alphabet', `Read ${cyrillic(word)}. Which is the same word in Latin?`, word, words, `${cyrillic(word)} = ${word}, meaning ${card.english}.`, 'word-to-latin', 'latin');
    addQuiz('alphabet', `Which Cyrillic word matches “${word}”?`, cyrillic(word), words.map(cyrillic), `${word} = ${cyrillic(word)}, meaning ${card.english}.`, 'word-to-cyrillic', 'cyrillic');
    addQuiz('alphabet', `Which Latin letter has the sound cue “${card.sound}”?`, letter, latinLetters, `${letter}: ${card.note}`, 'sound', 'latin');
    addQuiz('alphabet', `Which Serbian Latin letter begins “${word}”?`, letter, latinLetters, `${word} begins with ${letter}. Lj, nj and dž count as one letter each.`, 'first-letter', 'latin');
    addPractice('alphabet', `Write the Latin partner of ${cy}.`, [letter], card.note, 'letter-to-latin', 'latin');
    addPractice('alphabet', `Write ${cyrillic(word)} in Latin.`, [word], `The word means ${card.english}. Its first letter is ${letter}.`, 'word-to-latin', 'latin');
    addPractice('alphabet', `Write the Serbian letter with the sound cue “${card.sound}”.`, [letter], card.note, 'sound');
  });

  const baseNumbers = new Map(numbersRows.map(row => [row[0], row[1]]));
  function numberWord(n) {
    if (baseNumbers.has(n)) return baseNumbers.get(n);
    if (Number.isInteger(n) && n > 20 && n < 100) return baseNumbers.get(Math.floor(n / 10) * 10) + ' ' + baseNumbers.get(n % 10);
    throw new Error('Number outside this beginner set');
  }
  const numberValues = [...Array.from({length: 100}, (_, i) => i + 1), 1000, 10000];
  const numberWords = numberValues.map(numberWord);
  numberValues.forEach(n => {
    const word = numberWord(n), numeral = n.toLocaleString('en-AU');
    const nearby = unique([n - 1, n + 1, n - 10, n + 10, n % 10 || 10, 10, 20, 30, 100, 1000, 10000].filter(v => numberValues.includes(v))).filter(v => Number(v) !== n);
    const wrongWords = nearby.map(v => numberWord(Number(v)));
    addQuiz('numbers', `Choose the Serbian counting word for ${numeral}.`, word, wrongWords, `${numeral} = ${word}. ${n > 20 && n < 100 && n % 10 ? 'Say the tens, then the units, as two words.' : 'Use the basic counting form.'}`, 'number-to-word');
    addQuiz('numbers', `Read “${word}” (${cyrillic(word)}). Which number is it?`, numeral, nearby.map(v => Number(v).toLocaleString('en-AU')), `${word} = ${numeral}.`, 'word-to-number', 'digits');
    addPractice('numbers', `Write ${numeral} in Serbian (basic counting form).`, n === 1000 ? ['hiljada', 'jedna hiljada', 'hiljadu'] : [word], n > 20 && n < 100 && n % 10 ? `Combine ${Math.floor(n / 10) * 10} + ${n % 10} as two words.` : `It starts with ${word[0]}.`, 'number-to-word');
    if (n > 20 && n < 100 && n % 10) {
      const [tens, units] = word.split(' ');
      addQuiz('numbers', `Complete ${n}: ${tens} ___. Which unit word belongs here?`, units, Array.from({length: 9}, (_, i) => numberWord(i + 1)), `${n} = ${tens} ${units}. The last word is ${n % 10}.`, 'compound-units');
      addQuiz('numbers', `Complete ${n}: ___ ${units}. Which tens word belongs here?`, tens, [20, 30, 40, 50, 60, 70, 80, 90].map(numberWord), `${n} = ${tens} ${units}. Start with ${Math.floor(n / 10) * 10}.`, 'compound-tens');
      addPractice('numbers', `Complete ${n}: ${tens} ___. Type only the missing unit word.`, [units], `The last digit is ${n % 10}.`, 'compound-units');
      addPractice('numbers', `Complete ${n}: ___ ${units}. Type only the missing tens word.`, [tens], `The tens value is ${Math.floor(n / 10) * 10}.`, 'compound-tens');
    }
  });

  const subjects = [
    ['ja', 'I', 'sam'], ['ti', 'you (one person, informal)', 'si'], ['on', 'he', 'je'],
    ['ona', 'she', 'je'], ['ono', 'it (neuter)', 'je'], ['mi', 'we', 'smo'],
    ['vi', 'you (plural or polite)', 'ste'], ['oni', 'they (masculine or mixed)', 'su'],
    ['one', 'they (feminine)', 'su'], ['ona', 'they (neuter)', 'su']
  ].map(([pronoun, meaning, verb]) => ({pronoun, meaning, verb}));
  const pronounChoices = unique(subjects.map(s => s.pronoun));
  const pronounMeanings = subjects.map(s => s.meaning);
  subjects.forEach(s => {
    const sentence = `${s.pronoun[0].toUpperCase() + s.pronoun.slice(1)} ${s.verb} ovde.`;
    addQuiz('pronouns', `Choose the subject pronoun for “${s.meaning}”.`, s.pronoun, pronounChoices, `${s.pronoun} means ${s.meaning}.`, 'meaning-to-pronoun');
    addQuiz('pronouns', `In “${sentence}”, who does “${s.pronoun}” refer to?`, s.meaning, pronounMeanings, `${sentence} uses ${s.pronoun} for ${s.meaning}. The verb helps distinguish ona (she) from ona (neuter they).`, 'pronoun-in-context', 'english');
    addQuiz('pronouns', `“${s.meaning} ${s.verb === 'sam' ? 'am' : s.verb === 'je' ? 'is' : 'are'} here.” Complete: ___ ${s.verb} ovde.`, s.pronoun, pronounChoices, `Use ${s.pronoun}: ${sentence}`, 'sentence-pronoun');
    addPractice('pronouns', `Write the subject pronoun for “${s.meaning}”.`, [s.pronoun], `${s.pronoun.length} Latin ${s.pronoun.length === 1 ? 'character' : 'characters'}.`, 'meaning-to-pronoun');
    addPractice('pronouns', `“${s.meaning} ${s.verb === 'sam' ? 'am' : s.verb === 'je' ? 'is' : 'are'} here.” Fill the pronoun: ___ ${s.verb} ovde.`, [s.pronoun], `The English subject is ${s.meaning}.`, 'sentence-pronoun');
  });
  const pronounScenarios = [
    ['You are speaking about yourself.', 'ja', 'Ja is I.'],
    ['You address one close friend informally.', 'ti', 'Ti addresses one person informally.'],
    ['You address one stranger politely.', 'vi', 'Vi is the polite form for one person.'],
    ['You address two friends together.', 'vi', 'Vi also addresses a group.'],
    ['You refer to Marko using “he”.', 'on', 'On is he.'],
    ['You refer to Ana using “she”.', 'ona', 'Ona is she in the singular.'],
    ['You use “we” for yourself and Ana.', 'mi', 'Mi includes the speaker and others.'],
    ['You use “we” for yourself and several friends.', 'mi', 'Mi is we.'],
    ['You refer to Ana and Marko as “they”.', 'oni', 'A mixed group of people uses oni.'],
    ['You refer to Marko and Petar as “they”.', 'oni', 'A group of males uses oni.'],
    ['You refer to Ana and Jelena as “they”.', 'one', 'A group of females uses one.'],
    ['You use “they” for a group of women.', 'one', 'One is feminine plural.'],
    ['You need “it” for a neuter singular noun.', 'ono', 'Ono is neuter singular.'],
    ['You need “they” for neuter plural nouns.', 'ona', 'Ona can be neuter plural; the context and verb show this.'],
    ['You address a shopkeeper politely.', 'vi', 'Vi is useful when you want to be polite.']
  ];
  pronounScenarios.forEach(([scenario, answer, explanation]) => {
    addQuiz('pronouns', scenario + ' Choose the pronoun.', answer, pronounChoices, explanation, 'people-scenario');
    addPractice('pronouns', scenario + ' Write the pronoun.', [answer], explanation, 'people-scenario');
  });

  const locations = [['ovde', 'here'], ['tamo', 'there'], ['kod kuće', 'at home'], ['u školi', 'at school']];
  const verbChoices = ['sam', 'si', 'je', 'smo', 'ste', 'su'];
  function sentenceFor(s, place) { return `${s.pronoun[0].toUpperCase() + s.pronoun.slice(1)} ${s.verb} ${place}.`; }
  function sentenceMeaning(s, place) {
    const who = s.meaning[0].toUpperCase() + s.meaning.slice(1);
    return `${who} ${s.verb === 'sam' ? 'am' : s.verb === 'je' ? 'is' : 'are'} ${place}.`;
  }
  subjects.forEach(s => {
    addQuiz('be', `Choose the everyday short pair for “${s.meaning} ${s.verb === 'sam' ? 'am' : s.verb === 'je' ? 'is' : 'are'}”.`, `${s.pronoun} ${s.verb}`, subjects.map(t => `${t.pronoun} ${t.verb}`), `${s.pronoun} takes ${s.verb}.`, 'pronoun-verb-pair');
    locations.forEach(([place, englishPlace]) => {
      const sentence = sentenceFor(s, place), meaning = sentenceMeaning(s, englishPlace), clue = `${place} means ${englishPlace}.`;
      addQuiz('be', `${meaning} Complete: ${s.pronoun} ___ ${place}.`, s.verb, verbChoices, `${sentence} ${clue}`, 'verb-gap');
      addQuiz('be', `Choose the Serbian sentence: “${meaning}”`, sentence, subjects.map(t => sentenceFor(t, place)), `${sentence} means ${meaning} ${clue}`, 'build-sentence');
      addQuiz('be', `Read “${sentence}”. Choose its meaning.`, meaning, subjects.map(t => sentenceMeaning(t, englishPlace)), `${sentence} means ${meaning} ${clue}`, 'read-sentence', 'english');
      addPractice('be', `${meaning} Fill the verb: ${s.pronoun} ___ ${place}.`, [s.verb], `${s.pronoun} + one short form of biti. ${clue}`, 'verb-gap');
      addPractice('be', `Write the full sentence for “${meaning}”. Use pronoun + verb + place. (${clue})`, [sentence], `Start with ${s.pronoun}, then the form of biti, then ${place}.`, 'build-sentence');
    });
  });
  const groups = [
    ['Ana', 'je'], ['Marko', 'je'], ['Ana i Marko', 'su'], ['Ana i Jelena', 'su'],
    ['Marko i Petar', 'su'], ['Ana i ja', 'smo'], ['Marko i ja', 'smo'],
    ['ti i ja', 'smo'], ['ti i Ana', 'ste'], ['ti i Marko', 'ste'],
    ['Ana, Marko i ja', 'smo'], ['ti, Ana i Marko', 'ste']
  ];
  groups.forEach(([group, verb]) => locations.forEach(([place, englishPlace]) => {
    const sentence = `${group[0].toUpperCase() + group.slice(1)} ${verb} ${place}.`;
    const rule = group.includes('ja') ? 'A group including I uses smo (we are).' : group.includes('ti') ? 'A group including you, without I, uses ste (you are).' : verb === 'je' ? 'One named person uses je (is).' : 'Several other people use su (are).';
    addQuiz('be', `Complete: ${group} ___ ${place}. (i = and; ${place} = ${englishPlace}.)`, verb, verbChoices, `${sentence} ${rule}`, 'group-agreement');
    addPractice('be', `Fill the verb: ${group} ___ ${place}. (i = and; ${place} = ${englishPlace}.)`, [verb], rule, 'group-agreement');
  }));

  const extraConversation = [
    ['Kako se zovete?', 'What is your name? · polite / plural', 'kah-koh seh zoh-veh-teh', 'Use zovete when asking politely or addressing several people.'],
    ['Hvala lepo.', 'Thank you very much.', 'hvah-lah leh-poh', 'A warm way to thank someone.'],
    ['Razumem.', 'I understand.', 'rah-zoo-mehm', 'Add ne in front to say you do not understand.'],
    ['A ti?', 'And you? · informal', 'ah tee', 'Return a question to one friend.'],
    ['A vi?', 'And you? · polite / plural', 'ah vee', 'Return a question politely, or to several people.'],
    ['Dobro sam.', 'I am well.', 'doh-broh sahm', 'Another simple response to Kako si? or Kako ste?'],
    ['Izvini.', 'Excuse me / sorry · informal', 'eez-vee-nee', 'Use with one person you know well. Izvinite is the polite or plural form.'],
    ['Ne, hvala.', 'No, thank you.', 'neh hvah-lah', 'A polite way to decline.'],
    ['Da, molim.', 'Yes, please.', 'dah moh-leem', 'A polite way to accept.']
  ];
  extraConversation.forEach((r,i) => conversation.push({id:'phrase-extra-'+i,latin:r[0],english:r[1],sound:r[2],note:r[3],label:r[0]}));
  const phraseWords = conversation.map(c => c.latin);
  const phraseMeanings = conversation.map(c => c.english);
  const phraseTokens = unique(phraseWords.flatMap(p => p.replace(/[.,!?]/g,'').split(' ')));
  // Avoid offering another valid synonym or register variant as a wrong answer.
  const similarPhrases = [
    ['Zdravo', 'Ćao', 'Dobar dan', 'Dobro jutro', 'Dobro veče'],
    ['Doviđenja', 'Ćao', 'Zdravo'], ['Hvala', 'Hvala lepo.'],
    ['Dobro, hvala.', 'Dobro sam.'], ['Molim', 'Da, molim.'],
    ['Kako si?', 'Kako ste?'], ['Kako se zoveš?', 'Kako se zovete?'],
    ['Izvinite', 'Izvini.'], ['A ti?', 'A vi?']
  ];
  function safePhrases(answer) {
    const excluded = new Set([normalise(answer)]);
    similarPhrases.forEach(group => {if(group.some(p => normalise(p) === normalise(answer))) group.forEach(p => excluded.add(normalise(p)));});
    return conversation.filter(c => !excluded.has(normalise(c.latin))).map(c => c.latin);
  }
  conversation.forEach(card => {
    const safe = safePhrases(card.latin);
    addQuiz('conversation', `Choose the lesson phrase for “${card.english}”.`, card.latin, safe, `${card.latin} means ${card.english} ${card.note}`, 'meaning-to-phrase');
    addQuiz('conversation', `What does “${card.latin}” mean?`, card.english, conversation.filter(c => safe.includes(c.latin)).map(c => c.english), `${card.latin} means ${card.english}`, 'phrase-to-meaning', 'english');
    addPractice('conversation', `Write the lesson phrase for “${card.english}”.`, [card.latin], card.note, 'meaning-to-phrase');
    const tokens = card.latin.replace(/[.,!?]/g,'').split(' ');
    if(tokens.length > 1){
      const last = tokens.at(-1), stem = tokens.slice(0,-1).join(' ');
      addQuiz('conversation', `“${card.english}” → ${stem} ___. Choose the missing word.`, last, phraseTokens, `The full phrase is ${card.latin}`, 'phrase-gap');
      addPractice('conversation', `“${card.english}” → ${stem} ___. Type the missing word.`, [last], `Complete the phrase: ${stem} …`, 'phrase-gap');
    }
  });
  const conversationScenarios = [
    ['It is morning. Greet someone with “Good morning”.', 'Dobro jutro'],
    ['It is daytime. Use a polite “Good day” greeting.', 'Dobar dan'],
    ['It is evening and you have just arrived. Say “Good evening”.', 'Dobro veče'],
    ['Someone is going to bed. Wish them “Good night”.', 'Laku noć'],
    ['You are leaving a shop. Say a polite “Goodbye”.', 'Doviđenja'],
    ['Ask one friend “How are you?” informally.', 'Kako si?'],
    ['Ask an older stranger “How are you?” politely.', 'Kako ste?'],
    ['Ask a group of people “How are you?”.', 'Kako ste?'],
    ['You need to say you do not understand.', 'Ne razumem.'],
    ['You want to say you understand.', 'Razumem.'],
    ['You want to ask politely whether someone speaks English.', 'Govorite li engleski?'],
    ['Ask one friend their name, informally.', 'Kako se zoveš?'],
    ['Ask a stranger their name, politely.', 'Kako se zovete?'],
    ['You have just met someone. Say “Nice to meet you”.', 'Drago mi je.'],
    ['Someone helped you. Say “Thank you”.', 'Hvala'],
    ['Thank someone warmly with “Thank you very much”.', 'Hvala lepo.'],
    ['Politely decline an offer with “No, thank you”.', 'Ne, hvala.'],
    ['Accept an offer with “Yes, please”.', 'Da, molim.'],
    ['Return a question to one friend with “And you?”.', 'A ti?'],
    ['Return a question politely with “And you?”.', 'A vi?'],
    ['Get a stranger’s attention with a polite “Excuse me”.', 'Izvinite'],
    ['Apologise to one close friend informally.', 'Izvini.']
  ];
  conversationScenarios.forEach(([scenario, answer]) => {
    addQuiz('conversation', scenario + ' Choose the phrase.', answer, safePhrases(answer), `${answer} fits this situation.`, 'situation');
    addPractice('conversation', scenario + ' Write the lesson phrase.', [answer], conversation.find(c => normalise(c.latin) === normalise(answer)).note, 'situation');
  });
  const dialogues = [
    ['A: Hvala! B: ___ (You’re welcome.)', 'Molim'],
    ['A: Kako si? B: ___ (Fine, thank you.)', 'Dobro, hvala.'],
    ['A: Kako ste? B: ___ (Fine, thank you.)', 'Dobro, hvala.'],
    ['A: Kako si? B: ___ (I am well.)', 'Dobro sam.'],
    ['A: Kako ste? B: ___ (I am well.)', 'Dobro sam.'],
    ['A: Kako se zoveš? B: ___ (My name is Ana.)', 'Zovem se Ana.'],
    ['A: Kako se zovete? B: ___ (My name is Ana.)', 'Zovem se Ana.'],
    ['A: Zovem se Ana. B: ___ (Nice to meet you.)', 'Drago mi je.'],
    ['A: Dobro, hvala. ___ (And you, to a friend?)', 'A ti?'],
    ['A: Dobro, hvala. ___ (And you, politely?)', 'A vi?'],
    ['Complete: ___, hvala. (No, thank you.)', 'Ne'],
    ['Complete: ___, molim. (Yes, please.)', 'Da'],
    ['Complete: Ne ___. (I don’t understand.)', 'razumem'],
    ['Complete: Govorite li ___? (Do you speak English?)', 'engleski'],
    ['Complete: Kako ___? (How are you, to a friend?)', 'si'],
    ['Complete: Kako ___? (How are you, politely?)', 'ste'],
    ['Complete: Zovem ___ Ana. (My name is Ana.)', 'se'],
    ['Complete: Drago mi ___. (Nice to meet you.)', 'je'],
    ['Complete: Dobro ___. (Good morning.)', 'jutro'],
    ['Complete: Laku ___. (Good night.)', 'noć']
  ];
  dialogues.forEach(([prompt, answer]) => {
    const isPhrase = conversation.some(c => normalise(c.latin) === normalise(answer));
    addQuiz('conversation', prompt, answer, isPhrase ? safePhrases(answer) : phraseTokens, `Use ${answer} in the gap.`, 'dialogue');
    addPractice('conversation', prompt + ' Type the missing reply or word.', [answer], answer.includes(' ') ? 'Use a phrase from the reference cards.' : `The missing word has ${answer.length} Latin characters.`, 'dialogue');
  });
  const names = ['Ana', 'Marko', 'Jelena', 'Petar', 'Nikola', 'Milica'];
  names.forEach(name => {
    const answer = `Zovem se ${name}.`;
    addQuiz('conversation', `Introduce yourself as ${name}. Choose “My name is ${name}”.`, answer, names.map(n => `Zovem se ${n}.`), `${answer} means My name is ${name}.`, 'name-introduction');
    addQuiz('conversation', `Read “${answer}”. Which name did the speaker give?`, name, names, `The speaker’s name is ${name}.`, 'read-introduction', 'latin');
    addPractice('conversation', `Write “My name is ${name}”.`, [answer], 'Use Zovem se, then the name.', 'name-introduction');
  });

  // A visit-local deck cycles through every question before refilling. Each short
  // round mixes question families and excludes duplicate IDs even at a cycle edge.
  function createQuestionDeck(pool, random = Math.random) {
    const bank = [...pool];
    if(!bank.length || new Set(bank.map(q => q.id)).size !== bank.length) throw new Error('Question IDs must be unique');
    let remaining = [];
    const shuffled = values => {const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
    return {
      draw(count) {
        if(!Number.isInteger(count)||count<1||count>bank.length) throw new Error('Invalid round length');
        const selected=[], ids=new Set(), categories=new Set();
        while(selected.length<count){
          if(!remaining.length) remaining=shuffled(bank);
          let index=remaining.findIndex(q=>!ids.has(q.id)&&!categories.has(q.category));
          if(index<0)index=remaining.findIndex(q=>!ids.has(q.id));
          if(index<0)throw new Error('Unable to draw a distinct round');
          const [question]=remaining.splice(index,1);
          selected.push(question);ids.add(question.id);categories.add(question.category);
        }
        return selected;
      }
    };
  }
  const poolCounts=Object.fromEntries(lessons.map(l=>[l.id,{quiz:quiz[l.id].length,practice:practice[l.id].length}]));
  lessons.find(l=>l.id==='numbers').tip='For 21–99, say the tens first and then the units: dvadeset jedan (21), trideset dva (32), četrdeset pet (45). Keep them as separate words. Start with 1–20 and the tens cards, then try combinations.';
  lessons.find(l=>l.id==='be').tip='Everyday short forms: sam, si, je, smo, ste, su. In groups, i means and: Ana i ja smo (we), ti i Ana ste (you plural), Ana i Marko su (they). Short forms follow a word or phrase; they do not start a sentence.';
  be.forEach(card=>{card.note='Sentence words: ovde = here, tamo = there, kod kuće = at home, u školi = at school. Swap the place; keep the verb matched to the person.';});
  window.Serbian={lessons,quiz,practice,cyrillic,latin,normalise,assess,createQuestionDeck,poolCounts,numberWord};

})();
