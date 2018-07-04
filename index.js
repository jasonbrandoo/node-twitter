const express = require('express');
const Twitter = require('twitter');
const config = require('./config');
const bodyParser = require('body-parser');

const app = express();
const twitter = new Twitter(config);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
	res.json({
		message: 'ok!'
	})
})

app.post('/', (req, res)=>{
	const params = {
		status: req.body.status
	}
	twitter.post('statuses/update', params)
		.then((tweet)=>{
			res.json({
				twit: tweet
			})
		})
		.catch((err)=>{
			res.json(err)
		})
})

app.listen(3000, ()=>{
	console.log('server started');
})