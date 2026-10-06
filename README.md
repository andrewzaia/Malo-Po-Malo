# Malo Po Malo · Serbian practice

A beginner and intermediate Serbian practice website, ready for GitHub Pages. No installation, build command, database, or API keys are needed.

## Files to upload

Upload all thirteen files directly to the root of your repository:

| File | Purpose |
| --- | --- |
| `index.html` | Website entry page |
| `styles.css` | Desktop and mobile styling |
| `data.js` | Beginner lessons, reference cards and question banks |
| `intermediate.js` | Eight intermediate lessons and model exchanges |
| `intermediate-bank.js` | Expanded intermediate quiz, typing and sentence-building banks |
| `intermediate-ui.js` | Intermediate examples, sentence builder and guided conversations |
| `app.js` | Cards, quizzes, practice and immediate feedback |
| `test.js` | Password gate, timed test and results |
| `pdf-font.js` | Embedded Latin/Cyrillic PDF font |
| `pdf-export.js` | Downloadable PDF review |
| `FONT-LICENSE.txt` | Embedded font licence |
| `.nojekyll` | Serves the static site without a Jekyll build |
| `README.md` | This setup guide |

Keep their filenames unchanged and keep the ten website files together. Extract the ZIP first: upload its contents, rather than the ZIP or an enclosing folder. `index.html` must appear in your repository's top-level file list.

## Publish on GitHub Pages

1. Create or open a GitHub repository, for example `malo-po-malo`. GitHub Free requires a public repository for Pages.
2. Use **Add file → Upload files** to upload the thirteen extracted files, then commit them to `main`. A Git client can also copy, commit and push these files into your repository.
3. Open **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select **main** (or the branch containing your upload) and **/(root)**, then click **Save**.
5. Wait for publication, then use **Visit site** on the Pages settings screen. It can take up to 10 minutes.

For a repository named `malo-po-malo`, the usual address is `https://YOUR-USERNAME.github.io/malo-po-malo/`. Replace the username with yours. The asset paths support both project URLs and a `YOUR-USERNAME.github.io` repository at the domain root.

Once Pages is enabled, changes committed to its selected branch publish automatically. This bundle contains no custom deployment workflow. The optional `tests/` folder contains developer checks and is not needed to run the website.

If `.nojekyll` is hidden or missing after uploading, use **Add file → Create new file**, name it `.nojekyll`, and commit it with no content. The leading dot is part of its name.

## Access and search indexing

This exported copy has no secure login. The test password is a simple browser-side access word. A standard GitHub Pages deployment is public, including when it is built from a private repository. The existing private Sites website is separate and is unchanged by this export.

The HTML keeps `<meta name="robots" content="noindex,nofollow">`. This asks search engines not to index the page; it does not restrict access. Remove that tag only if you want search indexing.

## Included practice

- Five beginner lessons: alphabet, numbers, pronouns, forms of “to be”, and basic conversation.
- Eight compact intermediate lessons, 80 model exchanges, 11,503 quiz questions, 3,919 typing exercises, 3,819 sentence builders and 16 guided conversations.
- Separate Beginner / Intermediate navigation, daily mixes and 100-question tests.
- The beginner course retains its 168 reference cards, 9,007 quiz questions, and 6,814 typing exercises.
- Latin/Cyrillic switching, answer reveals, hints, and immediate feedback.
- Five-question quizzes and eight-question typing or daily mixed rounds.
- The updated completion review with question cards and labelled correct answers.
- Password-gated 100-question beginner tests: 20 questions per topic, one minute each, immediate results and a downloadable PDF review.

Open `index.html` locally to practise before publishing. Active rounds and timed tests reset on reload. Completed lesson rounds and the last level, lesson and script are saved in this browser when local storage is available. Pronunciation cues are approximate English guides.

## Expanded combinations

| Category | Quiz questions | Typing exercises |
| --- | ---: | ---: |
| Alphabet | 1,935 | 1,373 |
| Numbers | 1,885 | 1,483 |
| Pronouns | 1,420 | 1,410 |
| To be | 2,642 | 1,912 |
| Conversation | 1,125 | 636 |

Practise letter pairs, word spelling and letter counts; numbers 0–100, forward/backward sequences, simple sums and separate code digits; named groups, speaker/listener viewpoints and noun gender; positive/negative/question sentences across twelve locations with today/now variations; café requests, directions and combined greeting/name/country introductions. The original 1,000 and 10,000 cards remain included. New sentence builders and everyday phrases have reference cards. Quizzes still draw five questions, typing rounds eight, and tests twenty per category. Exact repeated quiz prompts are removed.

## Intermediate course

This is a focused bridge after the beginner lessons. Each lesson keeps ten model exchanges and two guided conversations with three learner replies each. A much larger practice bank adds everyday combinations of people, routines, time, locations, requests and replies without moving into advanced grammar.

| Lesson | Focus |
| --- | --- |
| Questions & replies | Full answers, family details and asking back |
| Daily life | Common present verbs, routines and one extra detail |
| Places & directions | Fixed location/destination pairs and simple directions |
| Everyday requests | Ordering, prices, help and polite requests |
| Plans & invitations | Accepting, declining and a few useful future phrases |
| Yesterday & the weekend | Familiar past phrases with clear male/female speaker instructions |
| Opinions & reasons | Preferences, feelings, agreement and simple reasons |
| Keep the chat going | Repetition, clarification, reactions and closing |

### Expanded intermediate banks

