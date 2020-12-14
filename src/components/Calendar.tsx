import React from 'react';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {de} from 'date-fns/locale'
import {Box} from "@material-ui/core";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {makeStyles} from "@material-ui/core/styles";
import DateUtils from "../utils/DateUtils";

interface Props {
    value: Date | null;
    onChange: (date: Date | null) => void;
    eventDateKeys: string[];
}

export default function Calendar({value, onChange, eventDateKeys}: Props) {

    const useStyles = makeStyles((theme) => ({
        dayWithDotContainer: {
            position: 'relative'
        },
        dayWithDot: {
            position: 'absolute',
            height: 0,
            width: 0,
            border: '2px solid',
            borderRadius: 4,
            borderColor: theme.palette.primary.main,
            right: '50%',
            transform: 'translateX(2px)',
            top: '80%'
        }
    }));

    const classes = useStyles()

    const renderDayInPicker = (date: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate,
                               dayInCurrentMonth: boolean, dayComponent: JSX.Element) => {

        if (date && eventDateKeys.includes(DateUtils.timestampToKey(DateUtils.getDayDatetime(date).getTime()))) {
            return (<div className={classes.dayWithDotContainer}>
                {dayComponent}
                {dayInCurrentMonth ? (<div className={classes.dayWithDot}/>) : ''}
            </div>)
        }

        return dayComponent
    }

    return (
        <Box display={'flex'} justifyContent={'center'} boxSizing={"border-box"}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={de}>
                <DatePicker
                    renderDay={renderDayInPicker}
                    autoOk
                    orientation="portrait"
                    variant="static"
                    openTo="date"
                    value={value}
                    onChange={onChange}
                    lang={"de"}
                    fullWidth
                />
            </MuiPickersUtilsProvider>
        </Box>
    );
}