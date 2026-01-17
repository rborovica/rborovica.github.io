# Danais Lab Website

This site is built with Jekyll. All editable content lives in YAML files under `_data/`.
The `_sections/*.md` files are just wrappers that include HTML templates from `_includes/sections/`.

## Where to edit content

- Hero: `_data/hero.yml`
- About: `_data/about.yml`
- News: `_data/news.yml`
- Projects: `_data/projects.yml`
- People: `_data/people.yml`
- Publications: `_data/publications.yml`
- Sponsors: `_data/sponsors.yml`
- Contact: `_data/contact.yml`
- Footer: `_data/footer.yml`

## Examples

### Add a person
Edit `_data/people.yml` and append to a group.

```yml
  - title: "Current Members"
    people:
      - name: "New Student"
        title: "PhD Student (2025-)"
        note: "Co-supervised with A. Advisor."
        url: "https://example.com"
        image: "images/people/new-student.jpg"
        initials: "NS"
```

### Add a project
Edit `_data/projects.yml` and append to `projects`.

```yml
projects:
  - title: "New Project Title"
    text: "One-sentence description of the project."
```

### Add a publication
Edit `_data/publications.yml`. Add a new entry under the correct year.

```yml
years:
  - year: 2025
    entries:
      - venue: "SIGMOD"
        title: "Paper title here"
        authors: "A. Author, B. Author, and C. Author"
        links:
          - label: "PDF"
            url: "https://example.com/paper.pdf"
          - label: "BibTex"
            url: "https://example.com/paper.bib"
        note: "(to appear)"
```

## Local preview

From the repo root:

```bash
bundle exec jekyll serve
```
