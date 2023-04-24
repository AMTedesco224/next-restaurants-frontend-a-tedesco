import Image from 'next/Image'
import Link from 'next/Link'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import styles from '@/styles/Event.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import MenuItem from '@/components/MenuItem'
import { CartProvider, useCart } from 'react-use-cart'

export default function EventPage({evt}) {
  const { addItem } = useCart()

  const menu = evt.dishes
  
  const router = useRouter()
  
  // console.log(menu)  
  
  return (
    <Layout>
      <div className={styles.event}>

      <h1>{evt.name}</h1>
      <ToastContainer />

        {evt.image && (<div className={styles.image}>
          <Image src={evt.image.formats.medium.url} width={960} height={600} alt='noimage' />
        </div>)}

        <h3>Style:</h3>
        <h4>{evt.style}</h4>
        <h3>Desctription:</h3>
        <h4>{evt.description}</h4>
        <h3>Location:</h3>
        <h4>{evt.address}</h4><br></br>
        <h3>Menu:</h3><br/>
        {menu.length === 0 && <h3>No menu to show right now...</h3>}
        {menu.map((dsh) => (
        <MenuItem key={dsh.id} dsh={dsh} />
        ))}


        <Link className='btn' href='/cart'>Go to Cart</Link><br/><br/>
        <Link className={styles.back} href='/events'>{'<'}Go back</Link>

        {/* <ShoppingCart></ShoppingCart> */}

      </div>

    </Layout>
  );
}

export async function getStaticPaths () {
  
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()
  
  const paths = events.map(evt => ({params: {slug: evt.slug}}))
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({params: {slug}}) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()
  
  return {
    props: {
      evt: events[0]
    },
    revalidate: 1,
  }
}
