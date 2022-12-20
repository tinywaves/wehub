import { useEffect, useState } from 'react';
import QueryString from 'qs';

import ListTable from './list-table';
import SearchPanel from './search-panel';

import { cleanEmptyPropertyInObject } from 'utils';

const url = process.env.REACT_APP_API_URL;

const ProjectListPage = () => {
  const [searchParam, setSearchParam] = useState({
    name: '',
    personId: ''
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      `${url}/projects?${QueryString.stringify(
        cleanEmptyPropertyInObject(searchParam)
      )}`
    ).then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [searchParam]);

  useEffect(() => {
    fetch(`${url}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
  return (
    <div>
      <SearchPanel
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        users={users}
      />
      <ListTable list={list} users={users} />
    </div>
  );
};

export default ProjectListPage;
