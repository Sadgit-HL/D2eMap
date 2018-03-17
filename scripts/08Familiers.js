
function constructAlliesAndFamiliarsTabFromConfig() {
	constructFamiliarsTabFromConfig();
	constructAlliesTabFromConfig();
}

function constructAlliesTabFromConfig() {
	if (config.allies != undefined) {
		for (var i = 0 ; i < config.allies.length; i++) {
			var container = addAllyLine();
			var ally = config.allies[i];
			updateAlly(container.find('.select-ally li')[0], ally.title);
			container.find('[name="ally-x"]').val(ally.x);
			container.find('.x-title').html(getAlphabetChar(ally.x - 1) + ' ');
			container.find('[name="ally-y"]').val(ally.y);
			container.find('.y-title').html(ally.y.toString() + ' ');
			container.find('[name="ally-hp"]').val(ally.hp);
			for (var j = 0; ally.skills != undefined && j < ally.skills.length; j++) {
				container.find('[name="' + ally.skills[j] + '"]').prop('checked', true);
			}
			updateConditionsInSettings(ally.conditions, container);
			adjustAlliesSkillsImages(container.children()[0]);
		}
	}
}

function createAlliesSelectContent() {
	var html = addOption('Clear', '', 'clearAlly(this);');
	for (var i = 0; i < ALLIES_LIST.length; i++) {
		html += addOption(ALLIES_LIST[i] + ' ', '', 'updateAlly(this, \'' + ALLIES_LIST[i] + '\')');
	}
	return html;
}

function addAllyLine() {
	var ally = $('<div>');
	addUnitLine(ally, 'Ally');

	ally.find('.select-ally ul').append(createAlliesSelectContent());
	ally.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	ally.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	ally.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
	ally.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	ally.append($('<br/>'));
	ally.append($('<img src="" style="display: none;">').addClass('ally-image'));
	ally.append($('<img src="" style="display: none;">').addClass('ally-image-back'));
	ally.append($('<br/>'));
	ally.append(getAllySkillsBlock());
	$('#allies-container').append(ally);
	return ally;
}

function updateAlly(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.ally-title').html(value + ' ');
	container.find('input[name="ally-title"]').attr('value',value);
	container.find('img.ally-image').attr('src', 'images/allies_cards/' + urlize(value) + '.png').css('display','inline-block');
	container.find('img.ally-image-back').attr('src', 'images/allies_cards/' + urlize(value) + '_back.png').css('display','inline-block');
	container.find('[ally="' + value + '"] input[type="checkbox"]').parent().parent().css('display', 'block');
	adjustAlliesSkillsImages(element);
}

function clearAlly(element) {
	var container = $(element).parents('.select-row');
	container.find('.ally-title').html('Select Ally ');
	container.find('input[name="ally-title"]').attr('value','');
	container.find('img.ally-image').css('display','none');
	container.find('img.ally-image-back').css('display','none');
}

function getAllySkillsBlock() {
	var html = $('<div>').addClass('ally-skills-container');
	html.append($('<h2>Ally skills</h3>'));
	var allySkillsImages = $('<div>').addClass('ally-skills-images-container');
	for (ally in ALLIES_SKILLS) {
		if (ALLIES_SKILLS[ally] == undefined) continue;
		var allySkills = ALLIES_SKILLS[ally];
		for (var i = 0; i < allySkills.length; i++) {
			var skill = allySkills[i];
			var skillObject = $('<div ally="' + ally + '">').addClass('checkbox');
			skillObject.css('display', 'none');
			skillObject.append($('<label><input type="checkbox" name="' + skill + '" onClick="adjustAlliesSkillsImages(this);"/> ' + skill + '</label>'));
			html.append(skillObject);
			allySkillsImages.append($('<img style="display: none;">').attr('src', 'images/ally_skill_cards/' + urlize(ally) + '/' + urlize(skill) + '.jpg').attr('skill', skill).attr('ally',ally));
		}
	}
	html.append(allySkillsImages);
	return html;
}

function adjustAlliesSkillsImages(element) {
	var container = $(element).parents('.select-row');
	container.find('.ally-skills-images-container img').css('display','none');
	var ally = container.find('[name="ally-title"]').val();
	var checkboxes = container.find('[ally="' + ally + '"] input[type="checkbox"]');
	for (var i = 0; i < checkboxes.length; i++) {
		var checkbox = $(checkboxes[i]);
		if (checkbox.prop('checked')) {
			var skill = checkbox.attr('name');
			container.find('img[skill="' + skill + '"][ally="' + ally + '"]').css('display','inline-block');
		}
	}
}

