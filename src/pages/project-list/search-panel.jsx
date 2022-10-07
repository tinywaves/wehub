

const SearchPanel = ({searchParam,setSearchParam,users}) => {
  



  return (
    <form>
      <div>
        <input
          type="text"
          value={searchParam.content}
          onChange={e =>
            setSearchParam({
              ...searchParam,
              content: e.target.value
            })
          }
        />
        <select
          value={searchParam.personId}
          onChange={e =>
            setSearchParam({
              ...searchParam,
              personId: e.target.value
            })
          }
        >
          <option value="">负责人</option>
          {users.map(user => {
            return <option value={user.id} key={user.id}>{user.name}</option>;
          })}
        </select>
      </div>
    </form>
  );
};

export default SearchPanel;
