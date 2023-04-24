
import { parseCookies } from '@/helpers/index'
import moment from 'moment'
import {FaImage} from 'react-icons/fa'
import Layout from '@/components/Layout'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/Image'
import Link from 'next/Link'
import {API_URL} from '@/config/index'
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

export default function EditEventPage({ evt, token }) {
  const [values , setValues] = useState({
    name: evt.name,
    style: evt.style,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })

  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)

  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    //validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === '')

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
      return
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })
    if(!res.ok) {
      if (res.status === 403 || res.status === 401){
        toast.error('Authorization token missing')
        return
      }
      toast.error('Something went wrong!')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()
    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }

  return (
    <Layout title='Edit Restaurant'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Restaurant</h1>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>

          <div>
            <label htmlFor='name'>Restaurant name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={values.name} 
              onChange={handleInputChange} 
              />
          </div>

          <div>
            <label htmlFor='style'>Style</label>
            <input 
              type="text" 
              id="style" 
              name="style" 
              value={values.style} 
              onChange={handleInputChange} 
              />
          </div>

          <div>
            <label htmlFor='address'>Address</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              value={values.address} 
              onChange={handleInputChange} 
              />
          </div>

        </div>

          <div>
            <label htmlFor='description'>Description</label>
            <textarea 
              type="text" 
              id="description" 
              name="description" 
              value={values.description} 
              onChange={handleInputChange} 
              />
          </div>

          <input type="submit" value="Update Restaurant" className='btn' />

      </form>

      <h2>Restaurant Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt='noimage'/>
        ) : ( <div>
          <p>No image uploaded</p>
        </div>
        )}

        <div>
          <button onClick={() => setShowModal(true)} className='btn'><FaImage /> Upload Image</button>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} token={token} />
        </Modal>

    </Layout>
  );
}

export async function getServerSideProps({ params: {id}, req }) {
const {token} = parseCookies(req)

  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()

  return {
    props: {
      evt,
      token,
    }
  }
}