export const errorHandler = (req,res,next) => {
    res.status(404).json({message:'Can not find page on the server'})
}