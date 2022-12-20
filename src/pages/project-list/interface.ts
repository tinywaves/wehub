import User from 'types/user';

interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: string;
}

interface SearchPanelProps {
  users: User[],
  searchParam: {
    name: string,
    personId: string;
  },
  setSearchParam: (searchParam: SearchPanelProps['searchParam']) => void;
}

interface ProjectListTableProps {
  projectList: Project[],
  users: User[];
}

export type { SearchPanelProps, ProjectListTableProps };
