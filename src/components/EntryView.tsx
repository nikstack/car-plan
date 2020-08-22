import React from 'react';
import {CardActionArea, CardContent, Grid, Typography as T} from "@material-ui/core";
import Entry from "../model/Entry";
import Card from "./general/Card";
import Divider from "./general/Divider";
import DateUtils from "./general/DateUtils";

interface Props {
    entry: Entry;
    onClick: () => void;
}

function EntryView({entry, onClick}: Props) {
    console.log("Eintrag:")
    console.log(entry.dateFrom.toString());
    const dayDate = new Date(entry.dateFrom.toDateString());
    console.log(dayDate.toString());

    return (
        <Card onClick={() => {
            onClick()
        }}>
            <CardActionArea>
                <CardContent>
                    <Grid container>
                        <Grid xs={5} item>
                            <T variant={"body2"} component={"p"}>
                                {DateUtils.formatDate(entry.creationDate)}, {DateUtils.formatTime(entry.creationDate)}
                            </T>
                            <T variant={"h6"} component={"p"}>{entry.userName}</T>
                        </Grid>
                        <Grid xs={5} item>
                            <Grid container>
                                <Grid xs={5} item>
                                    <T variant={"body2"} component={"p"}>{DateUtils.formatDate(entry.dateFrom)}</T>
                                    <T variant={"h6"} component={"p"}>{DateUtils.formatTime(entry.dateFrom)}</T>
                                </Grid>
                                <Grid xs={2} item>
                                    <T variant={"body2"} component={"p"}/>
                                    <T variant={"h6"} component={"p"}>-</T>
                                </Grid>
                                <Grid xs={5} item>
                                    <T variant={"body2"} component={"p"}>{DateUtils.formatDate(entry.dateTo)}</T>
                                    <T variant={"h6"} component={"p"}>{DateUtils.formatTime(entry.dateTo)}</T>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={2} item>
                            <T variant={"body2"} component={"p"}>{Entry.priorities[entry.prio]}</T>
                            <T variant={"h6"} component={"p"}>{entry.prio + 1}</T>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <T>{entry.description}</T>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default EntryView;
