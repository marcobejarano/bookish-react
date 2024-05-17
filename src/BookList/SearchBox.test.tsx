import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";

describe('SearchBox', () => {
  it('renders input', async () => {
    const props = {
      term: '',
      onSearch: vi.fn(),
    };

    render(<SearchBox { ...props } />)

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'domain');

    expect(props.onSearch).toHaveBeenCalled();
  });

  it('trim empty strings', async () => {
    const props = {
      term: '',
      onSearch: vi.fn(),
    };

    render(<SearchBox { ...props } />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, '  ');

    expect(props.onSearch).not.toHaveBeenCalled();
  });
});
