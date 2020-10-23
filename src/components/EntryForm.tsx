import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton,
    InputLabel, MenuItem,
    Select, TextField, Typography as T, useTheme, withStyles
} from "@material-ui/core";
import Entry from "../model/Entry";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MarginBox from "./general/MarginBox";
import {Field, FieldProps, Form, Formik} from "formik";
import GP from "../GP";
import {Delete} from "@material-ui/icons";
import {de} from "date-fns/locale";

interface Props {
    onSubmit: (entry: Entry, oldEntry?: Entry) => void;
    onDelete: (entry: Entry) => void;
    entry?: Entry;
    open: boolean;
    onClose: () => void;
    classes: any
}

const styles = (theme: any) => ({
    deleteIcon: {
        color: theme.palette.error.main
    }
})

function EntryForm({
                       onSubmit,
                       onDelete,
                       entry = new Entry('', new Date(), new Date(), new Date(),
                           0, ''),
                       open, onClose, classes
                   }: Props) {

    entry.userName = GP.getUser();
    entry.creationDate = new Date();
    const theme = useTheme();

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
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={de}>
                                <MarginBox>
                                    <Field
                                        id={"dateFrom"}
                                        name={"dateFrom"}
                                    >
                                        {() => (
                                            <KeyboardDateTimePicker
                                                variant="inline"
                                                format="dd.MM.yyyy HH:mm"
                                                ampm={false}
                                                label={"Von"}
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
                                                format="dd.MM.yyyy HH:mm"
                                                ampm={false}
                                                label={"Bis"}
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
                                                <InputLabel id="prio-label"><T
                                                    variant={"caption"}>Priorität</T></InputLabel>
                                                <Select
                                                    labelId="prio-label"
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
                                            label={"Beschreibung"}
                                            multiline
                                            rowsMax={4}
                                            variant="outlined"
                                        />
                                    )}
                                </Field>
                            </MarginBox>
                        </DialogContent>
                        <DialogActions>
                            {entry.id ? (<IconButton onClick={() => {
                                onClose();
                                onDelete(entry);
                            }}>
                                <Delete className={classes.deleteIcon}/>
                            </IconButton>) : ''}
                            <div style={{flex: '1 0 0'}}/>
                            <Button color={"primary"} onClick={onClose}>Abbrechen</Button>
                            <Button color={"primary"} type={"submit"}>Speichern</Button>

                        </DialogActions>
                    </Form>
                )}

            </Formik>
        </Dialog>
    )
}

export default withStyles(styles)(EntryForm);
