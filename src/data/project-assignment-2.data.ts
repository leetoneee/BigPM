import { Assignee } from './project-assignment-2.type';

const columns = [
  { name: '#', uid: 'id', sortable: true },
  { name: 'STAFF NAME', uid: 'staffName' },
  { name: 'POSITION', uid: 'position' },
  { name: 'ROLE', uid: 'role' },
  { name: 'IN PROGRESS PROJECT', uid: 'inProgressProjects', sortable: true },
];

const staffList: Assignee[] = [
  {
    id: 1,
    staffName: "Alice Johnson",
    phone: "123-456-7890",
    hireDate: "2021-06-15T00:00:00Z",
    role: "Senior",
    position: "Frontend Developer",
    email: "alice.johnson@example.com",
    inProgressProjects: 3
  },
  {
    id: 2,
    staffName: "Bob Smith",
    phone: "123-555-6789",
    hireDate: "2022-02-01T00:00:00Z",
    role: "Junior",
    position: "Backend Developer",
    email: "bob.smith@example.com",
    inProgressProjects: 1
  },
  {
    id: 3,
    staffName: "Carol White",
    phone: "123-777-4567",
    hireDate: "2023-01-20T00:00:00Z",
    role: "Internship",
    position: "Tester",
    email: "carol.white@example.com",
    inProgressProjects: 1
  },
  {
    id: 4,
    staffName: "David Brown",
    phone: "123-888-1234",
    hireDate: "2020-05-10T00:00:00Z",
    role: "Senior",
    position: "Project Manager",
    email: "david.brown@example.com",
    inProgressProjects: 3
  },
  {
    id: 5,
    staffName: "Eve Green",
    phone: "123-999-4321",
    hireDate: "2023-03-25T00:00:00Z",
    role: "Fresher",
    position: "Business Analyst",
    email: "eve.green@example.com",
    inProgressProjects: 2
  },
  {
    id: 6,
    staffName: "Frank Lee",
    phone: "123-666-7890",
    hireDate: "2022-09-15T00:00:00Z",
    role: "Junior",
    position: "Product Owner",
    email: "frank.lee@example.com",
    inProgressProjects: 3
  },
  {
    id: 7,
    staffName: "Grace Kim",
    phone: "123-444-5555",
    hireDate: "2021-12-01T00:00:00Z",
    role: "Senior",
    position: "Designer",
    email: "grace.kim@example.com",
    inProgressProjects: 1
  },
  {
    id: 8,
    staffName: "Hannah Martinez",
    phone: "123-222-3333",
    hireDate: "2022-06-20T00:00:00Z",
    role: "Fresher",
    position: "Frontend Developer",
    email: "hannah.martinez@example.com",
    inProgressProjects: 2
  },
  {
    id: 9,
    staffName: "Ian Clark",
    phone: "123-111-2222",
    hireDate: "2023-07-18T00:00:00Z",
    role: "Internship",
    position: "Tester",
    email: "ian.clark@example.com",
    inProgressProjects: 1
  },
  {
    id: 10,
    staffName: 'Jackie Walker',
    phone: '123-000-1111',
    hireDate: '2020-08-15T00:00:00Z',
    role: 'Senior',
    position: 'Backend Developer',
    email: 'jackie.walker@example.com',
    inProgressProjects: 0
  },
  {
    id: 11,
    staffName: 'Kelly Adams',
    phone: '123-333-4444',
    hireDate: '2021-03-05T00:00:00Z',
    role: 'Junior',
    position: 'Designer',
    email: 'kelly.adams@example.com',
    inProgressProjects: 1
  },
  {
    id: 12,
    staffName: 'Leo Thompson',
    phone: '123-555-6666',
    hireDate: '2022-11-30T00:00:00Z',
    role: 'Fresher',
    position: 'Business Analyst',
    email: 'leo.thompson@example.com',
    inProgressProjects: 2
  },
  {
    id: 13,
    staffName: 'Mona Perez',
    phone: '123-444-7890',
    hireDate: '2023-08-12T00:00:00Z',
    role: 'Internship',
    position: 'Product Owner',
    email: 'mona.perez@example.com',
    inProgressProjects: 1
  },
  {
    id: 14,
    staffName: 'Nathan Evans',
    phone: '123-666-5555',
    hireDate: '2022-10-01T00:00:00Z',
    role: 'Junior',
    position: 'Project Manager',
    email: 'nathan.evans@example.com',
    inProgressProjects: 3
  },
  {
    id: 15,
    staffName: 'Olivia Brooks',
    phone: '123-123-4567',
    hireDate: '2021-04-15T00:00:00Z',
    role: 'Senior',
    position: 'Frontend Developer',
    email: 'olivia.brooks@example.com',
    inProgressProjects: 4
  }
];

export { columns, staffList };
