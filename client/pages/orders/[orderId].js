// import { useState, useEffect } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import useRequest from "../../hooks/use-request";

// const OrderShow = ({ order, currentUser }) => {
//   const [timeLeft, setTimeLeft] = useState(0);
//   const { doRequest, errors } = useRequest({
//     url: "/api/payments",
//     method: "post",
//     body: {
//       orderId: order.id,
//     },
//     onSuccess: (payment) => {
//       console.log(payment);
//     },
//   });

//   useEffect(() => {
//     const findTimeLeft = () => {
//       const msLeft = new Date(order.expiresAt) - new Date();
//       setTimeLeft(Math.round(msLeft / 1000));
//     };
//     findTimeLeft();
//     const timerId = setInterval(findTimeLeft, 1000);
//     return () => {
//       clearInterval(timerId);
//     };
//   }, [order]);
//   if (timeLeft < 0) {
//     return <div>order expire</div>;
//   }

//   return (
//     <div>
//       Time left to pay {timeLeft} seconds
//       <StripeCheckout
//         token={({ id }) => doRequest({ token: id })}
//         stripeKey="pk_test_51H2c5xHdMY7cevAjFLfzIQO2U4BVbOnxCQ3VFy0jLTqnWW9sP03fSCtkccrA70KON3sMVDpZliET2bO6uajmldSF00VD3TM8Mz" //public key, move to k8s secret just to be neat
//         amount={order.ticket.price * 100}
//         email={currentUser.email}
//       />
//       {errors}
//     </div>
//   );
// };

// OrderShow.getInitialProps = async (context, client) => {
//   const { orderId } = context.query;
//   const { data } = await client.get(`/api/orders/${orderId}`);
//   return { order: data };
// };
// export default OrderShow;

import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => {
      console.log(payment);
      Router.push("/orders");
    },
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51H2c5xHdMY7cevAjFLfzIQO2U4BVbOnxCQ3VFy0jLTqnWW9sP03fSCtkccrA70KON3sMVDpZliET2bO6uajmldSF00VD3TM8Mz"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
