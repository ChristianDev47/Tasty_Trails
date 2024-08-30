import { Order } from "../types/orders";
const API = "https://tasty-trails-api.onrender.com/api";

interface orders {
  userId?: number;
}
export async function getOrdersByUser({ userId }: orders) {
  const response = await fetch(`${API}/orders/user/${userId}`);
  const data = await response.json();
  return data;
}

export async function getOrders({ id }: { id: string }) {
  const response = await fetch(`${API}/orders/${id}`);
  const data = await response.json();
  return data;
}

export async function createOrder({ newOrder }: { newOrder: Order }) {
  try {
    const response = await fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newOrder),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function updateStateOrder({
  id,
  state,
}: {
  state: Order;
  id: number;
}) {
  try {
    const response = await fetch(`${API}/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(state),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
