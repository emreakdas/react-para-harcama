import currencyFormatter from "currency-formatter";

function Basket({ basket, products, basketTotal, currencyType }) {
  return (
    <div className="layout receipt">
      <h6>Fişiniz</h6>
      <ul>
        {basket && basket.map((item, key) => {
          const findProduct = products.find(product => item.id === product.id)  

          return <li key={key}>
            <div>{findProduct.title}</div>
            <div>x{item.amount}</div>
            <div>{currencyFormatter.format(findProduct.price * item.amount, { code: currencyType })}</div>
          </li>
        })}
      </ul>
      <hr />
      <div>
        <div>Total:</div>
        <span>
          {currencyFormatter.format(basketTotal, { code: currencyType })}
        </span>
      </div>
    </div>
  );
}

export default Basket;
