function addOptionOld(title, value, optionClass) {
	return '<option class="' + optionClass + '" value="' + value + '">' + title + '</option>';
}

function addOption(title, optionClass, functionCallback, additionalAttribute, attributeValue) {
	//return '<li class="' + optionClass + '"><a href="#" onclick="' + functionCallback + '">' + title + '</a></li>';
	return '<li class="' + optionClass + '"' + (additionalAttribute != undefined ? ' ' + additionalAttribute + '="' + attributeValue + '"' : '') + '><a onclick="' + functionCallback + '">' + title + '</a></li>';
}

function addTextareaWithLabel(labelText, link) {
	var html;
	html = '<label for="' + link +'">' + labelText + '</label>'
	html += '<textarea class="form-control" rows="5" id="' + link +'"></textarea>'
	return html;
}

function updateCoordinate(element, value) {
	updateOption(element, value, false);
}

function updateOption(element, value, isMonster) {
	var container = $(element).parents('.select-row');
	if (isMonster || value == 'Clear') { //monster select or clearing cordinates
		var monsterTitle = $(element).html();
		if (value != 'Clear')
		{
			container.find('input[name="master"]').attr('value', monsterTitle.indexOf('master') > -1);
		}
		var xYSelects = $(container).find('.select-x, .select-y');

		if (isMonster) {
			var monsterHp;
			if (monsterTitle.indexOf('master') > -1) {
				if (CurrentAct == "I") {
					monsterHp = MONSTERS[value].masterHpI;
				} else {
					monsterHp = MONSTERS[value].masterHpII;
				}
			} else {
				if (CurrentAct == "I") {
					monsterHp = MONSTERS[value].minionHpI;
				} else {
					monsterHp = MONSTERS[value].minionHpII;
				}
			}
			container.find('.monster-title').html(monsterTitle + ' ');
			container.find('input[name="monster-title"]').attr('value',value);
			container.find('.x-title').html('Select X coordinate' + ' ');
			container.find('.y-title').html('Select Y coordinate' + ' ');
			container.find('input[name="monster-x"]').attr('value','');
			container.find('input[name="monster-y"]').attr('value','');
			container.find('input[name="monster-hp"]').val(monsterHp);
		} else {
			var otherElementThanCleared;
			if ($(element).parents('.btn-group').hasClass('select-x')) {
				otherElementThanCleared = container.find('.select-y');
				container.find('.x-title').html('Select X coordinate' + ' ');
				container.find('input[name="monster-x"]').attr('value','');
			} else {
				otherElementThanCleared = container.find('.select-x');
				container.find('.y-title').html('Select Y coordinate' + ' ');
				container.find('input[name="monster-y"]').attr('value','');
			}
			xYSelects = otherElementThanCleared;
			value = container.find('.monster-title').html();
			value = value.substring(0, value.length - 1);
			//remove type : master / minion
			value = value.replace(" master", "");
			value = value.replace(" minion", "");
		}

		var firstClass = SHOWING_CLASSES[MONSTERS[value].width];
		var secondClass = SHOWING_CLASSES[MONSTERS[value].height];
		xYSelects.removeClass(SHOWING_CLASSES[1] + ' ' + SHOWING_CLASSES[2] + ' ' + SHOWING_CLASSES[3] + ' squared');
		xYSelects.addClass(firstClass);
		if (firstClass == secondClass) {
			xYSelects.addClass('squared');
		} else {
			xYSelects.addClass(secondClass);
		}
	} else { //coordinate select
		var selectedSize = value.charAt(0);
		var selectedCoordinate = value.substr(1);
		var parent = $(element).parents('.btn-group');

		if (parent.hasClass('select-x')) {
			container.find('input[name="monster-x"]').attr('value',selectedCoordinate);
			container.find('input[name="hero-x"]').attr('value',selectedCoordinate);
			container.find('input[name="line-x"]').attr('value',selectedCoordinate);
			container.find('input[name="door-x"]').attr('value',selectedCoordinate);
			container.find('input[name="xs-x"]').attr('value',selectedCoordinate);
			container.find('input[name="ally-x"]').attr('value',selectedCoordinate);
			container.find('input[name="familiar-x"]').attr('value',selectedCoordinate);
			container.find('input[name="villager-x"]').attr('value',selectedCoordinate);
			container.find('input[name="maptoken-x"]').attr('value',selectedCoordinate);
			container.find('input[name="lieutenant-x"]').attr('value',selectedCoordinate);
			container.find('input[name="agent-x"]').attr('value',selectedCoordinate);
			container.find('input[name="monster-x-size"]').attr('value',selectedSize);
			container.find('.x-title').html($(element).html() + ' ');
			if (!parent.hasClass('squared')) {
				container.find('.select-y').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		} else {
			container.find('.y-title').html($(element).html() + ' ');
			container.find('input[name="monster-y"]').attr('value',selectedCoordinate);
			container.find('input[name="hero-y"]').attr('value',selectedCoordinate);
			container.find('input[name="line-y"]').attr('value',selectedCoordinate);
			container.find('input[name="door-y"]').attr('value',selectedCoordinate);
			container.find('input[name="xs-y"]').attr('value',selectedCoordinate);
			container.find('input[name="ally-y"]').attr('value',selectedCoordinate);
			container.find('input[name="familiar-y"]').attr('value',selectedCoordinate);
			container.find('input[name="villager-y"]').attr('value',selectedCoordinate);
			container.find('input[name="maptoken-y"]').attr('value',selectedCoordinate);
			container.find('input[name="lieutenant-y"]').attr('value',selectedCoordinate);
			container.find('input[name="agent-y"]').attr('value',selectedCoordinate);
			container.find('input[name="monster-y-size"]').attr('value',selectedSize);
			if (!parent.hasClass('squared')) {
				container.find('.select-x').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		}
	}
}

function updateDirection(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.direction-title').html(value + ' ');
	var inputs = container.find('input[name]');
	for (var i = 0; i < inputs.length; i++) {
		var input = $(inputs[i]);
		if (input.attr('name').indexOf('direction') > -1) {
			input.attr('value',value);
			return;
		}
	}
}

function clearDirection(element) {
	var container = $(element).parents('.select-row');
	container.find('.direction-title').html('Select direction ');
	container.find('input[name="door-direction"]').attr('value','');
}

function createConditionSelectContent() {
	var html = addOption('Remove token', '', 'removeCondition(this);');
	var switched = CONDITIONS[CONDITIONS_LIST[0]].hasConditionCard;
	for (var i = 0; i < CONDITIONS_LIST.length; i++) {
		if (switched != CONDITIONS[CONDITIONS_LIST[i]].hasConditionCard)
		{
			switched = CONDITIONS[CONDITIONS_LIST[i]].hasConditionCard;
			html += '<li role="separator" class="divider"></li>';
		}
		html += addOption(CONDITIONS_LIST[i] + ' ', '', 'updateCondition(this, \'' + CONDITIONS_LIST[i] + '\')');
	}
	return html;
}

function addConditions(conditions, container) {
	for (var condition in conditions) {
		if (condition == undefined || condition == '' || !CONDITIONS[condition].hasConditionCard) continue;
		var conditionImage = $('<img>');
		conditionImage.attr('src', 'images/conditions_cards/' + urlize(condition) + '.png').addClass('condition');
		container.append(conditionImage);
	}
}

function getConditions(container) {
	var conditions = $(container).find('[name="condition-title"]');
	var conditionsObject = {};
	for (var i = 0; i < conditions.length; i++) {
		var condition = $(conditions[i]).val();
		if (conditionsObject[condition] == undefined) {
			conditionsObject[condition] = 1;
		} else {
			conditionsObject[condition] += 1;
		}
	}
	return conditionsObject;
}

function updateCondition(element, value) {
	if (value == 'Marked') {
		value = 'Tracked';
	}
	var container = $(element).parents('.select-row');
	var id = $(element).parents('.select-condition').attr('id');
	container.find('#' + id + ' .condition-title').html(value + ' ');
	container.find('#input' + id).attr('value',value);
	var conditionsContainer = container.find('.conditions-container');
	if (container.parents('#monsters').length > 0) {
		adjustMonsterList();
	} else {
		conditionsContainer.html('');
		addConditions(getConditions(container), conditionsContainer);
	}
}

function removeCondition(element) {
	var container = $(element).parents('.select-row');
	var conditionSelect = $(element).parents('.select-condition');
	var id = conditionSelect.attr('id');
	conditionSelect.remove();
	$('#input' + id).remove();
	if (container.parents('#monsters').length > 0) {
		adjustMonsterList();
	} else {
		container.find('.conditions-container').html('');
		addConditions(getConditions(container), conditionsContainer);
	}
}

function removeRow(element) {
	$(element).parents('.select-row').remove();
}

function getAlphabetChar(number) {
	var result = '';
	if (number >= 26) {
		result += ALPHABET.charAt(Math.floor(number/26) - 1);
	}
	return result += ALPHABET.charAt(number%26);
}

function createYSelectContent(oneCellOnly) {
	var html = addOption('Clear', '', 'updateCoordinate(this, \'Clear\');');
	for (var i = 0; i <= mapHeight; i++) {
		html += addOption(i.toString(), 'oneCell', 'updateCoordinate(this, \'1' + i.toString() + '\');');
		if (i <= mapHeight-1 && !oneCellOnly)
			html += addOption(i.toString() + '-' + (i+1).toString(), 'twoCells', 'updateCoordinate(this, \'2' + i.toString() + '\');');
		if (i <= mapHeight-2 && !oneCellOnly)
			html += addOption(i.toString() + '-' + (i+2).toString(), 'threeCells', 'updateCoordinate(this, \'3' + i.toString() + '\');');
	}
	return html;
}

function createXSelectContent(oneCellOnly) {
	var html = addOption('Clear', '', 'updateCoordinate(this, \'Clear\');');
	for (var i = 1; i <= mapWidth; i++) {
		html += addOption(getAlphabetChar(i-1), 'oneCell', 'updateCoordinate(this, \'1' + i.toString() + '\');');
		if (i <= mapWidth-1 && !oneCellOnly)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i), 'twoCells', 'updateCoordinate(this, \'2' + i.toString() + '\');');
		if (i <= mapWidth-2 && !oneCellOnly)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i+1), 'threeCells', 'updateCoordinate(this, \'3' + i.toString() + '\');');
	}
	return html;
}

