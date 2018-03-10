function createSelect(title) {
	return '<div class="btn-group select-x showOneCell showTwoCells"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + title + ' <span class="caret"></span></button><ul class="dropdown-menu" role="menu"></ul></div>';
}

function addOptionOld(title, value, optionClass) {
	return '<option class="' + optionClass + '" value="' + value + '">' + title + '</option>';
}

function addOption(title, optionClass, functionCallback, additionalAttribute, attributeValue) {
	//return '<li class="' + optionClass + '"><a href="#" onclick="' + functionCallback + '">' + title + '</a></li>';
	return '<li class="' + optionClass + '"' + (additionalAttribute != undefined ? ' ' + additionalAttribute + '="' + attributeValue + '"' : '') + '><a onclick="' + functionCallback + '">' + title + '</a></li>';
}

function updateMonstersVisibility() {
	monsterTraits = {};
	selectedExpansions = {};
	var traitInputs = $('#monster-traits input');
	var expansionInputs = $('#expansions input');
	for (var i = 0; i < traitInputs.length; i++) {
		if ($(traitInputs[i]).prop('checked')) {
			var checkedTrait = $(traitInputs[i]).attr('name');
			monsterTraits[checkedTrait] = checkedTrait;
		}
	}
	for (var i = 0; i < expansionInputs.length; i++) {
		if ($(expansionInputs[i]).prop('checked')) {
			var selectedExpansion = $(expansionInputs[i]).attr('name');
			selectedExpansions[selectedExpansion] = selectedExpansion;
		}
	}
	$('#monsters-container .select-monster li').css('display', 'none');
	for (var monsterTrait in monsterTraits) {
		for (var selectedExpansion in selectedExpansions) {
			if (monsterTraits[monsterTrait] == undefined || selectedExpansions[selectedExpansion] == undefined) continue;
			$('#monsters-container .' + monsterTrait + '.' + selectedExpansion).css('display', 'block');
		}
	}
}

function adjustMonsterList() {
	monsterList = [];
	var monsters = $('[name="monster-title"]');
	var monsterCardsContainer = $('#monsters-cards');
	monsterCardsContainer.html('');
	for (var i = 0; i < monsters.length; i++) {
		var title = $(monsters[i]).val();
		var inSet = false; //there is not Set in old browsers - thats why such a poor code is used
		for (var j = 0; j < monsterList.length && !inSet; j++) {
			if (monsterList[j] == title) {
				inSet = true;
			}
		}
		if (!inSet) {
			monsterList.push(title);
		}
	}
	var actAddition = actOne ? '_act1' : '_act2';
	for (var i = 0; i < monsterList.length; i++) {
		var monster = monsterList[i];
		if (monster == '') continue;
		var monsterCard = $('<img>');
		monsterCard.attr('src', 'images/monster_cards/' + urlize(monster) + actAddition + '.jpg');
		monsterCardsContainer.append(monsterCard);
		if (MONSTERS[monster].hasBack) {
			var monsterCardBack = $('<img>');
			monsterCardBack.attr('src', 'images/monster_cards/' + urlize(monster) + '_back' + actAddition + '.jpg');
			monsterCardsContainer.append(monsterCardBack);
		}
	}
	addConditions(getConditions($('#monsters')), monsterCardsContainer);
}

