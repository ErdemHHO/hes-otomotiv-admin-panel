import jwt from 'jsonwebtoken'


const auth=(req,res,next)=>{
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(400).json({ message: 'Token gerekli' });
    }
    try {
        const token=authorization.split(" ")[1]; 
        let decodedData;

        if(token){
            decodedData=jwt.verify(token,'secret-key');
            req.userId=decodedData?._id
        }
        next();
    } catch (error) {
        res.status(400).json({ message: 'Yetkilendirilmemis islem' });
    }

}



export {
    auth
  };