function createDirectionSelectContent() {
	var html = addOption('Clear', '', 'clearDirection(this);');
	html += addOption('horizontal ', '', 'updateDirection(this, \'horizontal\')');
	html += addOption('vertical ', '', 'updateDirection(this, \'vertical\')');
	return html;
}

function recoverConfig(Base64Data) {
	var dataTemp = JSON.parse(Base64.decode(Base64Data));
	dataTemp = RetroCompatibility(dataTemp);

	return dataTemp;
}

function RetroCompatibility(OldConfig) {
	//update Recovered config based on Version
	var AndOlder = false
	var NewConfig = OldConfig

	//initialize values if needed
	if (NewConfig.currentAct == undefined) {
		NewConfig.currentAct = 'I';
	}

	// previous to 1.5.0
	if (NewConfig.mapVersion == undefined) {
		//change monsters data
		// FROM "title":"Wraith","master":true TO "title":"Wraith master"
		// AND FROM "title":"Wraith","master":false TO "title":"Wraith minion"
		if (NewConfig.monsters != undefined) {
			for (var i = 0; NewConfig.monsters != undefined && i < NewConfig.monsters.length; i++) {
				if (NewConfig.monsters[i].master) {
					NewConfig.monsters[i].title = NewConfig.monsters[i].title + " master";
				}
				else {
					NewConfig.monsters[i].title = NewConfig.monsters[i].title + " minion";
				}
				delete NewConfig.monsters[i].master;
//				if (monster.vertical) folder += 'vertical/';
//				if (monster.direction == "V") folder += 'vertical/';

			}
		}

		//change Doors Direction
		// FROM "vertical":true TO "direction":"V"
		// FROM "vertical":false TO "direction":"H"
		if (NewConfig.doors != undefined) {
			for (var i = 0; NewConfig.doors != undefined && i < NewConfig.doors.length; i++) {
				if (NewConfig.doors[i].vertical) {
					NewConfig.doors[i].direction = "V";
				}
				else {
					NewConfig.doors[i].direction = "H";
				}
				delete NewConfig.doors[i].vertical;
			}
		}

		//change Act
		// FROM "actOne":true TO "currentAct":"I"
		// FROM "actOne":false TO "currentAct":"II"
		if (NewConfig.actOne != undefined) {
			if (NewConfig.actOne) {
				NewConfig.currentAct = "I";
			}
			else {
				NewConfig.currentAct = "II";
			}
			delete NewConfig.actOne;
		}

		//change xs set default color to red
		if (NewConfig.xs != undefined) {
			for (var i = 0; NewConfig.xs != undefined && i < NewConfig.xs.length; i++) {
				if (NewConfig.xs[i].title == "1x1") {
					NewConfig.xs[i].title = NewConfig.xs[i].title + " red";
				}
				if (NewConfig.xs[i].title == "2x2") {
					NewConfig.xs[i].title = NewConfig.xs[i].title + " red";
				}
			}
		}

		//change Familiars name
		for (var i = 0; NewConfig.familiars != undefined && i < NewConfig.familiars.length; i++) {
			if (NewConfig.familiars[i].title == 'Raven') {
				NewConfig.familiars[i].title = 'Raven Flock';
			}
			if (NewConfig.familiars[i].title == 'Shadow') {
				NewConfig.familiars[i].title = 'Shadow Soul';
			}
		}


		AndOlder = true;
	}


	// previous to 1.5.1
	if (NewConfig.mapVersion == "1.5.0" || AndOlder==true) {
		//wording changes
		for (var i=1; i <= 4; i++) {
			var heroConfig = NewConfig['hero' + i.toString()];
			if (heroConfig != undefined && heroConfig.title != "" && heroConfig.title != undefined) {
				if (heroConfig.items != undefined) {
					if (heroConfig.items.hand != undefined) {
						if (heroConfig.items.hand == 'Mist Bane') {
							heroConfig.items.hand = 'Mistbane';
						}
					}
					if (heroConfig.items.hand2 != undefined) {
						if (heroConfig.items.hand2 == 'Mist Bane') {
							heroConfig.items.hand2 = 'Mistbane';
						}
					}
					if (heroConfig.items.item != undefined) {
						if (heroConfig.items.item == 'Lucky Charm ') {
							heroConfig.items.item = 'Lucky Charm';
						}
					}
					if (heroConfig.items.item2 != undefined) {
						if (heroConfig.items.item2 == 'Lucky Charm ') {
							heroConfig.items.item2 = 'Lucky Charm';
						}
					}
				}
				if (heroConfig.sack != undefined) {
					for (var j = 0; j < heroConfig.sack.length; j++) {
						if (heroConfig.sack[j] == 'Lucky Charm ') {
							heroConfig.sack[j] = 'Lucky Charm';
						}
						if (heroConfig.sack[j] == 'Mist Bane') {
							heroConfig.sack[j] = 'Mistbane';
						}
					}
				}
				if (heroConfig.skills != undefined) {
					for (var j = 0; j < heroConfig.skills.length; j++) {
						if (heroConfig.skills[j] == 'Bushwack') {
							heroConfig.skills[j] = 'Bushwhack';
						}
					}
				}
			}
		}

		if (NewConfig.overlord != undefined) {
			for (var i = 0; NewConfig.overlord.cards != undefined && i < NewConfig.overlord.cards.length; i++) {
				if (NewConfig.overlord.cards[i] == 'Dance Macabre') {
					NewConfig.overlord.cards[i] = 'Danse Macabre';
				}
			}
		}
		if (NewConfig.plot != undefined) {
			if (NewConfig.plot.title != undefined && NewConfig.plot.title != '') {
				for (var i = 0; i < NewConfig.plot.cards.length; i++) {
					if (NewConfig.plot.cards[i] == 'Loyality Rewarded') {
						NewConfig.plot.cards[i] = 'Loyalty Rewarded';
					}
				}
			}
		}

		AndOlder = true;
	}
	// previous to 1.5.2
	if (NewConfig.mapVersion == "1.5.1" || AndOlder==true) {
		//rename objectives to maptokens
		NewConfig.maptokens = NewConfig.objectives;
		delete NewConfig.objectives;

		//change hp to ci[0] and stamina to ci[1]

		for (var i = 0; NewConfig.monsters != undefined && i < NewConfig.monsters.length; i++) {
			NewConfig.monsters[i].ci = [];
			NewConfig.monsters[i].ci[0] = NewConfig.monsters[i].hp;
			delete NewConfig.monsters[i].hp;
		}
		for (var i = 0; NewConfig.lieutenants != undefined && i < NewConfig.lieutenants.length; i++) {
			NewConfig.lieutenants[i].ci = [];
			NewConfig.lieutenants[i].ci[0] = NewConfig.lieutenants[i].hp;
			delete NewConfig.lieutenants[i].hp;
		}
		for (var i = 0; NewConfig.agents != undefined && i < NewConfig.agents.length; i++) {
			NewConfig.agents[i].ci = [];
			NewConfig.agents[i].ci[0] = NewConfig.agents[i].hp;
			delete NewConfig.agents[i].hp;
		}
		for (var i = 1; i <= 4; i++) {
			var heroConfig = NewConfig['hero' + i.toString()];
			heroConfig.ci = [];
			heroConfig.ci[0] = heroConfig.hp;
			heroConfig.ci[1] = heroConfig.stamina;
			delete heroConfig.hp;
			delete heroConfig.stamina;
		}

		for (var i = 0; NewConfig.familiars != undefined && i < NewConfig.familiars.length; i++) {
			NewConfig.familiars[i].ci = [];
			NewConfig.familiars[i].ci[0] = NewConfig.familiars[i].hp;
			delete NewConfig.familiars[i].hp;
		}
		for (var i = 0; NewConfig.allies != undefined && i < NewConfig.allies.length; i++) {
			NewConfig.allies[i].ci = [];
			NewConfig.allies[i].ci[0] = NewConfig.allies[i].hp;
			delete NewConfig.allies[i].hp;
		}
		for (var i = 0; NewConfig.villagers != undefined && i < NewConfig.villagers.length; i++) {
			NewConfig.villagers[i].ci = [];
			NewConfig.villagers[i].ci[0] = NewConfig.villagers[i].hp;
			delete NewConfig.villagers[i].hp;
		}
		for (var i = 0; NewConfig.maptokens != undefined && i < NewConfig.maptokens.length; i++) {
			NewConfig.maptokens[i].ci = [];
			NewConfig.maptokens[i].ci[0] = NewConfig.maptokens[i].hp;
			delete NewConfig.maptokens[i].hp;
		}

		AndOlder = true;
	}

	return NewConfig;
}

