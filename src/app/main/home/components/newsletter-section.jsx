import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Hand } from "lucide-react";

export default function NewsLetterSection() {
  return (
    <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Subscribe to our newsletter.
            </h2>
            <p className="mt-4 text-lg leading-8">
              Want product news, updates, and exclusive promotions? Sign up for
              our newsletter to stay informed about the latest developments, new
              releases, and special offers.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <Label className="sr-only">Email Address</Label>
              <Input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
              />
              <Button className="px-5">Subscribe</Button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/10 dark:bg-gray-700/5 p-1 ring-1 ring-gray-100 dark:ring-gray-700/10">
                <Calendar aria-hidden="true" className="h-6 w-6" />
              </div>
              <dt className="mt-4 font-semibold">Weekly articles</dt>
              <dd className="mt-2 leading-7">
                Subscribe now to receive insightful articles every week. No
                spam, just quality content – unsubscribe anytime.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/10 dark:bg-gray-700/5 p-1 ring-1 ring-gray-100 dark:ring-gray-700/10">
                <Hand aria-hidden="true" className="h-6 w-6" />
              </div>
              <dt className="mt-4 font-semibold">No spam</dt>
              <dd className="mt-2 leading-7">
                Rest assured, we only send relevant updates and important
                notifications. Your information is safe with us, and you can opt
                out anytime.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
