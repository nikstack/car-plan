import React from 'react';
import {CardContent, Grid, Typography as T} from "@material-ui/core";
import Entry from "../model/Entry";
import Card from "./general/Card";
import Divider from "./general/Divider";

interface Props {
    entry: Entry;
}

function EntryView({entry}: Props) {
    return (
        <Card>
            <CardContent>
                <Grid container>
                    <Grid xs={5} item>
                        <T variant={"body2"} component={"p"}>{entry.creationDate.getDate()}</T>
                        <T variant={"h6"} component={"p"}>{entry.userName}</T>
                    </Grid>
                    <Grid xs={5} item>
                        <Grid container>
                            <Grid xs={5} item>
                                <T variant={"body2"} component={"p"}>{entry.dateFrom.getDate()}</T>
                                <T variant={"h6"} component={"p"}>{entry.dateFrom.getDate()}</T>
                            </Grid>
                            <Grid xs={2} item>
                                <T variant={"body2"} component={"p"} />
                                <T variant={"h6"} component={"p"}>-</T>
                            </Grid>
                            <Grid xs={5} item>
                                <T variant={"body2"} component={"p"}>{entry.dateTo.getDate()}</T>
                                <T variant={"h6"} component={"p"}>{entry.dateTo.getDate()}</T>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={2} item>
                        <T variant={"body2"} component={"p"}>{entry.getPrioDescription()}</T>
                        <T variant={"h6"} component={"p"}>{entry.prio}</T>
                    </Grid>
                </Grid>
                <Divider />
                <T>{entry.description}</T>
            </CardContent>
        </Card>
    )
}

export default EntryView;
