# EmailJS Configuration

This folder contains the EmailJS configuration file for the contact form.

## Setup Instructions

1. Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```

2. Open `config.js` and replace the placeholder values with your actual EmailJS credentials:
   - `PUBLIC_KEY`: Get from [EmailJS Dashboard](https://dashboard.emailjs.com/admin/account)
   - `SERVICE_ID`: Get from [EmailJS Services](https://dashboard.emailjs.com/admin)
   - `TEMPLATE_ID`: Get from [EmailJS Templates](https://dashboard.emailjs.com/admin/templates)

3. **IMPORTANT**: Never commit `config.js` to version control. It's already listed in `.gitignore`.

## File Structure

- `config.example.js` - Template file (safe to commit)
- `config.js` - Your actual credentials (ignored by git)
- `README.md` - This file

## EmailJS Setup Guide

If you need to set up EmailJS from scratch:

1. Sign up at [https://www.emailjs.com](https://www.emailjs.com) (free tier available)
2. Create an Email Service (Gmail recommended)
3. Create an Email Template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
4. Copy your Public Key from Account settings
5. Add all three values to `config.js`
