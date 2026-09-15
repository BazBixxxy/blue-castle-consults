import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInformation from "./personal-information";
import AddressComponent from "./shipping-address";
import ChangePassword from "./change-password";
import StoreInformation from "./store-information";
import { useAuthContext } from "@/context/auth-context";

export default function ProfileContent() {
  const { authUser } = useAuthContext();
  return (
    <Tabs defaultValue="personal" className="mb-5 space-y-6 px-2">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-2 md:grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="store" disabled={!authUser.isSeller}>
          Store
        </TabsTrigger>
        <TabsTrigger value="address" disabled>
          Shipping
        </TabsTrigger>
        <TabsTrigger value="security">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="personal" className="space-y-6">
        <PersonalInformation />
      </TabsContent>
      <TabsContent value="address" className="space-y-6">
        <AddressComponent />
      </TabsContent>
      <TabsContent value="store" className="space-y-6">
        <StoreInformation />
      </TabsContent>
      <TabsContent value="security" className="space-y-6">
        <ChangePassword />
      </TabsContent>
    </Tabs>
  );
}
