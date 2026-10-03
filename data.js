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
  const quizPromptKeys = new Map();
  const unique = values => [...new Map(values.map(value => [normalise(String(value)), String(value)])).values()];
  function addQuiz(topic, prompt, answer, candidates, explanation, category, optionsScript = 'display') {
    const promptKey = topic + ':' + normalise(prompt);
    if (quizPromptKeys.has(promptKey)) {
      if (normalise(quizPromptKeys.get(promptKey)) !== normalise(answer)) throw new Error('Conflicting answers: ' + prompt);
      return;
    }
    const wrong = unique(candidates).filter(value => normalise(value) !== normalise(answer));
    if (wrong.length < 3) throw new Error('Not enough distinct choices: ' + prompt);
    const offset = quiz[topic].length % wrong.length;
    const choices = [0, 1, 2].map(i => wrong[(offset + i) % wrong.length]);
    quizPromptKeys.set(promptKey, answer);
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

  // Expanded A1 combinations. Each prompt includes the context needed for one answer.
  const titleCase = value => value[0].toUpperCase() + value.slice(1);
  const negativeForms = ['nisam','nisi','nije','nije','nije','nismo','niste','nisu','nisu','nisu'];
  const soundGuide = text => (text.toLowerCase().match(/dž|lj|nj|[a-zčćšžđ]|[^a-zčćšžđ]+/g) || []).map(part => ({a:'ah',e:'eh',i:'ee',o:'oh',u:'oo',j:'y',c:'ts',č:'ch',ć:'soft-ch',š:'sh',ž:'zh',đ:'soft-j',dž:'j',lj:'ly',nj:'ny'}[part] || part)).join('');
  const addCard = (bank,id,text,meaning,note,extra={}) => { if(!bank.some(c=>normalise(c.latin)===normalise(text)&&c.english===meaning))bank.push({id,latin:text,label:text,english:meaning,sound:soundGuide(text),note,...extra}); };
  const addedLocations = [['u gradu','in town'],['u parku','in the park'],['u prodavnici','in the shop'],['u restoranu','in the restaurant'],['na poslu','at work'],['na stanici','at the station'],['u hotelu','in the hotel'],['u sobi','in the room']];
  const allLocations = [...locations,...addedLocations];
  const times = [['',''],['danas','today'],['sada','now']];
  subjects.forEach((s,i) => {
    s.negative=negativeForms[i];
    addCard(be,'be-negative-'+i,`${s.pronoun} ${s.negative}`,`${s.meaning} ${s.verb==='sam'?'am':s.verb==='je'?'is':'are'} not`,'Negative biti is one word: nisam, nisi, nije, nismo, niste, nisu. It can stand at the beginning of a sentence.',{example:`${titleCase(s.pronoun)} ${s.negative} ovde.`,exampleMeaning:`${titleCase(s.meaning)} ${s.verb==='sam'?'am':s.verb==='je'?'is':'are'} not here.`});
  });
  allLocations.forEach(([place,meaning],i)=>addCard(be,'be-place-'+i,place,meaning,'A ready-made place phrase. Use it after a form of biti; keep the words together.'));
  [['danas','today'],['sada','now'],['da li','yes/no question opener']].forEach(([word,meaning],i)=>addCard(be,'be-builder-'+i,word,meaning,word==='da li'?'Da li + short verb + subject + place: Da li si ti ovde?':'In these exercises, the time word comes last: Ja sam ovde danas.'));
  const build = (s,place,time,negative=false) => `${titleCase(s.pronoun)} ${negative?s.negative:s.verb} ${place}${time?' '+time:''}.`;
  const meaningFor = (s,place,time,negative=false) => `${titleCase(s.meaning)} ${s.verb==='sam'?'am':s.verb==='je'?'is':'are'}${negative?' not':''} ${place}${time?' '+time:''}.`;
  const negativeChoices=unique(negativeForms);
  subjects.forEach(s=>allLocations.forEach(([place,enPlace])=>times.forEach(([time,enTime])=>{
    const clue=`${place} = ${enPlace}${time?'; '+time+' = '+enTime:''}.`;
    const positive=build(s,place,time),negative=build(s,place,time,true);
    const positiveMeaning=meaningFor(s,enPlace,enTime),negativeMeaning=meaningFor(s,enPlace,enTime,true);
    if(time || addedLocations.some(p=>p[0]===place)){
      addQuiz('be',`“${positiveMeaning}” Fill the verb: ${titleCase(s.pronoun)} ___ ${place}${time?' '+time:''}.`,s.verb,verbChoices,`${positive} ${clue}`,'positive-verb-expanded');
      addQuiz('be',`Choose the sentence for “${positiveMeaning}”.`,positive,subjects.map(t=>build(t,place,time)),`${positive} ${clue}`,'positive-sentence-expanded');
      addPractice('be',`Write “${positiveMeaning}”. Use subject + verb + place${time?' + time':''}. (${clue})`,[positive],`Begin ${s.pronoun} ${s.verb}.`,'positive-sentence-expanded');
    }
    addQuiz('be',`“${negativeMeaning}” Fill the negative verb: ${titleCase(s.pronoun)} ___ ${place}${time?' '+time:''}.`,s.negative,negativeChoices,`${negative} ${clue}`,'negative-verb');
    addQuiz('be',`Choose the negative sentence for “${negativeMeaning}”.`,negative,[positive,...subjects.filter(t=>t.negative!==s.negative).map(t=>build(t,place,time,true))],`${negative} ${s.pronoun} uses ${s.negative}. ${clue}`,'negative-sentence');
    addQuiz('be',`Read “${negative}”. Choose the meaning.`,negativeMeaning,[positiveMeaning,...subjects.map(t=>meaningFor(t,enPlace,enTime,true))],`${negative} = ${negativeMeaning}`,'negative-reading','english');
    addPractice('be',`Make this sentence negative by replacing only the verb: ${positive}`, [s.negative],`${s.pronoun} uses ${s.negative}.`,'negative-verb');
    addPractice('be',`Write “${negativeMeaning}”. Use subject + negative verb + place${time?' + time':''}. (${clue})`,[negative],`Begin ${s.pronoun} ${s.negative}.`,'negative-sentence');
    const question=`Da li ${s.verb} ${s.pronoun} ${place}${time?' '+time:''}?`;
    const enQuestion=`${s.verb==='sam'?'Am':s.verb==='je'?'Is':'Are'} ${s.meaning==='I'?'I':s.meaning} ${enPlace}${enTime?' '+enTime:''}?`;
    addQuiz('be',`“${enQuestion}” Fill the verb: Da li ___ ${s.pronoun} ${place}${time?' '+time:''}?`,s.verb,verbChoices,`${question} Da li starts a yes/no question. ${clue}`,'question-verb');
    addPractice('be',`Write “${enQuestion}”. Use Da li + verb + subject + place${time?' + time':''}. (${clue})`,[question],`Begin Da li ${s.verb} ${s.pronoun}.`,'question-sentence');
    if(time || addedLocations.some(p=>p[0]===place)){
      addQuiz('pronouns',`“${positiveMeaning}” Fill the subject: ___ ${s.verb} ${place}${time?' '+time:''}.`,s.pronoun,pronounChoices,`${positive} The subject is ${s.meaning}. ${clue}`,'subject-in-sentence');
      addPractice('pronouns',`“${negativeMeaning}” Fill only the subject: ___ ${s.negative} ${place}${time?' '+time:''}.`,[s.pronoun],`Use the pronoun for ${s.meaning}. ${clue}`,'subject-in-negative');
    }
  })));
  groups.forEach(([group,verb])=>allLocations.forEach(([place,enPlace])=>times.forEach(([time,enTime])=>{
    if(!time && locations.some(p=>p[0]===place))return;
    const sentence=`${titleCase(group)} ${verb} ${place}${time?' '+time:''}.`;
    const rule=group.includes('ja')?'The group includes the speaker: use smo.':group.includes('ti')?'The group includes the listener, without the speaker: use ste.':verb==='je'?'One named person uses je.':'Several other people use su.';
    addQuiz('be',`Fill the verb: ${titleCase(group)} ___ ${place}${time?' '+time:''}. (i = and; ${place} = ${enPlace}${time?'; '+time+' = '+enTime:''}.)`,verb,verbChoices,`${sentence} ${rule}`,'group-agreement-expanded');
    addPractice('be',`Fill only the verb: ${titleCase(group)} ___ ${place}${time?' '+time:''}. (${place} = ${enPlace})`,[verb],rule,'group-agreement-expanded');
  })));

  const people=[['Ana','f'],['Jelena','f'],['Milica','f'],['Marija','f'],['Ivana','f'],['Sara','f'],['Marko','m'],['Petar','m'],['Nikola','m'],['Luka','m'],['Ivan','m'],['Stefan','m']];
  const roles=[['a close friend','ti'],['your sibling, informally','ti'],['one classmate, informally','ti'],['a stranger, politely','vi'],['a shopkeeper, politely','vi'],['a teacher, politely','vi'],['two friends together','vi'],['several classmates together','vi']];
  allLocations.forEach(([place,enPlace])=>{
    roles.forEach(([role,answer])=>{
      addQuiz('pronouns',`You are addressing ${role} and saying they are ${enPlace}. Choose the subject pronoun.`,answer,pronounChoices,`Use ${answer}. Ti is informal singular; vi is polite or plural.`,'listener-register');
      addPractice('pronouns',`Address ${role}: ___ ${answer==='ti'?'si':'ste'} ${place}. Write the pronoun. (${place} = ${enPlace})`,[answer],answer==='ti'?'One person, informal: ti.':'Polite or plural: vi.','listener-register');
    });
    people.forEach(([name,gender])=>{
      const answer=gender==='f'?'ona':'on';
      addQuiz('pronouns',`${name} (${gender==='f'?'a woman':'a man'}) is ${enPlace}. Replace the name with “${gender==='f'?'she':'he'}”.`,answer,pronounChoices,`${name}: ${answer} (${gender==='f'?'she':'he'}).`,'named-person');
      addPractice('pronouns',`${name} (${gender==='f'?'a woman':'a man'}): ___ je ${place}. Replace the name with a subject pronoun.`,[answer],`Use ${gender==='f'?'she':'he'}.`,'named-person');
    });
  });
  const peopleGroups=[];
  people.forEach((person,i)=>people.slice(i+1).forEach(other=>peopleGroups.push([person,other])));
  peopleGroups.forEach(pair=>{
    const label=pair.map(p=>p[0]).join(' and '), allFemale=pair.every(p=>p[1]==='f');
    const groupPronoun=allFemale?'one':'oni';
    const genderClue=allFemale?'both women':pair.every(p=>p[1]==='m')?'both men':'a mixed group';
    [['here','ovde'],['at home','kod kuće'],['at school','u školi'],['in the park','u parku']].forEach(([enPlace,place])=>{
      const scenarios=[
        [`${label} (${genderClue}) are ${enPlace}. You are talking ABOUT them.`,groupPronoun,'They: use one for women and oni for men or a mixed group.'],
        [`${label} are ${enPlace}. You are speaking TO both of them, saying “you”.`,'vi','Several listeners use vi.'],
        [`You are ${enPlace} together with ${label}. You say “we” about the whole group.`,'mi','The speaker belongs to the group: use mi.']
      ];
      scenarios.forEach(([context,answer,rule])=>{
        addQuiz('pronouns',context+' Choose the pronoun.',answer,pronounChoices,rule,'group-perspective');
        addPractice('pronouns',context+' Write the subject pronoun.',[answer],rule,'group-perspective');
      });
    });
  });
  const nounGroups=[['selo','village','n','sela'],['dete','child','n','deca'],['pismo','letter (mail)','n','pisma'],['more','sea','n','mora'],['sunce','sun','n','sunca'],['ime','name','n','imena'],['knjiga','book','f','knjige'],['škola','school','f','škole'],['kuća','house','f','kuće'],['soba','room','f','sobe'],['grad','city','m','gradovi'],['park','park','m','parkovi']];
  // Deca is a collective feminine noun, so do not derive its plural from dete.
  nounGroups.forEach(([noun,en,gender,plural])=>{
    const singular=gender==='n'?'ono':gender==='f'?'ona':'on';
    addQuiz('pronouns',`The noun ${noun} (${en}) is ${gender==='n'?'neuter':gender==='f'?'feminine':'masculine'} singular. Which subject pronoun replaces it?`,singular,pronounChoices,`${noun}: use ${singular}. Serbian grammatical gender decides the pronoun.`,'noun-gender');
    addPractice('pronouns',`Replace ${noun} (${en}, ${gender==='n'?'neuter':gender==='f'?'feminine':'masculine'} singular) with a subject pronoun.`,[singular],`Gender: ${gender==='n'?'neuter':gender==='f'?'feminine':'masculine'}.`,'noun-gender');
    if(noun==='dete')return;
    const answer=gender==='n'?'ona':gender==='f'?'one':'oni';
    addQuiz('pronouns',`${plural} is the ${gender==='n'?'neuter':gender==='f'?'feminine':'masculine'} plural of ${noun} (${en}). Choose “they”.`,answer,pronounChoices,`Use ${answer} for this grammatical gender in the plural.`,'noun-plural');
    addPractice('pronouns',`Write “they” for ${plural} (${gender==='n'?'neuter':gender==='f'?'feminine':'masculine'} plural).`,[answer],'Plural choices: oni (masculine), one (feminine), ona (neuter).','noun-plural');
  });

  baseNumbers.set(0,'nula');
  addCard(numbers,'number-zero','nula','0','Zero: useful when reading digits one at a time.',{label:'0'});
  const smallValues=Array.from({length:101},(_,i)=>i),smallWords=smallValues.map(numberWord);
  addQuiz('numbers','Choose the Serbian counting word for 0.','nula',smallWords,'0 = nula.','zero');
  addPractice('numbers','Write zero in Serbian.',['nula'],'It starts with n.','zero');
  smallValues.forEach(n=>{
    [1,2,5,10].forEach(step=>{
      if(n+2*step>100)return;
      const sequence=[n,n+step,n+2*step],answer=numberWord(sequence[2]);
      addQuiz('numbers',`Count upwards by ${step}: ${numberWord(n)}, ${numberWord(n+step)}, ___. Choose the next Serbian number.`,answer,smallWords,`${sequence.join(', ')}: ${sequence.map(numberWord).join(', ')}.`,'counting-sequence');
      addPractice('numbers',`Count upwards by ${step}: ${numberWord(n)}, ${numberWord(n+step)}, ___. Write the next number in Serbian.`,[answer],`Add ${step} to ${n+step}.`,'counting-sequence');
    });
    [1,2,5,10].forEach(step=>{
      if(n-2*step<0)return;
      const sequence=[n,n-step,n-2*step],answer=numberWord(sequence[2]);
      addQuiz('numbers',`Count backwards by ${step}: ${numberWord(n)}, ${numberWord(n-step)}, ___.`,answer,smallWords,`${sequence.join(', ')}: ${sequence.map(numberWord).join(', ')}.`,'backwards-sequence');
      addPractice('numbers',`Count backwards by ${step}: ${numberWord(n)}, ${numberWord(n-step)}, ___. Write the next number in Serbian.`,[answer],`Subtract ${step} from ${n-step}.`,'backwards-sequence');
    });
    if(n<100){
      addQuiz('numbers',`Which Serbian number is one more than “${numberWord(n)}”?`,numberWord(n+1),smallWords,`${n} + 1 = ${n+1}: ${numberWord(n+1)}.`,'one-more');
      addQuiz('numbers',`Put ${numberWord(n+1)} and ${numberWord(n)} in increasing order (smaller first).`,`${numberWord(n)}, ${numberWord(n+1)}`,[`${numberWord(n+1)}, ${numberWord(n)}`,`${numberWord(n)}, ${numberWord((n+2)%101)}`,`${numberWord((n+2)%101)}, ${numberWord(n+1)}`],`${n} comes before ${n+1}.`,'number-order');
    }
  });
  for(let a=1;a<=20;a++)for(let b=1;b<=10;b++){
    const answer=numberWord(a+b);
    addQuiz('numbers',`Add ${numberWord(a)} + ${numberWord(b)}. Choose the answer in Serbian.`,answer,smallWords,`${a} + ${b} = ${a+b}: ${answer}.`,'number-addition');
    addPractice('numbers',`Add ${numberWord(a)} + ${numberWord(b)}. Write the result in Serbian.`,[answer],`${a} + ${b} = ${a+b}.`,'number-addition');
    const difference=numberWord(a);
    addQuiz('numbers',`Subtract ${numberWord(a+b)} − ${numberWord(b)}. Choose the result in Serbian.`,difference,smallWords,`${a+b} − ${b} = ${a}: ${difference}.`,'number-subtraction');
    addPractice('numbers',`Subtract ${numberWord(a+b)} − ${numberWord(b)}. Write the result in Serbian.`,[difference],`${a+b} − ${b} = ${a}.`,'number-subtraction');
  }
  for(let a=0;a<10;a++)for(let b=0;b<10;b++){
    const text=`${numberWord(a)}, ${numberWord(b)}`,digits=`${a} ${b}`;
    addQuiz('numbers',`Read these code digits separately: ${digits}. Choose the words in the same order.`,text,[`${numberWord((a+1)%10)}, ${numberWord(b)}`,`${numberWord(a)}, ${numberWord((b+1)%10)}`,`${numberWord((a+2)%10)}, ${numberWord((b+2)%10)}`],`${digits} is read ${text}. These are separate digits, not one whole number.`,'code-digits');
    addQuiz('numbers',`A code is read “${text}”. Which two digits were spoken, in order?`,digits,[`${(a+1)%10} ${b}`,`${a} ${(b+1)%10}`,`${(a+2)%10} ${(b+2)%10}`],`${text} = ${digits}.`,'read-code','digits');
    addPractice('numbers',`Write code digits ${digits} as two separate Serbian words.`,[text],`${a} = ${numberWord(a)}; ${b} = ${numberWord(b)}. Use a space or comma between words.`,'code-digits');
  }

  const newPhrases=[
    ['Vidimo se.','See you.','vee-dee-moh seh','A friendly goodbye.'],
    ['Vidimo se sutra.','See you tomorrow.','vee-dee-moh seh soo-trah','Sutra means tomorrow.'],
    ['Vidimo se kasnije.','See you later.','vee-dee-moh seh kah-snee-yeh','Kasnije means later.'],
    ['Kako se kaže?','How do you say it?','kah-koh seh kah-zheh','A useful question while learning.'],
    ['Šta je ovo?','What is this?','shtah yeh oh-voh','Ask about something nearby.'],
    ['Gde je stanica?','Where is the station?','gdeh yeh stah-nee-tsah','Gde means where.'],
    ['Koliko košta?','How much does it cost?','koh-lee-koh koh-shtah','A simple price question.'],
    ['Račun, molim.','The bill, please.','rah-choon moh-leem','Ask for the bill at a café or restaurant.'],
    ['Vodu, molim.','Water, please.','voh-doo moh-leem','Vodu is the request form of voda.'],
    ['Kafu, molim.','Coffee, please.','kah-foo moh-leem','Kafu is the request form of kafa.'],
    ['Čaj, molim.','Tea, please.','chay moh-leem','A short, polite request.'],
    ['Sok, molim.','Juice, please.','sohk moh-leem','A short, polite request.'],
    ['Ponovite, molim vas.','Repeat, please. · polite','poh-noh-vee-teh moh-leem vahs','Ask someone to repeat politely.'],
    ['Sporije, molim vas.','More slowly, please. · polite','spoh-ree-yeh moh-leem vahs','Ask someone to slow down.'],
    ['Učim srpski.','I am learning Serbian.','oo-cheem srp-skee','Srpski means Serbian.'],
    ['Govorim malo srpski.','I speak a little Serbian.','goh-voh-reem mah-loh srp-skee','Malo means a little.'],
    ['Govorim engleski.','I speak English.','goh-voh-reem ehn-gleh-skee','Engleski means English.'],
    ['Ne govorim srpski.','I do not speak Serbian.','neh goh-voh-reem srp-skee','Ne makes govorim negative.'],
    ['Gde si?','Where are you? · informal','gdeh see','Ask one friend.'],
    ['Gde ste?','Where are you? · polite / plural','gdeh steh','Ask politely or address a group.'],
    ['Odakle si?','Where are you from? · informal','oh-dah-kleh see','Ask one friend.'],
    ['Odakle ste?','Where are you from? · polite / plural','oh-dah-kleh steh','Ask politely or address a group.'],
    ['Iz Australije sam.','I am from Australia.','eez ow-strah-lee-yeh sahm','Iz + country in its from-form; learn the phrase as a whole.'],
    ['Iz Srbije sam.','I am from Serbia.','eez sr-bee-yeh sahm','Learn the country phrase as a whole.']
  ];
  newPhrases.forEach((r,i)=>conversation.push({id:'phrase-expanded-'+i,latin:r[0],label:r[0],english:r[1],sound:r[2],note:r[3]}));
  similarPhrases.push(['Vidimo se.','Vidimo se sutra.','Vidimo se kasnije.','Doviđenja','Ćao'],['Gde si?','Gde ste?'],['Odakle si?','Odakle ste?'],['Hvala','Hvala lepo.','Ne, hvala.'],['Molim','Da, molim.','Račun, molim.','Vodu, molim.','Kafu, molim.','Čaj, molim.','Sok, molim.']);
  const allPhraseTokens=unique(conversation.flatMap(c=>c.latin.replace(/[.,!?]/g,'').split(' ')));
  newPhrases.forEach(r=>{
    const text=r[0],meaning=r[1],safe=safePhrases(text);
    addQuiz('conversation',`Choose the lesson phrase for “${meaning}”.`,text,safe,`${text} = ${meaning} ${r[3]}`,'meaning-to-new-phrase');
    addQuiz('conversation',`What does “${text}” mean?`,meaning,conversation.filter(c=>safe.includes(c.latin)).map(c=>c.english),`${text} = ${meaning}`,'new-phrase-reading','english');
    addPractice('conversation',`Write the lesson phrase for “${meaning}”.`,[text],r[3],'new-phrase-writing');
  });
  conversation.forEach(card=>{
    const tokens=card.latin.replace(/[.,!?]/g,'').split(' ');
    if(tokens.length<2)return;
    tokens.forEach((token,i)=>{
      if(i===tokens.length-1 && !newPhrases.some(r=>r[0]===card.latin))return;
      const gap=tokens.map((v,j)=>j===i?'___':v).join(' ');
      addQuiz('conversation',`“${card.english}” Complete: ${gap}.`,token,allPhraseTokens,`The whole phrase is ${card.latin}`,'phrase-position-gap');
      addPractice('conversation',`“${card.english}” Complete: ${gap}. Type only the missing word.`,[token],card.note,'phrase-position-gap');
    });
    const ordered=tokens.join(' '),reversed=[...tokens].reverse().join(' ');
    const alternatives=[reversed,...allPhraseTokens.filter(t=>normalise(t)!==normalise(tokens[0])).slice(0,5).map(t=>[t,...tokens.slice(1)].join(' '))];
    addQuiz('conversation',`Choose the lesson word order for “${card.english}”. Words: ${[...tokens].reverse().join(' / ')}.`,ordered,alternatives,`The lesson phrase is ${card.latin}`,'phrase-order');
    addPractice('conversation',`Arrange these words to write the lesson phrase for “${card.english}”: ${[...tokens].reverse().join(' / ')}.`,[card.latin],card.note,'phrase-order');
  });
  const namePool=people.map(p=>p[0]);
  namePool.forEach(name=>{
    ['Kako se zoveš?','Kako se zovete?'].forEach(question=>{
      const answer=`Zovem se ${name}.`;
      addQuiz('conversation',`A: ${question} B: ___ (My name is ${name}.)`,answer,namePool.map(n=>`Zovem se ${n}.`),`${answer} introduces ${name}.`,'introduction-dialogue');
      addPractice('conversation',`A: ${question} B: ___ Write “My name is ${name}”.`,[answer],'Use Zovem se, then the name.','introduction-dialogue');
    });
    ['Australije','Srbije','Engleske','Kanade','Francuske','Nemačke'].forEach((country,i)=>{
      const countryEnglish=['Australia','Serbia','England','Canada','France','Germany'][i];
      const answer=`Zovem se ${name}. Iz ${country} sam.`;
      addQuiz('conversation',`Introduce yourself as ${name}, from ${countryEnglish}. Choose two sentences.`,answer,namePool.filter(n=>n!==name).map(n=>`Zovem se ${n}. Iz ${country} sam.`),`${answer} Use Iz ${country} sam for “I am from ${countryEnglish}”.`,'name-and-country');
      addPractice('conversation',`Write two sentences: “My name is ${name}. I am from ${countryEnglish}.” Use Zovem se … / Iz ${country} sam.`,[answer],`Zovem se ${name}. Then Iz ${country} sam.`,'name-and-country');
    });
  });
  const requests=[['Vodu','water'],['Kafu','coffee'],['Čaj','tea'],['Sok','juice'],['Račun','the bill']];
  ['a café','a restaurant','a hotel café','a small coffee shop'].forEach(setting=>requests.forEach(([word,en])=>{
    const answer=`${word}, molim.`;
    addQuiz('conversation',`You are at ${setting}. Ask for ${en} with a short “…, please” request.`,answer,requests.map(([w])=>`${w}, molim.`),`${answer} = ${titleCase(en)}, please.`,'request-situation');
    addPractice('conversation',`At ${setting}, write the short request “${titleCase(en)}, please”.`,[answer],`Use ${word}, then molim.`,'request-situation');
  }));
  const directionNouns=[['stanica','the station'],['prodavnica','the shop'],['hotel','the hotel'],['restoran','the restaurant'],['park','the park'],['škola','the school']];
  directionNouns.forEach(([noun,en],i)=>{
    const question=`Gde je ${noun}?`;
    addCard(conversation,'phrase-direction-'+i,question,`Where is ${en}?`,'Gde je + place: ask where one place is.');
    addQuiz('conversation',`Ask “Where is ${en}?”`,question,directionNouns.map(([n])=>`Gde je ${n}?`),`${question} = Where is ${en}?`,'directions');
    addPractice('conversation',`Write “Where is ${en}?” (${noun} = ${en})`,[question],'Use Gde je, then the place.','directions');
  });
  const replyPlaces=[['kod kuće','at home'],['u školi','at school'],['u parku','in the park'],['na poslu','at work'],['u hotelu','in the hotel'],['u prodavnici','in the shop']];
  ['Gde si?','Gde ste?'].forEach(question=>replyPlaces.forEach(([place,en])=>{
    const answer=`Ja sam ${place}.`;
    addQuiz('conversation',`A: ${question} B: ___ (I am ${en}.)`,answer,replyPlaces.map(([p])=>`Ja sam ${p}.`),`${answer} replies to “Where are you?”.`,'location-dialogue');
    addPractice('conversation',`A: ${question} B: ___ Write “I am ${en}” using Ja sam. (${place} = ${en})`,[answer],`Ja sam ${place}.`,'location-dialogue');
  }));
  ['Dobro jutro','Dobar dan','Dobro veče'].forEach(greeting=>namePool.forEach(name=>{
    const answer=`${greeting}. Zovem se ${name}.`;
    addQuiz('conversation',`Use “${conversation.find(c=>c.latin===greeting).english}”, then introduce yourself as ${name}.`,answer,namePool.filter(n=>n!==name).map(n=>`${greeting}. Zovem se ${n}.`),`${greeting} is the greeting. Zovem se ${name} gives the name.`,'greeting-introduction');
    addPractice('conversation',`Write “${conversation.find(c=>c.latin===greeting).english}. My name is ${name}.” Use two sentences.`,[answer],'Greeting first, then Zovem se and the name.','greeting-introduction');
  }));
  ['Kako si?','Kako ste?'].forEach(question=>['Dobro sam.','Dobro, hvala.'].forEach(reply=>['A ti?','A vi?'].forEach(returnQuestion=>{
    if((question==='Kako si?')!==(returnQuestion==='A ti?'))return;
    const answer=`${reply} ${returnQuestion}`;
    const meaning=`${conversation.find(c=>c.latin===reply).english} ${returnQuestion==='A ti?'?'And you? (informal)':'And you? (polite)'}`;
    addQuiz('conversation',`A: ${question} B: ___ (${meaning})`,answer,['Ne razumem.','Zovem se Ana.','Govorite li engleski?'],`${answer} gives the requested reply and returns the question.`,'return-question-dialogue');
    addPractice('conversation',`A: ${question} Write the reply “${meaning}”.`,[answer],`Use ${reply}, followed by ${returnQuestion}.`,'return-question-dialogue');
  })));

  const countryPairs=[['Australije','Australia'],['Srbije','Serbia'],['Engleske','England'],['Kanade','Canada'],['Francuske','France'],['Nemačke','Germany']];
  countryPairs.forEach(([country,en],i)=>addCard(conversation,'phrase-country-'+i,`Iz ${country} sam.`,`I am from ${en}.`,'Learn the country phrase as a whole: iz means from, and the country has its from-form.'));
  ['Dobro jutro','Dobar dan','Dobro veče'].forEach(greeting=>namePool.forEach(name=>countryPairs.forEach(([country,enCountry])=>{
    const text=`${greeting}. Zovem se ${name}. Iz ${country} sam.`;
    const enGreeting=conversation.find(c=>c.latin===greeting).english;
    addQuiz('conversation',`Read this introduction: “${text}” What is the speaker's name?`,name,namePool,`Zovem se ${name} means My name is ${name}.`,'read-combined-name','latin');
    addQuiz('conversation',`Read this introduction: “${text}” Where is the speaker from?`,enCountry,countryPairs.map(p=>p[1]),`Iz ${country} sam means I am from ${enCountry}.`,'read-combined-country','english');
    addQuiz('conversation',`Read this introduction: “${text}” What does the opening greeting mean?`,enGreeting,['Good morning','Good day','Good evening','Good night','Goodbye'],`${greeting} means ${enGreeting}.`,'read-combined-greeting','english');
    addPractice('conversation',`Write three short sentences: “${enGreeting}. My name is ${name}. I am from ${enCountry}.” Use ${greeting} / Zovem se … / Iz ${country} sam.`,[text],'Keep the order: greeting, name, country.','combined-introduction');
  })));

  // Reading drills reuse familiar lesson words. Lj, nj and dž count as one letter.
  const letterTokens = word => word.toLowerCase().match(/dž|lj|nj|[a-zčćšžđ]/g) || [];
  const readWords = unique([...alphabet.map(c=>c.example),...conversation.flatMap(c=>c.latin.replace(/[.,!?]/g,'').split(' ')),...smallWords.flatMap(w=>w.split(' ')),...allLocations.flatMap(([p])=>p.split(' ')),...negativeForms,...namePool,...nounGroups.map(r=>r[0])]);
  readWords.forEach(word=>{
    if(words.some(w=>normalise(w)===normalise(word)))return;
    const cy=cyrillic(word),tokens=letterTokens(word);
    addQuiz('alphabet',`Read ${cy}. Choose the matching Latin word.`,word,readWords,`${cy} = ${word}.`,'expanded-word-latin','latin');
    addQuiz('alphabet',`Choose the Cyrillic spelling of “${word}”.`,cy,readWords.map(cyrillic),`${word} = ${cy}.`,'expanded-word-cyrillic','cyrillic');
    addPractice('alphabet',`Write ${cy} in Latin.`,[word],`First letter: ${titleCase(tokens[0])}. ${tokens.length} Serbian letters.`,'expanded-word-latin','latin');
  });
  readWords.forEach(word=>{
    const tokens=letterTokens(word);
    addQuiz('alphabet',`How many Serbian letters are in “${word}” (${cyrillic(word)})? Count lj, nj and dž as one each.`,String(tokens.length),[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(String),`${tokens.map(titleCase).join(' · ')}: ${tokens.length} letters.`,'letter-count','digits');
    addQuiz('alphabet',`Which Serbian Latin letter ends “${word}”?`,titleCase(tokens.at(-1)),latinLetters,`The final letter is ${titleCase(tokens.at(-1))}.`,'final-letter','latin');
    addPractice('alphabet',`Write the final Latin letter of “${word}”.`,[tokens.at(-1)],`Read the ending: ${cyrillic(word)}.`,'final-letter','latin');
    if(tokens.length>1)tokens.forEach((letter,i)=>{
      const gap=tokens.map((t,j)=>i===j?'___':t).join(' · ');
      addQuiz('alphabet',`Copy ${cyrillic(word)} into Latin: ${gap}. Which Serbian letter fills the gap?`,titleCase(letter),latinLetters,`${word}: ${tokens.map(titleCase).join(' · ')}. Lj, nj and dž each occupy one slot.`,'letter-position','latin');
      addPractice('alphabet',`Copy ${cyrillic(word)} into Latin: ${gap}. Type only the missing Serbian letter.`,[letter],`There are ${tokens.length} Serbian letters in this word.`,'letter-position','latin');
    });
  });
  alphabet.forEach((card,i)=>{
    [1,2,3,5,7,11].forEach(offset=>{
      const next=alphabet[(i+offset)%alphabet.length],pair=`${card.latin.toLowerCase()} ${next.latin.toLowerCase()}`,cy=cyrillic(pair);
      const wrong=[1,2,3].map(j=>`${card.latin.toLowerCase()} ${alphabet[(i+offset+j)%alphabet.length].latin.toLowerCase()}`);
      addQuiz('alphabet',`Read this pair of letters: ${cy}. Choose the Latin letters in the same order.`,pair,wrong,`${cy} = ${pair}. These are two separate letters.`,'letter-pair-latin','latin');
      addQuiz('alphabet',`Choose the Cyrillic pair for these separate Latin letters: ${pair}.`,cy,wrong.map(cyrillic),`${pair} = ${cy}.`,'letter-pair-cyrillic','cyrillic');
      addPractice('alphabet',`Write this letter pair in Latin, with a space: ${cy}.`,[pair],`${card.latin} + ${next.latin}.`,'letter-pair-latin','latin');
    });
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
  be.filter(card=>/^be-[0-9]+$/.test(card.id)).forEach(card=>{card.note='Sentence words: ovde = here, tamo = there, kod kuće = at home, u školi = at school. Swap the place; keep the verb matched to the person.';});
  lessons.find(l=>l.id==='be').tip += ' Negative forms are nisam, nisi, nije, nismo, niste, nisu. Start questions with Da li + short verb + subject. Learn the place and time cards before trying longer combinations.';
  lessons.find(l=>l.id==='numbers').tip += ' Nula is zero. Practise counting forwards and backwards, simple sums, and code digits read separately.';
  lessons.find(l=>l.id==='conversation').description='Greet people, introduce yourself, order a drink, and ask for directions or a little help.';
  lessons.find(l=>l.id==='alphabet').tip += ' Reading exercises reuse words from the other lessons. When counting or filling letter slots, lj, nj and dž each count as one letter.';
  window.Serbian={lessons,quiz,practice,cyrillic,latin,normalise,assess,createQuestionDeck,poolCounts,numberWord};

})();
