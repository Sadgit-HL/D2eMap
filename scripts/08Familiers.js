function InitializeWindowFor_Familiars() {
	var html = $('#familiars');

	//allies zone
	html.append(CreateZone_Allies());

	//familiars zone
	html.append(CreateZone_Familiars());

	//villagers zone
	html.append(CreateZone_Villagers());
}


function UpdateWindow_Familiars() {
	//after Act Set
	//Update_MonsterImages(RowElement);
	//Update_MonsterImages();
}

function GetWindow_Familiars(DataToUpdate) {
	DataToUpdate = GetZone_Allies(DataToUpdate);
	DataToUpdate = GetZone_Familiars(DataToUpdate);
	DataToUpdate = GetZone_Villagers(DataToUpdate);
	return DataToUpdate;
}

function FillWindow_Familiars(NewData, FromPreFilledMaps) {
	//Fill_ActButton(); -> Common not Filled Here
	FillZone_Allies(NewData, FromPreFilledMaps);
	FillZone_Familiars(NewData, FromPreFilledMaps);
	FillZone_Villagers(NewData, FromPreFilledMaps);
}

function ResetWindow_Familiars(FromPreFilledMaps) {
	ResetZone_Allies(FromPreFilledMaps);
	ResetZone_Familiars(FromPreFilledMaps);
	ResetZone_Villagers(FromPreFilledMaps);
}


//Allies zone
function CreateZone_Allies() {
	var html = $('<div>');
	var container = $('<div>').addClass('allies-container');
	container.append('<h1>Allies</h1>');
	html.append(container);
	html.append('<button type="button" class="btn btn-success" aria-expanded="false" onclick="AddLine_Ally();">Add Ally</button>');
	//initialize LineClass
	allyLine.NameListValues = Create_AllyListValues();

	return html;
}

function GetZone_Allies(DataToUpdate) {
	var result = [];
	var allies = $('.allies-container .select-row');
	for (var i = 0; i < allies.length; i++) {
		var container = $(allies[i]);
		var ally = {};
		ally = allyLine.GetOneLineData(container);
		GetZone_AllySkills(container, ally);
		result.push(ally);
	}
	DataToUpdate.allies = result;
	return DataToUpdate;
}

function FillZone_Allies(NewData, FromPreFilledMaps) {
	ResetZone_Allies(FromPreFilledMaps);
	if (NewData.allies != undefined) {
		for (var i = 0; i < NewData.allies.length; i++) {
			allyLine.XYBase = "1x1";
			var html = allyLine.AddOneLineWithData(NewData.allies[i]);
			//add zone for ally skill + insert skill images container
			var AllyImageContainer = $('<div>').addClass('ally-skills-images-container');
			html.find('.Row-cards').after(AllyImageContainer);
			var SkillZone = CreateZone_AllySkills(NewData.allies[i].title);
			html.append(SkillZone);

			FillZone_AllySkills(html, NewData.allies[i], FromPreFilledMaps);

			Update_AllyImages(html);
			$('.allies-container').append(html);
		}
	}
}

function ResetZone_Allies(FromPreFilledMaps) {
	$('.allies-container .select-row').remove();
}

function AddLine_Ally() {
	allyLine.XYBase = "1x1";
	var html = allyLine.AddOneEmptyLine();
	$('.allies-container').append(html);
	return html;
}

function Create_AllyListValues() {
	var html = addOption('Clear', '', 'UnSet_Ally(this);');
	for (var i = 0; i < ALLIES_LIST.length; i++) {
		html += addOption(ALLIES_LIST[i] + ' ', '', 'Set_Ally(this, \'' + ALLIES_LIST[i] + '\')');
	}
	return html;
}

function Set_Ally(element, value) {
	allyLine.XYBase = "1x1";
	var container = $(element).parents('.select-row');
	allyLine.Set_MainElement(container, value);
	Update_AllyImages(container);
	//add zone for ally skill + insert skill images container
	var AllyImageContainer = $('<div>').addClass('ally-skills-images-container');
	container.find('.Row-cards').after(AllyImageContainer);
	var SkillZone = CreateZone_AllySkills(value);
	container.append(SkillZone);
}

function UnSet_Ally(element) {
	var container = $(element).parents('.select-row');
	allyLine.UnSet_MainElement(container);
	Update_AllyImages(container);
}

