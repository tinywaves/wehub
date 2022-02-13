import { useState, useEffect } from 'react';
import QueryString from 'qs';

import SearchPanel from 'pages/project-list/search-panel';
import List from 'pages/project-list/list-table';

import { cleanObject } from 'utils';
import useMount from 'hooks/useMount';
import useDebounce from 'hooks/useDebounce';

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListPage = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const debounceParam = useDebounce(param, 200);
  const [list, setList] = useState([]);

  // get projects.
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${QueryString.stringify(cleanObject(debounceParam))}`
    ).then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);

  // initialize users.
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </>
  );
};

export default ProjectListPage;
