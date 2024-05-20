import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BasicTextFields() {
    return (
        <>
            <Stack direction="row" spacing={2}>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '75ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Digite el texto a buscar"  variant="outlined" />
                </Box>
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '20ch' },
                    }}
                    noValidate
                    autoComplete="off">

                    <Button variant="outlined">Buscar</Button>
                </Box>
            </Stack>
        </>
    );
}
