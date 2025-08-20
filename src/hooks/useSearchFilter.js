import { useState, useEffect } from "react";

export default function useSearchFilter(data, query, keys, triggerSearch) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
   
    if (!query) {
      setFilteredData(data);
      return;
    }

    if (triggerSearch) {
      const lowerQuery = query.toLowerCase();

      const filtered = data.filter((item) =>
        keys.some((key) =>
          item[key]?.toString().toLowerCase().includes(lowerQuery)
        )
      );

     
      setFilteredData(filtered.length > 0 ? filtered : []);
    }
  }, [data, query, keys, triggerSearch]);

  return filteredData;
}