function addConditions(conditions, container) {
	for (var condition in conditions) {
		if (condition == undefined || condition == '' || !CONDITIONS[condition].hasConditionCard) continue;
		var conditionImage = $('<img>');
		conditionImage.attr('src', 'images/conditions_cards/' + urlize(condition) + '.jpg').addClass('condition');
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

function updateMonster(element, value) {
	updateOption(element, value, true);
	adjustMonsterList();
}

function updateCoordinate(element, value) {
	updateOption(element, value, false);
}

function updateOption(element, value, isMonster) {
	var container = $(element).parents('.select-row');
	if (isMonster || value == 'Clear') { //monster select or clearing cordinates
		var monsterTitle = $(element).html();
		container.find('input[name="master"]').attr('value', monsterTitle.indexOf('master') > -1);
		var xYSelects = $(container).find('.select-x, .select-y');
		
		if (isMonster) {
			var monsterHp;
			if (monsterTitle.indexOf('master') > -1) {
				if (actOne) {
					monsterHp = MONSTERS[value].masterHpActOne;
				} else {
					monsterHp = MONSTERS[value].masterHpActTwo;
				}
			} else {
				if (actOne) {
					monsterHp = MONSTERS[value].minionHpActOne;
				} else {
					monsterHp = MONSTERS[value].minionHpActTwo;
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
			container.find('input[name="tile-x"]').attr('value',selectedCoordinate);
			container.find('input[name="door-x"]').attr('value',selectedCoordinate);
			container.find('input[name="xs-x"]').attr('value',selectedCoordinate);
			container.find('input[name="ally-x"]').attr('value',selectedCoordinate);
			container.find('input[name="familiar-x"]').attr('value',selectedCoordinate);
			container.find('input[name="objective-x"]').attr('value',selectedCoordinate);
			container.find('input[name="lieutenant-x"]').attr('value',selectedCoordinate);
			container.find('input[name="monster-x-size"]').attr('value',selectedSize);
			container.find('.x-title').html($(element).html() + ' ');
			if (!parent.hasClass('squared')) {
				container.find('.select-y').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		} else {
			container.find('.y-title').html($(element).html() + ' ');
			container.find('input[name="monster-y"]').attr('value',selectedCoordinate);
			container.find('input[name="hero-y"]').attr('value',selectedCoordinate);
			container.find('input[name="tile-y"]').attr('value',selectedCoordinate);
			container.find('input[name="door-y"]').attr('value',selectedCoordinate);
			container.find('input[name="xs-y"]').attr('value',selectedCoordinate);
			container.find('input[name="ally-y"]').attr('value',selectedCoordinate);
			container.find('input[name="familiar-y"]').attr('value',selectedCoordinate);
			container.find('input[name="objective-y"]').attr('value',selectedCoordinate);
			container.find('input[name="lieutenant-y"]').attr('value',selectedCoordinate);
			container.find('input[name="monster-y-size"]').attr('value',selectedSize);
			if (!parent.hasClass('squared')) {
				container.find('.select-x').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		}
	}
}

function updateHero(element, value) {
	var container = $(element).parents('.select-row');

	container.find('.hero-title').html(value + ' ');
	container.find('input[name="hero-title"]').attr('value',value);
	container.find('input[name="hero-x"]').attr('value','');
	container.find('input[name="hero-y"]').attr('value','');
	container.find('input[name="hero-hp"]').val(HEROES[value].hp);
	container.find('input[name="hero-stamina"]').val(HEROES[value].stamina);
	container.find('.hero-image-container').children('img').attr('src', 'images/heroes_cards/' + urlize(value) + '.jpg');
	var heroId = container.parent().attr('id');
	var heroImage = $('<img>');
	heroImage.attr('src', 'images/heroes_tokens/' + urlize(value) + '.png');
	var heroMenuIcon = $('[href="#' + heroId + '"]');
	heroMenuIcon.html('');
	heroMenuIcon.append(heroImage);
	updateArchetype(element, HEROES[value].archetype.title);
}

function adjustHero(element, archetype) {
	var container = $(element).parents('.select-row');
	var heroTitle = container.find('input[name="hero-title"]').val();
	if (heroTitle != '' && HEROES[heroTitle].archetype.title != archetype) {
		clearHero(element);
	}
}

function clearHero(element) {
	var container = $(element).parents('.select-row');
	container.find('.hero-title').html('Select hero ');
	container.find('input[name="hero-title"]').attr('value','');
	container.children('img').attr('src', 'images/heroes_cards/default.jpg');
	var heroId = container.parent().attr('id');
	heroId = heroId.substring(0, 5);
	var heroMenuIcon = $('[href="#' + heroId + '"]');
	heroMenuIcon.html('');
	heroMenuIcon.append($('<img src="images/heroes_tokens/unknown.png"/>'));
}

function updateArchetype(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.archetype-title').html(value + ' ');
	container.find('input[name="archetype-title"]').attr('value',value);
	adjustClass(element, value);
	adjustHero(element, value);
}

function adjustArchetype(element, archetype) {
	var container = $(element).parents('.select-row');
	container.find('.select-archetype ul').removeClass(ARCHETYPE_CLASSES).addClass(archetype.toLowerCase());
}

function clearArchetype(element) {
	var container = $(element).parents('.select-row');
	container.find('.select-archetype ul').addClass(ARCHETYPE_CLASSES.toLowerCase());
	container.find('.archetype-title').html('Select archetype ');
	container.find('input[name="archetype-title"]').attr('value','');
	adjustClass(element, ARCHETYPE_CLASSES);
}

function updateClass(element, value, skipItems, hybrid) {
	if (hybrid == undefined) hybrid = false;
	var container = $(element).parents('.select-row');
	container.find(hybrid ? '.hybrid-class-title' : '.class-title').html(value + ' ');
	container.find(hybrid ? 'input[name="hybrid-class-title"]' : 'input[name="class-title"]').attr('value',value);
	var currentClass = CLASSES[value];
	if (hybrid == undefined || !hybrid) {
		adjustArchetype(element, currentClass.archetype.title);
	}
	adjustSkills(element, value, hybrid);
	adjustSkillsImages(element, hybrid);
	adjustItems(element, value, hybrid);
	if (skipItems == undefined || !skipItems) {
		var handUsed = false;
		var itemUsed = false;
		for (var i = 0; i < currentClass.skills.length; i++) {
			var skill = currentClass.skills[i];
			var itemType = skill[2];
			if (itemType != undefined) {
				switch (itemType) {
				case hand:
					updateHand(container.find('.select-weapon' + (handUsed ? '.second-select' : ':not(.second-select)') + ' li:not(.twohand).' + folderize(value) + ' a')[0], skill[0]);
					handUsed = true;
					break;
				case twohand:
					updateHand(container.find('.select-weapon' + (handUsed ? '.second-select' : ':not(.second-select)') + ' li.twohand.' + folderize(value) + ' a')[0], skill[0]);
					handUsed = true;
					break;
				case armor:
					updateArmor(container.find('.select-armor li.' + folderize(value) + ' a')[0], skill[0]);
					break;
				case item:
					updateItem(container.find('.select-item' + (itemUsed ? '.second-select' : ':not(.second-select)') + ' li.' + folderize(value) + ' a')[0], skill[0]);
					itemUsed = true;
				}
			}
		}
	}
}

function adjustClass(element, archetype) {
	var container = $(element).parents('.select-row');
	container.find('.select-class ul').removeClass(ARCHETYPE_CLASSES).addClass(archetype.toLowerCase());
	var currentClass = container.find('input[name="class-title"]').val();
	if (currentClass != '' && CLASSES[currentClass].archetype.title != archetype) {
		clearClass(element);
	}
}

function clearClass(element, hyrbid) {
	var container = $(element).parents('.select-row');
	container.find(hyrbid ? '.hybrid-class-title' : '.class-title').html('Select class ');
	container.find('input[name="hybrid-class-title"]').attr('value','');
}

function updateSkills(element, skillValues, heroNumber) {
	var container = $(element).parents('.select-row');
	for (var i = 0; i < skillValues.length; i++) {
		var skillTitle = skillValues[i][0];
		var skill = container.find('input[name="' + skillTitle + '"]');
		skill.prop('checked', skillValues[i][1]);
		if (skillValues[i][2] != undefined && skillValues[i][2]) {
			skill.addClass('card-exhausted');
		}
		if (skillValues[i][3] != undefined && skillValues[i][3]) {
			dropToken(container.find('img[skill="' + skillTitle + '"]'), 'melody' + heroNumber.toString());
		}
		if (skillValues[i][4] != undefined && skillValues[i][4]) {
			dropToken(container.find('img[skill="' + skillTitle + '"]'), 'harmony' + heroNumber.toString());
		}
	}
}

function adjustSkills(element, value, hybrid) {
	if (hybrid == undefined) hybrid = false;
	var container = $(element).parents('.select-row');
	if (!hybrid) {
		container.find('.skills-container').attr("class", "showclass skills-container " + folderize(value));
	} else {
		container.find('.skills-container').addClass(folderize(value));
	}
}

function adjustItems(element, value, hybrid) {
	var container = $(element).parents('.select-row');
	if (hybrid == undefined || !hybrid) {
		container.find('.items-selects').attr("class", "showclass items-selects " + folderize(value));
	} else {
		container.find('.items-selects').addClass(folderize(value));
	}
}

function adjustSkillsImages(element, hybrid) {
	if (hybrid == undefined) hybrid = false;
	var container = $(element).parents('.select-row');
	var className = container.find(hybrid ? 'input[name="hybrid-class-title"]' : 'input[name="class-title"]').attr('value');
	if (className == '') return;
	var skills = $(container).find('.checkbox.' + folderize(className) + ' input');
	if (!hybrid) {
		container.find('.imagescontainer img').removeClass('showimage');
	}
	for (var i = 0; i < skills.length; i++) {
		var currentSkill = $(skills[i]);
		if (currentSkill.prop('checked')) {
			var skill = container.find('[skill="' + currentSkill.attr('name') + '"]');
			skill.addClass('showimage');
			if (currentSkill.hasClass('card-exhausted')) {
				skill.addClass('exhausted');
			}
		}
	}
	if (className == 'Bard') {
		container.find('#harmony1,#melody1,#harmony2,#melody2,#harmony3,#melody3,#harmony4,#melody4').addClass('showimage');
	}
	if (CLASSES[className].allowHybrid && !hybrid) {
		adjustSkillsImages(element, true);
	}
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

function updateHand(element, value) {
	var container = $(element).parents('.select-row');
	var second = $(element).parents('.select-weapon').hasClass('second-select');
	var twohand = $(element).parent().hasClass('twohand');
	var tierOne = $(element).parent().hasClass('tierone');
	var relic = $(element).parent().hasClass('relic');
	var oldTwoHand = container.find('.items-container').find('.hand2').hasClass('secondary'); 
	var selector = '.hand';
	if (second) selector += '2';
	container.find('.items-container').find('.hand,.hand2').removeClass('secondary');
	var src;
	if ($(element).parent().hasClass('classitem')) {
		var classValue = container.find('input[name="class-title"]').attr('value');
		src = 'images/classes_cards/' + folderize(classValue) + '/' + urlize(value) + '.jpg';
	} else {
		var tierFolder = tierOne ? 'tier_one' : 'tier_two';
		if (relic) tierFolder = 'relic';
		src = 'images/items_cards/' + tierFolder + '/' + urlize(value) + '.jpg';
	}
	container.find('.items-container').find(twohand ? '.hand,.hand2' : selector).attr('src', src);
	if (!twohand && oldTwoHand) {
		clearHand(container.find('.items-selects').find('.select-weapon' + (second ? ':not(.second-select)' : '.second-select') + ' li')[0]);
	}
	if (twohand) {
		container.find('.weapon-title').html(value + ' ');
		container.find('.items-container').find('.hand2').addClass('secondary');
	} else {
		$(element).parents('.select-weapon').find('.weapon-title').html(value + ' ');
	}
	container.find('[name="hand' + (second && !twohand ? '2' : '') + '"]').val(value);
	if (twohand) {
		container.find('[name="hand2"]').val('');
	}
}

function updateArmor(element, value) {
	var container = $(element).parents('.select-row');
	var tierOne = $(element).parent().hasClass('tierone');
	var relic = $(element).parent().hasClass('relic');
	var src;
	if ($(element).parent().hasClass('classitem')) {
		var classValue = container.find('input[name="class-title"]').attr('value');
		src = 'images/classes_cards/' + folderize(classValue) + '/' + urlize(value) + '.jpg';
	} else {
		var tierFolder = tierOne ? 'tier_one' : 'tier_two';
		if (relic) tierFolder = 'relic';
		src = 'images/items_cards/' + tierFolder + '/' + urlize(value) + '.jpg';
	}
	container.find('.items-container').find('.armor').attr('src', src);
	$(element).parents('.select-armor').find('.armor-title').html(value + ' ');
	container.find('[name="armor"]').val(value);
}

function updateItem(element, value) {
	var container = $(element).parents('.select-row');
	var second = $(element).parents('.select-item').hasClass('second-select');
	var selector = '.item';
	if (second) selector += '2';
	var tierOne = $(element).parent().hasClass('tierone');
	var relic = $(element).parent().hasClass('relic');
	var src;
	if ($(element).parent().hasClass('classitem')) {
		var classValue = container.find('input[name="class-title"]').attr('value');
		src = 'images/classes_cards/' + folderize(classValue) + '/' + urlize(value) + '.jpg';
	} else {
		var tierFolder = tierOne ? 'tier_one' : 'tier_two';
		if (relic) tierFolder = 'relic';
		src = 'images/items_cards/' + tierFolder + '/' + urlize(value) + '.jpg';
	}
	container.find('.items-container').find(selector).attr('src', src);
	$(element).parents('.select-item').find('.item-title').html(value + ' ');
	container.find('[name="item' + (second ? '2' : '') + '"]').val(value);
}

function clearHand(element) {
	var container = $(element).parents('.select-row');
	var second = $(element).parents('.select-weapon').hasClass('second-select');
	var selector = '.hand';
	if (second) selector += '2';
	var twoHand = container.find('.hand2').hasClass('secondary');
	if (twoHand) {
		container.find('.hand2').removeClass('secondary');
		container.find('.items-container').find('.hand').attr('src', 'images/misc/hand.png');
		container.find('.items-container').find('.hand2').attr('src', 'images/misc/hand2.png');
		container.find('.weapon-title').html('Select Weapon ');
		container.find('[name="hand"],[name="hand2"]').val('');
	} else {
		container.find('.items-container').find(selector).attr('src', 'images/misc/hand' + (second ? '2' : '') + '.png');
		$(element).parents('.select-weapon').find('.weapon-title').html('Select Weapon ');
		container.find('[name="hand' + (second ? '2' : '') + '"]').val('');
	}
}

function clearArmor(element) {
	var container = $(element).parents('.select-row');
	container.find('.items-container').find('.armor').attr('src', 'images/misc/armor.png');
	$(element).parents('.select-weapon').find('.weapon-title').html('Select Armor ');
	container.find('[name="armor"]').val('');
}

function clearItem(element) {
	var container = $(element).parents('.select-row');
	var second = $(element).parents('.select-item').hasClass('second-select');
	var selector = '.item';
	if (second) selector += '2';
	container.find('.items-container').find(selector).attr('src', 'images/misc/item.png');
	$(element).parents('.select-item').find('.item-title').html('Select Item ');
	container.find('input[name="item' + (second ? '2' : '') + '"]').attr('value', '');
}

function updateTile(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.tile-title').html(value + ' ');
	container.find('input[name="tile-title"]').attr('value',value);
}

function clearTile(element) {
	var container = $(element).parents('.select-row');
	container.find('.tile-title').html('Select tile ');
	container.find('input[name="tile-title"]').attr('value','');
}

function updateSide(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.side-title').html(value + ' ');
	container.find('input[name="tile-side"]').attr('value',value);
}

function clearSide(element) {
	var container = $(element).parents('.select-row');
	container.find('.side-title').html('Select tile ');
	container.find('input[name="tile-side"]').attr('value','');
}

function updateAngle(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.angle-title').html(value + ' ');
	container.find('input[name="tile-angle"]').attr('value',value);
}

function clearAngle(element) {
	var container = $(element).parents('.select-row');
	container.find('.angle-title').html('Select tile ');
	container.find('input[name="tile-angle"]').attr('value','');
}

function updateDoor(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.door-title').html(value + ' ');
	container.find('input[name="door-title"]').attr('value',value);
}

function clearDoor(element) {
	var container = $(element).parents('.select-row');
	container.find('.door-title').html('Select door ');
	container.find('input[name="door-title"]').attr('value','');
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

function updateXs(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.xs-title').html(value + ' ');
	container.find('input[name="xs-title"]').attr('value',value);
}

function clearXs(element) {
	var container = $(element).parents('.select-row');
	container.find('.xs-title').html('Select X ');
	container.find('input[name="xs-title"]').attr('value','');
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

function updateLieutenant(element, value, showBack) {
	var container = $(element).parents('.select-row');
	var isAgent = value.indexOf('Agent') >= 0;
	var realName = value.replace('Agent ', '');
	container.find('.lieutenant-title').html(value + ' ');
	container.find('input[name="lieutenant-title"]').attr('value',value);
	if (isAgent) {
		container.addClass('agent');
	} else {
		container.removeClass('agent');
	}
	var actAcronym = '_act';
	var cardFolder = isAgent ? 'plot_cards/agents' : 'lieutenant_cards';
	var cardImageExtension = isAgent ? '.png' : '.jpg';
	container.find('img.lieutenant-image').attr('src', 'images/' + cardFolder + '/' + urlize(realName) + actAcronym + (actOne ? '1' : '2') + cardImageExtension).css('display','inline-block');
	if (showBack) {
		container.find('img.lieutenant-image-back').attr('src', 'images/' + cardFolder + '/' + urlize(realName) + actAcronym + (actOne ? '1' : '2') + '_back' + cardImageExtension).css('display','inline-block');
	} else {
		container.find('img.lieutenant-image-back').css('display','none');
	}
	container.find('[lieutenant="' + value + '"] input[type="checkbox"]').parent().parent().css('display', 'block');
//	adjustAlliesSkillsImages(element);
}

function clearLieutenant(element) {
	var container = $(element).parents('.select-row');
	container.find('.lieutenant-title').html('Select Lieutenant ');
	container.find('input[name="lieutenant-title"]').attr('value','');
	container.find('img.lieutenant-image').css('display','none');
	container.find('img.lieutenant-image-back').css('display','none');
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

function updateObjective(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.objective-title').html(value + ' ');
	container.find('input[name="objective-title"]').attr('value',value);
}

function clearObjective(element) {
	var container = $(element).parents('.select-row');
	container.find('.objective-title').html('Select Objective ');
	container.find('input[name="objective-title"]').attr('value','');
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

function updateTainted(element, value) {
	var taintedContainer = $(element).parents('.tainted-container');
	taintedContainer.find('.tainted-title').html(value + ' ');
	taintedContainer.find('input[name="tainted"]').val(value);
	taintedContainer.find('img').attr('src','images/tainted_cards/' + urlize(value) + '.jpg');
}

function removeTainted(element) {
	var taintedContainer = $(element).parents('.tainted-container');
	taintedContainer.html('');
	taintedContainer.append(buildTaintedButton());
}

function updateOverlordRelic(element, value) {
	var container = $(element).parents('.select-row');
	var relicContainer = $(element).parents('.select-relic');
	var relicNumber = relicContainer.attr('id').replace('relic-select-', '');
	relicContainer.find('.relic-title').html(value + ' ');
	$('#relic' + relicNumber.toString()).val(value);
	var relicImage = $('#relic-image-' + relicNumber.toString());
	if (relicImage.length == 0) {
		relicImage = $('<img>').addClass('relic-image').attr('id', 'relic-image-' + relicNumber.toString());
		container.append(relicImage);
	}
	relicImage.attr('src', 'images/items_cards/relic/overlord/' + urlize(value) + '.jpg');
}

function removeOverlordRelic(element) {
	var relicContainer = $(element).parents('.select-relic');
	var relicNumber = relicContainer.attr('id').replace('relic-select-', '');
	$('#relic' + relicNumber.toString()).remove();
	$('#relic-image-' + relicNumber.toString()).remove();
	relicContainer.remove();
}

function removeRow(element) {
	$(element).parents('.select-row').remove();
}

function removeMonsterRows() {
	$('#monsters-container .select-row').remove();
}

function getAlphabetChar(number) {
	var result = '';
	if (number >= 26) {
		result += ALPHABET.charAt(Math.floor(number/26) - 1);
	}
	return result += ALPHABET.charAt(number%26);
}

function createItemsAndSearchSelect() {
	var select = $(createInputSelect('Select Item or Search card', 'sack-title', 'select-sack'));
	var ul = select.find('ul');
	ul.append(addOption('Remove', '', 'removeFromSack(this);'));
	ul.append($('<li role="separator" class="divider"></li>'));
	ul.append(createSearchSelectContent());
	ul.append($('<li role="separator" class="divider"></li>'));
	ul.append(createHandSelectContent().replace(new RegExp("updateHand",'g'), 'updateSackItem'));
	ul.append(createArmorSelectContent().replace(new RegExp("updateArmor",'g'), 'updateSackItem'));
	ul.append(createItemSelectContent().replace(new RegExp("updateItem",'g'), 'updateSackItem'));
	select.find('.hand,.armor,.item').removeClass('hand armor item');
	return select;
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

function createMonsterSelectContent() {
	var html = '';
	for (var i = 0; i < MONSTERS_LIST.length; i++) {
		var monsterClass = folderize(MONSTERS_LIST[i][4]);
		for (var j = 0; j < MONSTERS_LIST[i][5].length; j++) {
			monsterClass += ' ';
			monsterClass += urlize(MONSTERS_LIST[i][5][j]);
		}
		var monsterTitle = MONSTERS_LIST[i][0];
		var monsterVisible = (monsterTraits[MONSTERS[monsterTitle].traits[0]] != undefined || monsterTraits[MONSTERS[monsterTitle].traits[1]] != undefined) && selectedExpansions[MONSTERS[monsterTitle].expansion] != undefined;
		var option = $(addOption(monsterTitle + ' master', monsterClass, 'updateMonster(this, \'' + monsterTitle + '\');'));
		option.css('display', monsterVisible ? 'block' : 'none');
		html += option[0].outerHTML;
		option = $(addOption(monsterTitle + ' minion', monsterClass, 'updateMonster(this, \'' + monsterTitle + '\');'));
		option.css('display', monsterVisible ? 'block' : 'none');
		html += option[0].outerHTML;
	}
	return html;
}

function createHeroSelectContent() {
	var html = addOption('Clear', '', 'clearHero(this);');
	for (var i = 0; i < HEROES_LIST.length; i++) {
		html += addOption(HEROES_LIST[i][0] + ' ', '', 'updateHero(this, \'' + HEROES_LIST[i][0] + '\');');
	}
	return html;
}

function createClassSelectContent(hybrid) {
	var html = addOption('Clear', '', 'clearClass(this, ' + hybrid.toString() + ');');
	for (var i = 0; i < ARCHETYPES_LIST.length; i++) {
		for (var j = 0; j < ARCHETYPES_LIST[i].classes.length; j++) {
			var title = ARCHETYPES_LIST[i].classes[j].title;
			html += addOption(title + ' ', ARCHETYPES_LIST[i].title, 'updateClass(this, \'' + title + '\', false, ' + hybrid.toString() + ');');
		}
	}
	return html;
}

function createArchetypeSelectContent() {
	var html = addOption('Clear', '', 'clearArchetype(this);');
	for (var i = 0; i < ARCHETYPES_LIST.length; i++) {
		var title = ARCHETYPES_LIST[i].title;
		html += addOption(title + ' ', title, 'updateArchetype(this, \'' + title + '\');');
	}
	return html;
}

function createSearchSelectContent() {
	var html = '';
	for (var i = 0; i < SEARCH_ITEMS_LIST.length; i++) {
		html += addOption(SEARCH_ITEMS_LIST[i] + ' ', 'search', 'updateSackItem(this, \'' + SEARCH_ITEMS_LIST[i] + '\')');
	}
	return html;
}

function createHandSelectContent() {
	var html = addOption('Clear', '', 'clearHand(this);');
	for (var i = 0; i < ITEMS['hand'].length; i++) {
		var item = ITEMS['hand'][i];
		html += addOption(item[0] + ' ', 'hand tierone', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMS['hand2'].length; i++) {
		var item = ITEMS['hand2'][i];
		html += addOption(item[0] + ' ', 'hand twohand tierone', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMS2['hand'].length; i++) {
		var item = ITEMS2['hand'][i];
		html += addOption(item[0] + ' ', 'hand tiertwo', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMS2['hand2'].length; i++) {
		var item = ITEMS2['hand2'][i];
		html += addOption(item[0] + ' ', 'hand twohand tiertwo', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMSR['hand'].length; i++) {
		var item = ITEMSR['hand'][i];
		html += addOption(item[0] + ' ', 'hand relic', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMSR['hand2'].length; i++) {
		var item = ITEMSR['hand2'][i];
		html += addOption(item[0] + ' ', 'hand twohand relic', 'updateHand(this, \'' + item[0] + '\')');
	}
	var classItems = getSkillsItems(hand);
	for (var i = 0; i < classItems.length; i++) {
		html += addOption(classItems[i][0] + ' ', 'hand classitem ' + classItems[i][1], 'updateHand(this, \'' + classItems[i][0] + '\')');
	}
	classItems = getSkillsItems(twohand);
	for (var i = 0; i < classItems.length; i++) {
		html += addOption(classItems[i][0] + ' ', 'hand twohand classitem ' + classItems[i][1], 'updateHand(this, \'' + classItems[i][0] + '\')');
	}
	return html;
}

function createArmorSelectContent() {
	var html = addOption('Clear', '', 'clearArmor(this);');
	for (var i = 0; i < ITEMS['armor'].length; i++) {
		var item = ITEMS['armor'][i];
		html += addOption(item[0] + ' ', 'armor tierone', 'updateArmor(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMS2['armor'].length; i++) {
		var item = ITEMS2['armor'][i];
		html += addOption(item[0] + ' ', 'armor tiertwo', 'updateArmor(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMSR['armor'].length; i++) {
		var item = ITEMSR['armor'][i];
		html += addOption(item[0] + ' ', 'armor relic', 'updateArmor(this, \'' + item[0] + '\')');
	}
	var classItems = getSkillsItems(armor);
	for (var i = 0; i < classItems.length; i++) {
		html += addOption(classItems[i][0] + ' ', 'armor classitem ' + classItems[i][1], 'updateArmor(this, \'' + classItems[i][0] + '\')');
	}
	return html;
}

function createItemSelectContent() {
	var html = addOption('Clear', '', 'clearItem(this);');
	for (var i = 0; i < ITEMS['item'].length; i++) {
		var itemObject = ITEMS['item'][i];
		html += addOption(itemObject[0] + ' ', 'item tierone', 'updateItem(this, \'' + itemObject[0] + '\')');
	}
	for (var i = 0; i < ITEMS2['item'].length; i++) {
		var itemObject = ITEMS2['item'][i];
		html += addOption(itemObject[0] + ' ', 'item tiertwo', 'updateItem(this, \'' + itemObject[0] + '\')');
	}
	for (var i = 0; i < ITEMSR['item'].length; i++) {
		var itemObject = ITEMSR['item'][i];
		html += addOption(itemObject[0] + ' ', 'item relic', 'updateItem(this, \'' + itemObject[0] + '\')');
	}
	var classItems = getSkillsItems(item);
	for (var i = 0; i < classItems.length; i++) {
		html += addOption(classItems[i][0] + ' ', 'item classitem tierone ' + classItems[i][1], 'updateItem(this, \'' + classItems[i][0] + '\')');
	}
	return html;
}

function createTileSelectContent() {
	var html = addOption('Clear', '', 'clearTile(this);');
	for (var i = 0; i < MAP_TILES_LIST.length; i++) {
		html += addOption(MAP_TILES_LIST[i] + ' ', '', 'updateTile(this, \'' + MAP_TILES_LIST[i] + '\')');
	}
	return html;
}

function createSideSelectContent() {
	var html = addOption('Clear', '', 'clearSide(this);');
	html += addOption('A ', '', 'updateSide(this, \'A\')');
	html += addOption('B ', '', 'updateSide(this, \'B\')');
	return html;
}

function createAngleSelectContent() {
	var html = addOption('Clear', '', 'clearAngle(this);');
	html += addOption('0 ', '', 'updateAngle(this, \'0\')');
	html += addOption('90 ', '', 'updateAngle(this, \'90\')');
	html += addOption('180 ', '', 'updateAngle(this, \'180\')');
	html += addOption('270 ', '', 'updateAngle(this, \'270\')');
	return html;
}

function createDoorSelectContent() {
	var html = addOption('Clear', '', 'clearDoor(this);');
	for (var i = 0; i < DOORS_LIST.length; i++) {
		html += addOption(DOORS_LIST[i] + ' ', '', 'updateDoor(this, \'' + DOORS_LIST[i] + '\')');
	}
	return html;
}

function createDirectionSelectContent() {
	var html = addOption('Clear', '', 'clearDirection(this);');
	html += addOption('horizontal ', '', 'updateDirection(this, \'horizontal\')');
	html += addOption('vertical ', '', 'updateDirection(this, \'vertical\')');
	return html;
}

function createXsSelectContent() {
	var html = addOption('Clear', '', 'clearXs(this);');
	for (var i = 0; i < BLOCKS_LIST.length; i++) {
		html += addOption(BLOCKS_LIST[i] + ' ', '', 'updateXs(this, \'' + BLOCKS_LIST[i] + '\')');
	}
	return html;
}

function createAlliesSelectContent() {
	var html = addOption('Clear', '', 'clearAlly(this);');
	for (var i = 0; i < ALLIES_LIST.length; i++) {
		html += addOption(ALLIES_LIST[i] + ' ', '', 'updateAlly(this, \'' + ALLIES_LIST[i] + '\')');
	}
	return html;
}

function createFamiliarsSelectContent() {
	var html = addOption('Clear', '', 'clearFamiliar(this);');
	for (var i = 0; i < FAMILIARS_LIST.length; i++) {
		html += addOption(FAMILIARS_LIST[i][0] + ' ', '', 'updateFamiliar(this, \'' + FAMILIARS_LIST[i][0] + '\')');
	}
	return html;
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

function createConditionSelectContent() {
	var html = addOption('Remove condition', '', 'removeCondition(this);');
	for (var i = 0; i < CONDITIONS_LIST.length; i++) {
		html += addOption(CONDITIONS_LIST[i] + ' ', '', 'updateCondition(this, \'' + CONDITIONS_LIST[i] + '\')');
	}
	return html;
}

function createTaintedSelectContent() {
	var html = addOption('Remove tainted card', '', 'removeTainted(this);');
	html += addOption('Back ', '', 'updateTainted(this, \'Back\')');
	for (var i = 0; i < TAINTED_CARDS_LIST.length; i++) {
		html += addOption(TAINTED_CARDS_LIST[i] + ' ', '', 'updateTainted(this, \'' + TAINTED_CARDS_LIST[i] + '\')');
	}
	return html;	
}

function createOverlordRelicsSelectContent() {
	var html = addOption('Remove relic', '', 'removeOverlordRelic(this);');
	for (var i = 0; i < OVERLORD_RELICS_LIST.length; i++) {
		html += addOption(OVERLORD_RELICS_LIST[i] + ' ', '', 'updateOverlordRelic(this, \'' + OVERLORD_RELICS_LIST[i] + '\')');
	}
	return html;
}

function createLieutenantsSelectContent() {
	var html = addOption('Clear', '', 'clearLieutenant(this);');
	for (var i = 0; i < LIEUTENANTS_LIST.length; i++) {
		var lieutenantTitle = LIEUTENANTS_LIST[i][0];
		html += addOption(lieutenantTitle + ' ', '', 'updateLieutenant(this, \'' + lieutenantTitle + '\', ' + LIEUTENANTS_LIST[i][1].toString() + ')');
	}
	html += '<li role="separator" class="divider"></li>';
	for (var i = 0; i < LIEUTENANTS_LIST.length; i++) {
		if (LIEUTENANTS_LIST[i][0].indexOf('act') != -1 || LIEUTENANTS_LIST[i][0].indexOf('Act') != -1) {
			continue;
		}
		var lieutenantTitle = 'Agent ' + LIEUTENANTS_LIST[i][0];
		html += addOption(lieutenantTitle + ' ', '', 'updateLieutenant(this, \'' + lieutenantTitle + '\', ' + LIEUTENANTS_LIST[i][1].toString() + ')');
	}
	return html;
}

function createMapsSelectContent() {
	var html = '';
	for (var i = 0; i < MAP_HASES_LIST.length; i++) {
		html += addOption(MAP_HASES_LIST[i][0] + ' ', 'search', 'rebuildMap(\'' + MAP_HASES_LIST[i][0] + '\')');
	}
	return html;
}

function rebuildMap(mapName) {
	var mapConfig = JSON.parse(Base64.decode(MAP_HASHES[mapName]));
	config.tiles = mapConfig.tiles;
	config.doors = mapConfig.doors;
	config.xs = mapConfig.xs;
	clearMapControlTab();
	constructMapControlsTabFromConfig();
	if (mapConfig.objectives != undefined) {
		config.objectives = mapConfig.objectives;
		clearMiscellaneousObjectsTab();
		constructMiscellaneousObjectsTabFromConfig();
	}
}

function clearMapControlTab() {
	$('#tiles-container .select-row').remove();
	$('#doors-container .select-row').remove();
	$('#xs-container .select-row').remove();
}

function clearMiscellaneousObjectsTab() {
	$('#objective-container .select-row').remove();
}

function clearHeroesSackAndSearchItems() {
	$('.sack-container img').remove();
}

function clearHeroesConditions() {
	$('.select-condition').remove();
	$('[name="condition-title"]').remove();
}

function clearLieutenants() {
	$('#lieutenants-container .select-row').remove();
}

function clearFamiliarsAndAllies() {
	$('#familiars-container .select-row').remove();
	$('#allies-container .select-row').remove();
}

function addCondition(button) {
	var condition = $(createInputSelect('Select condition', 'condition-title', 'select-condition')).attr('id', 'condition' + conditionNumber.toString());
	condition.find('ul').append(createConditionSelectContent());
	var buttonObject = $(button);
	buttonObject.before(condition);
	buttonObject.before('<input type="hidden" name="condition-title" id="inputcondition' + conditionNumber.toString() + '" value=""/>');
	conditionNumber += 1;
	return condition;
}

function addTainted(button) {
	var buttonObject = $(button);
	var buttonContainer = buttonObject.parents('.tainted-container');
	var taintedSelect = $(createInputSelect('Back', 'tainted-title', 'select-tainted'));
	taintedSelect.find('ul').append(createTaintedSelectContent());
	buttonObject.remove();
	buttonContainer.append($('<img src="images/tainted_cards/back.jpg" class="tainted-image">'));
	buttonContainer.append(taintedSelect);
	buttonContainer.append($('<input type="hidden" name="tainted" value="back">'));
	return taintedSelect;
}

function addRelic(button) {
	var relicNumber = overlordRelicNumber += 1;
	var relic = $(createInputSelect('Select relic', 'relic-title', 'select-relic'));
	relic.attr('id', 'relic-select-' + relicNumber.toString());
	relic.find('ul').append(createOverlordRelicsSelectContent());
	var buttonObject = $(button);
	buttonObject.before(relic);
	buttonObject.before('<input type="hidden" name="relic-title" id="relic' + relicNumber.toString() + '" value=""/>');
	return relic;
}

function addAura(button) {
	var aura = $('<div>').addClass('aura');
	aura.append($('<input type="text" name="aura-radius" class="form-control" placeholder="Aura radius" value="">'));
	aura.append($('<input type="text" name="aura-color" class="form-control" placeholder="Aura color" value="">'));
	aura.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeAura(this);">Remove aura</button>'));
	$(button).after(aura);
	$(button).remove();
	return aura;
}

function removeAura(button) {
	var container = $(button).parents('.aura');
	container.after($('<button type="button" class="btn btn-default" aria-expanded="false" onclick="addAura(this);">Add aura</button>'));
	container.remove();
}

function addUnitLine(line, title) {
	line.addClass('select-row');
	line.append(createInputSelect('Select ' + title, title.toLowerCase() + '-title', 'select-' + title.toLowerCase()));
	line.append(createInputSelect('Select X coordinate', 'x-title', 'select-x'));
	line.append(createInputSelect('Select Y coordinate', 'y-title', 'select-y'));
	line.append($('<input type="text" name="' + title.toLowerCase() + '-hp" class="form-control" placeholder="Set HP" value=""/>'));
	line.append($('<input type="hidden" name="' + title.toLowerCase() + '-title" value=""/>'));
	line.append($('<input type="hidden" name="' + title.toLowerCase() + '-x" value=""/>'));
	line.append($('<input type="hidden" name="' + title.toLowerCase() + '-y" value=""/>'));
}

function addMonsterLine() {
	var monsterLine = $('<div>').attr('id','monster' + monsterNumber.toString());
	monsterNumber += 1;
	addUnitLine(monsterLine, 'monster');
	monsterLine.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
	monsterLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	monsterLine.append($('<input type="hidden" name="master" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-y-size" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-x-size" value=""/>'));
	
	monsterLine.find('.select-monster ul').append(createMonsterSelectContent());
	monsterLine.find('.select-x ul').append(createXSelectContent(false));
	monsterLine.find('.select-y ul').append(createYSelectContent(false));
	$('#monsters-container').append(monsterLine);
	return monsterLine;
}

function addHeroLine(number) {
	var heroLine = $('<div>').attr('id','hero' + number.toString() + 'wrapper');
	addUnitLine(heroLine, 'hero');
	heroLine.append($('<input type="text" name="hero-stamina" class="form-control" placeholder="Set stamina" value=""/>'));
	
	heroLine.find('.select-hero ul').append(createHeroSelectContent());
	heroLine.find('.select-x ul').append(createXSelectContent(true));
	heroLine.find('.select-x ul').addClass('showOneCell');
	heroLine.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	heroLine.append(createInputSelect('Select Archetype ', 'archetype-title', 'select-archetype'));
	heroLine.find('.select-archetype ul').addClass(ARCHETYPE_CLASSES + ' showarch').append(createArchetypeSelectContent());
	heroLine.append($('<input type="hidden" name="archetype-title" value=""/>'));
	heroLine.append(createInputSelect('Select Class ', 'class-title', 'select-class'));
	heroLine.find('.select-class ul').addClass(ARCHETYPE_CLASSES + ' showarch').append(createClassSelectContent(false));
	heroLine.append($('<input type="hidden" name="class-title" value=""/>'));
	heroLine.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
	heroLine.append($('<button type="button" class="btn btn-default" aria-expanded="false" onclick="addAura(this);">Add aura</button>'));
	heroLine.append(createConditionsBlock());
	heroLine.append(createSkillsBlock(number));
	heroLine.append(createItemsBlock());
	heroLine.append(createSackAndSearchBlock());
	heroLine.append(getHeroImage());
	heroLine.append(buildTaintedBlock());
	$('#hero' + number.toString()).append(heroLine);
}

function buildTaintedBlock() {
	var taintedBlock = $('<div>');
	taintedBlock.addClass('tainted-container');
	taintedBlock.append(buildTaintedButton());
	return taintedBlock;
}

function buildTaintedButton() {
	return $('<button type="button" class="btn btn-default" aria-expanded="false" onclick="addTainted(this);">Add tainted card</button>');
}

function getHeroImage() {
	var heroImage = $('<img>');
	var heroImageFeat = $('<div>').addClass('hero-image-feat');
	var heroImageContainer = $('<div>').addClass('hero-image-container'); 
	heroImageContainer.append(heroImage);
	heroImageContainer.append(heroImageFeat);
	heroImage.attr('src', '').attr('onclick',"$(this).parent().toggleClass('feat-used')");
	return heroImageContainer;
}

function addMapTileLine() {
	var mapTileLine = $('<div>');
	addUnitLine(mapTileLine, 'tile');
	mapTileLine.find('input[type="text"]').remove();
	mapTileLine.find('.select-tile').after(createInputSelect('Select side', 'side-title', 'select-side'));
	mapTileLine.append(createInputSelect('Select angle', 'angle-title', 'select-angle'));
	mapTileLine.append($('<input type="hidden" name="tile-side" value=""/>'));
	mapTileLine.append($('<input type="hidden" name="tile-angle" value=""/>'));
	
	mapTileLine.find('.select-tile ul').append(createTileSelectContent());
	mapTileLine.find('.select-side ul').append(createSideSelectContent());
	mapTileLine.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	mapTileLine.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	mapTileLine.find('.select-angle ul').append(createAngleSelectContent());
	mapTileLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#tiles-container').append(mapTileLine);
	return mapTileLine;
}

function addDoorLine() {
	var doorLine = $('<div>');
	addUnitLine(doorLine, 'door');
	doorLine.find('input[type="text"]').remove();
	doorLine.find('.select-door').after(createInputSelect('Select direction', 'direction-title', 'select-direction'));

	var openedCheckbox = $('<div>').addClass('checkbox').addClass('door-opened');
	var checkboxContent = $('<label>');
	checkboxContent.append($('<input>').attr('type', 'checkbox').attr('name','opened'));//.attr('onclick','updateOpened(this)')
	checkboxContent.append('opened');
	openedCheckbox.append(checkboxContent);
	doorLine.append(openedCheckbox);

	doorLine.append($('<input type="hidden" name="door-direction" value=""/>'));
	
	doorLine.find('.select-door ul').append(createDoorSelectContent());
	doorLine.find('.select-direction ul').append(createDirectionSelectContent());
	doorLine.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	doorLine.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	doorLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#doors-container').append(doorLine);
	return doorLine;
}

function addXsLine() {
	var xLine = $('<div>');
	addUnitLine(xLine, 'Xs');
	xLine.find('input[type="text"]').remove();
	
	xLine.find('.select-xs ul').append(createXsSelectContent());
	xLine.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	xLine.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	xLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#xs-container').append(xLine);
	return xLine;
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

function addLieutenantLine() {
	var lieutenant = $('<div>');
	addUnitLine(lieutenant, 'Lieutenant');
	
	lieutenant.find('.select-lieutenant ul').append(createLieutenantsSelectContent());
	lieutenant.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	lieutenant.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	lieutenant.find('.select-lieutenant').after(createInputSelect('Select direction', 'direction-title', 'select-direction'));
	lieutenant.append($('<input type="hidden" name="lieutenant-direction" value=""/>'));
	lieutenant.find('.select-direction ul').append(createDirectionSelectContent());
	lieutenant.append($('<button type="button" class="btn btn-info" aria-expanded="false" onclick="addRelic(this);">Add relic</button>'));
	lieutenant.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
	lieutenant.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	lieutenant.append($('<br/>'));
	lieutenant.append($('<img src="" style="display: none;">').addClass('lieutenant-image'));
	lieutenant.append($('<img src="" style="display: none;">').addClass('lieutenant-image-back'));
	$('#lieutenants-container').append(lieutenant);
	return lieutenant;
}

function createConditionsBlock() {
	return $('<div>').addClass('conditions-container');
}

function createSkillsBlock(heroNumber) {
	var html = $('<div>').addClass('showClass').addClass('skills-container');
	html.append($('<h1>Skills</h1>'));
	
	for (var i = 0; i < HYBRID_CLASSES.length; i++) {
		var hc = HYBRID_CLASSES[i];
		var hybridInput = createInputSelect('Select Class ', 'hybrid-class-title', 'select-hybrid-class ' + folderize(hc.title));
		html.append(hybridInput);
		hybridInput.find('ul').addClass(folderize(hc.newArchetype.title) + ' showarch').append(createClassSelectContent(true));
	}
	
	html.append($('<input type="hidden" name="hybrid-class-title" value=""/>'));
	var skillsImages = $('<div>').addClass('imagescontainer');
	for (var tempoClass in CLASSES) {
		if (CLASSES[tempoClass] == undefined) continue;
		var currentClass = CLASSES[tempoClass];
		for (var i = 0; i < currentClass.skills.length; i++) {
			var skill = currentClass.skills[i];
			if (skill[2] != undefined) continue;
			var classUpdatedTitle = folderize(currentClass.title);
			var skillObject = $('<div>').addClass('checkbox').addClass(classUpdatedTitle);
			skillObject.attr('xp-cost', skill[1]);
			skillObject.append($('<label><input type="checkbox" name="' + skill[0] + '" onClick="adjustSkillsImages(this);"/> ' + skill[0] + '</label>'));
			if (skill[1] == 0) {
				skillObject.addClass('disabled');
				skillObject.find('input').prop('checked', true);
				skillObject.find('input').attr('disabled', '');
			}
			html.append(skillObject);
			skillsImages.append($('<img>').attr('src', 'images/classes_cards/' + classUpdatedTitle + '/' + urlize(skill[0]) + '.jpg').attr('skill', skill[0]).attr('onclick',"exhaustSkill(this);").attr('ondragover',"allowDrop(event)").attr('ondrop',"drop(event)"));
		}
		if (currentClass.title == 'Bard') {
			skillsImages.append($('<div>').attr('class','fakeimg').attr('ondragover',"allowDrop(event)").attr('ondrop',"drop(event)"));
			skillsImages.append($('<img>').attr('src', 'images/skills_tokens/melody.png').attr('id', 'melody' + heroNumber.toString()).attr('draggable', 'true').attr('ondragstart',"drag(event)"));
			skillsImages.append($('<img>').attr('src', 'images/skills_tokens/harmony.png').attr('id', 'harmony' + heroNumber.toString()).attr('draggable', 'true').attr('ondragstart',"drag(event)"));
		}
	}
	html.append(skillsImages);
	return html;
}

function exhaustSkill(image) {
	$(image).toggleClass('exhausted');
	var container = $(image).parents('.select-row');
	container.find('[name="' + $(image).attr('skill') + '"]').toggleClass('card-exhausted');
}

function createMonsterTraitsBlock() {
	var html = $('#monster-traits');
	for (var i = 0; i < MONSTER_TRAITS.length; i++) {
		var monsterTrait = MONSTER_TRAITS[i];
		var traitObject = $('<div>').addClass('checkbox');
		traitObject.append($('<img src="images/monster_traits/' + urlize(monsterTrait) + '.jpg"/>'));
		var traitInput = $('<input type="checkbox" name="' + urlize(monsterTrait) + '" onClick="updateMonstersVisibility();" />');
		traitInput.prop('checked', true);
		traitObject.append($('<label></label>').append(traitInput));
		html.append(traitObject);
	}
	return html;
}

function createExpansionsBlock() {
	var html = $('#expansions');
	for (var i = 0; i < EXPANSIONS.length; i++) {
		var expansion = EXPANSIONS[i];
		var expansionObject = $('<div>').addClass('checkbox');
		var expansionInput = $('<input type="checkbox" name="' + folderize(expansion) + '" onClick="updateMonstersVisibility();" />');
		expansionInput.prop('checked', true);
		expansionObject.append($('<label> ' + expansion + '</label>').prepend(expansionInput));
		html.append(expansionObject);
	}
	return html;
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

function createItemsBlock() {
	var html = $('<div>').addClass('items-block');
	var itemsContainer = $('<div>').addClass('items-container');
	itemsContainer.append($('<h1>Items</h1>'));
	itemsContainer.append($('<img src="images/misc/hand.png">').addClass('hand').attr('onclick', "$(this).toggleClass('exhausted')"));
	itemsContainer.append($('<img src="images/misc/hand2.png">').addClass('hand2').attr('onclick', "$(this).toggleClass('exhausted')"));
	itemsContainer.append($('<img src="images/misc/armor.png">').addClass('armor').attr('onclick', "$(this).toggleClass('exhausted')"));
	itemsContainer.append($('<img src="images/misc/item.png">').addClass('item').attr('onclick', "$(this).toggleClass('exhausted')"));
	itemsContainer.append($('<img src="images/misc/item.png">').addClass('item2').attr('onclick', "$(this).toggleClass('exhausted')"));
	html.append(itemsContainer);
	
	var itemsSelects = $('<div>').addClass('items-selects showclass');
	var weaponSelect = $(createInputSelect('Select Weapon', 'weapon-title', 'select-weapon'));
	weaponSelect.find('ul').append(createHandSelectContent());
	itemsSelects.append(weaponSelect);
	
	var weaponSelectSecond = $(createInputSelect('Select Weapon', 'weapon-title', 'select-weapon')).addClass('second-select');
	weaponSelectSecond.find('ul').append(createHandSelectContent());
	itemsSelects.append(weaponSelectSecond);
	
	var armorSelect = $(createInputSelect('Select Armor', 'armor-title', 'select-armor'));
	armorSelect.find('ul').append(createArmorSelectContent());
	itemsSelects.append(armorSelect);
	
	var itemsSelect = $(createInputSelect('Select Item', 'item-title', 'select-item'));
	itemsSelect.find('ul').append(createItemSelectContent());
	itemsSelects.append(itemsSelect);
	
	var itemsSelectSecond = $(createInputSelect('Select Item', 'item-title', 'select-item')).addClass('second-select');
	itemsSelectSecond.find('ul').append(createItemSelectContent());
	itemsSelects.append(itemsSelectSecond);
	
	html.append(itemsSelects);
	html.append($('<input type="hidden" name="hand">'));
	html.append($('<input type="hidden" name="hand2">'));
	html.append($('<input type="hidden" name="armor">'));
	html.append($('<input type="hidden" name="item">'));
	html.append($('<input type="hidden" name="item2">'));
	return html;
}

function createOverlordCardsBlock() {
	var html = $('<div>').addClass('overlord-cards-container');
	var cardsImages = $('<div>').addClass('overlord-cards-images-container');
	for (var cardType in OVERLORD_CARDS) {
		if (OVERLORD_CARDS[cardType] == undefined) continue;
		var cardsOfType = OVERLORD_CARDS[cardType];
		for (var i = 0; i < cardsOfType.length; i++) {
			var card = cardsOfType[i];
			if (true || cardType != 'basic' && cardType != 'basic2') {
				var cardCheckbox = $('<div>').addClass('checkbox');
				cardCheckbox.append($('<label><input type="checkbox" name="' + card.title + '" onClick="adjustOverlordCardsImages();"/> ' + card.title + '</label>'));
				html.append(cardCheckbox);
			}
			for (var j = 0; j < card.number; j++) {
				cardsImages.append($('<img>').attr('src', 'images/overlord_cards/' + cardType + '/' + urlize(card.title) + '.jpg').attr('card', card.title).attr('onclick','$(this).toggleClass(\'secondary\');').css('display','none'));
			}
		}
	}
	html.prepend(cardsImages);
	$('#overlord-container').append(html);
	adjustOverlordCardsImages();
}

function createPlotDeckBlock() {
	var plotContainer = $('<div>').addClass('select-row');
	plotContainer.append($('<h1>Plot deck</h1>'));
	plotContainer.append(createInputSelect('Select plot deck ', 'plot-deck-title', 'select-plot-deck'));
	plotContainer.find('.select-plot-deck ul').append(createPlotDeckSelectContent());
	plotContainer.append($('<input type="hidden" name="plot-deck-title" value=""/>'));
	plotContainer.append($('<span class="threat-number-label">Threat tokens: </span>'));
	plotContainer.append($('<input type="text" name="threat-tokens" class="form-control" placeholder="Set Threat" value="0">'));
	plotContainer.append(createPlotCardsBlock());
	var plot = $('#plot');
    plot.html('');
    plot.append(plotContainer)
}

function createPlotCardsBlock() {
	var html = $('<div>').addClass('showplot').addClass('plot-cards-container');
	html.append($('<h2>Plot cards</h2>'));
	
	var plotImages = $('<div>').addClass('imagescontainer');
	for (var i = 0; i < PLOT_DECKS.length; i++) {
		var currentPlotDeck = PLOT_DECKS[i];
		for (var j = 0; j < currentPlotDeck[1].length; j++) {
			var plotCard = currentPlotDeck[1][j];
			var plotCardObject = $('<div>').addClass('checkbox').addClass(folderize(currentPlotDeck[0]));
			plotCardObject.append($('<label><input type="checkbox" name="' + plotCard[0] + '" onClick="adjustPlotCardsImages(this, \'' + currentPlotDeck[0] + '\');"/> ' + plotCard[0] + '</label>'));
			if (plotCard[1] == 0) {
				plotCardObject.addClass('disabled');
				plotCardObject.find('input').prop('checked', true);
				plotCardObject.find('input').attr('disabled', '');
			}
			html.append(plotCardObject);
			plotImages.append($('<img>').attr('src', 'images/plot_cards/' + urlize(currentPlotDeck[0]) + '/' + urlize(plotCard[0]) + '.png').attr('card', plotCard[0]).attr('onclick',"exhaustPlotCard(this);"));
		}
	}
	html.append(plotImages);
	return html;
}

function createPlotDeckSelectContent() {
	var html = addOption('Clear', '', 'clearPlotDeck(this);');
	for (var i = 0; i < PLOT_DECKS.length; i++) {
		var title = PLOT_DECKS[i][0];
		html += addOption(title + ' ', title, 'updatePlotDeck(this, \'' + title + '\');');
	}
	return html;
}

function updatePlotDeck(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.plot-deck-title').html(value + ' ');
	container.find('input[name="plot-deck-title"]').attr('value',value);
	adjustPlotCardsImages(element, value);
}

function clearPlotDeck(element) {
	var container = $(element).parents('.select-row');
	container.find('.plot-deck-title').html('Select plot deck ');
	container.find('input[name="plot-deck-title"]').attr('value','');
}

function adjustPlotCardsImages(element, value) {
	var container = $(element).parents('.select-row');
	if (value == undefined || value == '') {
		return;
	}
	container.find('.plot-cards-container').attr("class", "showplot plot-cards-container " + folderize(value));
	container.find('img').removeClass('showimage');
	var plotCards = $(container).find('.checkbox.' + folderize(value) + ' input');
	for (var i = 0; i < plotCards.length; i++) {
		var currentPlotCard = $(plotCards[i]);
		if (currentPlotCard.prop('checked')) {
			var plotCard = container.find('[card="' + currentPlotCard.attr('name') + '"]');
			plotCard.addClass('showimage');
			if (currentPlotCard.hasClass('card-exhausted')) {
				plotCard.addClass('exhausted');
			}
		}
	}
}

function exhaustPlotCard(image) {
	$(image).toggleClass('exhausted');
	var container = $(image).parents('.select-row');
	container.find('[name="' + $(image).attr('card') + '"]').toggleClass('card-exhausted');
}

function createFullMapsBlock() {
	var html = $('<div>').addClass('full-maps-container');
	var select = $(createInputSelect('Remove current map with standard', 'map-title', 'select-map'));
	var ul = select.find('ul');
	ul.append(createMapsSelectContent());
	html.append(select);
	$('#full-maps-container').append(html);
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

function adjustOverlordCardsImages() {
	$('.overlord-cards-images-container img').css('display','none');
	var overlordCards = $('.overlord-cards-container input[type="checkbox"]');
	for (var i = 0; i < overlordCards.length; i++) {
		var overlordCard = $(overlordCards[i]);
		if (overlordCard.prop('checked')) {
			$('.overlord-cards-images-container img[card="' + overlordCard.attr('name') + '"]').css('display', 'inline-block');
		}
	}
}

function selectBasicOverlordDeck() {
	switchBasicOverlordDeck(true);
}

function selectBasic2OverlordDeck() {
	switchBasicOverlordDeck(false);
}

function switchBasicOverlordDeck(first) {
	for (var i = 0; i < OVERLORD_CARDS['basic'].length; i++) {
		updateOverlordCard(OVERLORD_CARDS['basic'][i].title, first);
	}
	for (var i = 0; i < OVERLORD_CARDS['basic2'].length; i++) {
		updateOverlordCard(OVERLORD_CARDS['basic2'][i].title, !first);
	}
	adjustOverlordCardsImages();
}

function updateOverlordCard(title, value) {
	$('.overlord-cards-container input[name="' + title + '"]').prop('checked', value);
}

function createSackAndSearchBlock() {
	var html = $('<div>').addClass('sack-block');
	var sackContainer = $('<div>').addClass('sack-container');
	sackContainer.append($('<h1>Sack and Search items</h1>'));
	var additionButton = $('<button>').attr('type','button').addClass('btn btn-success').attr('aria-expanded','false').attr('onclick', 'addToSack(this);');
	additionButton.html('Add Item or Search card');
	sackContainer.append(additionButton);
	html.append(sackContainer);
	
	var sackSelects = $('<div>').addClass('sack-selects');
	html.append(sackSelects);
	return html;
}

function createInputSelect(title, titleClass, additionalClass) {
	var select = $('<div>').addClass('btn-group').addClass(additionalClass);
	var button = $('<button>').attr('type','button').addClass('btn btn-default dropdown-toggle').attr('data-toggle','dropdown').attr('aria-expanded','false');
	button.append($('<span>' + title + ' </span>').addClass(titleClass)).append($('<span>').addClass('caret'));
	select.append(button).append($('<ul>').addClass('dropdown-menu').attr('role','menu'));
	return select;
}

function addToSack(element) {
	var container = $(element).parents('.select-row');
	var sackAttribute = 'sack' + sackNumber.toString();
	container.find('.sack-container button').before('<img src="images/search_cards/flipped.jpg" item="Flipped" sack="' + sackAttribute + '"/>');
	container.find('.sack-selects').append(createItemsAndSearchSelect().attr('sack', sackAttribute));
	sackNumber += 1;
	return sackAttribute;
}

function removeFromSack(element) {
	var elementAttr = $(element).parents('.select-sack').attr('sack');
	$(element).parents('.select-row').find('[sack="' + elementAttr + '"]').remove();
}

function updateSackItem(element, value) {
	var container = $(element).parents('.select-row');
	var parent = $(element).parent();
	var search = parent.hasClass('search');
	var tierOne = parent.hasClass('tierone');
	var relic = parent.hasClass('relic');
	var classItem = parent.hasClass('classitem');
	var elementAttr = $(element).parents('.select-sack').attr('sack');
	var folder = search ? 'search_cards' : 'items_cards/' + (tierOne ? 'tier_one' : relic ? 'relic' : 'tier_two');
	if (classItem) {
		folder = 'classes_cards/' + parent.attr('class').replace(new RegExp("classitem",'g'), '').replace(new RegExp("twohand",'g'), '').replace(new RegExp(" ",'g'), '');
	}
	container.find('img[sack="' + elementAttr + '"]').attr('src', 'images/' + folder + '/' + urlize(value) + '.jpg').attr('item', value);
	container.find('div[sack="' + elementAttr + '"]').find('.sack-title').html(value + ' ');
}

function getSkillsItems(type) {
	var result = [];
	for (var i = 0; i < CLASSES_ITEMS.length; i++) {
		if (CLASSES_ITEMS[i][2] == type) result.push(CLASSES_ITEMS[i]);
	}
	return result;
}

function monster(element) {
	var container = $(element);
	var monster = {};
	monster.title = container.find('[name="monster-title"]').val();
	monster.master = container.find('[name="master"]').val() == 'true';
	monster.x = container.find('[name="monster-x"]').val();
	monster.y = container.find('[name="monster-y"]').val();
	monster.vertical = container.find('[name="monster-x-size"]').val() < container.find('[name="monster-y-size"]').val();
	monster.hp = container.find('[name="monster-hp"]').val();
	monster.conditions = getConditions(container);
	return monster;
}

function hero(element) {
	var container = $(element);
	var hero = {};
	hero.title = container.find('[name="hero-title"]').val();
	if (hero.title != "") {
		hero.x = container.find('[name="hero-x"]').val();
		hero.y = container.find('[name="hero-y"]').val();
		hero.hp = container.find('[name="hero-hp"]').val();
		hero.stamina = container.find('[name="hero-stamina"]').val();
		hero.className = container.find('[name="class-title"]').val();
		if (CLASSES[hero.className].allowHybrid) hero.hybridClassName = container.find('[name="hybrid-class-title"]').val(); 
		hero.featUsed = container.find('.hero-image-container img').parent().hasClass('feat-used');
		hero.skills = getSkills(container, hero.className, hero.hybridClassName);
		hero.items = getItems(container);
		hero.sack = getSackAndSearch(container);
		hero.conditions = getConditions(container);
		hero.aura = getAura(container);
		hero.tainted = getTainted(container);
	}
	return hero;
}

function getSkills(container, className, hybridClassName) {
	var result = [];
	var skills = $(container).find('.checkbox.' + folderize(className) + ' input');
	for (var i = 0; i < skills.length; i++) {
		var currentSkill = $(skills[i]); 
		var image = container.find('img[skill="' + currentSkill.attr('name') + '"]');
		result.push([currentSkill.attr('name'), currentSkill.prop('checked'), currentSkill.hasClass('card-exhausted'), image.hasClass('hasmelody'), image.hasClass('hasharmony')]);
	}
	if (hybridClassName != undefined) {
		var hybridSkills = $(container).find('.checkbox.' + folderize(hybridClassName) + ' input');
		for (var i = 0; i < hybridSkills.length; i++) {
			var currentSkill = $(hybridSkills[i]); 
			var image = container.find('img[skill="' + currentSkill.attr('name') + '"]');
			result.push([currentSkill.attr('name'), currentSkill.prop('checked'), currentSkill.hasClass('card-exhausted'), image.hasClass('hasmelody'), image.hasClass('hasharmony')]);
		}
	}
	return result;
}

function getItems(container) {
	var items = {};
	items.hand = container.find('[name="hand"]').val();
	items.hand2 = container.find('[name="hand2"]').val();
	items.armor = container.find('[name="armor"]').val();
	items.item = container.find('[name="item"]').val();
	items.item2 = container.find('[name="item2"]').val();
	return items;
}

function getSackAndSearch(container) {
	var result = [];
	var sack = $(container).find('[item]');
	for (var i = 0; i < sack.length; i++) {
		result.push($(sack[i]).attr('item'));
	}
	return result;
}

function getAura(container) {
	var aura = {};
	var auraContainer = $(container).find('.aura');
	if (auraContainer.length == 0) return undefined;
	aura.radius = auraContainer.find('[name="aura-radius"]').val();
	aura.color = auraContainer.find('[name="aura-color"]').val();
	return aura;
}

function getTainted(container) {
	var taintedInput = $(container).find('[name="tainted"]');
	if (taintedInput != undefined) {
		return taintedInput.val();
	} else {
		return undefined;
	}
}

function populateQuestObjectives() {
	var questObjectives = {};
	questObjectives.heroesVictory = $('#heroes-victory').val();
	questObjectives.ovelordVictory = $('#overlord-victory').val();
	questObjectives.currentStatus = $('#current-status').val();
	questObjectives.reinforcements = $('#reinforcements').val();
	return questObjectives;
}

function getMapTiles() {
	var result = [];
	var tiles = $('#tiles-container .select-row');
	for (var i = 0; i < tiles.length; i++) {
		var container = $(tiles[i]);
		var tile = {};
		tile.title = container.find('[name="tile-title"]').val();
		tile.side = container.find('[name="tile-side"]').val();
		tile.x = container.find('[name="tile-x"]').val();
		tile.y = container.find('[name="tile-y"]').val();
		tile.angle = container.find('[name="tile-angle"]').val();
		result.push(tile);
	}
	return result;
}

function getDoors() {
	var result = [];
	var doors = $('#doors-container .select-row');
	for (var i = 0; i < doors.length; i++) {
		var container = $(doors[i]);
		var door = {};
		door.title = container.find('[name="door-title"]').val();
		door.vertical = container.find('[name="door-direction"]').val() == 'vertical';
		door.x = container.find('[name="door-x"]').val();
		door.y = container.find('[name="door-y"]').val();
		door.opened = container.find('[name="opened"]').prop('checked');
		result.push(door);
	}
	return result;
}

function getXs() {
	var result = [];
	var xs = $('#xs-container .select-row');
	for (var i = 0; i < xs.length; i++) {
		var container = $(xs[i]);
		var x = {};
		x.title = container.find('[name="xs-title"]').val();
		x.x = container.find('[name="xs-x"]').val();
		x.y = container.find('[name="xs-y"]').val();
		result.push(x);
	}
	return result;
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

function getLieutenants() {
	var result = [];
	var lieutenants = $('#lieutenants-container .select-row');
	for (var i = 0; i < lieutenants.length; i++) {
		var container = $(lieutenants[i]);
		var lieutenant = {};
		lieutenant.title = container.find('[name="lieutenant-title"]').val();
		lieutenant.x = container.find('[name="lieutenant-x"]').val();
		lieutenant.y = container.find('[name="lieutenant-y"]').val();
		lieutenant.hp = container.find('[name="lieutenant-hp"]').val();
		lieutenant.conditions = getConditions(container);
		lieutenant.hasBack = container.find('img.lieutenant-image-back').css('display') != 'none';
		lieutenant.vertical = container.find('[name="lieutenant-direction"]').val() == 'vertical';
		lieutenant.relics = [];
		var relics = container.find('[name="relic-title"]');
		for (var j = 0; j < relics.length; j++) {
			lieutenant.relics.push($(relics[j]).val());
		}
		lieutenant.skills = [];
		var skillCheckboxes = container.find('input[type="checkbox"]');
		for (var k = 0; k < skillCheckboxes.length; k++) {
			var skillCheckbox = $(skillCheckboxes[k]);
			if (skillCheckbox.prop('checked')) {
				lieutenant.skills.push(skillCheckbox.attr('name'));
			}
		}
		result.push(lieutenant);
	}
	return result;
}

function getPlotInfo() {
	var plot = {};
	var container = $('#plot .select-row');
	plot.title = container.find('[name="plot-deck-title"]').val();
	if (plot.title == undefined || plot.title =='') {
		return plot;
	}
	var cards = [];
	var plotCards = $(container).find('.checkbox.' + folderize(plot.title) + ' input');
	for (var i = 0; i < plotCards.length; i++) {
		var currentPlotCard = $(plotCards[i]); 
		// var image = container.find('img[skill="' + currentPlotCard.attr('name') + '"]');
		cards.push([currentPlotCard.attr('name'), currentPlotCard.prop('checked'), currentPlotCard.hasClass('card-exhausted')]);
	}
	plot.cards = cards;
	plot.number = $('[name="threat-tokens"]').val();
	return plot;
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

function getOverlordCards() {
	$('.overlord-cards-images-container img').css('display','none');
	var overlordCards = $('.overlord-cards-container input[type="checkbox"]');
	var result = [];
	for (var i = 0; i < overlordCards.length; i++) {
		var overlordCard = $(overlordCards[i]);
		if (overlordCard.prop('checked')) {
			var card = {};
			card.secondary = $('.overlord-cards-images-container img[card="' + overlordCard.attr('name') + '"].secondary').length;
			card.title = overlordCard.attr('name');
			result.push(card);
		}
	}
	return result;
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
			'left' : (tile.x * cellSize).toString() + 'px',
			'top' : (tile.y * cellSize).toString() + 'px'
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
			'left' : (door.x * cellSize).toString() + 'px',
			'top' : (door.y * cellSize).toString() + 'px'
		});
		if (door.vertical) {
			doorImage.css({
				'-ms-transform' : 'rotate(90deg)',
				'-webkit-transform' : 'rotate(90deg)',
				'transform' : 'rotate(90deg)',
				'transform-origin' : cellSize.toString() + 'px'
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
			'left' : (xs.x * cellSize).toString() + 'px',
			'top' : (xs.y * cellSize).toString() + 'px'
		});
		xsImage.attr('src', folder + urlize(xs.title) + '.png');
		xsObject.append(xsImage);
        map.append(xsObject);
	}
	
	for (var i = 0; config.objectives != undefined && i < config.objectives.length; i++) {
		var objective = config.objectives[i];
		var objectiveObject = $('<div>');
		var objectiveImage = $('<img>');
		var folder = 'images/misc/';
		var z_index = 0;
		objectiveObject.css({
			'position' : 'absolute',
			'left' : (objective.x * cellSize).toString() + 'px',
			'top' : (objective.y * cellSize).toString() + 'px',
			'z-index' : z_index
		});
		objectiveImage.attr('src', folder + urlize(objective.title) + '.png');
		objectiveObject.append(objectiveImage);
		if (objective.hp != undefined) {
			var objectiveHp = $('<div>').addClass('hit-points');
			objectiveHp.html(objective.hp.toString());
			objectiveObject.append(objectiveHp);
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
			'left' : (familiar.x * cellSize).toString() + 'px',
			'top' : (familiar.y * cellSize).toString() + 'px',
			'z-index' : z_index
		});
		familiarImage.attr('src', folder + urlize(familiar.title) + '.png');
		familiarObject.append(familiarImage);
		if (familiar.hp != undefined && familiar.hp != '') {
			var familiarHp = $('<div>').addClass('hit-points');
			familiarHp.html(familiar.hp.toString());
			familiarObject.append(familiarHp);
		}
		addConditionsToImage(familiarObject, familiar.conditions);
		addMapObject(familiar.x, familiar.y, familiarObject, z_index);
        figures.append(familiarObject);
	}
	
	for (var i = 0; config.monsters != undefined && i < config.monsters.length; i++) {
		var monster = config.monsters[i];
		var monsterObject = $('<div>');
		var monsterImage = $('<img>');
		var monsterHp = $('<div>').addClass('hit-points');
		var z_index = 2;
		monsterHp.html(monster.hp == undefined ? '' : monster.hp.toString());
		var folder = 'images/monster_tokens/';
		if (monster.vertical) folder += 'vertical/';
		monsterObject.css({
			'position' : 'absolute',
			'left' : (monster.x * cellSize).toString() + 'px',
			'top' : (monster.y * cellSize).toString() + 'px',
			'z-index' : z_index
		});
		monsterImage.attr('src', folder + urlize(monster.title) + (monster.master ? '_master.png' : '.png'));
		monsterObject.append(monsterImage);
		monsterObject.append(monsterHp);
		addConditionsToImage(monsterObject, monster.conditions);
		addMapObject(monster.x, monster.y, monsterObject, z_index);
        figures.append(monsterObject);
	}
	
	for (var i = 0; config.allies != undefined && i < config.allies.length; i++) {
		var ally = config.allies[i];
		var allyObject = $('<div>');
		var allyImage = $('<img>');
		var allyHp = $('<div>').addClass('hit-points');
		allyHp.html(ally.hp.toString());
		var folder = 'images/allies_tokens/';
		var z_index = 2;
		allyObject.css({
			'position' : 'absolute',
			'left' : (ally.x * cellSize).toString() + 'px',
			'top' : (ally.y * cellSize).toString() + 'px',
			'z-index' : z_index
		});
		allyImage.attr('src', folder + urlize(ally.title) + '.png');
		allyObject.append(allyImage);
		allyObject.append(allyHp);
		addConditionsToImage(allyObject, ally.conditions);
		addMapObject(ally.x, ally.y, allyObject, z_index);
        figures.append(allyObject);
	}
	
	for (var i = 0; config.lieutenants != undefined && i < config.lieutenants.length; i++) {
		var lieutenant = config.lieutenants[i];
		var lieutenantObject = $('<div>');
		var lieutenantImage = $('<img>');
		var lieutenantHp = $('<div>').addClass('hit-points');
		lieutenantHp.html(lieutenant.hp.toString());
		var folder = 'images/monster_tokens/';
		var z_index = 2;
		if (lieutenant.vertical != undefined && lieutenant.vertical) folder += 'vertical/';
		lieutenantObject.css({
			'position' : 'absolute',
			'left' : (lieutenant.x * cellSize).toString() + 'px',
			'top' : (lieutenant.y * cellSize).toString() + 'px',
			'z-index' : z_index
		});
		lieutenantImage.attr('src', folder + urlize(lieutenant.title.replace('Agent ', '')) + '.png');
		lieutenantObject.append(lieutenantImage);
		lieutenantObject.append(lieutenantHp);
		addConditionsToImage(lieutenantObject, lieutenant.conditions);
		addMapObject(lieutenant.x, lieutenant.y, lieutenantObject, z_index);
        figures.append(lieutenantObject);
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
			if (condition == undefined) continue;
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
	var heroHp = $('<div>').addClass('hit-points');
	heroHp.html(hero.hp.toString());
	var heroStamina = $('<div>').addClass('stamina');
	heroStamina.html(hero.stamina.toString());
	var folder = 'images/heroes_tokens/';
	heroObject.css({
		'position' : 'absolute',
		'left' : (hero.x * cellSize).toString() + 'px',
		'top' : (hero.y * cellSize).toString() + 'px',
		'z-index' : z_index
	});
	heroImage.attr('src', folder + urlize(hero.title) + '.png');
	if (hero.aura != undefined) {
		var aura = $('<div>');
		var auraRadius = parseInt(hero.aura.radius);
		aura.css({
			'position' : 'absolute',
			'left' : '-' + (auraRadius * cellSize).toString() + 'px',
			'top' : '-' + (auraRadius * cellSize).toString() + 'px',
			'width' : ((2 * auraRadius + 1) * cellSize).toString() + 'px',
			'height' : ((2 * auraRadius + 1) * cellSize).toString() + 'px',
			'background' : hero.aura.color,
			'opacity' : '0.2',
			'border-radius' : (cellSize / 2).toString() + 'px'
		});
		heroObject.append(aura);
	}
	heroObject.append(heroImage);
	heroObject.append(heroHp);
	heroObject.append(heroStamina);
	if (hero.hp == 0) heroObject.addClass('secondary');
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
	updateAct(config.actOne);
	updateTraitsAndExpansions();
	constructQuestObjectives();
	constructHeroesTabsFromConfig();
	constructMonstersAndLieutenantsTabFromConfig();
	constructMapControlsTabFromConfig();
	constructAlliesAndFamiliarsTabFromConfig();
	constructMiscellaneousObjectsTabFromConfig();
	constructOverlordCardsTabFromConfig();
	constructPlotDeckTabFromConfig();
	constructMapSize();
}

function updateTraitsAndExpansions() {
	if (config.monsterTraits != undefined) {
		monsterTraits = config.monsterTraits;
		updateTraits();
	}
	if (config.expansions != undefined) {
		selectedExpansions = config.expansions;
		updateExpansions();
	}
}

function updateTraits() {
	$('#monster-traits input').prop('checked',false);
	for (var monsterTrait in monsterTraits) {
		if (monsterTraits[monsterTrait] == undefined) continue;
		$('[name="' + urlize(monsterTrait) + '"]').prop('checked',true);
	}
}

function updateExpansions() {
	$('#expansions input').prop('checked',false);
	for (var selectedExpansion in selectedExpansions) {
		if (selectedExpansions[selectedExpansion] == undefined) continue;
		$('[name="' + urlize(selectedExpansion) + '"]').prop('checked',true);
	}
}

function constructQuestObjectives() {
	var questObjectives = config.questObjectives;
	if (questObjectives != undefined) {
		$('#heroes-victory').val(questObjectives.heroesVictory);
		$('#overlord-victory').val(questObjectives.ovelordVictory);
		$('#current-status').val(questObjectives.currentStatus);
		$('#reinforcements').val(questObjectives.reinforcements);
	}
}

function constructMapSize() {
	if (config.mapWidth != undefined) {
		mapWidth = config.mapWidth;
	}
	if (config.mapHeight != undefined) {
		mapHeight = config.mapHeight;
	}
}

function constructHeroesTabsFromConfig() {
	for (var i=1; i <= 4; i++) {
		var heroConfig = config['hero' + i.toString()];
		if (heroConfig.title != "" && heroConfig.title != undefined) {
			var heroSelector = '#hero' + i.toString();
			updateHero($(heroSelector + ' .select-hero li')[0],heroConfig.title);
			$(heroSelector + ' [name="hero-hp"]').val(heroConfig.hp);
			$(heroSelector + ' [name="hero-stamina"]').val(heroConfig.stamina);
			$(heroSelector + ' [name="hero-x"]').val(heroConfig.x);
			$(heroSelector + ' .x-title').html(getAlphabetChar(heroConfig.x - 1) + ' ');
			$(heroSelector + ' [name="hero-y"]').val(heroConfig.y);
			$(heroSelector + ' .y-title').html(heroConfig.y.toString() + ' ');
			if (heroConfig.className != undefined) {
				updateClass($(heroSelector + ' .select-class li')[0], heroConfig.className.toString(), true, false);
			}
			if (heroConfig.hybridClassName != undefined) {
				updateClass($(heroSelector + ' .select-hybrid-class li')[0], heroConfig.hybridClassName.toString(), true, true);
			}
			if (heroConfig.skills != undefined) {
				updateSkills($(heroSelector + ' .skills-container'), heroConfig.skills, i);
				adjustSkillsImages($(heroSelector + ' .skills-container'));
				if (heroConfig.hybridClassName != undefined) {
					adjustSkillsImages($(heroSelector + ' .skills-container'), true);
				}
			}
			if (heroConfig.items != undefined && heroConfig.items.hand != undefined && heroConfig.items.hand != '') {
				updateHand($(heroSelector + ' .select-weapon:not(.second-select) [onclick="updateHand(this, \'' + heroConfig.items.hand + '\')"]'), heroConfig.items.hand);
			}
			if (heroConfig.items != undefined && heroConfig.items.hand2 != undefined && heroConfig.items.hand2 != '') {
				updateHand($(heroSelector + ' .select-weapon.second-select [onclick="updateHand(this, \'' + heroConfig.items.hand2 + '\')"]'), heroConfig.items.hand2);
			}
			if (heroConfig.items != undefined && heroConfig.items.armor != undefined && heroConfig.items.armor != '') {
				updateArmor($(heroSelector + ' .select-armor [onclick="updateArmor(this, \'' + heroConfig.items.armor + '\')"]'), heroConfig.items.armor);
			}
			if (heroConfig.items != undefined && heroConfig.items.item != undefined && heroConfig.items.item != '') {
				updateItem($(heroSelector + ' .select-item:not(.second-select) [onclick="updateItem(this, \'' + heroConfig.items.item + '\')"]'), heroConfig.items.item);
			}
			if (heroConfig.items != undefined && heroConfig.items.item2 != undefined && heroConfig.items.item2 != '') {
				updateItem($(heroSelector + ' .select-item.second-select [onclick="updateItem(this, \'' + heroConfig.items.item2 + '\')"]'), heroConfig.items.item2);
			}
			if (heroConfig.sack != undefined) {
				for (var j = 0; j < heroConfig.sack.length; j++) {
					var sackAttribute = addToSack($(heroSelector + ' .sack-container button'));
					updateSackItem($(heroSelector + ' [sack="' + sackAttribute + '"] [onclick="updateSackItem(this, \'' + heroConfig.sack[j] + '\')"]'), heroConfig.sack[j]);
				}
			}
			if (heroConfig.featUsed != undefined && heroConfig.featUsed) {
				$(heroSelector + '> .select-row > .hero-image-container > img').parent().addClass('feat-used');
			}
			updateConditionsInSettings(heroConfig.conditions, $(heroSelector));
			if (heroConfig.aura != undefined) {
				var aura = addAura($(heroSelector + ' [onclick="addAura(this);"]'));
				aura.find('[name="aura-radius"]').val(heroConfig.aura.radius);
				aura.find('[name="aura-color"]').val(heroConfig.aura.color);
			}
			if (heroConfig.tainted != undefined) {
				var tainted = addTainted($(heroSelector + ' .tainted-container').find('button'));
				updateTainted($(heroSelector + ' .tainted-container a')[0], heroConfig.tainted);
			}
		}
	}
}

function updateConditionsInSettings(conditions, container) {
	var conditionsArray = getConditionsArrayFromObjectOrArray(conditions);
	for (var i = 0; i < conditionsArray.length; i++) {
		var condition = conditionsArray[i];
		updateCondition(addCondition(container.find('.btn-warning')).find('li')[0], condition);
	}
}

function constructMonstersAndLieutenantsTabFromConfig() {
	removeMonsterRows();
	if (config.monsters != undefined) {
		for (var i = 0; i < config.monsters.length; i++) {
			var monster = config.monsters[i];
			if (monster.title != '') {
				var monsterLine = addMonsterLine();
				var width = monster.vertical ? MONSTERS[monster.title].width : MONSTERS[monster.title].height;
				var height = monster.vertical ? MONSTERS[monster.title].height : MONSTERS[monster.title].width;
				
				var monsterSelectUnit = monsterLine.find('[onclick="updateMonster(this, \'' + monster.title + '\');"]');
				var correctMonsterSelectUnit;
				
				if (monster.master && $(monsterSelectUnit[0]).html().indexOf('master') > -1 || !monster.master && !($(monsterSelectUnit[0]).html().indexOf('master') > -1)) {
					correctMonsterSelectUnit = monsterSelectUnit[0];
				} else {
					correctMonsterSelectUnit = monsterSelectUnit[1];
				}
				updateMonster(correctMonsterSelectUnit, monster.title);
				
				var xValue = width.toString() + monster.x.toString();
				updateCoordinate(monsterLine.find('.select-x [onclick="updateCoordinate(this, \'' + xValue + '\');"]'), xValue);
				var yValue = height.toString() + monster.y.toString();
				updateCoordinate(monsterLine.find('.select-y [onclick="updateCoordinate(this, \'' + yValue + '\');"]'), yValue);
				monsterLine.find('input[name="monster-hp"]').val(monster.hp);
				updateConditionsInSettings(monster.conditions, monsterLine);
			}
		}
	}
	if (config.lieutenants != undefined) {
		for (var i = 0 ; i < config.lieutenants.length; i++) {
			var container = addLieutenantLine();
			var lieutenant = config.lieutenants[i];
			updateLieutenant(container.find('.select-lieutenant li')[0], lieutenant.title, lieutenant.hasBack);
			container.find('[name="lieutenant-x"]').val(lieutenant.x);
			container.find('.x-title').html(getAlphabetChar(lieutenant.x - 1) + ' ');
			container.find('[name="lieutenant-y"]').val(lieutenant.y);
			container.find('.y-title').html(lieutenant.y.toString() + ' ');
			container.find('[name="lieutenant-hp"]').val(lieutenant.hp);
			var direction = lieutenant.vertical == undefined || !lieutenant.vertical ? 'horizontal' : 'vertical';
			container.find('.direction-title').html(direction + ' ');
			container.find('[name="lieutenant-direction"]').val(direction);
			for (var j = 0; lieutenant.skills != undefined && j < lieutenant.skills.length; j++) {
				container.find('[name="' + lieutenant.skills[j] + '"]').prop('checked', true);
			}
			updateConditionsInSettings(lieutenant.conditions, container);
			for (var k = 0; lieutenant.relics != undefined && k < lieutenant.relics.length; k++) {
				var relicContainer = addRelic(container.find('[onclick="addRelic(this);"]'));
				updateOverlordRelic(relicContainer.find('li')[0], lieutenant.relics[k]);
			}
//			adjustAlliesSkillsImages(container.children()[0]);
		}
	}
}

function constructMapControlsTabFromConfig() {
	if (config.tiles != undefined) {
		for (var i = 0 ; i < config.tiles.length; i++) {
			var container = addMapTileLine();
			var tile = config.tiles[i];
			updateTile(container.find('.select-tile li')[0], tile.title);
			updateSide(container.find('.select-side li')[0], tile.side);
			container.find('[name="tile-x"]').val(tile.x);
			container.find('.x-title').html(getAlphabetChar(tile.x - 1) + ' ');
			container.find('[name="tile-y"]').val(tile.y);
			container.find('.y-title').html(tile.y.toString() + ' ');
			updateAngle(container.find('.select-angle li')[0], tile.angle);
		}
	}
	if (config.doors != undefined) {
		for (var i = 0 ; i < config.doors.length; i++) {
			var container = addDoorLine();
			var door = config.doors[i];
			updateDoor(container.find('.select-door li')[0], door.title);
			updateDirection(container.find('.select-direction li')[0], door.vertical ? 'vertical' : 'horizontal');
			if (door.opened != undefined) {
				container.find('[name="opened"]').prop('checked', door.opened);
			}
			container.find('[name="door-x"]').val(door.x);
			container.find('.x-title').html(getAlphabetChar(door.x - 1) + ' ');
			container.find('[name="door-y"]').val(door.y);
			container.find('.y-title').html(door.y.toString() + ' ');
		}
	}
	if (config.xs != undefined) {
		for (var i = 0 ; i < config.xs.length; i++) {
			var container = addXsLine();
			var xs = config.xs[i];
			updateXs(container.find('.select-xs li')[0], xs.title);
			container.find('[name="xs-x"]').val(xs.x);
			container.find('.x-title').html(getAlphabetChar(xs.x - 1) + ' ');
			container.find('[name="xs-y"]').val(xs.y);
			container.find('.y-title').html(xs.y.toString() + ' ');
		}
	}
}

function constructAlliesAndFamiliarsTabFromConfig() {
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

function constructOverlordCardsTabFromConfig() {
	for (var i = 0; config.overlord != undefined && config.overlord.cards != undefined && i < config.overlord.cards.length; i++) {
		var card = config.overlord.cards[i];
		updateOverlordCard(card.title, true);
		var imageObjects = $('[card="' + card.title + '"');
		for (var j = 0; j < card.secondary && j < imageObjects.length; j++) {
			$(imageObjects[j]).addClass('secondary');
		}
	}
	if (config.overlord != undefined && config.overlord.cards != undefined) {
		adjustOverlordCardsImages();
	}
}

function constructPlotDeckTabFromConfig() {
	if (config.plot != undefined) {
		if (config.plot.title != undefined && config.plot.title != '') {
			for (var i = 0; i < config.plot.cards.length; i++) {
				var card = config.plot.cards[i];
				var plotCard=$('input[type="checkbox"][name="' + card[0] + '"]');
				plotCard.prop('checked', card[1]);
				if (card[2]) {
					plotCard.addClass('card-exhausted', 'exhausted');
					$('#plot img[card="' + card[0] + '"]').addClass('exhausted')
				}
			}
			updatePlotDeck($('#plot .select-plot-deck li a')[0], config.plot.title);
			$('[name="threat-tokens"]').val(config.plot.number);
		}
	}
}

function updateConfig() {
	window.location.hash = Base64.encode(JSON.stringify(config));
}

function decodeConfig() {
	config = JSON.parse(Base64.decode(window.location.hash));
}

function collectData() {
	var monsterRows = $('#monsters-container .select-row');
	config.monsters = [];
	for (var i = 0; i < monsterRows.length; i++) {
		config.monsters.push(monster(monsterRows[i]));
	}
	config.questObjectives = populateQuestObjectives();
	config.hero1 = hero($('#hero1 .select-row'));
	config.hero2 = hero($('#hero2 .select-row'));
	config.hero3 = hero($('#hero3 .select-row'));
	config.hero4 = hero($('#hero4 .select-row'));
	config.tiles = getMapTiles();
	config.doors = getDoors();
	config.xs = getXs();
	config.allies = getAllies();
	config.familiars = getFamiliars();
	config.objectives = getObjectives();
	config.overlord = {};
	config.overlord.cards = getOverlordCards();
	config.lieutenants = getLieutenants();
	config.plot = getPlotInfo();
	config.actOne = actOne;
	config.mapWidth = mapWidth;
	config.mapHeight = mapHeight;
	config.monsterTraits = monsterTraits;
	config.expansions = selectedExpansions;
}

function drawGrid() {
	for (var i = 0; i < mapWidth; i++) {
		var element = $('<div>');
		element.html(getAlphabetChar(i));
		element.css({
				'position' : 'absolute',
				'left' : ((1 + i) * cellSize).toString() + 'px',
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
				'top' : ((1 + i) * cellSize).toString() + 'px'
		});
		$('.grid').append(element);
	}
}

function updateAct(actOne) {
	var isActOne = actOne == undefined || actOne; 
	$(isActOne ? '#actOne' : '#actTwo').prop('checked', true);
	adjustAct();
}

function adjustAct() {
	actOne = $('[name="act"]:checked').val() == 'one';
	adjustMonsterList();
}

function setShortLink() {
	var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		string = '',
		charCnt = 20,
		uri;
	for (var i = 0; i < charCnt; i += 1) {
		string += characters[Math.floor(Math.random() * characters.length)];
	}
	uri = 'http://tinyurl.com/create.php?source=indexpage&url=' + encodeURIComponent(location.href) + '&alias=' + string;
	$('body').append('<img src="' + uri + '" style="height: 1px; width: 1px; position: absolute; z-index: -999; opacity: 0;" />');
	var tinyUrl = $('#tinyUrl');
    tinyUrl.html('Tiny link: http://tinyurl.com/' + string);
    tinyUrl.attr('href', 'http://tinyurl.com/' + string);
}

function getMapHash() {
	var config2 = {};
	config2.xs = config.xs;
	config2.tiles = config.tiles;
	config2.doors = config.doors;
	config2.objectives = config.objectives;
	console.log(Base64.encode(JSON.stringify(config2)));
}

function switchToMap() {
//	$('[href="#map"]').tab('show');
	$('[href="#map"]').click();
}

function clearAdditionalElements() {
	clearMapControlTab();
	clearMiscellaneousObjectsTab();
	clearHeroesSackAndSearchItems();
	clearHeroesConditions();
	clearLieutenants();
	clearFamiliarsAndAllies();
}

function moveObjectsOnMap(right, down) {
	for (var n in config) {
		var configPart = config[n];
		if (configPart == undefined) continue;
		if (configPart.x != undefined) {
			configPart.x = (parseInt(configPart.x) + right).toString();
			configPart.y = (parseInt(configPart.y) + down).toString();
		} else {
			for (var i = 0; i < configPart.length && configPart.length != undefined; i++) {
				if (configPart[i].x != undefined) {
					configPart[i].x = (parseInt(configPart[i].x) + right).toString();
					configPart[i].y = (parseInt(configPart[i].y) + down).toString();;
				}
			}
			
		}
	}
	constructMapFromConfig();
	clearAdditionalElements();
	constructSettingsFromConfig();
	updateConfig();
}

function rotateMap(clockwise) {
	var realWidth = 0;
	var realHeight = 0; 
	for (var i = 0; i < config.tiles.length; i++) {
		var tile = config.tiles[i];
		var rightSide, bottomSide;
		if (tile.angle == 90 || tile.angle == 270) {
			rightSide = parseInt(tile.x) + MAP_TILES_SIZES[tile.title].height - 1;
			bottomSide = parseInt(tile.y) + MAP_TILES_SIZES[tile.title].width - 1 + 1; //+1 for the nubering is starting from 0
		} else {
			rightSide = parseInt(tile.x) + MAP_TILES_SIZES[tile.title].width - 1;
			bottomSide = parseInt(tile.y) + MAP_TILES_SIZES[tile.title].height - 1 + 1;
		}
		if (rightSide > realWidth) realWidth = rightSide;
		if (bottomSide > realHeight) realHeight = bottomSide;
	}
	rotateTiles(clockwise, realWidth, realHeight);
	rotateDoors(clockwise, realWidth, realHeight);
	rotateMonsters(clockwise, realWidth, realHeight);
	rotateLieutenants(clockwise, realWidth, realHeight);
	rotateHeroes(clockwise, realWidth, realHeight);
	rotateAllies(clockwise, realWidth, realHeight);
	rotateFamiliars(clockwise, realWidth, realHeight);
	rotateObjectives(clockwise, realWidth, realHeight);
	constructMapFromConfig();
	clearAdditionalElements();
	constructSettingsFromConfig();
	updateConfig();
}

function rotateTiles(clockwise, realWidth, realHeight) {
	if (clockwise) {
		for (var i = 0; i < config.tiles.length; i++) {
			var tile = config.tiles[i];
			var tileHeight;
			if (tile.angle == 270 || tile.angle == 90) {
				tileHeight = MAP_TILES_SIZES[tile.title].width;
			} else {
				tileHeight = MAP_TILES_SIZES[tile.title].height;
			}
			if (tile.angle == 270) {
				tile.angle = "0";
			} else {
				tile.angle = (parseInt(tile.angle) + 90).toString();
			}
			rotateObjectClockwise(tile, tileHeight, realHeight);
		}
	} else {
		for (var i = 0; i < config.tiles.length; i++) {
			var tile = config.tiles[i];
			var tileWidth;
			if (tile.angle == 270 || tile.angle == 90) {
				tileWidth = MAP_TILES_SIZES[tile.title].height;
			} else {
				tileWidth = MAP_TILES_SIZES[tile.title].width;
			}
			if (tile.angle == 0) {
				tile.angle = "270";
			} else {
				tile.angle = (parseInt(tile.angle) - 90).toString();
			}
			rotateObjectCounterClockwise(tile, tileWidth, realWidth);
		}
	}
}

function rotateDoors(clockwise, realWidth, realHeight) {
	for (var i = 0; i < config.doors.length; i++) {
		var door = config.doors[i];
		var height, width;
		if (door.vertical) {
			height = 4;
			width = 2;
		} else {
			height = 2;
			width = 4;
		}
		door.vertical = !door.vertical;
		rotateObject(clockwise, door, height, width, realHeight, realWidth);
	}
}

function rotateXs(clockwise, realWidth, realHeight) {
	for (var i = 0; i < config.doors.length; i++) {
		var x = config.doors[i];
		var height, width;
		height = parseInt(x.title.substring(0,1));
		width = height;
		rotateObject(clockwise, x, height, width, realHeight, realWidth);
	}
}

function rotateMonsters(clockwise, realWidth, realHeight) {
	for (var i = 0; i < config.monsters.length; i++) {
		var monster = config.monsters[i];
		var height, width;
		if (monster.vertical) {
			height = MONSTERS[monster.title].width;
			width = MONSTERS[monster.title].height;
		} else {
			height = MONSTERS[monster.title].height;
			width = MONSTERS[monster.title].width;
		}
		monster.vertical = !monster.vertical;
		rotateObject(clockwise, monster, height, width, realHeight, realWidth);
	}
}

function rotateLieutenants(clockwise, realWidth, realHeight) {
	if (config.lieutenants == undefined) {
		return;
	}
	for (var i = 0; i < config.lieutenants.length; i++) {
		var lieutenant = config.lieutenants[i];
		var height, width;
		if (lieutenant.vertical) {
			height = LIEUTENANTS[lieutenant.title].width;
			width = LIEUTENANTS[lieutenant.title].height;
		} else {
			height = LIEUTENANTS[lieutenant.title].height;
			width = LIEUTENANTS[lieutenant.title].width;
		}
		lieutenant.vertical = !lieutenant.vertical;
		rotateObject(clockwise, lieutenant, height, width, realHeight, realWidth);
	}
}

function rotateHeroes(clockwise, realWidth, realHeight) {
	for (var i = 0; i < 4; i++) {
		var hero = config['hero' + (i+1).toString()];
		if (config.hero4.title == '') {
			continue;
		}
		var height = 1, width = 1;
		rotateObject(clockwise, hero, height, width, realHeight, realWidth);
	}
}

function rotateAllies(clockwise, realWidth, realHeight) {
	for (var i = 0; i < config.allies.length; i++) {
		var ally = config.allies[i];
		var height = 1, width = 1;
		rotateObject(clockwise, ally, height, width, realHeight, realWidth);
	}
}

function rotateFamiliars(clockwise, realWidth, realHeight) {
	for (var i = 0; i < config.familiars.length; i++) {
		var familiar = config.familiars[i];
		var height = 1, width = 1;
		rotateObject(clockwise, familiar, height, width, realHeight, realWidth);
	}
}

function rotateObjectives(clockwise, realWidth, realHeight) {
	for (var i = 0; i < config.objectives.length; i++) {
		var objective = config.objectives[i];
		var height = 1, width = 1;
		rotateObject(clockwise, objective, height, width, realHeight, realWidth);
	}
}

function rotateObjectClockwise(object, height, canvasHeight) {
	var newX = (canvasHeight - parseInt(object.y) + 1 - height).toString(); //+1 and -1 lower are made becays numbering on x starts width 1 and on y - with 0 
	object.y = (parseInt(object.x) - 1).toString();
	object.x = newX;
}

function rotateObjectCounterClockwise(object, width, canvasWidth) {
	var newY = (canvasWidth - parseInt(object.x) - width + 1).toString(); 
	object.x = (parseInt(object.y) + 1).toString();
	object.y = newY;
}

function rotateObject(clockwise, object, height, width, canvasHeight, canvasWidth) {
	if (clockwise) {
		rotateObjectClockwise(object, height, canvasHeight);
	} else {
		rotateObjectCounterClockwise(object, width, canvasWidth);
	}
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
	$('#map-transformation div').toggle();
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

$(function() {
	addMonsterLine();
	for (var i = 1; i <= 4; i++) {
		addHeroLine(i);
	}
	createFullMapsBlock();
	createFamiliarsImagesBlock();
	createMonsterTraitsBlock();
	createExpansionsBlock();
	createOverlordCardsBlock();
	createPlotDeckBlock();
	if (window.location.hash != "") {
		decodeConfig();
		constructSettingsFromConfig();
		constructMapFromConfig();
	} else {
		//TEST
		config = JSON.parse(Base64.decode(defaultConfig));
		constructSettingsFromConfig();
		constructMapFromConfig();
	}
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
});
