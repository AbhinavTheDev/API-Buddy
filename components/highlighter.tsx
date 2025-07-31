import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Highlighter(data: any) {
  return (
    <SyntaxHighlighter language="json" style={coy}>
      {data}
    </SyntaxHighlighter>
  );
}
