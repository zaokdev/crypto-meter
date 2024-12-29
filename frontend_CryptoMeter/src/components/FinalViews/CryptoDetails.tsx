import { fetchGETSpecificCrypto } from "@/helpers/fetchingData";
import { useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import H2 from "../ui/H2";
import Card from "../ui/UIcard";
import { CryptoTicker } from "@/helpers/types";
import H3 from "../ui/H3";
import { StepBack } from "lucide-react";
import CryptoDonutChart from "../ui/charts/CryptoDonutChart";
import DetailsAside from "../organisms/DetailsAside";
import CryptoLinebarChart from "../ui/charts/CryptoLinebarChart";

const CryptoDetails = () => {
  const params = useParams();
  const [crypto, setCrypto] = useState<CryptoTicker | null>(null);

  useEffect(() => {
    const fetchCrypto = async () => {
      const newParams: string | any = params.id;
      const response = await fetchGETSpecificCrypto(`?id=${newParams}`);
      setCrypto(response[0]);
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
    <>
      <section className="mt-8 col-span-5">
        <Link to={"/"}>
          <StepBack />
        </Link>
        <h1 className="text-center text-4xl font-bold">{crypto.name}</h1>
        <H2 className="text-center text-2xl font-bold">{crypto.symbol}</H2>
        <div className="sm:grid md:grid-cols-12 sm:grid-cols-8 flex flex-col items-center justify-center gap-4 mt-4 grid-center">
          <Card className="sm:col-span-4 w-full">
            <H3>USD Price</H3>
            <span>{crypto.price_usd}</span>
          </Card>
          <Card className="sm:col-span-4 w-full">
            <H3>BTC Price</H3>
            <span>{crypto.price_btc}</span>
          </Card>
          <Card className="sm:col-span-4 w-full">
            <H3>Market Cap</H3>
            <span>
              ${new Intl.NumberFormat("en-US").format(crypto.market_cap_usd)}
            </span>
          </Card>

          {/* TWO CHARTS */}
          <section className="col-span-12 grid grid-cols-12 gap-4">
            <Card className="sm:col-span-6 col-span-12 h-full">
              <CryptoLinebarChart
                percent_change_1h={crypto.percent_change_1h}
                percent_change_24h={crypto.percent_change_24h}
                percent_change_7d={crypto.percent_change_7d}
              />
            </Card>
            <Card className="sm:col-span-6 col-span-12 h-full">
              {crypto.msupply != "" && crypto.csupply != "" ? (
                <CryptoDonutChart
                  msupply={Number.parseFloat(crypto.msupply)}
                  csupply={
                    Number.parseFloat(crypto.msupply) -
                    Number.parseFloat(crypto.csupply)
                  }
                />
              ) : (
                <span>Not enough data</span>
              )}
            </Card>
          </section>
        </div>
      </section>
      {/*MARKETS TABLE AT SIDE BAR */}
      <section className="col-span-3 bg-slate-900 p-6 mt-6">
        <DetailsAside />
      </section>
    </>
  );
};

export default CryptoDetails;
