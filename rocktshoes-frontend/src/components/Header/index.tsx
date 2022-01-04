import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { Container, Cart } from "./styles";
import { useCart } from "../../hooks/useCart";
import { useStore } from "../../hooks/useStore";




const Header = (): JSX.Element => {
  const { cart } = useCart();
  const { store } = useStore()
  const cartSize = cart.length;

  document.title = store.attributes.name


  return (
    <Container>
      <Link to="/">
        <img src={`http://localhost:1337${store.attributes.logo}`} alt={store.attributes.name} />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};

export default Header;
