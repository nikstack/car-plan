import React from 'react';
import AppBarMenuItem from "./components/general/AppBar/AppBarMenuItem";
import {Add} from "@material-ui/icons";
import AppBar from "./components/general/AppBar/AppBar";
import {Box, Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import EntryView from "./components/EntryView";
import Entry from "./model/Entry";
import Calendar from "./components/Calendar";

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

    const entries = [
        new Entry(1, "Maren", new Date(), new Date(), new Date(), 2, "Muss zum Arzt"),
        new Entry(1, "Maren", new Date(), new Date(), new Date(), 2, "Muss zum Arzt"),
        new Entry(1, "Maren", new Date(), new Date(), new Date(), 2, "Muss zum Arzt"),
        new Entry(1, "Maren", new Date(), new Date(), new Date(), 2, "Muss zum Arzt"),
    ]
    return (
        <ThemeProvider theme={theme}>
            <AppBar title={"Car Plan"} titleClick={null} menu={menu}/>
            <Container>
                <Calendar />
                {entries.map((entry: Entry) => (
                    <EntryView key={entry.id} entry={entry}/>
                ))}
            </Container>

        </ThemeProvider>
    );
}

export default App;