import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/formSchemas/loginSchema";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { fetchPOST } from "@/helpers/fetchingData";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      console.log(values);
      const loginRequest = await fetchPOST(`api/Auth/login`, values);
      console.log(loginRequest.result.token);

      //Verificando si no existe el token
      if (!loginRequest.result.token) {
        toast.error(loginRequest.errors[0]);
        return;
      }

      localStorage.setItem("CryptoMeter_JWT_Token", loginRequest.result.token);
      navigate("/"); // redirect to home page
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type="submit">Log in</Button>
      </form>
      <ToastContainer position="bottom-center" theme="dark" />
    </Form>
  );
};
