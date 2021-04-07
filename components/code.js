import theme from 'prism-react-renderer/themes/nightOwlLight'
import Highlight, { defaultProps } from 'prism-react-renderer'

const Code = ({ jsx }) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={jsx} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} whitespace-pre-wrap col-span-2`}
          style={{
            ...style,
            padding: '5rem',
            paddingTop: 0,
            height: 'calc(100vh - 110px)',
            overflow: 'scroll',
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
