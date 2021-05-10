import React, { useState, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import {
    Box,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Paper
} from '@material-ui/core';
import axios from 'axios';
import { BERLIN, HANNOVER, HAMBURG, TRIER, STUTTGART } from './city_types';



const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: grey[50],
        },
    },
});

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'block',
        '@media (min-width:600px)': {
            display: 'block',
        },
        [theme.breakpoints.up('md')]: {
            flexGrow: 1,
            display: 'flex',
        },
    },
    box1: {
        width: '90%',
        height: '300px',
    },
    box2: {
        width: '90%',
        height: '400px',
    },
    div1: {
        display: "flex",
        justifyContent: "center",
    },
    div2: {
        display: "flex",
        justifyContent: "center",
        marginTop: '1%'
    },
    table: {
        marginTop: '2%',
        maxWidth: '50%',
        marginLeft: '5%',
    },
}));



export const Search: FC = () => {

    const classes = useStyles();
    const [dateRange1, setDateRange1] = useState<string>('');
    const [dateRange2, setDateRange2] = useState<string>('');
    const [isloading , setIsloading] = useState<boolean>(false);
    const [pricesForDateRange1, setDateRangeOnePrice] = useState<any>([]);
    const [pricesForDateRange2, setDateRangeTwoPrice] = useState<any>([]);
    const cities = [BERLIN, HANNOVER, HAMBURG, TRIER, STUTTGART];

    const searchHotel = () => {
        setIsloading(true);

        axios.post('http://localhost:8080/search/hotel', {
            dateRange1,
            dateRange2
        })
            .then((response) => {
                let { dateRange1, dateRange2 } = response.data.data;
                setDateRangeOnePrice(dateRange1);
                setDateRangeTwoPrice(dateRange2);
                setIsloading(false);

            });
    }
    return (
        <React.Fragment>
                <div className={classes.div1} >
                    <Box border={1} className={classes.box1}>
                        <Typography style={{ borderBottom: '1px solid black' }}>Search</Typography>

                        <div style={{ display: 'flex', marginTop: '1%', marginLeft: '1%' }}>
                            <Typography>Cities:</Typography>
                            <Typography style={{ marginLeft: '5%' }}>Berlin</Typography>
                            <Typography style={{ marginLeft: '2%' }}>Hannover</Typography>
                            <Typography style={{ marginLeft: '2%' }}>Hamburg</Typography>
                            <Typography style={{ marginLeft: '2%' }}>Trier</Typography>
                            <Typography style={{ marginLeft: '2%' }}>Stuttgart</Typography>

                        </div>

                        <div style={{ display: 'flex', marginTop: '2%', marginLeft: '1%' }}>
                            <Typography style={{ marginTop: '1%' }}>Data Range#1</Typography>
                            <TextField onChange={(e) => setDateRange1(e.target.value)} id="outlined-basic" label="from-to" placeholder="2021-07-22 - 2021-07-24" variant="outlined" style={{ marginLeft: '2%' }} />
                        </div>

                        <div style={{ display: 'flex', marginTop: '1%', marginLeft: '1%' }}>
                            <Typography style={{ marginTop: '1%' }}>Data Range#2</Typography>
                            <TextField onChange={(e) => setDateRange2(e.target.value)} id="outlined-basic" label="from-to" placeholder="2021-07-22 - 2021-07-24" variant="outlined" style={{ marginLeft: '2%' }} />
                        </div>

                        <Button variant="contained" onClick={() => searchHotel()} color="primary" style={{ padding: "11px 88px", marginTop: '1%', marginLeft: '10.3%' }}  >
                        <Typography color="secondary">{isloading ? 'Loading...':'Search'}</Typography>
                        </Button>
                    </Box>
                </div>

                <div className={classes.div2} >
                    <Box border={1} className={classes.box2}>
                        <Typography style={{ borderBottom: '1px solid black' }}>Search</Typography>

                        <TableContainer component={Paper} elevation={0}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ borderBottom: "none", fontWeight: 'bold' }}>City</TableCell>
                                        <TableCell style={{ borderBottom: "none", fontWeight: 'bold' }}>DataRange#1</TableCell>
                                        <TableCell style={{ borderBottom: "none", fontWeight: 'bold' }}>DataRange#2</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {cities?.map((row: any, index: number) => (
                                        <TableRow key={row.name} >
                                            <TableCell component="th" scope="row">
                                                {row}
                                            </TableCell>
                                            <TableCell style={{ borderBottom: "none" }}>{pricesForDateRange1.minumumPriceHotel?.[index].minPrice}</TableCell>
                                            <TableCell style={{ borderBottom: "none" }}>{pricesForDateRange2.minumumPriceHotel?.[index].minPrice}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                    </Box>
                </div>
                </React.Fragment>
    );
};

export default Search;

