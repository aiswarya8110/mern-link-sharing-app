const Link = require("../models/link");


const deleteLink = async(req, res)=>{
    try{
       const linkTobeDeleted = await Link.findOne({
        _id: req.params.id,
        user: req.user._id
       })

       if(!linkTobeDeleted){
        return res.status(404).send()
       }

       const deletedLink = await Link.deleteOne(linkTobeDeleted);
       return res.send(deletedLink);
    }catch(err){
        if(err.name === "CastError"){
            return res.status(404).send("Cast Error")
        }

        return res.status(500).send("Error while deleting link. Try again later.")
    }
}


const updateLinks = async(req, res)=>{
    try{
        const links = req.body.links;
        console.log("RECIEVED LINKS",links);
        for(let i = 0; i< links.length; i++){
            const receivedLink = links[i];
            const existingLink = await Link.findOne(
                {
                    platform: receivedLink.platform,
                    user: req.user._id
                }
            )

            if(existingLink){
                await Link.findOneAndUpdate({
                    platform: existingLink.platform,
                    user: req.user._id                
                },{
                    platform: receivedLink.platform,
                    link: receivedLink.link,
                    order: receivedLink.order
                })
            }
            else{
                const {_id, ...rest } = receivedLink;
                await Link.create({
                ...rest,
                user: req.user._id
                });
            }
        }

        res.send();
    }catch(err){
        res.status(500).send('Error while adding links. Try again later.');
    }
}


const getLinks = async(req, res)=>{
    try{

        const user = req.user;
        const links = await Link.find({user: user._id}).sort({order: 1});
        console.log("SORTED LINKS",links)
        return res.send(links)
    }catch(error){
        return res.status(500).send("Unable to get links");
    }
}

module.exports = {getLinks, updateLinks, deleteLink};