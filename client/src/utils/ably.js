import Ably from "ably/promises";

let realtimes = new Map();

async function getAblyRealtime(chatSpaceId) {
  let realtime = realtimes.get(chatSpaceId);
  if (!realtime) {
    try {
      const response = await fetch(`api/ably-auth?chatSpaceId=${chatSpaceId}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }
      const token = await response.text(); // Parse the token string from the response

      const authOptions = {
        token,
      };

      realtime = new Ably.Realtime.Promise(authOptions);
      realtimes.set(chatSpaceId, realtime);
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  }
  return realtime;
}

export default getAblyRealtime;
