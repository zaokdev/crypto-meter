"use client";
import { CoinData } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SupplyChart from "./charts/SupplyChart";
import VolumeChart from "./charts/VolumeChart";
import Back from "./utils/Back";

export default function CryptoDetails() {
  const [data, setData] = useState<CoinData[] | undefined>(undefined);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `https://api.coinlore.net/api/ticker/?id=${id}`
      );
      const data = await response.json();
      if (data.length === 0) {
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
      <section className="container mx-auto flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:h-screen py-12">
        <div className="lg:col-span-7 rounded-xl p-12 dark:bg-radial-gradient-dark bg-radial-gradient-light relative">
        <Back />
          <h1 className="sm:text-8xl text-5xl text-center text-wrap font-extralight tracking-tight">

            {data[0].name}
          </h1>
          <p className="mt-5">{data[0].symbol}</p>
          <p>
            Rank:
            <strong className=""> #{data[0].rank}</strong>
          </p>
          <p>
            Real-Time USD Price:
            <strong className=""> {data[0].price_usd}</strong>
          </p>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-12">
          <div className="lg:w-full lg:h-1/2 rounded-xl flex flex-col items-center justify-center p-4 dark:bg-radial-gradient-dark bg-radial-gradient-light">
            <SupplyChart
              csupply={data[0].csupply}
              tsupply={data[0].tsupply}
              msupply={data[0].msupply}
            />
          </div>
          <div className="lg:w-full lg:h-1/2 rounded-xl flex flex-col items-center justify-center p-4 dark:bg-radial-gradient-dark bg-radial-gradient-light">
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
