import { createContext, ReactNode, useContext, useState, useEffect } from "react";

import { api } from "../services/api";


interface StoreProviderProps {
  children: ReactNode;
}



interface StoreContextData {
  store: {
    id: number,
    attributes: {
      name: string,
      phone: number,
      logo: string
    }
  };
}

interface Store {
  id: number,
  attributes: {
    name: string,
    phone: number,
    logo: string
  }
}

const StoreContext = createContext<StoreContextData>({} as StoreContextData);

export function StoreProvider({ children }: StoreProviderProps): JSX.Element {

  const [store, setStore] = useState({
    id: 1,
    attributes: {
      name: '',
      phone: 0,
      logo: ""
    }
  } as Store)


  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("store?populate=*");

      const storeFormated = {
        id: response.data.data.id,
        attributes: {
          name: response.data.data.attributes.name,
          phone: response.data.data.attributes.phone,
          logo: response.data.data.attributes.logo.data.attributes.url
        }
      }

      setStore(storeFormated);
    }

    loadProducts();
  }, [])

  return (
    <StoreContext.Provider
      value={{ store }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextData {
  const context = useContext(StoreContext);

  return context;
}