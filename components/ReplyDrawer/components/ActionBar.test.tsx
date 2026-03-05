import { render } from '@testing-library/react-native';
import ActionBar from './ActionBar';

jest.mock('../../../hooks/useTheme', () => ({
  useTheme: () => ({ backgroundColor: '#fff', textColor: '#000' }),
}));

jest.mock('../../../context/AppContext', () => ({
  useAppContext: () => ({
    instanceInfo: {
      configuration: { statuses: { max_media_attachments: 4 } },
    },
  }),
}));

describe('ActionBar Accessibility', () => {
  it('renders action buttons with appropriate accessibility labels', () => {
    const { getByLabelText } = render(
      <ActionBar onImageSelect={() => {}} selectedImages={[]} openPoll={() => {}} />
    );

    expect(getByLabelText('Add image')).toBeTruthy();
    expect(getByLabelText('Add GIF')).toBeTruthy();
    expect(getByLabelText('Add Mention')).toBeTruthy();
    expect(getByLabelText('Add Hashtag')).toBeTruthy();
    expect(getByLabelText('Toggle Content Warning')).toBeTruthy();
    expect(getByLabelText('Create poll')).toBeTruthy();
  });
});
