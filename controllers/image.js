const Clarifai = require('clarifai');
//adding API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: '5d70736312554420871febd37cccfc83'
   });
   const handleApiCall = (req, res) => {
       app.models
       .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
       .then(data => {
           res.json(data);
       })
       .catch(err => res.status(400).json('unable to work with API'))     
   }

const handlerImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = { handlerImage ,handleApiCall}