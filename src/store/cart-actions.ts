import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';
import type { CartState, CartStoreItem } from './cart-slice';
import type { AppThunk } from './index';

const FIREBASE_URL = 'https://qwerty-b20ab-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

interface FetchedCart {
  items?: CartStoreItem[];
  totalQuantity?: number;
}

export const fetchCartData = (): AppThunk => {
  return async (dispatch) => {
    const fetchData = async (): Promise<FetchedCart | null> => {
      const response = await fetch(FIREBASE_URL);

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData?.items || [],
          totalQuantity: cartData?.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

export const sendCartData = (cart: CartState): AppThunk => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(FIREBASE_URL, {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};