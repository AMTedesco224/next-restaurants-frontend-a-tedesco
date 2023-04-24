import Link from 'next/Link'
import styles from '@/styles/CartItem.module.css'
import { useCart } from 'react-use-cart';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CartItem({item}) {
  const { updateItemQuantity } = useCart()
  const { addItem } = useCart()


  return (
    <div className={styles.cartItem}>
        <h3>${item.itemTotal}</h3>

      <div className={styles.info}>
        <h3>{item.name}</h3>
      </div>
        <h4>qty: {item.quantity}</h4>
        <button className={styles.plusminus} onClick={() => {
          addItem({name: item.name, id: item.id, quantity: 1, price: item.price})}}>+</button>  <button className={styles.plusminus} onClick={() => updateItemQuantity(item.id, item.quantity -1)}>-</button>
    </div>
  );
}
