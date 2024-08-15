// src/services/urlShortenerService.js
import axios from 'axios';

const API_URL = 'http://13.60.54.169:80/shorten/';

export const shortenUrl = async (longUrl) => {
  const formData = new FormData();
  formData.append('url', longUrl);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Extract the shortened URL from the plain text response
    const responseText = response.data;
    const urlMatch = responseText.match(/shortened_url:(.+)/);
    if (urlMatch) {
      return `http://13.60.54.169/${urlMatch[1]}`;
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
