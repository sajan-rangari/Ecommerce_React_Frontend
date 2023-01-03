import React, { useEffect } from "react";

const FetchDataApi = ({ setCoupens, isChange, url }) => {
  useEffect(() => {
    fetch(`${url}/coupens`, {
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
