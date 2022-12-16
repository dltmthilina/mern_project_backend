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
    res.json({place})
});

module.exports = router;