export type ProjectAssignee = {
  id: number;
  staffName: string;
  role: 'Senior' | 'Junior' | 'Internship' | 'Fresher';
  position:
    | 'Business Analyst'
    | 'Tester'
    | 'Frontend Developer'
    | 'Backend Developer'
    | 'Designer'
    | 'Project Manager'
    | 'Product Owner';
  email: string;
};
