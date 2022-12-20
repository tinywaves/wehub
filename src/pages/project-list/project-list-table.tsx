import { ProjectListTableProps } from './interface';

const ProjectListTable = ({ projectList, users }: ProjectListTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {projectList.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find(user => user.id === project.personId)?.name || 'www'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectListTable;
