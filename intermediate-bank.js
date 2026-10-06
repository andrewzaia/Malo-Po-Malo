(function () {
  'use strict';
  const D = window.Serbian;
  // Reviewed words and complete sentence frames, rather than arbitrary word swaps.
  // More practice at the existing level: no new grammar syllabus or giant card list.
  const banks = Object.fromEntries(D.getLessons('intermediate').map(l => [l.id, []]));
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const unique = values => [...new Map(values.map(s => [D.normalise(s), s])).values()];
  function add(id, question, questionEnglish, reply, english, note, alternatives = [], focus = null) {
    banks[id].push({question, questionEnglish, reply, english, note, alternatives, focus});
  }
  // Forms are explicit, including irregular verbs. Each item has I / you / he-she / we.
  const actions = [
    {v:['radim','radiš','radi','radimo'],object:'',en:['work','work','works','work'],past:['radio','radila'],pastEnglish:'worked',inf:'raditi'},
    {v:['učim','učiš','uči','učimo'],object:'srpski',en:['study Serbian','study Serbian','studies Serbian','study Serbian'],past:['učio','učila'],pastEnglish:'studied Serbian',inf:'učiti srpski'},
    {v:['učim','učiš','uči','učimo'],object:'engleski',en:['study English','study English','studies English','study English'],past:['učio','učila'],pastEnglish:'studied English',inf:'učiti engleski'},
    {v:['čitam','čitaš','čita','čitamo'],object:'knjigu',en:['read a book','read a book','reads a book','read a book'],past:['čitao','čitala'],pastEnglish:'read a book',inf:'čitati knjigu'},
    {v:['čitam','čitaš','čita','čitamo'],object:'novine',en:['read the newspaper','read the newspaper','reads the newspaper','read the newspaper'],past:['čitao','čitala'],pastEnglish:'read the newspaper',inf:'čitati novine'},
    {v:['gledam','gledaš','gleda','gledamo'],object:'film',en:['watch a film','watch a film','watches a film','watch a film'],past:['gledao','gledala'],pastEnglish:'watched a film',inf:'gledati film'},
    {v:['gledam','gledaš','gleda','gledamo'],object:'televiziju',en:['watch television','watch television','watches television','watch television'],past:['gledao','gledala'],pastEnglish:'watched television',inf:'gledati televiziju'},
    {v:['slušam','slušaš','sluša','slušamo'],object:'muziku',en:['listen to music','listen to music','listens to music','listen to music'],past:['slušao','slušala'],pastEnglish:'listened to music',inf:'slušati muziku'},
    {v:['kuvam','kuvaš','kuva','kuvamo'],object:'ručak',en:['cook lunch','cook lunch','cooks lunch','cook lunch'],past:['kuvao','kuvala'],pastEnglish:'cooked lunch',inf:'kuvati ručak'},
    {v:['kuvam','kuvaš','kuva','kuvamo'],object:'večeru',en:['cook dinner','cook dinner','cooks dinner','cook dinner'],past:['kuvao','kuvala'],pastEnglish:'cooked dinner',inf:'kuvati večeru'},
    {v:['pijem','piješ','pije','pijemo'],object:'kafu',en:['drink coffee','drink coffee','drinks coffee','drink coffee'],past:['pio','pila'],pastEnglish:'drank coffee',inf:'piti kafu'},
    {v:['pijem','piješ','pije','pijemo'],object:'čaj',en:['drink tea','drink tea','drinks tea','drink tea'],past:['pio','pila'],pastEnglish:'drank tea',inf:'piti čaj'},
    {v:['jedem','jedeš','jede','jedemo'],object:'doručak',en:['eat breakfast','eat breakfast','eats breakfast','eat breakfast'],past:['jeo','jela'],pastEnglish:'ate breakfast',inf:'jesti doručak'},
    {v:['šetam','šetaš','šeta','šetamo'],object:'',en:['go for a walk','go for a walk','goes for a walk','go for a walk'],past:['šetao','šetala'],pastEnglish:'went for a walk',inf:'šetati'},
    {v:['odmaram','odmaraš','odmara','odmaramo'],object:'',en:['rest','rest','rests','rest'],past:['odmarao','odmarala'],pastEnglish:'rested',inf:'odmarati'}
  ];
  const phrase = (a, person) => a.v[person] + (a.object ? ' ' + a.object : '');
  const people = [
    {sr:'',en:'I',v:0,ask:'radiš',askEn:'do you',be:'sam',negative:'nisam',go:'idem'},
    {sr:'Mi',en:'We',v:3,ask:'radite',askEn:'do you (plural)',be:'smo',negative:'nismo',go:'idemo'},
    {sr:'Ana',en:'Ana',v:2,ask:'radi Ana',askEn:'does Ana',be:'je',negative:'nije',go:'ide'},
    {sr:'Marko',en:'Marko',v:2,ask:'radi Marko',askEn:'does Marko',be:'je',negative:'nije',go:'ide'}
  ];
  const times = [
    ['ujutru','in the morning'],['uveče','in the evening'],['posle posla','after work'],
    ['svaki dan','every day'],['subotom','on Saturdays'],['nedeljom','on Sundays']
  ];
  const places = [
    ['u parku','u park','in the park','to the park'],
    ['u školi','u školu','at school','to school'],
    ['u prodavnici','u prodavnicu','in the shop','to the shop'],
    ['u biblioteci','u biblioteku','in the library','to the library'],
    ['u banci','u banku','in the bank','to the bank'],
    ['u muzeju','u muzej','in the museum','to the museum'],
    ['u bioskopu','u bioskop','at the cinema','to the cinema'],
    ['u restoranu','u restoran','in the restaurant','to the restaurant'],
    ['u supermarketu','u supermarket','in the supermarket','to the supermarket'],
    ['u centru','u centar','in the centre','to the centre'],
    ['na poslu','na posao','at work','to work'],
    ['kod kuće','kući','at home','home']
  ];

  // 1. Introductions, family, languages, age and questions about familiar people.
  const countries = [['Australije','Australia'],['Srbije','Serbia'],['Engleske','England'],['Francuske','France'],['Nemačke','Germany'],['Italije','Italy'],['Kanade','Canada'],['Grčke','Greece']];
  const cities = [['Sidneju','Sydney'],['Beogradu','Belgrade'],['Novom Sadu','Novi Sad'],['Nišu','Niš'],['Londonu','London'],['Parizu','Paris'],['Rimu','Rome'],['Berlinu','Berlin']];
  for (const [from,en] of countries) for (const p of people) {
    const q = p.v===0?'Odakle si?':p.v===3?'Odakle ste?':`Odakle je ${p.sr}?`;
    const qe = p.v===0?'Where are you from?':p.v===3?'Where are you from? (plural)':`Where is ${p.en} from?`;
    const r = p.sr?`${p.sr} ${p.be} iz ${from}.`:`Iz ${from} sam.`;
    add('i-questions',q,qe,r,`${p.en} ${p.v===0?'am':p.v===3?'are':'is'} from ${en}.`,'Iz introduces where someone is from. Learn this country form as a phrase.',p.v===0?[`Ja sam iz ${from}.`]:[],[p.be,['sam','smo','je','su']]);
  }
  for (const [city,en] of cities) for (const p of people) {
    const v = ['živim','živiš','živi','živimo'];
    const q = p.v===0?'Gde živiš?':p.v===3?'Gde živite?':`Gde živi ${p.sr}?`;
    const qe = p.v===0?'Where do you live?':p.v===3?'Where do you live? (plural)':`Where does ${p.en} live?`;
    const r = `${p.sr?p.sr+' ':''}${p.sr?v[p.v]:cap(v[p.v])} u ${city}.`;
    add('i-questions',q,qe,r,`${p.en} ${p.v===2?'lives':'live'} in ${en}.`,'Gde asks where. U + this city form describes where someone lives.',p.v===0?[`Ja živim u ${city}.`,`U ${city} živim.`]:[],[v[p.v],v]);
  }
  const languages = [['srpski','Serbian'],['engleski','English'],['francuski','French'],['nemački','German'],['italijanski','Italian'],['grčki','Greek']];
  for (const [language,en] of languages) for (const p of people) for (const yes of [true,false]) {
    const v=['govorim','govoriš','govori','govorimo'];
    const ask=p.v===0?`govoriš ${language}`:p.v===3?`govorite ${language}`:`${p.sr} govori ${language}`;
    const q=`Da li ${ask}?`,qe=`${p.v===2?'Does '+p.en:'Do you'+(p.v===3?' (plural)':'')} speak ${en}?`;
    const subject=p.sr==='Mi'?'mi':p.sr;
    const reply=`${yes?'Da':'Ne'}, ${subject?subject+' ':''}${yes?'':'ne '}${v[p.v]} ${language}.`;
    add('i-questions',q,qe,reply,`${yes?'Yes':'No'}, ${p.en==='I'?'I':p.en==='We'?'we':p.en} ${yes?(p.v===2?'speaks':'speak'):(p.v===2?'does not speak':'do not speak')} ${en}.`,'Match the speaker: govorim (I), govori (he/she), govorimo (we). Ne stays separate.',[],[v[p.v],v]);
  }
  const relatives = [
    ['brat','brata','brother','tvoj','Moj'],['sestra','sestru','sister','tvoja','Moja'],
    ['majka','majku','mother','tvoja','Moja'],['otac','oca','father','tvoj','Moj'],
    ['prijatelj','prijatelja','male friend','tvoj','Moj'],['prijateljica','prijateljicu','female friend','tvoja','Moja']
  ];
  for (const [noun,object,en,your,my] of relatives) {
    const names = your==='tvoj'?['Marko','Nikola','Petar','Milan']:['Ana','Jelena','Marija','Milica'];
    for (const name of names) add('i-questions',`Kako se zove ${your} ${noun}?`,`What is your ${en}'s name?`,`${my} ${noun} se zove ${name}.`,`My ${en}'s name is ${name}.`,'Use se zove with one other person. Moj/tvoj and moja/tvoja match the noun.',[`${my} ${noun} zove se ${name}.`],['zove',['zovem','zoveš','zove','zovemo']]);
    // Brother, sister and friend are natural choices for a yes/no possession question.
    if(!['majka','otac'].includes(noun)) for(const yes of [true,false]) add('i-questions',`Da li imaš ${object}?`,`Do you have a ${en}?`,`${yes?'Da, imam':'Ne, nemam'} ${object}.`,`${yes?'Yes, I have':'No, I do not have'} a ${en}.`,'Imam means I have; its negative is nemam, written as one word.',[],[yes?'imam':'nemam',['imam','imaš','nemam','nemaš']]);
    for(const [city,enCity] of cities.slice(0,4)) add('i-questions',`Gde živi ${your} ${noun}?`,`Where does your ${en} live?`,`${my} ${noun} živi u ${city}.`,`My ${en} lives in ${enCity}.`,'Živi is the he/she form. Learn the city phrase together.',[],['živi',['živim','živiš','živi','živimo']]);
  }
  for(const age of [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]) {
    const word=D.numberWord(age).replace(/jedan$/,'jednu').replace(/dva$/,'dve'),ending=age%10===1&&age!==11?'godinu':[2,3,4].includes(age%10)&&!(age>=12&&age<=14)?'godine':'godina';
    for(const who of ['', 'Ana','Marko']) add('i-questions',who?`Koliko godina ima ${who}?`:'Koliko imaš godina?',who?`How old is ${who}?`:'How old are you?',`${who?who+' ima':'Imam'} ${word} ${ending}.`,`${who||'I'} ${who?'is':'am'} ${age} years old.`,'Age uses imati: imam (I have) or ima (he/she has). Learn the number and year ending together.',[],[who?'ima':'Imam',['imam','imaš','ima','imamo']]);
  }
  for(const p of people) for(const [loc,,en] of places.slice(0,6)) add('i-questions',p.v===0?'Gde si?':p.v===3?'Gde ste?':`Gde je ${p.sr}?`,p.v===0?'Where are you?':p.v===3?'Where are you? (plural)':`Where is ${p.en}?`,p.sr?`${p.sr} ${p.be} ${loc}.`:`${cap(loc)} sam.`,`${p.en} ${p.v===0?'am':p.v===3?'are':'is'} ${en}.`,'Use the location form for where someone is, rather than where they are going.',[],[p.be,['sam','smo','je','su']]);

  // 2. Everyday routines: subject agreement, time, negatives and two-step replies.
  for(const a of actions) for(const [time,enTime] of times) for(const p of people) {
    if(a.object==='doručak'&&['uveče','posle posla'].includes(time))continue;
    if(a.object==='večeru'&&time==='ujutru')continue;
    const q=`Šta ${p.ask} ${time}?`,qe=`What ${p.askEn} do ${enTime}?`;
    const r=`${p.sr?p.sr+' ':''}${p.sr?phrase(a,p.v):cap(phrase(a,p.v))} ${time}.`;
    add('i-routines',q,qe,r,`${p.en} ${a.en[p.v]} ${enTime}.`,'Use the present form for the subject. The time phrase adds one everyday detail.',p.v===0?[`${cap(time)} ${phrase(a,0)}.`,`Ja ${phrase(a,0)} ${time}.`]:[],[a.v[p.v],a.v]);
    if(p.v!==2) {
      const qv=p.v===0?a.v[1]:a.v[3].replace(/mo$/,'te');
      add('i-routines',`Da li ${qv}${a.object?' '+a.object:''} ${time}?`,`Do you${p.v===3?' (plural)':''} ${a.en[0]} ${enTime}?`,`Ne, ${p.sr?p.sr.toLowerCase()+' ':''}ne ${phrase(a,p.v)} ${time}.`,`No, ${p.v===3?'we':'I'} do not ${a.en[0]} ${enTime}.`,'Ne + the present form gives a negative answer. Keep the time detail.',[],[a.v[p.v],a.v]);
    }
  }
  const sequences = [[0,3],[1,5],[8,3],[9,7],[13,14],[2,6]];
  for(const [first,second] of sequences) for(const [time,enTime] of times) for(const p of people.slice(0,2)) {
    const a=actions[first],b=actions[second];
    add('i-routines',`Šta ${p.ask} ${time}?`,`What ${p.askEn} do ${enTime}?`,`${cap(time)} ${phrase(a,p.v)}, a onda ${phrase(b,p.v)}.`,`${p.en} ${a.en[p.v]} ${enTime}, and then ${p.en==='I'?'I':'we'} ${b.en[p.v]}.`,'A onda means and then. Both verbs have the same subject.',[],[a.v[p.v],a.v]);
  }

  // 3. Paired location/destination forms, transport and short route instructions.
  const locationTimes=[['sada','now'],['danas','today'],['ujutru','in the morning'],['uveče','in the evening']];
  for(const [loc,dest,enLoc,enDest] of places) for(const [time,enTime] of locationTimes) for(const p of people) {
    const question=p.v===0?`Gde si ${time}?`:p.v===3?`Gde ste ${time}?`:`Gde je ${p.sr} ${time}?`;
    const questionEnglish=`Where ${p.v===2?'is '+p.en:'are you'+(p.v===3?' (plural)':'')} ${enTime}?`;
    const reply=p.sr?`${p.sr} ${p.be} ${loc} ${time}.`:`${cap(time)} sam ${loc}.`;
    add('i-places',question,questionEnglish,reply,`${p.en} ${p.v===0?'am':p.v===3?'are':'is'} ${enLoc} ${enTime}.`,'Location: '+loc+'. Destination: '+dest+'. These forms have different jobs.',p.v===0?[`${cap(loc)} sam ${time}.`,`Ja sam ${loc} ${time}.`]:[],[p.be,['sam','smo','je','su']]);
    add('i-places',p.v===0?`Kuda ideš ${time}?`:p.v===3?`Kuda idete ${time}?`:`Kuda ide ${p.sr} ${time}?`,`Where ${p.v===2?'is '+p.en:'are you'+(p.v===3?' (plural)':'')} going ${enTime}?`,`${p.sr?p.sr+' ':''}${p.sr?p.go:cap(p.go)} ${dest} ${time}.`,`${p.en} ${p.v===0?'am':p.v===3?'are':'is'} going ${enDest} ${enTime}.`,'Kuda asks about direction or destination. Use '+dest+' with going.',p.v===0?[`${cap(time)} idem ${dest}.`,`Ja idem ${dest} ${time}.`]:[],[p.go,['idem','ideš','ide','idemo']]);
  }
  const transport=[['autobusom','by bus'],['vozom','by train'],['tramvajem','by tram'],['autom','by car'],['peške','on foot']];
  for(const [loc,dest,,enDest] of places.filter(p=>!['u banci','u muzeju'].includes(p[0]))) for(const [method,enMethod] of transport) for(const p of people.slice(0,2)) add('i-places',p.v===0?`Kako ideš ${dest}?`:`Kako idete ${dest}?`,`How do you${p.v===3?' (plural)':''} go ${enDest}?`,`${p.v===3?'Idemo':'Idem'} ${dest} ${method}.`,`${p.en} go ${enDest} ${enMethod}.`,'Autobusom, vozom, tramvajem and autom describe transport. Peške means on foot.',[],[p.go,['idem','ideš','ide','idemo']]);
  const landmarks=[['stanica','station','stanice'],['banka','bank','banke'],['biblioteka','library','biblioteke'],['prodavnica','shop','prodavnice'],['muzej','museum','muzeja'],['restoran','restaurant','restorana'],['park','park','parka'],['supermarket','supermarket','supermarketa']];
  const directions=[['levo','on the left'],['desno','on the right'],['blizu','nearby'],['daleko','far away']];
  for(const [noun,en,genitive] of landmarks) {
    for(const [where,enWhere] of directions) add('i-places',`Gde je ${noun}?`,`Where is the ${en}?`,`${cap(noun)} je ${where}.`,`The ${en} is ${enWhere}.`,'Levo/desno give a side; blizu/daleko describe distance.');
    for(const [route,enRoute] of [['pravo, pa levo','straight ahead, then left'],['pravo, pa desno','straight ahead, then right'],['levo, pa pravo','left, then straight ahead'],['desno, pa pravo','right, then straight ahead']]) add('i-places',`Kako da dođem do ${genitive}?`,`How do I get to the ${en}?`,`Idite ${route}.`,`Go ${enRoute}.`,'Idite is a polite/plural instruction. Pa introduces the next direction.',[],['Idite',['Idem','Ideš','Idite','Idemo']]);
  }

  // 4. Café/shop requests: fixed object forms and natural choices of goods.
  const goods=[
    ['kafa','kafu','coffee'],['čaj','čaj','tea'],['voda','vodu','water'],['sok','sok','juice'],
    ['sendvič','sendvič','a sandwich'],['supa','supu','soup'],['salata','salatu','a salad'],
    ['hleb','hleb','bread'],['mleko','mleko','milk'],['sir','sir','cheese'],['šećer','šećer','sugar'],['kolač','kolač','a cake']
  ];
  const requestItems=[...goods.map(([,object,en])=>[object,en]),['račun','the bill'],['kesu','a bag'],['meni','the menu'],['kašiku','a spoon'],['viljušku','a fork'],['nož','a knife'],['salvetu','a napkin']];
  for(const [object,en] of requestItems) {
    for(const [frame,enFrame,note] of [
      [`Želim ${object}, molim.`,`I would like ${en}, please.`,'Želim is I want / I would like. The object form is already supplied.'],
      [`Mogu li da dobijem ${object}?`,`Can I have ${en}?`,'Mogu li da dobijem…? is a useful polite request to learn as a phrase.'],
      [`Možete li da mi donesete ${object}?`,`Could you bring me ${en}? (polite)`,'Možete li…? addresses the other person politely; mi means to me.']
    ]) add('i-requests','Šta želite?','What would you like?',frame,enFrame,note);
    for(const yes of [true,false]) add('i-requests',`Da li imate ${object}?`,`Do you have ${en}? (polite/plural)`,`${yes?'Da, imamo':'Ne, nemamo'} ${object}.`,`${yes?'Yes, we have':'No, we do not have'} ${en}.`,'A shop assistant can answer with imamo (we have) or nemamo (we do not have).',[],[yes?'imamo':'nemamo',['imamo','imate','nemamo','nemate']]);
  }
  for(const [noun,,en] of goods) for(const price of [50,60,70,80,90,100,120,150,200,300]) {
    const number=price<=100?D.numberWord(price):({120:'sto dvadeset',150:'sto pedeset',200:'dvesta',300:'trista'})[price];
    const enNoun=en.startsWith('a ')?en.slice(2):en;
    add('i-requests',`Koliko košta ${noun}?`,`How much does the ${enNoun} cost?`,`${cap(noun)} košta ${number} dinara.`,`The ${enNoun} costs ${price} dinars.`,'Koliko košta…? asks a price. These round prices use dinara.');
  }
  for(const [drink,enDrink] of [['kafu','coffee'],['čaj','tea']]) for(const [extra,enExtra] of [['sa mlekom','with milk'],['bez mleka','without milk'],['sa šećerom','with sugar'],['bez šećera','without sugar']]) {
    add('i-requests',`Kako želite ${drink}?`,`How would you like your ${enDrink}?`,`Želim ${drink} ${extra}, molim.`,`I would like ${enDrink} ${enExtra}, please.`,'Sa means with, and bez means without. Learn these ingredient forms together.');
  }
  const requestRows=[
    ['Kako želite da platite?','How would you like to pay?','Želim da platim gotovinom.','I would like to pay in cash.','Gotovinom means in cash.'],
    ['Kako želite da platite?','How would you like to pay?','Želim da platim karticom.','I would like to pay by card.','Karticom means by card.'],
    ['Mogu li da platim karticom?','Can I pay by card?','Da, možete da platite karticom.','Yes, you can pay by card.','Možete is the polite/plural form of can.'],
    ['Mogu li da platim karticom?','Can I pay by card?','Ne, samo gotovinom.','No, only in cash.','Samo means only.'],
    ['Još nešto?','Anything else?','Da, još jednu kafu, molim.','Yes, one more coffee, please.','Još jednu means one more for a feminine item.'],
    ['Još nešto?','Anything else?','Da, još jedan čaj, molim.','Yes, one more tea, please.','Još jedan matches masculine čaj.'],
    ['Za ovde ili za poneti?','For here or to take away?','Za poneti, molim.','To take away, please.','Za poneti is a fixed takeaway phrase.'],
    ['Za ovde ili za poneti?','For here or to take away?','Za ovde, molim.','For here, please.','Za ovde means for here.'],
    ['Da li želite kesu?','Would you like a bag?','Ne, hvala. Imam kesu.','No, thank you. I have a bag.','Imam means I have.'],
    ['Da li želite kesu?','Would you like a bag?','Da, jednu kesu, molim.','Yes, one bag, please.','Jednu kesu is the object phrase.'],
    ['Treba li Vam pomoć?','Do you need help? (polite)','Da, tražim biblioteku.','Yes, I am looking for the library.','Tražim means I am looking for.'],
    ['Treba li Vam pomoć?','Do you need help? (polite)','Ne, hvala. Samo gledam.','No, thank you. I am just looking.','Samo gledam is a useful shop reply.']
  ];
  requestRows.forEach(row=>add('i-requests',...row));

  // 5. Simple invitations, alternative days and familiar future-tense phrases.
  const planTimes=[['sutra','tomorrow'],['večeras','tonight'],['u ponedeljak','on Monday'],['u utorak','on Tuesday'],['u sredu','on Wednesday'],['u četvrtak','on Thursday'],['u petak','on Friday'],['u subotu','on Saturday'],['u nedelju','on Sunday'],['za vikend','at the weekend']];
  const invitations=[['na kafu','for coffee'],['na čaj','for tea'],['na ručak','for lunch'],['na večeru','for dinner'],['u park','to the park'],['u bioskop','to the cinema'],['u muzej','to the museum'],['u restoran','to the restaurant']];
  for(const [outing,enOuting] of invitations) for(const [time,enTime] of planTimes) {
    const q=`Hoćeš li ${outing} ${time}?`,qe=`Would you like to go ${enOuting} ${enTime}?`;
    add('i-plans',q,qe,`Da, možemo ${outing} ${time}.`,`Yes, we can go ${enOuting} ${enTime}.`,'Možemo means we can. Repeat the outing and day to confirm the plan.');
    add('i-plans',q,qe,`Ne mogu ${time}. Možemo neki drugi dan.`,`I cannot ${enTime}. We can go another day.`,'Ne mogu declines the proposed day. Neki drugi dan means another day.');
  }
  for(const [time,enTime] of planTimes) for(const [other,enOther] of planTimes) if(time!==other) add('i-plans',`Možeš li ${time}?`,`Can you ${enTime}?`,`Ne mogu ${time}, ali mogu ${other}.`,`I cannot ${enTime}, but I can ${enOther}.`,'Ali connects the unavailable day with a simple alternative.',[`${cap(time)} ne mogu, ali ${other} mogu.`]);
  for(const a of actions.filter(a=>a.object!=='doručak')) for(const [time,enTime] of planTimes) {
    if(a.object==='ručak'&&time==='večeras')continue;
    for(const p of people) {
      const future=p.v===0?'ću':p.v===3?'ćemo':'će';
      const q=p.v===0?`Šta ćeš da radiš ${time}?`:p.v===3?`Šta ćete da radite ${time}?`:`Šta će ${p.sr} da radi ${time}?`;
      const qe=`What will ${p.v===2?p.en:'you'+(p.v===3?' (plural)':'')} do ${enTime}?`;
      const r=p.sr?`${p.sr} ${future} ${a.inf} ${time}.`:`${cap(time)} ću ${a.inf}.`;
      add('i-plans',q,qe,r,`${p.en} will ${a.en[0]} ${enTime}.`,'Use ću (I), ćemo (we), or će (he/she) followed by the supplied infinitive. Short future phrases stay at this level.',p.v===0?[`Ja ću ${a.inf} ${time}.`,`${cap(time)} ću da ${phrase(a,0)}.`]:[],[future,['ću','ćeš','će','ćemo']]);
    }
    add('i-plans',`Da li ćeš da ${phrase(a,1)} ${time}?`,`Will you ${a.en[0]} ${enTime}?`,`Ne, ${time} neću ${a.inf}.`,`No, I will not ${a.en[0]} ${enTime}.`,'Neću is the negative of ću and is written as one word.',[],['neću',['neću','nećeš','neće','nećemo']]);
  }
  for(const [loc,,enLoc] of places.filter(p=>!['u banci','na poslu'].includes(p[0]))) for(const hour of [3,4,5,6,7,8]) add('i-plans','Gde i kada ćemo da se nađemo?','Where and when will we meet?',`Možemo da se nađemo ${loc} u ${D.numberWord(hour)} ${hour<5?'sata':'sati'}.`,`We can meet ${enLoc} at ${hour} o'clock.`,'Možemo da se nađemo means we can meet. Learn the location and clock phrase together.');

  // 6. Short past replies. Singular gender is always explicit; no aspect syllabus.
  const pastTimes=[['juče','yesterday'],['sinoć','last night'],['u subotu','on Saturday'],['u nedelju','on Sunday'],['prošle nedelje','last week'],['za vikend','at the weekend']];
  for(const a of actions) for(const [time,enTime] of pastTimes) for(const gender of [0,1]) {
    if(['doručak','ručak'].includes(a.object)&&time==='sinoć')continue;
    const male=gender===0,g=male?'male':'female',past=a.past[gender],object=a.object?' '+a.object:'';
    const q=`Šta si ${male?'radio':'radila'} ${time}?`,qe=`What did you do ${enTime}? (to a ${g})`;
    const r=`${cap(time)} sam ${past}${object}.`;
    add('i-past',q,qe,r,`I ${a.pastEnglish} ${enTime}. (${g} speaker)`,'A '+g+' speaker uses '+past+'. Sam follows the first word or phrase.',[`${cap(past)} sam${object} ${time}.`,`Ja sam ${past}${object} ${time}.`],['sam',['sam','si','je','smo']]);
    const name=male?'Marko':'Ana';
    add('i-past',`Šta je ${name} ${male?'radio':'radila'} ${time}?`,`What did ${name} do ${enTime}?`,`${name} je ${past}${object} ${time}.`,`${name} ${a.pastEnglish} ${enTime}.`,'Use je for one named person, with the matching masculine/feminine past form.',[],['je',['sam','si','je','smo']]);
    add('i-past',`Da li si ${past}${object} ${time}?`,`Did you ${a.en[0]} ${enTime}? (to a ${g})`,`Ne, nisam ${past}${object} ${time}.`,`No, I did not ${a.en[0]} ${enTime}. (${g} speaker)`,'Nisam + '+past+' forms a negative past reply.',[`Ne, ${time} nisam ${past}${object}.`],['nisam',['nisam','nisi','nije','nismo']]);
  }
  for(const [loc,,enLoc] of places) for(const [time,enTime] of pastTimes) for(const gender of [0,1]) {
    const past=gender===0?'bio':'bila',g=gender===0?'male':'female';
    add('i-past',`Gde si ${past} ${time}?`,`Where were you ${enTime}? (to a ${g})`,`${cap(time)} sam ${past} ${loc}.`,`I was ${enLoc} ${enTime}. (${g} speaker)`,'Bio sam / bila sam means I was. The place here is a location.',[`${cap(past)} sam ${loc} ${time}.`,`Ja sam ${past} ${loc} ${time}.`],['sam',['sam','si','je','smo']]);
  }

  // 7. Preferences, agreement and a small set of reasons, with noun agreement.
  const opinionGoods=goods.map(([,object,en])=>object==='sendvič'?['sendviče','sandwiches']:object==='kolač'?['kolače','cakes']:[object,en.replace(/^a /,'')]);
  for(const [object,en] of opinionGoods) for(const yes of [true,false]) {
    add('i-opinions',`Da li voliš ${object}?`,`Do you like ${en}?`,`${yes?'Da, volim':'Ne, ne volim'} ${object}.`,`${yes?'Yes, I like':'No, I do not like'} ${en}.`,'Volim means I like. The object form is supplied.',[],['volim',['volim','voliš','voli','volimo']]);
    add('i-opinions',`Da li Ana voli ${object}?`,`Does Ana like ${en}?`,`${yes?'Da, Ana voli':'Ne, Ana ne voli'} ${object}.`,`${yes?'Yes, Ana likes':'No, Ana does not like'} ${en}.`,'Voli is the he/she form, including Ana.',[],['voli',['volim','voliš','voli','volimo']]);
  }
  const reasons=[['me opušta','it helps me relax'],['je zabavno','it is fun'],['je zanimljivo','it is interesting']];
  for(const a of actions.filter(a=>!['radim','jedem','pijem','odmaram'].includes(a.v[0]))) {
    add('i-opinions',`Da li voliš da ${phrase(a,1)}?`,`Do you like to ${a.en[0]}?`,`Da, volim da ${phrase(a,0)}.`,`Yes, I like to ${a.en[0]}.`,'After volim da, the second present verb also refers to I.');
    add('i-opinions',`Da li voliš da ${phrase(a,1)}?`,`Do you like to ${a.en[0]}?`,`Ne, ne volim da ${phrase(a,0)}.`,`No, I do not like to ${a.en[0]}.`,'Ne volim declines this preference; the second verb still refers to I.');
    for(const [reason,enReason] of reasons) add('i-opinions',`Zašto voliš da ${phrase(a,1)}?`,`Why do you like to ${a.en[0]}?`,`Volim da ${phrase(a,0)} jer ${reason}.`,`I like to ${a.en[0]} because ${enReason}.`,'Jer introduces one simple reason. Learn the second clause as a phrase.');
  }
  const descriptions=[
    ['film','film','masculine',[['dobar','good'],['loš','bad'],['zanimljiv','interesting'],['dosadan','boring'],['dug','long'],['kratak','short']]],
    ['knjiga','book','feminine',[['dobra','good'],['loša','bad'],['zanimljiva','interesting'],['dosadna','boring'],['duga','long'],['kratka','short']]],
    ['kafa','coffee','feminine',[['dobra','good'],['loša','bad'],['topla','warm'],['hladna','cold']]],
    ['čaj','tea','masculine',[['dobar','good'],['loš','bad'],['topao','warm'],['hladan','cold']]],
    ['supa','soup','feminine',[['dobra','good'],['loša','bad'],['topla','warm'],['hladna','cold']]],
    ['restoran','restaurant','masculine',[['dobar','good'],['loš','bad'],['skup','expensive'],['jeftin','cheap']]],
    ['grad','city','masculine',[['lep','beautiful'],['velik','big'],['mali','small'],['zanimljiv','interesting']]],
    ['muzej','museum','masculine',[['velik','big'],['mali','small'],['zanimljiv','interesting'],['dobar','good']]]
  ];
  for(const [noun,en,gender,adjectives] of descriptions) for(const [adjective,enAdjective] of adjectives) {
    add('i-opinions',`${gender==='feminine'?'Kakva':'Kakav'} je ${noun}?`,`What is the ${en} like?`,`${cap(noun)} je ${adjective}.`,`The ${en} is ${enAdjective}.`,'The adjective matches the '+gender+' noun '+noun+'.');
    add('i-opinions',`Šta misliš o ${noun==='film'?'filmu':noun==='knjiga'?'knjizi':noun==='kafa'?'kafi':noun==='čaj'?'čaju':noun==='supa'?'supi':noun==='restoran'?'restoranu':noun==='grad'?'gradu':'muzeju'}?`,`What do you think of the ${en}?`,`Mislim da je ${noun} ${adjective}.`,`I think the ${en} is ${enAdjective}.`,'Mislim da introduces a short opinion. Je follows da in this frame.');
  }
  for(const [noun,en,gender,adjectives] of descriptions.slice(0,2)) for(const [firstIndex,secondIndex] of [[0,3],[0,4],[2,4],[1,5]]) {
    const [first,enFirst]=adjectives[firstIndex],[second,enSecond]=adjectives[secondIndex];
    add('i-opinions',`${gender==='feminine'?'Kakva':'Kakav'} je ${noun}?`,`What is the ${en} like?`,`${cap(noun)} je ${first}, ali ${second}.`,`The ${en} is ${enFirst}, but ${enSecond}.`,'Ali adds a contrasting detail. Both adjectives match the noun.');
  }
  for(const [activity,enActivity] of [['učim srpski','am learning Serbian'],['učim engleski','am learning English']]) for(const [reason,enReason] of [['volim jezike','I like languages'],['živim u Srbiji','I live in Serbia'],['imam prijatelje u Srbiji','I have friends in Serbia'],['želim da putujem','I want to travel']]) add('i-opinions',`Zašto ${activity.replace('učim','učiš')}?`,`Why are you learning ${activity.includes('srpski')?'Serbian':'English'}?`,`${cap(activity)} jer ${reason}.`,`I ${enActivity} because ${enReason}.`,'Jer links the activity with its reason.');
  for(const [stateMale,stateFemale,en] of [['umoran','umorna','tired'],['gladan','gladna','hungry'],['žedan','žedna','thirsty'],['srećan','srećna','happy']]) for(const gender of [0,1]) {
    const state=gender===0?stateMale:stateFemale,g=gender===0?'male':'female';
    add('i-opinions','Kako si?','How are you?',`${cap(state)} sam.`,`I am ${en}. (${g} speaker)`,'Use '+state+' for a '+g+' speaker.',[`Ja sam ${state}.`]);
    const happy=en==='happy';
    add('i-opinions','Kako si?','How are you?',happy?`${cap(state)} sam i dobro sam.`:`${cap(state)} sam, ali sam dobro.`,`I am ${en}${happy?' and':' but'} I am well. (${g} speaker)`,(happy?'I adds another detail.':'Ali adds one contrasting detail.')+' Both sam forms refer to the speaker.',[happy?`Ja sam ${state} i dobro sam.`:`Ja sam ${state}, ali sam dobro.`]);
  }
  const agreementRows=[
    ['Da li se slažeš?','Do you agree?','Slažem se.','I agree.','Keep se with slažem.', ['Ja se slažem.']],
    ['Da li se slažeš?','Do you agree?','Ne slažem se.','I do not agree.','Ne negates slažem se.', ['Ja se ne slažem.']],
    ['Šta misliš?','What do you think?','Mislim da je to dobra ideja.','I think that is a good idea.','Dobra matches feminine ideja.'],
    ['Šta misliš?','What do you think?','Mislim da je to loša ideja.','I think that is a bad idea.','Loša matches feminine ideja.'],
    ['Da li voliš kafu ili čaj?','Do you like coffee or tea?','Više volim čaj.','I prefer tea.','Više volim literally means I like more.'],
    ['Da li voliš kafu ili čaj?','Do you like coffee or tea?','Više volim kafu.','I prefer coffee.','Use kafu as the object.']
  ];
  agreementRows.forEach(row=>add('i-opinions',...row));

  // 8. Clarification, asking back, specific word help and polite reactions.
  const vocabulary=[
    ['stanica','station'],['banka','bank'],['biblioteka','library'],['prodavnica','shop'],['park','park'],['muzej','museum'],['restoran','restaurant'],['škola','school'],
    ['knjiga','book'],['novine','newspaper'],['film','film'],['muzika','music'],['ručak','lunch'],['večera','dinner'],['doručak','breakfast'],['posao','work'],
    ['voda','water'],['kafa','coffee'],['čaj','tea'],['sok','juice'],['hleb','bread'],['mleko','milk'],['sir','cheese'],['šećer','sugar'],['račun','bill'],['kesa','bag'],
    ['jutro','morning'],['veče','evening'],['danas','today'],['sutra','tomorrow'],['juče','yesterday'],['sinoć','last night'],['vikend','weekend'],['nedelja','week'],
    ['ponedeljak','Monday'],['utorak','Tuesday'],['sreda','Wednesday'],['četvrtak','Thursday'],['petak','Friday'],['subota','Saturday'],
    ['levo','left'],['desno','right'],['pravo','straight ahead'],['blizu','nearby'],['daleko','far away'],['ovde','here'],['tamo','there'],
    ['brat','brother'],['sestra','sister'],['majka','mother'],['otac','father'],['prijatelj','male friend'],['prijateljica','female friend'],
    ['molim','please'],['hvala','thank you'],['izvinite','excuse me'],['dobro','well'],['polako','slowly'],['zajedno','together'],['onda','then'],['sada','now'],
    ['razumem','I understand'],['govorim','I speak'],['čitam','I read'],['radim','I work'],['učim','I study'],['pijem','I drink'],['jedem','I eat'],['idem','I go']
  ];
  for(const [word,en] of vocabulary) {
    add('i-clarify','Koju reč ne razumete?','Which word do you not understand? (polite)',`Šta znači „${word}“?`,`What does “${word}” mean?`,'Šta znači…? asks about the meaning of a word. Keep the quoted Serbian word unchanged.');
    add('i-clarify','Za koju reč Vam treba pomoć?','Which word do you need help with? (polite)',`Kako se izgovara „${word}“?`,`How is “${word}” pronounced?`,'Kako se izgovara…? asks for help pronouncing a word.');
    add('i-clarify',`Da li razumete reč „${word}“?`,`Do you understand the word “${word}”? (polite)`,`Ne razumem reč „${word}“.`,`I do not understand the word “${word}”.`,'Ne razumem means I do not understand. Name the word you need help with.');
    add('i-clarify',`Koju reč da napišem?`,'Which word should I write?',`Možete li da napišete „${word}“?`,`Could you write “${word}”? (polite)`,'Možete li da napišete…? politely asks someone to write a word.');
  }
  for(const [time,enTime] of [['danas','today'],['sada','now'],['večeras','tonight']]) for(const [state,enState] of [['dobro','well'],['bolje','better'],['odlično','great']]) for(const polite of [false,true]) add('i-clarify',`Kako ${polite?'ste':'si'} ${time}?`,`How are you ${enTime}?${polite?' (polite)':''}`,`${cap(state)} sam ${time}, hvala. A ${polite?'Vi':'ti'}?`,`I am ${enState} ${enTime}, thank you. And you?${polite?' (polite)':''}`,'A ti? asks back informally; A Vi? asks back politely.',[`Ja sam ${state} ${time}, hvala. A ${polite?'Vi':'ti'}?`]);
  for(const [time,enTime] of planTimes) {
    add('i-clarify',`Ne mogu da dođem ${time}.`,`I cannot come ${enTime}.`,`Nema problema. Čujemo se ${time}.`,`No problem. We will speak ${enTime}.`,'Nema problema acknowledges a changed plan. Čujemo se closes the chat naturally.');
    add('i-clarify','Moram da idem.','I have to go.',`U redu. Vidimo se ${time}.`,`All right. See you ${enTime}.`,'U redu accepts the closing; vidimo se gives the next meeting.');
  }
  const clarifyRows=[
    ['Da li razumete?','Do you understand? (polite)','Razumem pitanje, ali ne znam odgovor.','I understand the question, but I do not know the answer.','Pitanje is question; odgovor is answer.'],
    ['Da li razumete?','Do you understand? (polite)','Razumem malo.','I understand a little.','Malo softens the answer.'],
    ['Da li razumete?','Do you understand? (polite)','Da, sve razumem.','Yes, I understand everything.','Sve means everything.'],
    ['Da li razumete?','Do you understand? (polite)','Ne razumem poslednju reč.','I do not understand the last word.','Poslednju reč is the object phrase for the last word.'],
    ['Da li razumete?','Do you understand? (polite)','Možete li da ponovite pitanje?','Could you repeat the question? (polite)','Specify pitanje when asking for repetition.'],
    ['Da li je jasno?','Is it clear?','Sada je jasno, hvala.','It is clear now, thank you.','Sada je jasno confirms understanding.'],
    ['Da li je jasno?','Is it clear?','Još nije jasno.','It is still not clear.','Još nije means still is not.'],
    ['Da li govorim prebrzo?','Am I speaking too fast?','Da, molim Vas, malo sporije.','Yes, please, a little more slowly. (polite)','Molim Vas politely adds please.'],
    ['Da li me čujete?','Can you hear me? (polite/plural)','Da, dobro Vas čujem.','Yes, I can hear you well. (polite)','Vas addresses the other person politely.'],
    ['Da li me čujete?','Can you hear me? (polite/plural)','Ne, ne čujem Vas dobro.','No, I cannot hear you well. (polite)','Čujem means I hear.'],
    ['Da li imate pitanje?','Do you have a question? (polite/plural)','Da, imam jedno pitanje.','Yes, I have one question.','Jedno matches neuter pitanje.'],
    ['Da li imate pitanje?','Do you have a question? (polite/plural)','Ne, nemam pitanje.','No, I do not have a question.','Nemam is the negative of imam.'],
    ['Možeš li sada da razgovaraš?','Can you talk now?','Da, imam vremena.','Yes, I have time.','Imam vremena is a whole phrase.'],
    ['Možeš li sada da razgovaraš?','Can you talk now?','Ne mogu sada. Zovem te kasnije.','I cannot now. I will call you later.','A present form can express an arranged next action.'],
    ['Kako se ovo izgovara?','How is this pronounced?','Možete li da kažete još jednom?','Could you say it once more? (polite)','Još jednom means once more.'],
    ['Hvala na pomoći.','Thank you for your help.','Drago mi je da mogu da pomognem.','I am glad I can help.','Learn drago mi je as I am glad.'],
    ['Izvinite.','Excuse me / I am sorry. (polite)','Nema problema.','No problem.','A short polite response to a small inconvenience.'],
    ['Danas mi je rođendan.','It is my birthday today.','Srećan rođendan!','Happy birthday!','A fixed greeting for a birthday.'],
    ['Imam novi posao.','I have a new job.','Čestitam! To su dobre vesti.','Congratulations! That is good news.','Vesti is plural; Serbian uses dobre vesti.'],
    ['Nisam dobro.','I am not well.','Žao mi je. Odmori se.','I am sorry to hear that. Get some rest.','Odmori se is a familiar short suggestion.'],
    ['Putujem sutra.','I am travelling tomorrow.','Srećan put! Čujemo se.','Have a good trip! We will be in touch.','Srećan put is a fixed travel wish.'],
    ['Idem da spavam.','I am going to bed.','Laku noć!','Good night!','A closing used before sleep.'],
    ['Vidimo se sutra.','See you tomorrow.','Važi. Do sutra!','Agreed. Until tomorrow!','Važi is a natural informal acceptance.']
  ];
  clarifyRows.forEach(row=>add('i-clarify',...row));

  // Build three different quiz tasks where appropriate: reply, understanding,
  // and a focused word gap. Exact repeated prompts and equivalent options vanish.
  function alternativesFor(rows, row, field, excluded, seed) {
    const out=[],seen=new Set(excluded.map(D.normalise)),meaning=D.normalise(row.english);
    // Spread distractors across the bank instead of always taking its first rows.
    for(let i=0;i<rows.length&&out.length<3;i++) {
      const candidate=rows[(seed+i)%rows.length];
      if(candidate.keys.english===meaning)continue;
      const value=candidate[field],key=candidate.keys[field];
      if(!seen.has(key)){seen.add(key);out.push(value);}
    }
    return out;
  }
  D.intermediateExpansion={};
  const seenQuizGlobal=new Set(D.getLessons('intermediate').flatMap(l=>D.quiz[l.id].map(r=>D.normalise(r[0]))));
  const seenPracticeGlobal=new Set(D.getLessons('intermediate').flatMap(l=>D.practice[l.id].map(r=>D.normalise(r[0]))));
  for(const lesson of D.getLessons('intermediate')) {
    const id=lesson.id;
    const original=lesson.exchanges;
    const rows=[],seenRows=new Set(original.map(r=>D.normalise(r.question)+'|'+D.normalise(r.english)));
    for(const row of banks[id]) {
      const key=D.normalise(row.question)+'|'+D.normalise(row.english);
      if(!seenRows.has(key)){seenRows.add(key);rows.push(row);}
    }
    const candidates=[...original,...rows].map(row=>({...row,keys:Object.fromEntries(['reply','english','questionEnglish'].map(field=>[field,D.normalise(row[field])]))}));
    const seenQuiz=seenQuizGlobal;
    const seenPractice=seenPracticeGlobal;
    const seenBuilders=new Set(D.builders[id].map(r=>D.normalise(r.prompt)));
    const wordKey=s=>D.normalise(s).split(' ').sort().join(' ');
    function quiz(prompt,answer,wrong,explanation,category,segments,index,script) {
      const key=D.normalise(prompt);
      if(seenQuiz.has(key)||wrong.length!==3)return;
      seenQuiz.add(key);
      D.quiz[id].push([prompt,answer,wrong,explanation,{id:`${id}-expanded-${index}-${category}`,category,optionsScript:script,serbianSegments:segments}]);
    }
    rows.forEach((row,index)=>{
      const answers=unique([row.reply,...row.alternatives]);
      const wrong=alternativesFor(candidates,row,'reply',answers,index*31);
      quiz(`Reply to “${row.question}” with “${row.english}”. Choose the matching Serbian reply.`,row.reply,wrong,`${row.reply} — ${row.english} ${row.note}`,'reply',[row.question],index,'display');
      const questionWrong=alternativesFor(candidates,row,'questionEnglish',[row.questionEnglish],index*17);
      quiz(`What does “${row.question}” mean?`,row.questionEnglish,questionWrong,`${row.question} — ${row.questionEnglish}`,'understand-question',[row.question],index,'english');
      const replyWrong=alternativesFor(candidates,row,'english',[row.english],index*13);
      // Include speaker/meaning context so gender-specific forms remain unambiguous.
      quiz(`What does the reply “${row.reply}” mean?`,row.english,replyWrong,`${row.reply} — ${row.english} ${row.note}`,'understand-reply',[row.reply],index,'english');
      if(row.focus) {
        const [focus,forms]=row.focus,words=row.reply.split(/\s+/);
        const position=words.findIndex(w=>D.normalise(w)===D.normalise(focus));
        const wrongForms=unique(forms).filter(f=>D.normalise(f)!==D.normalise(focus)).slice(0,3);
        if(position>=0){words[position]='___';const gap=words.join(' ');quiz(`Complete “${gap}” to say “${row.english}”.`,focus,wrongForms,`${row.reply} — ${row.english} ${row.note}`,'complete-reply',[gap],index,'display');}
      }
      const prompt=`Reply to “${row.question}” with “${row.english}”.`;
      if(!seenPractice.has(D.normalise(prompt))) {
        seenPractice.add(D.normalise(prompt));
        D.practice[id].push([prompt,answers,row.note,{id:`${id}-expanded-${index}-practice`,category:'reply',optionsScript:'display',explanation:row.note,serbianSegments:[row.question]}]);
      }
      if(!seenBuilders.has(D.normalise(row.english))) {
        seenBuilders.add(D.normalise(row.english));
        D.builders[id].push({id:`${id}-expanded-${index}-build`,category:'build',prompt:row.english,words:row.reply.split(/\s+/),answers:answers.filter(s=>wordKey(s)===wordKey(row.reply)),hint:row.note});
      }
    });
    D.intermediateExpansion[id]={exchanges:rows,added:rows.length};
    D.poolCounts[id]={quiz:D.quiz[id].length,practice:D.practice[id].length};
  }
})();
