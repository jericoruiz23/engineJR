import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Pie3D from '../pieChart/pieChart';
import CardActions from '@mui/material/CardActions';

export default function CardResult(props) {
    console.log(props.score, 'cardResult')
    return (
        <Card sx={{ display: 'flex', maxHeight: '90%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <CardContent sx={{ flex: 1, textAlign: 'center', padding: '15%', display: 'flex', flexDirection: 'column' }}>
                    <Typography id="modal-modal-title" variant="body3">
                        {props.score < 50 ? (
                            <>
                                <div >
                                    Porcentaje de coincidencia:
                                </div>
                                <div>
                                    <strong>{(100 - props.score * 10).toFixed(2)}/100</strong>
                                </div>
                            </>

                        ) : (
                            <>  
                                <div >Porcentaje de coinc
                                    Porcentaje de coincidencia:
                                </div>
                                <div>
                                    <strong>{(props.score * 10).toFixed(2)}/100</strong>
                                </div>
                            </>
                        )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <>
                            <div style={{paddingTop:'5%'}}>
                                Encontrado en la página:
                            </div>
                            <div>
                                <strong>{props.pageNumber}</strong>
                            </div>
                        </>

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" sx={{ textAlign: 'center', marginBottom: '4%' }} href={`https://storage.googleapis.com/documents2331/${props.name}.pdf#page=${props.pageNumber}`} target="_blank" rel="noopener noreferrer">Abrir Documento</Button>
                </CardActions>
            </Box>
            <Box sx={{ width: 250, display: 'flex', alignItems: 'center' }}> {/* División derecha */}
                {props.score < 50 ? <Pie3D score={100 - props.score * 10} /> : <Pie3D score={props.score * 10} />}
            </Box>
        </Card>

    );
}
