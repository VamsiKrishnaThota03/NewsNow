import { render, screen } from '@testing-library/react';
import App from './App';

const article = (i) => ({
  title: `Headline ${i} - Example Times`,
  description: `Description ${i}`,
  url: `https://example.com/${i}`,
  urlToImage: null,
  author: 'Reporter',
  publishedAt: '2024-05-01T10:00:00Z',
  source: { id: null, name: 'Example Times' },
});

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ status: 'ok', totalResults: 2, articles: [article(1), article(2)] }) })
  );
});

test('renders headlines for the general category', async () => {
  render(<App />);
  expect(await screen.findByText('Headline 1')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /top general headlines/i })).toBeInTheDocument();
  expect(global.fetch.mock.calls[0][0]).toContain('category=general');
});

test('shows the API error message', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ status: 'error', code: 'apiKeyInvalid', message: 'Your API key is invalid.' }) })
  );
  render(<App />);
  expect(await screen.findByText(/your api key is invalid/i)).toBeInTheDocument();
});
