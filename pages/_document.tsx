import NextDocument, {Head, Html, Main, NextScript} from 'next/document'
import * as React from 'react'
import {getCssString} from '../stitches.config'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await NextDocument.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/* Stitches CSS for SSR */}
            <style
              id="stitches"
              dangerouslySetInnerHTML={{__html: getCssString()}}
            />
          </>
        ),
      }
    } finally {
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins|Cooper|Roboto Condensed"/>*/}
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
