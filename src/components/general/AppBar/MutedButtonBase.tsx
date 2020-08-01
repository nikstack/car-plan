import {ButtonBase, ButtonBaseProps, withStyles} from "@material-ui/core";
import React from "react";

const MutedButtonBaseStyle = withStyles({
    root: {
        cursor: "default",
    }
})(ButtonBase);

function MutedButtonBase(props: ButtonBaseProps) {
    return <MutedButtonBaseStyle
        {...props}
        disableTouchRipple={true}
        disableRipple={true}
        onClick={() => {}}
    />
}

export default MutedButtonBase;