import { Box, useMediaQuery } from "@mui/material";
import NavBar from "display/navbar";
import { useSelector } from "react-redux";
import UserWidget from "display/widgets/UserWidget";
import MyPostWidget from "display/widgets/MyPostWidget";
import PostsWidget from "display/widgets/PostsWidget";
import FriendListWidget from "display/widgets/FriendListWidget";
const HomePage = () => {
    const isNotMobileScreens = useMediaQuery("(min-width:1000px)");
    const {_id, picturePath}  = useSelector((state) => state.user);
    // const {picturePath} = useSelector((state) => state.user.picturePath)
    // console.log(picturePath)

    return (
    <Box>
        <NavBar />
        <Box width="100%" p="2rem 6%" display={isNotMobileScreens ? "flex" : "block"} justifyContent="space-between">
            <Box flexBasis={isNotMobileScreens ? "26%": undefined}>
                <UserWidget userId = {_id} picturePath={picturePath}/>
            </Box>
            <Box flexBasis={isNotMobileScreens ? "42%": undefined} mt={isNotMobileScreens ? undefined : "2rem"}>
                <MyPostWidget picturePath={picturePath}/>
                <PostsWidget userId={_id}/>
            </Box>
            {
            isNotMobileScreens && <Box flexBasis="26%">
                <FriendListWidget userId={_id}/>
            </Box>
            }
        </Box>
    </Box>
    )
};
export default HomePage;