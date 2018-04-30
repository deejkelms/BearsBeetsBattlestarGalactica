## Bears.. Beets.. Battlestar Galactica
Hello World! BBB is an app that helps you find more info on your favorite shows and stores them in a list for you to interact with.

Simply type in a show, find the show you want in the search results, and add it to your list!

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Other Technologies used:

- [Sass](https://github.com/sass/sass)
- [React Router](https://github.com/ReactTraining/react-router)
- [JSON Server](https://github.com/typicode/json-server)
- [PubSub](https://github.com/mroderick/PubSubJS)
- [ClassNames](https://github.com/JedWatson/classnames)
- [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap)

All TV info is coming from The Movie Database
- [TMDB](https://developers.themoviedb.org/3/getting-started)

## Getting Started

* `git clone https://github.com/deejkelms/bearsbeetsbattlestargalactica`
* `cd bearsbeetsbattlestargalactica`
* `npm install`
* `npm start`

BBB uses Json Server as a simple REST api to create and delete shows. You will need to run this on another terminal window.

* `json-server -p 4000 --watch db.json`

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser!
You can also see the json data by running [http://localhost:4000/shows](http://localhost:4000/shows)

## Something Missing?

I had a LOT OF FUN building this application. However, I did miss a few things. I would like to display more information, and make the information that I do have more interactive.

If you have ideas for more “How To” recipes that should be on this page, [let me know](https://github.com/deejkelms/bearsbeetsbattlestargalactica/issues) or [make a pr!]
