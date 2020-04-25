import React, { useState, useEffect } from "react";
import { withProtected } from "../../lib/protectRoute.hoc";
import { useUser } from "../../lib/auth.api";
import styled from "styled-components";
import { PaypalCheckoutButton } from "../components/PaypalCheckoutButton";

import Badge from "react-bootstrap/Badge";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4em;
`;
const style = {
  margin: "3em",
  padding: "1em",
  border: "1px solid #f38181",
};

const order = {
  customer: "Ironhacker",
  total: "5.00",
  items: [
    {
      sku: "Ironhack",
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
      <>
        <style type="text/css">
          {`
    }
    .badge-edit{
      background-color: #f38181
    }
    `}
        </style>
        <Container style={style}>
          <h2>Ups, parece que seguimos en desarrollo</h2>
          <h3>Ayudanos a continuar haciendo click aqui abajo</h3>
          <br />
          <h3>
            <Badge variant="edit">Dona 5€</Badge>
          </h3>
          <PaypalCheckoutButton order={order} />
        </Container>
      </>
    );
};

export const TeacherCalificate = withProtected(Page);
