let req = new (require(SERVER_ROOT_PATH + '/lib/request'))();

class IPTrackController {
    async trackIP(ip){ console.log('ip',ip);
        let countryInfo = await req.doRequest('geoIP','getInfo',{queryPath:{ip}});
        if(countryInfo.code === 200){
            return {code:countryInfo.code,msg:{language:countryInfo.msg.languages,currency:countryInfo.msg.currency_name,country:countryInfo.msg.country_name}}
        } else return countryInfo;
    }
} module.exports = IPTrackController;
