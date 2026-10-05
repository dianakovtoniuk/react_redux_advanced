import { useEffect } from 'react';

import { useAppSelector } from './store/hooks';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const showCart = useAppSelector((state) => state.ui.cartIsVisible);
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    fetch('https://react-http-6b4a6.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;