function rebuildMap(element, mapNb) {
	var mapConfig = recoverConfig(MAP_HASES_LIST[mapNb][3]);



	config.tiles = mapConfig.tiles;
	config.doors = mapConfig.doors;
	config.xs = mapConfig.xs;
	config.monsters = mapConfig.monsters;
	config.lieutenants = mapConfig.lieutenants;
	config.allies = mapConfig.allies;
	config.villagers = mapConfig.villagers;
	config.maptokens = mapConfig.maptokens;
	config.currentAct = mapConfig.currentAct;
	config.questObjectives = mapConfig.questObjectives;
	config.monsterTraits = mapConfig.monsterTraits;

	clearAllies();
	clearVillagers();
//	clearLieutenants();

	updateAct(config.currentAct);
	FillWindow_QuestObjectives(config, true);
	FillWindow_MapDesign(config, true);
	FillWindow_OLFigures(config, true);
	FillWindow_Familiars(config, true)
	FillWindow_MapTokens(config, true);

	switchToMap();
	UnSet_Campaign(element);
}

function clearHeroesConditions() {
	$('.select-condition').remove();
	$('[name="condition-title"]').remove();
}

function addCondition(button) {
	var condition = $(createInputSelect('Select token', 'condition-title', 'select-condition')).attr('id', 'condition' + conditionNumber.toString());
	condition.find('ul').append(createConditionSelectContent());
	var buttonObject = $(button);
	buttonObject.before(condition);
	buttonObject.before('<input type="hidden" name="condition-title" id="inputcondition' + conditionNumber.toString() + '" value=""/>');
	conditionNumber += 1;
	return condition;
}

