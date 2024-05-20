import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditModal from '../../Components/editModal/editModal'
import Modal from '@mui/material/Modal';
import { configBACK, configELASTIC } from '../../Services/ip';
import animationData from '../../Services/lottieNoData.json'
import Lottie from 'lottie-react-web';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [score, setScore] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [datosPDF, setDatosPDF] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [pageNumbers, setPageNumber] = useState('');

    const handleOpen = async (documentName, pageNumber) => {
        setOpen(true);
        setSelectedDocument(documentName);
        setPageNumber(pageNumber);

        // Encuentra el puntaje del documento seleccionado en los resultados
        const selectedResult = results.find(result => result._source.name === documentName);
        if (selectedResult) {
            // Envía solo el puntaje del documento seleccionado al EditModal
            let aux = selectedResult._score
            setScore(selectedResult._score);
            // console.log(selectedResult._score.toString())
        }
    };
    const handleClose = () => {
        setPageNumber('')
        setOpen(false)

    };

    useEffect(() => {
        console.log(datosPDF)
    }, [datosPDF, score])

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (query.trim() !== '') {
                handleSearch();
            }
        }, 300);

        return () => clearTimeout(timerId);
    }, [query]);

    const searchQuery = {
        query: {
            bool: {
                must: {
                    match: {
                        content: {
                            query: query,
                            fuzziness: "AUTO"
                        }
                    }
                }
            }
        },
        sort: [
            {
                _score: {
                    order: "desc"
                }
            }
        ]
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '50%', // Usando porcentaje para el ancho de la tarjeta
        backgroundColor: 'transparent', // Establecer el fondo transparente
        maxHeight: '80%',
        boxShadow: '0.9',
        borderRadius: '10%',
        boxShadow: 24,
        p: 4,
    };


    const handleSearch = async () => {
        try {
            setLoading(true);

            const response = await fetch(`http://${configELASTIC}/documents/_search`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchQuery),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud al servidor');
            }

            const data = await response.json();
            console.log(data.hits.hits, 'puntaje');
            setResults(data.hits.hits);
            setScore(data.hits.hits)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evitar el comportamiento predeterminado de enviar el formulario al presionar Enter
        }
    };

    const highlightSearchTerm = (text) => {
        if (!text) {
            return ''; // Si text es undefined o null, devuelve una cadena vacía
        }
        if (!query || query == undefined) {
            return text; // Devuelve el texto sin resaltar si el término de búsqueda es undefined o vacío
        }
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, (match) => `<span style="text-decoration: underline; color: red; background-color: yellow;">${match}</span>`);
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '60%' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic"
                    label="Buscar"
                    variant="outlined"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterKeyPress}
                />
            </Box>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <HashLoader color="#36d7b7" />
                </div>
            ) : (
                <div>
                    <h2>Resultados:</h2>
                    {open ?
                        <div >
                            <Modal

                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box >
                                    <EditModal sx={style} documentName={selectedDocument} pageNumbers={pageNumbers} result={score} onClose={handleClose} />
                                </Box>

                            </Modal>
                        </div> :
                        ''
                    }
                    {results.length > 0 ? (
                        <ul>
                            {results.map((result) => (
                                <>
                                    <Card key={result._id} sx={{ marginBottom: '16px' }}>
                                        <CardContent sx={{ position: 'relative' }} onClick={() => handleOpen(result._source.name, result._source.pageNumber)}>
                                            <Typography variant="h6" component="div">
                                                <strong>DOCUMENTO:</strong>{' '}
                                                <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(result._source.name) }} />
                                            </Typography>
                                            {/* <Typography variant="body2" color="text.secondary">
                                                <strong># PÁGINA:</strong> {result._source.pageNumber}
                                            </Typography> */}
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>CONTENIDO:</strong>{' '}
                                                <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(result._source.content) }} />
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </>
                            ))}
                        </ul>
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                <div style={{ width: '20%', height: '20%' }}>
                                    <Lottie
                                        options={{
                                            animationData: animationData, // Pasar el archivo de animación importado
                                        }}
                                    />
                                    <p>No se encontraron resultados.</p>
                                </div>
                            </div>

                        </>

                    )}

                </div>


            )}
        </div>
    );
};

export default SearchComponent;

