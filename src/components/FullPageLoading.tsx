import { LoadingOverlay } from '@mantine/core';
import { FullPageStyles } from './styles';

const FullPageLoading = () => (
  <FullPageStyles>
    <LoadingOverlay visible />
  </FullPageStyles>
);

export default FullPageLoading;