function addUnitLine(line, title) {
	line.addClass('select-row');

	line.append(createInputSelect('Select ' + title, folderize(title).toLowerCase() + '-title', 'select-' + folderize(title).toLowerCase()));
	line.append(createInputSelect('Select X coordinate', 'x-title', 'select-x'));
	line.append(createInputSelect('Select Y coordinate', 'y-title', 'select-y'));
	line.append(Create_CustomInput(0));
	line.append($('<input type="hidden" name="' + folderize(title).toLowerCase() + '-title" value=""/>'));
	line.append($('<input type="hidden" name="' + folderize(title).toLowerCase() + '-x" value=""/>'));
	line.append($('<input type="hidden" name="' + folderize(title).toLowerCase() + '-y" value=""/>'));
}

function addHpInput(element) {
	var elementObject = $(element);
	elementObject.before('<input type="text" name="hp" class="form-control" placeholder="Set HP" value=""/>');
	elementObject.before('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeHpInput(this);">Remove HP</button>');
	elementObject.remove();
}

function removeHpInput(element) {
	var elementObject = $(element);
	elementObject.parents('.select-row').find('input[name="hp"]').remove();
	elementObject.before('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addHpInput(this);">Add HP</button>');
	elementObject.remove();
}

function createConditionsBlock() {
	return $('<div>').addClass('conditions-container');
}

function createInputSelect(title, titleClass, additionalClass) {
	var select = $('<div>').addClass('btn-group').addClass(additionalClass);
	var button = $('<button>').attr('type','button').addClass('btn btn-default dropdown-toggle').attr('data-toggle','dropdown').attr('aria-expanded','false');
	button.append($('<span>' + title + ' </span>').addClass(titleClass)).append($('<span>').addClass('caret'));
	select.append(button).append($('<ul>').addClass('dropdown-menu').attr('role','menu'));
	return select;
}

function populate() {
	collectData();
	updateConfig();
	constructMapFromConfig();
}

function addMapObject(xCoordinate, yCoordinate, object, priority) {
	var coordinateObjects = mapObjects[[xCoordinate, yCoordinate]];
	if (coordinateObjects == undefined) {
		coordinateObjects = mapObjects[[xCoordinate, yCoordinate]] = [];
	}
	coordinateObjects.push({"object":object, "priority": priority});
}

