import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header, {styles} from './Header';

describe('Header', () => {
  const mockTriggerSortByColumn = jest.fn();

  const users = [
    {name: 'John', age: 30},
    {name: 'Jane', age: 25},
  ];

  const props = {
    triggerSortByColumn: mockTriggerSortByColumn,
    users,
    sortBy: 'name',
  };

  it('should render the header with column names', () => {
    const {getByText} = render(<Header {...props} />);

    expect(getByText('name')).toBeTruthy();
    expect(getByText('age')).toBeTruthy();
  });

  it('should call triggerSortByColumn with the column name when a column header is pressed', () => {
    const {getByText} = render(<Header {...props} />);

    const nameColumnHeader = getByText('name');
    fireEvent.press(nameColumnHeader);

    expect(mockTriggerSortByColumn).toHaveBeenCalledWith('name');
  });

  it('should apply columnSorted style to the sorted column header', () => {
    const {getByText} = render(<Header {...props} />);

    const nameColumnHeader = getByText('name');
    const ageColumnHeader = getByText('age');

    expect(nameColumnHeader.props.style).toContainEqual(styles.columnSorted);
    expect(ageColumnHeader.props.style).not.toContainEqual(styles.columnSorted);
  });
});
