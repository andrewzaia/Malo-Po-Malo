(function () {
  'use strict';
  const D = window.Serbian;
  // A small, authored bridge course: familiar situations and short replies.
  // Each typing prompt specifies a meaning; alternatives are reviewed individually.
  const exchange = (question, questionEnglish, reply, english, note, alternatives = []) => ({question, questionEnglish, reply, english, note, alternatives});
  const scene = (title, setting, steps, closing, closingEnglish) => ({title, setting, steps, closing, closingEnglish});
  const units = [
    {
      id:'i-questions', title:'Questions & replies', serbian:'Pitanja i odgovori', short:'Answer, then ask back',
      description:'Answer familiar questions in a full sentence, then ask a small question back.',
      tip:'Gde asks where, odakle asks where from, and šta asks what. A ti? means “And you?” to one person informally.',
      patterns:[['Gde živiš? → Živim u…','Where do you live? → I live in…'],['Da li…? → Da… / Ne…','A yes/no question → Yes… / No…'],['A ti? / A Vi?','And you? Informal / polite.']],
      exchanges:[
        exchange('Odakle si?','Where are you from?','Ja sam iz Australije.','I am from Australia.','Iz Australije means from Australia. Use sam for I am.',['Iz Australije sam.']),
        exchange('Gde živiš?','Where do you live?','Živim u Sidneju.','I live in Sydney.','Živim means I live. Learn u Sidneju as a place phrase.',['Ja živim u Sidneju.','U Sidneju živim.']),
        exchange('Govoriš li srpski?','Do you speak Serbian?','Govorim malo srpski. A ti?','I speak a little Serbian. And you?','Govorim is I speak. Add A ti? to ask the same question back.',['Ja govorim malo srpski. A ti?']),
        exchange('Kako se zoveš?','What is your name?','Zovem se Marko.','My name is Marko.','Keep se with zovem: Zovem se Marko.',['Ja se zovem Marko.']),
        exchange('Kako se zove tvoja sestra?','What is your sister’s name?','Moja sestra se zove Ana.','My sister’s name is Ana.','Sestra is feminine: moja sestra, tvoja sestra.',['Moja sestra zove se Ana.']),
        exchange('Da li imaš brata?','Do you have a brother?','Da, imam brata.','Yes, I have a brother.','Imam means I have. Learn imam brata as a complete phrase.',['Da, ja imam brata.']),
        exchange('Da li radiš danas?','Are you working today?','Ne, danas ne radim.','No, I am not working today.','Ne radim means I do not work / I am not working.',['Ne, ne radim danas.','Ne, ja danas ne radim.']),
        exchange('Šta učiš?','What are you studying?','Učim srpski.','I am studying Serbian.','Učiš asks what you study; učim answers what I study.',['Ja učim srpski.']),
        exchange('Gde je Ana?','Where is Ana?','Ana je kod kuće.','Ana is at home.','Kod kuće is a useful fixed phrase for at home.'),
        exchange('Kako ste?','How are you? (polite)','Dobro sam, hvala. A Vi?','I am well, thank you. And you? (polite)','Use Vi when addressing one person politely.',['Ja sam dobro, hvala. A Vi?'])
      ],
      scenes:[scene('Meeting someone','You meet someone at a Serbian class. Use the details in each instruction.',[0,1,2],'Drago mi je.','Nice to meet you.'),scene('Talking about family','A classmate asks your name and about your family. You are Marko.',[3,4,5],'Drago mi je, Marko.','Nice to meet you, Marko.')]
    },
    {
      id:'i-routines', title:'Daily life', serbian:'Svakodnevni život', short:'Work, hobbies & habits',
      description:'Say what you do, when you do it, and what you do after work.',
      tip:'Learn common verbs as useful pairs: radiš → radim (you work → I work), čitaš → čitam, piješ → pijem. Subject pronouns are often omitted.',
      patterns:[['Radim / Ne radim','I work / I do not work'],['Ujutru / Uveče','In the morning / In the evening'],['…a onda…','…and then…']],
      exchanges:[
        exchange('Gde radiš?','Where do you work?','Radim u prodavnici.','I work in a shop.','Use radim for I work; u prodavnici gives the location.',['Ja radim u prodavnici.','U prodavnici radim.']),
        exchange('Kada radiš?','When do you work?','Radim ujutru.','I work in the morning.','Ujutru is in the morning.',['Ja radim ujutru.','Ujutru radim.']),
        exchange('Šta radiš posle posla?','What do you do after work?','Idem kući, a onda čitam.','I go home, and then I read.','Kući is home as a destination. A onda adds the next action.',['Ja idem kući, a onda čitam.']),
        exchange('Šta piješ ujutru?','What do you drink in the morning?','Ujutru pijem kafu.','I drink coffee in the morning.','Pijem is I drink; kafu is coffee as the object.',['Pijem kafu ujutru.','Ja ujutru pijem kafu.']),
        exchange('Šta radiš uveče?','What do you do in the evening?','Uveče gledam film.','I watch a film in the evening.','Gledam means I watch.',['Gledam film uveče.','Ja uveče gledam film.']),
        exchange('Da li čitaš svaki dan?','Do you read every day?','Da, čitam svaki dan.','Yes, I read every day.','Svaki dan means every day.',['Da, ja čitam svaki dan.']),
        exchange('Da li radiš nedeljom?','Do you work on Sundays?','Ne, ne radim nedeljom.','No, I do not work on Sundays.','Nedeljom describes a recurring Sunday routine.',['Ne, nedeljom ne radim.']),
        exchange('Šta radi Ana?','What is Ana doing?','Ana uči srpski.','Ana is studying Serbian.','Uči is the he/she form; učim is the I form.'),
        exchange('Šta radite zajedno?','What do you do together?','Zajedno kuvamo.','We cook together.','Kuvamo is we cook. Zajedno means together.',['Mi zajedno kuvamo.','Kuvamo zajedno.']),
        exchange('Kada učiš srpski?','When do you study Serbian?','Učim srpski posle posla.','I study Serbian after work.','Posle posla means after work.',['Posle posla učim srpski.','Ja učim srpski posle posla.'])
      ],
      scenes:[scene('A working day','Talk about your shop job and your routine.',[0,1,2],'Lep dan!','Have a nice day!'),scene('An evening chat','Talk about studying and relaxing after work.',[9,4,5],'I ja volim da čitam.','I like reading too.')]
    },
    {
      id:'i-places', title:'Places & directions', serbian:'Mesta i pravci', short:'Where you are & go',
      description:'Give your location, say where you are going, and ask for a simple direction.',
      tip:'Learn location and destination in pairs: u školi (at school), u školu (to school); kod kuće (at home), kući (home as a destination).',
      patterns:[['Gde si? → U školi sam.','Where are you? → I am at school.'],['Kuda ideš? → Idem u školu.','Where are you going? → I am going to school.'],['levo / desno / pravo','left / right / straight ahead']],
      exchanges:[
        exchange('Gde si sada?','Where are you now?','Sada sam u centru.','I am in the centre now.','Sada sam puts the short verb after the first word.',['U centru sam sada.','Ja sam sada u centru.']),
        exchange('Kuda ideš?','Where are you going?','Idem u prodavnicu.','I am going to the shop.','U prodavnicu is a destination; u prodavnici is a location.',['Ja idem u prodavnicu.','U prodavnicu idem.']),
        exchange('Kako ideš do centra?','How do you get to the centre?','Idem autobusom.','I go by bus.','Learn autobusom as by bus.',['Ja idem autobusom.','Autobusom idem.']),
        exchange('Gde je stanica?','Where is the station?','Stanica je levo.','The station is on the left.','Levo means on the left. It can also give a direction.'),
        exchange('Gde je banka?','Where is the bank?','Banka je desno.','The bank is on the right.','Desno means on the right.'),
        exchange('Da li je centar daleko?','Is the centre far away?','Ne, centar je blizu.','No, the centre is nearby.','Blizu means near; daleko means far.'),
        exchange('Gde je Marko?','Where is Marko?','Marko je u školi.','Marko is at school.','Use u školi for being at school.'),
        exchange('Kuda ide Ana?','Where is Ana going?','Ana ide u školu.','Ana is going to school.','Ide is the he/she form of idem; u školu gives a destination.'),
        exchange('Da li ideš kući?','Are you going home?','Da, idem kući.','Yes, I am going home.','Use kući for going home.',['Da, ja idem kući.']),
        exchange('Kako da dođem do banke?','How do I get to the bank?','Idite pravo, pa desno.','Go straight ahead, then right.','Idite is a polite or plural instruction. Pa means then here.')
      ],
      scenes:[scene('Getting around town','You are in the centre and heading to the shop.',[0,1,2],'Srećan put!','Have a good trip!'),scene('Giving directions','Someone asks for the station, the bank and a simple route.',[3,4,9],'Hvala na pomoći.','Thank you for your help.')]
    },
    {
      id:'i-requests', title:'Everyday requests', serbian:'Svakodnevne molbe', short:'Café, shop & help',
      description:'Order something, ask a price and make a short, polite request.',
      tip:'Molim adds please. Mogu li…? asks “May I / Can I…?” and Možete li…? asks someone politely to do something.',
      patterns:[['Jednu kafu, molim.','One coffee, please.'],['Mogu li da…?','May I / Can I…?'],['Možete li da…?','Could you…? (polite)']],
      exchanges:[
        exchange('Šta želite da popijete?','What would you like to drink?','Jednu kafu, molim.','One coffee, please.','Jednu kafu is a common ordering phrase.'),
        exchange('Sa mlekom?','With milk?','Da, sa mlekom, molim.','Yes, with milk, please.','Sa mlekom means with milk.'),
        exchange('Još nešto?','Anything else?','Ne, hvala. To je sve.','No, thank you. That is all.','To je sve closes an order politely.'),
        exchange('Šta želite?','What would you like?','Jednu vodu, molim.','One water, please.','Vodu is the object form used in this request.'),
        exchange('Kako želite da platite?','How would you like to pay?','Mogu li da platim karticom?','Can I pay by card?','Mogu li da + present verb asks permission. Karticom means by card.',['Da li mogu da platim karticom?']),
        exchange('Treba li Vam pomoć?','Do you need help? (polite)','Da, možete li da mi pomognete?','Yes, could you help me?','Možete li addresses the other person politely. Mi means to me here.',['Da, da li možete da mi pomognete?']),
        exchange('Šta Vas zanima?','What would you like to know? (polite)','Koliko ovo košta?','How much does this cost?','Koliko asks how much; ovo means this.'),
        exchange('Da li želite račun?','Would you like the bill / receipt?','Da, račun, molim.','Yes, the bill / receipt, please.','Račun can mean the bill or a receipt in these situations.'),
        exchange('Da li je sve u redu?','Is everything all right?','Da, hvala. Sve je u redu.','Yes, thank you. Everything is all right.','Sve je u redu is a useful whole phrase.'),
        exchange('Da li želite čaj?','Would you like tea?','Ne, hvala. Želim vodu.','No, thank you. I would like water.','Želim means I want / I would like; vodu is the object.',['Ne, hvala. Ja želim vodu.'])
      ],
      scenes:[scene('At a café','Order one coffee with milk and finish your order.',[0,1,2],'U redu.','All right.'),scene('At a shop','Ask for help, ask the price and ask to pay by card.',[5,6,4],'Da, možete.','Yes, you can.')]
    },
    {
      id:'i-plans', title:'Plans & invitations', serbian:'Planovi i pozivi', short:'Arrange something simple',
      description:'Suggest a meeting, accept or decline, and say what you will do tomorrow.',
      tip:'Planiram da… means I plan to… Use da with a present-tense verb. Start with the useful future phrase Sutra ću da… (Tomorrow I will…).',
      patterns:[['Planiram da…','I plan to…'],['Sutra ću da radim.','Tomorrow I will work.'],['Može. / Ne mogu danas.','That works. / I cannot today.']],
      exchanges:[
        exchange('Šta planiraš za vikend?','What are you planning for the weekend?','Planiram da posetim prijatelje.','I plan to visit friends.','Use planiram da + present form posetim.',['Ja planiram da posetim prijatelje.']),
        exchange('Kada ćemo da se vidimo?','When will we see each other?','Možemo da se vidimo u subotu.','We can see each other on Saturday.','Možemo is we can; u subotu gives the day.',['U subotu možemo da se vidimo.']),
        exchange('U koliko sati?','At what time?','U pet sati.','At five o’clock.','Use u before the time.'),
        exchange('Gde ćemo da se nađemo?','Where will we meet?','Možemo da se nađemo u centru.','We can meet in the centre.','Da se nađemo is a useful phrase for arranging to meet.',['U centru možemo da se nađemo.']),
        exchange('Hoćeš li na kafu?','Would you like to go for coffee?','Da, može.','Yes, that works.','Može is a natural short way to accept a suggestion.'),
        exchange('Možeš li danas?','Can you today?','Ne mogu danas, ali mogu sutra.','I cannot today, but I can tomorrow.','Ne mogu is I cannot; ali joins a contrasting alternative.',['Danas ne mogu, ali sutra mogu.']),
        exchange('Šta ćeš da radiš sutra?','What will you do tomorrow?','Sutra ću da radim.','I will work tomorrow.','Learn ću da radim as I will work.',['Ja ću da radim sutra.','Radiću sutra.','Sutra ću raditi.']),
        exchange('Da li ćeš da učiš večeras?','Will you study tonight?','Da, večeras ću da učim.','Yes, I will study tonight.','Večeras means this evening / tonight.',['Da, ja ću da učim večeras.','Da, učiću večeras.']),
        exchange('Da li dolazi Ana?','Is Ana coming?','Da, Ana dolazi u subotu.','Yes, Ana is coming on Saturday.','A present form can describe an arranged upcoming event.'),
        exchange('Da li Vam odgovara pet sati?','Does five o’clock suit you? (polite)','Da, odgovara mi. Hvala.','Yes, it suits me. Thank you.','Odgovara mi means it suits me. Vam addresses someone politely.')
      ],
      scenes:[scene('Making a weekend plan','Arrange to see a friend on Saturday at five.',[0,1,2],'Vidimo se u subotu.','See you on Saturday.'),scene('Suggesting another day','Accept a coffee invitation, explain your availability and tomorrow’s work.',[4,5,6],'U redu, čujemo se sutra.','All right, we’ll speak tomorrow.')]
    },
    {
      id:'i-past', title:'Yesterday & the weekend', serbian:'Juče i za vikend', short:'Short past-tense replies',
      description:'Describe one or two things that happened, using familiar past-tense phrases.',
      tip:'Past replies combine sam / si / je with a past form. A male speaker says radio sam; a female speaker says radila sam. The instruction tells you which to use.',
      patterns:[['Juče sam radio / radila.','I worked yesterday. Male / female speaker.'],['Bio sam / Bila sam…','I was… Male / female speaker.'],['Nisam radio / radila.','I did not work. Male / female speaker.']],
      exchanges:[
        exchange('Šta si radio juče?','What did you do yesterday? (to a male)','Juče sam radio.','I worked yesterday. (male speaker)','Radio is the masculine past form. Sam follows juče.',['Radio sam juče.','Ja sam juče radio.']),
        exchange('Šta si radila juče?','What did you do yesterday? (to a female)','Juče sam radila.','I worked yesterday. (female speaker)','Radila is the feminine past form.',['Radila sam juče.','Ja sam juče radila.']),
        exchange('Gde si bio?','Where were you? (to a male)','Bio sam kod kuće.','I was at home. (male speaker)','Bio sam is I was for a male speaker.',['Ja sam bio kod kuće.','Kod kuće sam bio.']),
        exchange('Gde si bila?','Where were you? (to a female)','Bila sam kod kuće.','I was at home. (female speaker)','Bila sam is I was for a female speaker.',['Ja sam bila kod kuće.','Kod kuće sam bila.']),
        exchange('Šta si gledao uveče?','What did you watch in the evening? (to a male)','Gledao sam film.','I watched a film. (male speaker)','Gledao is the masculine past form of gledati.',['Ja sam gledao film.']),
        exchange('Šta si gledala uveče?','What did you watch in the evening? (to a female)','Gledala sam film.','I watched a film. (female speaker)','Gledala is the feminine past form of gledati.',['Ja sam gledala film.']),
        exchange('Da li si radio u subotu?','Did you work on Saturday? (to a male)','Ne, nisam radio u subotu.','No, I did not work on Saturday. (male speaker)','Nisam combines not and I am for this negative past reply.',['Ne, u subotu nisam radio.']),
        exchange('Da li si radila u subotu?','Did you work on Saturday? (to a female)','Ne, nisam radila u subotu.','No, I did not work on Saturday. (female speaker)','Use nisam + radila for a female speaker.',['Ne, u subotu nisam radila.']),
        exchange('Šta je Ana radila juče?','What did Ana do yesterday?','Ana je učila srpski.','Ana studied Serbian.','Use je with Ana and the feminine form učila.'),
        exchange('Šta je Marko radio juče?','What did Marko do yesterday?','Marko je čitao knjigu.','Marko read a book.','Use je with Marko and the masculine form čitao.')
      ],
      scenes:[scene('Marko’s day','You are Marko. Answer using masculine forms.',[0,2,4],'Zvuči lepo.','That sounds nice.'),scene('Ana’s day','You are Ana. Answer using feminine forms.',[1,3,5],'Zvuči lepo.','That sounds nice.')]
    },
    {
      id:'i-opinions', title:'Opinions & reasons', serbian:'Mišljenja i razlozi', short:'Likes, feelings & because',
      description:'Give a preference, a simple reason, or a short reaction to someone’s news.',
      tip:'Jer means because, ali means but, and i means and. Use them to add one detail to a short answer.',
      patterns:[['Volim… / Ne volim…','I like… / I do not like…'],['…jer…','…because…'],['Slažem se. / Mislim da…','I agree. / I think that…']],
      exchanges:[
        exchange('Da li voliš kafu?','Do you like coffee?','Da, volim kafu.','Yes, I like coffee.','Volim is I like; kafu is coffee as the object.',['Da, ja volim kafu.']),
        exchange('Zašto učiš srpski?','Why are you learning Serbian?','Učim srpski jer volim jezike.','I am learning Serbian because I like languages.','Jer connects your answer to its reason.',['Ja učim srpski jer volim jezike.']),
        exchange('Da li voliš da kuvaš?','Do you like cooking?','Da, volim da kuvam.','Yes, I like cooking.','With I like to cook, use volim da kuvam.',['Da, ja volim da kuvam.']),
        exchange('Kakav je film?','What is the film like?','Film je dobar, ali dug.','The film is good, but long.','Dobar and dug describe the masculine noun film.'),
        exchange('Da li je knjiga zanimljiva?','Is the book interesting?','Da, knjiga je zanimljiva.','Yes, the book is interesting.','Zanimljiva agrees with the feminine noun knjiga.'),
        exchange('Da li se slažeš?','Do you agree?','Da, slažem se.','Yes, I agree.','Keep se with slažem.',['Da, ja se slažem.']),
        exchange('Kako se osećaš?','How do you feel?','Dobro se osećam.','I feel well.','Osećam se means I feel. Se follows dobro here.',['Osećam se dobro.','Ja se dobro osećam.']),
        exchange('Zašto si kod kuće?','Why are you at home?','Kod kuće sam jer sam umoran.','I am at home because I am tired. (male speaker)','Umoran is masculine; umorna is feminine. This prompt asks for the male form.',['Ja sam kod kuće jer sam umoran.']),
        exchange('Kako je Ana?','How is Ana?','Ana je umorna, ali je dobro.','Ana is tired, but she is well.','Umorna is the feminine form. Ali adds the contrasting detail.'),
        exchange('Šta misliš o filmu?','What do you think of the film?','Mislim da je film dobar.','I think the film is good.','Mislim da introduces a simple opinion.',['Ja mislim da je film dobar.'])
      ],
      scenes:[scene('Getting to know you','Share what you like and why you study Serbian.',[0,1,2],'I ja volim jezike.','I like languages too.'),scene('Talking about a film','Describe a film, give your opinion and agree.',[3,9,5],'Drago mi je.','I’m glad.')]
    },
    {
      id:'i-clarify', title:'Keep the chat going', serbian:'Nastavi razgovor', short:'Clarify, react & close',
      description:'Ask someone to slow down, check understanding, react politely and end a conversation.',
      tip:'It is useful to ask for repetition early. Use Možete li…? politely; use A ti? with a friend when asking a question back.',
      patterns:[['Možete li da ponovite?','Could you repeat that?'],['Šta znači…?','What does… mean?'],['A ti? / Čujemo se.','And you? / We’ll be in touch.']],
      exchanges:[
        exchange('Da li razumete?','Do you understand? (polite)','Ne razumem. Možete li da ponovite?','I do not understand. Could you repeat that?','Ne razumem states the problem; the second sentence asks politely for repetition.',['Ne razumem. Da li možete da ponovite?']),
        exchange('Da li govorim prebrzo?','Am I speaking too fast?','Da, možete li da govorite sporije?','Yes, could you speak more slowly?','Sporije means more slowly; learn it as part of this request.',['Da, da li možete da govorite sporije?']),
        exchange('Koju reč ne razumete?','Which word do you not understand? (polite)','Šta znači „stanica“?','What does “stanica” mean?','Šta znači…? asks for the meaning of a word.'),
        exchange('Da li je sada jasno?','Is it clear now?','Da, sada razumem. Hvala.','Yes, now I understand. Thank you.','Sada razumem confirms that the explanation helped.',['Da, razumem sada. Hvala.']),
        exchange('Kako si danas?','How are you today?','Dobro sam. A ti?','I am well. And you?','A ti? returns a familiar question to one person informally.',['Ja sam dobro. A ti?']),
        exchange('Danas ne mogu da dođem.','I cannot come today.','Nema problema. Vidimo se sutra.','No problem. See you tomorrow.','Nema problema is a useful reply when plans change.'),
        exchange('Položila sam test.','I passed the test. (female speaker)','Čestitam!','Congratulations!','Čestitam is a natural reaction to good news.'),
        exchange('Danas nisam dobro.','I am not well today.','Žao mi je.','I am sorry to hear that.','Žao mi je expresses sympathy here, rather than an apology for an action.'),
        exchange('Hvala na pomoći.','Thank you for your help.','Nema na čemu.','You are welcome.','Nema na čemu is a whole phrase to use after thanks.'),
        exchange('Moram da idem.','I have to go.','U redu. Čujemo se.','All right. We’ll be in touch.','Čujemo se is a natural way to close a friendly conversation.')
      ],
      scenes:[scene('Asking for clarification','You are speaking politely to someone who is helping you.',[0,1,3],'Nema na čemu.','You are welcome.'),scene('A friendly catch-up','Ask how your friend is, respond to changed plans and close the chat.',[4,5,9],'Vidimo se!','See you!')]
    }
  ];
  D.lessons.forEach(l=>l.level='beginner');
  D.levels=[{id:'beginner',title:'Beginner',description:'Letters, first words and simple sentences.'},{id:'intermediate',title:'Intermediate',description:'Short questions, everyday sentences and guided replies.'}];
  D.getLessons=level=>D.lessons.filter(l=>l.level===level);
  D.builders={}; D.dialogues={};
  const unique=items=>[...new Map(items.map(s=>[D.normalise(s),s])).values()];
  units.forEach(unit=>{
    const id=unit.id;
    const cards=unit.exchanges.map((r,i)=>({id:id+'-card-'+i,kind:'exchange',latin:r.question,label:r.question,english:r.questionEnglish,reply:r.reply,replyEnglish:r.english,note:r.note}));
    D.lessons.push({...unit,level:'intermediate',cards});
    D.quiz[id]=[]; D.practice[id]=[];
    unit.exchanges.forEach((r,i)=>{
      const meta={id:id+'-quiz-'+i+'-reply',category:'reply',optionsScript:'display',serbianSegments:[r.question]};
      const wrong=unique(unit.exchanges.filter((_,j)=>j!==i).map(x=>x.reply)).filter(s=>!unique([r.reply,...r.alternatives]).some(a=>D.normalise(a)===D.normalise(s))).slice(0,3);
      D.quiz[id].push([`Reply to “${r.question}” with “${r.english}”. Choose the matching Serbian reply.`,r.reply,wrong,`${r.reply} — ${r.english} ${r.note}`,meta]);
      const questionChoices=unique(unit.exchanges.filter((_,j)=>j!==i).map(x=>x.questionEnglish)).filter(s=>s!==r.questionEnglish).slice(0,3);
      D.quiz[id].push([`What does “${r.question}” mean?`,r.questionEnglish,questionChoices,`${r.question} — ${r.questionEnglish}`,{id:id+'-quiz-'+i+'-meaning',category:'understand-question',optionsScript:'english',serbianSegments:[r.question]}]);
      D.practice[id].push([`Reply to “${r.question}” with “${r.english}”.`,unique([r.reply,...r.alternatives]),r.note,{id:id+'-practice-'+i,category:'reply',optionsScript:'display',explanation:r.note,serbianSegments:[r.question]}]);
    });
    D.builders[id]=unit.exchanges.map((r,i)=>{
      const words=r.reply.split(/\s+/),key=s=>D.normalise(s).split(' ').sort().join(' ');
      return {id:id+'-build-'+i,category:'build',prompt:r.english,words,answers:unique([r.reply,...r.alternatives]).filter(s=>key(s)===key(r.reply)),hint:r.note};
    });
    D.dialogues[id]=unit.scenes.map((s,i)=>({...s,id:id+'-dialogue-'+i,steps:s.steps.map(index=>unit.exchanges[index])}));
    D.poolCounts[id]={quiz:D.quiz[id].length,practice:D.practice[id].length};
  });
  // Convert only the explicit Serbian spans, preserving the English instruction.
  D.formatPrompt=(prompt,segments=[],script='latin')=>{
    if(script!=='cyrillic'||!segments.length)return prompt;
    const escaped=unique(segments).sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    return prompt.replace(new RegExp(escaped.join('|'),'g'),s=>D.cyrillic(s));
  };
})();
