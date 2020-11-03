import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import {api as API_URL} from "../../config.json"

function createData(name: string, calories: string, fat: string) {
    return {name, calories, fat};
}

const rows = [
    createData('CMB', "159", "6.0",),
    createData('UATOM', "237", "9.0",),
    createData('IBC/jfasldadfasdfasd', "262", "16.0",),
];


const BankTotal = () => {

    const [denoms, setDenoms] = useState([]);
    useEffect( () => {
        (async ()=>{
            const data: any = await Axios.get(API_URL+"/bank/total")
            setDenoms(data.data.result);
        })();
    }, []);

    return <Paper elevation={10}>
        <Box padding={2}>
            <Typography variant="h4" color="inherit" gutterBottom>
                Bank Total
            </Typography>

            <TableContainer component={Paper}>
                <Table className={""} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Denom</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {denoms.map((row: any) => (
                            <TableRow key={row.denom}>
                                <TableCell component="th" scope="row">
                                    {row.denom}
                                </TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    </Paper>
}

export default BankTotal;