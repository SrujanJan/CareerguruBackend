export const catchAsyncError=(theFucntion)=>{
    return(req,res,next)=>{
        Promise.resolve(theFucntion(req,res,next)).catch(next);
    }
}