import { render, screen } from '@testing-library/react';
import Footer from '.'

describe('<Footer/>', () => {
  it('should render the footer text', () => {
    render(<Footer />)

    expect.assertions(2)

    const span = screen.getByText('Developed by .')
    expect(span).toBeInTheDocument()

    const strong = screen.getByText('Pablo Bombonato')
    expect(strong).toBeInTheDocument()
  })
})
