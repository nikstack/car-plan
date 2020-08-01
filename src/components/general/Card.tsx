import {Card as MuiCard, withStyles} from "@material-ui/core";

const Card = withStyles({
    root: {
        marginTop: '8px',
        marginBottom: '8px'
    }
})(MuiCard);

export default Card;