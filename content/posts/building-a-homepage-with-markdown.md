---
title: Building a homepage with local Markdown
date: 2026-05-27
summary: A small note on why local markdown posts feel like the simplest workflow for a personal site.
coverImage: /images/contents/blog-500-paid-users.jpg
tags:
  - notes
  - markdown
published: true
---

Writing posts as local Markdown files keeps the workflow simple: open the repo, add a file, commit, and deploy.

## Why I like this approach

- The content stays with the code.
- The format is easy to edit.
- The site can stay fast with static generation.

> A personal website feels better when writing is as frictionless as editing a note.

## A tiny publishing flow

1. Create a file inside `content/posts`.
2. Add frontmatter for title, date and summary.
3. Write the body in Markdown.
4. Deploy the site.

Here is the only structure I really need:

```md
---
title: My post
date: 2026-05-27
summary: A short summary.
coverImage: /images/contents/blog-500-paid-users.jpg
published: true
---
```

Readability matters more to me than fancy tooling. Markdown is enough for most blog posts, and it keeps the site easy to maintain.
