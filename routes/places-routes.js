const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id:'p1',
        title:'One GalleFace',
        description: "Most popular shopping mall in srilanka",
        location:{
            lat:40.2547,
            lng:-73.1245,
        },
        address: "Galleface, colombo, srilanka",
        creator:"u1"
    },
    {
        id:'p1',
        title:'One GalleFace',
        description: "Most popular shopping mall in srilanka",
        location:{
            lat:40.2547,
            lng:-73.1245,
        },
        address: "Galleface, colombo, srilanka",
        creator:"u1"
    },
]

router.get('/:pid', (req, res, next)=>{
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p=>{
        return p.id === placeId
    });

    if(!place){
        const error = new Error('Could not find a place for the provided id.');
        error.code = 404;
        throw error
    }
    res.json({place})
});


router.get('/user/:uid',(req, res, next)=>{
    const userId = req.params.uid;

    const places = DUMMY_PLACES.find (p=>{
        return p.creator === userId;
    })

    if(!places){
        const error = new Error('Could not find a place for the provided user id.');
        error.code = 404;
        return next(error); 
    }

    res.json({places});
})

module.exports = router;