import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('CMB', 159, 6.0, ),
    createData('UATOM', 237, 9.0, ),
    createData('IBC/jfasldadfasdfasd', 262, 16.0, ),
];


const {SigningCosmosClient} = require("@cosmjs/launchpad");
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbarTitle: {
        flex: 1
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.7)'
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0
        }
    },
    card: {
        display: 'flex'
    },
    cardDetails: {
        flex: 1
    },
    cardMedia: {
        width: 160
    },
    btns: {
        '& > *': {
            marginRight: theme.spacing(1),
        },
    },
}))

const Index = () => {


    const [address, setAddress] = useState("");

    useEffect(async () => {
        if (!window.getOfflineSigner || !window.keplr) {
            alert("Please install keplr extension");//
        } else {
            if (window.keplr.experimentalSuggestChain) {
                try {

                    await window.keplr.experimentalSuggestChain({
                        // Chain-id of the Cosmos SDK chain.
                        chainId: "cosmoshub-3",
                        // The name of the chain to be displayed to the user.
                        chainName: "Cosmos",
                        // RPC endpoint of the chain.
                        rpc: "https://node-cosmoshub-3.keplr.app/rpc",
                        // REST endpoint of the chain.
                        rest: "https://node-cosmoshub-3.keplr.app/rest",
                        // Staking coin information
                        stakeCurrency: {
                            // Coin denomination to be displayed to the user.
                            coinDenom: "ATOM",
                            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                            coinMinimalDenom: "uatom",
                            // # of decimal points to convert minimal denomination to user-facing denomination.
                            coinDecimals: 6,
                            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                            // coinGeckoId: ""
                        },

                        bip44: {
                            coinType: 118,
                        },

                        bech32Config: {
                            bech32PrefixAccAddr: "cosmos",
                            bech32PrefixAccPub: "cosmospub",
                            bech32PrefixValAddr: "cosmosvaloper",
                            bech32PrefixValPub: "cosmosvaloperpub",
                            bech32PrefixConsAddr: "cosmosvalcons",
                            bech32PrefixConsPub: "cosmosvalconspub"
                        },
                        // List of all coin/tokens used in this chain.
                        currencies: [{
                            // Coin denomination to be displayed to the user.
                            coinDenom: "ATOM",
                            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                            coinMinimalDenom: "uatom",
                            // # of decimal points to convert minimal denomination to user-facing denomination.
                            coinDecimals: 6,
                            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                            // coinGeckoId: ""
                        }],
                        // List of coin/tokens used as a fee token in this chain.
                        feeCurrencies: [{
                            coinDenom: "ATOM",
                            coinMinimalDenom: "uatom",
                            coinDecimals: 6,
                        }],

                        coinType: 118,
                        gasPriceStep: {
                            low: 0.01,
                            average: 0.025,
                            high: 0.04
                        }
                    });

                    const chainId = "cosmoshub-3";
                    await window.keplr.enable(chainId);
                    const offlineSigner = window.getOfflineSigner(chainId);
                    const accounts = await offlineSigner.getAccounts();
                    console.log(accounts)
                    const cosmJS = new SigningCosmosClient(
                        "https://node-cosmoshub-3.keplr.app/rest",
                        accounts[0].address,
                        offlineSigner,
                    );

                    setAddress(accounts[0].address);

                } catch (err) {
                    alert("Failed to suggest the chain");
                    console.log(err)
                }
            } else {
                alert("Please use the recent version of keplr extension");
            }
        }

    }, []);

    const classes = useStyles()
    return <>
        <CssBaseline/>
        <Container maxWidth="lg">
            <Toolbar className={classes.toolbar}>
                <Typography
                    component="h1"
                    variant="h2"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    Microwaves Chain Dashboard
                </Typography>
            </Toolbar>

            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Paper elevation={10}>
                            <Box padding={2}>
                                <Typography variant="h4" color="inherit" gutterBottom>
                                    Bank Total
                                </Typography>

                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Denom</TableCell>
                                                <TableCell align="right">Readable</TableCell>
                                                <TableCell align="right">Amount</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.calories}</TableCell>
                                                    <TableCell align="right">{row.fat}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Box>
                        </Paper>
                    </div>
                </Grid>

                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Paper elevation={10}>
                            <Box padding={2}>
                                <Typography variant="h4" color="inherit" gutterBottom>
                                    Pool State
                                </Typography>

                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Denom</TableCell>
                                                <TableCell align="right">Readable</TableCell>
                                                <TableCell align="right">Amount</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.calories}</TableCell>
                                                    <TableCell align="right">{row.fat}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Box>
                        </Paper>
                    </div>
                </Grid>

                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Paper elevation={10}>
                            <Box padding={2}>
                                <Typography variant="h4" color="inherit" gutterBottom>
                                    Account
                                </Typography>
                                <Typography component="body1" color="inherit" gutterBottom>
                                    {address && <span>{address}</span>}
                                    {!address && <span>Wallet not connected</span>}
                                </Typography>
                            </Box>
                        </Paper>
                    </div>
                </Grid>

                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Paper elevation={10}>
                            <Box padding={2}>
                                <Typography variant="h4" color="inherit" gutterBottom>
                                    Actions
                                </Typography>
                                <div className={classes.btns}>
                                    <Button variant="contained" color="primary">
                                        Invest to pool
                                    </Button>
                                    <Button variant="contained" color="primary">
                                        Take from pool
                                    </Button>
                                </div>
                            </Box>
                        </Paper>
                    </div>
                </Grid>
            </Grid>

        </Container>
    </>
}

export default Index;