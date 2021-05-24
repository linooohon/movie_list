const express = require('express');
const app = express();
const port = 3000;
const movieList = require('./movies.json');

// setting template engine
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//setting static files
app.use(express.static('public'));


//首頁
app.get('/', (req, res) => {
    res.render('index', { movies: movieList.results });
});

// 顯示對應詳細頁
app.get('/movies/:movie_id', (req, res) => {
    console.log('id', req.params.movie_id);
    const chooseMovie = movieList.results.filter((item) => item.id.toString() === req.params.movie_id);
    res.render('show', { movie: chooseMovie[0] })
})

//搜尋
app.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    const movies = movieList.results.filter((item) => {
        return item.title.toLowerCase().includes(keyword.toLowerCase());
    });
    res.render('index', { movies: movies, keyword: keyword});
});


app.listen(port, () => {
    console.log(`Movie List is running on http://localhost:${port}`);
});