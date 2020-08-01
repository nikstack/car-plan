import React, {useState} from 'react';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Box} from "@material-ui/core";

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        new Date(),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    autoOk
                    orientation="portrait"
                    variant="static"
                    openTo="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
        </Box>
    );
}