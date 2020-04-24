import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import { useUser } from "../../lib/auth.api";
import styled from "styled-components";
import PaypalCheckoutButton from "../components/PaypalCheckoutButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4em;
`;

const Button = styled.button`
  background-color: #fce38a;
  color: black;
  border: 1px solid black;
  border-radius: 2em;
  box-shadow: 5px 5px 10px #000000;
  padding: 2em 0;
  margin: 1.5em;
  width: 20vw;
  font-size: 1em;
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

  if (!user) {
    return <div>cargando</div>;
  } else
    return (
      <Container>
        <div>hola </div>
        <PaypalCheckoutButton />
      </Container>
    );
};

export const TeacherPutCalifications = withProtected(Page);
