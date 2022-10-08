import React, { useEffect, useState } from 'react';
import QueryString from 'qs';

import SearchPanel from './search-panel';
import ListTable from './list-table';

import { cleanObject } from '../../utils';
import { useMount, useDebounce, useHttp } from '../../hooks';

const url = process.env.REACT_APP_API_URL;

const ProjectListPage: React.FC = () => {
  const [searchParam, setSearchParam] = useState({
    name: '',
    personId: ''
  });
  const debouncedSearchParam = useDebounce(searchParam, 200);
  const [searchedList, setSearchedList] = useState([]);
  const [users, setUsers] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedSearchParam) }).then(
      setSearchedList
    );
  }, [debouncedSearchParam]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <>
      <SearchPanel
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        users={users}
      />
      <ListTable searchedList={searchedList} users={users} />
    </>
  );
};

export default ProjectListPage;
