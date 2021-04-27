import Head from 'next/head'

import QA from '../features/qa/QA'

export default function Index() {
  return (
    <div>
      <Head>
        <title>The Awesome Q/A Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QA />
    </div>
  )
}
