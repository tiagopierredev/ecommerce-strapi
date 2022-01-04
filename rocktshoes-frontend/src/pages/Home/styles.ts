import styled from 'styled-components'
import { darken } from 'polished'

export const Category = styled.ul`
  display: inline-box;
  margin-bottom: 3rem;
  list-style: none;
  height: 3rem;
  overflow: scroll;
  overflow-y: hidden;
  width: 100%;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #acacac;
    border-radius: 8px;
  }

  &::-webkit-overflow-scrooling:touch;
  
  li {
    margin-right: 1.5rem;
    background-color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background color 0.2s;
    height: 2rem;
    display: flex;
    &:hover {
      background: ${darken(0.01, '#7159c1')};
      color: #fff;
    }
  }
`

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  @media only screen and (max-width: 962px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 636px) {
    grid-template-columns: repeat(1, 1fr);
  }

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`
