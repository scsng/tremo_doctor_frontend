import React, {useState} from 'react';
import {Autocomplete, AutocompleteOption, Theme, Tooltip} from "@mui/joy";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import {useKeyPress} from "../../hooks/shortcut_utils";
import WebIcon from '@mui/icons-material/Web';
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import {NavLink, useNavigate} from "react-router-dom";
import {getPages, Page} from "../../routes/pages";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Button from "@mui/joy/Button";


function pageFilter(page: Page, searchWord: string): boolean {
    if (!page.hasParameters && page.searchable) {
        if (searchWord.length > 1) {
            if (page.title.toLowerCase().includes(searchWord.toLowerCase()))
                return true;
        } else {
            if (page.title.toLowerCase().startsWith(searchWord.toLowerCase()))
                return true;
        }
    }

    return false;
}

function collectPages(searchWord?: string): Page[] {
    let pages: Page[] = [];
    if (!searchWord || searchWord.length === 0)
        return [];
    getPages().filter(page => pageFilter(page, searchWord)).forEach(page => {
        pages.push(page);
    });
    getPages().filter(page => page.subItems && page.subItems.length > 0).forEach(page => {
            page.subItems?.filter(child => pageFilter(child, searchWord)).forEach(child => {
                pages.push(child);
            })
        }
    );
    return pages;
}

const styles = {
    searchChip: (theme: Theme) => ({
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    }),
    focusButton: (theme: Theme) => ({
        pb: '0.2em',
        height: '9em',
        width: '100%',
        opacity: .6,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
        position: 'relative',
        top: '100px',
        zIndex: 499,
        borderRadius: '20px',
    }),
    autocorretion: (theme: Theme) => ({
        width: '90%',
        maxWidth: '400px',
        alignSelf: 'center',

        zIndex: 500,

    }),
    searchBox: (theme: Theme) => ({
        mt: 2,
        mb: 2,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        [theme.breakpoints.down('md')]: {
            mt: -11,
            mb: 10,
        }
    }),
    openButtonInfo: {
        display: 'flex',
        alignItems: 'end',
        height: '100%',
        opacity: .6,
        flexDirection: 'row',
    }
}


export default function GlobalSearch() {
    const navigate = useNavigate();

    const handleInputFocus = () => {
        inputRef.current?.focus();
    };
    const onKeyPress = (event: any) => {
        handleInputFocus();
    };


    const inputRef = React.useRef<HTMLInputElement | null>(null);

    useKeyPress(['Control', 'q'], onKeyPress, "combination");
    useKeyPress(['Control', '/'], onKeyPress, "combination");
    const [options, setOptions] = React.useState<readonly Page[]>([]);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [open, setOpen] = useState(false);
    const closePopper = () => setOpen(false);
    const openPopper = () => setOpen(true);

    return (
        <Box sx={styles.searchBox}>
            <Button variant="soft" color="neutral" sx={styles.focusButton} onClick={handleInputFocus}>
                <Box sx={styles.openButtonInfo}>
                    <Typography color="neutral" fontSize='sm' sx={{
                        alignSelf: 'flex-end',
                    }}>
                        Click on that to search!
                    </Typography>
                </Box>
            </Button>


            <Autocomplete
                getOptionLabel={(option) => typeof (option) == 'string' ? "" : option.title}
                disableClearable
                disableCloseOnSelect={false}
                inputValue={inputValue}
                color="neutral"
                open={open}
                slotProps={{input: {ref: inputRef}}}
                options={options}
                onInputChange={(event, value) => {
                    setOptions(collectPages(value));
                    setInputValue(value);
                    if (value.length > 0)
                        openPopper();
                    else closePopper();
                }}
                size="lg"
                freeSolo
                variant="soft"
                placeholder="Global search..."
                renderOption={(props, option, {inputValue}) => {
                    const matches = match(option.title, inputValue, {insideWords: true});
                    const parts = parse(option.title, matches);
                    return (
                        <NavLink to={option.getFullRoute()} style={{textDecoration: 'none'}}>
                            <AutocompleteOption {...props}

                                                onClick={() => {
                                                    navigate(option.getFullRoute());
                                                    setOpen(false);
                                                    setInputValue('');
                                                }}>
                                <ListItemDecorator>
                                    <WebIcon/>
                                </ListItemDecorator>
                                <ListItemContent sx={{fontSize: 'sm'}}>
                                    <Box display="flex" alignItems="center">
                                        {option.title === inputValue
                                            ? option.title
                                            : parts.map((part, index) => (
                                                <Typography
                                                    key={index}
                                                    {...(part.highlight && {
                                                        variant: 'soft',
                                                        color: 'primary',
                                                        fontWeight: 'lg',
                                                        px: '1px',
                                                        mx: '.3px',
                                                    })}
                                                >
                                                    {part.text}
                                                </Typography>
                                            ))}
                                    </Box>
                                    <Breadcrumbs
                                        size="sm"
                                        aria-label="breadcrumbs"
                                        separator={<ChevronRightRoundedIcon/>}
                                        sx={{
                                            pl: 0, "--Breadcrumbs-gap": ".01px"
                                        }}
                                    >
                                        <HomeRoundedIcon/>
                                        {option.getPathElements().map(title => <Typography
                                            level="body-xs"> {title} </Typography>)}

                                    </Breadcrumbs>

                                </ListItemContent>
                            </AutocompleteOption>
                        </NavLink>)
                }}
                sx={styles.autocorretion}
                endDecorator={<Box sx={styles.searchChip}>

                    <Tooltip arrow variant="outlined"
                             title="Press Ctrl + q or Ctrl + / anywhere in the app to search for anything"
                             placement='right'>
                        <Chip variant="outlined"
                              size='sm'
                              sx={{
                                  px: 1.5, py: .7,
                              }}>
                            Ctrl + Q | Ctrl + /
                        </Chip>
                    </Tooltip>

                </Box>}
            />
        </Box>
    )
}
