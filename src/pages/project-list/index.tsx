import React, { useEffect, useState } from 'react';
import QueryString from 'qs';

import SearchPanel from './search-panel';
import ListTable from './list-table';

import { cleanObject } from '../../utils';
import { useMount, useDebounce } from '../../hooks';

const url = process.env.REACT_APP_API_URL;

const ProjectListPage: React.FC = () => {
  const [searchParam, setSearchParam] = useState({
    content: '',
    personId: ''
  });
  const debouncedSearchParam = useDebounce(searchParam, 200);
  const [searchedList, setSearchedList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const param = QueryString.stringify(cleanObject(debouncedSearchParam));

    fetch(`${url}/projects?${param}`).then(async response => {
      if (response.ok) {
        setSearchedList(await response.json());
      }
    });
  }, [debouncedSearchParam]);

  useMount(() => {
    fetch(`${url}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
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
