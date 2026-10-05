import { useAppDispatch } from '../../store/hooks';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

export interface CartItemData {
  id: string;
  title: string;
  quantity: number;
  total: number;
  price: number;
}

interface CartItemProps {
  item: CartItemData;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const { title, quantity, total, price, id } = item;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;