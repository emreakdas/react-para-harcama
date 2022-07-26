import './App.css'
import Product from './components/Product'
import Header from './components/Header'
import Basket from './components/Basket'
import products from './products.json'
import { useState, useEffect } from 'react'
import currencyFormatter from 'currency-formatter'

function App() {

  const startMoney = 128000000000
  const currencyType = "USD" // try, usd vs.
  const [money, setMoney] = useState(0)
  const [basket, setBasket] = useState([])

  useEffect(() => {
    const totalBasket = basket.reduce((acc, item) => {
      return acc + products.find(product => item.id === product.id).price * item.amount 
    }, 0)

    setMoney(startMoney - totalBasket)

    if((startMoney - totalBasket) === 0){
      alert("Tebrikler, paranızı bitirdiniz!")
    }
  }, [basket])
  

  return (
    <div className="container">
      <Header money={currencyFormatter.format(money, { code: currencyType })} />

      <div className="products layout">
       {products && products.map((product, index) => (
         <Product key={index} product={product} basket={basket} setBasket={setBasket} money={money} currencyType={currencyType} />
       ))}
      </div>

      { basket.length > 0 && <Basket basket={basket} products={products} basketTotal={startMoney - money} currencyType={currencyType}  /> }
    </div>
  );
}

export default App;
