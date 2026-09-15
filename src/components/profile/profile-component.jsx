"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthContext } from "@/context/auth-context";
import useLogout from "@/app/auth/components/useLogout";
import { useLocation } from "react-router-dom";
import ProfileHeader from "./profile-header";
import ProfileContent from "./profile-content";

export default function ProfileComponent() {
  const { pathname } = useLocation();
  const { logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="relative size-8 rounded-full">
          {authUser?.profilePicture && (
            <Avatar className="size-8">
              <AvatarImage
                src={authUser?.profilePicture}
                alt={authUser?.firstName + " " + authUser?.lastName}
                className="object-cover"
              />
              <AvatarFallback>{`${
                authUser?.firstName?.[0]?.toUpperCase() || ""
              }${
                authUser?.lastName?.[0]?.toUpperCase() || ""
              }`}</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 [&>button:last-child]:top-3.5 max-h-11/12">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Edit profile
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a
          username.
        </DialogDescription>
        <div className="overflow-y-auto h-[550px]">
          <ProfileHeader />
          <ProfileContent />
        </div>
        <DialogFooter className="border-t px-6 py-4">
          {pathname.startsWith("/dashboard") ? (
            <DialogClose asChild>
              <Button type="button" variant="outline" hidden>
                Close
              </Button>
            </DialogClose>
          ) : (
            <DialogClose asChild>
              <Button type="button" variant="destructive" onClick={() => logout()}>
                Logout
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
