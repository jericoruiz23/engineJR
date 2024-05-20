import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/StarBorder';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiEye, FiDatabase } from "react-icons/fi";


function ResponsiveAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };
    const handleRegisterClick = () => {
        navigate("/signup");
    };
    const handleHomeClick = () => {
        navigate("/dashboard");
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#57bd9e' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    ESPE Engine
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Stack spacing={2} direction="row">
                        <Button color="inherit" onClick={handleHomeClick}>Inicio</Button>
                        <Button color="inherit">Reglamentos</Button>
                        <Button color="inherit">LOATIP</Button>
                        <Button color="inherit">Retención de cuentas</Button>
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="contained"
                                onClick={handleRegisterClick}
                                sx={{
                                    backgroundColor: '#bdffff',
                                    color: 'black',
                                    border: '1px solid #666666',
                                    '&:hover': {
                                        backgroundColor: '#00774f',
                                    },
                                }}
                            >
                                Registro
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleLoginClick}
                                sx={{
                                    backgroundColor: '#bdffff',
                                    color: 'black',
                                    border: '1px solid #666666',
                                    '&:hover': {
                                        backgroundColor: '#00774f',
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Toolbar>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiMenuItem-root': {
                            mt: 0.5,
                            mb: 0.5,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Stack>
                    <Button onClick={handleHomeClick} color="inherit">Inicio</Button>
                    <Button color="inherit">Reglamentos</Button>
                    <Button color="inherit">LOATIP</Button>
                    <Button color="inherit">Retención de cuentas</Button>
                    <Button onClick={handleLoginClick} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                    <Button onClick={handleRegisterClick} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Registro
                    </Button>
                </Stack>
            </Menu>
        </AppBar>
    );
}
function Copyright(props) {

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const tiers = [
    {
        title: 'Búsqueda',
        price: <HiMagnifyingGlass />,
        description: [
            'Busca lo que necesites',
            'por título, expresión',
            'o contenido.',

        ],
        buttonText: 'Registrarse',
        buttonVariant: 'outlined',
    },
    {
        title: 'Visualización',
        price: <FiEye />,
        description: [
            'Posibilidad de ver',
            'documentos sin la',
            'necesidad de descargar.',
        ],
        buttonText: 'Empieza ahora!',
        buttonVariant: 'contained',
    },
    {
        title: 'Uso de datos',
        price: <FiDatabase />,
        description: [
            'Busca en linea',
            'todo  ',
            'lo que necesites',

        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];

const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: [
            'Cool stuff',
            'Random feature',
            'Team feature',
            'Developer stuff',
            'Another one',
        ],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <ResponsiveAppBar />
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />

            <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    ¿Qué hacemos?
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    La formación de profesionales se fundamenta en proyectos multidisciplinarios
                    relacionados al paradigma “Smart University” que incluye el desarrollo de una
                    universidad postmoderna con énfasis en la aplicación del gobierno electrónico
                    (e-gobierno), internacionalización y modelo educativo innovador, tendiente a
                    continuar como institución de educación superior de las Fuerzas Armadas,
                    referente en el ámbito nacional e internacional.

                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            {tier.price}
                                        </Typography>

                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
                <Grid container spacing={4} justifyContent="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="text.secondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
        </ThemeProvider>
    );
}