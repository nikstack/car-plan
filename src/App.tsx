import React, {useEffect, useState} from 'react';
import AppBarMenuItem from "./components/general/AppBar/AppBarMenuItem";
import {Add} from "@material-ui/icons";
import AppBar from "./components/general/AppBar/AppBar";
import {Box, Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import EntryView from "./components/EntryView";
import Entry from "./model/Entry";
import Calendar from "./components/Calendar";
import AddEntryForm from "./components/AddEntryForm";
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

    const menu = [
        new AppBarMenuItem(<Add/>, "Eintrag erstellen", null, "right")
    ];

    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.get<Entry[]>('http://localhost:3002/entries');
            console.log(data);
            data.forEach((entry: any, index: number) => {
                data[index].creationDate = new Date(entry.creationDate);
                data[index].dateFrom = new Date(entry.dateFrom);
                data[index].dateTo = new Date(entry.dateTo);
            });
            setEntries(data as Entry[]);
        }

        fetchData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AppBar title={"Car Plan"} titleClick={null} menu={menu}/>
            <Container>
                <Calendar/>
                {entries.map((entry: Entry) => (
                    <EntryView key={entry.id} entry={entry}/>
                ))}
                <AddEntryForm
                    entry={entries[0]}
                    onClose={() => {}}
                    open={true}
                    onSubmit={() => {}}
                />

            </Container>

        </ThemeProvider>
    );
}

export default App;