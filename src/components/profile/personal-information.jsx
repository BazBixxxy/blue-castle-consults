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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema } from "@/lib/schema";
import { Label } from "../ui/label";
import { PhoneInput } from "../ui/phone-input";
import { useAuthContext } from "@/context/auth-context";
import useUpdateProfile from "@/hooks/user/updateProfile";

export default function PersonalInformation({ className, ...props }) {
  const { loading, updateProfile } = useUpdateProfile();
  const { authUser } = useAuthContext();

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: authUser?.firstName || "",
      lastName: authUser?.lastName || "",
      phoneNumber: authUser?.phoneNumber || "",
      gender: authUser?.gender || "",
      dateOfBirth: authUser?.dateOfBirth
        ? new Date(authUser?.dateOfBirth)
        : undefined,
      address: authUser?.address || "",
    },
  });

  async function onSubmit(values) {
    await updateProfile({
      ...values,
      dateOfBirth: values.dateOfBirth
        ? new Date(values.dateOfBirth).toISOString()
        : "",
    });
  }

  return (
    <div className={cn("", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="name" placeholder="e.g. John" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="name" placeholder="e.g. Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* gender */}
            <div className="sm:col-span-full">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="r1" />
                          <Label htmlFor="r1">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="r2" />
                          <Label htmlFor="r2">Female</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* birth date */}
            <div className="sm:col-span-full">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type="date"
                          value={
                            field.value
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            const dateValue = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            field.onChange(dateValue);
                          }}
                        />
                      </FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              size="icon"
                              className={cn(
                                "shrink-0",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="ml-aut size-5" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            captionLayout="dropdown"
                            defaultMonth={
                              field.value ||
                              new Date(new Date().getFullYear() - 16, 11, 31)
                            }
                            disabled={(date) =>
                              date > new Date("2012-01-01") ||
                              date < new Date("1950-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
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
            <div className="col-span-full hidden">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="min-h-40"
                  readOnly
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
                    <FormLabel>Current Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="address"
                        placeholder="e.g. Bukoto, Kampala..."
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
    </div>
  );
}
