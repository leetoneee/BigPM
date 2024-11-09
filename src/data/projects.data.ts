import { Project } from "./projects.type";

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
  {name: "Completed", uid: "completed"},
  {name: "In Progress", uid: "in-progress"},
  {name: "On Hold", uid: "on-hold"},
  {name: "Not Started", uid: "not-started"},
];

const projects: Project[] = [
  {
    id: 1,
    name: 'Project Apollo',
    status: 'Completed',
    progress: 100,
    startDate: '2023-01-10T00:00:00Z',
    endDate: '2023-05-20T23:59:59Z'
  },
  {
    id: 2,
    name: 'Project Mercury',
    status: 'In Progress',
    progress: 75,
    startDate: '2023-06-15T00:00:00Z',
    endDate: '2024-02-10T23:59:59Z'
  },
  {
    id: 3,
    name: 'Project Gemini',
    status: 'On Hold',
    progress: 40,
    startDate: '2023-02-01T00:00:00Z',
    endDate: '2024-01-01T23:59:59Z'
  },
  {
    id: 4,
    name: 'Project Orion',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-09-15T23:59:59Z'
  },
  {
    id: 5,
    name: 'Project Voyager',
    status: 'In Progress',
    progress: 60,
    startDate: '2023-08-20T00:00:00Z',
    endDate: '2024-07-30T23:59:59Z'
  },
  {
    id: 6,
    name: 'Project Discovery',
    status: 'Completed',
    progress: 100,
    startDate: '2022-05-10T00:00:00Z',
    endDate: '2023-04-25T23:59:59Z'
  },
  {
    id: 7,
    name: 'Project Endeavour',
    status: 'On Hold',
    progress: 30,
    startDate: '2023-09-05T00:00:00Z',
    endDate: '2024-06-15T23:59:59Z'
  },
  {
    id: 8,
    name: 'Project Pioneer',
    status: 'In Progress',
    progress: 50,
    startDate: '2023-10-01T00:00:00Z',
    endDate: '2024-12-20T23:59:59Z'
  },
  {
    id: 9,
    name: 'Project Pathfinder',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-11-05T23:59:59Z'
  },
  {
    id: 10,
    name: 'Project Enterprise',
    status: 'Completed',
    progress: 100,
    startDate: '2022-10-11T00:00:00Z',
    endDate: '2023-09-30T23:59:59Z'
  },
  {
    id: 11,
    name: 'Project Horizon',
    status: 'Completed',
    progress: 100,
    startDate: '2022-01-05T00:00:00Z',
    endDate: '2022-12-20T23:59:59Z'
  },
  {
    id: 12,
    name: 'Project Atlantis',
    status: 'In Progress',
    progress: 80,
    startDate: '2023-05-10T00:00:00Z',
    endDate: '2024-03-15T23:59:59Z'
  },
  {
    id: 13,
    name: 'Project Odyssey',
    status: 'On Hold',
    progress: 45,
    startDate: '2023-04-01T00:00:00Z',
    endDate: '2024-02-28T23:59:59Z'
  },
  {
    id: 14,
    name: 'Project Zenith',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-07-01T00:00:00Z',
    endDate: '2025-01-31T23:59:59Z'
  },
  {
    id: 15,
    name: 'Project Atlas',
    status: 'In Progress',
    progress: 60,
    startDate: '2023-07-12T00:00:00Z',
    endDate: '2024-06-01T23:59:59Z'
  },
  {
    id: 16,
    name: 'Project Nimbus',
    status: 'Completed',
    progress: 100,
    startDate: '2022-09-15T00:00:00Z',
    endDate: '2023-08-30T23:59:59Z'
  },
  {
    id: 17,
    name: 'Project Helios',
    status: 'On Hold',
    progress: 20,
    startDate: '2023-12-01T00:00:00Z',
    endDate: '2024-10-10T23:59:59Z'
  },
  {
    id: 18,
    name: 'Project Genesis',
    status: 'In Progress',
    progress: 35,
    startDate: '2023-11-10T00:00:00Z',
    endDate: '2024-09-15T23:59:59Z'
  },
  {
    id: 19,
    name: 'Project Elysium',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-04-01T00:00:00Z',
    endDate: '2024-12-01T23:59:59Z'
  },
  {
    id: 20,
    name: 'Project Aether',
    status: 'Completed',
    progress: 100,
    startDate: '2023-03-05T00:00:00Z',
    endDate: '2023-10-10T23:59:59Z'
  },
  {
    id: 21,
    name: 'Project Titan',
    status: 'Completed',
    progress: 100,
    startDate: '2023-01-20T00:00:00Z',
    endDate: '2023-06-10T23:59:59Z'
  },
  {
    id: 22,
    name: 'Project Nova',
    status: 'In Progress',
    progress: 55,
    startDate: '2023-09-01T00:00:00Z',
    endDate: '2024-05-20T23:59:59Z'
  },
  {
    id: 23,
    name: 'Project Phoenix',
    status: 'On Hold',
    progress: 25,
    startDate: '2023-11-15T00:00:00Z',
    endDate: '2024-08-25T23:59:59Z'
  },
  {
    id: 24,
    name: 'Project Zenith-X',
    status: 'Not Started',
    progress: 0,
    startDate: '2024-02-10T00:00:00Z',
    endDate: '2024-12-15T23:59:59Z'
  },
  {
    id: 25,
    name: 'Project Eclipse',
    status: 'Completed',
    progress: 100,
    startDate: '2022-04-01T00:00:00Z',
    endDate: '2023-02-10T23:59:59Z'
  }
];

export { columns, projects, statusOptions };
