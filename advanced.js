(function () {
  'use strict';
  // Independent advanced content module. No changes to beginner/intermediate banks.
  // Ekavian Serbian; constrained example answers, not a free-form grammar grader.
  const D=window.Serbian;
  if(!D||!D.getLessons||!D.builders||!D.dialogues)throw new Error('Load the existing Serbian course before advanced.js');
  const x=(question,questionEnglish,reply,english,note,alternatives=[])=>({question,questionEnglish,reply,english,note,alternatives});
  const s=(title,setting,steps,closing,closingEnglish)=>({title,setting,steps,closing,closingEnglish});
  const units=[
    {
      id:'a-opinions',title:'Explain your point of view',serbian:'Izražavanje mišljenja',short:'Reasons, contrast & nuance',
      description:'State a position, support it with reasons, acknowledge drawbacks and respond respectfully.',
      tip:'Mislim da introduces a position; s jedne strane / s druge strane weighs both sides. Ne slažem se potpuno softens a disagreement.',
      patterns:[['Mislim da… zato što…','I think that… because…'],['S jedne strane… s druge strane…','On one hand… on the other…'],['Ipak / Međutim','Still / However']],
      exchanges:[
        x('Šta misliš o radu od kuće?','What do you think about working from home?','Mislim da je praktičan, ali nije za svakoga.','I think it is practical, but not for everyone.','Praktičan agrees with masculine rad (work). Ali gives a qualification.'),
        x('Zašto ti se dopada taj način rada?','Why do you like that way of working?','Dopada mi se zato što štedim vreme.','I like it because I save time.','Zato što introduces a reason. Dopada mi se is a useful alternative to sviđa mi se.'),
        x('Postoji li neka mana?','Is there a disadvantage?','S druge strane, može biti teško odvojiti posao od odmora.','On the other hand, separating work from rest can be difficult.','S druge strane introduces a counterpoint; odvojiti means to separate.'),
        x('Da li misliš da je javni prevoz važan?','Do you think public transport is important?','Smatram da je važan za ceo grad.','I consider it important for the whole city.','Smatram da is a slightly more formal way to introduce an opinion.'),
        x('Šta bi poboljšao u svom kraju?','What would you improve in your neighbourhood? (male speaker)','Poboljšao bih biciklističke staze.','I would improve the cycle paths. (male speaker)','Poboljšao bih uses a masculine conditional form.'),
        x('Kako bi objasnio svoj predlog?','How would you explain your proposal? (male speaker)','Tako bi više ljudi moglo bezbedno da putuje.','That way, more people could travel safely.','Tako bi introduces an expected consequence.'),
        x('Da li ti se dopada novi plan?','Do you like the new plan?','Uglavnom mi se dopada, mada imam jednu primedbu.','I mostly like it, although I have one concern.','Mada introduces a reservation without rejecting everything.'),
        x('U čemu se ne slažeš?','What do you disagree with?','Ne slažem se potpuno sa predloženim rokom.','I do not entirely agree with the proposed deadline.','Sa + instrumental follows slagati se: sa predloženim rokom.'),
        x('Možeš li da navedeš primer?','Can you give an example?','Na primer, prošli put nismo imali dovoljno vremena.','For example, last time we did not have enough time.','Na primer introduces evidence.'),
        x('Šta je glavni problem?','What is the main problem?','Glavni problem je nedostatak jasnih informacija.','The main problem is a lack of clear information.','Nedostatak takes a genitive complement: jasnih informacija.'),
        x('Ima li i dobrih strana?','Are there any positive sides too?','Naravno, prednost je što svi mogu da učestvuju.','Of course, an advantage is that everyone can participate.','Prednost je što introduces a positive consequence.'),
        x('Kako bi zaključio raspravu?','How would you conclude the discussion? (male speaker)','Ukratko, potrebno nam je više vremena za odluku.','In short, we need more time for the decision.','Ukratko signals a summary; potrebno nam je means we need.'),
        x('Šta kažeš na suprotno mišljenje?','What do you say to the opposing opinion?','Razumem taj stav, ali ga ne delim.','I understand that position, but I do not share it.','Ga refers back to masculine stav (position).'),
        x('Možemo li da se složimo bar oko nečega?','Can we at least agree on something?','Možemo se složiti da je razgovor koristan.','We can agree that discussion is useful.','Možemo se složiti is a natural concluding phrase.')
      ],
      scenes:[s('Two sides of remote work','A colleague asks for a balanced opinion about working from home.',[0,1,2],'Hvala na iskrenom mišljenju.','Thanks for your honest opinion.'),s('Discussing a city proposal','Explain a proposal, what it changes, and why it matters.',[3,4,5],'Razmotrićemo tvoj predlog.','We will consider your proposal.')]
    },
    {
      id:'a-story',title:'Tell a fuller story',serbian:'Pričanje o događajima',short:'Sequence, background & aspect',
      description:'Describe what was happening, what changed and what finally happened.',
      tip:'Dok introduces background action; kada often introduces an event. Imperfective and perfective verbs can contrast process and completed result.',
      patterns:[['Dok sam čekao…','While I was waiting… (male)'],['Čekao sam / Sačekao sam','I was waiting / I waited until it was done'],['Na kraju / U međuvremenu','In the end / Meanwhile']],
      exchanges:[
        x('Kako je počelo tvoje putovanje?','How did your trip begin? (male speaker)','Krenuo sam rano, ali je voz kasnio.','I set off early, but the train was delayed. (male speaker)','Krenuo sam marks setting off; kasnio describes the delay.'),
        x('Šta si radio dok si čekao?','What were you doing while you waited? (male speaker)','Dok sam čekao, čitao sam knjigu.','While I was waiting, I read a book. (male speaker)','Dok and imperfective forms give the background.'),
        x('Da li si na kraju stigao na vreme?','Did you eventually arrive on time? (male speaker)','Ne, stigao sam kasnije nego što sam planirao.','No, I arrived later than planned. (male speaker)','Stigao sam refers to the completed arrival; nego što compares times.'),
        x('Šta se dogodilo kada je počela kiša?','What happened when it started raining?','Svi su potrčali prema stanici.','Everyone ran towards the station.','Potrčali marks the start of running; prema takes the dative.'),
        x('Kako je bilo napolju pre kiše?','What was it like outside before the rain?','Duvao je vetar i nebo je bilo tamno.','The wind was blowing and the sky was dark.','Duvao je is background description.'),
        x('Šta se dogodilo posle?','What happened afterwards?','Posle nekoliko minuta kiša je prestala.','After a few minutes, the rain stopped.','Prestala is feminine because kiša is feminine.'),
        x('Da li si čitao tu knjigu?','Were you reading that book? (male speaker)','Jesam, čitao sam je cele nedelje.','Yes, I was reading it all week. (male speaker)','Čitao is imperfective; je refers to feminine knjiga.'),
        x('Da li si pročitao knjigu?','Did you finish reading the book? (male speaker)','Jesam, pročitao sam je sinoć.','Yes, I finished reading it last night. (male speaker)','Pročitao emphasises completed reading.'),
        x('U čemu je razlika između čitao i pročitao?','What is the difference between čitao and pročitao?','Čitao opisuje proces, a pročitao završen rezultat.','Čitao describes the process; pročitao describes a completed result.','Aspect is about how an action unfolds or reaches a boundary.'),
        x('Šta si prvo uradila po dolasku?','What did you do first upon arrival? (female speaker)','Prvo sam raspakovala kofer.','First I unpacked my suitcase. (female speaker)','Raspakovala is a feminine completed-action form.'),
        x('Šta si zatim radila?','What did you do next? (female speaker)','Zatim sam se odmarala i slušala muziku.','Then I rested and listened to music. (female speaker)','Odmarala and slušala describe activities after the arrival.'),
        x('Kako se završio taj dan?','How did that day end?','Na kraju smo zajedno večerali.','In the end, we had dinner together.','Na kraju closes a narrative.'),
        x('Jesi li ranije bio tamo?','Had you been there before? (male speaker)','Ne, do tada nikada nisam bio tamo.','No, I had never been there until then. (male speaker)','Do tada means up to that point in time.'),
        x('Kako bi opisao ceo doživljaj?','How would you describe the whole experience? (male speaker)','Iako je bilo naporno, mnogo sam naučio.','Although it was tiring, I learnt a lot. (male speaker)','Iako introduces an unexpected contrast.')
      ],
      scenes:[s('A delayed journey','Recount departure, the delay and arrival as a male speaker.',[0,1,2],'Drago mi je da si ipak stigao.','I am glad you arrived despite it.'),s('A sudden storm','Describe a sudden change in the weather and what followed.',[3,4,5],'Baš neobično iskustvo!','What an unusual experience!')]
    },
    {
      id:'a-conditional',title:'Possibilities & conditions',serbian:'Uslovi i mogućnosti',short:'If, would & alternatives',
      description:'Talk about hypothetical situations, make tactful suggestions and explain conditions.',
      tip:'Kad bih… expresses a hypothetical idea; ako… usually introduces a real possibility. Conditional participles agree with the speaker.',
      patterns:[['Kad bih imao vremena…','If I had time… (male)'],['Ako stignem…','If I manage to arrive…'],['Bilo bi bolje da…','It would be better if…']],
      exchanges:[
        x('Šta bi uradio da imaš slobodan dan?','What would you do if you had a day off? (male speaker)','Kad bih imao slobodan dan, otišao bih u prirodu.','If I had a day off, I would go into nature. (male speaker)','Imao and otišao are masculine; bih forms the hypothetical.'),
        x('A šta bi radila da imaš više vremena?','What would you do if you had more time? (female speaker)','Kad bih imala više vremena, učila bih još jedan jezik.','If I had more time, I would study another language. (female speaker)','Imala and učila are feminine conditional forms.'),
        x('Da li bi se preselio u drugi grad?','Would you move to another city? (male speaker)','Preselio bih se samo ako bih našao bolji posao.','I would move only if I found a better job. (male speaker)','Samo ako limits the condition; preselio and našao are masculine.'),
        x('Šta ćemo ako sutra bude padala kiša?','What will we do if it rains tomorrow?','Ako bude padala kiša, ostaćemo kod kuće.','If it rains, we will stay at home.','Ako introduces a real future condition.'),
        x('Možemo li da idemo ranije?','Can we leave earlier?','Mogli bismo da krenemo pola sata ranije.','We could set off half an hour earlier.','Mogli bismo makes a polite group suggestion.'),
        x('Zašto predlažeš raniji polazak?','Why do you suggest leaving earlier?','Tako bismo izbegli najveću gužvu.','That way we would avoid the worst traffic.','Bismo is the conditional auxiliary for we.'),
        x('Šta ako voz zakasni?','What if the train is late?','U tom slučaju pozvaću te čim saznam.','In that case I will call you as soon as I find out.','U tom slučaju means in that case; čim means as soon as.'),
        x('Pod kojim uslovom prihvataš ponudu?','Under what condition do you accept the offer?','Prihvatiću je pod uslovom da rok bude duži.','I will accept it provided that the deadline is longer.','Pod uslovom da gives a condition; je refers to feminine ponuda.'),
        x('Šta bi bilo bolje za sve?','What would be better for everyone?','Bilo bi bolje da unapred dogovorimo pravila.','It would be better to agree on the rules in advance.','Bilo bi bolje da is a polite recommendation.'),
        x('Da li postoji druga mogućnost?','Is there another possibility?','Ako to ne uspe, možemo pokušati drugačije.','If that does not work, we can try a different way.','Ako to ne uspe leaves room for another plan.'),
        x('Da li bi pomogao prijatelju?','Would you help a friend? (male speaker)','Naravno, pomogao bih mu kad god mogu.','Of course, I would help him whenever I can. (male speaker)','Mu is the short dative of on, to him.'),
        x('Šta bi trebalo prvo proveriti?','What should be checked first?','Najpre bi trebalo proveriti sve detalje.','First, all the details should be checked.','Trebalo bi is an impersonal conditional recommendation.'),
        x('Šta ako se predomisliš?','What if you change your mind?','Ako se predomislim, javiću ti na vreme.','If I change my mind, I will let you know in time.','Predomisliti se means change your mind; javiću is I will notify.'),
        x('Kako bi sažeo svoj savet?','How would you sum up your advice? (male speaker)','Na tvom mestu, prvo bih razgovarao s njima.','In your place, I would speak to them first. (male speaker)','Na tvom mestu is a common way of offering hypothetical advice.')
      ],
      scenes:[s('A day off','Imagine what you and a friend would do with more free time.',[0,1,2],'Zvuči kao dobar plan.','Sounds like a good plan.'),s('Plan B for tomorrow','Agree on a practical plan with changing weather and timing.',[3,4,5],'Dogovoreno, onda krećemo ranije.','Agreed, then we will leave earlier.')]
    },
    {
      id:'a-cases',title:'Connect people & places',serbian:'Padeži u kontekstu',short:'Cases in real sentences',
      description:'Use case forms naturally when describing destinations, relationships, objects and movement.',
      tip:'Rather than memorising charts alone, learn noun forms with their prepositions: od + genitive, sa + instrumental, o + locative, prema + dative.',
      patterns:[['Sa koleginicom / O koleginici','With a colleague / About a colleague'],['U kancelariji / U kancelariju','In the office / Into the office'],['Bez pomoći / Zbog gužve','Without help / Because of the crowd']],
      exchanges:[
        x('Za koga je ovaj poklon?','Who is this present for?','Ovaj poklon je za moju sestru.','This present is for my sister.','Za takes accusative: moju sestru.'),
        x('Od koga si dobio poruku?','Who did you get a message from? (male speaker)','Dobio sam poruku od starog prijatelja.','I received a message from an old friend. (male speaker)','Od takes genitive: starog prijatelja.'),
        x('Sa kim si razgovarao?','Who did you speak with? (male speaker)','Razgovarao sam sa novom koleginicom.','I spoke with a new female colleague. (male speaker)','Sa takes instrumental: novom koleginicom.'),
        x('O čemu ste razgovarali?','What did you talk about?','Razgovarali smo o važnom projektu.','We talked about an important project.','O takes locative: važnom projektu.'),
        x('Kuda ideš posle sastanka?','Where are you going after the meeting?','Posle sastanka idem u kancelariju.','After the meeting I am going into the office.','Posle takes genitive; movement into uses accusative kancelariju.'),
        x('Gde ćeš biti kasnije?','Where will you be later?','Kasnije ću biti u kancelariji.','Later I will be in the office.','Location with u takes locative: kancelariji.'),
        x('Kome treba da pošaljem odgovor?','To whom should I send the reply?','Pošalji odgovor našem profesoru.','Send the reply to our teacher.','The recipient takes dative: našem profesoru.'),
        x('Čime putuješ na posao?','What do you travel to work by?','Obično putujem autobusom.','I usually travel by bus.','Autobusom is instrumental without a preposition.'),
        x('Bez čega ne možeš da radiš?','What can you not work without?','Ne mogu da radim bez interneta.','I cannot work without the internet.','Bez takes genitive: interneta.'),
        x('Zbog čega ste zakasnili?','Why were you late? (group)','Zakasnili smo zbog velikog zastoja.','We were late because of a major delay.','Zbog takes genitive: velikog zastoja.'),
        x('Prema kome ste krenuli?','Towards whom did you set off? (group)','Krenuli smo prema našem vodiču.','We set off towards our guide.','Prema takes dative: našem vodiču.'),
        x('Koga ste sreli na stanici?','Who did you meet at the station?','Sreli smo našu komšinicu.','We met our female neighbour.','Direct object takes accusative: našu komšinicu.'),
        x('O kome govori ovaj članak?','Who is this article about?','Članak govori o poznatom piscu.','The article is about a famous writer.','O plus locative: poznatom piscu.'),
        x('Odakle si se upravo vratio?','Where have you just returned from? (male speaker)','Upravo sam se vratio iz biblioteke.','I have just returned from the library. (male speaker)','Iz takes genitive: biblioteke; vratio is masculine.')
      ],
      scenes:[s('A present and a message','Explain who a gift is for, where a message came from and whom you met.',[0,1,2],'Hvala na objašnjenju.','Thanks for explaining.'),s('Back at the office','Describe a meeting, a destination and a location.',[3,4,5],'Vidimo se u kancelariji.','See you at the office.')]
    },
    {
      id:'a-problems',title:'Handle unexpected problems',serbian:'Rešavanje problema',short:'Requests, changes & complaints',
      description:'Explain what went wrong, clarify expectations and negotiate a solution politely.',
      tip:'Da li biste mogli…? is a polite conditional request. Bilo bi mi važno… states a need without sounding confrontational.',
      patterns:[['Došlo je do greške.','There has been a mistake.'],['Da li biste mogli da…?','Would you be able to…?'],['Ako nije moguće…','If that is not possible…']],
      exchanges:[
        x('Šta nije u redu sa rezervacijom?','What is wrong with the reservation?','Rezervacija je napravljena za pogrešan datum.','The reservation was made for the wrong date.','Napravljena agrees with feminine rezervacija.'),
        x('Šta želite da promenimo?','What would you like us to change?','Da li biste mogli da je pomerite za petak?','Would you be able to move it to Friday?','Biste mogli is a polite conditional; je refers to rezervacija.'),
        x('Šta ako petak nije dostupan?','What if Friday is not available?','Ako petak nije slobodan, odgovarala bi mi subota.','If Friday is unavailable, Saturday would suit me.','Odgovarala bi mi has feminine agreement with subota.'),
        x('U čemu je problem sa porudžbinom?','What is the issue with the order?','Dobio sam pogrešan proizvod.','I received the wrong product. (male speaker)','Dobio is masculine; pogrešan proizvod is accusative.'),
        x('Da li imate račun?','Do you have the receipt?','Da, račun sam sačuvao.','Yes, I kept the receipt. (male speaker)','The object račun can be placed first for emphasis.'),
        x('Kako želite da rešimo problem?','How would you like us to resolve the issue?','Voleo bih zamenu ili povraćaj novca.','I would like an exchange or refund. (male speaker)','Voleo bih softens a request; povraćaj novca means refund.'),
        x('Šta se dogodilo na putu?','What happened on the journey?','Autobus se pokvario, pa sam propustio vezu.','The bus broke down, so I missed my connection. (male speaker)','Pa introduces the result; propustio is masculine.'),
        x('Da li možete da stignete danas?','Can you arrive today?','Nažalost, ne mogu da stignem pre večeri.','Unfortunately, I cannot arrive before evening.','Nažalost politely introduces disappointing news.'),
        x('Kako da Vas obavestimo?','How should we notify you? (polite)','Molim Vas, pošaljite mi potvrdu mejlom.','Please send me the confirmation by email.','Pošaljite is a polite imperative; mi is the recipient.'),
        x('Možete li da objasnite šta se dogodilo?','Could you explain what happened? (polite)','Došlo je do nesporazuma oko termina.','There was a misunderstanding about the appointment time.','Došlo je do takes genitive: nesporazuma.'),
        x('Kako možemo da izbegnemo novu grešku?','How can we avoid another mistake?','Predlažem da sve potvrdimo pisanim putem.','I suggest we confirm everything in writing.','Predlažem da introduces a recommendation.'),
        x('Da li je ponuđeno rešenje prihvatljivo?','Is the proposed solution acceptable?','Jeste, pod uslovom da nema dodatnih troškova.','Yes, provided that there are no extra costs.','Pod uslovom da introduces a necessary condition.'),
        x('Šta Vam je najvažnije?','What matters most to you? (polite)','Najvažnije mi je da znam tačan rok.','What matters most is knowing the exact deadline.','Najvažnije mi je da expresses priority.'),
        x('Kako ćete završiti razgovor?','How will you close the conversation? (polite)','Hvala Vam na pomoći i razumevanju.','Thank you for your help and understanding.','Na pomoći and razumevanju are locative after na in this phrase.')
      ],
      scenes:[s('A booking mistake','Politely correct the date of a reservation and suggest an alternative.',[0,1,2],'Proveriću šta možemo da uradimo.','I will check what we can do.'),s('Returning an order','Describe a mistake, provide your receipt and request a resolution as a male speaker.',[3,4,5],'Razumem, pogledajmo opcije.','I understand; let us look at the options.')]
    },
    {
      id:'a-reading',title:'Read between the lines',serbian:'Razumevanje teksta',short:'Notices, messages & inference',
      description:'Read short Serbian passages and identify facts, reasons, implications and tone.',
      tip:'Read the whole passage before answering. Signal words like međutim, zato and uprkos tome can change the conclusion.',
      patterns:[['Međutim','However — a contrast follows'],['Iako / Uprkos tome','Although / Despite that'],['Pre nego što / Čim','Before / As soon as']],
      exchanges:[
        x('„Prodavnica se zatvara u šest, ali subotom radi do osam.“ Kada radi duže?','The shop closes at six, but on Saturdays it is open until eight. When is it open longer?','Subotom radi duže.','It is open longer on Saturdays.','The contrast after ali changes Saturday hours.'),
        x('„Ulaz je besplatan za decu mlađu od dvanaest godina.“ Ko ne plaća ulaz?','Admission is free for children under twelve. Who does not pay?','Deca mlađa od dvanaest godina ne plaćaju.','Children under twelve do not pay.','Mlađu od sets an upper age boundary.'),
        x('„Zbog radova, autobus danas ne staje kod muzeja.“ Zašto autobus ne staje?','Because of roadworks, the bus does not stop at the museum today. Why?','Ne staje zbog radova.','It does not stop because of roadworks.','Zbog gives the reason.'),
        x('„Sastanak je pomeren na četvrtak jer direktor u sredu putuje.“ Kada je sastanak?','The meeting was moved to Thursday because the director travels Wednesday. When is it?','Sastanak je u četvrtak.','The meeting is on Thursday.','Pomeren means moved or rescheduled.'),
        x('„Molimo goste da potvrde dolazak do petka.“ Šta gosti treba da urade?','Guests are asked to confirm attendance by Friday. What should they do?','Treba da potvrde dolazak do petka.','They should confirm attendance by Friday.','Do petka is a deadline, not a starting time.'),
        x('„Ana je učila celu noć, ipak nije položila ispit.“ Da li je položila ispit?','Ana studied all night, yet she did not pass. Did she pass?','Ne, nije položila ispit.','No, she did not pass the exam.','Ipak signals a result contrary to expectation.'),
        x('„Iako je Marko bio umoran, završio je izveštaj.“ Šta je uradio?','Although Marko was tired, he finished the report. What did he do?','Završio je izveštaj.','He finished the report.','Iako contrasts tiredness with completion.'),
        x('„Karte su rasprodate, međutim postoje mesta za sutra.“ Kada ima mesta?','Tickets are sold out, but places remain for tomorrow. When are there places?','Mesta ima za sutra.','There are places for tomorrow.','Međutim introduces the available alternative.'),
        x('„Pošiljka stiže čim uplata bude potvrđena.“ Šta mora prvo da se dogodi?','The parcel arrives as soon as payment is confirmed. What must happen first?','Prvo mora biti potvrđena uplata.','First the payment must be confirmed.','Čim signals that one event follows another.'),
        x('„Prijave primamo samo putem interneta.“ Kako se podnosi prijava?','Applications are accepted online only. How do you apply?','Prijava se podnosi putem interneta.','You apply online.','Samo excludes other methods.'),
        x('„Milica je kupila kartu unapred da bi izbegla red.“ Zašto je kupila kartu ranije?','Milica bought a ticket in advance to avoid the queue. Why did she buy early?','Kupila ju je da bi izbegla red.','She bought it to avoid the queue.','Da bi introduces purpose; ju refers to kartu.'),
        x('„Ako želite povraćaj novca, sačuvajte račun.“ Šta je uslov?','If you want a refund, keep your receipt. What is the condition?','Morate da sačuvate račun.','You must keep the receipt.','The condition is keeping proof of purchase.'),
        x('„Radionica počinje u deset, ali učesnici treba da dođu ranije.“ Šta se očekuje?','The workshop starts at ten, but participants should arrive earlier. What is expected?','Očekuje se da učesnici dođu pre deset.','Participants are expected to arrive before ten.','Treba da dođu ranije asks participants to arrive before the start.'),
        x('„Petar je odbio ponudu zato što mu uslovi nisu odgovarali.“ Zašto je odbio ponudu?','Petar declined the offer because the terms did not suit him. Why?','Odbio ju je jer mu uslovi nisu odgovarali.','He declined it because the terms did not suit him.','Jer rephrases zato što; ju refers to ponudu.')
      ],
      scenes:[s('Notices around town','Read three notices and answer the questions in Serbian.',[0,1,2],'Odlično, razumeo si obaveštenja.','Excellent, you understood the notices.'),s('A work announcement','Extract the main facts from three short messages.',[3,4,5],'Hvala što si pažljivo pročitao.','Thanks for reading carefully.')]
    },
    {
      id:'a-expressions',title:'Sound more natural',serbian:'Prirodni izrazi',short:'Idioms, tone & register',
      description:'Recognise common spoken expressions, soften statements and respond in a natural register.',
      tip:'Idioms are best learnt as whole expressions. Notice context: nema veze can dismiss a small problem, while nema šanse expresses strong doubt.',
      patterns:[['Nema veze.','Never mind / It does not matter'],['Videćemo.','We will see — noncommittal'],['Koliko znam…','As far as I know…']],
      exchanges:[
        x('Izvini što kasnim pet minuta.','Sorry I am five minutes late.','Nema veze, tek sam stigao.','No problem, I only just arrived. (male speaker)','Nema veze politely brushes off a minor inconvenience.'),
        x('Hoćemo li sigurno uspeti?','Are we certain we will succeed?','Videćemo, još je rano da tvrdimo.','We will see; it is still too early to say.','Videćemo is less definite than da or ne.'),
        x('Da li znaš kad stiže voz?','Do you know when the train arrives?','Koliko znam, stiže oko podneva.','As far as I know, it arrives around noon.','Koliko znam signals qualified knowledge.'),
        x('Kako da objasnim da nisam siguran?','How do I say I am not certain?','Nisam sasvim siguran, ali proveriću.','I am not entirely sure, but I will check. (male speaker)','Sasvim softens the degree of certainty.'),
        x('Šta kažeš kad je neko odlično obavio posao?','What do you say when someone has done an excellent job?','Svaka čast, odlično si to uradio!','Well done, you did that brilliantly! (male addressee)','Svaka čast is idiomatic praise, not a literal every honour.'),
        x('Šta kažeš kad neko preteruje sa brigom?','What do you say when someone worries too much?','Nemoj da brineš unapred.','Do not worry in advance.','Nemoj da plus present gives an informal negative instruction.'),
        x('Da li ima šanse da završimo za pet minuta?','Is there any chance we will finish in five minutes?','Nema šanse, potrebno nam je više vremena.','No chance; we need more time.','Nema šanse is emphatic and informal.'),
        x('Kako ljubazno odbijaš poziv?','How do you politely decline an invitation?','Hvala na pozivu, ali ovog puta ne mogu.','Thank you for inviting me, but I cannot this time.','Ovog puta means this time; it avoids a permanent rejection.'),
        x('Kako kažeš da te nešto ne iznenađuje?','How do you say something does not surprise you?','To me uopšte ne iznenađuje.','That does not surprise me at all.','Uopšte ne strengthens a negative statement.'),
        x('Kako pokazuješ da razumeš sagovornika?','How do you show that you understand someone?','Razumem šta želiš da kažeš.','I understand what you are trying to say.','Šta želiš da kažeš is a natural way to acknowledge intent.'),
        x('Kako menjaš temu razgovora?','How do you change the subject?','Usput, jesam li ti rekao šta se dogodilo?','By the way, did I tell you what happened? (male speaker)','Usput can introduce a side note or new subject.'),
        x('Kako reaguješ na veoma dobru vest?','How do you react to very good news?','Baš mi je drago zbog tebe!','I am really happy for you!','Baš adds emphasis and warmth.'),
        x('Kako kažeš da nešto nije hitno?','How do you say that something is not urgent?','Nije hitno, može i sutra.','It is not urgent; tomorrow is fine too.','Može i sutra allows an alternative time.'),
        x('Kako da završim razgovor prijateljski?','How do I end a conversation warmly?','Čujemo se uskoro, pa ćemo se dogovoriti.','We will speak soon and make arrangements.','Čujemo se is a friendly idiomatic close.')
      ],
      scenes:[s('A small misunderstanding','Respond to an apology, uncertainty and a train question.',[0,1,2],'Dobro, onda ćemo proveriti.','All right, then we will check.'),s('Praise and reassurance','React naturally to good work and a worried friend.',[4,5,6],'Hvala, mnogo mi znači.','Thanks, that means a lot to me.')]
    },
    {
      id:'a-discussion',title:'Negotiate & reach agreement',serbian:'Dogovor i rasprava',short:'Longer useful exchanges',
      description:'Make proposals, explain trade-offs, ask clarifying questions and summarise an agreement.',
      tip:'Keep track of who does what, by when and under which conditions. A tactful question is often more effective than a blunt command.',
      patterns:[['Da razjasnimo…','Let us clarify…'],['Pod uslovom da…','Provided that…'],['Dakle, dogovorili smo se…','So, we have agreed…']],
      exchanges:[
        x('Možemo li da pomerimo rok?','Can we move the deadline?','Mogli bismo, ali prvo moramo da proverimo raspored.','We could, but first we need to check the schedule.','Mogli bismo is a tentative suggestion; prvo introduces priority.'),
        x('Šta bi trebalo da proverimo?','What should we check?','Treba da proverimo koliko nam vremena preostaje.','We should check how much time we have left.','Koliko nam vremena preostaje is an embedded question.'),
        x('Koji bi bio sledeći korak?','What would be the next step?','Predlažem da sutra ponovo razgovaramo.','I suggest we talk again tomorrow.','Predlažem da is constructive and direct.'),
        x('Nije mi jasno šta podrazumevaš pod tim.','I am not sure what you mean by that.','Da razjasnimo: mislim na troškove, a ne na vreme.','To clarify, I mean costs, not time.','A ne highlights the contrast between two topics.'),
        x('Možemo li da smanjimo troškove?','Can we reduce costs?','Možemo, pod uslovom da ne ugrozimo kvalitet.','We can, provided that we do not compromise quality.','Ne ugrozimo is the negative present form in the condition.'),
        x('Kako možemo da zaštitimo kvalitet?','How can we protect quality?','Dogovorićemo jasne korake za proveru.','We will agree on clear steps for checking.','Dogovorićemo is first-person plural future.'),
        x('Da li ti odgovara ovaj predlog?','Does this proposal suit you?','U principu da, ali bih promenio jedan detalj.','In principle yes, but I would change one detail. (male speaker)','U principu da is a qualified acceptance.'),
        x('Koji detalj bi promenio?','Which detail would you change? (male addressee)','Promenio bih redosled dva zadatka.','I would change the order of two tasks. (male speaker)','Redosled means order or sequence.'),
        x('Zašto bi to bilo bolje?','Why would that be better?','Zato što bismo ranije otkrili moguće greške.','Because we would discover potential errors earlier.','Bismo is the we conditional auxiliary.'),
        x('Da li svi razumeju dogovor?','Does everyone understand the agreement?','Hajde da ponovimo ko je za šta odgovoran.','Let us repeat who is responsible for what.','Hajde da introduces a shared action.'),
        x('Šta smo tačno odlučili?','What exactly have we decided?','Odlučili smo da prvo završimo najvažnije zadatke.','We decided to finish the most important tasks first.','Najvažnije is a superlative adjective.'),
        x('Ko će poslati završnu verziju?','Who will send the final version?','Ja ću je poslati čim svi daju saglasnost.','I will send it once everyone gives approval.','Je refers to feminine verzija; čim marks a timing condition.'),
        x('Kako ćemo znati da je sve završeno?','How will we know everything is finished?','Sve će biti završeno kada dobijemo potvrdu.','Everything will be finished when we receive confirmation.','Kada introduces the expected completion condition.'),
        x('Možeš li da sažmeš naš dogovor?','Can you summarise our agreement?','Dakle, prvo proveravamo detalje, a zatim donosimo odluku.','So, first we check the details, then we decide.','Dakle introduces the conclusion; zatim gives the second step.')
      ],
      scenes:[s('Renegotiating a deadline','Work with a colleague on a realistic revised deadline.',[0,1,2],'Dogovoreno, čujemo se sutra.','Agreed, speak tomorrow.'),s('Budget and quality','Ask what a proposal means, discuss cost and protect quality.',[3,4,5],'Hvala, sada je jasnije.','Thanks, it is clearer now.')]
    }
  ];
  const unique=list=>[...new Map(list.map(item=>[D.normalise(item),item])).values()];
  const choices=(rows,field,current,excludedMeaning)=>{
    const found=unique(rows.filter(r=>r!==current&&(!excludedMeaning||D.normalise(r.english)!==D.normalise(current.english))).map(r=>r[field]));
    const wrong=found.filter(value=>D.normalise(value)!==D.normalise(current[field])).slice(0,3);
    if(wrong.length!==3)throw new Error('Advanced needs three distinct distractors for '+current.question);
    return wrong;
  };
  if(D.levels.some(level=>level.id==='advanced'))throw new Error('Advanced level loaded twice');
  D.levels.push({id:'advanced',title:'Advanced',description:'Real-world discussion, nuanced replies and longer comprehension (towards B2).'});
  for(const unit of units){
    const id=unit.id,rows=unit.exchanges;
    if(rows.length<13)throw new Error('Advanced test requires at least thirteen examples per lesson: '+id);
    const cards=rows.map((r,i)=>({id:id+'-card-'+i,kind:'exchange',latin:r.question,label:r.question,english:r.questionEnglish,reply:r.reply,replyEnglish:r.english,note:r.note}));
    D.lessons.push({...unit,level:'advanced',cards});
    D.quiz[id]=[];D.practice[id]=[];
    rows.forEach((r,i)=>{
      const base=id+'-quiz-'+i;
      const prompt='Reply to “'+r.question+'” with “'+r.english+'”. Choose the matching Serbian reply.';
      D.quiz[id].push([prompt,r.reply,choices(rows,'reply',r,true),r.reply+' — '+r.english+' '+r.note,{id:base+'-reply',category:'reply',optionsScript:'display',serbianSegments:[r.question]}]);
      D.quiz[id].push(['What does “'+r.question+'” mean?',r.questionEnglish,choices(rows,'questionEnglish',r),r.questionEnglish+' '+r.note,{id:base+'-question',category:'understand-question',optionsScript:'english',serbianSegments:[r.question]}]);
      D.quiz[id].push(['In this exchange, what does “'+r.reply+'” mean?',r.english,choices(rows,'english',r),r.reply+' — '+r.english,{id:base+'-meaning',category:'understand-reply',optionsScript:'english',serbianSegments:[r.reply]}]);
      D.practice[id].push(['Reply to “'+r.question+'” with “'+r.english+'”.',unique([r.reply,...r.alternatives]),r.note,{id:id+'-practice-'+i,category:'reply',optionsScript:'display',explanation:r.note,serbianSegments:[r.question]}]);
    });
    D.builders[id]=rows.map((r,i)=>{
      const words=r.reply.split(/\s+/),wordKey=value=>D.normalise(value).split(' ').sort().join(' ');
      const answers=unique([r.reply,...r.alternatives]).filter(value=>wordKey(value)===wordKey(r.reply));
      return {id:id+'-build-'+i,category:'build',prompt:r.english,words,answers,hint:r.note};
    });
    D.dialogues[id]=unit.scenes.map((scene,i)=>({...scene,id:id+'-dialogue-'+i,steps:scene.steps.map(index=>rows[index])}));
    D.poolCounts[id]={quiz:D.quiz[id].length,practice:D.practice[id].length};
  }
  D.advancedVersion=1;
})();
