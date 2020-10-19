import React from 'react';
import {CardActionArea, CardContent, Grid, Typography as T} from "@material-ui/core";
import Entry from "../model/Entry";
import Card from "./general/Card";
import Divider from "./general/Divider";
import DateUtils from "./general/DateUtils";
import GP from "../GP";

interface Props {
    entry: Entry;
    onClick: () => void;
}

function EntryView({entry, onClick}: Props) {
    const rightUser = GP.getUser() === entry.userName;

    const cardContent = (
        <CardContent>
            <Grid container>
                <Grid xs={4} item>
                    <T variant={"body2"} component={"p"}>
                        {DateUtils.formatDate(entry.creationDate)}, {DateUtils.formatTime(entry.creationDate)}
                    </T>
                    <T variant={"h6"} component={"p"}>{entry.userName}</T>
                </Grid>
                <Grid xs={6} item>
                    <Grid container>
                        <Grid xs={5} item>
                            <T variant={"body2"} component={"p"} align={"center"}>{DateUtils.formatDate(entry.dateFrom)}</T>
                            <T variant={"h6"} component={"p"} align={"center"}>{DateUtils.formatTime(entry.dateFrom)}</T>
                        </Grid>
                        <Grid xs={2} item>
                            <T variant={"body2"} component={"p"} align={"center"}>&nbsp;</T>
                            <T variant={"h6"} component={"p"} align={"center"}>-</T>
                        </Grid>
                        <Grid xs={5} item>
                            <T variant={"body2"} component={"p"} align={"center"}>{DateUtils.formatDate(entry.dateTo)}</T>
                            <T variant={"h6"} component={"p"} align={"center"}>{DateUtils.formatTime(entry.dateTo)}</T>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={2} item>
                    <T variant={"body2"} component={"p"} align={"center"}>{Entry.priorities[entry.prio]}</T>
                    <T variant={"h6"} component={"p"} align={"center"}>{entry.prio + 1}</T>
                </Grid>
            </Grid>
            <Divider/>
            <T>{entry.description}</T>
        </CardContent>
    );

    return (
        <Card onClick={() => {
            if (rightUser) {
                onClick();
            }
        }}>
            {rightUser ? <CardActionArea>{cardContent}</CardActionArea> : cardContent}
        </Card>
    )
}

export default EntryView;
