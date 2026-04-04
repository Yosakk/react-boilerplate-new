import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/_helper/twMerge";
import countriesRaw from "@/data/phone/countries.json";
import { useTranslation } from "react-i18next";
import { flagUrl } from "@/_helper/isoFlagCode";
import type { FieldError } from "react-hook-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FormatNationalForDisplay, NormalizeLocalPart } from "@/_helper/normalizePhoneNumber";
import ValidationError from "../validation/error";

type RawCountry = { name: string; flag: string; code: string; dial_code: string };
export type Country = { name: string; flag: string; code: string; dial: string };
export type PhoneFormat = "e164" | "e164_noplus" | "national";

const COUNTRIES: Country[] = (countriesRaw as RawCountry[]).map((c) => ({
  name: c.name,
  flag: c.flag,
  code: c.code,
  dial: c.dial_code,
}));

export interface BasePhoneInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string, country: Country) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  defaultCountry?: string;
  label?: React.ReactNode;
  required?: boolean;
  labelClassName?: string;
  error?: FieldError;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  format?: PhoneFormat;
}

export const BasePhoneInput = React.forwardRef<HTMLInputElement, BasePhoneInputProps>(
  (
    {
      id = "phone-input",
      name = "phone",
      value = "",
      onChange,
      placeholder,
      disabled,
      className,
      defaultCountry = "ID",
      label,
      required = false,
      labelClassName,
      error,
      onBlur,
      format = "national",
    },
    ref
  ) => {
    const { t } = useTranslation();
    const placeholderText = placeholder ?? t("authLogin.inputPhoneNumber");
    const isInvalid = Boolean(error);
    const errorId = `${id}-error`;
    const normCode = (defaultCountry || "ID").toUpperCase();

    const [open, setOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
      () =>
        COUNTRIES.find((c) => c.code.toUpperCase() === normCode) ||
        COUNTRIES.find((c) => c.code === "ID") ||
        COUNTRIES[0]
    );
    const [localNumber, setLocalNumber] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");

    const lastEmittedRef = React.useRef<string | null>(null);

    const emit = React.useCallback(
      (country: Country, local: string) => {
        const digits = local.replace(/\D/g, "");
        let out = "";
        if (format === "e164") out = `${country.dial}${digits}`;
        else if (format === "e164_noplus") out = `${country.dial.replace("+", "")}${digits}`;
        else out = digits;

        lastEmittedRef.current = out;
        onChange?.(out, country);
      },
      [onChange, format]
    );
    React.useEffect(() => {
      const c = COUNTRIES.find((x) => x.code.toUpperCase() === normCode);
      if (c) setSelectedCountry(c);
    }, [normCode]);

    const filteredCountries = React.useMemo(() => {
      if (!searchQuery) return COUNTRIES;
      const q = searchQuery.toLowerCase();
      return COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.dial.includes(q)
      );
    }, [searchQuery]);

    React.useEffect(() => {
      if (lastEmittedRef.current !== null && value === lastEmittedRef.current) {
        lastEmittedRef.current = null;
        return;
      }
      if (!value) {
        setLocalNumber("");
        return;
      }
      if (typeof value === "string" && value.trim().startsWith("+")) {
        const p = parsePhoneNumberFromString(value);
        if (p?.country) {
          const found = COUNTRIES.find((c) => c.code.toUpperCase() === p.country);
          if (found) setSelectedCountry(found);
          setLocalNumber(p.nationalNumber || "");
          return;
        }
      }

      const local = NormalizeLocalPart(String(value), selectedCountry.code, selectedCountry.dial);
      setLocalNumber(local);
    }, [value, selectedCountry.code, selectedCountry.dial]);

    const handleCountrySelect = React.useCallback(
      (country: Country) => {
        setSelectedCountry(country);
        setOpen(false);
        setSearchQuery("");
        setLocalNumber("");
        lastEmittedRef.current = "";
        onChange?.("", country);
      },
      [onChange]
    );

    const handlePhoneChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const local = NormalizeLocalPart(
          e.target.value,
          selectedCountry.code,
          selectedCountry.dial
        );
        setLocalNumber(local);
        emit(selectedCountry, local);
      },
      [selectedCountry, emit]
    );

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={id}
            data-slot="label"
            className={cn("block mb-1 text-sm font-medium text-foreground", labelClassName)}
          >
            <span>{label}</span>
            {required && (
              <span className="ml-1 text-destructive" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="flex w-full">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[110px] justify-between rounded-r-none border-r-0 px-3 bg-transparent"
                disabled={disabled}
              >
                <div className="flex items-center gap-2">
                  <img
                    {...flagUrl(selectedCountry.code, 24)}
                    fetchPriority="high"
                    alt={`${selectedCountry.name} flag`}
                    className="h-4 w-6 rounded-sm object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${selectedCountry.code.toUpperCase()}.svg`;
                    }}
                  />
                  <span className="text-sm font-mono">{selectedCountry.dial}</span>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search countries..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList className="max-h-[220px]">
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {filteredCountries.map((country) => (
                      <CommandItem
                        key={country.code}
                        value={`${country.name} ${country.code} ${country.dial}`}
                        onSelect={() => handleCountrySelect(country)}
                        className="flex items-center gap-2"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="flex-1">{country.name}</span>
                        <span className="text-sm font-mono text-muted-foreground">
                          {country.dial}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <input
            id={id}
            name={name}
            ref={ref}
            type="tel"
            required={required}
            aria-required={required || undefined}
            placeholder={placeholderText}
            value={FormatNationalForDisplay(localNumber, selectedCountry)}
            aria-invalid={isInvalid || undefined}
            aria-describedby={isInvalid ? errorId : undefined}
            onChange={handlePhoneChange}
            disabled={disabled}
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-full border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
              "text-xs md:text-sm shadow-xs transition-[color,box-shadow] outline-none",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-sm rounded-l-none w-full"
            )}
            onBlur={onBlur}
          />
        </div>

        {isInvalid && (
          <div id={errorId} aria-live="polite" className="mt-1 text-sm text-destructive">
            <ValidationError error={error}></ValidationError>
          </div>
        )}
      </div>
    );
  }
);
BasePhoneInput.displayName = "BasePhoneInput";