function Update_AllyImages(RowElement) {
	var AllyImageContainer = RowElement.find('.Row-cards');
	Reset_AllyImages(RowElement);

	var OneAllyValue = RowElement.find('.MainElement-Value').val();
	if (OneAllyValue == undefined || OneAllyValue == '') return;

	if (AllyImageContainer.find('.' + urlize(OneAllyValue)).length == 0) {
		var AllyImage = $('<img>');
		AllyImage.attr('src', 'images/allies_cards/' + urlize(OneAllyValue)  + '.png');
		AllyImageContainer.append(AllyImage);
		var AllyCardBack = $('<img>');
		AllyCardBack.attr('src', 'images/allies_cards/' + urlize(OneAllyValue)  + '_back' + '.png');
		AllyImageContainer.append(AllyCardBack);
	}
}

function Reset_AllyImages(RowElement) {
	var AllyImageContainer = RowElement.find('.Row-cards');
	AllyImageContainer.find('img').remove();
}

function CreateZone_AllySkills(value) {
	var html = $('<div>').addClass('ally-skills-container');
	html.append($('<h2>Ally skills</h3>'));

	var allySkills = ALLIES_SKILLS[value];
	for (var i = 0; i < allySkills.length; i++) {
		var skill = allySkills[i];
		var skillObject = $('<div ally="' + value + '">').addClass('checkbox');
		skillObject.append($('<label><input type="checkbox" name="' + skill + '" onClick="Set_AllySkill(this, \'' + skill + '\');"/> ' + skill + '</label>'));
		html.append(skillObject);
	}
	return html;
}

function GetZone_AllySkills(container, AllyToUpdate) {
	AllyToUpdate.skills = [];
	var skillCheckboxes = container.find('input[type="checkbox"]');
	for (var j = 0; j < skillCheckboxes.length; j++) {
		var skillCheckbox = $(skillCheckboxes[j]);
		if (skillCheckbox.prop('checked')) {
			AllyToUpdate.skills.push(skillCheckbox.attr('name'));
		}
	}
}

function FillZone_AllySkills(container, NewData, FromPreFilledMaps) {
	for (var j = 0; NewData.skills != undefined && j < NewData.skills.length; j++) {
		container.find('[name="' + NewData.skills[j] + '"]').prop('checked', true);
		Set_AllySkill(container.find('[name="' + NewData.skills[j] + '"]'), NewData.skills[j]);
	}
}

function Set_AllySkill(element, skill) {
	var RowElement = $(element).parents('.select-row');
	var OneAllyValue = RowElement.find('.MainElement-Value').val();
	var AllySkillImageContainer = RowElement.find('.ally-skills-images-container');
	if ($(element).prop('checked')) {
		var AllySkillImage = $('<img>').addClass();
		AllySkillImage.attr('src', 'images/ally_skill_cards/' + urlize(OneAllyValue) + '/' + urlize(skill) + '.png').attr('skill', skill).attr('ally', OneAllyValue);
		AllySkillImageContainer.append(AllySkillImage);
	}
	else {
		var AllySkillImage = AllySkillImageContainer.find('img[skill="' + skill + '"][ally="' + OneAllyValue + '"]');
		AllySkillImage.remove();
	}
}


//Familiars zone
function CreateZone_Familiars() {
	var html = $('<div>');
	var container = $('<div>').addClass('familiar-container');
	container.append('<h1>Familiars</h1>');
	container.append('<div class="familiars-cards"></div>');
	container.append('<div class="familiars-tokenscards"></div>');
	html.append(container);
	html.append('<button type="button" class="btn btn-success" aria-expanded="false" onclick="AddLine_Familiar();">Add Familiar</button>');
	//initialize LineClass
	familiarLine.NameListValues = Create_FamiliarListValues();
	familiarLine.TokenCommonImageContainer = "familiars-tokenscards";

	return html;
}

function GetZone_Familiars(DataToUpdate) {
	var result = [];
	var familiars = $('.familiar-container .select-row');
	for (var i = 0; i < familiars.length; i++) {
		var container = $(familiars[i]);
		var familiar = {};
		familiar = familiarLine.GetOneLineData(container);
		result.push(familiar);
	}
	DataToUpdate.familiars = result;
	return DataToUpdate;
}

function FillZone_Familiars(NewData, FromPreFilledMaps) {
	ResetZone_Familiars(FromPreFilledMaps);
	if (NewData.familiars != undefined) {
		for (var i = 0; i < NewData.familiars.length; i++) {
			familiarLine.XYBase = "1x1";
			var html = familiarLine.AddOneLineWithData(NewData.familiars[i]);
			$('.familiar-container').append(html);
		}
		Update_FamiliarImages(html);
	}
}

