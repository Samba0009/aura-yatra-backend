// API base URL: prefer VITE_API_BASE_URL when set for production, otherwise use Railway backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aura-yatra-backend-production.up.railway.app/api';

export const fetchTemples = async (city = '') => {
  const url = city ? `${API_BASE_URL}/temples?city=${city}` : `${API_BASE_URL}/temples`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch temples');
  return response.json();
};

export const fetchHotels = async (city = '') => {
    const url = city ? `${API_BASE_URL}/hotels?city=${city}` : `${API_BASE_URL}/hotels`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch hotels');
    return response.json();
};

export const fetchCabs = async (city = '') => {
    const url = city ? `${API_BASE_URL}/cabs?city=${city}` : `${API_BASE_URL}/cabs`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch cabs');
    return response.json();
};

export const fetchBuses = async (city = '') => {
    const url = city ? `${API_BASE_URL}/buses?city=${city}` : `${API_BASE_URL}/buses`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch buses');
    return response.json();
};

export const fetchPlans = async (terrain = '', budget = '') => {
  let url = `${API_BASE_URL}/plans`;
  const params = new URLSearchParams();
  if (terrain) params.append('terrain', terrain);
  if (budget) params.append('budget', budget);
  if (params.toString()) url += `?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch plans');
  return response.json();
};

export const fetchBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

export const fetchBookings = async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
};

export const createBlog = async (blogData) => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });
    if (!response.ok) throw new Error('Failed to create blog');
    return response.json();
};

export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  if (!response.ok) throw new Error('Failed to create booking');
  return response.json();
};
