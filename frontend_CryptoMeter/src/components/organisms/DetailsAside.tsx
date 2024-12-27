import { useEffect, useState } from "react";
import H2 from "../ui/H2";
import { fetchGETCoinLore } from "@/helpers/fetchingData";
import { useParams } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";
import { CryptoTable } from "./CryptoTable/CryptoTable";
import { MarketsColumns } from "./CryptoTable/columnsMarket";

const DetailsAside = () => {
  const { id } = useParams();
  const [markets, setMarkets] = useState<any>();
  useEffect(() => {
    const fetchCoinLore = async () => {
      const response = await fetchGETCoinLore(`coin/markets/?id=${id}`);
      setMarkets(response);
      console.log(response);
    };

    fetchCoinLore();
  }, []);

  if (!markets) {
    return <CirclesWithBar color="gray" />;
  }

  return (
    <div className="col-span-3 h-auto">
      <H2 className="text-center font-normal">Top 50 Markets</H2>
      <CryptoTable
        columns={MarketsColumns}
        data={markets}
        isCryptoDetailsNeeded={false}
      />
    </div>
  );
};

export default DetailsAside;
