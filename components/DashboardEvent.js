import Link from "next/Link";
import { FaPencilAlt, FaTimes} from 'react-icons/fa'
import styles from '@/styles/DashboardEvent.module.css'

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
        <h4>
            <Link href={`/events/${evt.slug}`}>{evt.name}</Link>
        </h4>
        <Link className={styles.edit} href={`/events/edit/${evt.id}`}><FaPencilAlt /><span>Edit</span></Link>

        <Link 
        className={styles.delete} 
        href='#' 
        onClick={() => {handleDelete(evt.id) 
        }}>
        <FaTimes /><span>Delete</span>
        </Link>
      
    </div>
  );
}
