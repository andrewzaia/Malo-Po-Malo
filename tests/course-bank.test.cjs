const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const context={window:{}};vm.createContext(context);
for(const file of ['data.js','intermediate.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
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
    assert.equal(l.cards.length,10);assert.equal(D.quiz[l.id].length,20);
    for(const [prompt,answer,wrong,explanation,meta] of D.quiz[l.id]){
      assert.equal(wrong.length,3);assert.equal(new Set([answer,...wrong].map(D.normalise)).size,4);
      assert.ok(explanation);assert.ok(meta.serbianSegments.length);
      assert.ok(!ids.has(meta.id));ids.add(meta.id);
      assert.ok(!prompts.has(prompt));prompts.add(prompt);
      assert.ok(D.formatPrompt(prompt,meta.serbianSegments,'cyrillic').includes(D.cyrillic(meta.serbianSegments[0])));
    }
  }
  assert.equal(ids.size,160);
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
    const deck=D.createQuestionDeck(D.builders[l.id]);
    const drawn=[...deck.draw(5),...deck.draw(5)];
    assert.equal(new Set(drawn.map(q=>q.id)).size,10);
  }
  assert.equal(total,80);
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
