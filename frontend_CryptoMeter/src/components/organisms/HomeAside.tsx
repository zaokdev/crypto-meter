import { useEffect, useState } from "react";
import H3 from "../ui/H3";
import { fetchGETCoinLore } from "@/helpers/fetchingData";
import { CoinsIcon, HandCoins, Scale, Store } from "lucide-react";

const HomeAside = () => {
  const [globalData, setGlobalData] = useState<any>([]);

  useEffect(() => {
    const fetchingData = async () => {
      const get = await fetchGETCoinLore("global/");
      setGlobalData(get);
    };

    fetchingData();
  }, []);

  return (
    <aside className="lg:col-span-3 mt-4 pt-4 px-8 h-fit pb-10">
      <H3 className="text-center">Global Crypto Data</H3>
      <div className="w-full mt-4 h-auto flex flex-col gap-4">
        {globalData.length != 0 && (
          <>
            <div className="bg-slate-900 h-fit flex flex-col items-center justify-center  py-12">
              <CoinsIcon />
              <strong>Coins count: </strong>
              {globalData[0].coins_count}
            </div>
            <div className="bg-slate-900 h-fit flex flex-col items-center justify-center py-12">
              <Store />
              <strong>Active Markets: </strong>
              {globalData[0].active_markets}
            </div>
            <div className="bg-slate-900 h-fit flex flex-col items-center justify-center py-12">
              <HandCoins />
              <strong>Total Market Cap: </strong>
              {globalData[0].total_mcap}
            </div>
            <div className="bg-slate-900 h-fit flex flex-col items-center justify-center py-12">
              <Scale />
              <strong>Total Volume: </strong>
              {globalData[0].total_volume}
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default HomeAside;
