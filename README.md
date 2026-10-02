# Malo po malo · Serbian practice

A beginner Serbian practice website, ready for GitHub Pages. No installation, build command, database, or API keys are needed.

## Files to upload

Upload all six files directly to the root of your repository:

| File | Purpose |
| --- | --- |
| `index.html` | Website entry page |
| `styles.css` | Desktop and mobile styling |
| `data.js` | Lessons, reference cards and question banks |
| `app.js` | Cards, quizzes, practice and immediate feedback |
| `.nojekyll` | Serves the static site without a Jekyll build |
| `README.md` | This setup guide |

Keep their filenames unchanged and keep the four website files together. Extract the ZIP first: upload its contents, rather than the ZIP or an enclosing folder. `index.html` must appear in your repository's top-level file list.

## Publish on GitHub Pages

1. Create or open a GitHub repository, for example `malo-po-malo`. GitHub Free requires a public repository for Pages.
2. Use **Add file → Upload files** to upload the six extracted files, then commit them to `main`. A Git client can also copy, commit and push these files into your repository.
3. Open **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select **main** (or the branch containing your upload) and **/(root)**, then click **Save**.
5. Wait for publication, then use **Visit site** on the Pages settings screen. It can take up to 10 minutes.

For a repository named `malo-po-malo`, the usual address is `https://YOUR-USERNAME.github.io/malo-po-malo/`. Replace the username with yours. The asset paths support both project URLs and a `YOUR-USERNAME.github.io` repository at the domain root.

Once Pages is enabled, changes committed to its selected branch publish automatically. This bundle contains no custom deployment workflow.

If `.nojekyll` is hidden or missing after uploading, use **Add file → Create new file**, name it `.nojekyll`, and commit it with no content. The leading dot is part of its name.

## Access and search indexing

This exported copy has no login. A standard GitHub Pages deployment is public, including when it is built from a private repository. The existing private Sites website is separate and is unchanged by this export.

The HTML keeps `<meta name="robots" content="noindex,nofollow">`. This asks search engines not to index the page; it does not restrict access. Remove that tag only if you want search indexing.

## Included practice

- Five lessons: alphabet, numbers, pronouns, forms of “to be”, and basic conversation.
- 109 reference cards, 882 quiz questions, and 595 typing exercises.
- Latin/Cyrillic switching, answer reveals, hints, and immediate feedback.
- Five-question quizzes and eight-question typing or daily mixed rounds.
- The updated completion review with question cards and labelled correct answers.

Open `index.html` locally to practise before publishing. Session progress resets on reload. Pronunciation cues are approximate English guides.

## If the page does not load

Check that `index.html` is at the repository root, all four website files are uploaded, and Pages points to the branch you used and **/(root)**. For publication errors, inspect the repository's **Actions** tab. For missing styling, confirm the exact name `styles.css`; filenames are case-sensitive on the host.

## Official GitHub instructions

- [Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

The website files match the latest exported version. ZIP integrity, local asset references, and serving from a repository-style subdirectory were checked. This ZIP has not been uploaded or published to GitHub.
