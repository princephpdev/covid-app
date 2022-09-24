const SelectInput = ({ listCountries, selectedCountry }) => {
  const handleOnChange = (event) => {
    event.preventDefault();
    selectedCountry(event.target.value);
  };
  return (
    <div className="form-control w-full mx-auto text-center max-w-xs">
      <label className="label">
        <span className="label-text">Pick A Country</span>
      </label>
      <select className="select select-bordered" onChange={handleOnChange}>
        <option value="global">Global</option>
        {listCountries?.countries &&
          listCountries.countries.map((country, index) => (
            <option key={index + 1} value={country.name}>
              {country.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectInput;
