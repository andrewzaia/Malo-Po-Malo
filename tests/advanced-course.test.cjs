const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const context={window:{}};vm.createContext(context);
for(const file of ['data.js','intermediate.js','intermediate-bank.js','advanced.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
const D=context.window.Serbian;
test('Advanced extends the existing levels without changing them',()=>{
 assert.deepEqual(Array.from(D.levels,l=>l.id),['beginner','intermediate','advanced']);
 assert.equal(D.getLessons('beginner').length,5);
 assert.equal(D.getLessons('intermediate').length,8);
 assert.equal(D.getLessons('advanced').length,8);
});
test('Every advanced lesson supports 100-question testing and all exercise modes',()=>{
 const ids=new Set();
 for(const lesson of D.getLessons('advanced')){
   const id=lesson.id;
   assert.ok(lesson.cards.length>=13);
   assert.ok(D.quiz[id].length>=39);
   assert.equal(D.practice[id].length,lesson.cards.length);
   assert.equal(D.builders[id].length,lesson.cards.length);
   assert.equal(D.dialogues[id].length,2);
   assert.equal(D.poolCounts[id].quiz,D.quiz[id].length);
   assert.equal(D.poolCounts[id].practice,D.practice[id].length);
   for(const row of D.quiz[id]){
     assert.equal(row[2].length,3);
     assert.equal(new Set([row[1],...row[2]].map(D.normalise)).size,4);
     assert.ok(row[3]);
     assert.ok(!ids.has(row[4].id));ids.add(row[4].id);
     assert.equal(D.formatPrompt(row[0],row[4].serbianSegments,'cyrillic').includes(D.cyrillic(row[4].serbianSegments[0])),true);
   }
   for(const row of D.practice[id]){
     assert.equal(D.assess(row[1][0],row[1]),'correct');
     assert.equal(D.assess(D.cyrillic(row[1][0]),row[1]),'correct');
   }
   for(const builder of D.builders[id]){
     assert.ok(builder.words.length);
     assert.equal(D.assess(builder.words.join(' '),builder.answers),'correct');
   }
   for(const scene of D.dialogues[id])assert.equal(scene.steps.length,3);
   assert.equal(new Set(D.createQuestionDeck(D.quiz[id].map(q=>({id:q[4].id,category:q[4].category}))).draw(13).map(q=>q.id)).size,13);
 }
 assert.ok(ids.size>=300);
});

test('Advanced scripts load before app startup and all modes remain available',()=>{
 const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
 const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
 const ui=fs.readFileSync(path.join(__dirname,'..','intermediate-ui.js'),'utf8');
 assert.ok(html.includes('data-level="advanced"'));
 assert.ok(html.indexOf('advanced.js')>html.indexOf('intermediate-ui.js'));
 assert.ok(html.indexOf('advanced.js')<html.indexOf('app.js'));
 assert.ok(app.includes("state.level!=='beginner'?['learn','quiz','practice','build','talk']"));
 assert.ok(ui.includes("app()?.readState().level==='beginner'"));
});
