import CartItem from "@/components/CartItem";
import Layout from "@/components/Layout";
import { useCart } from "react-use-cart";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import styles from '@/styles/Checkout.module.css'
import CardSection from "@/components/CardSection";
import { API_URL } from "../config";
import { useState } from "react";
import { useStripe, Elements, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Checkout () {
    const [stripePromise, setStripePromise] = useState(() => loadStripe('pk_test_51N0PaPDe7vPCKNz0DWM46nB2W3rnYZ2OIoEkJpt0EycNwGepBriGaw5HhebiiRcJ8n2ZNSNAATAuaJySCYmvmJTU00QrRYZyX0'))
  const { items } = useCart()
  const { emptyCart } = useCart()
  const { cartTotal } = useCart()

  const {user, logout} = useContext(AuthContext)
  
  return (
    <Layout>
        <ToastContainer />
      {user ? (

<div>
{items.length === 0 && <h3>Your cart is empty</h3>}
{items.map((item) => (
  <CartItem key={item.id} item={item}>
    {item.name}
    -qty:
    {item.quantity}
    -total:
    {item.itemTotal}
    
    </CartItem>

  ))}<br/>

<h2> Total: ${cartTotal}</h2><br/><br/>
            <button className="btn" onClick={emptyCart}>Empty Cart</button>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      </div>

      ) : (
        <div>
          <h1>You must be logged in to use checkout</h1>
        </div>
      )
      }
    </Layout>
  )
}


  


export default Checkout