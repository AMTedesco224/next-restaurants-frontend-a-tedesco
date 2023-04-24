import Link from 'next/Link'
import styles from '@/styles/EventItem.module.css'
import { useState } from 'react'
import { API_URL } from '../config'
import { useCart } from 'react-use-cart'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function MenuItem({dsh}) {
  const { addItem } = useCart()


  
  return (
    <div className={styles.event}>
      <ToastContainer />

      <div className={styles.info}>
        <h3>{dsh.name}</h3>
        <h4>Price: ${dsh.price}</h4>
        <p>{dsh.description}</p>
      </div>

      <div className={styles.link}>
        <button className='btn' onClick={ () => {
          addItem({name: dsh.name, id: dsh.id, quantity: 1, price: dsh.price})
          toast(`${dsh.name} added to cart`, {autoClose: 1400})
      }}>
        Place Order
        </button>
      </div>
    </div>
  );
}

