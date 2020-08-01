import {IconButton, IconButtonProps, withStyles} from "@material-ui/core";
import React from "react";

const MutedIconButtonStyle = withStyles({
    root: {
        cursor: "default",
        background: "none !important"
    }
})(IconButton);

function MutedIconButton(props: IconButtonProps) {
    return <MutedIconButtonStyle
        {...props}
        disableFocusRipple={true}
        disableRipple={true}
        onClick={() => {}}
    />
}

export default MutedIconButton;