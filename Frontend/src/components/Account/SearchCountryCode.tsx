"use client";
import { useCountryCodes } from "@/src/hooks/useCountryCodes";
import { CountryCodesByName } from "@/src/services/countryCodes";
import { countryCode } from "@/src/types/countryCodes";
import debounce from "just-debounce-it";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function SearchCountryCode({ country }: { country?: string }) {
  const [inputCodeCountryValue, setInputCodeCountryValue] = useState<
    countryCode[]
  >([]);
  const handleCodeSelect = (code: countryCode) => {
    const myCountryCode = [];
    myCountryCode.push(code);
    setInputCodeCountryValue(myCountryCode);
  };

  // Buscador

  const { getCountryCodes, codes } = useCountryCodes();

  const handleSearhInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedGetCode(event.target.value);
  };

  useEffect(() => {
    getCountryCodes("");
  }, []);

  useEffect(() => {
    const getInitialCode = async () => {
      if (country?.trim() !== "") {
        if (country && country !== null) {
          const countryCode = await CountryCodesByName({ country });
          setInputCodeCountryValue(countryCode);
        } else {
          const defaultCounttry = await CountryCodesByName({
            country: "Bolivia",
          });
          setInputCodeCountryValue(defaultCounttry);
        }
      }
    };
    getInitialCode();
  }, [country]);

  const debouncedGetCode = useCallback(
    debounce((search: string) => {
      getCountryCodes(search);
    }, 500),
    [getCountryCodes]
  );
  // Search Country Code
  const [accordion, setAccordion] = useState<string>("h-0 py-0");
  const handleButtonClick = () => {
    setAccordion((prevAccordion) =>
      prevAccordion === "h-0 py-0" ? "h-[180px] py-0" : "h-0 py-0"
    );
  };

  const Search = () => {
    return (
      <div>
        <div className="h-[140px] overflow-scroll text-sm px-2 border-b border-x overflow-x-hidden border-colortext ">
          <ul>
            {codes.map((code, index) => {
              return (
                <li
                  className="hover:bg-[#ececec] my-1"
                  key={index}
                  onClick={() => {
                    handleCodeSelect(code);
                    setAccordion("h-0 py-0");
                  }}
                >
                  <div className="flex text-[14px] justify-between items-center cursor-pointer">
                    <div className="flex  justify-start items-center">
                      <div className="relative w-[30px] h-[25px]">
                        <Image
                          src={code.flags.svg}
                          alt={code.name.common}
                          fill
                        />
                      </div>
                      <p className="mx-2">{code.name.common}</p>
                    </div>
                    <p className="mx-1">
                      {code.idd.root}
                      {code.idd.suffixes[0]}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return {
    Search,
    searchValue: inputCodeCountryValue,
    handleButtonClick,
    accordion,
    handleSearhInput,
  };
}
