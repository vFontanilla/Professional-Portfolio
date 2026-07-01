import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle,
  Code,
  Database,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import ContactForm from './components/contactform';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'portfolio' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const trustSignals = [
  'WordPress + Elementor',
  'NextJS + TypeScript',
  'Full-stack projects',
  'Remote support ready',
];

const highlights = [
  '2+ years building and supporting web projects',
  'Licensed Electronics Engineer with technical discipline',
  'Developer plus virtual assistant support experience',
  'Comfortable with WordPress, React, Next.js, PHP, and backend workflows',
];

const skillGroups = [
  {
    title: 'Frontend',
    icon: <Code className="h-5 w-5" />,
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS', 'ShadCN UI', 'Lucide-icons'],
  },
  {
    title: 'WordPress',
    icon: <Globe className="h-5 w-5" />,
    skills: ['Elementor', 'WooCommerce', 'CPT/ACF', 'Plugin development', 'Membership sites', 'Performance fixes', 'Custom Code Snippets'],
  },
  {
    title: 'Backend',
    icon: <Database className="h-5 w-5" />,
    skills: ['Node.js', 'Express', 'PHP', 'REST APIs', 'MySQL', 'PostgreSQL', 'Supabase'],
  },
  {
    title: 'Support',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    skills: ['Documentation', 'QA checks', 'Email management', 'File organization', 'Client support'],
  },
];

const services = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'WordPress and Elementor Development',
    description:
      'Business websites, landing pages, WooCommerce updates, membership flows, and practical Elementor builds that are easy for clients to maintain.',
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: 'React and Full-Stack Web Apps',
    description:
      'Responsive applications using React, Next.js, TypeScript, APIs, authentication flows, dashboards, and database-backed features.',
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: 'Optimization and Technical Support',
    description:
      'Bug fixing, page cleanup, SEO basics, performance checks, documentation, QA, and remote operations support for busy teams.',
  },
];

const projectStatusStyles = {
  Complete: 'bg-green-50 text-green-700 ring-green-600/20',
  'In Progress': 'bg-amber-50 text-amber-700 ring-amber-600/20',
} as const;

type ProjectStatus = keyof typeof projectStatusStyles;

interface Project {
  title: string;
  status: ProjectStatus;
  summary: string;
  problem: string;
  role: string;
  impact: string;
  image: string;
  tags: string[];
  link: string;
  actionLabel?: string;
}

