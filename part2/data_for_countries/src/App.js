import React, { useState, useEffect } from "react"
import axios from "axios"
import Search from "./components/Search"
import CountryList from "./components/CountryList"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        console.log("Countries fetched:", response.data)
        setCountries(response.data)
      })
      .catch((error) => {
        console.error("Error fetching countries:", error)
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Filtered countries:", filteredCountries)

  return (
    <div>
      <Search value={search} onChange={handleSearchChange} />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default App