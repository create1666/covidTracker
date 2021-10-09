import "./Table.css";

const Table = ({ countries, setCountry, country: selectedCountry }) => {
  console.log({ selectedCountry, countries });
  return (
    <div className="tablediv">
      {" "}
      <table className="table">
        <tbody>
          {countries.map(({ country, countryInfo, cases }) => {
            return (
              <tr
                key={country}
                style={{ background: selectedCountry === country && "pink" }}
                onClick={() => {
                  setCountry(countryInfo?.iso3);
                }}
              >
                <td>{country}</td>
                <td>
                  <strong>{cases}</strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
