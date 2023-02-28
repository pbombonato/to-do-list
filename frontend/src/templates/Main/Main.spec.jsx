import { render, screen } from '@testing-library/react';
import Main from '.'

describe('<Header />', () => {
  it('should render its children', () => {
    render(<Main><h1>Título para teste</h1></Main>)

    const h1 = screen.getByText('Título para teste')
    expect(h1).toBeInTheDocument()
  })
})
