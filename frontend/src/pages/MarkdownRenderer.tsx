import React from 'react';
import {marked} from 'marked';

const MarkdownRenderer = ({ text }:any) => {
  const createMarkup = () => {
    return { __html: marked(text) };
  };

  return <div dangerouslySetInnerHTML={createMarkup()} />;
};

export default MarkdownRenderer;
