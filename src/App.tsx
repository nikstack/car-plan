import React, {useState} from 'react';
import AppBarMenuItem from "./components/general/AppBar/AppBarMenuItem";
import {Add, Today} from "@material-ui/icons";
import AppBar from "./components/general/AppBar/AppBar";
import {Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import EntryView from "./components/EntryView";
import Entry from "./model/Entry";
import Calendar from "./components/Calendar";
import EntryForm from "./components/EntryForm";
import axios from 'axios';
import useMappedEntries from "./components/useMappedEntries";
import GP from "./GP";
import 'typeface-nunito';
import ConfirmDialog from "./components/ConfirmDialog";

function App() {

    const theme = createMuiTheme({
        palette: {},
        typography: {
            fontFamily: "Nunito, sans-serif",

            body2: {
                // color: "textSecondary",
                fontSize: '9px'
            }
        }
    });

    const {mappedEntries, getDayEntries, addMappedEntry, updateMappedEntry, deleteMappedEntry} = useMappedEntries();
    const [calendar, setCalendar] = useState<Date>(new Date());
    const [entryDialog, setEntryDialog] = useState<{ open: boolean, entry?: Entry; }>({open: false});
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean,
        onClose: (confirmed: boolean) => void
        title: string
        text: string
    }>({open: false, onClose: () => {}, title: '', text: ''})

    const saveEntry = async (entry: Entry, oldEntry?: Entry) => {
        const data = new FormData();
        data.append('userName', entry.userName);
        data.append('creationDate', entry.creationDate.getTime().toString());
        data.append('dateFrom', entry.dateFrom.getTime().toString());
        data.append('dateTo', entry.dateTo.getTime().toString());
        data.append('prio', entry.prio.toString());
        data.append('description', entry.description);

        const object: any = {};
        data.forEach((value, key) => {
            object[key] = value;
        });

        if (entry.id) {
            if (oldEntry === undefined) {
                return;
            }
            object['id'] = entry.id;
            const {data} = await axios.put(GP.getBaseServerURL() + `?k=` + GP.getKey(), object);
            const updatedEntry = Entry.plainToEntry(data);
            updateMappedEntry(oldEntry, updatedEntry);
        } else {
            const {data} = await axios.post(GP.getBaseServerURL() + `?k=` + GP.getKey(), object);
            const newEntry = Entry.plainToEntry(data);
            addMappedEntry(newEntry);
        }
    }

    const deleteEntry = async (entry: Entry) => {
        await axios.delete(GP.getBaseServerURL() + `/${entry.id}?k=` + GP.getKey());
        deleteMappedEntry(entry);
    }

    const handleChangeDate = (date: Date = new Date()) => {
        setCalendar(new Date(date.getTime()));
    }

    const menu = [
        new AppBarMenuItem(<Today/>, "Heute",
            () => {
                handleChangeDate();
            },
            "right"),

        new AppBarMenuItem(<Add/>, "Eintrag erstellen",
            () => {
                setEntryDialog({open: true, entry: undefined})
            },
            "right")
    ];

    return (
        <ThemeProvider theme={theme}>
            <AppBar title={"Car Plan"} titleClick={null} menu={menu}/>
            <Container>
                <Calendar value={calendar} eventDateKeys={Object.keys(mappedEntries)} onChange={(date) => {
                    if (date === null) {
                        date = new Date();
                    }
                    handleChangeDate(date);
                }}/>
                {getDayEntries(calendar).map((entry: Entry) => (
                    <EntryView key={entry.id}
                               entry={entry}
                               onClick={() => {
                                   setEntryDialog(() => ({open: true, entry: entry}))
                               }}
                    />
                ))}
                <EntryForm
                    entry={entryDialog.entry}
                    onClose={() => {
                        setEntryDialog(() => ({open: false}))
                    }}
                    open={entryDialog.open}
                    onSubmit={(entry: Entry, oldEntry?: Entry) => {
                        setEntryDialog(() => ({open: false}));
                        saveEntry(entry, oldEntry);
                    }}
                    onDelete={(entry: Entry) => {
                        setConfirmDialog(() => ({
                            open: true,
                            onClose: (confirmed) => {
                                if (confirmed) {
                                    deleteEntry(entry);
                                    deleteMappedEntry(entry);
                                }
                                setConfirmDialog(() => ({
                                    ...confirmDialog,
                                    open: false
                                }))
                            },
                            title: "Eintrag Löschen",
                            text: "Möchtest du den Eintrag wirklich löschen?"
                        }))
                    }}
                />
                <ConfirmDialog
                    open={confirmDialog.open}
                    onClose={confirmDialog.onClose}
                    title={confirmDialog.title}
                    text={confirmDialog.text}
                />

            </Container>
        </ThemeProvider>
    );
}

export default App;