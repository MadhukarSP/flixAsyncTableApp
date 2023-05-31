import React from 'react';
import {render} from '@testing-library/react-native';
import RowItem from './RowItem';

describe('RowItem', () => {
  const item = {
    name: 'John',
    age: 30,
  };

  const props = {
    item,
  };

  it('should render the row item with cell values', () => {
    const {getByText} = render(<RowItem {...props} />);

    expect(getByText('John')).toBeTruthy();
    expect(getByText('30')).toBeTruthy();
  });
});
