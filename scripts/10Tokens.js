
function constructMiscellaneousObjectsTabFromConfig() {
	if (config.objectives != undefined) {
		for (var i = 0 ; i < config.objectives.length; i++) {
			var container = addObjectiveLine();
			var objective = config.objectives[i];
			updateObjective(container.find('.select-objective li')[0], objective.title);
			container.find('[name="objective-x"]').val(objective.x);
			container.find('.x-title').html(getAlphabetChar(objective.x - 1) + ' ');
			container.find('[name="objective-y"]').val(objective.y);
			container.find('.y-title').html(objective.y.toString() + ' ');
			if (objective.hp != undefined) {
				addHpInput(container.find('[onclick="addHpInput(this);"]'));
				container.find('input[name="hp"]').val(objective.hp);
			}
		}
	}
}

function createObjectiveSelectContent() {
	var html = addOption('Clear', '', 'clearObjective(this);');
	for (var i = 0; i < OBJECTIVES_LIST.length; i++) {
		html += addOption(OBJECTIVES_LIST[i] + ' ', '', 'updateObjective(this, \'' + OBJECTIVES_LIST[i] + '\')');
	}
	html += '<li role="separator" class="divider"></li>';
	for (var i = 0; i < MISCELLANEOUS_LIST.length; i++) {
		html += addOption(MISCELLANEOUS_LIST[i] + ' ', '', 'updateObjective(this, \'' + MISCELLANEOUS_LIST[i] + '\')');
	}
	return html;
}

function clearMiscellaneousObjectsTab() {
	$('#objective-container .select-row').remove();
}

function addObjectiveLine() {
	var objective = $('<div>');
	addUnitLine(objective, 'Objective');
	objective.find('input[type="text"]').remove();

	objective.find('.select-objective ul').append(createObjectiveSelectContent());
	objective.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	objective.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	objective.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addHpInput(this);">Add HP</button>'));
	objective.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#objective-container').append(objective);
	return objective;
}

function updateObjective(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.objective-title').html(value + ' ');
	container.find('input[name="objective-title"]').attr('value',value);
}

function clearObjective(element) {
	var container = $(element).parents('.select-row');
	container.find('.objective-title').html('Select Token ');
	container.find('input[name="objective-title"]').attr('value','');
}

function getObjectives() {
	var result = [];
	var objectives = $('#objective-container .select-row');
	for (var i = 0; i < objectives.length; i++) {
		var container = $(objectives[i]);
		var objective = {};
		objective.title = container.find('[name="objective-title"]').val();
		objective.x = container.find('[name="objective-x"]').val();
		objective.y = container.find('[name="objective-y"]').val();
		var objectiveHp = container.find('[name="hp"]');
		if (objectiveHp.length > 0) {
			objective.hp = $(objectiveHp[0]).val();
		}
		result.push(objective);
	}
	return result;
}
