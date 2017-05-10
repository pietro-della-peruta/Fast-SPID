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
var express = require('express');
var router = express.Router();
var text_to_speech = require('./features/text_to_speech');

var conversations = require('./features/conversations');
var r_and_r = require('./features/r_and_r');

module.exports = router;
// text-to-speech
router.get('/api/speech-to-text/token*',text_to_speech.stt_token);
router.get('/api/text-to-speech/synthesize*',text_to_speech.tts_synthesize);
// conversation
router.post( '/api/response', conversations.response);
// retrieve and rank
var bodyParser = require('body-parser');
router.post( '/api/rr', r_and_r.rr);
