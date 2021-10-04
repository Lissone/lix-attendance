import Head from 'next/head'

import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.container}>
        <h1>Hello world</h1>
      </main>
    </>
  )
}
