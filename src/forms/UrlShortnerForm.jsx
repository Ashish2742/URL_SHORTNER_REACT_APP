import React, { useState } from 'react';
import { shortenUrl } from '../services/urlShortenerService';
import '../forms/index.css';

const UrlShortenerForm = () => {
  const [urlData, setUrlData] = useState({
    longUrl: '',
    shortUrl: '',
    copied: false,
    errorMessage: '',
  });

  // Regular expression to validate URL
  const urlRegex = /^(https?:\/\/[^\s]+)$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUrlData({ ...urlData, copied: false, errorMessage: '' });

    if (!urlRegex.test(urlData.longUrl)) {
      setUrlData({ ...urlData, errorMessage: 'Invalid URL format. Please enter a valid URL starting with http:// or https://.' });
      return;
    }

    if (urlData.longUrl.length <= 6) {
      setUrlData({ ...urlData, errorMessage: 'URL must be more than 6 characters long.' });
      return;
    }

    try {
      const shortUrl = await shortenUrl(urlData.longUrl);
      setUrlData({
        ...urlData,
        shortUrl: shortUrl,
      });
    } catch (error) {
      console.error('Error shortening the URL:', error.message);
      setUrlData({ ...urlData, errorMessage: 'Error shortening the URL. Please try again.' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(urlData.shortUrl);
    setUrlData({
      longUrl: '', // Reset longUrl
      shortUrl: '', // Clear shortUrl
      copied: true,
      errorMessage: '', // Clear any previous error message
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">URL Shortener</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="url"
            placeholder="Enter your URL"
            value={urlData.longUrl}
            onChange={(e) =>
              setUrlData({ ...urlData, longUrl: e.target.value })
            }
            required
            className="input"
          />
          <button type="submit" className="button">
            Shorten URL
          </button>
        </form>
        {urlData.errorMessage && (
          <div className="error-message">
            <p>{urlData.errorMessage}</p>
          </div>
        )}
        {urlData.shortUrl && !urlData.errorMessage && (
          <div className="result-card">
            <p className="result-title">Shortened URL:</p>
            <div className="short-url-wrapper">
              <input
                type="text"
                value={urlData.shortUrl}
                readOnly
                className="short-url-input"
                id="shortUrlInput"
              />
              <button
                onClick={() => {
                  document.getElementById('shortUrlInput').select();
                  document.execCommand('copy');
                  handleCopy();
                }}
                className={`copy-button ${urlData.copied ? 'copied' : ''}`}
              >
                {urlData.copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortenerForm;
