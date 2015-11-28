'use strict'

import React from 'react'
import ReactDom from 'react-dom'

import Parse from 'parse'

Parse.initialize("vcgh38EkiuIrke6l8pW30xokpp708lO07rR1CeqN", "LZWollLVAf5rOTziIulxhIq4atdkN4k5TaKu7BJu");

import Application from './components/Application'

ReactDom.render(
	<Application />, document.getElementById('application')
);