function constructMapFromConfig() {
	var mapContainer = $('#map');
    var map = mapContainer.find('.map');
    var figures = mapContainer.find('.figures');
    map.html('');
    figures.html('');
	mapObjects = [];

	for (var i = 0; config.tiles != undefined && i < config.tiles.length; i++) {
		var tile = config.tiles[i];
		var tileObject = $('<div>');
		var tileImage = $('<img>');
		var folder = 'images/map_tiles/';
		var angle = tile.angle;
		if (angle == 90 || angle == 270){
			folder += 'vertical/';
			angle -= 90;
		}
		tileObject.css({
			'position' : 'absolute',
			'left' : (tile.x * HCellSize).toString() + 'px',
			'top' : (tile.y * VCellSize).toString() + 'px'
		});
		tileImage.css({
			'-ms-transform' : 'rotate(' + angle + 'deg)',
		    '-webkit-transform' : 'rotate(' + angle + 'deg)',
		    'transform' : 'rotate(' + angle + 'deg)'
		});
		tileImage.attr('src', folder + mapTilize(tile.title) + tile.side + '.png');
		tileObject.append(tileImage);
        map.append(tileObject);
	}

	for (var i = 0; config.doors != undefined && i < config.doors.length; i++) {
		var door = config.doors[i];
		var doorObject = $('<div>');
		var doorImage = $('<img>');
		var folder = 'images/doors/';
		doorObject.css({
			'position' : 'absolute',
			'left' : (door.x * HCellSize).toString() + 'px',
			'top' : (door.y * VCellSize).toString() + 'px'
		});
		if (door.vertical) {
			doorImage.css({
				'-ms-transform' : 'rotate(90deg)',
				'-webkit-transform' : 'rotate(90deg)',
				'transform' : 'rotate(90deg)',
				'transform-origin' : HCellSize.toString() + 'px'
			});
		}
		if (door.direction == "V") {
			doorImage.css({
				'-ms-transform' : 'rotate(90deg)',
				'-webkit-transform' : 'rotate(90deg)',
				'transform' : 'rotate(90deg)',
				'transform-origin' : HCellSize.toString() + 'px'
			});
		}
		if (door.opened != undefined && door.opened) {
			doorObject.addClass('opened');
		}
		doorImage.attr('src', folder + urlize(door.title) + '.png');
		doorObject.append(doorImage);
        map.append(doorObject);
	}

	for (var i = 0; config.xs != undefined && i < config.xs.length; i++) {
		var xs = config.xs[i];
		var xsObject = $('<div>');
		var xsImage = $('<img>');
		var folder = 'images/blocks/';
		xsObject.css({
			'position' : 'absolute',
			'left' : (xs.x * HCellSize).toString() + 'px',
			'top' : (xs.y * VCellSize).toString() + 'px'
		});
		xsImage.attr('src', folder + urlize(xs.title) + '.png');
		xsObject.append(xsImage);
        map.append(xsObject);
	}

	for (var i = 0; config.maptokens != undefined && i < config.maptokens.length; i++) {
		var objective = config.maptokens[i];
		var objectiveObject = $('<div>');
		var objectiveImage = $('<img>');
		var folder = 'images/misc/';
		var z_index = 0;
		objectiveObject.css({
			'position' : 'absolute',
			'left' : (objective.x * HCellSize).toString() + 'px',
			'top' : (objective.y * VCellSize).toString() + 'px',
			'z-index' : z_index
		});
		objectiveImage.attr('src', folder + urlize(objective.title) + '.png');
		objectiveObject.append(objectiveImage);
		if (objective.ci != undefined) {
			for (j = 0; j < MAX_CustomInputs; j++) {
				if (objective.ci[j] != undefined) {
					var objectiveCustomInputTemp = $('<div>').addClass('ci' + j);	
					objectiveCustomInputTemp.html((objective.ci == undefined || objective.ci[j] == undefined) ? '' : objective.ci[j].toString());
					objectiveObject.append(objectiveCustomInputTemp);
				}
			}
		}
		addMapObject(objective.x, objective.y, objectiveObject, z_index);
        map.append(objectiveObject);
	}

	for (var i = 0; config.familiars != undefined && i < config.familiars.length; i++) {
		var familiar = config.familiars[i];
		var familiarObject = $('<div>');
		var familiarImage = $('<img>');
		var folder = 'images/familiars_tokens/';
		var z_index = 1;
		familiarObject.css({
			'position' : 'absolute',
			'left' : (familiar.x * HCellSize).toString() + 'px',
			'top' : (familiar.y * VCellSize).toString() + 'px',
			'z-index' : z_index
		});
		familiarImage.attr('src', folder + urlize(familiar.title) + '.png');
		familiarObject.append(familiarImage);
		if (familiar.ci != undefined) {
			for (j = 0; j < MAX_CustomInputs; j++) {
				if (familiar.ci[j] != undefined) {
					var familiarCustomInputTemp = $('<div>').addClass('ci' + j);			//HP
					familiarCustomInputTemp.html((familiar.ci == undefined || familiar.ci[j] == undefined) ? '' : familiar.ci[j].toString());
					familiarObject.append(familiarCustomInputTemp);
				}
			}
		}
		addConditionsToImage(familiarObject, familiar.conditions);
		addMapObject(familiar.x, familiar.y, familiarObject, z_index);
        figures.append(familiarObject);
	}

	for (var i = 0; config.villagers != undefined && i < config.villagers.length; i++) {
		var villager = config.villagers[i];
		var villagerObject = $('<div>');
		var villagerImage = $('<img>');
		var folder = 'images/familiars_tokens/';
		var z_index = 1;
		villagerObject.css({
			'position' : 'absolute',
			'left' : (villager.x * HCellSize).toString() + 'px',
			'top' : (villager.y * VCellSize).toString() + 'px',
			'z-index' : z_index
		});
		villagerImage.attr('src', folder + urlize(villager.title) + '.png');
		villagerObject.append(villagerImage);
		if (villager.ci != undefined) {
			for (j = 0; j < MAX_CustomInputs; j++) {
				if (villager.ci[j] != undefined) {
					var villagerCustomInputTemp = $('<div>').addClass('ci' + j);
					villagerCustomInputTemp.html((villager.ci == undefined || villager.ci[j] == undefined) ? '' : villager.ci[j].toString());
					villagerObject.append(villagerCustomInputTemp);
				}
			}
		}
		addConditionsToImage(villagerObject, villager.conditions);
		addMapObject(villager.x, villager.y, villagerObject, z_index);
        figures.append(villagerObject);
	}

	for (var i = 0; config.monsters != undefined && i < config.monsters.length; i++) {
		var monster = config.monsters[i];
		var monsterObject = $('<div>');
		var monsterImage = $('<img>');
		var z_index = 2;
		var folder = 'images/monster_tokens/';
		if (monster.vertical) folder += 'vertical/';
		if (monster.direction == "V") folder += 'vertical/';
		monsterObject.css({
			'position' : 'absolute',
			'left' : (monster.x * HCellSize).toString() + 'px',
			'top' : (monster.y * VCellSize).toString() + 'px',
			'z-index' : z_index
		});

		if (monster.auras != undefined) {
			for (var j = 0; j < monster.auras.length; j++) {
				var aura = $('<div>');
				var auraRadius = parseInt(monster.auras[j].radius);

				var xDelta;
				var yDelta;
				if (monster.vertical) {
					xDelta = MONSTERS[monster.title.replace(' master','').replace(' minion','')].width;
					yDelta = MONSTERS[monster.title.replace(' master','').replace(' minion','')].height;
					}
				else {
					xDelta = MONSTERS[monster.title.replace(' master','').replace(' minion','')].height;
					yDelta = MONSTERS[monster.title.replace(' master','').replace(' minion','')].width;
					}
				if (monster.direction == "V") {
					xDelta = MONSTERS[monster.title.replace(' master','').replace(' minion','')].width;
					yDelta = MONSTERS[monster.title.replace(' master','').replace(' minion','')].height;
					}
				else {
					xDelta = MONSTERS[monster.title.replace(' master','').replace(' minion','')].height;
					yDelta = MONSTERS[monster.title.replace(' master','').replace(' minion','')].width;
					}

				aura.css({
					'position' : 'absolute',
					'left' : '-' + (auraRadius * HCellSize).toString() + 'px',
					'top' : '-' + (auraRadius * VCellSize).toString() + 'px',
					'width' : ((2 * auraRadius + xDelta) * HCellSize).toString() + 'px',
					'height' : ((2 * auraRadius + yDelta) * VCellSize).toString() + 'px',
					'background' : monster.auras[j].color,
					'opacity' : '0.2',
					'border-radius': ((HCellSize + VCellSize) / 4).toString() + 'px'
				});
				monsterObject.append(aura);
			}
		}
		monsterImage.attr('src', folder + urlize(monster.title.replace(' master','').replace(' minion','')) + ((monster.master || monster.title.indexOf(" master") > 0) ? '_master.png' : '.png'));
		monsterObject.append(monsterImage);
		if (monster.ci != undefined) {
			for (j = 0; j < MAX_CustomInputs; j++) {
				//0 -> HP
				if (monster.ci[j] != undefined) {
					var monsterCustomInputTemp = $('<div>').addClass('ci' + j);
					monsterCustomInputTemp.html((monster.ci == undefined || monster.ci[j] == undefined) ? '' : monster.ci[j].toString());
					monsterObject.append(monsterCustomInputTemp);
				}
			}
		}
		if (monsterLine.needAddTokenButton == true) {
			addConditionsToImage(monsterObject, monster.conditions);
		}
		addMapObject(monster.x, monster.y, monsterObject, z_index);
        figures.append(monsterObject);
	}

	for (var i = 0; config.allies != undefined && i < config.allies.length; i++) {
		var ally = config.allies[i];
		var allyObject = $('<div>');
		var allyImage = $('<img>');
		var folder = 'images/allies_tokens/';
		var z_index = 2;
		allyObject.css({
			'position' : 'absolute',
			'left' : (ally.x * HCellSize).toString() + 'px',
			'top' : (ally.y * VCellSize).toString() + 'px',
			'z-index' : z_index
		});
		allyImage.attr('src', folder + urlize(ally.title) + '.png');
		allyObject.append(allyImage);
		if (ally.ci != undefined) {
			for (j = 0; j < MAX_CustomInputs; j++) {
				//0 -> HP
				if (ally.ci[j] != undefined) {
					var allyCustomInputTemp = $('<div>').addClass('ci' + j);
					allyCustomInputTemp.html((ally.ci == undefined || ally.ci[j] == undefined) ? '' : ally.ci[j].toString());
					allyObject.append(allyCustomInputTemp);
				}
			}
		}
		if (allyLine.needAddTokenButton == true) {
			addConditionsToImage(allyObject, ally.conditions);
		}
		addMapObject(ally.x, ally.y, allyObject, z_index);
        figures.append(allyObject);
	}

	for (var i = 0; config.lieutenants != undefined && i < config.lieutenants.length; i++) {
		var lieutenant = config.lieutenants[i];
		var lieutenantObject = $('<div>');
		var lieutenantImage = $('<img>');
		var folder = 'images/monster_tokens/';
		var z_index = 2;
		if (lieutenant.vertical != undefined && lieutenant.vertical) folder += 'vertical/';
		if (lieutenant.direction == "V") folder += 'vertical/';
		lieutenantObject.css({
			'position' : 'absolute',
			'left' : (lieutenant.x * HCellSize).toString() + 'px',
			'top' : (lieutenant.y * VCellSize).toString() + 'px',
			'z-index' : z_index
		});

		if (lieutenant.auras != undefined) {
			for (var j = 0; j < lieutenant.auras.length; j++) {
				var aura = $('<div>');
				var auraRadius = parseInt(lieutenant.auras[j].radius);

				var xDelta;
				var yDelta;
				if (lieutenant.vertical) {
					xDelta = LIEUTENANTS[lieutenant.title].width;
					yDelta = LIEUTENANTS[lieutenant.title].height;
					}
				else {
					xDelta = LIEUTENANTS[lieutenant.title].height;
					yDelta = LIEUTENANTS[lieutenant.title].width;
					}
				if (lieutenant.direction == "V") {
					xDelta = LIEUTENANTS[lieutenant.title].width;
					yDelta = LIEUTENANTS[lieutenant.title].height;
					}
				else {
					xDelta = LIEUTENANTS[lieutenant.title].height;
					yDelta = LIEUTENANTS[lieutenant.title].width;
					}

				aura.css({
					'position' : 'absolute',
					'left' : '-' + (auraRadius * HCellSize).toString() + 'px',
					'top' : '-' + (auraRadius * VCellSize).toString() + 'px',
					'width' : ((2 * auraRadius + xDelta) * HCellSize).toString() + 'px',
					'height' : ((2 * auraRadius + yDelta) * VCellSize).toString() + 'px',
					'background' : lieutenant.auras[j].color,
					'opacity' : '0.2',
					'border-radius': ((HCellSize + VCellSize) / 4).toString() + 'px'
				});
				lieutenantObject.append(aura);
			}
		}
		lieutenantImage.attr('src', folder + urlize(lieutenant.title) + '.png');
		lieutenantObject.append(lieutenantImage);
		if (lieutenant.ci != undefined) {
			for (j = 0; j < MAX_CustomInputs; j++) {
				//0 -> HP
				if (lieutenant.ci[j] != undefined) {
					var lieutenantCustomInputTemp = $('<div>').addClass('ci' + j);
					lieutenantCustomInputTemp.html((lieutenant.ci == undefined || lieutenant.ci[j] == undefined) ? '' : lieutenant.ci[j].toString());
					lieutenantObject.append(lieutenantCustomInputTemp);
				}
			}
		}
		addConditionsToImage(lieutenantObject, lieutenant.conditions);
		addMapObject(lieutenant.x, lieutenant.y, lieutenantObject, z_index);
        figures.append(lieutenantObject);
	}

	for (var i = 0; config.agents != undefined && i < config.agents.length; i++) {
		var agent = config.agents[i];
		var agentObject = $('<div>');
		var agentImage = $('<img>');
		var folder = 'images/monster_tokens/';
		var z_index = 2;
		if (agent.vertical != undefined && agent.vertical) folder += 'vertical/';
		if (agent.direction == "V") folder += 'vertical/';
		agentObject.css({
			'position' : 'absolute',
			'left' : (agent.x * HCellSize).toString() + 'px',
			'top' : (agent.y * VCellSize).toString() + 'px',
			'z-index' : z_index
		});

		if (agent.auras != undefined) {
			for (var j = 0; j < agent.auras.length; j++) {
				var aura = $('<div>');
				var auraRadius = parseInt(agent.auras[j].radius);

				var xDelta;
				var yDelta;
				if (agent.vertical) {
					xDelta = LIEUTENANTS[agent.title].width;
					yDelta = LIEUTENANTS[agent.title].height;
					}
				else {
					xDelta = LIEUTENANTS[agent.title].height;
					yDelta = LIEUTENANTS[agent.title].width;
					}
				if (lieutenant.direction == "V") {
					xDelta = LIEUTENANTS[agent.title].width;
					yDelta = LIEUTENANTS[agent.title].height;
					}
				else {
					xDelta = LIEUTENANTS[agent.title].height;
					yDelta = LIEUTENANTS[agent.title].width;
					}

				aura.css({
					'position' : 'absolute',
					'left' : '-' + (auraRadius * HCellSize).toString() + 'px',
					'top' : '-' + (auraRadius * VCellSize).toString() + 'px',
					'width' : ((2 * auraRadius + xDelta) * HCellSize).toString() + 'px',
					'height' : ((2 * auraRadius + yDelta) * VCellSize).toString() + 'px',
					'background' : agent.auras[j].color,
					'opacity' : '0.2',
					'border-radius': ((HCellSize + VCellSize) / 4).toString() + 'px'
				});
				agentObject.append(aura);
			}
		}
		agentImage.attr('src', folder + urlize(agent.title.replace('Agent ', '')) + '.png');
		agentObject.append(agentImage);
		if (agent.ci != undefined) {
			for (j = 0; j < MAX_CustomInputs; j++) {
				//0 -> HP
				if (agent.ci[j] != undefined) {
					var agentCustomInputTemp = $('<div>').addClass('ci' + j);
					agentCustomInputTemp.html((agent.ci == undefined || agent.ci[j] == undefined) ? '' : agent.ci[j].toString());
					agentObject.append(agentCustomInputTemp);
				}
			}
		}
		addConditionsToImage(agentObject, agent.conditions);
		addMapObject(agent.x, agent.y, agentObject, z_index);
        figures.append(agentObject);
	}

	addHeroToMap(config.hero1);
	addHeroToMap(config.hero2);
	addHeroToMap(config.hero3);
	addHeroToMap(config.hero4);

	adjustOverlappingImages();

	setShortLink();
}

