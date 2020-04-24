import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import { useUser } from "../../lib/auth.api";
import styled from "styled-components";
import { Product } from "../components/PaypalButton";
import { PaypalCheckoutButton } from "../components/PaypalCheckoutButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4em;
`;

const order = {
  customer: "Ironhacker",
  total: "5.00",
  items: [
    {
      sku: "111",
      name: "Ayudita al desarrollador",
      price: "5.00",
      quantity: 1,
      currency: "EUR",
    },
  ],
};

const Page = (props) => {
  const user = useUser();
  const product = {
    price: 5.0,
    name: "Ayuda al desarrolador",
    description: "Ayuda a un ironhacker",
  };

  if (!user) {
    return <div>cargando</div>;
  } else
    return (
      <Container>
        <div>hola </div>
        <PaypalCheckoutButton order={order} />
      </Container>
    );
};

export const TeacherCalificate = withProtected(Page);
