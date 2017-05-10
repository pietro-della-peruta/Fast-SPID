/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Aprile-conversation.js
// browser support for conversation

var _input;
var _conversation;
var _context = {};
var a_player_target;
// initialize the page
function initiateConversation()
{
  _input = $("#textInput");
  _conversation = $("#conversation");
  _conversation.empty()
  getResponse("Ciao");
// aggiunto da ennio
 _a_player_target = $("#a_player");
// fine aggiunta ennio
}

function getMessage()
 {
   _conversation.append('<div class="shape bubble1"><p>'+_input.val()+"</p></div>");
//   console.log("input " + _input.val());
   getResponse(_input.val());
   _input[0].value = "";
}

function getResponse(_text)
{
   var options = {};
   options.input = _text;
   options.context = _context;
   $.when($.post("/api/response", options)).then(
     function(res, _type, _jqXHR)
     {console.log("Aprile-conversations.js getMessage Success res"+res);
//aggiunta da ennio la parte di speech to text
if(res.output.text!=undefined){
	speak (res.output.text,_a_player_target,false);
}
//fine aggiunta

if (res.context.trovato==true){
	_conversation.append('<div class="shape bubble2"><p>'+'<img class="Left-img" src="./icons/animata.gif" width="60" height="40" />'+res.output.text+"</p></div>"); 
	}
    
else {_conversation.append('<div class="shape bubble2"><p>'
		+'<img class="Left-img" src="./icons/animata.gif" width="60" height="40" />'
		+res.output.text+" "+
		'<a href="http://www.spid.gov.it/" target="_blank" ><img src="./icons/spid-logo.png" align="top" align="right" width="60" height="30"></a></p></div>');
//parte retrieve and rank
	var options = {};
	options.question = _text;
	$.when($.post("/api/rr", options)).then(
			function(res, _type, _jqXHR) {
				console.log("Aprile-conversations.js getMessage Failure res" + res);
				var vaia = "<a href=" + '"./documenti/'+encodeURIComponent(res[0].fileName)+'"'+' target="_blank">'
				if (res[1] !== undefined) {var vaia2 = "<a href=" + '"./documenti/'+encodeURIComponent(res[1].fileName)+'"'+' target="_blank">'} else
					{var vaia2 = "<a";
					console.log("vaia2="+vaia2);
					res[1]="";
					};
				
  				console.log(vaia);
//  				speak(res[0].body,_a_player_target,true);
  				alert(res[0].body);
//  				alert(rest[0].ranker.confidence);
			      _conversation.append('<div class="shape bubble2"><p>' 
			    		  +'<img class="Left-img" src="./icons/animata.gif" width="60" height="40" />'
			    		  + "  " + "In ogni caso ho trovato con IBM retrieve&rank i seguenti documenti che potrebbero aiutarti a trovare la risposta <br>"
			    		  +"id:"+res[0].id+"<br>"
			    		  +"titolo:"+res[0].title+"<br>"
//			    		  +"confidence factor:"+res[0].ranker.confidence+"<br>"
			    		  + vaia+res[0].fileName+"<br></a>" +
			    		  +"id:"+res[1].id+"<br>"
			    		  +"titolo:"+res[1].title+"<br>"
//			    		  +"confidence factor:"+res[0].ranker.confidence+"<br>"
			    		  + vaia2+res[1].fileName+"<br></a>" +
			              "</p></div>");
			},
			function(res, _type, _jqXHR) {
				console.log("Aprile-conversations.js getMessage Failure res"+res);
			      _conversation.append('<div class="shape bubble2">CASO 2<p>'+res+"</p></div>");
			}
	);
// fine parte retrieve and rank
}
     },
   function(res, _type, _jqXHR)
     { console.log("Aprile-conversations.js getMessage Failure res.responseText"+res.responseText);
      _conversation.append('<div class="shape bubble2"><p>'+res.responseText+"</p></div>");
     });
 }
