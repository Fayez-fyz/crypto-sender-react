import useFetchGif from "@/hooks/useFetchGif";
import { addressShortner } from "@/utils/address-shortner";
import PropTypes from "prop-types";
const TransactionHistoryCard = ({
  addressFrom,
  addressTo,
  amount,
  keyword,
  timestamp,
  message,
}) => {
  const gifUrl = useFetchGif({ keyword });

  return (
    <div className="bg-slate-700 p-4 rounded-xl shadow-xl w-80 ">
      <h1 className="text-zinc-300">From : {addressShortner(addressFrom)}</h1>
      <h1 className="text-zinc-300">To : {addressShortner(addressTo)}</h1>
      <h1 className="text-zinc-300">Amount : {amount} ETH</h1>
      <h1 className="text-zinc-300 mb-2">Message : {message}</h1>
      <div className="relative">
        <img src={gifUrl} alt="gif" />
      </div>
      <div className=" p-3 bg-black rounded-lg bg-black/50">
        <h1 className="text-zinc-300 text-center font-semibold ">
          {" "}
          {timestamp}
        </h1>
      </div>
    </div>
  );
};

TransactionHistoryCard.propTypes = {
  addressFrom: PropTypes.string.isRequired,
  addressTo: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default TransactionHistoryCard;
