import PropTypes from "prop-types";
import ConnectWalletCard from "./connect-wallet.card";
import SendCryptoFormCard from "./send-crypto.form.card";
import TransactionHistoryCard from "./transaction-history.card";
const HomeComponent = ({
  form,
  connectWallet,
  onSubmit,
  account,
  isLoading,
  transactionList,
}) => {
  return (
    <div>
      <div className="flex flex-col  h-[calc(100vh-4rem)]">
        <div className="flex justify-center h-full">
          <div className="flex md:justify-between flex-wrap justify-center  md:w-full items-center">
            <ConnectWalletCard
              account={account}
              connectWallet={connectWallet}
            />
            <div className="flex flex-col md:gap-4 md:mt-4 ">
              <SendCryptoFormCard
                form={form}
                onSubmit={onSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {transactionList.length > 0 && (
        <div>
          <div className="flex justify-center items-center ">
            <h1 className="bg-gradient-to-r from-slate-500 mb-3 via-slate-300 to-slate-400 inline-block text-transparent bg-clip-text text-4xl font-bold   ">
              Transaction History
            </h1>
          </div>
          <div id="transaction-history" className="flex items-center md:justify-start justify-center flex-wrap gap-4 py-20">
            {transactionList.map((transaction, i) => (
              <TransactionHistoryCard
                key={i}
                addressFrom={transaction.addressFrom}
                addressTo={transaction.addressTo}
                amount={transaction.amount}
                keyword={transaction.keyword}
                message={transaction.message}
                timestamp={transaction.timestamp}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

HomeComponent.propTypes = {
  connectWallet: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  account: PropTypes.string,
  transactionList: PropTypes.array.isRequired,
};
export default HomeComponent;
