import { ProjectAssignee } from './project-assignment.type';

const columns = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'MEMBER NAME', uid: 'staffName' },
  { name: 'ROLE', uid: 'role' },
  { name: 'POSITION', uid: 'position' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'ACTIONS', uid: 'actions' }
];

const ProjectAssignees: ProjectAssignee[] = [
  {
    id: 1,
    staffName: 'Alice Johnson',
    role: 'Senior',
    position: 'Frontend Developer',
    email: 'alice.johnson@example.com'
  },
  {
    id: 2,
    staffName: 'Bob Smith',
    role: 'Junior',
    position: 'Backend Developer',
    email: 'bob.smith@example.com'
  },
  {
    id: 3,
    staffName: 'Carol White',
    role: 'Internship',
    position: 'Tester',
    email: 'carol.white@example.com'
  },
  {
    id: 4,
    staffName: 'David Brown',
    role: 'Senior',
    position: 'Project Manager',
    email: 'david.brown@example.com'
  },
  {
    id: 5,
    staffName: 'Eve Green',
    role: 'Fresher',
    position: 'Business Analyst',
    email: 'eve.green@example.com'
  },
  {
    id: 6,
    staffName: 'Frank Lee',
    role: 'Junior',
    position: 'Product Owner',
    email: 'frank.lee@example.com'
  },
  {
    id: 7,
    staffName: 'Grace Kim',
    role: 'Senior',
    position: 'Designer',
    email: 'grace.kim@example.com'
  },
  {
    id: 8,
    staffName: 'Hannah Martinez',
    role: 'Fresher',
    position: 'Frontend Developer',
    email: 'hannah.martinez@example.com'
  },
  {
    id: 9,
    staffName: 'Ian Clark',
    role: 'Internship',
    position: 'Tester',
    email: 'ian.clark@example.com'
  }
];

export { columns, ProjectAssignees };
