import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <Button title="Test Button" onPress={() => {}} disabled={false} />,
    );
    const buttonElement = getByText('Test Button');

    expect(buttonElement).toBeDefined();
  });

  it('fires onPress event when clicked', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <Button title="Test Button" onPress={onPressMock} disabled={false} />,
    );
    const buttonElement = getByText('Test Button');

    fireEvent.press(buttonElement);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    const {getByTestId} = render(
      <Button title="Test Button" onPress={() => {}} disabled={true} />,
    );
    const touchableElement = getByTestId('touchableElement');

    expect(touchableElement.props.accessibilityState.disabled).toBe(true);
  });
});
