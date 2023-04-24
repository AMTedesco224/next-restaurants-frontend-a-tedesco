
import { useState, useContext } from "react";
// import fetch from "isomorphic-fetch";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardSection from "./CardSection";
// import AppContext from "./context";
import Cookies from "js-cookie";
import { API_URL } from "../config";
import styles from '@/styles/Checkout.module.css'
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CheckoutForm({token}) {
  const { cartTotal } = useCart()
  const { items } = useCart()
  const [stripePromise, setStripePromise] = useState(() => loadStripe('pk_test_51N0PaPDe7vPCKNz0DWM46nB2W3rnYZ2OIoEkJpt0EycNwGepBriGaw5HhebiiRcJ8n2ZNSNAATAuaJySCYmvmJTU00QrRYZyX0'))
  const [data, setData] = useState({
    address: "",
    city: "",
    state: "",
  });

  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter()

  function onChange(e) {
    // set the key = to the name property equal to the value typed
    const updateItem = (data[e.target.name] = e.target.value);
    // update the state data object
    setData({ ...data, updateItem });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const cardElement = elements.getElement(CardElement);
    const stripeToken = await stripe.createToken(cardElement);
    
    //validation
    const hasEmptyFields = Object.values(data).some(
      (element) => element === '')

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
      return
    }

    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({
        amount: cartTotal,
        order: items,
        address: data.address,
        city: data.city,
        state: data.state,
        stripeId: stripeToken.token.id,
      })
    }
    
    )
    if(!res.ok) {
      if (res.status === 403 || res.status === 401){
        toast.error('Authorization token missing')
        return
      }
      toast.error('Something went wrong!')
    } else {
      toast('Your Card Has Been Charged!')
      const order = await res.json()
      router.push(`/order/${res}`)
    }

  }







  return (
    <div>

            <ToastContainer />

            <div className={styles.grid}>
                <form className={styles.form}>
                    <label htmlFor="address">Address</label>
                        <input name="address" type="text" placeholder="Address" onChange={onChange}/>

                    <label htmlFor="city">City</label>
                        <input name="city" type="text" placeholder="City" onChange={onChange} />

                    <label htmlFor="state">State</label>
                        <input name="state" type="text" placeholder="State" onChange={onChange} />
                </form>
            </div>
            <Elements stripe={stripePromise}>

            <CardSection data={data} stripeError={error} submitOrder={handleSubmit} />

            </Elements>
      </div>
  )

}

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req)
  
    return {
      props: {
        data,
        token,
        stripeToken
      }
    }
  }
