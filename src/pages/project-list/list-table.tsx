import { User } from 'pages/project-list/search-panel';

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListTableProps {
  list: Project[];
  users: User[];
}

export const ListTable = ({ list, users }: ListTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find(user => user.id === project.personId)?.name || '未知'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTable;
