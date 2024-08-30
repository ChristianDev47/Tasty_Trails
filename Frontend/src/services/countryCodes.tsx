export async function CountryCodes() {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/all?fields=name,idd,flags`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function CountryCodesByName({ country }: { country: string }) {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${country}/?fields=name,idd,flags`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return [];
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
