import  { useEffect, useState } from 'react';

import SearchPanel from './search-panel';
import ListTable from './list-table';

const url = process.env.REACT_APP_API_URL;

const ProjectListPage = () => {
  const [searchParam, setSearchParam] = useState({
    content: '',
    personId: ''
  });
  const [searchedList, setSearchedList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${url}/projects`).then(async response => {
      if (response.ok) {
        setSearchedList(await response.json());
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
