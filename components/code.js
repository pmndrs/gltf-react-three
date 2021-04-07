import theme from "prism-react-renderer/themes/nightOwlLight";
import Highlight, { defaultProps } from "prism-react-renderer";

const Code = ({ jsx }) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={jsx} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} whitespace-pre-wrap `}
          style={{
            ...style,
            padding: "5rem",
            paddingTop: 0,
            maxHeight: "calc(100vh - 110px)",
            overflow: "scroll",
            fontSize: 14,
          }}
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
  );
};

export default Code;
