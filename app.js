import express from "express";
import bodyParser from "body-parser";const app = express();
const PORT = 3000;

// Middleware to serve static files and parse form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Sample posts array (temporary storage)
const posts = [];

// Home route
app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

app.get('/create', (req, res) => {
  res.render('create'); // Render the create.ejs template
});

app.get('/edit/:id', (req, res)=>{
  const post = posts[req.params.id];
  res.render('edit', {post :posts, index : req.params.id});
});

app.post('/edit/:id', (req,res)=>{
  const post = posts[ req.params.id];
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect('/');
});

app.post('/delete/:id', (req, res)=>{
  posts.splice(req.params.id,1);
  res.redirect('/')
});

app.post('/create', (req, res)=>{
  const post = {
    title : req.body.title,
    content : req.body.content
  };
  posts.push(post);
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
