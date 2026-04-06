export const about = {
  name: 'Nicho Del Moral',
  role: 'Full Stack Dev × Published ML Researcher',
  location: 'Brooklyn, NY',
  origin: 'Born in Los Angeles · Raised in Green Bay, WI · Graduated in Hawaii',
  interests: 'World traveler, musician, enthusiast of well-designed experiences',
  tagline: 'Learning and growing one project at a time',
  email: 'nicho.delmo@gmail.com',
  github: 'github.com/delmonicho',
  linkedin: 'linkedin.com/in/nicho-del-moral/',
  instagram: 'instagram.com/delmonicho',
};

export const workHistory = [
  { year: '2024–Present', company: 'Meta',       title: 'Software Engineer',       desc: 'AI Agents + MCP tools in Data Infra' },
  { year: '2023', company: 'Casablanca',  title: 'Senior Software Dev',     desc: 'React, Three.js, PyTorch + XR development' },
  { year: '2022', company: 'Nexient',     title: 'Senior Digital Engineer', desc: 'Agile JS consulting + CI/CD via Jenkins & Azure' },
  { year: '2020', company: 'Advicent',    title: 'Software Developer',      desc: 'Angular 10 + NgRx for leading fintech platform' },
  { year: '2020', company: 'Utilisim',    title: 'Software Dev Intern',     desc: 'ReactJS components + AWS Lambda REST APIs' },
  { year: '2019', company: 'UH Hilo',     title: 'ML Research Intern',      desc: 'Published IEEE paper; sole CSCI 2019 presenter' },
];

export const projects = [
  {
    id: 0,
    title: 'ML PyTorch Instance Segmentation',
    description: 'Trained a Mask R-CNN model on a custom image dataset using Google OpenImages. Used NumPy to prepare images, labels, bounding boxes, and segmentation masks for ML training.',
    stack: ['PyTorch', 'NumPy', 'FiftyOne', 'Google OpenImages'],
    link: 'https://github.com/delmonicho',
  },
  {
    id: 1,
    title: 'WSI Inline Monogram Experience',
    description: 'Developed a personalized monogram experience across dozens of products on Williams Sonoma brand sites — West Elm and Pottery Barn.',
    stack: ['Vue.js', 'JavaScript'],
    link: 'https://www.potterybarnkids.com',
  },
  {
    id: 2,
    title: 'Advicent Essentials',
    description: 'Built software solutions in sprint cycles for a beta-stage financial planning product at the leading fintech software company.',
    stack: ['Angular 10', 'Node.js'],
    link: 'https://www.advicentsolutions.com',
  },
  {
    id: 3,
    title: 'TimeShift',
    description: 'Full-stack calendar app with user and event tracking, built to support Machine Learning research workflows.',
    stack: ['Vue.js', 'MongoDB', 'Express', 'Node.js'],
    link: 'https://github.com/delmonicho',
  },
];

export const skills = {
  frontend:    ['React.js', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
  backend:     ['Node.js', 'MongoDB', 'MySQL', 'Docker', 'AWS Lambda', 'Supabase'],
  datascience: ['PyTorch', 'Keras', 'FiftyOne', 'RStudio', 'NumPy'],
  ai:          ['Claude API', 'Claude Skills', 'MCP Tools', 'Agentic CLI', 'Agent Orchestration', 'Prompt Engineering'],
};

// Legacy export kept for safety
export const TimeLineData = workHistory.map(w => ({ year: parseInt(w.year), text: w.title }));