function getConditionsArrayFromObjectOrArray(conditions) {
	var result = [];
	if (conditions.length == undefined) {
		for (var condition in conditions) {
			if (condition == undefined || condition == "") continue;
			for (var i = 0; i < conditions[condition] && (i == 0 || !CONDITIONS[condition].hasConditionCard); i++) {
				result.push(condition);
			}
		}
	} else {
		result = conditions;
	}
	return result;
}

function addConditionsToImage(sourcesObject, sourceConfig) {
	var conditions = $('<div>').addClass('conditions');
	var updatedSourceConfig = getConditionsArrayFromObjectOrArray(sourceConfig);
	var interval = updatedSourceConfig != undefined && updatedSourceConfig.length > 3 ? Math.floor(50 / updatedSourceConfig.length) : 20;
	for (var j = 0; updatedSourceConfig != undefined && j < updatedSourceConfig.length; j++) {
		var conditionObject = $('<img>').attr('src', 'images/conditions_tokens/' + urlize(updatedSourceConfig[j]) + '.png');
		if (j > 0) conditionObject.css({
			'position' : 'absolute',
			'top' : (interval * j).toString() + 'px'
		});
		conditions.append(conditionObject);
	}
	sourcesObject.append(conditions);
}

function addHeroToMap(hero) {
	if (hero.title == '' || hero.title == undefined) return;
	var heroObject = $('<div>');
	var heroImage = $('<img>');
	var z_index = 2;
	var folder = 'images/heroes_tokens/';
	heroObject.css({
		'position' : 'absolute',
		'left': (hero.x * HCellSize).toString() + 'px',
		'top' : (hero.y * VCellSize).toString() + 'px',
		'z-index' : z_index
	});
	heroImage.attr('src', folder + urlize(hero.title) + '.png');
	if (hero.aura != undefined) {
		var aura = $('<div>');
		var auraRadius = parseInt(hero.aura.radius);
		aura.css({
			'position' : 'absolute',
			'left': '-' + (auraRadius * HCellSize).toString() + 'px',
			'top' : '-' + (auraRadius * VCellSize).toString() + 'px',
			'width': ((2 * auraRadius + 1) * HCellSize).toString() + 'px',
			'height' : ((2 * auraRadius + 1) * VCellSize).toString() + 'px',
			'background' : hero.aura.color,
			'opacity' : '0.2',
			'border-radius': ((HCellSize + VCellSize) / 4).toString() + 'px'
		});
		heroObject.append(aura);
	}
	heroObject.append(heroImage);
	if (hero.ci != undefined) {
		for (j = 0; j < MAX_CustomInputs; j++) {
			//0 -> HP
			//1 -> Fatigue
			if (hero.ci[j] != undefined) {
				var heroCustomInputTemp = $('<div>').addClass('ci' + j);
				heroCustomInputTemp.html((hero.ci == undefined || hero.ci[j] == undefined) ? '' : hero.ci[j].toString());
				heroObject.append(heroCustomInputTemp);
				if (j==0 && hero.ci[j] == 0) heroObject.addClass('secondary');	//drowned
			}
		}
	}
	addConditionsToImage(heroObject, hero.conditions);
	addMapObject(hero.x, hero.y, heroObject, z_index);
	$('#map .figures').append(heroObject);
}

