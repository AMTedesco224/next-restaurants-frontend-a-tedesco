
import Link from 'next/Link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import {API_URL} from '@/config/index'

export default function HomePage({events}) {

  return (
    <Layout title='Restaurant Finder'>
      <h1>Recommended Restaurants</h1>
      {events.length === 0 && <h3>No restaurants to show right now...</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link className='btn-secondary' href='events'>View All restaurants</Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_limit=3`)
  const events = await res.json()
  return {
    props: { events },
    revalidate: 1,
  }
}


