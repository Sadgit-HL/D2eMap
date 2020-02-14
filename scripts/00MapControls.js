function Initialize_MapControls() {
	var html = $('.top-controls');
	html.append('<div id="tinyUrl">Place for tiny link</div>');
	var TransformationDiv = $('<div>').addClass('map-transformation');
	TransformationDiv.append('<button type="button" class="btn btn-link" aria-expanded="false" onclick="toggleMapControls();">Show/hide map controls</button>');
	var ButtonsDiv = $('<div>').addClass('btn-group');
	ButtonsDiv.css('display','none');
	ButtonsDiv.append('<button type="button" class="btn" aria-expanded="false" onclick="moveObjectsOnMap(1,0);">Move map right</button>');
	ButtonsDiv.append('<button type="button" class="btn" aria-expanded="false" onclick="moveObjectsOnMap(-1,0);">Move map left</button>');
	ButtonsDiv.append('<button type="button" class="btn" aria-expanded="false" onclick="moveObjectsOnMap(0,1);">Move map down</button>');
	ButtonsDiv.append('<button type="button" class="btn" aria-expanded="false" onclick="moveObjectsOnMap(0,-1);">Move map up</button>');
	ButtonsDiv.append('<button type="button" class="btn" aria-expanded="false" onclick="rotateMap(true);">Rotate clockwise</button>');
	ButtonsDiv.append('<button type="button" class="btn" aria-expanded="false" onclick="rotateMap(false);">Rotate counterclockwise</button>');
	ButtonsDiv.append('<button type="button" class="btn" aria-expanded="false" onclick="updateMapSize();">UpdateMapSize (Changes will be made after refresh)</button>');
	ButtonsDiv.append('<input type="text" name="map-width" class="form-control" placeholder="Set Width" value="">');
	ButtonsDiv.append('<input type="text" name="map-height" class="form-control" placeholder="Set Height" value="">');
	TransformationDiv.append(ButtonsDiv);
	html.append(TransformationDiv);
}

