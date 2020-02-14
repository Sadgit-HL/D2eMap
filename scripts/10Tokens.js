function InitializeWindowFor_MapTokens() {
	var html = $('#map-tokens');

	//tiles zone
	html.append(CreateZone_MapTokens());
}

function UpdateWindow_MapTokens() {
	//after Act Set for example
}

function GetWindow_MapTokens(DataToUpdate) {
	DataToUpdate = GetZone_MapTokens(DataToUpdate);
	return DataToUpdate;
}

function FillWindow_MapTokens(NewData, FromPreFilledMaps) {
	//Fill_ActButton(); -> Common not Filled Here
	FillZone_MapTokens(NewData, FromPreFilledMaps);
}

function ResetWindow_MapTokens(FromPreFilledMaps) {
	ResetZone_MapTokens(FromPreFilledMaps);
}


//Map Tokens zone
function CreateZone_MapTokens() {
	var html = $('<div>');
	var container = $('<div>').addClass('maptokens-container');
	container.append('<h1>Map tokens</h1>');
	html.append(container);
	html.append('<button type="button" class="btn btn-success" aria-expanded="false" onclick="AddLine_MapToken();">Add map token</button>');
	//initialize LineClass
	maptokenLine.NameListValues = Create_MapTokenListValues();

	return html;
}

function GetZone_MapTokens(DataToUpdate) {
	var result = [];
	var maptokens = $('.maptokens-container .select-row');
	for (var i = 0; i < maptokens.length; i++) {
		var container = $(maptokens[i]);
		var maptoken = {};
		maptoken = maptokenLine.GetOneLineData(container);
		result.push(maptoken);
	}
	DataToUpdate.maptokens = result;
	return DataToUpdate;
}

function FillZone_MapTokens(NewData, FromPreFilledMaps) {
	ResetZone_MapTokens(FromPreFilledMaps);
	if (NewData.maptokens != undefined) {
		for (var i = 0; i < NewData.maptokens.length; i++) {
			maptokenLine.XYBase = "1x1";
			var html = maptokenLine.AddOneLineWithData(NewData.maptokens[i]);
			$('.maptokens-container').append(html);
		}
	}
}

function ResetZone_MapTokens(FromPreFilledMaps) {
	$('.maptokens-container .select-row').remove();
}

function AddLine_MapToken() {
	maptokenLine.XYBase = "1x1";
	var html = maptokenLine.AddOneEmptyLine();
	$('.maptokens-container').append(html);
	return html;
}

function Create_MapTokenListValues() {
	var html = addOption('Clear', '', 'UnSet_MapToken(this);');
	for (var i = 0; i < OBJECTIVES_LIST.length; i++) {
		html += addOption(OBJECTIVES_LIST[i][0] + ' ', '', 'Set_MapToken(this, \'' + OBJECTIVES_LIST[i][0] + '\')');
	}
	html += '<li role="separator" class="divider"></li>';
	for (var i = 0; i < MISCELLANEOUS_LIST.length; i++) {
		html += addOption(MISCELLANEOUS_LIST[i][0] + ' ', '', 'Set_MapToken(this, \'' + MISCELLANEOUS_LIST[i][0] + '\')');
	}
	return html;
}

function Set_MapToken(element, value) {
	maptokenLine.XYBase = "1x1";
	var container = $(element).parents('.select-row');
	maptokenLine.Set_MainElement(container, value);
}

function UnSet_MapToken(element) {
	var container = $(element).parents('.select-row');
	maptokenLine.UnSet_MainElement(container);
}

