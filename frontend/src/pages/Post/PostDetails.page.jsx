import { Link, Navigate, useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Group, Button, Paper} from '@mantine/core';
import classes from "./PostDetails.page.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostDetailsPage() {
  const currentPost = useLoaderData();
  const navigate = useNavigate();
  const [isAuthor, setIsAuthor] = useState(currentPost.data.isAuthor);
  const [wantToUpdate, updateUi] = useState(false);

  const [author, setAuthor] = useState(currentPost.data.author);
  const [title, setTitle] = useState(currentPost.data.title);
  const [category, setCategory] = useState(currentPost.data.category);
  const [content, setContent] = useState(currentPost.data.content);

  
  const handlePost = () => {
    setIsAuthor(false);
    updateUi(true);
  }

  const handleUpdate = async (e) => {
    navigate("/posts");

  };

  const viewUi = (<><Paper withBorder shadow="md" radius="md">
                      <h2>Author:</h2>
                      <p  size='lg'>{currentPost.data.author}</p>
                    </Paper>
                    <Paper withBorder shadow="md" radius="md">
                      <h2>Title:</h2>
                      <p  size='lg'>{currentPost.data.title}</p>
                    </Paper>
                    <Paper withBorder shadow="md" radius="md">
                      <h2>Category:</h2>
                      <p  t size='lg'>{currentPost.data.category}</p>
                    </Paper>
                    <Paper withBorder shadow="md" radius="md">
                      <h2>Content:</h2>
                      <p size='lg'>{currentPost.data.content}</p>
                    </Paper>
                    <Group position="right" mt="md">
                      {isAuthor? <Button onClick={handlePost}><Link>Edit post</Link></Button> : null}
                      <Button><Link to="/posts">Back to Posts</Link></Button>
                    </Group></>);

  const editUi = (<form onSubmit={handleUpdate}>
                    <Paper withBorder shadow="md" radius="md">
                      <h2>Author:</h2>
                      <textarea name="author" size='lg' onChange={(e)=>{setAuthor(e.target.value)}} value={author}/>
                    </Paper>
                    <Paper withBorder shadow="md" radius="md">
                      <h2>Title:</h2>
                      <textarea name="title" size='lg' onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
                    </Paper>
                    <Paper withBorder shadow="md" radius="md">
                      <h2>Category:</h2>
                      <textarea type="text"  name="category" size='lg' onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
                    </Paper>
                    <Paper withBorder shadow="md" radius="md">
                      <h2>Content:</h2>
                      <textarea type="text"  name="content" size='lg' onChange={(e)=>{setContent(e.target.value)}} value={content}/>
                    </Paper>
                    <Group position="right" mt="md">
                      <Button type='submit'><Link>Update post</Link></Button>
                      <Button><Link to="/posts">Back to Posts</Link></Button>
                    </Group>
                  </form>);
  return (
    <>
      
      <div className={classes.outerLayer}>
        <div className={classes.container}>
          {wantToUpdate? editUi : viewUi}
        </div>
        <div className={classes.container}>
          <img className={classes.image} src={currentPost.data.image}></img>
        </div>
      </div>
      
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const id = params.id;
  const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
  return res;
};

export default PostDetailsPage;
