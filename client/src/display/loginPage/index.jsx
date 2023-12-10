import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from './Form';

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width : 1000px)");

    return <Box>
        <Box width="100%" backgroundColor={theme.palette.background.alt} padding="1 rem 6%" textAlign="center">
         <Typography fontWeight="bold" fontSize = "32px" color="primary">
            ExpressHub - Like, Share and Connect
          </Typography>
        <Box width={isNonMobileScreens ? "50px" : "90%"} padding="2rem" margin="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
            <Typography fontWeight="500" varient="h5" sx = {{mb : "1.5rem"}}>
                Welcome
            </Typography>
            <Form />
        </Box>
        </Box>
    </Box>;
};
export default LoginPage;