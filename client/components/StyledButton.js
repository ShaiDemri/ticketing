import { Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles((theme) => ({
  root: {
    color: "white",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    borderRadius: 3,
    border: 0,
    height: 30,
    marginRight: theme.spacing(5),
    "@global": {
      "@keyframes jiggle": {
        "0%": {
          transform: "translateX(2px)",
        },
        "25%": {
          transform: "translateX(-2px)",
        },
        "50%": {
          transform: "translateX(2px)",
        },
        "75%": {
          transform: "translateX(-2px)",
        },
        "100%": {
          transform: "translateX(2px)",
        },
      },
    },
    "&:hover": {
      animation: "$jiggle 0.5s 2",
      animationTimingFunction: "ease-out",
    },
  },
}))(Button);

export default StyledButton;
