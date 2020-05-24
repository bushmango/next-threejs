import Head from 'next/head'
import React from 'react'
import css from './Layout.module.scss'

export const Layout = (props: { children: React.ReactNode; title: string }) => {
  return (
    <div className={css.layout}>
      <Head>
        <title>{props.title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap'
          rel='stylesheet'
        ></link>
      </Head>

      <div>Three js test</div>
    </div>
  )
}
