import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import {useState} from "react";
import { useLocation } from 'react-router-dom'

function Payment() {

    /* Made a valiant attempt at implementing the PayPal API into the website. Made tremendous progress in very little time 
    but ultimately, with around an hour or so left before submission, I can't get it to work. See below my attempt. The code should
    at the very least load a PayPal button. */



    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);


    const createOrder = (data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                description: id + "-" +name,
                amount: {
                  currency_code: "GBP",
                  value: price,
                },
              },
            ],
            // not needed if a shipping address is actually needed
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          })
          .then((orderID) => {
            setOrderID(orderID);
            return orderID;
          });
      };
    
      const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
          const { payer } = details;
          setSuccess(true);
        });
      };
      
      const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
      };
      
      //This part was the most challenging
      const location = useLocation();
      const abcd = location.state;

      let array = abcd.toString().split(";");

      let price = array[0];
      let id = array[1];
      let name = array[2];

      return (
        <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
      )
    

      
}

export default Payment;