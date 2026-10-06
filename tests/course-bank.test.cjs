const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const context={window:{}};vm.createContext(context);
for(const file of ['data.js','intermediate.js','intermediate-bank.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
const D=context.window.Serbian;
const wordKey=s=>D.normalise(s).split(' ').sort().join(' ');

test('level separation preserves the five existing beginner banks',()=>{
  assert.deepEqual(Array.from(D.getLessons('beginner'),l=>l.id),['alphabet','numbers','pronouns','be','conversation']);
  const counts={alphabet:[1935,1373],numbers:[1885,1483],pronouns:[1420,1410],be:[2642,1912],conversation:[1125,636]};
  for(const [id,[quiz,practice]] of Object.entries(counts)){
    assert.equal(D.quiz[id].length,quiz);assert.equal(D.practice[id].length,practice);
  }
  assert.equal(D.getLessons('intermediate').length,8);
});
test('every intermediate quiz has one answer and three distinct distractors',()=>{
  const ids=new Set(),prompts=new Set();
  for(const l of D.getLessons('intermediate')){
    assert.equal(l.cards.length,10);assert.ok(D.quiz[l.id].length>=500);
    for(const [prompt,answer,wrong,explanation,meta] of D.quiz[l.id]){
      assert.equal(wrong.length,3);assert.equal(new Set([answer,...wrong].map(D.normalise)).size,4);
      assert.ok(explanation);assert.ok(meta.serbianSegments.length);
      assert.ok(!ids.has(meta.id));ids.add(meta.id);
      const key=D.normalise(prompt);assert.ok(!prompts.has(key),'duplicate quiz: '+prompt);prompts.add(key);
      assert.ok(D.formatPrompt(prompt,meta.serbianSegments,'cyrillic').includes(D.cyrillic(meta.serbianSegments[0])));
    }
  }
  assert.ok(ids.size>=8000);
});
test('authored reply alternatives work in both scripts without losing letter distinctions',()=>{
  for(const l of D.getLessons('intermediate'))for(const [prompt,answers,hint] of D.practice[l.id]){
    assert.ok(prompt&&hint);assert.ok(answers.length);
    for(const answer of answers){
      assert.equal(D.assess(answer,answers),'correct');
      assert.equal(D.assess(D.cyrillic(answer),answers),'correct');
      assert.equal(D.assess(' '+answer.toUpperCase()+'! ',answers),'correct');
    }
  }
  assert.equal(D.assess('Sta znaci "stanica"?',['Šta znači „stanica“?']),'accent');
  assert.equal(D.assess('Šta znači "stanica"?',['Šta znači „stanica“?']),'correct');
  assert.equal(D.assess('Juče sam radila.',['Juče sam radio.']),'incorrect');
  assert.equal(D.assess('Juče sam radio.',['Juče sam radila.']),'incorrect');
  assert.equal(D.assess('Volim kafu.',['Ne volim kafu.']),'incorrect');
});
test('sentence alternatives use exactly the available word tiles',()=>{
  let total=0;
  for(const l of D.getLessons('intermediate'))for(const q of D.builders[l.id]){
    total++;assert.equal(q.words.join(' '),q.answers[0]);
    for(const answer of q.answers)assert.equal(wordKey(answer),wordKey(q.words.join(' ')));
  }
  for(const l of D.getLessons('intermediate')){
    const pool=D.builders[l.id],deck=D.createQuestionDeck(pool,()=>0.37);
    const drawn=deck.draw(pool.length);
    assert.equal(new Set(drawn.map(q=>q.id)).size,pool.length);
    assert.equal(deck.draw(5).length,5,'deck must refill after the whole bank');
  }
  assert.ok(total>=2500);
});
test('sixteen dialogues contain three constrained learner replies each',()=>{
  let scenes=0;
  for(const l of D.getLessons('intermediate')){
    assert.equal(D.dialogues[l.id].length,2);
    for(const scene of D.dialogues[l.id]){
      scenes++;assert.equal(scene.steps.length,3);assert.ok(scene.closing&&scene.setting);
      for(const row of scene.steps)assert.ok(row.question&&row.questionEnglish&&row.reply&&row.english);
    }
  }
  assert.equal(scenes,16);
});

test('all expanded banks have distinct prompts and IDs, accurate totals, and complete rotation',()=>{
  const practicePrompts=new Set(),allIds=new Set();let quizzes=0,typing=0,builders=0;
  for(const l of D.getLessons('intermediate')) {
    const quiz=D.quiz[l.id].map(r=>({id:r[4].id,category:r[4].category}));
    const practice=D.practice[l.id].map(r=>({id:r[3].id,category:r[3].category}));
    quizzes+=quiz.length;typing+=practice.length;builders+=D.builders[l.id].length;
    assert.equal(D.poolCounts[l.id].quiz,quiz.length);assert.equal(D.poolCounts[l.id].practice,practice.length);
    assert.ok(practice.length>=200);
    for(const row of D.practice[l.id]) {
      const key=D.normalise(row[0]);assert.ok(!practicePrompts.has(key),'duplicate typing prompt: '+row[0]);practicePrompts.add(key);
    }
    for(const [pool,roundSize] of [[quiz,5],[practice,8]]) {
      for(const q of pool){assert.ok(!allIds.has(q.id));allIds.add(q.id);}
      const deck=D.createQuestionDeck(pool,()=>0.61),seen=new Set();
      while(seen.size<pool.length) {
        const drawn=deck.draw(Math.min(roundSize,pool.length-seen.size));
        for(const q of drawn){assert.ok(!seen.has(q.id),'repeat before full rotation');seen.add(q.id);}
      }
      assert.equal(deck.draw(roundSize).length,roundSize,'a depleted bank refills');
    }
    assert.equal(new Set(D.builders[l.id].map(q=>D.normalise(q.prompt))).size,D.builders[l.id].length);
  }
  assert.deepEqual({quizzes,typing,builders},{quizzes:11503,typing:3919,builders:3819});
});

test('repeated Serbian questions and replies have consistent meanings and unambiguous choices',()=>{
  for(const l of D.getLessons('intermediate')) {
    const questions=new Map(),replies=new Map(),replyMeanings=new Map();
    for(const row of [...l.exchanges,...D.intermediateExpansion[l.id].exchanges]) {
      for(const [map,source,meaning] of [[questions,row.question,row.questionEnglish],[replies,row.reply,row.english]]) {
        const key=D.normalise(source),value=D.normalise(meaning);
        if(map.has(key))assert.equal(map.get(key),value,'inconsistent translation: '+source);
        map.set(key,value);
      }
      for(const answer of [row.reply,...row.alternatives]) {
        const meaning=D.normalise(row.english),key=D.normalise(answer);
        if(!replyMeanings.has(meaning))replyMeanings.set(meaning,new Set());
        replyMeanings.get(meaning).add(key);
      }
      assert.ok(!/[\u0400-\u04ff]/.test(row.note),'Latin notes must not contain stray Cyrillic');
    }
    for(const [prompt,answer,wrong,,meta] of D.quiz[l.id]) {
      if(meta.category==='understand-reply') {
        const source=meta.serbianSegments[0];assert.equal(replies.get(D.normalise(source)),D.normalise(answer));
        for(const choice of wrong)assert.notEqual(D.normalise(choice),replies.get(D.normalise(source)));
      }
      if(meta.category==='reply') {
        const meaning=prompt.match(/with “(.+)”\. Choose/)[1],equivalent=replyMeanings.get(D.normalise(meaning));
        assert.ok(equivalent.has(D.normalise(answer)));
        for(const choice of wrong)assert.ok(!equivalent.has(D.normalise(choice)),'equivalent reply used as distractor: '+choice);
      }
    }
  }
});

test('independent everyday examples check age, place, irregular verbs, future and past gender',()=>{
  function answer(id,question,meaning,expected,incorrect) {
    const prompt=`Reply to “${question}” with “${meaning}”.`;
    const row=D.practice[id].find(r=>r[0]===prompt);assert.ok(row,'missing example: '+prompt);
    assert.equal(D.assess(expected,row[1]),'correct');
    assert.equal(D.assess(D.cyrillic(expected),row[1]),'correct');
    if(incorrect)assert.equal(D.assess(incorrect,row[1]),'incorrect');
  }
  answer('i-questions','Koliko imaš godina?','I am 21 years old.','Imam dvadeset jednu godinu.','Imam dvadeset jedan godina.');
  answer('i-questions','Koliko godina ima Ana?','Ana is 22 years old.','Ana ima dvadeset dve godine.','Ana ima dvadeset dva godina.');
  answer('i-routines','Šta radite ujutru?','We drink tea in the morning.','Mi pijemo čaj ujutru.','Mi pije čaj ujutru.');
  answer('i-places','Gde je Ana danas?','Ana is at school today.','Ana je u školi danas.','Ana je u školu danas.');
  answer('i-places','Kuda ide Ana danas?','Ana is going to school today.','Ana ide u školu danas.','Ana ide u školi danas.');
  answer('i-plans','Šta ćete da radite u petak?','We will read a book on Friday.','Mi ćemo čitati knjigu u petak.','Mi će čitati knjigu u petak.');
  answer('i-past','Šta si radila juče?','I drank tea yesterday. (female speaker)','Juče sam pila čaj.','Juče sam pio čaj.');
  answer('i-opinions','Kakva je supa?','The soup is warm.','Supa je topla.','Supa je topao.');
  answer('i-clarify','Za koju reč Vam treba pomoć?','How is “biblioteka” pronounced?','Kako se izgovara „biblioteka“?');
});
