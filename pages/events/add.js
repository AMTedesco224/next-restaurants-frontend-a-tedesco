
import { parseCookies } from '@/helpers/index'
import Layout from '@/components/Layout'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/Link'
import {API_URL} from '@/config/index'
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddEventPage({token}) {
  const [values , setValues] = useState({
    name:'',
    style:'',
    address:'',
    description:''
  })

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

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
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

  return (
    <Layout title='Add a New Restaurant'>
      <Link href='/events'>Go Back</Link>
      <h1>Add Restaurant</h1>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>

          <div>
            <label htmlFor='name'>Restaurant Name</label>
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

          <input type="submit" value="Add Restaurant" className='btn' />

      </form>

    </Layout>
  );
}

export async function getServerSideProps({req}) {
  const {token} = parseCookies(req)

  return {
    props: {
      token
    }
  }
}