function moveObjectsOnMap(right, down) {
    var HexDelta = 0;
    var DeltaApply = 0;
    var Value = 0;
    var minX = 9999;
    var minY = 9999;

    if (cellType == "HEX") {
        for (var n in config) {
            var configPart = config[n];
            if (configPart == undefined) continue;
            if (configPart.x != undefined) {
                if (minX > parseInt(configPart.x)) {
                    minX = parseInt(configPart.x);
                    //					minY = parseInt(configPart.y);
                }
                //				else if (minX == parseInt(configPart.x))
                //				{
                //					if (minY > parseInt(configPart.y))
                //					{
                //						minY = parseInt(configPart.y);
                //					}
                //				}
            }
            else {
                for (var i = 0; i < configPart.length && configPart.length != undefined; i++) {
                    if (configPart[i].x != undefined) {
                        if (minX > parseInt(configPart[i].x)) {
                            minX = parseInt(configPart[i].x);
                            //							minY = parseInt(configPart[i].y);
                        }
                        //						else if (minX == parseInt(configPart[i].x))
                        //						{
                        //							if (minY > parseInt(configPart[i].y))
                        //							{
                        //								minY = parseInt(configPart[i].y);
                        //							}
                        //						}
                    }
                }
            }
        }
        if (minX % 2 == 1) {
            DeltaApply = 0; //when x is odd (before update)
            Value = 1;
        }
        else {
            DeltaApply = 1;	//when x is even (before update)
            Value = -1;
        }
    }

    for (var n in config) {
        var configPart = config[n];
        if (configPart == undefined) continue;
        if (configPart.x != undefined) {
            HexDelta = 0;
            if (cellType == "HEX" && down == 0 && (parseInt(configPart.x) % 2) == DeltaApply) {
                HexDelta = Value;
            }
            configPart.x = (parseInt(configPart.x) + right).toString();
            configPart.y = (parseInt(configPart.y) + down + HexDelta).toString();
        }
        else {
            for (var i = 0; i < configPart.length && configPart.length != undefined; i++) {
                if (configPart[i].x != undefined) {
                    HexDelta = 0;
                    if (cellType == "HEX" && down == 0 && (parseInt(configPart[i].x) % 2) == DeltaApply) {
                        HexDelta = Value;
                    }
                    configPart[i].x = (parseInt(configPart[i].x) + right).toString();
                    configPart[i].y = (parseInt(configPart[i].y) + down + HexDelta).toString();;
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
	rotateAgents(clockwise, realWidth, realHeight);
	rotateHeroes(clockwise, realWidth, realHeight);
	rotateAllies(clockwise, realWidth, realHeight);
	rotateFamiliars(clockwise, realWidth, realHeight);
	rotateVillagers(clockwise, realWidth, realHeight);
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

function rotateAgents(clockwise, realWidth, realHeight) {
	if (config.agents == undefined) {
		return;
	}
	for (var i = 0; i < config.agents.length; i++) {
		var agent = config.agents[i];
		var height, width;
		if (agent.vertical) {
			height = LIEUTENANTS[agent.title].width;
			width = LIEUTENANTS[agent.title].height;
		} else {
			height = LIEUTENANTS[agent.title].height;
			width = LIEUTENANTS[agent.title].width;
		}
		agent.vertical = !agent.vertical;
		rotateObject(clockwise, agent, height, width, realHeight, realWidth);
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

function rotateVillagers(clockwise, realWidth, realHeight) {
	for (var i = 0; i < config.villagers.length; i++) {
		var villager = config.villagers[i];
		var height = 1, width = 1;
		rotateObject(clockwise, villager, height, width, realHeight, realWidth);
	}
}

function rotateObjectives(clockwise, realWidth, realHeight) {
	for (var i = 0; i < config.maptokens.length; i++) {
		var objective = config.maptokens[i];
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


function AddArrayObjectsOnMap(ArrayObject, ImageFolder, LineType, Layer) {
	for (var i = 0; ArrayObject != undefined && i < ArrayObject.length; i++) {
		var NewObject;
		switch (cellType) {
			case "HEX":
						NewObject = CreateOneObjectOnHEXMap(ArrayObject[i], ImageFolder, LineType);
						break;
			case "SQUARE":
						NewObject = CreateOneObjectOnSQUAREMap(ArrayObject[i], ImageFolder, LineType);
						break;
		}

		Layer.append(NewObject);
	}
}
function AddObjectsOnMap(ObjectToDisplay, ImageFolder, LineType, Layer) {
	if (Object != undefined) {
		var NewObject;
		switch (cellType) {
			case "HEX":
				NewObject = CreateOneObjectOnHEXMap(ObjectToDisplay, ImageFolder, LineType);
				break;
			case "SQUARE":
				NewObject = CreateOneObjectOnSQUAREMap(ObjectToDisplay, ImageFolder, LineType);
				break;
		}

		Layer.append(NewObject);
	}
}
function CreateOneObjectOnSQUAREMap(OneObject, ImageFolder, LineType) {
	//default values
	var ImageFullPath = ImageFolder;
	var cssTransform = "";
	var xToSet = OneObject.x;
	var yToSet = OneObject.y;
	//test angle
	var angle = "0";
	if (OneObject.angle != undefined) {
		angle = OneObject.angle;
		if (angle == '') {
			angle = "0";
		}
		if (angle != "0") {
			//Force origin to VCellSize/2 HCellSize/2
			cssTransform = "32px 32px";
		}
	}
	//test side
	var side = "";
	if(OneObject.side != undefined) {
		side = OneObject.side;
	}
	//test direction (special doors / monsters / ... anithing with direction V/H)
	if (OneObject.direction != undefined) {
		switch (OneObject.direction) {
			case "H":
				// nothing to change
				//cssTransform = ",'transform-origin':" + HCellSize.toString() + "'px'";
				break;
			case "V":
				//Force Angle to  90
				cssTransform = "32px 32px";
				angle = "90";
				//Force origin to HCellSize special doors
				if (LineType.elementName == "door") {

					cssTransform = HCellSize.toString() + "px";
				}
				break;
		}
	}
	//test opened
	var opened = false;
	if (OneObject.opened != undefined) {
		opened = OneObject.opened;
	}
	//z-index
	var zIndex = "";
	if (LineType.mapData.zIndex != "NA") {
		zIndex = LineType.mapData.zIndex;
	}

	//New Image
	var NewMapObjectImage = $('<img>');
	ImageFullPath = ImageFullPath + urlize(OneObject.title.replace(MinionSuffix, '')) + side + '.png';
	NewMapObjectImage.attr('src', ImageFullPath);
	//rotation
	if (angle != "0") {
		NewMapObjectImage.css({
			'-ms-transform': 'rotate(' + angle + 'deg)',
			'-webkit-transform': 'rotate(' + angle + 'deg)',
			'transform': 'rotate(' + angle + 'deg)',
			'transform-origin': cssTransform
		});
		//update x y in function of the angle (rotation a fixed point) by default top/left
		switch (angle) {
			case "90":
				//fixed point now top / right
				// same y 
				// x = oldX + width (wich is height before rotating 90)
				xToSet = parseInt(xToSet) + LineType.AllData[recoverMonsterBaseName(OneObject.title)].height - 1;
				break;
			case "180":
				//fixed point now bottom / right
				// y = oldY - height
				yToSet = parseInt(yToSet) + LineType.AllData[recoverMonsterBaseName(OneObject.title)].height - 1;
				// x = oldX - width
				xToSet = parseInt(xToSet) + LineType.AllData[recoverMonsterBaseName(OneObject.title)].width - 1;
				break;
			case "270":
				//fixed point now bottom / left
				// y = oldY - height (wich is width before rotating 270)
				yToSet = parseInt(yToSet) + LineType.AllData[recoverMonsterBaseName(OneObject.title)].width - 1;
				// same x
				break;
		}
	}

	//Put Image In Div + Css positioning
	var NewMapObject = $('<div>');
	NewMapObject.css({
		'position': 'absolute',
		'left': (xToSet * HCellSize).toString() + 'px',
		'top': (yToSet * VCellSize).toString() + 'px',
		'z-index': zIndex
	});
	//for doors
	if (opened) {
		NewMapObject.addClass('opened');
	}
	//add custom Inputs data
	for (j = 0; j < MAX_CustomInputs; j++) {
		if (LineType.mapData['DisplayCI' + j]) {
			if (OneObject.ci != undefined) {
				if (OneObject.ci[j] != undefined) {
					var OneObjectCustomInputTemp = $('<div>').addClass('ci' + j);
					OneObjectCustomInputTemp.html((OneObject.ci == undefined || OneObject.ci[j] == undefined) ? '' : OneObject.ci[j].toString());
					NewMapObject.append(OneObjectCustomInputTemp);
					if (LineType.mapData['SpecificClassZeroCI' + j] != '' && OneObject.ci[j] == 0) {
						NewMapObject.addClass(LineType.mapData['SpecificClassZeroCI' + j]);	//drowned
					}
				}
			}
		}
	}
	//add tokens / conditions
	if (LineType.needAddTokenButton) {
		var conditionsDisplayContainer = $('<div>').addClass('conditions');

		var updatedSourceConfig = getConditionsArrayFromObjectOrArray(OneObject.conditions);
		var interval = updatedSourceConfig != undefined && updatedSourceConfig.length > 3 ? Math.floor(50 / updatedSourceConfig.length) : 20;
		for (var j = 0; updatedSourceConfig != undefined && j < updatedSourceConfig.length; j++) {
			var OneConditionToDisplay = $('<img>').attr('src', 'images/conditions_tokens/' + urlize(updatedSourceConfig[j]) + '.png');
			if (j > 0) OneConditionToDisplay.css({
				'position': 'absolute',
				'top': (interval * j).toString() + 'px'
			});
			conditionsDisplayContainer.append(OneConditionToDisplay);
		}
		NewMapObject.append(conditionsDisplayContainer);
	}
	//aura
	if (LineType.needAddAuraButton) {
		if (OneObject.auras != undefined) {
			for (var j = 0; j < OneObject.auras.length; j++) {
				var aura = $('<div>');
				var auraRadius = parseInt(OneObject.auras[j].radius);

				var xDelta;
				var yDelta;
				if (OneObject.vertical) {
					xDelta = MONSTERS[recoverMonsterBaseName(OneObject.title)].width;
					yDelta = MONSTERS[recoverMonsterBaseName(OneObject.title)].height;
				}
				else {
					xDelta = MONSTERS[recoverMonsterBaseName(OneObject.title)].height;
					yDelta = MONSTERS[recoverMonsterBaseName(OneObject.title)].width;
				}
				if (OneObject.direction == "V") {
					xDelta = MONSTERS[recoverMonsterBaseName(OneObject.title)].width;
					yDelta = MONSTERS[recoverMonsterBaseName(OneObject.title)].height;
				}
				else {
					xDelta = MONSTERS[recoverMonsterBaseName(OneObject.title)].height;
					yDelta = MONSTERS[recoverMonsterBaseName(OneObject.title)].width;
				}


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


				if (agent.vertical) {
					xDelta = LIEUTENANTS[agent.title].width;
					yDelta = LIEUTENANTS[agent.title].height;
				}
				else {
					xDelta = LIEUTENANTS[agent.title].height;
					yDelta = LIEUTENANTS[agent.title].width;
				}
				if (agent.direction == "V") {
					xDelta = LIEUTENANTS[agent.title].width;
					yDelta = LIEUTENANTS[agent.title].height;
				}
				else {
					xDelta = LIEUTENANTS[agent.title].height;
					yDelta = LIEUTENANTS[agent.title].width;
				}

				aura.css({
					'position': 'absolute',
					'left': '-' + (auraRadius * HCellSize).toString() + 'px',
					'top': '-' + (auraRadius * VCellSize).toString() + 'px',
					'width': ((2 * auraRadius + xDelta) * HCellSize).toString() + 'px',
					'height': ((2 * auraRadius + yDelta) * VCellSize).toString() + 'px',
					'background': OneObject.auras[j].color,
					'opacity': '0.2',
					'border-radius': ((HCellSize + VCellSize) / 4).toString() + 'px'
				});
				NewMapObject.append(aura);
			}
		}
	}

	NewMapObject.append(NewMapObjectImage);

	//add in an array for later testing obverlapping
	if (LineType.mapData.Layer == "figures") {
		var coordinateObjects = mapObjects[[OneObject.x, OneObject.y]];
		if (coordinateObjects == undefined) {
			coordinateObjects = mapObjects[[OneObject.x, OneObject.y]] = [];
		}
		coordinateObjects.push({ "object": NewMapObject, "priority": zIndex });
	}

	return NewMapObject;
}
function CreateOneObjectOnHEXMap(OneObject, ImageFolder, LineType) {
	var ImageFullPath = ImageFolder;
	var HexDelta = (1 - (OneObject.x % 2)) * (VCellSize / 2);
	//test angle
	var angle = 0;
	if (OneObject.angle != undefined) {
		angle = OneObject.angle;
	}
	//test side
	var side = "";
	if (OneObject.side != undefined) {
		side = OneObject.side;
	}

	//New Image
	var NewObjectImage = $('<img>');
	NewObjectImage.css({
		'-ms-transform': 'rotate(' + angle + 'deg)',
		'-webkit-transform': 'rotate(' + angle + 'deg)',
		'transform': 'rotate(' + angle + 'deg)',
		'transform-origin': MAP_TILES_CENTER_ROTATE_CELL[tile.title].left + 'px ' + MAP_TILES_CENTER_ROTATE_CELL[tile.title].top + 'px'
	});
	ImageFullPath = ImageFullPath + mapTilize(OneObject.title) + side + '.png';
	NewObjectImage.attr('src', ImageFullPath);

	//Put Image In Div + Css positioning
	var NewObject = $('<div>');
	NewObject.css({
		'position': 'absolute',
		'left': ((Math.floor(tile.x * HCellSize * 3 / 4)) - MAP_TILES_CENTER_ROTATE_CELL[tile.title].left + (HCellSize / 2)).toString() + 'px',
		'top': ((tile.y * VCellSize) - MAP_TILES_CENTER_ROTATE_CELL[tile.title].top + (VCellSize / 2) + HexDelta).toString() + 'px'
	});
	NewObject.append(NewObjectImage);
	return NewObject;
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
			tileObjects[i].object.css('left', (parseInt(leftString.substring(0, leftString.length - 2)) + offset).toString() + "px");
			var topString = tileObjects[i].object.css('top');
			tileObjects[i].object.css('top', (parseInt(topString.substring(0, topString.length - 2)) + offset).toString() + "px");
		}
	}
}

