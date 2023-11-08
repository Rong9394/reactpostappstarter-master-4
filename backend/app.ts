import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {

  res.json(posts);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  if(id) {
    const user = findUserById(posts[id - 1].userId);
    const author = user.email;
    const response = posts[id - 1];
    const token = req.headers["authorization"]?.replace('Bearer ', '');
    //@ts-ignore
    const tokenId = jwt.decode(token)?.id;
    let isAuthor = Number(tokenId) === id;
    //@ts-ignore
    response.isAuthor = isAuthor;
     //@ts-ignore
    response.author = author;
    res.json(response);
  }
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {

  const incomingPost = req.body;
  console.log(incomingPost);


  const token = req.headers["authorization"]?.replace('Bearer ', '');

  if(token) {
    // @ts-ignore
    const user = jwt.decode(token)?.id;

    if(user) {

      incomingPost.userId = user;
      addPost(incomingPost);
    }
  }
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
