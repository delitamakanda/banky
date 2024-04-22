import { Container } from "@mui/material";
import { ReactNode } from "react";

const FormContainer = ({children}:{ children: ReactNode }) => (
    <Container component="main" maxWidth="xs">
        {children}
    </Container>
)

export default FormContainer;
