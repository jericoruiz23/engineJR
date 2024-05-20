import React from 'react';
import Swal from 'sweetalert2'

const handleClickEdit = () => {
    Swal.fire({
        title: "Desea añadir un nuevo documento?",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
        }
    });

}

const AddFileButton = ({ onClick }) => {
    return (
        <button
            onClick={handleClickEdit}
            style={{
                border: 'none',
                display: 'flex',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#57bd9e',
                color: '#ffffff',
                fontSize: '0.75rem',
                height: '50%',
                lineHeight: '1rem',
                fontWeight: '700',
                textAlign: 'center',
                textTransform: 'uppercase',
                verticalAlign: 'middle',
                alignItems: 'center',
                borderRadius: '0.5rem',
                userSelect: 'none',
                gap: '0.75rem',
                boxShadow: '0 4px 6px -1px #488aec31, 0 2px 4px -1px #488aec17',
                transition: 'all 0.6s ease',
                position: 'relative',
                marginLeft: 'auto',
                marginTop: '1.5rem'
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                style={{ width: '1.25rem', height: '1.25rem' }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                    stroke="#fffffff"
                    strokeWidth="2"
                ></path>
                <path
                    d="M17 15V18M17 21V18M17 18H14M17 18H20"
                    stroke="#fffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </svg>
            <div onClick={handleClickEdit}>

                Añadir documento
            </div>
        </button>
    );
};

export default AddFileButton;
