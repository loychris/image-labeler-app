const uploader = async (req,res,next) => {
    req.user.isUploader?
        next():
        res.status(401).send({error: 'This user is not authorize to upload.'})
}

module.exports = uploader;
