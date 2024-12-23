import { useEffect, useState } from "react";
import H2 from "../ui/H2";
import TrendyCryptos from "../organisms/TrendyCryptos";
import { CryptoTable } from "../organisms/CryptoTable/CryptoTable";
import { CryptocurrenciesColumns } from "../organisms/CryptoTable/columns";
import { fetchGETCryptos } from "@/helpers/fetchingData";
import { CirclesWithBar } from "react-loader-spinner";
import H3 from "../ui/H3";
import HomeAside from "../organisms/HomeAside";

export const Home = () => {
  const [cryptos, setCryptos] = useState<[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function GettingAllCoins() {
      try {
        setLoading(true);
        const fetching = await fetchGETCryptos();
        setCryptos(fetching.data);
        console.log(fetching.data);
      } catch (err) {
        setError("Failed to fetch cryptocurrencies. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    }
    GettingAllCoins();
  }, []);

  return (
    <>
      <section className="lg:col-span-5 md:mt-8">
        <H2>Discover the Hottest Cryptocurrencies Shaping the Future!</H2>
        <TrendyCryptos />
        {!loading ? (
          <CryptoTable columns={CryptocurrenciesColumns} data={cryptos} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <CirclesWithBar color="gray" />
          </div>
        )}
      </section>
      <HomeAside />
    </>
  );
};
