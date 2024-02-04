import * as React from 'react';
import {CssVarsProvider} from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import logo from './assets/tremo_icon.png';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GlobalSearch from "./components/search/GlobalSearch";
import {Routing} from "./routes/routing";


function App() {


    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline/>
            <Box sx={{display: 'flex', minHeight: '100dvh'}}>
                <Header/>
                <Sidebar/>

                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        px: {xs: 2, md: 6},
                        pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3,
                        },
                        pb: {xs: 2, sm: 2, md: 3},
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                    }}
                >
                    <GlobalSearch/>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Breadcrumbs
                            size="sm"
                            aria-label="breadcrumbs"
                            separator={<ChevronRightRoundedIcon/>}
                            sx={{pl: 0}}
                        >

                            <Link
                                underline="none"
                                color="neutral"
                                href="#some-link"
                                aria-label="Home"
                            >
                                <HomeRoundedIcon/>
                            </Link>
                            <Link
                                underline="hover"
                                color="neutral"
                                href="#some-link"
                                fontSize={12}
                                fontWeight={500}
                            >
                                Dashboard
                            </Link>
                            <Typography color="primary" fontWeight={500} fontSize={12}>
                                Orders
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            gap: 1,
                            flexDirection: {xs: 'column', sm: 'row'},
                            alignItems: {xs: 'start', sm: 'center'},
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography level="h2" component="h1">
                            Orders
                        </Typography>
                        <Box  sx={{mr: 2, borderRadius: '20px', px: 1,pt: 1.5,pb: 1.1}}>
                            <img src={logo} style={{height: '30px'}} alt="avatar"/>
                        </Box>
                    </Box>
                    <Routing/>

                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default App;
