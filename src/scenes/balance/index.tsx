import { Box, useTheme } from "@mui/material";

const gridTemplate = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
`

const Balance = () => {
    const { palette } = useTheme()
    return <Box color={ palette.grey[300]} width="100%" height="100%" display="grid" gap="1.5rem" sx={{ gridTemplateColumns: "repeat(3, minmax(370px, 1fr))", gridTemplateRows: "repeat(10, minmax(60px, 1fr))" ,gridTemplateAreas: gridTemplate}}>
        <Box gridArea="a"></Box>
    </Box>
}

export default Balance;