import Link from 'next/Link'
import Image from 'next/Image'
import styles from '@/styles/EventItem.module.css'

export default function EventItem({evt}) {
  
  return (
    <div className={styles.event}>
      <div className={styles.image}>
        <Image src={evt.image ? evt.image.formats.thumbnail.url : '/images/event-default.png' }
          width={170}
          height={100} 
          alt='No Image'
        />
      </div>

      <div className={styles.info}>
        <h4>{evt.style}</h4>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link className='btn' href={`/events/${evt.slug}`}>Details</Link>
      </div>
    </div>
  );
}
