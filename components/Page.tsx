import Head from 'next/head'

export const Page = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title} | Miguel Acero</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {children}
    </div>
  )
}
