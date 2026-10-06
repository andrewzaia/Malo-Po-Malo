const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {parseHTML}=require('linkedom');
const ROOT=path.join(__dirname,'..');
const KEY='malo-po-malo-progress-v1';

// Run the actual page scripts against a DOM. This exercises their event handlers
// and rendered state; it intentionally does not claim to test browser layout.
function boot(store=new Map(),restricted=false){
  const {window}=parseHTML(fs.readFileSync(path.join(ROOT,'index.html'),'utf8'));
  const document=window.document;
  Object.defineProperty(document,'activeElement',{value:null,writable:true});
  window.HTMLElement.prototype.focus=function(){document.activeElement=this;};
  window.HTMLInputElement.prototype.setSelectionRange=function(start,end){this.selectionStart=start;this.selectionEnd=end;};
  let now=Date.parse('2026-10-06T00:00:00Z'),timerId=0;const timers=new Map();
  const localStorage={getItem(k){if(restricted)throw Error('Storage unavailable');return store.get(k)||null;},setItem(k,v){if(restricted)throw Error('Storage unavailable');store.set(k,v);}};
  window.setInterval=fn=>{timers.set(++timerId,fn);return timerId;};
  window.clearInterval=id=>timers.delete(id);
  window.setTimeout=()=>0;
  window.URL={createObjectURL:()=> 'blob:qa',revokeObjectURL(){}};
  class ClockDate extends Date{constructor(...args){super(...(args.length?args:[now]));}static now(){return now;}}
  const context={window,document,localStorage,Date:ClockDate,TextEncoder,TextDecoder,Blob,URL:window.URL,atob,btoa,console};
  vm.createContext(context);
  const scripts=Array.from(document.querySelectorAll('script[src]'),el=>el.getAttribute('src'));
  for(const file of scripts){assert.ok(!file.startsWith('/'),'assets must be relative for project Pages URLs');vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),context,{filename:file});}
  const click=selector=>{const el=typeof selector==='string'?document.querySelector(selector):selector;assert.ok(el,'missing '+selector);assert.ok(!el.hasAttribute('disabled'),'disabled '+selector);el.dispatchEvent(new window.Event('click',{bubbles:true,cancelable:true}));};
  const fill=(selector,value)=>{const el=document.querySelector(selector);assert.ok(el);el.value=value;el.dispatchEvent(new window.Event('input',{bubbles:true}));};
  const submit=selector=>document.querySelector(selector).dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));
  const tick=ms=>{now+=ms;for(const fn of [...timers.values()])fn();};
  return {window,document,store,click,fill,submit,tick,A:window.SerbianPractice,D:window.Serbian,T:window.SerbianTest};
}
const text=(b,selector)=>b.document.querySelector(selector).textContent;
function solveQuiz(b){
  while(!b.A.readState().completed){
    const s=b.A.readState(),r=b.D.quiz[s.lesson].find(r=>r[4].id===s.question.id);
    const answer=s.script==='cyrillic'&&r[4].optionsScript==='display'?b.D.cyrillic(r[1]):r[1];
    const button=Array.from(b.document.querySelectorAll('[data-option]')).find(el=>el.children[1].textContent.trim()===answer);
    b.click(button);b.click('[data-action="next-question"]');
  }
}
function answerTest(b,correct=true){
  const q=b.T.readState().question,r=b.D.quiz[q.topic].find(r=>r[4].id===q.id);
  const answer=b.A.readState().script==='cyrillic'&&r[4].optionsScript==='display'?b.D.cyrillic(r[1]):r[1];
  const labels=Array.from(b.document.querySelectorAll('.test-choice'));
  const label=labels.find(el=>(el.children[2].textContent===answer)===correct);
  assert.ok(label);const input=label.querySelector('input');input.checked=true;input.dispatchEvent(new b.window.Event('change',{bubbles:true}));b.submit('#test-answer-form');
}

