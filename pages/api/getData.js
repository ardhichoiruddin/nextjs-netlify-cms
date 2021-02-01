import jsonplaceholder  from '../../utils/jsonplaceholder'

export default async function handler(req, res){
    if(req.method !== 'GET'){
        return res.status(405)
    }
    try{
        const getData = await jsonplaceholder()
        return res.status(200).json(getData)
    }
    catch(err){
        res.status(500).json({ msg: "something wrong bro!!!" })
    }
}