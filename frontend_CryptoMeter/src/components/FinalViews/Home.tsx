import { useEffect, useState } from "react";
import H2 from "../ui/H2";
import { CryptoTable } from "../organisms/CryptoTable/CryptoTable";
import { CryptocurrenciesColumns } from "../organisms/CryptoTable/columns";
import { fetchGETCryptos } from "@/helpers/fetchingData";
import { CirclesWithBar } from "react-loader-spinner";
import HomeAside from "../organisms/HomeAside";
import { toast, ToastContainer } from "react-toastify";

export const Home = () => {
  const [cryptos, setCryptos] = useState<[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function GettingAllCoins() {
      try {
        setLoading(true);
        const fetching = await fetchGETCryptos();
        setCryptos(fetching.data);
      } catch (err: any) {
        toast.error("Error fetching data:", err.message);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    }
    GettingAllCoins();
  }, []);

  return (
    <>
      <section className="lg:col-span-5 mt-8">
        <H2 className="mb-3">
          Discover the Hottest Cryptocurrencies Shaping the Future!
        </H2>

        {!loading ? (
          <CryptoTable
            columns={CryptocurrenciesColumns}
            data={cryptos}
            isCryptoDetailsNeeded={true}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <CirclesWithBar color="gray" />
          </div>
        )}
      </section>
      <HomeAside />
      <ToastContainer position="bottom-center" theme="dark" limit={3} />
    </>
  );
};
