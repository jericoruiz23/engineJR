import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './styles.css';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Activador from '../Components/toggleButton/toggleButton'
import { configBACK, configELASTIC } from '../Services/ip';
import { Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [documentName, setDocumentName] = useState('');
    const [authorityName, setAuthorityName] = useState('');
    const [dateVigency, setDateVigency] = useState('');
    const [dateDerog, setDateDerog] = useState('');
    const [dateReform, setDateReform] = useState('');
    const [token, setToken] = useState('');
    const [activo, setActivo] = useState(false);
    const [age, setAge] = useState('');
    const [catalogue, setCatalogue] = useState([]);
    const [docType, setDocType] = useState([]);
    const [dataDocType, setDataDocType] = useState([]);
    const [authType, setAuthType] = useState([]);

    useEffect(() => {
        // Recuperar el token del localStorage al cargar el componente
        const token = localStorage.getItem('token');
        setToken(token);

        // Llamar a la función getCatalogue para obtener los datos del catálogo
        getCatalogue()
            .then(catalogueData => {
                setCatalogue(catalogueData);
            })
            .catch(error => {
                console.error('Error al obtener el catálogo:', error);
            });

    }, []);

    const handleToggle = () => {
        setActivo(!activo);
        console.log(activo);
    };

    const onDrop = async (acceptedFiles) => {

        const selectedFile = acceptedFiles[0];
        if (selectedFile.type !== 'application/pdf') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Solo se permiten archivos PDF',
            });
            return;
        }
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Data = reader.result.split(',')[1]; // Obtener la parte de datos base64
            const dataPDF = {
                name: documentName,
                pdfBase64: base64Data
            };
            setFile(selectedFile);
            await sendDataPDF(dataPDF);
            getItems(selectedFile);
        };
        reader.readAsDataURL(selectedFile);
    };

    const addDocument = async (pageNumber, content) => {
        try {
            const requestBody = {
                name: documentName,
                pageNumber: pageNumber,
                content: content
            };
            const response = await fetch(`http://${configELASTIC}/documents/_doc`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error('Error al agregar eeee el documento');
            }
            const responseData = await response.json();
            console.log('Documento eeeee agregado exitosamente:', responseData);
        } catch (error) {
            console.error('Error al agregar eeee el documento:', error);
        }
    };

    const sendToApi = async (data) => {
        try {
            setLoading(true);
            const response = await fetch(`http://${configBACK}/api/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al enviar datos a la API');
            }
            const result = await response.json();
            console.log('Respuesta de la API:', result);
        } catch (error) {
            console.error('Error al enviar datos a la API:', error);
        } finally {
            setLoading(false);
        }
    };

    const sendDataPDF = async (data) => {
        try {
            const response = await fetch(`http://${configBACK}/api/upload/uploadGCS`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al enviar base64 a la API');
            }
            const result = await response.json();
            console.log('Respuesta de la API:', result);
        } catch (error) {
            console.error('Error al enviar datos base 64 a la API:', error);
        }

    }

    const getItems = async (pdfFile) => {
        if (!pdfFile) {
            console.log('No se ha seleccionado ningún archivo PDF.');
            return;
        }
        console.log(documentName, docType, age, dateVigency);
        if (!documentName || !docType || !age || !dateVigency) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, completa los campos necesarios.',
            });
            return;
        }

        setLoading(true);
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdfData = new Uint8Array(arrayBuffer);
        let lastPageContent = ''; // Variable para almacenar el contenido de la última página

        try {
            const loadingTask = pdfjs.getDocument({ data: pdfData });
            const pdf = await loadingTask.promise;

            const numPages = pdf.numPages;

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent({ normalizeWhitespace: true });
                const pageText = textContent.items.map((item) => item.str).join('').trim();
                console.log(`Contenido de la página ${i}:`, pageText);
                try {
                    if (pageText) {
                        await addDocument(i, pageText);
                        lastPageContent = pageText; // Almacena el contenido de la última página
                    } else {
                        console.log(`El contenido de la página ${i} está vacío.`);
                        Swal.fire({
                            icon: 'warning',
                            title: `La página ${i} está vacía!`,
                            showConfirmButton: true,
                            confirmButtonColor: '#3085d6',
                        });
                        throw new Error();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            // Enviar los datos a la API solo con la última página
            const dataToSend = {
                name: documentName,
                content: lastPageContent, // Utiliza el contenido de la última página
                pageNumber: numPages, // Utiliza el número de la última página
                authorityName: docType,
                documentType: age,
                dateVigency: dateVigency,
                dateDerog: dateDerog,
                dateReform: dateReform,
                state: activo,
            };
            console.log(dataToSend, 'data');
            await sendToApi(dataToSend);
        } catch (error) {
            console.error('Error al cargar el PDF:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCatalogue = async () => {
        try {
            const response = await fetch(`http://${configBACK}/api/catalog/getCatalog`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Data from server:', data);
            setCatalogue(data); // Asigna los datos al estado catalogue
            setAuthType(data[0].authorityName)
            setDataDocType(data[0].documentType)
        } catch (error) {
            console.error('Error:', error);
            setCatalogue([]); // O cualquier otro valor predeterminado
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'application/pdf',

    });
    <h5 style={{ color: 'red' }}></h5>

    return (
        <div elevation={3} style={{ padding: '2%' }}>
            <h2>Subir Archivo PDF</h2>
            <div style={{ width: '90%' }}>
                <h5>
                    *Por favor, asegúrate de completar: <span style={{ color: 'red' }}>Denominación, Autoridad Emisora, Tipo de documento y Fecha de Vigencia OBLIGATORIAMENTE</span> antes de cargar el archivo. Una vez que hayas subido el archivo, el proceso se realizará automáticamente.
                </h5>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="outlined-basic"
                        label="Denominación"
                        variant="outlined"
                        fullWidth
                        value={documentName}
                        onChange={(event) => setDocumentName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Tooltip title="Estado del documento (Derogado/Vigente)" placement="right-start">
                        <div onClick={handleToggle} style={{ width: '61.68px', height: '56px', paddingTop: "12px" }}>
                            <Activador activo={activo} />
                        </div>
                    </Tooltip>
                </Grid>
                <Grid item xs={10} sm={5}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={authType}
                        fullWidth
                        onChange={(e, newValue) => setDocType(newValue)}
                        renderInput={(params) => <TextField {...params} label="Autoridad Emisora" />}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={dataDocType}
                        fullWidth
                        onChange={(event, newValue) => setAge(newValue)}
                        renderInput={(params) => <TextField {...params} label="Tipo de Documento" />}
                    />
                </Grid>
                <Grid item xs={12} sm={4} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div > {/* Aplica el ancho máximo aquí */}
                            <DatePicker
                                label="Fecha Vigencia"
                                // value={dateVigency}
                                fullWidth
                                format="MM/DD/YYYY"
                                onChange={(newDate) => setDateVigency(newDate)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4} style={{ gap:'1%' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha Derogación"
                            // value={dateDerog}
                            fullWidth
                            format="MM/DD/YYYY"
                            onChange={(newDate) => setDateDerog(newDate)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    
                </Grid>
                <Grid item xs={12} sm={4} style={{ gap:'1%' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de Reforma"
                            // value={dateReform}
                            fullWidth
                            format="MM/DD/YYYY"
                            onChange={(newDate) => setDateReform(newDate)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <div {...getRootProps()} className="dropzone" style={{ width: '100%' }}>
                        <input {...getInputProps()} />
                        <p>{file ? `Archivo seleccionado: ${file.name}` : 'Arrastra y suelta un archivo PDF aquí, o haz clic para seleccionar uno'}</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default FileUpload;
