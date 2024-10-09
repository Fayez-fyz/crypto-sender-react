import { Button } from "@/components/ui/button";
import { RingLoader } from "react-spinners";
import { Form } from "@/components/ui/form";
import PropTypes from "prop-types";
import { CustomTextField } from "@/elements/text-input";
const SendCryptoFormCard = ({ form, onSubmit, isLoading }) => {
  return (
    <div className="bg-gradient-to-r  from-black via-slate-900 to-black p-5 rounded-xl shadow-xl sm:w-96  w-80  flex flex-col items-center justify-between">
      <h4 className="text-2xl font-bold text-zinc-300 flex justify-center w-full">
        Send your crypto here
      </h4>
      <Form {...form} className="">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 mt-8"
        >
          <CustomTextField
            control={form.control}
            name="addressTo"
            label="Address to send"
            type="text"
          />
          <CustomTextField
            control={form.control}
            name="amount"
            label="Amount (ETH)"
            type="number"
          />
          <CustomTextField
            control={form.control}
            name="keyword"
            label="Keywords (GIF)"
            type="text"
          />
          <CustomTextField
            control={form.control}
            name="message"
            label="Message"
            type="text"
          />
          {isLoading ? (
            <div className="flex justify-center items-center">
              <RingLoader color="#36d7b7" size={40} />
            </div>
          ) : (
            <Button
              type="submit"
              className="bg-primary-foreground text-primary-background hover:bg-primary-background w-full"
            >
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

SendCryptoFormCard.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default SendCryptoFormCard;
