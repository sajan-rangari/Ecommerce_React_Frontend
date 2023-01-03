import React, { useEffect } from "react";

const FetchDataApi = ({ setCoupens, isChange, url }) => {
  useEffect(() => {
    fetch(`https://ecommerce_coupens_api.onrender.com/api/v1/coupens`, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => setCoupens(data));
  }, [isChange]);

  return <div></div>;
};

export default FetchDataApi;