function adjustOverlappingImages() {
	for (var coordinate in mapObjects) {
		var tileObjects = mapObjects[coordinate];
		if (tileObjects == undefined || tileObjects.length == undefined || tileObjects.length <= 1) {
			continue;
		}
		tileObjects.sort(function (a, b) {
			  return a.priority - b.priority;
			});
		for (var i = 0; i < tileObjects.length; i++) {
			var offset = 10 * (tileObjects.length - i - 1);
			var leftString = tileObjects[i].object.css('left');
			tileObjects[i].object.css('left', (parseInt(leftString.substring(0,leftString.length - 2)) + offset).toString() + "px");
			var topString = tileObjects[i].object.css('top');
			tileObjects[i].object.css('top', (parseInt(topString.substring(0,topString.length - 2)) + offset).toString() + "px");
		}
	}
}

function constructSettingsFromConfig() {
	updateAct(config.currentAct);
	FillWindow_QuestObjectives(config, false);
	FillWindow_MapDesign(config, false);
	FillWindow_OLFigures(config, false);

	constructHeroesTabsFromConfig();
	FillWindow_Familiars(config, false);

	FillWindow_MapTokens(config, false);

	constructOverlordCardsTabFromConfig();
	constructPlotDeckTabFromConfig();
	constructMapSize();
}

function constructMapSize() {
	if (config.mapWidth != undefined) {
		mapWidth = config.mapWidth;
	}
	if (config.mapHeight != undefined) {
		mapHeight = config.mapHeight;
	}
}

function updateConditionsInSettings(conditions, container) {
	var conditionsArray = getConditionsArrayFromObjectOrArray(conditions);
	for (var i = 0; i < conditionsArray.length; i++) {
		var condition = conditionsArray[i];
		updateCondition(addCondition(container.find('.btn-warning')).find('li')[0], condition);
	}
}

function updateConfig() {
	window.location.hash = Base64.encode(JSON.stringify(config));
}

