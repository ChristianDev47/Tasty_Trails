const API = "https://tasty-trails-api.onrender.com/api";

export async function getMenuDishes() {
  try {
    const res = await fetch(`${API}/menuDishes`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function getAllCategories() {
  try {
    const res = await fetch(`${API}/categories`, {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getDish() {
  try {
    const res = await fetch(`${API}/dishes`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getDishById({ id }: { id: number }) {
  try {
    const res = await fetch(`${API}/dishes/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
