import { useEffect, useState } from "react";
import DonutChart from "./Components/DonutChart";
import Footer from "./Components/Footer";
import SelectInput from "./Components/SelectInput";
import Stats from "./Components/Stats";

const baseURL = "https://covid19.mathdro.id/api";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("global");
  const [stats, setStats] = useState("");

  const selectedCountry = (selected) => {
    setCountry(selected);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Covid 19 Cases Statistics",
      },
    },
  };

  const labels = ["Confirmed", "Recovered", "Deaths"];

  const data = {
    labels,
    datasets: [
      {
        label: "No of Covid Cases",
        data: [
          stats?.confirmed?.value,
          stats?.recovered?.value,
          stats?.deaths?.value,
        ],
        backgroundColor: ["blue", "green", "red"],
      },
    ],
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getCountries = async () => {
      try {
        const response = await fetch(`${baseURL}/countries`);
        const data = await response.json();
        isMounted && setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountries();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getStats = async (country) => {
      try {
        const statURL =
          country === "global"
            ? `${baseURL}/`
            : `${baseURL}/countries/${country}`;
        const response = await fetch(`${statURL}`);
        const data = await response.json();
        isMounted && setStats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStats(country);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [country]);

  return (
    <div className="container mx-auto items-center py-14 px-4">
      <h1 className="font-bold text-4xl py-6 px-4">
        Covid 19 Cases Statistics <br />
        <span className="text-sm font-serif">
          {stats && new Date(stats?.lastUpdate).toDateString()}
        </span>
      </h1>
      <Stats stats={stats} />
      <h5 className="font-bold text-2xl p-10 text-center">View By Country</h5>
      <SelectInput
        listCountries={countries}
        selectedCountry={selectedCountry}
      />
      <div className="max-w-xl py-12 mx-auto">
        {stats && <DonutChart data={data} options={options} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
