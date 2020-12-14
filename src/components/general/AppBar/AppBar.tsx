import React, {useCallback} from "react";
import {
    AppBar as MuiAppBar,
    ButtonBase, Container, IconButton,
    Menu,
    MenuItem, Toolbar,
    Typography as T,
    withStyles
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBarMenuItem from "./AppBarMenuItem";
import MutedIconButton from "./MutedIconButton";
import MutedButtonBase from "./MutedButtonBase";

const Title = withStyles({
    root: {
        flexGrow: 1,
        textAlign: "left",

        '&:hover': {
            backgroundColor: "secondary"
        }
    }
})(ButtonBase);

const Content = withStyles({
    root: {
        display: 'flex',
        // alignItems: 'center'
    }
})(Container);

const styles = (theme: any) => ({
    appBar: {
        backgroundColor: '#00000000',
    },
    title: {
        flexGrow: 1,
        justifyContent: 'flex-start',

        /*'&:hover': {
            backgroundColor: theme.palette.primary.main
        }*/
    },
})

interface Props {
    title: string;
    titleClick: (() => void) | null;
    menu: AppBarMenuItem[];
    classes: any;
}

function AppBar({title, titleClick, menu, classes}: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) =>
            setAnchorEl(event.currentTarget),
        [setAnchorEl]
    );
    const handleMenuClose = useCallback(() => setAnchorEl(null), [setAnchorEl]);

    const hidden: AppBarMenuItem[] = [];
    const right: AppBarMenuItem[] = [];
    const left: AppBarMenuItem[] = [];
    menu.forEach((item, index) => {
        switch (item.position) {
            case "hidden":
                // setHidden(prevState => ([...prevState, item]));
                hidden.push(item);
                break;
            case "right":
                // setRight(prevState =
                right.push(item);
                break;
            case "left":
                // setLeft(prevState => ([...prevState, item]));
                left.push(item);
                break;
        }
    });

    return (
        <>
            <MuiAppBar className={classes.appBar} elevation={0} position={"absolute"}>
                <Content>
                    {left.map((item, index) => (
                        item.onClick == null
                            ? (
                                <MutedIconButton
                                    key={index}
                                    edge={"start"}
                                    color={"inherit"}
                                >
                                    {item.view}
                                </MutedIconButton>)
                            : (
                                <IconButton
                                    key={index}
                                    edge={"start"}
                                    color={"inherit"}
                                    aria-label={item.label}
                                    onClick={item.onClick!}
                                >
                                    {item.view}
                                </IconButton>)
                    ))}
                    {
                        titleClick == null
                            ? (
                                <MutedButtonBase className={classes.title}>
                                    <T variant={"h6"}>{title}</T>
                                </MutedButtonBase>
                            )
                            : (
                                <ButtonBase className={classes.title} onClick={titleClick!}>
                                    <T variant={"h6"}>{title}</T>
                                </ButtonBase>
                            )
                    }

                    {right.map((item, index) => (
                        item.onClick == null
                            ? (
                                <MutedIconButton
                                    key={index}
                                    edge={"end"}
                                    color={"inherit"}
                                >
                                    {item.view}
                                </MutedIconButton>)
                            : (
                                <IconButton
                                    key={index}
                                    edge={"end"}
                                    color={"inherit"}
                                    aria-label={item.label}
                                    onClick={item.onClick!}
                                >
                                    {item.view}
                                </IconButton>)
                    ))}
                    {hidden.length ? (
                        <IconButton
                            edge={"end"}
                            color={"inherit"}
                            aria-label={"More"}
                            onClick={handleMenuOpen}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                    ) : ''}
                </Content>
            </MuiAppBar>
            {/*<Toolbar/>*/}
            <Menu
                id={"navigation-menu"}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {}
                {hidden.map((item, index) => (
                    <MenuItem
                        key={index}
                        disabled={item.onClick == null}
                        onClick={() => {
                            handleMenuClose();
                            item.onClick!();
                        }}
                    >
                        {item.view}&nbsp;
                        <T>{item.label}</T>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default withStyles(styles)(AppBar);
