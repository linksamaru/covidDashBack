
let req     = new (require(SERVER_ROOT_PATH + '/lib/request'))();
let tracker = new (require(SERVER_ROOT_PATH + '/controller/IPTrackController'))();

class CovidController {
    async getAllCountries() {
        let result = await req.doRequest('covid', 'getAllCountries', {});
        let set = new Set(result.msg.data.covid19Stats.map(c => { return c.country; }));
        result.msg = []; set.forEach(i => { result.msg.push({country:i}); });
        return result;
    }

    async getCountryData(ip){
        let countryMainData  = await tracker.trackIP(ip);
        let covidCountryInfo = await req.doRequest('covid','getByCountry',{params:{country:countryMainData.msg.country}});
        return {code:covidCountryInfo.code,msg:{lastDateCheck:covidCountryInfo.msg.data.lastChecked,covidInfo:covidCountryInfo.msg.data.covid19Stats}};
    }
} module.exports = CovidController;