test('level navigation, scripts, keyboard tabs and the test gate render without recursion',()=>{
  const b=boot();assert.equal(b.document.querySelectorAll('[data-lesson]').length,5);
  assert.ok(b.document.querySelector('#tab-build').hidden);
  b.click('[data-level="intermediate"]');assert.equal(b.A.readState().level,'intermediate');
  assert.equal(b.document.querySelectorAll('[data-lesson]').length,8);
  assert.ok(text(b,'#lesson-kicker').includes('1 of 8'));
  const end=new b.window.Event('keydown',{bubbles:true,cancelable:true});Object.defineProperty(end,'key',{value:'End'});b.document.querySelector('.mode-nav').dispatchEvent(end);assert.equal(b.A.readState().mode,'talk');b.click('[data-mode="learn"]');
  b.click('[data-action="reveal"]');assert.ok(text(b,'.model-reply').includes('Ja sam iz Australije.'));
  b.click('[data-script="cyrillic"]');assert.ok(text(b,'.model-reply').includes('Ја сам из Аустралије.'));
  b.click('[data-mode="quiz"]');solveQuiz(b);
  assert.ok(text(b,'#progress-note').includes('1 completed round'));
  b.click('[data-action="open-test"]');assert.ok(text(b,'.test-gate').includes('eight')||text(b,'.test-gate').includes('8 intermediate'));
  b.fill('#test-password','wrong');b.submit('#test-start-form');assert.ok(text(b,'#test-password-error').includes('not correct'));
  b.click('[data-mode="learn"]');b.click('[data-level="beginner"]');
  assert.equal(b.document.querySelectorAll('[data-lesson]').length,5);assert.ok(b.document.querySelector('#tab-talk').hidden);
});
test('typing and daily mixes stay within the chosen level',()=>{
  const b=boot();
  for(const level of ['beginner','intermediate']){
    b.A.setLevel(level);b.A.doAction('daily-mix');const topics=new Set();
    while(!b.A.readState().completed){
      const s=b.A.readState(),q=s.question;topics.add(q.topic);
      assert.equal(b.D.lessons.find(l=>l.id===q.topic).level,level);
      const row=b.D.practice[q.topic].find(r=>r[3].id===q.id);
      const answer=q.optionsScript==='latin'?row[1][0]:b.D.cyrillic(row[1].at(-1));
      b.fill('#answer-input',answer);b.submit('#practice-form');assert.equal(b.A.readState().question.resolved,true);b.click('[data-action="next-question"]');
    }
    assert.equal(topics.size,level==='beginner'?5:8);
    assert.ok(text(b,'.completion').includes('/ 8'));
  }
});
test('word tiles, wrong attempts, hints, script changes and completion work',()=>{
  const b=boot();b.A.setLevel('intermediate');b.A.setMode('build');
  for(let i=0;i<5;i++){
    const q=b.D.builders[b.A.readState().lesson].find(q=>q.prompt===text(b,'#mode-content h2'));
    assert.ok(q);
    if(i===0){b.click('[data-course-word="0"]');b.click('[data-course-action="check-build"]');assert.ok(text(b,'#course-feedback').includes('Try this pattern'));b.click('[data-course-action="clear-build"]');}
    if(i===1){b.click('[data-course-action="build-hint"]');assert.ok(b.document.querySelector('.hint'));}
    if(i===2)b.A.setScript('cyrillic');
    for(let word=0;word<q.words.length;word++)b.click(`[data-course-word="${word}"]`);
    b.click('[data-course-action="check-build"]');assert.ok(text(b,'#course-feedback').includes('Correct.'));
    b.click('[data-course-action="next-build"]');
  }
  assert.ok(text(b,'.score').includes('3'));assert.ok(text(b,'#progress-note').includes('1 completed round'));
  b.A.render();assert.ok(text(b,'#progress-note').includes('1 completed round'),'rerender must not double-count');
});
test('all sixteen guided conversations accept taught replies in either script',()=>{
  const b=boot();b.A.setLevel('intermediate');
  for(const lesson of b.D.getLessons('intermediate'))for(let index=0;index<2;index++){
    b.A.setLesson(lesson.id);b.A.setMode('talk');
    b.click(`[data-course-scene="${index}"]`);
    assert.equal(b.document.querySelectorAll('.chat-bubble').length,7);
    b.click('[data-course-action="translations"]');b.click('[data-course-action="practise-talk"]');
    for(let n=0;n<3;n++){
      const r=b.D.dialogues[lesson.id][index].steps[n];
      b.A.setScript(n%2?'latin':'cyrillic');
      const reply=n%2?r.alternatives[0]||r.reply:b.D.cyrillic(r.reply);
      b.fill('#course-answer',reply);b.submit('#course-reply-form');assert.ok(text(b,'#course-feedback').includes('Correct.'));
      b.click('[data-course-action="next-talk"]');
    }
    assert.ok(text(b,'.score').includes('3'));assert.equal(b.document.querySelectorAll('.review-row').length,3);
  }
});
test('completed rounds and settings survive reload; restricted storage remains usable',()=>{
  const store=new Map(),b=boot(store);b.A.setLevel('intermediate');b.A.setScript('cyrillic');b.A.setMode('quiz');solveQuiz(b);
  const reopened=boot(store);assert.equal(reopened.A.readState().level,'intermediate');assert.equal(reopened.A.readState().script,'cyrillic');
  assert.ok(text(reopened,'#progress-note').includes('1 completed round'));
  const restricted=boot(new Map(),true);restricted.A.setLevel('intermediate');restricted.A.setMode('quiz');solveQuiz(restricted);
  assert.ok(text(restricted,'#progress-note').includes('storage is unavailable'));
  const damaged=boot(new Map([[KEY,'not json']]));assert.equal(damaged.A.readState().level,'beginner');
});
test('both level tests have 100 distinct, balanced questions and working PDF results',()=>{
  const b=boot();
  for(const level of ['beginner','intermediate']){
    b.A.setLevel(level);b.A.setScript(level==='intermediate'?'cyrillic':'latin');
    assert.equal(b.T.start(' NaPrEd '),true);
    assert.equal(b.document.querySelector('[data-level="beginner"]').disabled,true);
    b.A.setLevel(level==='beginner'?'intermediate':'beginner');assert.equal(b.A.readState().level,level);
    const ids=new Set(),topics={};
    for(let i=0;i<100;i++){
      const q=b.T.readState().question;assert.ok(!ids.has(q.id));ids.add(q.id);
      assert.equal(b.D.lessons.find(l=>l.id===q.topic).level,level);topics[q.topic]=(topics[q.topic]||0)+1;
      answerTest(b,i!==0);
    }
    const report=b.T.getReport();assert.equal(report.score,99);assert.equal(report.counts.incorrect,1);assert.equal(report.total,100);
    assert.equal(report.topics.length,level==='beginner'?5:8);
    assert.ok(Object.values(topics).every(n=>level==='beginner'?n===20:n===12||n===13));
    assert.equal(b.document.querySelector('[data-level="beginner"]').disabled,false);
    const bytes=b.window.SerbianPDF.create(report);assert.ok(bytes.length>50000);assert.equal(Buffer.from(bytes).subarray(0,8).toString(),'%PDF-1.7');
    if(process.env.QA_OUTPUT_DIR){fs.mkdirSync(process.env.QA_OUTPUT_DIR,{recursive:true});fs.writeFileSync(path.join(process.env.QA_OUTPUT_DIR,level+'-results.pdf'),bytes);}
    b.click('[data-test-filter="review"]');assert.equal(b.document.querySelectorAll('.test-review-item').length,1);
    b.click('[data-test-action="pdf"]');assert.ok(text(b,'#test-export-status').includes('ready'));
  }
});
test('timeouts catch up after a hidden tab and ending early marks every remaining question',()=>{
  const b=boot();b.A.setLevel('intermediate');b.T.start('napred');
  b.tick(60000);assert.equal(b.T.readState().index,1);assert.ok(text(b,'.test-notice').includes('Time expired'));
  b.tick(120000);assert.equal(b.T.readState().index,3);
  answerTest(b,true);b.click('[data-test-action="ask-end"]');b.click('[data-test-action="finish"]');
  const report=b.T.getReport();assert.equal(report.counts.correct,1);assert.equal(report.counts.missed,99);assert.equal(report.results.length,100);assert.equal(report.endedEarly,true);
  b.click('[data-test-action="new"]');b.T.start('napred');b.tick(100*60000);
  assert.equal(b.T.isComplete(),true);assert.equal(b.T.getReport().counts.missed,100);
  b.A.setLevel('beginner');b.A.setMode('test');assert.ok(text(b,'.test-gate').includes('BEGINNER'));
});
