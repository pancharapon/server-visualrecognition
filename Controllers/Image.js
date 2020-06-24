const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '7e9f6f863fab48ac9288fe8d30c82466'
});

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
	  .where('id', '=', id)
	  .increment({
  	  entries: 1,
    })
    .returning('entries')
    .then(entries => {
    	res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

const handleApiCall = (req, res) => {
  const { input } = req.body
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(404).json('unable to work with API'))
}

module.exports = {
	handleImage: handleImage,
  handleApiCall: handleApiCall
}