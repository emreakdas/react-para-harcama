import currencyFormatter from 'currency-formatter'

function Product({ product, basket, setBasket, money, currencyType}) {
  const basketAmount = basket.find((item) => item.id === product.id);

  const addBasket = (product_id) => {
    const findProduct = basket.find((item) => item.id === product_id);
    const findProductIndex = basket.findIndex((item) => item.id === product_id);

    if (findProduct) {
      const copyBasket = [...basket];
      copyBasket.splice(findProductIndex, 1, {
        id: product_id,
        amount: findProduct.amount + 1,
      });
      setBasket(copyBasket);
    } else {
      setBasket([...basket, { id: product_id, amount: 1 }]);
    }
  };

  const removeBasket = (product_id) => {
    const findProduct = basket.find((item) => item.id === product_id);
    const findProductIndex = basket.findIndex((item) => item.id === product_id);

    if (findProductIndex !== -1) {
      const copyBasket = [...basket];
      if (findProduct.amount - 1 === 0) {
        copyBasket.splice(findProductIndex, 1);
      } else {
        copyBasket.splice(findProductIndex, 1, {
          id: product_id,
          amount: findProduct.amount - 1,
        });
      }
      setBasket(copyBasket);
    }
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.title} />
      <h6>{product.title}</h6>
      <span>{currencyFormatter.format(product.price, { code: currencyType })}</span>
      <div className="actions">
        <button
          onClick={() => {
            removeBasket(product.id);
          }}
          disabled = {basketAmount ? false : true}
        >
          Sat
        </button>
        <span>{basketAmount ? basketAmount.amount : 0}</span>
        <button
          onClick={() => {
            addBasket(product.id);
          }}

          disabled = {money < product.price  ? true : false}
        >
          Satın Al
        </button>
      </div>
    </div>
  );
}

export default Product;
