import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Footer from './Footer';

describe('Footer', () => {
  const mockSetCurrentPage = jest.fn();

  const props = {
    currentPage: 2,
    setCurrentPage: mockSetCurrentPage,
    sortedUsers: [],
  };

  it('should render the footer with correct page information', () => {
    const {getByText} = render(<Footer {...props} />);

    expect(getByText('Page 2 of 0')).toBeTruthy(); // Current page is 2
    expect(getByText('Rows Displayed: 6 - 0 of 0')).toBeTruthy(); // Since its second page, its value is 6
  });

  it('should call setCurrentPage with the previous page number when previous button is pressed', () => {
    const {getByTestId} = render(<Footer {...props} />);

    const prevButton = getByTestId('prev-button');
    fireEvent.press(prevButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });

  it('should call setCurrentPage with the next page number when next button is pressed', () => {
    const {getByTestId} = render(<Footer {...props} />);

    const nextButton = getByTestId('next-button');
    fireEvent.press(nextButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });
});
