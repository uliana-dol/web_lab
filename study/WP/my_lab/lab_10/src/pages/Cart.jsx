import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/actions';

const Cart = () => {
  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  const total = cart.reduce((s, i) => s + (i.time || 0) * (i.qty || 1), 0);

  return (
    <section className="container cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: 12 }}>
                <strong>{item.name}</strong> — {item.time} min × {item.qty}
                <button style={{ marginLeft: 12 }} onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </li>
            ))}
          </ul>
          <p><strong>Total time:</strong> {total} min</p>
          <div>
            <button onClick={() => dispatch(clearCart())}>Clear cart</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
