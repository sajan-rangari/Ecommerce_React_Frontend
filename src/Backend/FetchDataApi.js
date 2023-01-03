import React, { useEffect } from "react";

const FetchDataApi = ({ setCoupens, isChange, url }) => {
  useEffect(() => {
    fetch(`${url}/coupens`, { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setCoupens(data));
  }, [isChange]);

  return <div></div>;
};

export default FetchDataApi;
