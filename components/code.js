import React, { useState } from "react";

import theme from "prism-react-renderer/themes/nightOwl";

import Highlight, { defaultProps } from "prism-react-renderer";

import Nav from "./nav";

const Code = (props) => {
  return (
    <div className="h-screen w-screen bg-night-dark">
      <Nav {...props} />
      <Highlight
        {...defaultProps}
        theme={theme}
        code={props.code}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} `}
            style={{ ...style, padding: "5rem", paddingTop: 0 }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default Code;
