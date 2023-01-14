import { ReactElement } from 'react';

export interface FullPageErrorFeedbackProps {
  error: Error | null;
}

export interface ErrorBoundariesFallbackRender {
  fallbackRender: (props: { error: Error; }) => ReactElement;
};

export interface ErrorBoundariesFallbackState {
  error: Error | null;
};
