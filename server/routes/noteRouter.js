const router = require('express').Router()
const noteCtrl = require('../controllers/noteCtrl')
const auth = require('../middleware/auth')
const upload = require('../middleware/image_uploading')

router.route('/note')
    .get(auth, noteCtrl.getNotes)
    .post(auth, upload.single('image'), noteCtrl.createNote)

router.route('/note/:id')
    .delete(auth, noteCtrl.deleteNote)
    .put(auth, upload.single('image'), noteCtrl.updateNote) 


module.exports = router