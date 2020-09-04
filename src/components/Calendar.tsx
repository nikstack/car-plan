import React from 'react';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Box} from "@material-ui/core";

interface Props {
    value: Date | null;
    onChange: (date: Date | null) => void;
}

export default function Calendar({value, onChange}: Props) {

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    autoOk
                    orientation="portrait"
                    variant="static"
                    openTo="date"
                    value={value}
                    onChange={onChange}
                />
            </MuiPickersUtilsProvider>
        </Box>
    );
}