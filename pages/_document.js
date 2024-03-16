import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            data-domain="gltf.pmnd.rs"
            src="https://analytics.iamsaravieira.com/js/plausible.js"
            strategy="afterInteractive"
          />
        </body>
      </Html>
    )
  }
}
