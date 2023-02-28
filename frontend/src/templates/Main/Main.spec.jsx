import { render, screen } from '@testing-library/react';
import Main from '.'

describe('<Header />', () => {
  it('should render its children', () => {
    const exampleChildren = () => <h1>example text</h1>

    render(<Main>{exampleChildren()}</Main>)

    const h1 = screen.getByText('example text')
    expect(h1).toBeInTheDocument()
  })
})
