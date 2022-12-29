import { TextInput, Select } from '@mantine/core';
import { IconClipboardList } from '@tabler/icons';
import { SearchPanelStyles } from './styles';

import { SearchPanelProps } from './interface';

const SearchPanel = ({
  searchParam,
  setSearchParam,
  users
}: SearchPanelProps) => {
  return (
    <SearchPanelStyles>
      <TextInput
        label="Project Name"
        placeholder="Input Project Name..."
        icon={<IconClipboardList size={14} />}
        value={searchParam.name}
        onChange={e => setSearchParam({ ...searchParam, name: e.target.value })}
      />
      <Select
        label="Managers"
        placeholder="Pick one"
        data={[
          { value: '', label: 'ALL' },
          ...users.map(user => ({ value: user.id, label: user.name }))
        ]}
        onChange={(value: string) =>
          setSearchParam({ ...searchParam, personId: value })
        }
      />
    </SearchPanelStyles>
  );
};

export default SearchPanel;
