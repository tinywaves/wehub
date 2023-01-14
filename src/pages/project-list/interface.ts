import { User, Project } from 'types';

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