const projects: Project[] = [
  {
    title: 'Wedding RSVP and E-Invitation',
    status: 'Complete',
    summary: 'A polished invitation website with guest RSVP flow and event details.',
    problem: 'The couple needed a digital invitation that could collect guest responses cleanly.',
    role: 'Frontend and integration developer',
    impact: 'Delivered a responsive event experience with RSVP handling and a client-friendly layout.',
    image: '/assets/rsvp_thumbnail.png',
    tags: ['Next.js', 'Tailwind CSS', 'Supabase', 'Prisma'],
    link: 'https://von-and-sal-rsvp.vercel.app/',
  },
  {
    title: 'Quotation System Dashboard',
    status: 'Complete',
    summary: 'A quotation management dashboard with real-time updates and reporting.',
    problem: 'Users needed a internal centralized platform for creating, tracking, and managing quotations.',
    role: 'Next.js developer',
    impact: 'Developed a responsive dashboard with seamless integration of quotation data and reporting features.',
    image: '/assets/b5g_thumbnail.png',
    tags: ['Next.js', 'Prisma', 'Supabase', 'Tailwind CSS'],
    link: 'https://b5g-v2-nextjs.vercel.app/',
    actionLabel: 'Request a Demo',
  },
  {
    title: 'Inventory Management System',
    status: 'In Progress',
    summary: 'A full-stack inventory system for managing supplier receiving, commissary transfers, store inventory, and sales.',
    problem: 'Businesses needed a centralized platform to accurately track inventory movement across multiple locations.',
    role: 'Full Stack Developer',
    impact: 'Built a scalable inventory management platform with real-time stock tracking, transfers, reporting, and audit logs.',
    image: '/assets/ims_thumbnail.png',
    tags: ['Next.js', 'Prisma', 'Supabase', 'Tailwind CSS'],
    link: 'https://b5g-v2-nextjs.vercel.app/',
  },
  {
    title: 'Plugin Development for WordPress',
    status: 'Complete',
    summary: 'Custom plugin development for WordPress for users and members to monitor their confirmed booking both Domestic and International. First you need to create an account and be a member to access the plugin features. The plugin also allows users to manage their travel incentives.',
    problem: 'The company needed a custom plugin to allow users to monitor their confirmed bookings and manage their travel incentives.',
    role: 'WordPress Developer',
    impact: 'Created efficient and maintainable plugins that enhanced the members to engage more and upgrade their levels.',
    image: '/assets/stip_thumbnail.png',
    tags: ['WordPress', 'PHP', 'JavaScript', 'CSS'],
    link: 'https://starlegends.com.ph/flights-tour-package-incentives-program/',
  },
  {
    title: 'Weather Dashboard App',
    status: 'Complete',
    summary: 'A responsive weather dashboard app with real-time updates and location-based forecasts.',
    problem: 'Users needed a simple and intuitive way to access weather information for their location.',
    role: 'Frontend Developer',
    impact: 'Developed a user-friendly weather dashboard with seamless integration of real-time data and a clean, modern design.',
    image: '/assets/weathdashboard_thumbnail.png',
    tags: ['React', 'ShadCN UI', 'TypeScript', 'CSS'],
    link: 'https://weather-dashboard-app-gamma.vercel.app/',
  },
];

