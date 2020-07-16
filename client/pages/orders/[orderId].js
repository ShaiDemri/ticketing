import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import { msToHMS } from "../../api/time";

const OrderShow = ({ order, currentUser }) => {
  const [msLeft, setMsLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => {
      Router.replace("/orders");
    },
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const milisecondsLeft = new Date(order.expiresAt) - new Date();
      setMsLeft(Math.round(milisecondsLeft / 1000));
      const formattedTime = msToHMS(milisecondsLeft);
      setTimeLeft(formattedTime);
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (msLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Order expires in: {timeLeft}
      <br />
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey={process.env.STRIPE_PUBLIC_KEY}
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
