import theme from 'prism-react-renderer/themes/nightOwlLight'
import Highlight, { defaultProps } from 'prism-react-renderer'

const Code = ({ children }) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={children} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} whitespace-pre-wrap col-span-3 p-16 overflow-auto bg-white`}
          style={{
            ...style,
            fontSize: 12,
            height: 'calc(100vh - 56px)',
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
