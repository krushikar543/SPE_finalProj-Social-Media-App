import { EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useMediaQuery, useTheme, Button, IconButton, Input } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const {palette} = useTheme();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNotMobileScreens = useMediaQuery("(min-width: 1000px)");
    const MediumMain = palette.neutral.MediumMain;
    const medium = palette.primary.medium;

    const handlePost = async() => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if(image){
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        const response = await fetch("http://localhost:3001/posts", {
            method : "POST",
            headers : {Authorization : `Bearer ${token}`},
            body : formData,
        });
        const posts = await response.json();
        dispatch(setPosts({post}));
        setImage(null);
        setPost("");
    };
    return(
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image = {picturePath} />
                <InputBase placeholder="Post something..." onChange={(e) => setPost(e.target.value)}
                value={post} sx ={{width : "100px", backgroundColor : palette.neutral.light, borderRadius: "2rem", p:"1rem 2rem"}}
                 />
            </FlexBetween>
            {isImage && (
        <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}>
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
            )}
            <Divider sx ={{margin: "1.25rem 0"}} />
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={()=> setIsImage(!isImage)}>
                    <ImageOutlined sx ={{color : MediumMain}}/>
                    <Typography color={MediumMain} sx = {{"&:hover" : {cursor: "pointer", color:medium}}}>
                        Image
                    </Typography>
                </FlexBetween>

            {!isNotMobileScreens ? (
                <>
                    <FlexBetween gap="0.25rem">
                        <GifBoxOutlined sx={{color:MediumMain}} />
                        <Typography color={MediumMain}>
                            clip
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.25rem">
                        <MicOutlined sx={{color:MediumMain}} />
                        <Typography color={MediumMain}>
                            Audio
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.25rem">
                        <AttachFileOutlined sx={{color:MediumMain}} />
                        <Typography color={MediumMain}>
                            Attach
                        </Typography>
                    </FlexBetween>
                </>
            ) : (<FlexBetween gap="0.25rem">
                <MoreHorizOutlined sx={{color:MediumMain}} />
                </FlexBetween>
            )}
            <Button disabled={!post} onClick={handlePost} sx = {{color:palette.background.alt, backgroundColor:palette.primary.main, borderRadius:"3rem"}}>
                POST
            </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};
export default MyPostWidget;