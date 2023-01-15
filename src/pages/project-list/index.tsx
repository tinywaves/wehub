import { useState } from 'react';

import { LoadingOverlay, Notification } from '@mantine/core';
import { IconX } from '@tabler/icons';
import ListTable from './project-list-table';
import SearchPanel from './search-panel';
import ProjectListStyles from './styles';

import { useDebounce, useDocumentTitle, useProjects, useUsers } from 'hooks';

const ProjectListPage = () => {
  const [searchParam, setSearchParam] = useState({
    name: '',
    personId: ''
  });
  const debouncedSearchParam = useDebounce(searchParam, 200);
  const { isLoading, isError, data: list } = useProjects(debouncedSearchParam);
  const { data: users } = useUsers();
  useDocumentTitle('Project List', false);

  return (
    <ProjectListStyles>
      {/* isError的更新是异步，因此只能和纯异步的代码一起使用，不能和同步代码混用，所以以下的使用是正确的 */}
      {isError && (
        <Notification icon={<IconX size={18} />} color="red">
          Get project list meeting error!
        </Notification>
      )}
      <h2>项目列表</h2>
      <SearchPanel
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        users={users || []}
      />
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <ListTable projectList={list || []} users={users || []} />
      </div>
    </ProjectListStyles>
  );
};

export default ProjectListPage;
