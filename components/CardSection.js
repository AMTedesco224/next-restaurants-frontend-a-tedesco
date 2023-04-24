
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useCart } from "react-use-cart";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CardSection (props) {
    const { emptyCart } = useCart()
    // const stripePromise = loadStripe('pk_test_51N0PaPDe7vPCKNz0DWM46nB2W3rnYZ2OIoEkJpt0EycNwGepBriGaw5HhebiiRcJ8n2ZNSNAATAuaJySCYmvmJTU00QrRYZyX0')
    const [stripePromise, setStripePromise] = useState(() => loadStripe('pk_test_51N0PaPDe7vPCKNz0DWM46nB2W3rnYZ2OIoEkJpt0EycNwGepBriGaw5HhebiiRcJ8n2ZNSNAATAuaJySCYmvmJTU00QrRYZyX0'))
    return(
        
        <div>
            <ToastContainer />
            <div>
                <label htmlFor="card-element">Credit or debit card info</label>

                <div>
                    <fieldset style={{ border: "none" }}>
                        <div className="form-row">

                            <div id="card-element" style={{ width: "100%" }}>
                                <Elements stripe={stripePromise}>

                                <CardElement/>
                                </Elements>
                                
                            </div>

                            <br />

                            <div className="order-button-wrapper">
                                 <button className="btn" onClick={() => {props.submitOrder, emptyCart(), toast('Your card has been charged')}}>Confirm order</button>
                            </div>

                            {props.stripeError ? (
                                <div>{props.stripeError.toString()}</div>
                                ) : null}

                            <div id="card-errors" role="alert" />

                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}