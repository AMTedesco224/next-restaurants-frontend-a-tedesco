import CartItem from "@/components/CartItem";
import Layout from "@/components/Layout";
import { useCart } from "react-use-cart";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import Link from "next/Link";

function Cart () {
  const { items } = useCart()
  const { emptyCart } = useCart()
  const { cartTotal } = useCart()

  const {user, logout} = useContext(AuthContext)

  

  return (
    <Layout>
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
            <button className="btn" onClick={emptyCart}>Empty Cart</button><br/><br/>
            <Link className="btn" href='/checkout'>Checkout</Link>

      </div>

      ) : (
        <div>
          <h1>You must be logged in to use cart</h1>
        </div>
      )
      }
    </Layout>
  )
}


export default Cart
