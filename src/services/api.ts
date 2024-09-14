// src/services/api.ts
import axios from 'axios';

const API_URL = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number = 1) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
};
