import { Link, Navigate, useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Group, Button, Paper, TextInput} from '@mantine/core';
import classes from "./PostDetails.page.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';

function PostDetailsPage() {
  const currentPost = useLoaderData();
  const navigate = useNavigate();
  const [isAuthor, setIsAuthor] = useState(currentPost.data.isAuthor);
  const [wantToUpdate, updateUi] = useState(false);

  const form = useForm({
    initialValues: {
      author: currentPost.data.author,
      title: currentPost.data.title,
      category: currentPost.data.category,
      image: currentPost.data.image,
      content: currentPost.data.content,
      id: currentPost.data.id,
  }});


    


  
  const handlePost = () => {
    setIsAuthor(false);
    updateUi(true);
  }

  const handleUpdate = async (e) => {
    navigate("/posts");
    const res = await axios.post(`${DOMAIN}/api/posts`, e);
    if (res?.data.success) {
      navigate("/posts");
    }
  };

  const onExit = () => {
    navigate("/posts");
  }

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
                      <p  size='lg'>{currentPost.data.category}</p>
                    </Paper>
                    <Paper withBorder shadow="md" radius="md">
                      <h2>Content:</h2>
                      <p size='lg'>{currentPost.data.content}</p>
                    </Paper>
                    <Group position="right" mt="md">
                      {isAuthor? <Button onClick={handlePost}><Link>Edit post</Link></Button> : null}
                      <Button><Link to="/posts">Back to Posts</Link></Button>
                    </Group></>);

  const editUi = (<form onSubmit={form.onSubmit(handleUpdate)}>
                  <TextInput

                    {...form.getInputProps("title")}
                  />

                  <TextInput
                    {...form.getInputProps("category")}
                  />
                  <TextInput
                    {...form.getInputProps("image")}
                  />

                  <TextInput

                    {...form.getInputProps("content")}
                  />
                  <Group position="right" mt="md">
                    {wantToUpdate? <Button type='submit'>Update post</Button> : null}
                    <Button onClick={onExit}>Back to Posts</Button>
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
