# new-portfolio

## Contact form email delivery (EmailJS)

1) Create an account at `https://www.emailjs.com/` and set up:
- Service: connect your email provider
- Template: include variables `from_name`, `reply_to`, `message`, `to_email`

2) Get your Service ID, Template ID, and Public Key from EmailJS.

3) Create `.env.local` in the project root with:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4) Restart the dev server after creating/updating `.env.local`.

5) The contact form is in `src/components/contact/contact.tsx` and is already wired to send using these env vars.
