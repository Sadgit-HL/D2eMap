function toggleMenu() {
	$('.menu').toggleClass('active');
}

function urlize(value) {
	return somethingize(value, '_'); 
}

function folderize(value) {
	return somethingize(value, '');
}

function somethingize(value, replacement) {
	if (value == undefined) {
		console.log('somethingize value is undefined');
		return '';
	}
	return value.replace(new RegExp(" ",'g'), replacement).toLowerCase();
}

function mapTilize(value) {
	return value.replace(new RegExp(" ",'g'), '');
}