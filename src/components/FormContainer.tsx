import { Container } from "@mui/material";

const FormContainer = ({children}) => {
    return (
        <Container component="main" maxWidth="xs">
            {children}
        </Container>
    )
}

export default FormContainer;
