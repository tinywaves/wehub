import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { Table } from '@mantine/core';

import { ProjectListTableProps } from './interface';

const ProjectListTable = ({ projectList, users }: ProjectListTableProps) => {
  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Apartment</th>
          <th>Manager</th>
          <th>Created Time</th>
        </tr>
      </thead>
      <tbody>
        {projectList.map(project => (
          <tr key={project.id}>
            <td>
              <Link to={String(project.id)}>{project.name}</Link>
            </td>
            <td>{project.organization}</td>
            <td>
              {users.find(user => user.id === project.personId)?.name || 'NULL'}
            </td>
            <td>
              {project.created
                ? dayjs(project.created).format('YYYY-MM-DD')
                : 'NULL'}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectListTable;
