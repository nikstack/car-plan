import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem,
    Select, TextField
} from "@material-ui/core";
import Entry from "../model/Entry";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MarginBox from "./general/MarginBox";
import {Field, FieldProps, Form, Formik} from "formik";

interface Props {
    onSubmit: (entry: Entry) => void;
    entry?: Entry;
    open: boolean;
    onClose: () => void;
}

export default function AddEntryForm({
                                         onSubmit,
                                         entry = new Entry('', new Date(), new Date(), new Date(),
                                             0, ''),
                                         open, onClose
                                     }: Props) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [prio, setPrio] = useState<number>(0);

    const handleChangePrio = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPrio(event.target.value as number);
    };

    return (
        <Formik
            initialValues={entry}
            onSubmit={(e, actions) => {
                onSubmit(e!);
                actions.setSubmitting(false);
            }}
        >
            {({isSubmitting, errors, setFieldValue}) => (
                <Form>
                    <Dialog open={open} onClose={onClose}>
                        <DialogTitle>
                            Eintrag {entry.id ? "bearbeiten" : "erstellen"}
                        </DialogTitle>
                        <DialogContent>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <MarginBox>
                                    <Field
                                        id={"start-date"}
                                        name={"start-date"}
                                    >
                                        {() => (
                                            <KeyboardDateTimePicker
                                                id="start-date-picker"
                                                variant="inline"
                                                format="MM/dd/yyyy HH:mm"
                                                ampm={false}
                                                label="Start"
                                                value={startDate}
                                                onChange={date => {
                                                    setStartDate(date);
                                                    setFieldValue("start-date", date);
                                                }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        )}
                                    </Field>
                                </MarginBox>

                                <MarginBox>
                                    <Field
                                        id={"end-date"}
                                        name={"end-date"}
                                    >
                                        {() => (
                                            <KeyboardDateTimePicker
                                                id="end-date-picker"
                                                variant="inline"
                                                format="MM/dd/yyyy HH:mm"
                                                ampm={false}
                                                label="Ende"
                                                value={endDate}
                                                onChange={date => {
                                                    setEndDate(date);
                                                    setFieldValue("end-date", date);
                                                }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        )}
                                    </Field>
                                </MarginBox>

                                <MarginBox>
                                    <Field
                                        id={"prio"}
                                        name={"prio"}
                                    >
                                        {() => (
                                            <>
                                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={prio}
                                                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                        const prio = event.target.value as number;
                                                        setPrio(prio);
                                                        setFieldValue("prio", prio);
                                                    }}
                                                >
                                                    {Entry.priorities.map((prio, index) => (
                                                        <MenuItem key={index} value={index}>{prio}</MenuItem>
                                                    ))}
                                                </Select>
                                            </>
                                        )}
                                    </Field>
                                </MarginBox>

                                <MarginBox>
                                    <Field
                                        id={"description"}
                                        name={"description"}
                                    >
                                        {({field}: FieldProps) => (
                                            <TextField
                                                {...field}
                                                label="Beschreibung"
                                                multiline
                                                rowsMax={4}
                                                variant="outlined"
                                            />
                                        )}
                                    </Field>
                                </MarginBox>
                            </MuiPickersUtilsProvider>
                        </DialogContent>
                        <DialogActions>
                            <Button>OK</Button>
                        </DialogActions>
                    </Dialog>
                </Form>
            )}

        </Formik>
    )
}