import "./Table.css";

const Table = ({ countries, setCountry, country: selectedCountry }) => {
  console.log({ selectedCountry, countries });
  return (
    <table className="table">
      <tbody>
        {countries.map(({ country, countryInfo, cases }) => {
          return (
            <tr
              key={country}
              style={{ background: selectedCountry === country && "pink" }}
              onClick={() => {
                setCountry(countryInfo?.iso3);
                console.log({ country });
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
  );
};

export default Table;
