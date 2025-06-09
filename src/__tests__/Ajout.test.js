import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Ajout from '../Ajout';

// helper function to fill and submit the form
const submitForm = async ({ description = '', amount = '', date = '' } = {}) => {
  const onAdd = jest.fn();
  render(<Ajout onAdd={onAdd} />);

  const descInput = screen.getByPlaceholderText('Libellé');
  const amountInput = screen.getByPlaceholderText('Montant');
  const dateInput = screen.getByLabelText('date');
  const submitButton = screen.getByRole('button', { name: /ajouter/i });

  if (description) await userEvent.type(descInput, description);
  if (amount) await userEvent.type(amountInput, amount);
  if (date) await userEvent.type(dateInput, date);

  await userEvent.click(submitButton);
  return onAdd;
};

test('calls onAdd with new transaction when form is valid', async () => {
  const date = '2023-01-02';
  const onAdd = await submitForm({ description: 'Lunch', amount: '12.5', date });

  expect(onAdd).toHaveBeenCalledTimes(1);
  const expected = {
    description: 'Lunch',
    amount: 12.5,
    date: new Date(date).toISOString(),
  };
  expect(onAdd).toHaveBeenCalledWith(expected);
});


test('does not call onAdd when required fields are missing', async () => {
  window.alert = jest.fn();
  const onAdd = await submitForm({ amount: '5', date: '2023-01-02' });
  expect(onAdd).not.toHaveBeenCalled();
  expect(window.alert).toHaveBeenCalled();
});