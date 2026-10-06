(function () {
  'use strict';
  const D = window.Serbian;
  const STORAGE_KEY='malo-po-malo-progress-v1';
  let saved={},storageAvailable=true;
  try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');if(value&&typeof value==='object'&&!Array.isArray(value))saved=value;}catch{storageAvailable=false;}
  const initialLevel=D.levels.some(l=>l.id===saved.level)?saved.level:'beginner';
  const initialLesson=D.getLessons(initialLevel).find(l=>l.id===saved.lesson)?.id||D.getLessons(initialLevel)[0].id;
  const progress=saved.progress&&typeof saved.progress==='object'&&!Array.isArray(saved.progress)?saved.progress:{};
  const state = {level:initialLevel,lesson:initialLesson,mode:'learn',script:saved.script==='cyrillic'?'cyrillic':'latin',selected:0,revealed:false,session:null};
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sr = text => state.script==='cyrillic'?D.cyrillic(text):text;
  const lesson = () => D.lessons.find(l=>l.id===state.lesson);
  const activeLessons=()=>D.getLessons(state.level);
  const levelTitle=()=>D.levels.find(l=>l.id===state.level).title;
  const availableModes=()=>state.level==='intermediate'?['learn','quiz','practice','build','talk']:['learn','quiz','practice'];
  const promptText=question=>D.formatPrompt(question.prompt,question.serbianSegments,state.script);
  function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({level:state.level,lesson:state.lesson,script:state.script,progress}));storageAvailable=true;}catch{storageAvailable=false;}}
  function progressNote(){const rounds=Number(progress[state.lesson]?.rounds)||0;$('progress-note').textContent=storageAvailable?(rounds?rounds+' completed '+(rounds===1?'round':'rounds')+' in this lesson.':'Completed rounds are saved on this device.'):'Progress is available for this visit; browser storage is unavailable.';}
  function recordProgress(id,mode,score,total){
    if(!D.lessons.some(l=>l.id===id)||!['quiz','practice','build','talk'].includes(mode)||!Number.isInteger(total)||total<1||!Number.isInteger(score)||score<0||score>total)throw new Error('Invalid progress result');
    const before=progress[id]||{};
    progress[id]={rounds:(Number(before.rounds)||0)+1,lastMode:mode,lastScore:score,lastTotal:total};persist();progressNote();
  }
  function setLevel(level){
    if(window.SerbianTest?.isRunning())return;
    if(!D.levels.some(l=>l.id===level))throw new Error('Unknown level');
    state.level=level;state.lesson=activeLessons()[0].id;state.mode='learn';state.selected=0;state.revealed=false;state.session=null;
    window.SerbianCourseUI.reset();window.SerbianTest?.reset();persist();render();
  }
  const shuffle = items => { const result=[...items]; for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];} return result; };
  const cyrillicOrder='А Б В Г Д Ђ Е Ж З И Ј К Л Љ М Н Њ О П Р С Т Ћ У Ф Х Ц Ч Џ Ш'.split(' ');
  function cards() { const list=[...lesson().cards]; return state.lesson==='alphabet'&&state.script==='cyrillic'?list.sort((a,b)=>cyrillicOrder.indexOf(D.cyrillic(a.latin))-cyrillicOrder.indexOf(D.cyrillic(b.latin))):list; }
  const decks = new Map();
  function quizItems(id) { return D.quiz[id].map(r=>({id:r[4].id,prompt:r[0],answers:[r[1]],options:[r[1],...r[2]],explanation:r[3],topic:id,...r[4]})); }
  function practiceItems(id) { return D.practice[id].map(r=>({id:r[3].id,prompt:r[0],answers:r[1],hint:r[2],topic:id,...r[3]})); }
  function takeQuestions(id, mode, count) {
    const key=id+'-'+mode;
    if(!decks.has(key))decks.set(key,D.createQuestionDeck(mode==='quiz'?quizItems(id):practiceItems(id)));
    return decks.get(key).draw(count).map(question=>({...question,options:question.options?shuffle(question.options):undefined}));
  }
  function displayAnswer(question, value) { return question.optionsScript==='display'?sr(value):value; }
  function startSession(mixed=false) {
    let questions;
    if(mixed){
      const lessons=shuffle(activeLessons()),chosen=lessons.slice(0,8),base=Math.floor(8/chosen.length),extra=8%chosen.length;
      questions=shuffle(chosen.flatMap((l,i)=>takeQuestions(l.id,'practice',base+(i<extra?1:0))));
    }
    else questions=takeQuestions(state.lesson,state.mode,state.mode==='quiz'?5:8);
    state.session={questions,index:0,results:[],selected:null,status:null,input:'',attempts:0,hinted:false,showHint:false,resolved:false,mixed,saved:false};
  }
  function setLesson(id) {
    if(window.SerbianTest?.isRunning())return;
    const target=D.lessons.find(l=>l.id===id);if(!target) throw new Error('Unknown lesson');
    if(state.level!==target.level){state.level=target.level;window.SerbianTest?.reset();}
    if(state.mode==='test'||!availableModes().includes(state.mode))state.mode='learn';
    state.lesson=id;state.selected=0;state.revealed=false;
    window.SerbianCourseUI.reset();
    if(state.mode==='quiz'||state.mode==='practice')startSession();
    persist();
    render();
  }
  function setMode(mode,mixed=false) {
    if(window.SerbianTest?.isRunning()&&mode!=='test')return;
    if(mode!=='test'&&!availableModes().includes(mode)) throw new Error('Unknown mode');
    state.mode=mode;
    window.SerbianCourseUI.reset();
    if(mode==='quiz'||mode==='practice')startSession(mixed);
    render();
  }
  function setScript(script) {
    if(window.SerbianTest?.isRunning())return;
    if(!['latin','cyrillic'].includes(script)) throw new Error('Unknown script');
    const selected=cards()[state.selected]?.id;
    state.script=script;
    if(state.mode==='learn')state.selected=Math.max(0,cards().findIndex(c=>c.id===selected));
    persist();render();
  }
  function render() {
    const l=lesson();
    const testing=state.mode==='test',running=!!window.SerbianTest?.isRunning();
    document.querySelector('.mode-nav').hidden=testing;
    document.querySelector('.lesson-tip').hidden=testing;
    $('mode-content').hidden=testing;
    $('test-content').hidden=!testing;
    $('testing-link').classList.toggle('active',testing);
    if(testing)$('testing-link').setAttribute('aria-current','page');else $('testing-link').removeAttribute('aria-current');
    $('lesson-nav').innerHTML=activeLessons().map((item,i)=>`<button type="button" data-lesson="${item.id}" class="lesson-link ${item.id===state.lesson?'active':''}" ${item.id===state.lesson?'aria-current="page"':''}><span class="lesson-number">${String(i+1).padStart(2,'0')}</span><span><strong>${escape(item.title)}</strong><small>${escape(item.short)}</small></span></button>`).join('');
    $('lesson-kicker').innerHTML=`${levelTitle()} · Lesson ${activeLessons().indexOf(l)+1} of ${activeLessons().length} <span aria-hidden="true"> / </span> <span lang="${state.script==='cyrillic'?'sr-Cyrl':'sr-Latn'}">${escape(sr(l.serbian))}</span>`;
    $('lesson-title').textContent=l.title;
    $('lesson-description').textContent=l.description;
    $('lesson-count').textContent=l.cards.length+' cards · '+D.poolCounts[l.id].quiz+' quiz questions';
    $('tip-content').textContent=l.tip;
    $('level-description').textContent=D.levels.find(item=>item.id===state.level).description;
    document.querySelector('.sidebar-bottom').textContent=levelTitle()+' · Little steps, every day';
    document.querySelectorAll('[data-level]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.level===state.level));b.disabled=running;});
    document.querySelectorAll('[data-intermediate-mode]').forEach(b=>b.hidden=state.level!=='intermediate');
    progressNote();
    document.querySelectorAll('[data-script]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.script===state.script));b.disabled=running;});
    document.querySelectorAll('[data-lesson],[data-action="daily-mix"]').forEach(b=>b.disabled=running);
    document.querySelectorAll('[data-mode]').forEach(b=>{const active=b.dataset.mode===state.mode;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
    $('mode-content').setAttribute('aria-labelledby','tab-'+state.mode);
    if(testing){
      document.querySelectorAll('[data-lesson]').forEach(b=>{b.classList.remove('active');b.removeAttribute('aria-current');});
      $('lesson-kicker').textContent='MIXED '+levelTitle().toUpperCase()+' TEST';
      $('lesson-title').textContent='A little of everything.';
      $('lesson-description').textContent='100 questions across '+activeLessons().length+' '+state.level+' lessons. One minute for each answer.';
      $('lesson-count').textContent='100 questions';
      window.SerbianTest?.render();
    }else if(state.mode==='learn')renderLearn();else if(state.mode==='build'||state.mode==='talk')window.SerbianCourseUI.render(state.mode,l,state.script);else renderExercise();
  }
  function renderLearn() {
    if(state.level==='intermediate'){window.SerbianCourseUI.renderLearn(lesson(),state);return;}
    const l=lesson(), list=cards(), card=list[state.selected], isLetter=card.kind==='letter';
    let grid=list.map((c,i)=>{
      const selected=i===state.selected;
      let group='';
      if(state.lesson==='numbers'&&[0,10,20,28,30].includes(i))group=`<div class="group-label">${{0:'1–10',10:'11–20',20:'Tens to 100',28:'Bigger numbers',30:'Zero'}[i]}</div>`;
      return group+`<button type="button" class="${isLetter?'letter-tile':'word-tile'}" data-card="${i}" aria-pressed="${selected}" aria-label="Study ${escape(c.label)}${c.sub?', '+escape(c.sub):''}"><span lang="${state.script==='cyrillic'?'sr-Cyrl':'sr-Latn'}">${escape(isLetter?sr(c.latin):state.lesson==='numbers'?c.label:sr(c.label))}</span>${isLetter?`<span class="secondary-letter" lang="${state.script==='cyrillic'?'sr-Latn':'sr-Cyrl'}">${escape(state.script==='cyrillic'?c.latin:D.cyrillic(c.latin))}</span>`:''}${c.sub?`<small>${escape(c.sub)}</small>`:''}</button>`;
    }).join('');
    const answer=isLetter?`<strong lang="sr">${escape(sr(card.example))}</strong><p>${escape(card.english)}</p>`:`<strong>${escape(card.english)}</strong>${card.example?`<p><span lang="sr">${escape(sr(card.example))}</span><br>${escape(card.exampleMeaning)}</p>`:''}`;
    $('mode-content').innerHTML=`<div class="reference-layout"><div class="catalogue"><div class="section-label"><strong>${isLetter?'Choose a letter':'Choose a card'}</strong><span>${isLetter?(state.script==='latin'?'Latin order':'Cyrillic order'):list.length+' cards'}</span></div><div class="${isLetter?'tile-grid':'word-grid'} ${state.lesson==='conversation'?'phrases':''}">${grid}</div><p class="catalogue-note">${isLetter?'Five vowels: a, e, i, o, u. Each stays clear and steady.':'Choose a card, say the Serbian out loud, then reveal its meaning.'}</p></div><article class="flashcard" aria-label="Selected reference card"><div class="card-top"><span class="card-tag">${isLetter?'LETTER & SOUND':'READ · SAY · REMEMBER'}</span><span>Card ${state.selected+1} / ${list.length}</span></div><div class="card-face"><div class="${isLetter?'big-letter':'big-word'}" lang="${state.script==='cyrillic'?'sr-Cyrl':'sr-Latn'}">${escape(sr(card.latin))}${isLetter?' <span>'+escape(sr(card.latin.toLowerCase()))+'</span>':''}</div><div class="script-pair" lang="${state.script==='cyrillic'?'sr-Latn':'sr-Cyrl'}">${escape(state.script==='cyrillic'?card.latin:D.cyrillic(card.latin))}</div><p class="pronunciation">Sounds like <strong>${escape(card.sound)}</strong></p></div><div class="card-details"><p class="sound-note">${escape(card.note)}</p><div id="card-answer" aria-live="polite">${state.revealed?`<div class="revealed">${answer}</div><button type="button" class="small-button hide-answer" data-action="reveal" style="margin-top:10px">Hide answer</button>`:`<button type="button" class="reveal-button" data-action="reveal">${isLetter?'Reveal an example':'Reveal meaning'}</button>`}</div><div class="card-actions"><button type="button" class="small-button" data-action="previous-card">Previous</button><span>Say it out loud</span><button type="button" class="small-button" data-action="next-card">Next card</button></div></div></article></div>`;
  }
  function q() { return state.session.questions[state.session.index]; }
  function feedbackHTML(status) {
    const question=q();
    if(!status)return '<div id="feedback" role="status" aria-live="polite" aria-atomic="true"></div>';
    let title='',detail='';
    if(state.mode==='quiz'){
      title=status==='correct'?'Correct. Nice work.':'Keep going. Here’s the answer.';
      detail=question.explanation;
    }else{
      const answer=escape(displayAnswer(question,question.answers[0]));
      if(status==='correct'){title='Correct. Nice work.';detail='You wrote '+escape(displayAnswer(question,state.session.input))+'. '+escape(question.explanation||'');}
      else if(status==='empty'){title='Give it a try.';detail='Type an answer, or use a hint.';}
      else if(status==='accent'){title='Almost. Check the Serbian letters.';detail='Some sounds need č, ć, š, ž or đ. Use the letter buttons below your answer and try again.';}
      else if(status==='script'){title='Try the Latin partner.';detail='For this card, type the matching Latin letter. The letter buttons can help.';}
      else if(status==='revealed'){title='Let’s learn this one.';detail='The answer is <strong lang="sr">'+answer+'</strong>. Say it once, then carry on.';}
      else {title='Not quite yet. Try again.';detail=escape(question.explanation||'Use a hint if you need one. You can also reveal the answer.');}
    }
    return `<div id="feedback" role="status" aria-live="polite" aria-atomic="true" class="feedback ${status==='correct'?'correct':status==='revealed'?'':'incorrect'}"><strong>${title}</strong><p>${detail}</p></div>`;
  }
  function renderExercise(focus) {
    const s=state.session;
    if(s.index>=s.questions.length){renderCompletion();return;}
    const question=q(),quiz=state.mode==='quiz';
    const available=s.mixed?activeLessons().reduce((total,l)=>total+D.poolCounts[l.id].practice,0):D.poolCounts[state.lesson][state.mode];
    const content=quiz?`<div class="choice-list">${question.options.map((option,i)=>{
      const correct=s.resolved&&option===question.answers[0],incorrect=s.resolved&&s.selected===option&&!correct;
      const display=displayAnswer(question,option);
      return `<button type="button" data-option="${i}" class="choice ${correct?'correct':''} ${incorrect?'incorrect':''}" ${s.resolved?'disabled':''}><span class="choice-key" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${escape(display)}${correct?' <span aria-label="correct answer">✓</span>':''}${incorrect?' <span aria-label="incorrect answer">×</span>':''}</span></button>`;
    }).join('')}</div>`:`<form id="practice-form"><label class="input-label" for="answer-input">Your answer in ${question.latinOnly?'Latin':'Latin or Cyrillic'}</label><input id="answer-input" class="answer-input" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" value="${escape(s.input)}" ${s.resolved?'disabled':''} aria-describedby="input-note feedback"><div class="character-keys" aria-label="Serbian letter helpers">${['č','ć','š','ž','đ','lj','nj','dž'].map(c=>`<button type="button" data-character="${c}" ${s.resolved?'disabled':''} aria-label="Insert ${c}">${c}</button>`).join('')}</div><p id="input-note" class="input-note">${question.latinOnly?'Use the Latin letter for this alphabet match.':'Either script works. Case, quotes and punctuation don’t matter.'} Serbian letter marks do matter.</p><div class="practice-tools"><button type="submit" class="primary-button" ${s.resolved?'disabled':''}>Check answer</button><button type="button" class="small-button" data-action="hint" ${s.resolved?'disabled':''}>${s.showHint?'Hide hint':'Need a hint?'}</button><button type="button" class="small-button" data-action="show-answer" ${s.resolved?'disabled':''}>Reveal answer</button></div>${s.showHint?`<div class="hint">${escape(question.hint)}</div>`:''}</form>`;
    $('mode-content').innerHTML=`<div class="exercise-shell"><div class="exercise-meta"><span>${s.mixed?'Daily mix':quiz?'Quick quiz':'Typing practice'}</span><span>Question ${s.index+1} of ${s.questions.length}</span></div><div class="progress-track" role="progressbar" aria-label="Session progress" aria-valuemin="0" aria-valuemax="${s.questions.length}" aria-valuenow="${s.index}"><span style="width:${s.index/s.questions.length*100}%"></span></div><p class="pool-note">${s.questions.length} questions this round · ${available} available${s.mixed?' across '+state.level+' lessons':' in this lesson'}</p><div class="question-label">${s.mixed?escape(D.lessons.find(l=>l.id===question.topic).title):quiz?'Choose one answer':'A little recall'}</div><h2 id="question-heading">${escape(promptText(question))}</h2>${content}${feedbackHTML(s.status)}<div class="exercise-footer"><span>${quiz?'One question at a time.':s.resolved?'Say the answer out loud before you continue.':'No timer. Take your time.'}</span><button type="button" class="primary-button" data-action="next-question" ${s.resolved?'':'disabled'}>${s.index===s.questions.length-1?'See results':'Next question'}</button></div></div>`;
    if(focus){const element=focus==='input'?$('answer-input'):document.querySelector('[data-action="next-question"]');element?.focus();}
  }
  function chooseOption(index) {
    const s=state.session;
    if(state.mode!=='quiz'||s.resolved)return;
    const question=q();
    if(!Number.isInteger(index)||index<0||index>=question.options.length)throw new Error('Invalid answer option');
    s.selected=question.options[index];s.status=s.selected===question.answers[0]?'correct':'incorrect';s.resolved=true;
    s.results.push({question,status:s.status,firstTry:s.status==='correct'});
    renderExercise('next');
  }
  function submitAnswer(input) {
    const s=state.session;
    if(state.mode!=='practice'||s.resolved)return;
    if(typeof input!=='string')throw new Error('Answer must be text');
    s.input=input;
    let status=D.assess(input,q().answers);
    if(q().latinOnly&&/[А-Яа-яЂђЋћЈјЉљЊњЏџ]/.test(input))status='script';
    s.status=status;
    if(status==='correct'){s.resolved=true;s.results.push({question:q(),status,firstTry:s.attempts===0&&!s.hinted});}
    if(status!=='empty')s.attempts++;
    renderExercise(status==='correct'?'next':'input');
    return {status,resolved:s.resolved};
  }
  function showAnswer() {
    const s=state.session;if(state.mode!=='practice'||s.resolved)return;
    s.status='revealed';s.resolved=true;s.results.push({question:q(),status:'revealed',firstTry:false});renderExercise('next');
  }
  function nextQuestion() {
    const s=state.session;if(!s?.resolved)return;
    s.index++;s.selected=null;s.status=null;s.input='';s.attempts=0;s.hinted=false;s.showHint=false;s.resolved=false;
    renderExercise();
    if(s.index<s.questions.length){const target=state.mode==='practice'?$('answer-input'):document.querySelector('[data-option]');target?.focus();}else{document.querySelector('[data-action="restart"]')?.focus();}
  }
  function renderCompletion() {
    const s=state.session,score=s.results.filter(r=>r.firstTry).length,review=s.results.filter(r=>!r.firstTry);
    if(!s.saved){
      if(s.mixed){for(const l of activeLessons()){const rows=s.results.filter(r=>r.question.topic===l.id);if(rows.length)recordProgress(l.id,state.mode,rows.filter(r=>r.firstTry).length,rows.length);}}
      else recordProgress(state.lesson,state.mode,score,s.questions.length);
      s.saved=true;
    }
    const reviewHTML=review.length?`<section class="review-list" aria-labelledby="review-heading"><h3 id="review-heading">Keep these close</h3><ul class="review-items">${review.map(r=>`<li class="review-row"><p class="review-question">${escape(promptText(r.question))}</p><div class="review-answer"><span class="review-answer-label">Correct answer</span><strong lang="${r.question.optionsScript==='english'?'en':'sr'}">${escape(displayAnswer(r.question,r.question.answers[0]))}</strong></div></li>`).join('')}</ul></section>`:'';
    $('mode-content').innerHTML=`<div class="exercise-shell completion"><div class="finish-mark" aria-hidden="true">✓</div><div class="eyebrow">${s.mixed?'DAILY MIX COMPLETE':state.mode==='quiz'?'QUIZ COMPLETE':'PRACTICE COMPLETE'}</div><h2>${score===s.questions.length?'You’ve got this set.':'A little better than before.'}</h2><div class="score">${score}<span style="font-size:1.5rem;color:#7786a3"> / ${s.questions.length}</span></div><p>${state.mode==='quiz'?'Correct answers.':'Correct on the first try, without hints.'} ${review.length?'Review the answers below, then try again whenever you like.':'Try another lesson, or come back tomorrow for a little more.'}</p><div class="completion-buttons"><button type="button" class="primary-button" data-action="restart">Try a fresh round</button><button type="button" class="small-button" data-mode="learn">Back to reference cards</button></div>${reviewHTML}</div>`;
  }
  function selectCard(index) { if(!Number.isInteger(index)||index<0||index>=cards().length)throw new Error('Invalid card');state.selected=index;state.revealed=false;renderLearn(); }
  function doAction(action) {
    if(action==='open-test'){setMode('test');return;}
    if(action==='reveal'){state.revealed=!state.revealed;renderLearn();document.querySelector('[data-action="reveal"]')?.focus();}
    if(action==='next-card'||action==='previous-card'){selectCard((state.selected+(action==='next-card'?1:-1)+cards().length)%cards().length);document.querySelector(`[data-action="${action}"]`)?.focus();}
    if(action==='next-question')nextQuestion();
    if(action==='show-answer')showAnswer();
    if(action==='hint'){const s=state.session;if(s.resolved)return;s.showHint=!s.showHint;if(s.showHint)s.hinted=true;renderExercise();document.querySelector('[data-action="hint"]')?.focus();}
    if(action==='restart'){startSession(state.session.mixed);renderExercise();}
    if(action==='daily-mix')setMode('practice',true);
  }
  document.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b||b.disabled)return;
    if(b.dataset.lesson){setLesson(b.dataset.lesson);document.querySelector(`[data-lesson="${b.dataset.lesson}"]`)?.focus();}
    else if(b.dataset.level){setLevel(b.dataset.level);document.querySelector(`[data-level="${b.dataset.level}"]`)?.focus();}
    else if(b.dataset.script){setScript(b.dataset.script);document.querySelector(`[data-script="${b.dataset.script}"]`)?.focus();}
    else if(b.dataset.mode){setMode(b.dataset.mode);$('tab-'+b.dataset.mode)?.focus();}
    else if(b.dataset.card!==undefined){selectCard(Number(b.dataset.card));document.querySelector(`[data-card="${b.dataset.card}"]`)?.focus();}
    else if(b.dataset.option!==undefined)chooseOption(Number(b.dataset.option));
    else if(b.dataset.character){const input=$('answer-input');if(!input||input.disabled)return;const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;input.value=input.value.slice(0,start)+b.dataset.character+input.value.slice(end);state.session.input=input.value;input.focus();input.setSelectionRange(start+b.dataset.character.length,start+b.dataset.character.length);}
    else if(b.dataset.action)doAction(b.dataset.action);
  });
  document.addEventListener('input',event=>{if(event.target.id==='answer-input')state.session.input=event.target.value;});
  document.addEventListener('submit',event=>{if(event.target.id==='practice-form'){event.preventDefault();submitAnswer($('answer-input').value);}});
  document.querySelector('.mode-nav').addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const modes=availableModes();let index=modes.indexOf(state.mode);
    index=event.key==='Home'?0:event.key==='End'?modes.length-1:(index+(event.key==='ArrowRight'?1:-1)+modes.length)%modes.length;
    setMode(modes[index]);$('tab-'+modes[index]).focus();
  });
  document.querySelector('.brand').addEventListener('click',event=>{event.preventDefault();if(window.SerbianTest?.isRunning())return;state.mode='learn';setLesson(activeLessons()[0].id);});
  const daily=document.querySelector('.daily-note');
  daily.insertAdjacentHTML('beforeend','<button type="button" class="small-button" data-action="daily-mix" style="margin-top:17px;width:100%">Practise a daily mix</button>');
  document.querySelector('.topbar').insertAdjacentHTML('beforeend','<button type="button" class="small-button mobile-mix" data-action="daily-mix">Daily mix</button>');
  render();
  // The same actions power both the interface and optional browser agent tools.
  const publicAPI={
    readState(){
      const s=state.session,exercising=state.mode==='quiz'||state.mode==='practice';
      if(state.mode==='test')return {level:state.level,lesson:null,mode:'test',script:state.script,card:null,revealed:false,question:null,test:window.SerbianTest?.readState(),completed:!!window.SerbianTest?.isComplete()};
      return {level:state.level,lesson:state.lesson,mode:state.mode,script:state.script,card:state.mode==='learn'?cards()[state.selected].id:null,revealed:state.revealed,question:s&&exercising&&s.index<s.questions.length?{id:q().id,topic:q().topic,category:q().category,optionsScript:q().optionsScript,prompt:promptText(q()),index:s.index,total:s.questions.length,resolved:s.resolved}:null,completed:exercising&&!!s&&s.index>=s.questions.length};
    },
    setLesson,setMode,setScript,setLevel,selectCard,submitAnswer,chooseOption,nextQuestion,doAction,render,recordProgress
  };
  window.SerbianPractice=publicAPI;
  const context=document.modelContext;
  if(context?.registerTool){const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
    const definitions=[
      {name:'read_serbian_practice',description:'Read the current Serbian lesson and practice state without changing it.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(input){if(!input||Object.keys(input).length)throw new Error('No input fields expected');return publicAPI.readState();}},
      {name:'start_serbian_lesson',description:'Open a Serbian lesson in reference, quiz or typing mode. Starting a quiz or practice resets the current round.',inputSchema:{type:'object',properties:{lesson:{type:'string',enum:D.lessons.map(l=>l.id)},mode:{type:'string',enum:['learn','quiz','practice']}},required:['lesson','mode'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(window.SerbianTest?.isRunning())throw new Error('Finish the active test before opening a lesson');if(!input||!D.lessons.some(l=>l.id===input.lesson)||!['learn','quiz','practice'].includes(input.mode)||Object.keys(input).some(k=>!['lesson','mode'].includes(k)))throw new Error('Choose a valid lesson and mode');state.mode='learn';setLesson(input.lesson);setMode(input.mode);return publicAPI.readState();}},
      {name:'check_serbian_practice_answer',description:'Submit a typed answer to the current typing question and return immediate feedback. Does not advance to the next question.',inputSchema:{type:'object',properties:{answer:{type:'string'}},required:['answer'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input.answer!=='string'||Object.keys(input).some(k=>k!=='answer'))throw new Error('Provide answer text');if(state.mode!=='practice'||!state.session||state.session.index>=state.session.questions.length||state.session.resolved)throw new Error('Open an unanswered typing question first');return submitAnswer(input.answer);}}
    ];
    definitions.forEach(tool=>{try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}});
  }
})();