function getAllies() {
	var result = [];
	var allies = $('#allies-container .select-row');
	for (var i = 0; i < allies.length; i++) {
		var container = $(allies[i]);
		var ally = {};
		ally.title = container.find('[name="ally-title"]').val();
		ally.x = container.find('[name="ally-x"]').val();
		ally.y = container.find('[name="ally-y"]').val();
		ally.hp = container.find('[name="ally-hp"]').val();
		ally.conditions = getConditions(container);
		ally.skills = [];
		var skillCheckboxes = container.find('input[type="checkbox"]');
		for (var j = 0; j < skillCheckboxes.length; j++) {
			var skillCheckbox = $(skillCheckboxes[j]);
			if (skillCheckbox.prop('checked')) {
				ally.skills.push(skillCheckbox.attr('name'));
			}
		}
		result.push(ally);
	}
	return result;
}

function clearAllies() {
	$('#allies-container .select-row').remove();
}

function createFamiliarsImagesBlock() {
	var familiarsContainer = $('#familiars-container');
	var familiarImagesContainer = $('<div>').addClass('familiars-images');
	for (var i = 0; i < FAMILIARS_LIST.length; i++) {
		if (FAMILIARS_LIST[i][1]) {
			var familiarImage = $('<img>').addClass('familiar-image').attr('name',urlize(FAMILIARS_LIST[i][0])).attr('src','images/familiars_cards/' + urlize(FAMILIARS_LIST[i][0]) + '.jpg').css('display','none');
			familiarImagesContainer.append(familiarImage);
		}
	}
	familiarsContainer.append(familiarImagesContainer);
}

function constructFamiliarsTabFromConfig() {
	if (config.familiars != undefined) {
		for (var i = 0 ; i < config.familiars.length; i++) {
			var container = addFamiliarLine();
			var familiar = config.familiars[i];
			updateFamiliar(container.find('.select-familiar li')[0], familiar.title);
			container.find('[name="familiar-x"]').val(familiar.x);
			container.find('.x-title').html(getAlphabetChar(familiar.x - 1) + ' ');
			container.find('[name="familiar-y"]').val(familiar.y);
			container.find('.y-title').html(familiar.y.toString() + ' ');
			container.find('[name="hp"]').val(familiar.hp);
			updateConditionsInSettings(familiar.conditions, container);
		}
	}
}

function createFamiliarsSelectContent() {
	var html = addOption('Clear', '', 'clearFamiliar(this);');
	for (var i = 0; i < FAMILIARS_LIST.length; i++) {
		html += addOption(FAMILIARS_LIST[i][0] + ' ', '', 'updateFamiliar(this, \'' + FAMILIARS_LIST[i][0] + '\')');
	}
	return html;
}

function clearFamiliarsAndAllies() {
	clearFamiliars();
	clearAllies();
}
function clearFamiliars() {
	$('#familiars-container .select-row').remove();
}

function addFamiliarLine() {
	var familiar = $('<div>');
	addUnitLine(familiar, 'Familiar');

	familiar.find('.select-familiar ul').append(createFamiliarsSelectContent());
	familiar.find('[name="familiar-hp"]').attr('name', 'hp');
	familiar.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	familiar.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	familiar.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
	familiar.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#familiars-container').append(familiar);
	return familiar;
}

function getFamiliars() {
	var result = [];
	var familiars = $('#familiars-container .select-row');
	for (var i = 0; i < familiars.length; i++) {
		var container = $(familiars[i]);
		var familiar = {};
		familiar.title = container.find('[name="familiar-title"]').val();
		familiar.x = container.find('[name="familiar-x"]').val();
		familiar.y = container.find('[name="familiar-y"]').val();
		familiar.hp = container.find('[name="hp"]').val();
		familiar.conditions = getConditions(container);
		result.push(familiar);
	}
	return result;
}

function updateFamiliar(element, value) {
	if (value == 'Raven') {
		value = 'Raven Flock';
	}
	if (value == 'Shadow') {
		value = 'Shadow Soul';
	}
	var container = $(element).parents('.select-row');
	container.find('.familiar-title').html(value + ' ');
	container.find('input[name="familiar-title"]').attr('value',value);
	$('.familiar-image').css('display','none');
	var familiarTitlesContainers = $('input[name="familiar-title"]');
	for (var i = 0; i < familiarTitlesContainers.length; i++) {
		var titleContainer = $(familiarTitlesContainers[i]);
		$('[name="' + urlize(titleContainer.attr('value')) + '"]').css('display','inline-block');
	}
}

function clearFamiliar(element) {
	var container = $(element).parents('.select-row');
	container.find('.familiar-title').html('Select Familiar ');
	container.find('input[name="familiar-title"]').attr('value','');
}

