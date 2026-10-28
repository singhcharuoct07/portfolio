# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## EmailJS contact form setup

The contact form uses `@emailjs/browser` and `emailjs.send`. The EmailJS service, template, and public key are not present in the repository; the form remains disabled until all three are supplied.

1. In EmailJS, connect and verify the email service that will deliver messages to your Gmail inbox.
2. Create an EmailJS template and set its recipient/To Email to `singhcharuoct07@gmail.com`.
3. Configure the template to use these form parameters:
   - `{{from_name}}` for the visitor's name
   - `{{reply_to}}` for the visitor's email (use it as the reply-to address)
   - `{{subject}}` for the message subject
   - `{{message}}` for the visitor's message
4. Copy the service ID from the EmailJS service, the template ID from the template, and the public key from Account > General.
5. Add the real values to a `.env.local` file in the project root:

   ```dotenv
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
   ```

   Replace each example value with the one from EmailJS. `.env.local` is ignored by Git; do not commit credentials.
6. In Vercel, open Project Settings → Environment Variables and add the same three variable names and their real values for the environments you deploy.
7. Restart the local Vite server after changing `.env.local`. After adding or changing the Vercel variables, trigger a new deployment; Vite includes these values at build time.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
