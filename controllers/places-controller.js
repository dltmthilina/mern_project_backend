const HttpError = require('../models/http-error')

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

const getPlaceById = (req, res, next)=>{
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p=>{
        return p.id === placeId
    });

    if(!place){
        throw new HttpError('Could not find a place for the provided id.', 404); 
    }
    res.json({place})
}

const getPlacesByUserId =(req, res, next)=>{
    const userId = req.params.uid;
    const places = DUMMY_PLACES.find (p=>{
        return p.creator === userId;
    })

    if(!places){
        return next(new HttpError('Could not find a place for the provided user id.', 404)); 
    }

    res.json({places});
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;