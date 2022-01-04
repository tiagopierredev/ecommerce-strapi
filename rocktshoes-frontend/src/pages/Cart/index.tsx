import React, { useEffect, useState } from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

import { useCart } from "../../hooks/useCart";
import { useStore } from "../../hooks/useStore";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total } from "./styles";

import { useHistory } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {

  const history = useHistory();
  const { cart, removeProduct, updateProductAmount } = useCart();

  const [messageWhatsapp, setmessageWhatsapp] = useState<string>()

  const { store } = useStore()


  const cartFormatted = cart.map((product) => {
    return {
      ...product,
      priceFormatted: formatPrice(product.price),
      subTotal: formatPrice(product.price * product.amount),
    };
  });

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      sumTotal += product.price * product.amount;
      return sumTotal;
    }, 0)
  );


  function handleProductIncrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 });
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  function handleFinishShopping() {
    var message = 'Olá passei na sua loja virtual, e gostaria de comprar os seguintes produtos:\n'

    for (var i = 0; i < cart.length; i++) {
      message += "\n" + `*${cartFormatted[i].title}*\n*Quantidade:* ${cart[i].amount}\n*Valor:* ${cartFormatted[i].priceFormatted}\n\n`;
    }
    var valueTotal = message + `\n\*Valor total:* ${total}`

    const encoded = encodeURI(valueTotal)

    setmessageWhatsapp(`https://api.whatsapp.com/send?phone=55${store.attributes.phone}&text=${encoded}`)
  }


  useEffect(() => {
    handleFinishShopping()
  })

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>

        {cartFormatted.map((product) => {
          return (
            <tbody key={product.id}>
              <tr data-testid="product">
                <td>
                  <img src={`http://localhost:1337${product.image}`} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={product.amount <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={product.amount}
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subTotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </ProductTable>

      <footer>
        <a href={messageWhatsapp}>Finalizar pedido</a>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container >
  );
};

export default Cart;
