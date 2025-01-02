import { registerSchema } from "@/formSchemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import H2 from "../ui/H2";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast, ToastContainer } from "react-toastify";
import { fetchPOST } from "@/helpers/fetchingData";

export const Register = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await fetchPOST("api/Auth/register", values).then(() => {
        toast("Check your email to verify.");
        navigate("/auth/login");
      });
    } catch (ex: any) {
      toast.error(ex.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border h-screen flex flex-col items-stretch justify-center p-16 gap-8"
      >
        <H2 className="text-center md:text-left md:text-4xl">
          Creating a CryptoMeter account
        </H2>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Type your Username here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Type your Email here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your password here..."
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Link
          to={"/auth/login"}
          className="underline text-blue-500 hover:text-blue-700"
        >
          Already have an account? Click here
        </Link>
        <Button type="submit">Register</Button>
      </form>
      <ToastContainer position="bottom-center" theme="dark" />
    </Form>
  );
};
