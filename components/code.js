import  {Highlight, defaultProps, themes } from 'prism-react-renderer'

const Code = ({ children }) => {
  return (
    <Highlight {...defaultProps} theme={themes.nightOwlLight} code={children} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} whitespace-pre-wrap col-span-3 p-16 overflow-auto bg-white h-full`}
          style={{
            ...style,
            fontSize: 12,
          }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default Code
