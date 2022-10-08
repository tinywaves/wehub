import React from 'react';

import Project from '../../types/project';
import User from '../../types/user';

interface ListTableProps {
  searchedList: Project[];
  users: User[];
}

const ListTable: React.FC<ListTableProps> = ({ searchedList, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {
          searchedList.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {
                    users.find(user => user.id === item.personId)?.name || '查无此项'
                  }
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default ListTable;
