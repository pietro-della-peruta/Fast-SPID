/**
 * http://usejsdoc.org/
 */
// parte retrieve and rank
var config = require("../../env.json");
var watson1 = require('watson-developer-cloud/retrieve-and-rank/v1');
var retrieve_and_rank = new watson1({
	  username: config.retrieveAndRank.username,
	  password: config.retrieveAndRank.password,
	  url: config.retrieveAndRank.url,
	  version: 'v1'
});
var params = {
  cluster_id: config.retrieveAndRank.cluster_id,
  collection_name: config.retrieveAndRank.collection_name
};

var qs = require('qs');
solrClient = retrieve_and_rank.createSolrClient(params);

exports.rr = function(req,res) {
	
	var ranker_id = '1eec7cx29-rank-4121';
	var question  = req.body.question; 
	var query     = qs.stringify({q: question, ranker_id: ranker_id, fl: 'id,title,fileName,ranker.confidence,body'});

	solrClient.get('fcselect', query, function(err, searchResponse) {
	  if(err) {
	    console.log('Error searching for documents: ' + err);
	    res.send ('errore nel retrieve and rank');
	  }
	    else {
	      res.json(searchResponse.response.docs);
	    }
	});
}
// fine parte retrieve and rank