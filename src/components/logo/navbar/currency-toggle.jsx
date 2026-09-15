import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobeIcon } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { supportedCurrencies } from "@/lib/lib";

const CurrencyToggle = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger
        className="[&>svg]:text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground h-8 border-none px-2 shadow-none [&>svg]:shrink-0 gap-2"
        aria-label="Select currency"
      >
        <GlobeIcon size={16} aria-hidden="true" className="hidden md:block" />
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
        <SelectGroup>
          <SelectLabel>Currencies</SelectLabel>
          {supportedCurrencies.map((cur) => (
            <SelectItem key={cur.value} value={cur.value}>
              {cur.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CurrencyToggle;
