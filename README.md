# Jez.Dev — Portfolio Website

Personal portfolio website of **Jezreel D. Busico**, a Full-Stack Developer based in Cebu City, Philippines. Built as a single-page application using vanilla HTML, CSS, and JavaScript — no build tools or frameworks required.

---

## Features

- **Dark / Light mode** — toggled with a button, persisted via `localStorage`, applied before paint to prevent flash
- **Animated loading screen** — hexagonal CSS spinner on initial load
- **Typing effect** — cycles through role phrases in the hero section
- **Scroll reveal animations** — elements fade in on scroll using `IntersectionObserver`
- **Animated skill bars** — proficiency bars fill to their percentage when scrolled into view
- **Project filter tabs** — filter project cards by category (All / Web / Mobile / Backend) with live count badges
- **Case study modals** — detailed modal per project with overview, challenge, contributions, outcome, and tech stack tags
- **Contact form** — sends email via EmailJS when configured; falls back to a demo animation otherwise
- **Resume download** — triggers a direct PDF download from the browser
- **Responsive layout** — mobile-friendly with hamburger nav menu
- **Active nav highlighting** — nav links update as you scroll through sections
- **Back-to-top button** — appears after scrolling 400px

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 + [Tailwind CSS](https://tailwindcss.com) (CDN) |
| Scripting | Vanilla JavaScript (ES6) |
| Icons | [Font Awesome 6.5](https://fontawesome.com) (CDN) |
| Fonts | DM Serif Display, DM Sans, JetBrains Mono (Google Fonts) |
| Email | [EmailJS](https://www.emailjs.com) Browser SDK v4 |
| Hosting | [Vercel](https://vercel.com) |

No npm, no bundler, no build step — fully static.

---

## Project Structure

```
Jez.Dev/
├── index.html              # Single-page markup (all sections)
├── config/
│   ├── config.example.js   # EmailJS credentials template (safe to commit)
│   ├── config.js           # Real credentials — gitignored, do not commit
│   └── README.md           # EmailJS setup instructions
└── src/
    ├── styles.css          # All custom CSS, dark mode, and animations
    ├── script.js           # All JavaScript logic
    ├── data.js             # Case study content (CS_DATA object)
    └── files/
        └── Busico_Jezreel_Developer(CBU).pdf   # Downloadable resume
```

---

## Local Setup

This is a static site — no installation needed.

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Jez.Dev
   ```

2. Open `index.html` directly in a browser, or serve it locally:
   ```bash
   # Python
   python3 -m http.server 8000

   # Node (npx)
   npx serve .
   ```

3. Visit `http://localhost:8000`.

---

## EmailJS Configuration

The contact form requires EmailJS credentials to send real emails.

1. Copy the example config:
   ```bash
   cp config/config.example.js config/config.js
   ```

2. Edit `config/config.js` and fill in your credentials from the [EmailJS dashboard](https://www.emailjs.com):
   ```js
   const EMAIL_CONFIG = {
     PUBLIC_KEY:  'your_public_key',
     SERVICE_ID:  'your_service_id',
     TEMPLATE_ID: 'your_template_id'
   };
   ```

3. `config/config.js` is gitignored — never commit it.

If `config.js` is absent, the form runs in demo mode (fake send animation, no email sent).

---

## Sections

| Section | Description |
|---|---|
| Hero | Headline, typed role phrases, CTA buttons, social links |
| About | Bio, location, education, quick-stats grid |
| Skills | Technical skills with animated proficiency bars |
| Projects | 6 project cards with category filter and case study modals |
| Experience | Work and education timeline |
| Contact | EmailJS-powered contact form |
