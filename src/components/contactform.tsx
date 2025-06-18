import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: 'Web Development',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      // const serviceId = 'service_8thrhck'; 
      // const templateId = 'template_hdh34tm'; 
      // const publicKey = 'xBbS7IP3dLhofoaAB'; 

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID!; 
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!; 
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!; 
      console.log('EmailJS configuration:', serviceId, templateId, publicKey);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        project_type: formData.projectType,
        message: formData.message,
        to_name: 'Von Cedric Fontanilla',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: 'Web Development',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName: keyof FormErrors) => {
    const baseClass = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";
    const errorClass = errors[fieldName] ? "border-red-500" : "border-gray-300";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Message sent successfully!</p>
            <p className="text-green-600 text-sm">Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-red-800 font-medium">Failed to send message</p>
            <p className="text-red-600 text-sm">Please try again or contact me directly at vonfontanilla22@gmail.com</p>
          </div>
        </div>
      )}

      <form ref={form} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Name *
          </label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={getInputClassName('name')}
            placeholder="Your name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email *
          </label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={getInputClassName('email')}
            placeholder="your@email.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Project Type
          </label>
          <select 
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            disabled={isSubmitting}
          >
            <option value="Web Development">Web Development</option>
            <option value="WordPress Development">WordPress Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Full-Stack Project">Full-Stack Project</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Consultation">Consultation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Message *
          </label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            maxLength={500}
            className={getInputClassName('message')}
            placeholder="Tell me about your project, timeline, and any specific requirements..."
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {formData.message.length}/500 characters
          </p>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-blue-800 font-medium text-sm">Setup Required</p>
            <p className="text-blue-600 text-sm">
              To enable email functionality, you'll need to configure EmailJS with your service credentials. 
              Check the console for setup instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;