import { useEffect, useState } from "react";
import RequiresLogin from "../organisms/RequiresLogin";
import { getUserData } from "@/helpers/TokenHelpers";
import { fetchGETAuth, fetchGETSpecificCrypto } from "@/helpers/fetchingData";
import { CirclesWithBar } from "react-loader-spinner";
import H2 from "../ui/H2";
import H3 from "../ui/H3";
import { CryptoTable } from "../organisms/CryptoTable/CryptoTable";
import { CryptocurrenciesColumns } from "../organisms/CryptoTable/columns";

const Bookmarks = () => {
  const [Bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gettingUserBookMarks = async () => {
      try {
        setLoading(true);
        const userData: any = getUserData();
        const response = await fetchGETAuth(
          `api/UserBookMarks/byUserId?userId=${userData.Id}`
        );
        return response;
      } catch (ex: any) {
        console.error(ex.message);
      }
    };

    const gettingTheCoins = async () => {
      try {
        const arrayCryptos = await gettingUserBookMarks();
        let stringCryptos = arrayCryptos[0];
        if (arrayCryptos.length > 1) {
          for (let i = 1; i < arrayCryptos.length; i++) {
            stringCryptos += "," + arrayCryptos[i];
          }
        }

        //FETCHING ALL CRYPTOS
        const response = await fetchGETSpecificCrypto(`/?id=${stringCryptos}`);
        setBookmarks(response);
        setLoading(false);
      } catch (ex) {
        setLoading(false);
      }
    };

    gettingTheCoins();
  }, []);

  if (loading) {
    return (
      <RequiresLogin>
        <CirclesWithBar color="gray" />
      </RequiresLogin>
    );
  }
  return (
    <RequiresLogin>
      <div className="mt-8 md:col-span-5">
        <H2>Bookmarks</H2>

        <H3>Favorite cryptocurrencies</H3>
        <CryptoTable
          columns={CryptocurrenciesColumns}
          data={Bookmarks}
          isCryptoDetailsNeeded
        />
      </div>
    </RequiresLogin>
  );
};

export default Bookmarks;