| Lesson | Quiz questions | Typing exercises | Sentence builders |
| --- | ---: | ---: | ---: |
| Questions & replies | 839 | 266 | 267 |
| Daily life | 1,991 | 602 | 599 |
| Places & directions | 1,632 | 554 | 526 |
| Everyday requests | 564 | 245 | 245 |
| Plans & invitations | 2,921 | 1,014 | 944 |
| Yesterday & the weekend | 2,230 | 678 | 678 |
| Opinions & reasons | 536 | 214 | 214 |
| Keep the chat going | 790 | 346 | 346 |
| **Total** | **11,503** | **3,919** | **3,819** |

The original intermediate bank contained 160 quiz questions and 80 exercises in each writing mode. This update provides over 71 times as many quiz questions and over 47 times as many exercises in each writing mode. Exact repeated quiz and typing prompts are removed across intermediate lessons; repeated sentence-builder meanings are removed within each lesson. A bank rotates through its questions before starting again.

New situations include family names and ages, language skills, daily habits, transport, café and shop requests, prices, invitations, alternative days, short past replies, preferences, reasons and requests for clarification. Reviewed verb forms and fixed noun/place phrases supply the variations. The bank checks specified meanings; it does not grade unrestricted answers.

The course practises short everyday exchanges. Detailed case paradigms, systematic verbal aspect, conditionals, advanced tenses, idioms and extended discussions are reserved for a later Advanced course.

**Reference cards** show a question and a revealable model reply. **Quick quiz** mixes understanding questions, understanding replies, matching a specified reply and completing a missing word in a reply. **Type & practise** asks for a specific English meaning and accepts reviewed Serbian alternatives. **Build sentences** uses word tiles in five-sentence rounds. **Conversations** first shows a model dialogue, then asks you to type three guided replies. English translations can be shown or hidden for the examples and dialogues.

Both Serbian scripts work for typed answers. Case, quotation styles and punctuation are ignored; Serbian letter marks are checked. Reply checking uses a finite list of taught answers, so it does not assess unrestricted conversation. Sentence builders accept the taught alternatives that use exactly the supplied words. Hints and reveals do not count as first-try answers.

Completed rounds are saved on this device. Active rounds start fresh on reload. Browser storage can be unavailable in private or restricted browsing; the site still runs for that visit. Switching levels resets the current round and previous test report; download a test report before switching levels.

Grammar reference checks: [present tense](https://www.studyserbian.com/proba/grammar/werb_tense_pdf/serbian-present-am-verbs.pdf), [past forms and agreement](https://www.studyserbian.com/proba/grammar/werb_tense_pdf/serbian-past-tense.pdf), [da + present constructions](https://www.studyserbian.com/proba/grammar/Word_Order_Decl.asp), [future forms](https://www.studyserbian.com/proba/grammar/werb_tense_pdf/serbian-future-tense.pdf), and [age phrases](https://cro-srb-languages.com/zovem-se-tamara/). These are supporting references; all intermediate examples, word lists and sentence frames are authored for this course. The expanded banks combine those reviewed frames and remove repeated prompts.

## Timed test

Choose your level, then **Testing**, and enter `napred` to begin. Beginner tests use 20 questions per lesson. Intermediate tests use 12 or 13 distinct questions from each of the eight lessons, for 100 total; the four lessons with 13 questions rotate randomly. Questions and results always belong to the selected level. The word is trimmed and case-insensitive. Change `TEST_WORD` near the top of `test.js` if you want another word. Since GitHub Pages serves public static files, this is a convenience gate, not secure authentication.

Each question starts with 60 seconds. Submit one answer; the next question starts immediately with a fresh minute. Timeouts are marked missed and advance automatically. The clock continues in the background and catches up after sleep or a delayed browser callback. Reloading resets the test, so keep the page open. **End test early** marks every remaining question missed.

At completion, review your score out of 100, correct/incorrect/missed counts, time, and lesson breakdown. Expand individual questions to see your answer, the correct answer and explanation, or filter to questions needing review. **Download results PDF** exports all 100 results with Serbian letters in both scripts. On mobile, your browser may open the PDF before you save or share it. Results stay in the current page; no external service receives them.

## If the page does not load

Check that `index.html` is at the repository root, all ten website files are uploaded, and Pages points to the branch you used and **/(root)**. For publication errors, inspect the repository's **Actions** tab. For missing styling, confirm the exact name `styles.css`; filenames are case-sensitive on the host.

## Official GitHub instructions

- [Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

The beginner website files match the expanded Serbian version. All 9,007 quiz questions and 6,814 typing exercises passed bank validation, including distinct prompts/IDs, both scripts, full question rotation and independent spelling/agreement examples. ZIP integrity, local asset references, and serving from a repository-style subdirectory were checked. Timing, scoring, both scripts, PDF download and existing lesson interactions passed programmatic checks. PDF text and rendered pages were checked. Browser visual testing of the website was unavailable.


## Developer checks

The site itself has no dependencies or build step. With Node.js available, run:

```sh
node --test tests/course-bank.test.cjs
```

For DOM interaction regression checks, install the development-only `linkedom` package and run:

```sh
npm install --no-save --package-lock=false linkedom
node --test tests/site-flow.test.cjs
```

The bank checks cover unchanged beginner counts, distinct options/prompts/IDs, consistent translations, all-bank rotation, both scripts, correct word tiles, intermediate totals and independent agreement/age/location/past/future examples. The DOM checks cover level isolation, both scripts, exercise events, saved progress, test scoring/timing, and the PDF generator. They are not browser layout or pronunciation checks. Tests are not an assessment of unrestricted writing or a CEFR certification.
