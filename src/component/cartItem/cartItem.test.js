import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CartItem from './CartItem';

// Mock functions for testing
const mockOnRemove = jest.fn();
const mockOnUpdateQuantity = jest.fn();

// Sample item data for testing
const mockItem = {
  product: {
    id: 1,
    name: 'Sample Product',
    price: 10.00
  },
  quantity: 2
};

test('renders CartItem component with item details and handles interactions', () => {
  render(
    <CartItem
      item={mockItem}
      onRemove={mockOnRemove}
      onUpdateQuantity={mockOnUpdateQuantity}
    />
  );

  // Check if the product name and price are rendered
  expect(screen.getByText('Sample Product')).toBeInTheDocument();
  expect(screen.getByText('20.00€')).toBeInTheDocument(); 

  // Check if quantity input is rendered with the correct value
  const quantityInput = screen.getByRole('spinbutton');
  expect(quantityInput).toHaveValue(2);

  // Change quantity and check if the onUpdateQuantity function is called
  fireEvent.change(quantityInput, { target: { value: 3 } });
  expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 3);

  // Click on the remove button and check if the onRemove function is called
  const removeButton = screen.getByText('Remove');
  fireEvent.click(removeButton);
  expect(mockOnRemove).toHaveBeenCalledWith(1);
});
