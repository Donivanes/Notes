import React, { useState, useRef, useEffect } from "react";

export const Product = ({ product }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: "EUR",
                  value: product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: (err) => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    return (
      <div>
        <h1>Felicidades, has comprado {product.name}!</h1>
      </div>
    );
  }

  return (
    <div>
      {error && <div>Ups, ha ocurrido un error {error.message}</div>}
      <h1>
        {product.description} por {product.price}€
      </h1>
      <div ref={paypalRef} />
    </div>
  );
};
