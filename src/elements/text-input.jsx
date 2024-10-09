import {
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
export function CustomTextField({ name, control, type, label }) {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel className="text-primary-foreground">{label}</FormLabel> */}
            <FormControl>
              <Input
                placeholder={label}
                {...field}
                type={type}
                className=" text-primary-foreground"
              />
            </FormControl>
            {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
CustomTextField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
};
