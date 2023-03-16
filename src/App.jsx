import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);

  const getData = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    setCountries(countries);
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleTheme = () => {
    const themeBtn = document.querySelector(".theme-btn");
    const activeArray = [
      document.body,
      document.querySelector(".nav-bar"),
      ,
      document.querySelector(".main-input"),
      document.querySelector(".select"),
      document.querySelector(".back-btn"),
    ];
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((item) => item.classList.toggle("active"));
    themeBtn.classList.toggle("active");
    activeArray.forEach((item) => item.classList.toggle("active"));

    themeBtn.innerHTML =
      themeBtn.innerHTML == '<i class="fa fa-moon-o"></i> Dark Mode'
        ? '<i class="fa fa-sun-o"></i> Light Mode'
        : '<i class="fa fa-moon-o"></i> Dark Mode';
  };

  const returnContainer = () => {
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    const selectSection = document.querySelector(".select-section");

    main.style.display = "grid";
    selectSection.style.display = "flex";
    container.style.display = "none";
  };

  const toggleContainer = (
    flag,
    name,
    population,
    capital,
    nativeName,
    region,
    subRegion,
    currencies,
    languages,
    topLevelDomain
  ) => {
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    const selectSection = document.querySelector(".select-section");
    const newContainer = document.querySelector(".new-container");

    newContainer.innerHTML = `
        <img src=${flag} alt=${name} />
        <div>
          <div>
            <h3 class="name">${name}</h3>
            <h3>Native Name: <span>${nativeName}</span></h3>
            <h3>Population: <span>${population}</span></h3>
            <h3>Region: <span>${region}</span></h3>
            <h3>Sub Region: <span>${subRegion}</span></h3>
          </div>
          <div>
            <h3>Capital: <span>${capital}</span></h3>
            <h3>Top Level Domain: <span>${topLevelDomain}</span></h3>
            <h3>Currencies: <span>${currencies}</span></h3>
            <h3>Languages: <span>${languages}</span></h3>
          </div>
        </div>`;

    main.style.display = "none";
    selectSection.style.display = "none";
    container.style.display = "flex";
  };

  const changeData = async (e) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${e.target.value}`
    );
    const countries = await response.json();
    setCountries(countries);
  };

  const singleCountry = async () => {
    const mainInput = document.querySelector(".main-input");
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${mainInput.value}`
    );
    const countries = await response.json();

    if (countries.status == 404) {
      return alert("Invalid Input");
    }

    setCountries(countries);
  };

  return (
    <>
      <nav className="nav-bar">
        <h1 className="title">Where in the world?</h1>
        <button className="theme-btn" onClick={toggleTheme}>
          <i className="fa fa-sun-o"></i>
          Light Mode
        </button>
      </nav>

      <div className="select-section">
        <div className="input">
          <i className="fa fa-search" onClick={singleCountry}></i>
          <input
            type="search"
            placeholder="Search for a country..."
            className="main-input"
          />
        </div>
        <select className="select" onChange={changeData}>
          <option hidden>Filter by region</option>
          <option>Africa</option>
          <option>America</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      </div>

      <div className="container">
        <button className="back-btn" onClick={returnContainer}>
          <i className="fa fa-arrow-left"></i> Back
        </button>
        <div className="new-container"></div>
      </div>
      <div className="main">
        {countries.map((item, index) => {
          return (
            <article
              key={index}
              className="box"
              onClick={() =>
                toggleContainer(
                  item.flags.png,
                  item.name.common,
                  item.population,
                  item.capital,
                  item.name.official,
                  item.region,
                  item.subregion,
                  item.currencies[Object.keys(item.currencies)].name,
                  item.languages[Object.keys(item.languages)],
                  item.tld[0]
                )
              }
            >
              <img src={item.flags.png} alt={item.name.common} />
              <div className="details">
                <h3 className="name">{item.name.common}</h3>
                <h3>
                  Population: <span className="text">{item.population}</span>
                </h3>
                <h3>
                  Region: <span className="text">{item.region}</span>
                </h3>
                <h3>
                  Capital: <span className="text">{item.capital}</span>
                </h3>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export default App;
