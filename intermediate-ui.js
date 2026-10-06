(function () {
  'use strict';
  const D=window.Serbian, $=id=>document.getElementById(id);
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle=items=>{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  let activeLesson=null, script='latin', round=null, talk=null, translations=false;
  const decks=new Map();
  const sr=value=>script==='cyrillic'?D.cyrillic(value):value;
  const lang=()=>script==='cyrillic'?'sr-Cyrl':'sr-Latn';
  const app=()=>window.SerbianPractice;
  const rerender=()=>app().render();
  function reset(){round=null;talk=null;}
  function translationControl(){return `<button type="button" class="small-button translation-toggle" data-course-action="translations" aria-pressed="${translations}">${translations?'Hide':'Show'} English translations</button>`;}
  function renderLearn(lesson,state){
    activeLesson=lesson;script=state.script;
    const card=lesson.cards[state.selected];
    $('mode-content').innerHTML=`<div class="intermediate-intro"><p>Answer a question, add a detail, then try asking something back.</p>${translationControl()}</div><div class="reference-layout exchange-layout"><div class="catalogue"><div class="section-label"><strong>Choose an exchange</strong><span>${lesson.cards.length} examples</span></div><div class="word-grid phrases">${lesson.cards.map((c,i)=>`<button type="button" class="word-tile" data-card="${i}" aria-pressed="${i===state.selected}"><span lang="${lang()}">${escape(sr(c.label))}</span>${translations?`<small>${escape(c.english)}</small>`:''}</button>`).join('')}</div><details class="pattern-notes"><summary>Useful patterns</summary>${lesson.patterns.map(([s,e])=>`<p><strong lang="${lang()}">${escape(sr(s))}</strong><br>${escape(e)}</p>`).join('')}</details></div><article class="flashcard exchange-card"><div class="card-top"><span class="card-tag">QUESTION → REPLY</span><span>${state.selected+1} / ${lesson.cards.length}</span></div><div class="card-face"><span class="question-label">Someone asks</span><h2 lang="${lang()}">${escape(sr(card.latin))}</h2>${translations?`<p class="exchange-meaning">${escape(card.english)}</p>`:''}</div><div class="card-details"><div aria-live="polite">${state.revealed?`<div class="model-reply"><span class="question-label">One useful reply</span><strong lang="${lang()}">${escape(sr(card.reply))}</strong>${translations?`<p>${escape(card.replyEnglish)}</p>`:''}<p class="sound-note">${escape(card.note)}</p></div><button type="button" class="small-button" data-action="reveal">Hide model reply</button>`:`<p class="sound-note">Try answering out loud before revealing a model reply.</p><button type="button" class="reveal-button" data-action="reveal">Reveal a model reply</button>`}</div><div class="card-actions"><button type="button" class="small-button" data-action="previous-card">Previous</button><span>Say both parts out loud</span><button type="button" class="small-button" data-action="next-card">Next</button></div></div></article></div>`;
  }
  function newRound(){
    if(!decks.has(activeLesson.id))decks.set(activeLesson.id,D.createQuestionDeck(D.builders[activeLesson.id]));
    round={questions:decks.get(activeLesson.id).draw(5).map(q=>({...q,tiles:shuffle(q.words.map((word,id)=>({word,id})))})),index:0,chosen:[],status:null,resolved:false,attempts:0,hinted:false,showHint:false,results:[],saved:false};
  }
  function feedback(status,answer,note){
    if(!status)return '<div id="course-feedback" role="status" aria-live="polite"></div>';
    const title=status==='correct'?'Correct. Say it out loud.':status==='empty'?'Give it a try.':status==='accent'?'Almost. Check the Serbian letters.':status==='revealed'?'Here is a model reply.':'Try this pattern again.';
    const detail=status==='correct'||status==='revealed'?`<strong lang="${lang()}">${escape(sr(answer))}</strong><p>${escape(note)}</p>`:status==='empty'?'Add an answer before checking.':status==='accent'?'Check č, ć, š, ž and đ, then try again.':escape(note);
    return `<div id="course-feedback" class="feedback ${status==='correct'?'correct':'incorrect'}" role="status" aria-live="polite"><strong>${title}</strong><div>${detail}</div></div>`;
  }
  function saveCompletion(session,mode){
    if(session.saved)return;
    app().recordProgress(activeLesson.id,mode,session.results.filter(r=>r.firstTry).length,session.results.length);
    session.saved=true;
  }
  function completion(session,label,mode){
    saveCompletion(session,mode);
    const score=session.results.filter(r=>r.firstTry).length;
    return `<div class="exercise-shell completion"><div class="finish-mark" aria-hidden="true">✓</div><div class="eyebrow">${label} COMPLETE</div><h2>A little more confident.</h2><div class="score">${score}<span class="score-total"> / ${session.results.length}</span></div><p>Correct on the first try, without hints. Read your model replies aloud once more.</p><div class="completion-buttons"><button type="button" class="primary-button" data-course-action="${mode==='build'?'fresh-build':'talk-list'}">${mode==='build'?'Build a fresh set':'Choose a conversation'}</button><button type="button" class="small-button" data-mode="learn">Back to examples</button></div><section class="review-list"><h3>Model replies</h3><ul class="review-items">${session.results.map(r=>`<li class="review-row"><p class="review-question">${escape(r.meaning)}</p><div class="review-answer"><span class="review-answer-label">One model answer</span><strong lang="${lang()}">${escape(sr(r.answer))}</strong></div></li>`).join('')}</ul></section></div>`;
  }
  function renderBuild(){
    if(!round)newRound();
    if(round.index===round.questions.length){$('mode-content').innerHTML=completion(round,'SENTENCE BUILDING','build');return;}
    const q=round.questions[round.index],chosen=round.chosen.map(id=>q.tiles.find(t=>t.id===id));
    $('mode-content').innerHTML=`<div class="exercise-shell"><div class="exercise-meta"><span>Sentence builder</span><span>${round.index+1} / ${round.questions.length}</span></div><p class="question-label">Build this meaning</p><h2>${escape(q.prompt)}</h2><p class="input-note">Use all the words. More than one taught word order may work.</p><div class="chosen-words" aria-label="Your sentence">${chosen.length?chosen.map(t=>`<button type="button" class="word-chip" data-course-remove="${t.id}" ${round.resolved?'disabled':''} aria-label="Remove ${escape(sr(t.word))}"><span lang="${lang()}">${escape(sr(t.word))}</span></button>`).join(''):'<span>Choose words below to build your sentence.</span>'}</div><div class="word-bank" aria-label="Available words">${q.tiles.map(t=>`<button type="button" class="word-chip" data-course-word="${t.id}" ${round.resolved||round.chosen.includes(t.id)?'disabled':''}><span lang="${lang()}">${escape(sr(t.word))}</span></button>`).join('')}</div><div class="practice-tools"><button type="button" class="primary-button" data-course-action="check-build" ${round.resolved?'disabled':''}>Check sentence</button><button type="button" class="small-button" data-course-action="clear-build" ${round.resolved?'disabled':''}>Start sentence again</button><button type="button" class="small-button" data-course-action="build-hint" ${round.resolved?'disabled':''}>${round.showHint?'Hide':'Show'} hint</button><button type="button" class="small-button" data-course-action="reveal-build" ${round.resolved?'disabled':''}>Reveal answer</button></div>${round.showHint?`<p class="hint">${escape(q.hint)}</p>`:''}${feedback(round.status,q.answers[0],q.hint)}<div class="exercise-footer"><span>No timer. Click a chosen word to remove it.</span><button type="button" class="primary-button" data-course-action="next-build" ${round.resolved?'':'disabled'}>${round.index===round.questions.length-1?'See results':'Next sentence'}</button></div></div>`;
  }
  function renderTalk(){
    const scenes=D.dialogues[activeLesson.id];
    if(!talk){
      $('mode-content').innerHTML=`<div class="exercise-shell conversation-list"><div class="eyebrow">SHORT GUIDED CONVERSATIONS</div><h2>Read both parts. Then try your replies.</h2><p class="input-note">Each scene has three short replies. The English instruction gives you a specific meaning to practise.</p><div class="scene-list">${scenes.map((s,i)=>`<button type="button" class="scene-button" data-course-scene="${i}"><strong>${escape(s.title)}</strong><span>${escape(s.setting)}</span><small>Read a model · practise 3 replies</small></button>`).join('')}</div></div>`;return;
    }
    if(talk.practice&&talk.index===talk.scene.steps.length){$('mode-content').innerHTML=completion(talk,'CONVERSATION','talk');document.querySelector('.completion>p').insertAdjacentHTML('afterend',`<div class="closing-reply"><span class="chat-speaker">Partner</span><p lang="${lang()}">${escape(sr(talk.scene.closing))}</p>${translations?`<small>${escape(talk.scene.closingEnglish)}</small>`:''}</div>`);return;}
    const s=talk.scene;
    const bubble=(text,english,you=false)=>`<div class="chat-bubble ${you?'you':''}"><span class="chat-speaker">${you?'You':'Partner'}</span><p lang="${lang()}">${escape(sr(text))}</p>${translations?`<small>${escape(english)}</small>`:''}</div>`;
    const transcript=talk.practice?s.steps.slice(0,talk.index).map((r,i)=>bubble(r.question,r.questionEnglish)+bubble(talk.results[i].selected||r.reply,r.english,true)).join(''):s.steps.map(r=>bubble(r.question,r.questionEnglish)+bubble(r.reply,r.english,true)).join('')+bubble(s.closing,s.closingEnglish);
    const r=s.steps[talk.index];
    $('mode-content').innerHTML=`<div class="exercise-shell conversation-shell"><div class="conversation-toolbar"><button type="button" class="text-button" data-course-action="talk-list">← Choose a scene</button>${translationControl()}</div><div class="eyebrow">${talk.practice?'YOUR TURN':'MODEL CONVERSATION'}</div><h2>${escape(s.title)}</h2><p class="input-note">${escape(s.setting)}</p><div class="chat-transcript">${transcript}${talk.practice?bubble(r.question,r.questionEnglish):''}</div>${talk.practice?`<div class="reply-task"><span class="question-label">Reply ${talk.index+1} of ${s.steps.length}</span><p><strong>Say:</strong> ${escape(r.english)}</p><form id="course-reply-form"><label class="input-label" for="course-answer">Your reply in Latin or Cyrillic</label><input id="course-answer" class="answer-input" autocomplete="off" autocapitalize="none" spellcheck="false" value="${escape(talk.input)}" ${talk.resolved?'disabled':''} aria-describedby="course-feedback"><div class="character-keys">${['č','ć','š','ž','đ'].map(c=>`<button type="button" data-course-character="${c}" ${talk.resolved?'disabled':''}>${c}</button>`).join('')}</div><div class="practice-tools"><button type="submit" class="primary-button" ${talk.resolved?'disabled':''}>Check reply</button><button type="button" class="small-button" data-course-action="talk-hint" ${talk.resolved?'disabled':''}>${talk.showHint?'Hide':'Show'} hint</button><button type="button" class="small-button" data-course-action="reveal-talk" ${talk.resolved?'disabled':''}>Reveal model reply</button></div></form>${talk.showHint?`<p class="hint">${escape(r.note)}</p>`:''}${feedback(talk.status,r.reply,r.note)}<div class="exercise-footer"><span>Case, quotes and punctuation do not matter. Serbian letter marks do.</span><button type="button" class="primary-button" data-course-action="next-talk" ${talk.resolved?'':'disabled'}>${talk.index===s.steps.length-1?'Finish conversation':'Next reply'}</button></div></div>`:`<div class="exercise-footer"><span>Say the partner’s question and your reply aloud.</span><button type="button" class="primary-button" data-course-action="practise-talk">Practise these replies</button></div>`}</div>`;
  }
  function checkTalk(){
    if(!talk?.practice||talk.resolved)return;
    const r=talk.scene.steps[talk.index];
    talk.status=D.assess(talk.input,[r.reply,...r.alternatives]);
    if(talk.status==='correct'){
      talk.resolved=true;talk.results.push({answer:r.reply,selected:talk.input,meaning:r.english,firstTry:talk.attempts===0&&!talk.hinted});
    }
    if(talk.status!=='empty')talk.attempts++;
    rerender();
    (talk.resolved?document.querySelector('[data-course-action="next-talk"]'):$('course-answer'))?.focus();
  }
  function action(name){
    if(name==='translations')translations=!translations;
    if(name==='fresh-build')newRound();
    if(name==='clear-build'&&round&&!round.resolved){round.chosen=[];round.status=null;}
    if(name==='build-hint'&&round&&!round.resolved){round.showHint=!round.showHint;if(round.showHint)round.hinted=true;}
    if(name==='check-build'&&round&&!round.resolved){
      const q=round.questions[round.index],text=round.chosen.map(id=>q.tiles.find(t=>t.id===id).word).join(' ');
      round.status=D.assess(text,q.answers);
      if(round.status==='correct'){round.resolved=true;round.results.push({answer:q.answers[0],meaning:q.prompt,firstTry:round.attempts===0&&!round.hinted});}
      if(round.status!=='empty')round.attempts++;
    }
    if(name==='reveal-build'&&round&&!round.resolved){const q=round.questions[round.index];round.status='revealed';round.resolved=true;round.results.push({answer:q.answers[0],meaning:q.prompt,firstTry:false});}
    if(name==='next-build'&&round?.resolved){round.index++;round.chosen=[];round.status=null;round.resolved=false;round.attempts=0;round.hinted=false;round.showHint=false;}
    if(name==='talk-list')talk=null;
    if(name==='practise-talk'&&talk){talk.practice=true;talk.index=0;talk.results=[];talk.saved=false;talk.input='';talk.status=null;talk.resolved=false;talk.attempts=0;talk.hinted=false;talk.showHint=false;}
    if(name==='talk-hint'&&talk?.practice&&!talk.resolved){talk.showHint=!talk.showHint;if(talk.showHint)talk.hinted=true;}
    if(name==='reveal-talk'&&talk?.practice&&!talk.resolved){const r=talk.scene.steps[talk.index];talk.status='revealed';talk.resolved=true;talk.results.push({answer:r.reply,selected:r.reply,meaning:r.english,firstTry:false});}
    if(name==='next-talk'&&talk?.resolved){talk.index++;talk.input='';talk.status=null;talk.resolved=false;talk.attempts=0;talk.hinted=false;talk.showHint=false;}
    rerender();
    if(name==='next-talk')$('course-answer')?.focus();
    else if(name==='next-build')document.querySelector('[data-course-word]:not(:disabled)')?.focus();
    else document.querySelector(`[data-course-action="${name}"]`)?.focus();
  }
  document.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b||b.disabled||app()?.readState().level!=='intermediate')return;
    if(b.dataset.courseAction){action(b.dataset.courseAction);return;}
    if(b.dataset.courseScene!==undefined){const s=D.dialogues[activeLesson.id][Number(b.dataset.courseScene)];if(!s)return;talk={scene:s,practice:false,index:0};rerender();document.querySelector('[data-course-action="practise-talk"]')?.focus();return;}
    if(b.dataset.courseWord!==undefined&&round&&!round.resolved){const id=Number(b.dataset.courseWord);if(!round.chosen.includes(id))round.chosen.push(id);round.status=null;rerender();document.querySelector('[data-course-word]:not(:disabled)')?.focus();}
    if(b.dataset.courseRemove!==undefined&&round&&!round.resolved){round.chosen=round.chosen.filter(id=>id!==Number(b.dataset.courseRemove));round.status=null;rerender();document.querySelector('[data-course-word]:not(:disabled)')?.focus();}
    if(b.dataset.courseCharacter&&talk?.practice&&!talk.resolved){const input=$('course-answer'),start=input.selectionStart??input.value.length,end=input.selectionEnd??start;input.value=input.value.slice(0,start)+b.dataset.courseCharacter+input.value.slice(end);talk.input=input.value;input.focus();input.setSelectionRange(start+1,start+1);}
  });
  document.addEventListener('input',event=>{if(event.target.id==='course-answer'&&talk?.practice)talk.input=event.target.value;});
  document.addEventListener('submit',event=>{if(event.target.id==='course-reply-form'){event.preventDefault();talk.input=$('course-answer').value;checkTalk();}});
  window.SerbianCourseUI={reset,renderLearn,render(mode,lesson,selectedScript){activeLesson=lesson;script=selectedScript;if(mode==='build')renderBuild();else if(mode==='talk')renderTalk();}};
})();
