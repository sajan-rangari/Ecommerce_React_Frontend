import React, { useEffect } from "react";

const FetchDataApi = ({ setCoupens, isChange }) => {
  useEffect(() => {
    fetch("http://localhost:3500/api/v1/coupens", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setCoupens(data));
  }, [isChange]);

  return <div></div>;
};

export default FetchDataApi;
