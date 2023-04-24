import {FASignInAlt, FaSignInAlt, FaSignOutAlt, FaShoppingCart, FaUserAlt} from 'react-icons/fa'
import {useContext} from 'react'
import Link from 'next/Link'
import Search from '@/components/Search'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/Header.module.css'
import { useCart } from 'react-use-cart'


export default function Header() {

  const { emptyCart } = useCart()

  const {user, logout} = useContext(AuthContext)
  return (
    <header className={styles.header}>

      <div className={styles.logo}>
        <Link href='/'>
            Restaurant finder
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
            <li>
                <Link href='/events'>
                Restaurants
                </Link>
            </li>
            {user ? (
            // If user is logged in
            <>
              <li>
                <Link href='/account/dashboard'>My Account</Link>
              </li>
              <li>
              <Link href='/cart'><FaShoppingCart />View Cart</Link>
              </li>
              <li>
                <Link href="#" onClick={() => {
                  logout()
                  setTimeout(() => {emptyCart()},2000)
                  }} className='btn-primary btn-icon'><FaSignOutAlt /> Logout</Link>  
              </li>          
              <li><FaUserAlt /> {user.username}</li>
            </>) : (
            // User not logged in
            <>
              <li>
                <Link className='btn-primary btn-icon' href='/account/register'><FaSignInAlt /> Create Account</Link>
              </li>   
              <li>
                <Link className='btn-primary btn-icon' href='/account/login'><FaSignInAlt /> Login</Link>
              </li>   
            </>)}
        </ul>
      </nav>

    </header>
  );
}
