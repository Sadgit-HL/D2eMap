function getQuestObjectives() {
	var questObjectives = {};
	questObjectives.heroesVictory = $('#heroes-victory').val();
	questObjectives.ovelordVictory = $('#overlord-victory').val();
	questObjectives.currentStatus = $('#current-status').val();
	questObjectives.reinforcements = $('#reinforcements').val();
	return questObjectives;
}

function fillQuestObjectives() {
	var questObjectives = config.questObjectives;
	if (questObjectives != undefined) {
		$('#heroes-victory').val(questObjectives.heroesVictory);
		$('#overlord-victory').val(questObjectives.ovelordVictory);
		$('#current-status').val(questObjectives.currentStatus);
		$('#reinforcements').val(questObjectives.reinforcements);
	}
}

function clearQuestObjectives() {
	$('#heroes-victory').val('');
	$('#overlord-victory').val('');
	$('#current-status').val('');
	$('#reinforcements').val('');
}
