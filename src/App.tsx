import React, {useState} from 'react';
import AppBarMenuItem from "./components/general/AppBar/AppBarMenuItem";
import {Add, Today} from "@material-ui/icons";
import AppBar from "./components/general/AppBar/AppBar";
import {Box, Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import EntryView from "./components/EntryView";
import Entry from "./model/Entry";
import Calendar from "./components/Calendar";
import EntryForm from "./components/EntryForm";
import axios from 'axios';
import useMappedEntries from "./components/useMappedEntries";
import GP from "./GP";
import 'typeface-nunito';
import StdDialog from "./components/StdDialog";

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

    const {isOnline, mappedEntries, getDayEntries, addMappedEntry, updateMappedEntry, deleteMappedEntry} = useMappedEntries();
    const [calendar, setCalendar] = useState<Date>(new Date());
    const [entryDialog, setEntryDialog] = useState<{ open: boolean, entry?: Entry; }>({open: false});
    const [stdDialog, setStdDialog] = useState<{
        open: boolean,
        onClose: (confirmed: boolean) => void
        title: string
        text: string
        showCancel: boolean
    }>({
        open: false, onClose: () => {
        }, title: '', text: '', showCancel: true
    });

    const setDialogInternetError = () => {
        setStdDialog(() => ({
            showCancel: false,
            open: true,
            onClose: () => {
                setStdDialog(() => ({
                    ...stdDialog,
                    open: false
                }))
            },
            title: "Kein Internet",
            text: "Stelle sicher, dass du mit dem Internet verbunden bist, um die App zu verwenden!"
        }));
    }

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
            axios.put(GP.getBaseServerURL() + `?k=` + GP.getKey(), object)
                .then(({data}) => {
                    const updatedEntry = Entry.plainToEntry(data);
                    updateMappedEntry(oldEntry, updatedEntry);
                })
                .catch(() => {
                    setDialogInternetError();
                });


        } else {
            axios.post(GP.getBaseServerURL() + `?k=` + GP.getKey(), object)
                .then(({data}) => {
                    const newEntry = Entry.plainToEntry(data);
                    addMappedEntry(newEntry);
                })
                .catch(() => {
                    setDialogInternetError();
                });
        }
    }

    const deleteEntry = async (entry: Entry) => {
        axios.delete(GP.getBaseServerURL() + `?entry_id=${entry.id}&k=` + GP.getKey())
            .then(() => {
                deleteMappedEntry(entry);
            })
            .catch(() => {
                setDialogInternetError();
            });
    }

    const onOnline = async (callback: () => void) => {
        axios.get(GP.getBaseServerURL() + `?action=ping&k=` + GP.getKey())
            .then(() => {
                callback();
            })
            .catch(() => {
                setDialogInternetError();
                setEntryDialog(() => ({open: false}));
            });
    }

    const openEntryDialog = (entry?: Entry) => {
        onOnline(() => {
            setEntryDialog(() => ({open: true, entry: entry}));
        });
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
                openEntryDialog();
            },
            "right")
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box bgcolor={theme.palette.primary.main}></Box>
            <AppBar title={""} titleClick={null} menu={menu}/>
            <Calendar value={calendar} eventDateKeys={Object.keys(mappedEntries)} onChange={(date) => {
                if (date === null) {
                    date = new Date();
                }
                handleChangeDate(date);
            }}/>
            <Container>


                {isOnline ? getDayEntries(calendar).map((entry: Entry) => (
                    <EntryView key={entry.id}
                               entry={entry}
                               onClick={() => {
                                   openEntryDialog(entry);
                               }}
                    />
                )) : ''}
                <EntryForm
                    entry={entryDialog.entry}
                    onClose={() => {
                        setEntryDialog(() => ({open: false}));
                    }}
                    open={entryDialog.open}
                    onSubmit={(entry: Entry, oldEntry?: Entry) => {
                        setEntryDialog(() => ({open: false}));
                        saveEntry(entry, oldEntry);
                    }}
                    onDelete={(entry: Entry) => {
                        setStdDialog(() => ({
                            showCancel: true,
                            open: true,
                            onClose: (confirmed) => {
                                if (confirmed) {
                                    deleteEntry(entry);
                                }
                                setStdDialog(() => ({
                                    ...stdDialog,
                                    open: false
                                }))
                            },
                            title: "Eintrag Löschen",
                            text: "Möchtest du den Eintrag wirklich löschen?"
                        }))
                    }}
                />
                <StdDialog
                    showCancel={stdDialog.showCancel}
                    open={stdDialog.open}
                    onClose={stdDialog.onClose}
                    title={stdDialog.title}
                    text={stdDialog.text}
                />

            </Container>
        </ThemeProvider>
    );
}

export default App;