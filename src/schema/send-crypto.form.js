import { z } from "zod";

const SendCryptoForm = z.object({
  addressTo: z.string().min(1, { message: "Address is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  keyword: z.string().min(1, { message: "Keywords is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export default SendCryptoForm;
