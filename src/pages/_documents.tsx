import { Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="favicon.ico"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}