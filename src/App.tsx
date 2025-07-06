import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Code,
  Globe, 
  Database, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Zap
} from 'lucide-react';
import ContactForm from './components/contactform';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const skills = [
    { name: 'React.js', level: 50, icon: <Code className="w-6 h-6" />, description: '2 Years of experience with React.js+Vite' },
    { name: 'TypeScript', level: 50, icon: <Code className="w-6 h-6" />, description: '2 Years of experience with React+Typescript+Vite' },
    { name: 'WordPress', level: 50, icon: <Globe className="w-6 h-6" />, description: '2 Years of experience with WordPress + Elementor' },
    { name: 'PHP', level: 50, icon: <Database className="w-6 h-6" />, description: '2 Years of experience with PHP + WordPress' },
    { name: 'Node.js', level: 50, icon: <Zap className="w-6 h-6" />, description: '1 Year of experience with Node.js(Express.js + MongoDB)' }
  ];

  const projects = [
    {
      title: 'News Home Page',
      description: 'News home page built with React.js and Vite, showcasing a clean and modern design.',
      image: '/assets/News Homepage.jpg',
      tags: ['React', 'TailwindCSS'],
      link: 'https://news-homepage-eight-ruddy.vercel.app/'
    },
    {
      title: 'Weather Dashboard Tracker',
      description: 'Weather dashboard tracker built with React.ts and Vite, displaying real-time weather updates.',
      image: '/assets/Weather Dashboard.jpg',
      tags: ['React', 'TailwindCSS', 'API'],
      link: 'https://weather-dashboard-app-gamma.vercel.app/'
    },
    {
      title: 'Quiz App',
      description: 'Quiz app built with React.js and tailwindcss, showcasing a quiz with multiple choice questions.',
      image: '/assets/Quiz App.jpg',
      tags: ['React', 'TailwindCSS'],
      link: 'https://quiz-game-app-gamma.vercel.app/'
    },
    {
      title: 'WordPress Theme',
      description: 'Personalized WordPress theme, showcasing a clean and modern design. This is not yet finished. It is still in the process of being developed. It will be finished soon.',
      image: '/assets/github theme.jpg',
      tags: ['JS', 'PHP', 'Xampp'],
      link: 'https://github.com/vFontanilla/VonDev_Theming'
    },
    {
      title: 'Wedding E-Invitation',
      description: 'Personalized Website invitation with RSVP form with customized RSVP form, showcasing a clean and modern design.',
      image: '/assets/Wedding Inv Image.jpg',
      tags: ['Next.JS', 'TailwindCSS', 'Supabase'],
      link: 'https://v0-modern-wedding-invitation-rho.vercel.app/'
    },
    {
      title: 'Facebook style OG',
      description: 'Facebook inspired, user can post a message and photos',
      image: '/assets/wall_simple.png',
      tags: ['React', 'Next.JS', 'TailwindCSS', 'Supabase'],
      link: 'https://wall-simple.vercel.app/'
    }
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks using React+TS and Vite for fast building '
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'WordPress Development',
      description: 'Custom themes, plugins, and Elementor, A complete WordPress solutions for businesses of all sizes.'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Backend Development',
      description: 'Robust server-side solutions with Node.js, PHP, and database creation schema using MySQL and MSSQL.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dev-Portfolio
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.toLowerCase()
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: "url('/assets/v1016-b-09.jpg')"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-6">
              <div>
                {/* <Code className="w-16 h-16 text-white" /> */}
                <img src="/assets/profile pic.jpeg" className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center"/>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Von Cedric Fontanilla
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-6 max-w-3xl mx-auto">
              Front-End Developer | Software Engineer | License Electronics Engineer
            </p>
            
            <p className="text-lg text-white mb-12 max-w-2xl mx-auto">
              Web Developer specializing in WordPress (Elementor, custom plugins) and React + TypeScript. I help agencies build fast, SEO-friendly, and user-focused websites with clean code and organized delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-gray-300 text-white px-8 py-4 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Passionate developer with 2+ years of experience creating innovative web solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Building Digital Excellence
              </h3>
              <p className="text-black mb-6 leading-relaxed">
                I'm a Front-End developer with a passion for creating beautiful, functional, and user-centered digital experiences. With expertise in modern web technologies and WordPress development, I help businesses establish a strong online presence.
              </p>
              <p className="text-black mb-8 leading-relaxed">
                My approach combines technical excellence with creative problem-solving, ensuring every project delivers both outstanding performance and exceptional user experience.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">2+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Dedicated Front-End Developer</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">React & WordPress Proficient</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">SEO and GA4/GTM Experienced</span>
                </div>
              </div>

              <div className='flex justify-center'>
                <a 
                href="/assets/Von Cedric Fontanilla CV_Resume.pdf"
                download
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Download CV/Resume
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">
                        {skill.icon}
                      </div>
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                    </div>
                    {/* <span className="text-sm font-medium text-gray-600">{skill.level}%</span> */}
                  </div>
                  <div className=" ">
                    {/* <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div> */}
                    <div>
                      {skill.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Services Offered
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Comprehensive development solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A showcase of my recent work and technical expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your project and create something amazing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  I'm always excited to take on new challenges and collaborate on innovative projects. Whether you need a complete web solution, WordPress development, or mobile app, I'm here to help.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href='vonfontanilla22@gmail.com' className="text-gray-600">vonfontanilla22@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Github className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">GitHub</p>
                      <a href='https://github.com/vFontanilla' className="text-gray-600">https://github.com/vFontanilla</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">LinkedIn</p>
                      <a href='https://www.linkedin.com/in/von-cedric-fontanilla-9ba47327b/' className="text-gray-600">https://www.linkedin.com/in/von-cedric-fontanilla-9ba47327b/</a>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Dev-Portfolio
            </div>
            <p className="text-gray-400 mb-6">
              Building the future, one line of code at a time.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/vFontanilla" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/von-cedric-fontanilla-9ba47327b/" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="http://localhost:5173/vonfontanilla22@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                © 2025 Von Cedric Fontanilla. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
