import { baseUrl, eventsQuantity } from "../variables.js";

async function getEvents(userName) {
    const eventsResponse = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`);
    return await eventsResponse.json()
}

export { getEvents }