import React, { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { ProductList, Category } from "./styles";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { useCart } from "../../hooks/useCart";



interface ProductApi {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    active: boolean;
    image: {
      data: {
        attributes: { url: string }
      }
    }
  }
}


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;

}

interface ProductFormatted extends Product {
  priceFormatted: string;
  image: string
  active: boolean
}

interface CartItemsAmount {
  [key: number]: number;
}

interface CategoryApi {
  id: number,
  attributes: {
    name: string
  },
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const [currentCategory, setCurrentCategory] = useState('Todos')
  const [categories, setCategories] = useState([{ name: 'Todos' }])
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;
    return sumAmount;
  }, {} as CartItemsAmount);


  useEffect(() => {

    async function loadCategories() {
      var response = await api.get("categories?populate=*")


      const newListCategory = response.data.data.map((category: CategoryApi) =>
        category
          ? {
            name: category.attributes.name
          } : category
      )

      setCategories([...categories, ...newListCategory])
    }


    loadCategories()
    console.log(categories)

  }, [])

  useEffect(() => {
    async function loadProducts() {
      var response = await api.get("products?populate=*")

      // http://localhost:1337/api/products?populate=image&[filters][categories][name][$eq]=Varejo

      const newListCart = response.data.data.map((product: ProductApi) =>
        product
          ? {
            ...product.attributes,
            id: product.id,
            priceFormatted: formatPrice(product.attributes.price),
            image: product.attributes.image.data.attributes.url,
            active: product.attributes.active
          }
          : product
      );

      setProducts(newListCart);
    }

    async function loadProductsCategory() {
      var response = await api.get(`products?populate=image&[filters][categories][name][$eq]=${currentCategory}`)

      // http://localhost:1337/api/

      const newListCart = response.data.data.map((product: ProductApi) =>
        product
          ? {
            ...product.attributes,
            id: product.id,
            priceFormatted: formatPrice(product.attributes.price),
            image: product.attributes.image.data.attributes.url,
            active: product.attributes.active
          }
          : product
      );

      setProducts(newListCart);
    }

    if (currentCategory === 'Todos') {
      loadProducts();
    } else {
      loadProductsCategory()
    }

  }, [currentCategory]);

  function handleAddProduct(productId: number) {
    addProduct(productId);
  }

  function handleChangeCategories(name: string) {
    setCurrentCategory(name)
  }

  return (
    <>
      <Category>
        {categories.map((categories) => {
          return (<li onClick={() => {
            handleChangeCategories(categories.name)
          }} style={{ color: categories.name === currentCategory ? '#fff' : '#000', background: categories.name === currentCategory ? '#7159c1' : '#fff' }}>{categories.name}</li>)
        })}
      </Category>
      <ProductList>
        {products.map((product) => {
          if (product.active === true) {
            return (
              <li key={product.id}>
                <img src={`http://localhost:1337${product.image}`} alt={product.title} />
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
                <button
                  type="button"
                  data-testid="add-product-button"
                  onClick={() => handleAddProduct(product.id)}
                >
                  <div data-testid="cart-product-quantity">
                    <MdAddShoppingCart size={16} color="#FFF" />
                    {cartItemsAmount[product.id] || 0}
                  </div>

                  <span>ADICIONAR AO CARRINHO</span>

                </button>
              </li>
            );
          }

        })}
      </ProductList>
    </>

  );
};

export default Home;
