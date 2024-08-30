"ude client";

import { useCallback, useState } from "react";
import { CountryCodes, CountryCodesByName } from "../services/countryCodes";
import { countryCode } from "../types/countryCodes";

export function useCountryCodes() {
  const [codes, setCodes] = useState<countryCode[]>([]);
  const getCountryCodes = useCallback(async (search: string) => {
    if (search.trim() === "") {
      const countryCodes = await CountryCodes();
      const countrySorted = [...countryCodes].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      return setCodes(countrySorted);
    }
    const countryCodes = await CountryCodesByName({ country: search });
    const countrySorted = [...countryCodes].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    setCodes(countrySorted);
  }, []);

  return { getCountryCodes, codes };
}
