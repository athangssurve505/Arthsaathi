const axios  = require("axios");


async function getIpLocation (ip){
    try{
        const res = await axios.get(
      `https://ipapi.co/${ip}/json/`
    );


    const data = res.data;
    
    if(!data) return null;

    return {
        country:data.country_name || null,
        region:data.region || null,
        city:data.city || null,
        timezone:data.timezone || null,
    }
    }
    catch(err){
    console.error("Ip GeoLocation Error : ", err.message);

    return null;


    }

}



module.exports = getIpLocation;