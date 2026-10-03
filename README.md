# Malo po malo · Serbian practice

A beginner Serbian practice website, ready for GitHub Pages. No installation, build command, database, or API keys are needed.

## Files to upload

Upload all ten files directly to the root of your repository:

| File | Purpose |
| --- | --- |
| `index.html` | Website entry page |
| `styles.css` | Desktop and mobile styling |
| `data.js` | Lessons, reference cards and question banks |
| `app.js` | Cards, quizzes, practice and immediate feedback |
| `test.js` | Password gate, timed test and results |
| `pdf-font.js` | Embedded Latin/Cyrillic PDF font |
| `pdf-export.js` | Downloadable PDF review |
| `FONT-LICENSE.txt` | Embedded font licence |
| `.nojekyll` | Serves the static site without a Jekyll build |
| `README.md` | This setup guide |

Keep their filenames unchanged and keep the seven website files together. Extract the ZIP first: upload its contents, rather than the ZIP or an enclosing folder. `index.html` must appear in your repository's top-level file list.

## Publish on GitHub Pages

1. Create or open a GitHub repository, for example `malo-po-malo`. GitHub Free requires a public repository for Pages.
2. Use **Add file → Upload files** to upload the ten extracted files, then commit them to `main`. A Git client can also copy, commit and push these files into your repository.
3. Open **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select **main** (or the branch containing your upload) and **/(root)**, then click **Save**.
5. Wait for publication, then use **Visit site** on the Pages settings screen. It can take up to 10 minutes.

For a repository named `malo-po-malo`, the usual address is `https://YOUR-USERNAME.github.io/malo-po-malo/`. Replace the username with yours. The asset paths support both project URLs and a `YOUR-USERNAME.github.io` repository at the domain root.

Once Pages is enabled, changes committed to its selected branch publish automatically. This bundle contains no custom deployment workflow.

If `.nojekyll` is hidden or missing after uploading, use **Add file → Create new file**, name it `.nojekyll`, and commit it with no content. The leading dot is part of its name.

## Access and search indexing

This exported copy has no secure login. The test password is a simple browser-side access word. A standard GitHub Pages deployment is public, including when it is built from a private repository. The existing private Sites website is separate and is unchanged by this export.

The HTML keeps `<meta name="robots" content="noindex,nofollow">`. This asks search engines not to index the page; it does not restrict access. Remove that tag only if you want search indexing.

## Included practice

- Five lessons: alphabet, numbers, pronouns, forms of “to be”, and basic conversation.
- 168 reference cards, 9,007 quiz questions, and 6,814 typing exercises.
- Latin/Cyrillic switching, answer reveals, hints, and immediate feedback.
- Five-question quizzes and eight-question typing or daily mixed rounds.
- The updated completion review with question cards and labelled correct answers.
- Password-gated 100-question tests: 20 questions per topic, one minute each, immediate results and a downloadable PDF review.

Open `index.html` locally to practise before publishing. Session progress resets on reload. Pronunciation cues are approximate English guides.

## Expanded combinations

| Category | Quiz questions | Typing exercises |
| --- | ---: | ---: |
| Alphabet | 1,935 | 1,373 |
| Numbers | 1,885 | 1,483 |
| Pronouns | 1,420 | 1,410 |
| To be | 2,642 | 1,912 |
| Conversation | 1,125 | 636 |

Practise letter pairs, word spelling and letter counts; numbers 0–100, forward/backward sequences, simple sums and separate code digits; named groups, speaker/listener viewpoints and noun gender; positive/negative/question sentences across twelve locations with today/now variations; café requests, directions and combined greeting/name/country introductions. The original 1,000 and 10,000 cards remain included. New sentence builders and everyday phrases have reference cards. Quizzes still draw five questions, typing rounds eight, and tests twenty per category. Exact repeated quiz prompts are removed.

## Timed test

Choose **Testing** and enter `napred` to begin. The word is trimmed and case-insensitive. Change `TEST_WORD` near the top of `test.js` if you want another word. Since GitHub Pages serves public static files, this is a convenience gate, not secure authentication.

Each question starts with 60 seconds. Submit one answer; the next question starts immediately with a fresh minute. Timeouts are marked missed and advance automatically. The clock continues in the background and catches up after sleep or a delayed browser callback. Reloading resets the test, so keep the page open. **End test early** marks every remaining question missed.

At completion, review your score out of 100, correct/incorrect/missed counts, time, and lesson breakdown. Expand individual questions to see your answer, the correct answer and explanation, or filter to questions needing review. **Download results PDF** exports all 100 results with Serbian letters in both scripts. On mobile, your browser may open the PDF before you save or share it. Results stay in the current page; no external service receives them.

## If the page does not load

Check that `index.html` is at the repository root, all seven website files are uploaded, and Pages points to the branch you used and **/(root)**. For publication errors, inspect the repository's **Actions** tab. For missing styling, confirm the exact name `styles.css`; filenames are case-sensitive on the host.

## Official GitHub instructions

- [Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

The website files match the expanded Serbian version. All 9,007 quiz questions and 6,814 typing exercises passed bank validation, including distinct prompts/IDs, both scripts, full question rotation and independent spelling/agreement examples. ZIP integrity, local asset references, and serving from a repository-style subdirectory were checked. Timing, scoring, both scripts, PDF download and existing lesson interactions passed programmatic checks. PDF text and rendered pages were checked. Browser visual testing of the website was unavailable.
