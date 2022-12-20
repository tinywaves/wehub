import { useEffect, useState } from 'react';
import QueryString from 'qs';

import ListTable from './project-list-table';
import SearchPanel from './search-panel';

import { useMount,useDebounce } from 'hooks';
import { cleanEmptyPropertyInObject } from 'utils';

const url = process.env.REACT_APP_API_URL;

const ProjectListPage = () => {
  const [searchParam, setSearchParam] = useState({
    name: '',
    personId: ''
  });

  const debouncedSearchParam=useDebounce(searchParam,5000)
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      `${url}/projects?${QueryString.stringify(
        cleanEmptyPropertyInObject(debouncedSearchParam)
      )}`
    ).then(async response => {
      if (response.ok) {
        setList(await response.json());
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
    <div>
      <SearchPanel
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        users={users}
      />
      <ListTable projectList={list} users={users} />
    </div>
  );
};

export default ProjectListPage;
