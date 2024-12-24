import { fetchGETSpecificCrypto } from "@/helpers/fetchingData";
import React, { useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import H3 from "../ui/H3";
import H2 from "../ui/H2";

const CryptoDetails = () => {
  const params = useParams();
  const [crypto, setCrypto] = useState<any>(null);

  useEffect(() => {
    const fetchCrypto = async () => {
      const newParams: string | any = params.id;
      const response = await fetchGETSpecificCrypto(`?id=${newParams}`);
      setCrypto(response);
    };
    fetchCrypto();
  }, []);

  if (crypto === null) {
    return (
      <div className="mt-8">
        <CirclesWithBar color="gray" />
      </div>
    );
  }

  return (
    <section className="mt-8 col-span-5">
      <H2>{crypto[0].name}</H2>
      <p>Price USD: {crypto[0].price_usd}</p>
      <p>WORKING IN THIS PAGE (24/12/2024)</p>
    </section>
  );
};

export default CryptoDetails;
