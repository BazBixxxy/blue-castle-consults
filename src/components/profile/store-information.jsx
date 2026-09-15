import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PhoneInput } from "../ui/phone-input";
import { useAuthContext } from "@/context/auth-context";
import useUpdateStore from "@/hooks/user/useUpdateStore";
import { storeSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function StoreInformation() {
  const { loading, updateStore } = useUpdateStore();
  const { authUser } = useAuthContext();

  const form = useForm({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: authUser?.store.name || "",
      phoneNumber: authUser?.store.phoneNumber || "",
      description: authUser?.store.description || "",
      address: authUser?.store.address || "",
    },
  });

  async function onSubmit(values) {
    await updateStore(values);
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6">
            {/* name */}
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="name"
                        placeholder="e.g. Payless Electronics Ltd."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* phone */}
            <div className="sm:col-span-full">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="+123456789"
                        {...field}
                        defaultCountry={"US"}
                      />
                    </FormControl>
                    <FormDescription>
                      Please enter your phone number in international format,
                      without spaces or special characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* bio */}
            <div className="col-span-full">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Textarea</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          type="address"
                          placeholder="Tell us about your business..."
                          className="min-h-40"
                        />
                      </FormControl>
                      <FormDescription>
                        A short description about your business for your
                        customers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* address */}
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="address"
                        placeholder="e.g. Online or Acacia Mall Shop No. 45"
                      />
                    </FormControl>
                    <FormDescription>We use Google addresses</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
