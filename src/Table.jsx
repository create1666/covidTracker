import numeral from "numeral";
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
                  console.log({ country });
                }}
              >
                <td>{country}</td>
                <td>
                  <strong>{numeral(cases).format("0,0")}</strong>
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
