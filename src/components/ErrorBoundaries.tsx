// Error boundaries need to be implemented using class components.
// https://zh-hans.reactjs.org/docs/error-boundaries.html
import React from 'react';

import {
  ErrorBoundariesFallbackRender,
  ErrorBoundariesFallbackState
} from './interface';

export default class ErrorBoundaries extends React.Component<
  React.PropsWithChildren<ErrorBoundariesFallbackRender>,
  ErrorBoundariesFallbackState
> {
  state = { error: null };

  // 当子组件抛出错误时，这里被接收到并且调用getDerivedStateFromError函数，将抛出的error赋值给state里的error
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render(): React.ReactNode {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
