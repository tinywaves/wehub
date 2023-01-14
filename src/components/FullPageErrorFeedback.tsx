import { Blockquote } from '@mantine/core';
import { FullPageStyles } from './styles';

import { FullPageErrorFeedbackProps } from './interface';

const FullPageErrorFeedback = ({ error }: FullPageErrorFeedbackProps) => {
  return (
    <FullPageStyles>
      <Blockquote cite="- jira-imitation" icon={null}>
        {error?.message}
      </Blockquote>
    </FullPageStyles>
  );
};

export default FullPageErrorFeedback;
