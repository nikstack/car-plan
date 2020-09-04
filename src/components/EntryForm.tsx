import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel, MenuItem,
    Select, TextField
} from "@material-ui/core";
import Entry from "../model/Entry";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MarginBox from "./general/MarginBox";
import {Field, FieldProps, Form, Formik} from "formik";
import GP from "../GP";

interface Props {
    onSubmit: (entry: Entry, oldEntry?: Entry) => void;
    entry?: Entry;
    open: boolean;
    onClose: () => void;
}

export default function EntryForm({
                                      onSubmit,
                                      entry = new Entry('', new Date(), new Date(), new Date(),
                                          0, ''),
                                      open, onClose
                                  }: Props) {

    entry.userName = GP.getUser();
    entry.creationDate = new Date();

    return (
        <Dialog open={open} onClose={onClose}>
            <Formik
                initialValues={entry}
                onSubmit={(e, actions) => {
                    onSubmit(e!, entry);
                    actions.setSubmitting(false);
                }}
            >
                {({isSubmitting, errors, setFieldValue, touched, values}) => (
                    <Form>
                        <DialogTitle>
                            Eintrag {entry.id ? "bearbeiten" : "erstellen"}
                        </DialogTitle>
                        <DialogContent>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <MarginBox>
                                    <Field
                                        id={"dateFrom"}
                                        name={"dateFrom"}
                                    >
                                        {() => (
                                            <KeyboardDateTimePicker
                                                variant="inline"
                                                format="MM/dd/yyyy HH:mm"
                                                ampm={false}
                                                label="From"
                                                value={values.dateFrom}
                                                onChange={date => {
                                                    setFieldValue("dateFrom", date);
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
                                        id={"dateTo"}
                                        name={"dateTo"}
                                    >
                                        {() => (
                                            <KeyboardDateTimePicker
                                                variant="inline"
                                                format="MM/dd/yyyy HH:mm"
                                                ampm={false}
                                                label="To"
                                                value={values.dateTo}
                                                onChange={date => {
                                                    setFieldValue("dateTo", date);
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
                                                    value={values.prio}
                                                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                        const prio = event.target.value as number;
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
                            </MuiPickersUtilsProvider>


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
                        </DialogContent>
                        <DialogActions>
                            <Button color={"primary"} onClick={onClose}>Abbrechen</Button>
                            <Button color={"primary"} type={"submit"}>Speichern</Button>
                        </DialogActions>
                    </Form>
                )}

            </Formik>
        </Dialog>
    )
}
