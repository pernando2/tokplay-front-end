import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    fetch(url) // Ganti URL dengan endpoint yang sesuai
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.length === 0) {
          setError('No data available.');
        } else {
          setData(responseData);
          setError(null);
        }
      })
      .catch((error) => {
        setError('Error fetching data. Please try again later.');
      });
  }, [data]);

  return [data];
};

export default useFetch;
