import React, { useState, useEffect } from 'react';
import QueryString from 'qs';

import { SearchPanel } from './search-panel';
import { List } from './list-table';

import { cleanObject } from 'utils';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListPage = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [list, setList] = useState([]);

  // get projects
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${QueryString.stringify(cleanObject(param))}`
    ).then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  // initialize users
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </>
  );
};
