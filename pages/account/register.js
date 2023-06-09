import {FaUser} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect, useContext} from 'react'
import Link from 'next/Link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const {register, error} = useContext(AuthContext)
  
  useEffect(() => {error && toast.error(error)})

  const handleSubmit = (e) => {
    e.preventDefault()

    if(username === ''){
      toast.error('Please enter a username')
      return
    }

    if(password !== passwordConfirm) {
        toast.error("passwords do not match")
        return
    }
    toast('Account created successfully!')
    setTimeout(() => {

      register({username, email, password})
    }, 5000)
  }


  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1><FaUser /> Create account</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='username'>Username</label> 
              <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <label htmlFor='email'>Email Address</label> 
              <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label htmlFor='password'>Password</label> 
              <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <label htmlFor='passwordConfirm'>Confirm Password</label> 
              <input type="password" id='passwordConfirm' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
            </div>

            <input type="submit" value="Create Account" className="btn" />
        </form>

        <p>Already have an account? <Link href='/account/login'>Login here</Link></p>
      </div>
    </Layout>
  );
}
