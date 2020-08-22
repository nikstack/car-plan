import React, {useEffect, useState} from 'react';
import AppBarMenuItem from "./components/general/AppBar/AppBarMenuItem";
import {Add, Today} from "@material-ui/icons";
import AppBar from "./components/general/AppBar/AppBar";
import {Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import EntryView from "./components/EntryView";
import Entry from "./model/Entry";
import Calendar from "./components/Calendar";
import EntryForm from "./components/EntryForm";
import axios from 'axios';

function App() {

    const theme = createMuiTheme({
        palette: {},
        typography: {
            fontFamily: "Nunito, sans-serif",
            body2: {
                color: "textSecondary",
                fontSize: '0.7em'
            }
        }
    });

    const [calendar, setCalendar] = useState<Date | null>(new Date());
    const [entries, setEntries] = useState<(Entry)[]>([]);
    const [entryDialog, setEntryDialog] = useState<{ open: boolean, entry?: Entry; }>({open: false});

    const saveEntry = async (entry: Entry) => {
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
            const {data} = await axios.put(`http://localhost:3002/entries/${entry.id}`, object);
            const updatedEntry = Entry.plainToEntry(data);
            setEntries(entries => {
                const index = entries.findIndex(
                    entry => entry.id === updatedEntry.id
                );
                entries[index] = updatedEntry;
                return [...entries];
            });
        } else {
            const {data} = await axios.post(`http://localhost:3002/entries`, object);
            const newEntry = Entry.plainToEntry(data);
            setEntries(entries => ([...entries, newEntry]))
        }
    }

    const menu = [
        new AppBarMenuItem(<Today/>, "Heute",
            () => {
                setCalendar(new Date())
            },
            "right"),

        new AppBarMenuItem(<Add/>, "Eintrag erstellen",
            () => {
                setEntryDialog({open: true, entry: undefined})
            },
            "right")
    ];

    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.get<Entry[]>('http://localhost:3002/entries');
            data.forEach((entry: any, index: number) => {
                Entry.plainToEntry(entry);
            });
            setEntries(data as Entry[]);
        }

        fetchData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AppBar title={"Car Plan"} titleClick={null} menu={menu}/>
            <Container>
                <Calendar value={calendar} onChange={setCalendar}/>
                {entries.map((entry: Entry) => (
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
                    onSubmit={(entry: Entry) => {
                        setEntryDialog(() => ({open: false}));
                        saveEntry(entry);
                    }}
                />

            </Container>
        </ThemeProvider>
    );
}

export default App;