import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import {  useParams } from "react-router-dom";
import useFetch from "./Hooks/useFetch.js";
import CustomState from "./Hooks/State.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DetailPage() {
  // const [products, setProducts] = useState([]);
  const { id, youtubeId } = useParams(); // Ambil ID dari parameter URL

  // COSTUM HOOKS
  const [products] = useFetch(process.env.REACT_APP_API + `getProduct/${id}`);
  const [comments] = useFetch(process.env.REACT_APP_API + `getcomment/${id}`);

  const [username, setUsername] = CustomState("");
  const [comment, setComment] = CustomState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.trim() !== "" && comment.trim() !== "") {
      try {
        await fetch(process.env.REACT_APP_API + `postcomment/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, comment }),
        });
        setComment("");
        setUsername("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <OndemandVideoIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit">
            <Link
              href="/"
              underline="none"
              sx={{ color: "white", textDecoration: "none" }}
            >
              Nann Play
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} style={{ marginTop: 10 }}>
        <Grid xs></Grid>
        <Grid xs={6}>
          <Item>
            <Card
              style={{
                border: "none", // Menghilangkan border pada kartu
                boxShadow: "none", // Menghilangkan bayangan pada kartu
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none", // Menghilangkan border pada kartu
                  boxShadow: "none", // Menghilangkan bayangan pada kartu
                }}
              >
                <iframe
                  width="854"
                  height="480"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="Embedded YouTube Video"
                ></iframe>
              </CardContent>
            </Card>
          </Item>
        </Grid>
        <Grid xs>
          <Item>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                required
                multiline
                id="outlined-basic"
                label="Username"
                variant="outlined"
                size="small"
                name="username"
                type="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <TextField
                fullWidth
                required
                multiline
                label="Comment"
                variant="outlined"
                size="small"
                name="comment"
                type="comment"
                id="comment"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send
              </Button>
            </Box>
            <List
              sx={{
                width: 500,
                height: 343,
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
              elevation={3}
              style={{ overflowY: "auto" }}
            >
              {comments.length === 0 ? (
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {"Comment tidak ada"}
                </Typography>
              ) : (
                comments.map((comment, index) => (
                  <ListItem alignItems="flex-start" key={comment._id}>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.Username}
                          </Typography>
                          {" - " + comment.Comment}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))
              )}
              {}
            </List>
          </Item>
        </Grid>
      </Grid>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 1,
          }}
        ></Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography gutterBottom variant="h4" component="h4" align="center">
            {"Products"}
          </Typography>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product, index) => {
              return (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: 380, // Sesuaikan dengan ukuran yang Anda inginkan
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                        height: "100%",
                        objectFit: "cover", // Memastikan gambar tidak terpotong
                      }}
                      image={product.LinkImage}
                    />
                    <Link
                      href={product.LinkProduct}
                      underline="hover"
                      sx={{ color: "black", textDecoration: "none" }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="h6">
                          {product.Title}
                        </Typography>
                        <Typography gutterBottom variant="p" component="p">
                          Rp.{product.Price}
                        </Typography>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
    </>
  );
}