function ResetZone_Familiars(FromPreFilledMaps) {
	$('.familiar-container .select-row').remove();
}

function AddLine_Familiar() {
	familiarLine.XYBase = "1x1";
	var html = familiarLine.AddOneEmptyLine();
	$('.familiar-container').append(html);
	return html;
}

function RemoveLine_Familiar(Button) {
	Update_FamiliarImages();
}

function Create_FamiliarListValues() {
	var html = addOption('Clear', '', 'UnSet_Familiar(this);');
	for (var i = 0; i < FAMILIARS_LIST.length; i++) {
		html += addOption(FAMILIARS_LIST[i] + ' ', '', 'Set_Familiar(this, \'' + FAMILIARS_LIST[i] + '\')');
	}
	return html;
}

function Set_Familiar(element, value) {
	familiarLine.XYBase = "1x1";
	var container = $(element).parents('.select-row');
	familiarLine.Set_MainElement(container, value);
	Update_FamiliarImages(container);
}

function UnSet_Familiar(element) {
	var container = $(element).parents('.select-row');
	familiarLine.UnSet_MainElement(container);
	Update_FamiliarImages(container);
}

function Update_FamiliarImages(RowElement) {
	var FamiliarImageContainer = $('.familiars-cards');
	var FamiliarList = $('.familiar-container').find('.MainElement-Value');
	Reset_FamiliarImages(RowElement);

	for (var i = 0; i < FamiliarList.length; i++) {
		var OneFamiliarValue = $(FamiliarList[i]).attr('value');
		if (OneFamiliarValue == undefined || OneFamiliarValue == '') continue;
		if (FamiliarImageContainer.find('.' + urlize(OneFamiliarValue)).length == 0) {
			if (FAMILIARS[OneFamiliarValue].hasCard) {
				var FamiliarImage = $('<img>').addClass('familiar-image');
				FamiliarImage.attr('src', 'images/familiars_cards/' + urlize(OneFamiliarValue) + '.png').addClass('familiar').addClass(urlize(OneFamiliarValue));
				FamiliarImageContainer.append(FamiliarImage);
			}
		}
	}
}

function Reset_FamiliarImages(RowElement) {
	var FamiliarImageContainer = $('.familiars-cards');
	FamiliarImageContainer.find('img').remove();
}

//Villagers zone
function CreateZone_Villagers() {
	var html = $('<div>');
	var container = $('<div>').addClass('villagers-container');
	container.append('<h1>Villagers</h1>');
	html.append(container);
	html.append('<button type="button" class="btn btn-success" aria-expanded="false" onclick="AddLine_Villager();">Add Villager</button>');
	//initialize LineClass
	villagerLine.NameListValues = Create_VillagerListValues();

	return html;
}

function GetZone_Villagers(DataToUpdate) {
	var result = [];
	var villagers = $('.villagers-container .select-row');
	for (var i = 0; i < villagers.length; i++) {
		var container = $(villagers[i]);
		var villager = {};
		villager = villagerLine.GetOneLineData(container);
		result.push(villager);
	}
	DataToUpdate.villagers = result;
	return DataToUpdate;
}

function FillZone_Villagers(NewData, FromPreFilledMaps) {
	ResetZone_Villagers(FromPreFilledMaps);
	if (NewData.villagers != undefined) {
		for (var i = 0; i < NewData.villagers.length; i++) {
			villagerLine.XYBase = "1x1";
			var html = villagerLine.AddOneLineWithData(NewData.villagers[i]);
			$('.villagers-container').append(html);
		}
	}
}

function ResetZone_Villagers(FromPreFilledMaps) {
	$('.villagers-container .select-row').remove();
}

function AddLine_Villager() {
	villagerLine.XYBase = "1x1";
	var html = villagerLine.AddOneEmptyLine();
	$('.villagers-container').append(html);
	return html;
}

function Create_VillagerListValues() {
	var html = addOption('Clear', '', 'UnSet_Villager(this);');
	for (var i = 0; i < VILLAGERS_LIST.length; i++) {
		html += addOption(VILLAGERS_LIST[i][0] + ' ', '', 'Set_Villager(this, \'' + VILLAGERS_LIST[i][0] + '\')');
	}
	return html;
}

function Set_Villager(element, value) {
	villagerLine.XYBase = "1x1";
	var container = $(element).parents('.select-row');
	villagerLine.Set_MainElement(container, value);
}

function UnSet_Villager(element) {
	var container = $(element).parents('.select-row');
	villagerLine.UnSet_MainElement(container);
}
