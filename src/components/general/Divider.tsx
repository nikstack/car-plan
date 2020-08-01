import {Divider as MuiDivider, withStyles} from "@material-ui/core";

const Divider = withStyles({
    root: {
        marginTop: '8px',
        marginBottom: '8px'
    }
})(MuiDivider);

export default Divider;