function collectData() {
	config.mapVersion = MAPVERSION;
    config.mapGame = MAPGAME;
	config.currentAct = CurrentAct;
	config.expansions = selectedExpansions;
	config = GetWindow_QuestObjectives(config);
	config = GetWindow_MapDesign(config);
	config = GetWindow_OLFigures(config);
/*

	//config.lieutenants = getLieutenants();
	//config.agents = getAgents();
	//config.monsterTraits = monsterTraits;
	//var monsterRows = $('#monsters-container .select-row');
	//config.monsters = [];
	//for (var i = 0; i < monsterRows.length; i++) {
	//	config.monsters.push(monster(monsterRows[i]));
	//}
*/
	config.hero1 = hero($('#hero1 .select-row'));
	config.hero2 = hero($('#hero2 .select-row'));
	config.hero3 = hero($('#hero3 .select-row'));
	config.hero4 = hero($('#hero4 .select-row'));
	config = GetWindow_Familiars(config);
	config = GetWindow_MapTokens(config);

	config.overlord = {};
	config.overlord.cards = getOverlordCards();
	config.plot = getPlotInfo();
	config.mapWidth = mapWidth;
	config.mapHeight = mapHeight;
}

function drawGrid() {
	for (var i = 0; i < mapWidth; i++) {
		var element = $('<div>');
		element.html(getAlphabetChar(i));
		element.css({
				'position' : 'absolute',
				'left': ((1 + i) * HCellSize).toString() + 'px',
				'top' : '0'
		});
		$('.grid').append(element);
	}
	for (var i = 0; i <= mapHeight; i++) {
		var element = $('<div>');
		element.html(i.toString());
		element.css({
				'position' : 'absolute',
				'left' : '0',
				'top' : ((1 + i) * VCellSize).toString() + 'px'
		});
		$('.grid').append(element);
	}
}

function setShortLink() {
	var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		string = '',
		charCnt = 20,
		uri;
	for (var i = 0; i < charCnt; i += 1) {
		string += characters[Math.floor(Math.random() * characters.length)];
	}
	uri = 'https://tinyurl.com/create.php?source=indexpage&url=' + encodeURIComponent(location.href) + '&alias=' + string;
	$('body').append('<img src="' + uri + '" style="height: 1px; width: 1px; position: absolute; z-index: -999; opacity: 0;" />');
	var tinyUrl = $('#tinyUrl');
    tinyUrl.html('Tiny link: https://tinyurl.com/' + string);
    tinyUrl.attr('href', 'https://tinyurl.com/' + string);
}

function switchToMap() {
//	$('[href="#map"]').tab('show');
	$('[href="#map"]').click();
}

function clearAdditionalElements() {
	ResetWindow_MapDesign();
	ResetWindow_OLFigures();
	ResetWindow_MapTokens();
//	clearLieutenants();
//	clearAgents();
	clearHeroesSackAndSearchItems();
	clearHeroesConditions();
	ResetWindow_Familiars();
}

function updateMapSize() {
	mapWidth = $('[name="map-width"]').val();
	mapHeight = $('[name="map-height"]').val();
}

function setMapSizeFromConfig() {
	$('[name="map-width"]').val(mapWidth);
	$('[name="map-height"]').val(mapHeight);
}

function toggleMapControls() {
	$('.map-transformation div').toggle();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var target = $(ev.target);
    dropToken(target, data);
}

function dropToken(target, data) {
	var container = target.parents('.select-row');
	var dataWithoutHeroNumber = data.substring(0,data.length-1);
    target.after($('#' + data));
    container.find('.imagescontainer img').removeClass('has' + dataWithoutHeroNumber);
    target.addClass('has' + dataWithoutHeroNumber);
}


function LoadOneSubScripts(scriptFile){
	$.getScript(scriptFile);
	var script = document.createElement("script");
	script.src = scriptFile;
    document.head.appendChild(script);
}
function LoadSubScripts(){
	LoadOneSubScripts("scripts/base_functions.js");
	LoadOneSubScripts("scripts/cCoordinatesElements.js");
	LoadOneSubScripts("scripts/cLineElements.js");
	LoadOneSubScripts("scripts/cOtherElements.js");
	LoadOneSubScripts("scripts/constants.js");
	LoadOneSubScripts("scripts/00MapControls.js");
	LoadOneSubScripts("scripts/01QuestObjectives.js");
	LoadOneSubScripts("scripts/02MapDesign.js");
	LoadOneSubScripts("scripts/03OLFigures.js");
	LoadOneSubScripts("scripts/04Heroes.js");
	LoadOneSubScripts("scripts/08Familiers.js");
	LoadOneSubScripts("scripts/09OLCards.js");
	LoadOneSubScripts("scripts/10Tokens.js");
	LoadOneSubScripts("scripts/11PlotCards.js");
}

function getScripts(scripts, callback) {
	var progress = 0;
	scripts.forEach(function (script) {
		$.getScript(script, function () {
			if (++progress == scripts.length) callback();
		});
	});
}

function InitializeAllWindows() {
	Initialize_MapControls();

	InitializeWindowFor_QuestObjectives();
	InitializeWindowFor_MapDesign();
	InitializeWindowFor_OLFigures();
	//InitializeWindowFor_Heroes();
	InitializeWindowFor_Familiars();
	InitializeWindowFor_OLCards();
	InitializeWindowFor_MapTokens();
	//InitializeWindowFor_PlotCards();
}

$(function() {
	//LoadSubScripts();
	//getScripts([
	//	"scripts/base_functions.js"
	//	, "scripts/cCoordinatesElements.js"
	//	, "scripts/cLineElements.js"
	//	, "scripts/cOtherElements.js"
	//	, "scripts/constants.js"
	//	, "scripts/00MapControls.js"
	//	, "scripts/01QuestObjectives.js"
	//	, "scripts/02MapDesign.js"
	//	, "scripts/03OLFigures.js"
	//	, "scripts/04Heroes.js"
	//	, "scripts/08Familiers.js"
	//	, "scripts/09OLCards.js"
	//	, "scripts/10Tokens.js"
	//	, "scripts/11PlotCards.js"], function () {
	//	// do something...

	//});

	InitializeAllWindows();

	for (var i = 1; i <= 4; i++) {
		addHeroLine(i);
	}
	createOverlordCardsBlock();
	createPlotDeckBlock();



	// recover data / config
	if (window.location.hash != "") {
		//From URL
		config = recoverConfig(window.location.hash);
	} else {
		//From default config
		config = recoverConfig(defaultConfig);
	}
	constructSettingsFromConfig();
	constructMapFromConfig();
	drawGrid();
	setMapSizeFromConfig();

	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
	$('.tab-pane').append($('<div class="close" onclick="switchToMap();">x</div>'));
	$('#map').click(function() {
		switchToMap();
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { // esc keycode
			switchToMap();
		}
	});
});

