import { useState } from "react";

export const usePlunk = () => {
  const [data, setData] = useState(0);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_USE_PLUNK_KEY}`,
      "Content-Type": " application/json  ",
    },
  };

  const sendEvent = async (
    event: string,
    email: string,
    subscribed: boolean = false
  ) => {
    const response = await fetch("https://api.useplunk.com/v1/track", {
      ...options,
      body: JSON.stringify({
        event,
        email,
        subscribed,
      }),
    });
    const data = await response.json();

    setData(data);
  };

  return { sendEvent, data };
};
