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
				cardsImages.append($('<img>').attr('src', 'images/overlord_cards/' + cardType + '/' + urlize(card.title) + '.png').attr('card', card.title).attr('onclick','$(this).toggleClass(\'secondary\');').css('display','none'));
			}
		}
	}
	html.prepend(cardsImages);
	$('#overlord-container').append(html);
	adjustOverlordCardsImages();
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

