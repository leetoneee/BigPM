import { Project } from './projects.type';

const columns = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name' },
  { name: 'STATUS', uid: 'status' },
  { name: 'PROGRESS', uid: 'progress', sortable: true },
  { name: 'START DATE', uid: 'startDate', sortable: true },
  { name: 'END DATE', uid: 'endDate', sortable: true },
  { name: 'ACTIONS', uid: 'actions' }
];

const statusOptions = [
  { name: 'Completed', uid: 'completed' },
  { name: 'In Progress', uid: 'in-progress' },
  { name: 'On Hold', uid: 'on-hold' },
  { name: 'Not Started', uid: 'not-started' }
];

const projects: Project[] = [
  {
    id: 1,
    name: 'Project Apollo',
    status: 'Completed',
    progress: 100,
    startDate: '2023-01-10T00:00:00Z',
    endDate: '2023-05-20T23:59:59Z',
    description: 'A project to explore new technologies for space travel.',
    objectives:
      'Develop a prototype for lunar missions and test its functionality.'
  },
  {
    id: 2,
    name: 'Project Mercury',
    status: 'In Progress',
    progress: 75,
    startDate: '2023-06-15T00:00:00Z',
    endDate: '2024-02-10T23:59:59Z',
    description: 'Upgrade legacy systems to improve response time.',
    objectives: 'Optimize codebase and reduce server load by 40%.'
  },
  {
    id: 3,
    name: 'Project Gemini',
    status: 'On Hold',
    progress: 40,
    startDate: '2023-02-01T00:00:00Z',
    endDate: '2024-01-01T23:59:59Z',
    description: 'Creating an innovative cross-platform mobile application.',
    objectives: 'Build core functionality for iOS and Android compatibility.'
  },
  {
    id: 4,
    name: 'Project Orion',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-09-15T23:59:59Z',
    description: 'Develop a web-based project management tool.',
    objectives:
      'Provide features to track project progress and manage resources.'
  },
  {
    id: 5,
    name: 'Project Voyager',
    status: 'In Progress',
    progress: 60,
    startDate: '2023-08-20T00:00:00Z',
    endDate: '2024-07-30T23:59:59Z',
    description: 'Explore AI-driven solutions for predictive analytics.',
    objectives: 'Integrate AI models to predict market trends by 30%.'
  },
  {
    id: 6,
    name: 'Project Discovery',
    status: 'Completed',
    progress: 100,
    startDate: '2022-05-10T00:00:00Z',
    endDate: '2023-04-25T23:59:59Z',
    description:
      'Research project focused on deep-sea exploration technologies.',
    objectives: 'Design a submersible vehicle capable of extreme depths.'
  },
  {
    id: 7,
    name: 'Project Endeavour',
    status: 'On Hold',
    progress: 30,
    startDate: '2023-09-05T00:00:00Z',
    endDate: '2024-06-15T23:59:59Z',
    description: 'Developing a new cloud-based storage solution.',
    objectives:
      'Ensure scalability to support up to 1 million users and seamless integration with existing platforms.'
  },
  {
    id: 8,
    name: 'Project Pioneer',
    status: 'In Progress',
    progress: 50,
    startDate: '2023-10-01T00:00:00Z',
    endDate: '2024-12-20T23:59:59Z',
    description:
      'Building a platform for remote collaboration and communication.',
    objectives:
      'Increase user productivity by 20% through an intuitive interface and new collaborative tools.'
  },
  {
    id: 9,
    name: 'Project Pathfinder',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-11-05T23:59:59Z',
    description: 'Creating a mapping software for urban planning.',
    objectives:
      'Provide detailed, real-time data to assist city planners in decision-making processes.'
  },
  {
    id: 10,
    name: 'Project Enterprise',
    status: 'Completed',
    progress: 100,
    startDate: '2022-10-11T00:00:00Z',
    endDate: '2023-09-30T23:59:59Z',
    description: 'A comprehensive overhaul of internal company systems.',
    objectives:
      'Migrate legacy data to the new system and streamline operational workflows.'
  },
  {
    id: 11,
    name: 'Project Horizon',
    status: 'Completed',
    progress: 100,
    startDate: '2022-01-05T00:00:00Z',
    endDate: '2022-12-20T23:59:59Z',
    description: 'R&D project focused on renewable energy solutions.',
    objectives:
      'Develop and test new solar and wind energy capture technologies.'
  },
  {
    id: 12,
    name: 'Project Atlantis',
    status: 'In Progress',
    progress: 80,
    startDate: '2023-05-10T00:00:00Z',
    endDate: '2024-03-15T23:59:59Z',
    description:
      'Creating a new database solution for large-scale applications.',
    objectives:
      'Achieve a 50% reduction in data query time and improve data redundancy protocols.'
  },
  {
    id: 13,
    name: 'Project Odyssey',
    status: 'On Hold',
    progress: 45,
    startDate: '2023-04-01T00:00:00Z',
    endDate: '2024-02-28T23:59:59Z',
    description:
      'Developing an advanced analytics platform for retail insights.',
    objectives:
      'Provide predictive insights to retailers to optimize inventory and enhance sales strategies.'
  },
  {
    id: 14,
    name: 'Project Zenith',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-07-01T00:00:00Z',
    endDate: '2025-01-31T23:59:59Z',
    description: 'An AI project to enhance customer service interactions.',
    objectives:
      'Implement a chatbot with natural language processing to handle up to 70% of inquiries.'
  },
  {
    id: 15,
    name: 'Project Atlas',
    status: 'In Progress',
    progress: 60,
    startDate: '2023-07-12T00:00:00Z',
    endDate: '2024-06-01T23:59:59Z',
    description: 'Redesign of e-commerce site architecture.',
    objectives:
      'Improve site load times by 30% and enhance user experience with a responsive design.'
  },
  {
    id: 16,
    name: 'Project Nimbus',
    status: 'Completed',
    progress: 100,
    startDate: '2022-09-15T00:00:00Z',
    endDate: '2023-08-30T23:59:59Z',
    description: 'Developed a secure cloud storage solution for enterprises.',
    objectives:
      'Provide high-availability storage with enhanced encryption for data protection.'
  },
  {
    id: 17,
    name: 'Project Helios',
    status: 'On Hold',
    progress: 20,
    startDate: '2023-12-01T00:00:00Z',
    endDate: '2024-10-10T23:59:59Z',
    description: 'Building a machine learning model for financial forecasting.',
    objectives:
      'Achieve accurate predictions of quarterly earnings with a margin of error below 5%.'
  },
  {
    id: 18,
    name: 'Project Genesis',
    status: 'In Progress',
    progress: 35,
    startDate: '2023-11-10T00:00:00Z',
    endDate: '2024-09-15T23:59:59Z',
    description: 'Research project focused on genetic data analysis tools.',
    objectives:
      'Create software that identifies key genetic markers efficiently for medical research.'
  },
  {
    id: 19,
    name: 'Project Elysium',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-04-01T00:00:00Z',
    endDate: '2024-12-01T23:59:59Z',
    description: 'Develop a virtual reality platform for educational use.',
    objectives:
      'Deliver an immersive learning experience with real-time user interaction and tracking.'
  },
  {
    id: 20,
    name: 'Project Aether',
    status: 'Completed',
    progress: 100,
    startDate: '2023-03-05T00:00:00Z',
    endDate: '2023-10-10T23:59:59Z',
    description: 'Create a scalable API for multi-platform data sharing.',
    objectives:
      'Enable real-time data sync across platforms and handle up to 1000 requests per second.'
  },
  {
    id: 21,
    name: 'Project Titan',
    status: 'Completed',
    progress: 100,
    startDate: '2023-01-20T00:00:00Z',
    endDate: '2023-06-10T23:59:59Z',
    description: 'Developed a scalable infrastructure for big data processing.',
    objectives:
      'Handle large datasets in real-time and improve processing speed by 40%.'
  },
  {
    id: 22,
    name: 'Project Nova',
    status: 'In Progress',
    progress: 55,
    startDate: '2023-09-01T00:00:00Z',
    endDate: '2024-05-20T23:59:59Z',
    description: 'Creating an AI-driven recommendation engine for e-commerce.',
    objectives:
      'Enhance user experience by delivering personalized recommendations and increasing conversion rates by 15%.'
  },
  {
    id: 23,
    name: 'Project Phoenix',
    status: 'On Hold',
    progress: 25,
    startDate: '2023-11-15T00:00:00Z',
    endDate: '2024-08-25T23:59:59Z',
    description: 'Research and development of wildfire prediction technology.',
    objectives:
      'Create predictive models using satellite data to forecast wildfire risks in real-time.'
  },
  {
    id: 24,
    name: 'Project Zenith-X',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-02-10T00:00:00Z',
    endDate: '2024-12-15T23:59:59Z',
    description: 'Next-gen software for 3D modeling and visualization.',
    objectives:
      'Introduce advanced rendering capabilities and support VR integration for immersive experiences.'
  },
  {
    id: 25,
    name: 'Project Eclipse',
    status: 'Completed',
    progress: 100,
    startDate: '2022-04-01T00:00:00Z',
    endDate: '2023-02-10T23:59:59Z',
    description: 'Built a solar-powered device for remote sensing.',
    objectives:
      'Enable real-time environmental data collection with a solar-powered sensor network to reduce energy dependency.'
  }
];

export const projectDetail = (id: number): Project | undefined => {
  const project = projects.find((project) => project.id === id);
  if (project) return project;
  return undefined;
};

export { columns, projects, statusOptions };
