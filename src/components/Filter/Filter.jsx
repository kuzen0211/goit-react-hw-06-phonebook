import { useSelector, useDispatch } from 'react-redux';

import { Label, Input } from './Filter.styled';

import { filterActions, getFilter } from '../redux/filter.slice';

export const Filter = () => {
  const filterList = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <div>
      <Label>
        Find contacts by name
        <Input
          type="text"
          name="filter"
          value={filterList}
          onChange={evt => dispatch(filterActions(evt.target.value))}
        ></Input>
      </Label>
    </div>
  );
};
