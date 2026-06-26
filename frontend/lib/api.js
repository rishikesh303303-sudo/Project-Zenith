const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function request(path, options = {}) {
  if (!API_BASE_URL) {
    throw new ApiError(
      "NEXT_PUBLIC_API_BASE_URL set nahi hai (.env.local check karo)",
      0
    );
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.message || body.error || detail;
    } catch {
      
    }
    throw new ApiError(detail, res.status);
  }

  if (res.status === 204) return null;
  return res.json();
}


export async function fetchSatellites({ lat, lng }) {
  const json = await request(`/sky/visible?lat=${lat}&lng=${lng}`);
  const list = json?.data || [];

  
  return list.map((sat) => ({
    id: String(sat.id),
    name: sat.name,
    lat: sat.lat,
    lng: sat.lng,
    status: "ACTIVE",
  }));
}

export function searchLocationByCity(city) {
  return request(`/location/search`, {
    method: "POST",
    body: JSON.stringify({ city }),
  });
}
// ye existing functions ke saath add karo
export function reverseGeocode(lat, lng) {
  return request(`/location/reverse?lat=${lat}&lng=${lng}`);
}

export { ApiError };