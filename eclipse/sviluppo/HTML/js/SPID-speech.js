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

var a_player_target = "#a_player";
var NLC_Button ; var stt_out; var msg_out;
var _mic; var _stop; var toLoad ="";

function initPage ()
{ document.cookie = "stt-token=";

  toLoad = "conversation.html";

  $.when($.get(toLoad)).done(function (page)
    {$("#body").empty(); $("#body").append(page);
    initiateConversation(); 
    });
}

function initiateDialog ()
{

var speak = "#speak";
var stt_target = '#speech'; stt_out = $(stt_target);
  var chat = $('#chat'); var dialog_target = '#conversation';
  var stream;
}

function speak (_chat, _a_player_target, b_display)
{
  console.log("initiating text-to-speech service...");
  var textString = _chat;
  var voice = 'it-IT_FrancescaVoice';
  var audioFrame = $(_a_player_target);

  var audio = audioFrame.get(0);
  var synthesizeURL = '/api/text-to-speech/synthesize' +
    '?voice=' + voice +
    '&text=' + encodeURIComponent(textString) +
    '&X-WDC-PL-OPT-OUT=' ;
  audio.src = synthesizeURL

  audio.pause();
  audio.addEventListener('canplaythrough', onCanplaythrough);
  audio.muted = true;

  audio.play();
  (b_display) ? audioFrame.show() : audioFrame.hide();

}
function onCanplaythrough() {
  var audio = $(a_player_target).get(0);

  audio.removeEventListener('canplaythrough', onCanplaythrough);
  try { audio.currentTime = 0; }
  catch(ex) { // ignore. Firefox just freaks out here for no apparent reason.
            }
  audio.controls = true;
  audio.muted = false;
  $('html, body').animate({scrollTop: $('#a_player').offset().top}, 500);
  $('body').css('cursor', 'default');
}
