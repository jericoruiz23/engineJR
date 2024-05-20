import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import PieCard from '../cardResult/cardResult';
import Typography from '@mui/material/Typography';

const BasicModal = ({ documentName, pageNumbers, result, onClose }) => {
    const [pageNumber, setPageNumber] = useState(pageNumbers || 1);

    useEffect(() => {
        console.log(result * 10, 'puntaje');
    }, [pageNumber, result]);

    const handleClose = () => {
        onClose();
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para el modal
                zIndex: 9999, // Asegura que el modal esté en la parte superior
            }}
            onClick={handleClose}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '600px', // Ancho máximo del modal para evitar que se vuelva demasiado grande en pantallas grandes
                    backgroundColor: '#fff', // Fondo blanco del modal
                    borderRadius: '16px', // Bordes redondeados
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', // Sombra suave
                    padding: '20px', // Espaciado interno
                    
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Evita que el clic en el contenido del modal se propague al contenedor principal */}
                <Typography id="modal-modal-title" variant="h4.5" component="h2" sx={{ textAlign: 'center', paddingBottom:'2%' }}>
                        {documentName}
                </Typography>
                <PieCard name={documentName} pageNumber={pageNumber} score={result} />
            </Box>
        </Box>
    );
};

export default BasicModal;
