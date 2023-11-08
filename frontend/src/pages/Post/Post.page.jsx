import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData, defer, Await } from "react-router-dom";
import React from "react";
import { Loader } from '@mantine/core';

export const PostPage = () => {
  const posts = useLoaderData();
  return (
    <React.Suspense
      fallback={<Loader color="blue" />}
    >
      <Await
        resolve={posts}
          errorElement={
            <p>Error loading posts!</p>
          }
      >
        {(posts) => (
          <Container>
            <SimpleGrid cols={3}>
              {posts?.data.map((post) => (
                <ArticleCardImage key={post.title} {...post} />
              ))}
            </SimpleGrid>
          </Container>
        )}
      </Await>
    </React.Suspense>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("I ran!");
  return defer(res);
};
