import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/Link'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'

export default function NotFoundPage() {
  return (
    <Layout title='Page not found'>
      <div className={styles.error}>
        <h1><FaExclamationTriangle />404</h1>
        <h4>Sorry, that page couldn't be found</h4>
        <Link href='/'>Go back to homepage</Link>
      </div>
    </Layout>
  );
}
