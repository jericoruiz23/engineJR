import { TableContainer } from '@mui/material';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { FcCancel, FcCheckmark } from "react-icons/fc";
import EditButton from '../../Components/editButton/editButton';
import { configBACK } from '../../Services/ip';
import Title from './title';
import Tooltip from '@mui/material/Tooltip';




function preventDefault(event) {
    event.preventDefault();
}

function truncateContent(content) {
    const words = content.split(' ');
    const truncatedContent = words.slice(0, 10).join(' ');
    return truncatedContent;
}

const ITEMS_PER_PAGE = 10; // Número de elementos por página

const paginationStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
};

const linkStyles = {
    margin: '0 8px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#1976D2',
    fontWeight: 'bold',
};
export default function Orders() {
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [documentsForPage, setDocumentsForPage] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Realizar la solicitud GET a la API
        fetch(`http://${configBACK}/api/documents`)
            .then(response => response.json())
            .then(data => {
                // Objeto auxiliar para realizar un seguimiento del pageNumber más grande para cada name
                const maxPageNumbers = {};

                // Filtrar los documentos para obtener el pageNumber más grande para cada name
                data.forEach(document => {
                    const { name, pageNumber } = document;
                    if (!maxPageNumbers[name] || pageNumber > maxPageNumbers[name]) {
                        maxPageNumbers[name] = pageNumber;
                    }
                });

                // Filtrar los documentos para mantener solo aquellos con el pageNumber más grande para cada name
                const filteredDocuments = data.filter(document => {
                    const { name, pageNumber } = document;
                    return pageNumber === maxPageNumbers[name];
                });

                // Actualizar el estado con todos los documentos
                setDocuments(filteredDocuments);
                // Calcular el total de páginas
                setTotalPages(Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE));
            })
            .catch(error => {
                console.error('Error al obtener datos de la API:', error);
            });
    }, []);

    useEffect(() => {
        // Calcular el índice de inicio y final para la paginación
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        // Filtrar los documentos para la página actual
        const documentsForPage = documents.slice(startIndex, endIndex);

        // Actualizar el estado con los documentos para la página actual
        setDocumentsForPage(documentsForPage);
    }, [currentPage, documents]);

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <Title>Contenido</Title>
            <TableContainer >
                <Table size="small" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Título</TableCell>
                            <TableCell align="center">#Pág</TableCell>
                            <TableCell align="center">Aut. Emisora</TableCell>
                            <TableCell align="center">Fecha Vigencia</TableCell>
                            <TableCell align="center">Fecha Derogación</TableCell>
                            <TableCell align="center">Fecha Reforma</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documentsForPage.map((document) => (
                            <TableRow key={document.id}>
                                <TableCell align="center">{truncateContent(document.name)}</TableCell>
                                <TableCell align="center">{document.pageNumber}</TableCell>
                                <TableCell align="center">{document.authorityName}</TableCell>
                                <TableCell align="center">{document && document.dateVigency ? document.dateVigency.slice(0, 10) : 'S/F'}</TableCell>
                                <TableCell align="center">{document && document.dateDerog ? document.dateDerog.slice(0, 10) : 'S/F'}</TableCell>
                                <TableCell align="center">{document && document.dateReform ? document.dateReform.slice(0, 10) : 'S/F'}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title={document.state ? "Vigente" : "Derogado"}>
                                        <div>
                                            {document.state ? <FcCheckmark /> : <FcCancel />}
                                        </div>
                                    </Tooltip>
                                </TableCell>

                                <TableCell align="center">
                                    <EditButton />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={paginationStyles}>
                <Link
                    color="primary"
                    href="#"
                    onClick={preventDefault}
                    style={{
                        ...linkStyles,
                        marginRight: '16px',
                        pointerEvents: currentPage === 1 ? 'none' : 'auto',
                        color: currentPage === 1 ? '#ccc' : '#1976D2',
                    }}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous Page
                </Link>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <Link
                    color="primary"
                    href="#"
                    onClick={preventDefault}
                    style={{
                        ...linkStyles,
                        marginLeft: '16px',
                        pointerEvents: currentPage === totalPages ? 'none' : 'auto',
                        color: currentPage === totalPages ? '#ccc' : '#1976D2',
                    }}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next Page
                </Link>
            </div>
        </>
    );
}
