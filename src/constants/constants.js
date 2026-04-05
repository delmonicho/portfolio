export const about = {
  name: 'Nicho Del Moral',
  role: 'Full Stack Software Dev × ML Hobbyist',
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
  { year: '2017', title: 'Started the journey',       desc: 'Dove into software development, fell in love with building things' },
  { year: '2018', title: 'Freelance Developer',        desc: 'Took on client projects, built web apps across various stacks' },
  { year: '2019', title: 'Founded JavaScript Mastery', desc: 'Created educational content and community around JS development' },
  { year: '2020', title: 'Shared work with the world', desc: 'Open-sourced projects and grew a developer community' },
  { year: '2021', title: 'Launched own platform',      desc: 'Built and deployed a full personal platform from the ground up' },
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
  frontend:    ['React.js', 'Angular', 'Vue.js'],
  backend:     ['Node.js', 'MongoDB', 'MySQL'],
  datascience: ['PyTorch', 'Keras', 'FiftyOne', 'RStudio'],
};

// Legacy export kept for safety
export const TimeLineData = workHistory.map(w => ({ year: parseInt(w.year), text: w.title }));
