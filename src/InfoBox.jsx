import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
const InfoBox = ({ title, cases, total, ...props }) => {
  return (
    <div
      className={`infoBox ${props.active && "infoBox--selectedCase"} ${
        props.isGreen && "infoBox--recovered"
      } ${props.isBlack && "infoBox--deaths"}`}
    >
      <Card onClick={props.onClick}>
        <CardContent>
          <Typography className="infoBox_title" color="primary">
            {title}
          </Typography>
          <h2
            className={`infoBoxcases ${
              props.isGreen && "infoBoxcases--recoveredText"
            } ${props.isBlack && "infoBoxcases--deaths"}`}
          >
            {cases}
          </h2>
          <Typography className="infoBox_total" color="primary">
            {total === "N/A" ? "" : `${total}: Total`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;
