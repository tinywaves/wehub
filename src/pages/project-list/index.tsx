import { useEffect, useState } from 'react';
import QueryString from 'qs';

import ListTable from './project-list-table';
import SearchPanel from './search-panel';

import { useMount, useDebounce, useHttp } from 'hooks';
import { cleanEmptyPropertyInObject } from 'utils';

import ProjectListStyles from './styles';

const url = process.env.REACT_APP_API_URL;

const ProjectListPage = () => {
  const [searchParam, setSearchParam] = useState({
    name: '',
    personId: ''
  });

  const debouncedSearchParam = useDebounce(searchParam, 200);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const client = useHttp();

  useEffect(() => {
    client('/projects', {
      requestData: cleanEmptyPropertyInObject(searchParam)
    }).then(setList);
  }, [debouncedSearchParam]);

  useMount(() => {
    client('/users').then(setUsers);
  });
  return (
    <ProjectListStyles>
      <h2>项目列表</h2>
      <SearchPanel
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        users={users}
      />
      <ListTable projectList={list} users={users} />
    </ProjectListStyles>
  );
};

export default ProjectListPage;
