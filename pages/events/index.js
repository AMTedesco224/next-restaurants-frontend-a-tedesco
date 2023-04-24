

import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import {API_URL, PER_PAGE} from '@/config/index'
import Pagination from '@/components/Pagination'
import MenuItem from '@/components/MenuItem'

export default function EventsPage({ events, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE)

  return (
    <Layout title='Browse Restaurants'>
      <h1>Browse Restaurants</h1>
      {events.length === 0 && <h3>No restaurants to show right now...</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({query: { page = 1 }}) {

  // calc start page
  const start = +page === 1 ? 0 : (+page -1) * PER_PAGE

  //fetch total
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetch events
  const eventRes = await fetch(`${API_URL}/events?_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventRes.json()

  return {
    props: { events, page: +page, total },

  }
}