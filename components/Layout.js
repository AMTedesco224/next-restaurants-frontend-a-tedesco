import Head from 'next/Head'
import Link from 'next/Link'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'

export default function Layout({title, keywords, description, children}) {
  return (
    <div>
      <Head> 
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Header />

      <div className={styles.container}>
      {children}
      </div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
    title: 'DJ Events | Find the hottest parties',
    description: "All the best live music DJs and parties",
    keywords: "Live music, DJs, Clubs"
}
