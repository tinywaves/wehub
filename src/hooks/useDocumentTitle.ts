import { useEffect, useRef } from 'react';

const useDocumentTitle = (title: string, keepWhenUnmount = true) => {
  const initialTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepWhenUnmount) {
        document.title = initialTitle;
      }
    };
  }, [initialTitle, keepWhenUnmount]);
};

export default useDocumentTitle;
