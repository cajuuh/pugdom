import { render } from '@testing-library/react-native';
import StatusActionBar from './StatusActionBar';

// Mock the context and hooks if necessary
jest.mock('../../hooks/useMastodonAPI', () => ({
  useMastodonAPI: () => ({
    favoriteStatus: jest.fn(),
    reblogStatus: jest.fn(),
    bookmarkStatus: jest.fn(),
    loading: false,
    error: null,
  }),
}));

describe('StatusActionBar Accessibility', () => {
  it('renders buttons with appropriate accessibility labels', () => {
    const { getByLabelText } = render(
      <StatusActionBar statusId="123" onReplyPress={() => {}} />
    );

    expect(getByLabelText('Reply')).toBeTruthy();
    expect(getByLabelText('Favorite')).toBeTruthy();
    expect(getByLabelText('Reblog')).toBeTruthy();
    expect(getByLabelText('Bookmark')).toBeTruthy();
    expect(getByLabelText('More options')).toBeTruthy();
  });
});
