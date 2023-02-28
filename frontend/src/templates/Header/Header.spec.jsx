import { render, screen } from '@testing-library/react';
import Header from '.'

describe('<Header />', () => {
  it('should render the page title', () => {
    render(<Header />)

    const h1 = screen.getByText('to-do list')
    expect(h1).toBeInTheDocument()
  })
})
