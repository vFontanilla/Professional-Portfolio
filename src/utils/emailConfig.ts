// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your Service ID, Template ID, and Public Key
// 6. Replace the values below

export const emailConfig = {
  serviceId: 'service_portfolio', // Replace with your EmailJS service ID
  templateId: 'template_portfolio', // Replace with your EmailJS template ID
  publicKey: 'your_public_key', // Replace with your EmailJS public key
};

// Email template variables that will be sent:
// - from_name: Contact person's name
// - from_email: Contact person's email
// - project_type: Selected project type
// - message: Contact message
// - to_name: Your name (Alex Johnson)

// Example EmailJS template:
/*
Subject: New Portfolio Contact: {{project_type}} Project

Hello {{to_name}},

You have received a new contact form submission from your portfolio website.

Name: {{from_name}}
Email: {{from_email}}
Project Type: {{project_type}}

Message:
{{message}}

Best regards,
Portfolio Contact Form
*/

console.log(`
🚀 EmailJS Setup Instructions:

1. Visit https://www.emailjs.com/ and create an account
2. Create a new email service (Gmail recommended)
3. Create an email template with these variables:
   - from_name
   - from_email  
   - project_type
   - message
   - to_name

4. Update src/utils/emailConfig.ts with your:
   - Service ID
   - Template ID  
   - Public Key

5. The contact form will then send real emails!

For detailed setup guide, visit: https://www.emailjs.com/docs/
`);