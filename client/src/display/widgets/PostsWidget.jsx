import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import SinglePostWidget from "./SinglePostWidget"
const PostsWidget = ({userId, isProfile = false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method : "GET",
            headers : {Authorization : `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({posts : data}));
    }
    const getUserPosts = async () => {
        const respose = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            methos : "GET",
            headers : {Authorization : `Bearer ${token}`},
        });
        const data = await respose.json();
        dispatch(setPosts({posts : data}));
    }

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        }
        else{
            getPosts();
        }
    }, []);

    return (
        <>
          {posts && posts.slice().reverse().map(
            ({
              _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments,
            }) => (
              <SinglePostWidget
                key={_id} postId={_id} postUserId={userId} name={`${firstName} ${lastName}`} description={description}
                location={location} picturePath={picturePath} userPicturePath={userPicturePath} likes={likes} comments={comments}
              />
            )
          )}
        </>
      );
};
export default PostsWidget;