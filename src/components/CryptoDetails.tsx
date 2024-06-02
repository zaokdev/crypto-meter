"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SupplyChart from "./charts/SupplyChart";
import VolumeChart from "./charts/VolumeChart";

export default function CryptoDetails() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `https://api.coinlore.net/api/ticker/?id=${id}`
      );
      const data = await response.json();
      if (data.length === 0) {
        console.log("NO EXISTE");
        setError(true);
        return;
      }
      setData(data);
      console.log(data);
    }
    getData();
  }, []);

  if (error) {
    return (
      <div>
        <span>404 Not found </span>
      </div>
    );
  }

  if (data && data[0]) {
    return (
      <section className="container mx-auto lg:grid lg:grid-cols-12 lg:gap-12 lg:h-screen py-12">
        <div className="lg:col-span-7 border rounded-xl">
          <h1 className="lg:text-8xl font-semibold tracking-tight">
            {data[0].name}
          </h1>
          <p>{data[0].symbol}</p>
          <p>
            Rank: <br />
            <strong className="">#{data[0].rank}</strong>
          </p>
          <p>
            Real-Time USD Price: <br />
            <strong className="">{data[0].price_usd}</strong>
          </p>
        </div>
        <div className="lg:col-span-5 xl:flex lg:flex-col gap-12">
          <div className="lg:w-full lg:h-1/2 border rounded-xl flex flex-col items-center justify-center p-4">
            <SupplyChart
              csupply={data[0].csupply}
              tsupply={data[0].tsupply}
              msupply={data[0].msupply}
            />
          </div>
          <div className="lg:w-full lg:h-1/2 border rounded-xl flex flex-col items-center justify-center p-4">
            <VolumeChart
              percent_change_1h={data[0].percent_change_1h}
              percent_change_24h={data[0].percent_change_24h}
              percent_change_7d={data[0].percent_change_7d}
            />
          </div>
        </div>
      </section>
    );
  }
}