const experienceItems = [
  {
    title: 'Web Developer and WordPress Builder',
    meta: 'Portfolio, client-style, and self-directed projects',
    description:
      'Built responsive websites and application prototypes using WordPress, Elementor, React, Next.js, Tailwind CSS, PHP, and database-backed workflows.',
  },
  {
    title: 'Executive Virtual Assistant Support',
    meta: 'Remote operations and technical support',
    description:
      'Supported daily operations through email management, documentation, file organization, scheduling, QA checks, and clear client communication.',
  },
  {
    title: 'Licensed Electronics Engineer',
    meta: 'Technical foundation',
    description:
      'Applied engineering discipline, problem solving, and structured troubleshooting to software development and support work.',
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const item of navItems) {
        const element = document.getElementById(item.id);

        if (!element) {
          continue;
        }

        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    handleScroll();
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

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold text-slate-950"
              aria-label="Go to homepage"
            >
              VCF
            </button>

            <div className="hidden md:block">
              <div className="flex items-center gap-7">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main>
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pt-16">
          <img
            src="/assets/v1016-b-09.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-slate-950/65" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
                <Sparkles className="h-4 w-4" />
                WordPress, NextJS, and remote technical support
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                I build business-focused websites and full-stack web experiences.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                Hi, I am Von Cedric Fontanilla, a passioanate Full-Stack Web Developer specializing in WordPress,
                Elementor, React, and Next.js. I also bring virtual assistant experience,
                so I can support both the build and the operations around it.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToSection('portfolio')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-base font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  View Projects
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold text-blue-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Contact Me
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {trustSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <img
                  src="/assets/profile pic.jpeg"
                  alt="Von Cedric Fontanilla"
                  className="h-82 w-full rounded-[1.5rem] object-cover object-top"
                />
                <div className="mt-5 space-y-3 text-white">
                  <p className="text-xl font-semibold">Von Cedric Fontanilla</p>
                  <p className="text-sm leading-6 text-slate-200">
                    Full-Stack Web Developer, WordPress builder, Licensed Electronics Engineer,
                    and Virtual Assistant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">About</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
                  A developer who can build, troubleshoot, document, and support the work.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  I help create practical websites and web applications with a focus on clean interfaces,
                  reliable workflows, and business outcomes. My mix of development and virtual assistant
                  experience makes me comfortable with both technical implementation and team support.
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  I work across WordPress, Elementor, React, Next.js, PHP, APIs, and database-backed
                  features, then keep the handoff clear through documentation, QA, and communication.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <div key={highlight} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <CheckCircle className="mb-4 h-6 w-6 text-green-600" />
                    <p className="font-medium leading-7 text-slate-800">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Skills</p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-950">Practical toolset by workflow</h3>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {skillGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3 text-blue-600">
                      {group.icon}
                      <h4 className="font-semibold text-slate-950">{group.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Services</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
                Development and support services for websites that need to work.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                I focus on practical builds: websites development, plugin development, dashboards, extending plugin features, support workflows, and cleanup work
                that help clients move faster.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <div key={service.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Featured Projects</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
                  Project proof with clearer business context.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Each project now highlights the problem, my role, and the practical value delivered.
                </p>
              </div>
              <ShieldCheck className="hidden h-12 w-12 text-blue-600 md:block" />
            </div>

            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${projectStatusStyles[project.status]}`}
                      >
                        {project.status}
                      </span>
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-slate-950">{project.title}</h3>
                    <p className="mt-3 text-slate-600">{project.summary}</p>
                    <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                      <p>
                        <span className="font-semibold text-slate-900">Problem:</span> {project.problem}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Role:</span> {project.role}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Value:</span> {project.impact}
                      </p>
                    </div>
                    {project.status === 'Complete' ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex w-fit items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-800"
                      >
                        {project.actionLabel ?? 'View Project'}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="mt-6 inline-flex w-fit items-center rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Experience</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A blend of web development and dependable support.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                The strongest version of this portfolio is not only about code. It also shows communication,
                organization, troubleshooting, and delivery discipline.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {experienceItems.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Zap className="mb-5 h-6 w-6 text-blue-300" />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium text-blue-200">{item.meta}</p>
                  <p className="mt-4 leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-gradient-to-br from-blue-50 via-white to-slate-100 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Contact</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">Let us build something useful.</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Reach out for WordPress, React, full-stack, optimization, or technical support work.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-950">Contact details</h3>
                <p className="mt-4 leading-7 text-slate-600">
                  I am open to web development work, WordPress support, frontend builds, and remote technical
                  assistant roles where clear execution matters.
                </p>

                <div className="mt-8 space-y-5">
                  <a
                    href="mailto:vonfontanilla22@gmail.com"
                    className="flex items-center gap-4 rounded-xl p-2 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Mail className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-semibold text-slate-950">Email</span>
                      <span>vonfontanilla22@gmail.com</span>
                    </span>
                  </a>

                  <a
                    href="https://github.com/vFontanilla"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-xl p-2 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Github className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-semibold text-slate-950">GitHub</span>
                      <span>vFontanilla</span>
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/von-cedric-fontanilla-9ba47327b/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-xl p-2 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Linkedin className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-semibold text-slate-950">LinkedIn</span>
                      <span>Von Cedric Fontanilla</span>
                    </span>
                  </a>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div>
            <p className="text-2xl font-bold">VCF</p>
            <p className="mt-2 text-slate-400">Business-focused web development and technical support.</p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/vFontanilla"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 transition hover:text-white"
              aria-label="Visit Von Cedric Fontanilla on GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/von-cedric-fontanilla-9ba47327b/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 transition hover:text-white"
              aria-label="Visit Von Cedric Fontanilla on LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:vonfontanilla22@gmail.com"
              className="text-slate-400 transition hover:text-white"
              aria-label="Email Von Cedric Fontanilla"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          <p className="text-sm text-slate-400">&copy; 2025 Von Cedric Fontanilla. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
