let req = new (require(SERVER_ROOT_PATH + '/lib/request'))();

class FactsController {
    async getNumberFact(){ return await req.doRequest('numbers','getFact',{}); }

    async getChuckFact(){ return await req.doRequest('chuck','getFact',{}); }
} module.exports = FactsController;
