import React from 'react';

import User from '../../types/user';

interface SearchPanelProps {
  users: User[];
  searchParam: {
    name: string;
    personId: string;
  };
  setSearchParam: (searchParam: SearchPanelProps['searchParam']) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  users,
  searchParam,
  setSearchParam
}) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={searchParam.name}
          onChange={e =>
            setSearchParam({
              ...searchParam,
              name: e.target.value
            })
          }
        />
        <select
          value={searchParam.personId}
          onChange={e =>
            setSearchParam({
              ...searchParam,
              personId: e.target.value
            })
          }
        >
          <option value="">负责人</option>
          {users.map(user => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};

export default SearchPanel;
