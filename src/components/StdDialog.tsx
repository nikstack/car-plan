import React, {useCallback} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@material-ui/core";
import Grow from '@material-ui/core/Grow';

interface Props {
    open: boolean,
    onClose: (confirm: boolean) => void,
    title: string,
    text: string,
    showCancel?: boolean
}

export default function StdDialog({onClose, title, text, open, showCancel = true}: Props) {
    const confirm = useCallback(() => {
        onClose(true);
    }, [onClose]);

    const decline = useCallback(() => {
        onClose(false);
    }, [onClose]);

    return (
            <Dialog open={open} onClose={decline} TransitionComponent={Grow}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent><DialogContentText>{text}</DialogContentText></DialogContent>
                <DialogActions>
                    {showCancel ? <Button onClick={decline} color="primary">Abbrechen</Button> : ''}
                    <Button onClick={confirm} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
    )
};