import axios from "axios";
import { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
    textTransform: "uppercase",
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default ({ url, method, body, onSuccess }) => {
  const classes = useStyles();
  const [errors, setErrors] = useState(null);
  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });
      onSuccess(response.data);
      return response.data;
    } catch (error) {
      setErrors(
        <>
          {error.response.data.errors.map((err) => (
            <Alert className={classes.root} severity="error" key={err.message}>
              {err.message}
            </Alert>
          ))}
        </>,
        {}
      );
    }
  };
  return { doRequest, errors };
};
