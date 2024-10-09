import { addressShortner } from "@/utils/address-shortner";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
const ConnectWalletCard = ({ account, connectWallet }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className=" bg-gradient-to-r from-slate-500 mb-3 via-slate-300 to-slate-400 inline-block text-transparent bg-clip-text text-4xl font-bold mt-10 w-80">
        Send The Crypto Accross the World
      </h1>
      <div className="bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 p-4 rounded-xl shadow-xl md:w-96 w-80 md:h-60 h-52 flex flex-col items-start justify-between">
        <h1 className="text-2xl font-bold text-zinc-300">Wallet</h1>
        <div>
          <h4 className="text-zinc-300">Address</h4>
          {account && (
            <h4 className="text-green-400">{addressShortner(account)}</h4>
          )}
          {!account && (
            <Button
              className="bg-primary-foreground text-primary-background hover:bg-primary-background w-full mt-2 "
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

ConnectWalletCard.propTypes = {
  account: PropTypes.string.isRequired,
  connectWallet: PropTypes.func.isRequired,
};
export default ConnectWalletCard;
