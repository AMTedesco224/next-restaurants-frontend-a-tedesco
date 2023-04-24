import Head from 'next/Head'
import {useRouter} from 'next/router'
import Showcase from './Showcase'
import Header from './Header'
import Footer from './Footer'
import styles from '@/styles/Layout.module.css'

export default function Layout({title, keywords, description, children}) {
  const router = useRouter();

  return (
    <div>
      <Head> 
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Header />
      {router.pathname === '/' && <Showcase />}

      <div className={styles.container}>
      {children}
      </div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
    title: 'Restaurant Finder | Find the best restaurants',
    description: "All the best food and drinks in town",
    keywords: "restaurants, food, drinks, bar"
}
