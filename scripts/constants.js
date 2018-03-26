var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var cellSize = 64;

function listsort(a, b) {
	if(a[0] < b[0]) return -1;
	if(a[0] > b[0]) return 1;
	return 0;
}
var bg2e = 'Second Edition Base Game', BoW = 'Bonds of the Wild', CoD = 'Crown of Destiny', CotF = 'Crusade of the Forgotten', GoD = 'Guardians of Deephall',
	LoR = 'Labyrinth of Ruin', LoW = 'Lair of the Wyrm', MoR = 'Manor of Ravens', OotO = 'Oath of the Outcast',
	SoE = 'Shards of Everdark', SoN = 'Shadow of Narekhall', SotS = 'Stewards of the Secret', TF = 'The Trollfens', ToC = 'Treaty of Champions',
	VoD = 'Visions of Dawn', CK = 'Conversion Kit', MoB = 'Mists of Bilehall', CtR = 'Chains that Rust';
var Building = 'Building',
	Cave = 'Cave',
	Civilized = 'Civilized',
	Cold = 'Cold',
	Cursed = 'Cursed',
	Dark = 'Dark',
	Hot = 'Hot',
	Mountain = 'Mountain',
	Water = 'Water',
	Wilderness = 'Wilderness';
var MONSTER_TRAITS = [Building,Cave,Civilized,Cold,Cursed,Dark,Hot,Mountain,Water,Wilderness];
var monsterTraits = {};
for (var i=0; i < MONSTER_TRAITS.length; i++) {
	monsterTraits[urlize(MONSTER_TRAITS[i])] = urlize(MONSTER_TRAITS[i]);
}

var MONSTERS_LIST = [
	['Arachyura',2,2,false,LoR,[Wilderness,Cursed],true],
	['Bandit',1,1,true,MoR,[Wilderness,Building],true],
	['Bane Spider',2,2,true,OotO,[Dark,Cave],true],
	['Barghest',1,2,false,bg2e,[Wilderness,Dark],true],
	['Beastman',1,1,false,OotO,[Mountain,Wilderness],true],
	['Blood Ape',2,2,false,SotS,[Hot,Cave],true],
	['Bone Horror',1,1,false,MoB,[Cave,Cursed],true],
	['Broodwalker',1,1,false,MoB,[Dark,Building],true],
	['Carrion Drake',1,1,false,LoR,[Water,Dark],true],
	['Cave Spider',1,1,false,bg2e,[Wilderness,Cave],true],
	['Changeling',1,1,false,SoN,[Civilized,Cursed],true],
	['Chaos Beast',2,2,false,CoD,[Dark,Cursed],true],
	['Crow Hag',1,1,true,ToC,[Dark,Civilized],true],
	['Crypt Dragon',2,3,true,GoD,[Dark,Cursed],true],
	['Dark Minotaur',1,1,true,SoE,[Dark,Civilized],true],
	['Dark Priest',1,1,true,GoD,[Civilized,Cursed],true],
	['Deep Elf',1,1,false,BoW,[Dark,Cave],true],
	['Demon Lord',2,2,false,ToC,[Hot,Cursed],true],
	['Elemental',2,2,true,bg2e,[Cold,Hot],true],
	['Ettin',2,2,false,bg2e,[Mountain,Cave],true],
	['Ferrox',1,1,false,SotS,[Cave,Water],true],
	['Fire Imps',1,1,true,LoW,[Hot,Cursed],true],
	['Flesh Moulder',1,1,true,bg2e,[Cursed,Civilized],true],
	['Giant',2,2,false,CoD,[Mountain,Wilderness],true],
	['Goblin Archer',1,1,true,bg2e,[Building,Cave],true],
	['Goblin Witcher',1,1,true,LoR,[Building,Cursed],true],
	['Golem',2,2,false,CotF,[Mountain,Building],true],
	['Harpy',1,1,false,TF,[Wilderness,Mountain],true],
	['Hellhound',1,2,false,BoW,[Hot,Cursed],true],
	['Hybrid Sentinel',1,1,false,LoW,[Mountain,Cave],true],
	['Ice Wyrm',2,3,false,SoE,[Cold,Cave],true],
	['Ironbound',1,1,false,SoN,[Civilized,Building],true],
	['Kobold',1,1,false,BoW,[Building,Cave],true],
	['Lava Beetle',1,1,true,CoD,[Hot,Cave],true],
	['Manticore',1,2,true,VoD,[Wilderness,Dark],true],
	['Marrow Priest',1,1,false,CtR,[Dark, Building],true],
	['Medusa',1,1,true,CotF,[Cursed,Building],true],
	['Merriod',2,2,false,bg2e,[Wilderness,Water],true],
	['Naga',2,2,true,SotS,[Water,Cave],true],
	['Ogre',2,2,false,VoD,[Building,Cave],true],
	['Plague Worm',1,2,false,TF,[Water,Cave],true],
	['Rat Swarm',1,2,false,SoN,[Building,Dark],true],
	['Razorwing',1,1,false,OotO,[Wilderness,Cave],true],
	['Reanimate',1,1,false,MoB,[Civilized,Cursed],true],
	['Shade',1,1,false,SoE,[Dark,Cursed],true],
	['Shadow Dragon',2,3,false,bg2e,[Dark,Cave],true],
	['Shambling Colossus',1,2,false,CtR,[Cursed,Wilderness],true],
	['Skeleton Archer',1,1,true,ToC,[Cursed,Civilized],true],
	['Sorcerer',1,1,true,CotF,[Civilized,Building],true],
	['The Dispossessed',1,1,false,CtR,[Civilized,Cursed],true],
	['Troll',2,2,false,VoD,[Mountain,Cave],true],
	['Volucrix Reaver',1,1,false,LoR,[Building,Mountain],true],
	['Wendigo',2,2,false,GoD,[Cold,Cave],true],
	['Wraith',1,1,true,MoR,[Civilized,Cursed],true],
	['Ynfernael Hulk',2,2,false,SoN,[Hot,Cursed],true],
	['Zombie',1,1,false,bg2e,[Cursed,Building],true],
	['Open Group',1,1,false,bg2e,[Cursed,Building],false]
];

var EXPANSIONS = [
	[bg2e,'Big'],
	[LoR,'Big'],
	[SoN,'Big'],
	[LoW,'Small'],
	[MoR,'Small'],
	[TF,'Small'],
	[MoB,'Small'],
	[CtR,'Small'],
	[BoW,'H&M'],
	[CoD,'H&M'],
	[CotF,'H&M'],
	[GoD,'H&M'],
	[OotO,'H&M'],
	[SoE,'H&M'],
	[SotS,'H&M'],
	[ToC,'H&M'],
	[VoD,'H&M'],
	[CK,'CK']];
var selectedExpansions = {};
var EXPANSION_GROUPS = {};
for (var i=0; i < EXPANSIONS.length; i++) {
	selectedExpansions[folderize(EXPANSIONS[i][0])] = folderize(EXPANSIONS[i][0]);

	if (EXPANSION_GROUPS[EXPANSIONS[i][1]] == undefined) {
		EXPANSION_GROUPS[EXPANSIONS[i][1]] = [];
	}
	EXPANSION_GROUPS[EXPANSIONS[i][1]].push(EXPANSIONS[i][0]);
}



var LIEUTENANTS_LIST = [
	['Ardus IxErebus', true, 1, 1],
	['Ariad', true, 1, 1],
	['Baron Zachareth', true, 1, 1],
	['Belthir', true, 1, 1],
	['Bolgoreth', true, 2, 2],
	['Kyndrithul', true, 1, 1],
	['Lady Eliza Farrow', true, 1, 1],
	['Lord Merick Farrow', true, 1, 1],
	['Gargan Mirklace', true, 2, 2],
	['Queen Ariad', true, 2, 2],
	['Raythen', true, 1, 1],
	['Rylan Olliven', true, 1, 1],
	['Serena', true, 1, 1],
	['Skarn', true, 2, 2],
	['Sir Alric Farrow', true, 1, 1],
	['Splig', true, 1, 1],
	['Tristayne Olliven', true, 1, 1],
	['Valyndra', true, 2, 3],
	['Verminous', true, 1, 2],
	['Zarihell', true, 1, 1]
];

var LIEUTENANTS = {};

for (var i = 0; i < LIEUTENANTS_LIST.length; i++) {
	LIEUTENANTS[LIEUTENANTS_LIST[i][0]] = {'hasBack':LIEUTENANTS_LIST[i][1], 'width':LIEUTENANTS_LIST[i][2], 'height':LIEUTENANTS_LIST[i][3]};
}

var MONSTERS_HP = [
	['Arachyura',5,7,7,9],
	['Bandit',4,5,6,7],
	['Bane Spider',4,7,6,9],
	['Barghest',4,6,6,8],
	['Beastman',4,5,5,6],
	['Blood Ape',5,7,7,9],
	['Bone Horror',5,7,6,9],
	['Broodwalker',7,10,8,12],
	['Carrion Drake',6,8,7,10],
	['Cave Spider',3,5,5,7],
	['Changeling',4,6,6,8],
	['Chaos Beast',5,6,7,10],
	['Crow Hag',5,7,7,9],
	['Crypt Dragon',5,7,7,10],
	['Dark Minotaur',8,8,10,10],
	['Dark Priest',2,5,7,9],
	['Deep Elf',7,9,8,10],
	['Demon Lord',6,9,8,12],
	['Elemental',4,6,8,10],
	['Ettin',5,8,7,9],
	['Ferrox',4,5,5,8],
	['Fire Imps',2,4,4,6],
	['Flesh Moulder',4,5,5,7],
	['Giant',10,12,12,15],
	['Goblin Archer',2,4,4,6],
	['Goblin Witcher',3,5,6,8],
	['Golem',8,10,10,12],
	['Harpy',3,5,4,6],
	['Hellhound',4,6,6,8],
	['Hybrid Sentinel',5,8,6,9],
	['Ice Wyrm',7,9,11,14],
	['Ironbound',8,10,10,12],
	['Kobold',2,5,4,7],
	['Lava Beetle',3,5,5,7],
	['Manticore',5,7,7,9],
	['Marrow Priest',7,9,8,10],
	['Medusa',4,6,6,9],
	['Merriod',5,7,7,9],
	['Naga',4,5,6,7],
	['Ogre',6,8,9,12],
	['Plague Worm',5,7,6,9],
	['Rat Swarm',4,5,5,6],
	['Razorwing',4,6,7,9],
	['Reanimate',3,5,5,8],
	['Shade',2,4,4,6],
	['Shadow Dragon',6,9,8,10],
	['Shambling Colossus',5,8,7,9],
	['Skeleton Archer',3,6,4,8],
	['Sorcerer',3,5,5,8],
	['The Dispossessed',6,8,8,10],
	['Troll',8,10,10,13],
	['Volucrix Reaver',3,5,4,6],
	['Wendigo',5,7,7,10],
	['Wraith',5,7,6,8],
	['Ynfernael Hulk',8,9,9,10],
	['Zombie',3,6,5,9],
	['Open Group',0,0,0,0]
];

MONSTERS = {};

function getMonsterTraits(i) {
	var traitsArray = MONSTERS_LIST[i][5];
	var result = [];
	for (var j = 0; j < traitsArray.length; j++) {
		result.push(urlize(traitsArray[j]));
	}
	return result;
}

for (var i = 0; i < MONSTERS_LIST.length; i++) {
	var monster = {};
	monster.title = MONSTERS_LIST[i][0];
	monster.width = MONSTERS_LIST[i][1];
	monster.height = MONSTERS_LIST[i][2];
	monster.ranged = MONSTERS_LIST[i][3];
	monster.expansion = folderize(MONSTERS_LIST[i][4]);
	monster.traits = getMonsterTraits(i);
	monster.hasBack = MONSTERS_LIST[i][6];
	monster.minionHpActOne = MONSTERS_HP[i][1];
	monster.masterHpActOne = MONSTERS_HP[i][2];
	monster.minionHpActTwo = MONSTERS_HP[i][3];
	monster.masterHpActTwo = MONSTERS_HP[i][4];
	MONSTERS[MONSTERS_LIST[i][0]] = monster;
}

SEARCH_ITEMS_LIST = [
	'Curse Doll',
	'Fire Flask',
	'Health Potion',
	'Nothing',
	'Power Potion',
	'Secret Passage',
	'Stamina Potion',
	'Treasure Chest',
	'Warding Talisman',
	'Flipped',
	'Flipped (Curse Doll)',
	'Flipped (Fire Flask)',
	'Flipped (Health Potion)',
	'Flipped (Power Potion)',
	'Flipped (Stamina Potion)',
	'Flipped (Warding Talisman)'
];

//Items
var hand = {className : 'hand'};
var twohand = {className : 'hand2'};
var armor = {className : 'armor'};
var item = {className : 'item'};

ITEMS_LIST = [
	['Archaic Scroll', item],
	['Barons Cloak', armor],
	['Battle Tome', hand],
	['Bearded Axe', twohand],
	['Belt Of Alchemy', item],
	['Belt Of Waterwalking', item],
	['Blessed Shield', hand],
	['Bloodscript Ring', item],
	['Bloody Dagger', hand],
	['Bone Blade', hand],
	['Boots Of Iron', item],
	['Bow Of Bone', twohand],
	['Chainmail', armor],
	['City Guards Bow', twohand],
	['Cloak Of Mists', armor],
	['Corpsebug Brooch', item],
	['Crossbow', hand],
	['Deflecting Shield', hand],
	['Dire Flail', twohand],
	['Elm Greatbow', twohand],
	['Elven Boots', item],
	['Flash Powder', item],
	['Guardian Axe', twohand],
	['Halberd', twohand],
	['Handbow', item],
	['Heavy Cloak', armor],
	['Immolation', twohand],
	['Incendiary Arrows', item],
	['Iron Battleaxe', twohand],
	['Iron Shield', hand],
	['Iron Spear', hand],
	['Ironbound Rune', twohand],
	['Jeweled Mace', hand],
	['Jinns Lamp', item],
	['Leather Armor', armor],
	['Lifedrain Scepter', hand],
	['Light Hammer', hand],
	['Lucky Charm ', item],
	['Mace Of Aver', twohand],
	['Magic Staff', twohand],
	['Magma Blast', twohand],
	['Mana Weave', item],
	['Mapstone', item],
	['Marsh Cloak', armor],
	['Mist Bane', hand],
	['Phoenix Pendant', item],
	['Poisoned Blowgun', hand],
	['Ring Of Power', item],
	['Rune Plate', armor],
	['Scorpion Helm', item],
	['Shadow Bracers', item],
	['Serpent Dagger', hand],
	['Shield Of Light', hand],
	['Sling', hand],
	['Soulbound Sword', twohand],
	['Soulstone', twohand],
	['Staff Of Greyhaven', twohand],
	['Steel Broadsword', hand],
	['Sunburst', twohand],
	['Teleportation Rune', twohand],
	['Thiefs Vest', armor],
	['Trident', hand],
	['Undying Skull', item],
	['White Wolf Cloak', armor],
	['Witch Hazel Bow', twohand]
];

TIER2_ITEMS_LIST = [
	['Belt Of Strength', item],
	['Black Iron Helm', item],
	['Blasting Rune', twohand],
	['Blessed Armor', armor],
	['Bloodthirsty Bracers', item],
	['Bone Wand', hand],
	['Boomerang', hand],
	['Bow Of The Eclipse', twohand],
	['Bow Of The Sky', twohand],
	['Cloak Of Deception', armor],
	['Demonhide Leather', armor],
	['Dragontooth Hammer', hand],
	['Dwarven Firebomb', hand],
	['Elven Cloak', armor],
	['Fists Of Iron', hand],
	['Glaive', twohand],
	['Golden Mask', item],
	['Grinding Axe', twohand],
	['Hammer Of Doom', twohand],
	['Heart Seeker', twohand],
	['Heavy Steel Shield', hand],
	['Horned Shield', hand],
	['Ice Storm', twohand],
	['Inscribed Robes', armor],
	['Iron-Bound Ring', item],
	['Iron Claws', hand],
	['Ironbound Glaive', twohand],
	['Ironbound Shield', hand],
	['Latari Longbow', twohand],
	['Lightning Javelin', hand],
	['Lightning Strike', twohand],
	['Mace Of Kellos', hand],
	['Mask Of Horrors', item],
	['Merciful Boots', item],
	['Nerekhall Plate', armor],
	['Obsidian Greataxe', twohand],
	['Obsidian Scalemail', armor],
	['Platemail', armor],
	['Rage Blade', hand],
	['Rat-Tooth Dagger', hand],
	['Repeating Crossbow', twohand],
	['Rune Of Blades', twohand],
	['Rune Of Fate', twohand],
	['Rune Of Misery', twohand],
	['Rune-Touched Leather', armor],
	['Sash Of The Slayer', item],
	['Scalemail', armor],
	['Shadow Tome', item],
	['Shroud Of Dusk', item],
	['Staff Of Kellos', twohand],
	['Staff Of The Wild', twohand],
	['Star Of Kellos', item],
	['Steel Greatsword', twohand],
	['Stone Armor', armor],
	['Tival Crystal', item],
	['Vestments Of Kellos', armor],
	['Winged Blade', hand]
];

RELICS_LIST = [
	['Aurium Mail', armor],
	['Boneborn Bow', twohand],
	['Book Of Stars', item],
	['Dawnblade', hand],
	['Fear Eater', twohand],
	['Fortunas Dice', item],
	['Forewarned Ring', item],
	['Gauntlets Of Power', item],
	['Immunity Elixir', item],
	['Living Heart', item],
	['Mending Talisman', item],
	['Robes Of The Last', armor],
	['Shadow Plotter', item],
	['Shards Of Ithyndrus', hand],
	['Shield Of The Dark God', hand],
	['Spirited Scythe', twohand],
	['Staff Of Light', twohand],
	['Sun Stone', item],
	['The Manors Heart', item],
	['The Shadow Rune', twohand],
	['The White Crown', item],
	['Trueshot', twohand],
	['Undertakers Coat', armor],
	['Valyndras Bane', twohand],
	['Wanderers Stone', item],
	['Workmans Ring', item],
	['Ynfernal Rune', twohand]
];

OVERLORD_RELICS_LIST = [
	'Azatheas Triumph',
	'Band Of Foresight',
	'Blade Of Brivala',
	'Bones Of Woe',
	'Curative Vial',
	'Duskblade',
	'Fallen Heart',
	'Gauntlets Of Spite',
	'Her Majestys Malice',
	'Omen Of Blight',
	'Robes Of The Last',
	'Scorpions Kiss',
	'Shadow Plotter',
	'Shards Of Ithyndrus',
	'Shield Of Zoreks Favor',
	'Soulless Scythe',
	'Staff Of Shadows',
	'Stone Of Wayward Means',
	'Suns Fury',
	'Taskmasters Ring',
	'The Manors Heart',
	'The Shadow Rune',
	'Tome Of The Five Lies',
	'Undertakers Coat',
	'Valyndras Gift',
	'Waiqars Favor',
	'Ynfernal Rune'
];

ITEMS = {hand : [], hand2 : [], armor : [], item : []};
ITEMS2 = {hand : [], hand2 : [], armor : [], item : []};
ITEMSR = {hand : [], hand2 : [], armor : [], item : []};

for (var i = 0; i < ITEMS_LIST.length; i++) {
	ITEMS[ITEMS_LIST[i][1].className].push(ITEMS_LIST[i]);
}

for (var i = 0; i < TIER2_ITEMS_LIST.length; i++) {
	ITEMS2[TIER2_ITEMS_LIST[i][1].className].push(TIER2_ITEMS_LIST[i]);
}

for (var i = 0; i < RELICS_LIST.length; i++) {
	ITEMSR[RELICS_LIST[i][1].className].push(RELICS_LIST[i]);
}

TAINTED_CARDS_LIST = [
	'Abomination',
	'Bad Blood',
	'Death Rage',
	'Deaths Hand',
	'Dream Walk',
	'Gray Decay',
	'Great Sorrow',
	'Martyrdom',
	'New Orders',
	'Ordinary',
	'Perfect Peace',
	'Vile Shadow'
];

//Classes
var apothecary = {},
	bard = {},
	disciple = {},
	prophet = {},
	spiritspeaker = {},
	watchman = {},
	beastmaster = {},
	berserker = {},
	champion = {},
	knight = {},
	marshal = {},
	skirmisher = {},
	steelcaster = {},
	battlemage = {},
	conjurer = {},
	geomancer = {},
	hexer = {},
	necromancer = {},
	runemaster = {},
	bountyHunter = {},
	monk = {},
	stalker = {},
	thief = {},
	treasureHunter = {},
	wildlander = {},
	shadowwalker = {};

	apothecary.title = 'Apothecary';
	bard.title = 'Bard';
	disciple.title = 'Disciple';
	prophet.title = 'Prophet';
	spiritspeaker.title = 'Spiritspeaker';
	watchman.title = 'Watchman';
	watchman.allowHybrid = true;
	beastmaster.title = 'Beastmaster';
	berserker.title = 'Berserker';
	champion.title = 'Champion';
	knight.title = 'Knight';
	marshal.title = 'Marshal';
	skirmisher.title = 'Skirmisher';
	steelcaster.title= 'Steelcaster';
	steelcaster.allowHybrid = true;
	battlemage.title= 'Battlemage';
	battlemage.allowHybrid = true;
	conjurer.title = 'Conjurer';
	geomancer.title = 'Geomancer';
	hexer.title = 'Hexer';
	necromancer.title = 'Necromancer';
	runemaster.title = 'Runemaster';
	bountyHunter.title = 'Bounty Hunter';
	shadowwalker.title = 'Shadow Walker';
	monk.title = 'Monk';
	monk.allowHybrid = true;
	stalker.title = 'Stalker';
	thief.title = 'Thief';
	treasureHunter.title = 'Treasure Hunter';
	wildlander.title = 'Wildlander';

	//Skills
	apothecary.skills = [
		['Brew Elixir', 0],
		['Smoking Vials', 0, hand],
		['Concoction', 1],
		['Herbal Lore', 1],
		['Inky Substance', 1],
		['Bottled Courage', 2],
		['Protective Tonic', 2],
		['Secret Formula', 2],
		['Hidden Stash', 3],
		['Potent Remedies', 3]
	];

	bard.skills = [
		['Aria Of War', 2],
		['Cacophony', 3],
		['Concentration', 2],
		['Dissonance', 1],
		['Lute', 0, item],
		['Peaceful Rest', 1],
		['Rehearsal', 2],
		['Song Of Mending', 0],
		['Travelers Blade', 0,hand],
		['Understudy', 1],
		['Wayfarer', 3]
	];

	battlemage.skills = [
		['Arcane Veteran', 0],
		['Death Siphon', 3],
		['Planar Weapon', 1],
		['Runic Weave', 2]
	];

	beastmaster.skills = [
		['Predator', 3],
		['Changing Skins', 3],
		['Shadow Hunter', 2],
		['Savagery', 2],
		['Feral Frenzy', 2],
		['Survivalist', 1],
		['Stalker', 1],
		['Bestial Rage', 1],
		['Bound by the Hunt', 0],
		['Wolf', 0],
		['Skinning Knife', 0, hand],
		['Hunting Spear', 0, hand]
	];

	berserker.skills = [
		['Execute', 3],
		['Death Rage', 3],
		['Whirlwind', 2],
		['Weapon Mastery', 2],
		['Charge', 2],
		['Cripple', 1],
		['Counter Attack', 1],
		['Brute', 1],
		['Rage', 0],
		['Chipped Greataxe', 0, twohand]
	];

	bountyHunter.skills = [
		['Chosen Target', 0],
		['Dark Iron Chains', 2],
		['Double Crossbow', 0, twohand],
		['Evil Eye', 2],
		['Lie In Wait', 1],
		['Longshot', 1],
		['Not So Fast', 1],
		['Payday', 3],
		['Rapid Fire', 3],
		['Undercover', 2]
	];

	champion.skills = [
		['A Living Legend', 1],
		['For The Cause', 3],
		['Glory Of Battle', 1],
		['Horn Of Courage', 0, item],
		['Inspiring Presence', 1],
		['Motivating Charge', 2],
		['No Mercy', 2],
		['Stoic Resolve', 2],
		['Valor Of Heroes', 0],
		['Valorous Strike', 3],
		['Worn Greatsword', 0, twohand]
	];

	conjurer.skills = [
		['Blinding Light', 2],
		['Channeling', 0],
		['Focus Fire', 2],
		['Illusory Path', 1],
		['Many Friends', 1],
		['Mirror Image', 0],
		['Prismatic Assault', 3],
		['Prismatic Staff', 0, twohand],
		['Refraction', 1],
		['Sleight Of Mind', 2],
		['Vortex', 3]
	];

	disciple.skills = [
		['Armor Of Faith', 1],
		['Blessed Strike', 1],
		['Cleansing Touch', 1],
		['Divine Fury', 2],
		['Holy Power', 3],
		['Iron Mace', 0, hand],
		['Prayer Of Healing', 0],
		['Prayer Of Peace', 2],
		['Radiant Light', 3],
		['Time Of Need', 2],
		['Wooden Shield', 0, hand]
	];

	geomancer.skills = [
		['Cataclysm', 3],
		['Earthen Anguish', 1],
		['Gravity Spike', 3],
		['Ley Line', 2],
		['Molten Fury', 2],
		['Quaking Word', 1],
		['Stasis Rune', 0, twohand],
		['Stone Tongue', 1],
		['Summoned Stone', 0],
		['Terracall', 0],
		['Ways Of Stone', 2]
	];

	hexer.skills = [
		['Accursed Arms', 3],
		['Affliction', 1],
		['Crippling Curse', 2],
		['Enfeebling Hex', 0],
		['Fel Command', 2],
		['Internal Rot', 2],
		['Plague Cloud', 3],
		['Plague Spasm', 1],
		['Staff Of The Grave', 0, twohand],
		['Viral Hex', 1]
	];

	knight.skills = [
		['Advance', 1],
		['Challenge', 1],
		['Defend', 1],
		['Defense Training', 2],
		['Guard', 2],
		['Inspiration', 3],
		['Iron Longsword', 0, hand],
		['Oath Of Honor', 0],
		['Shield Slam', 2],
		['Stalwart', 3],
		['Wooden Shield', 0, hand]
	];

	marshal.skills = [
		['By The Book', 2],
		['Crushing Blow', 3],
		['I Am The Law', 2],
		['Just Reward', 1],
		['Last Stand', 3],
		['Retribution', 0],
		['Shockwave', 1],
		['Signet Ring', 0, item],
		['Vigilant Watch', 2],
		['War Hammer', 0, twohand],
		['Zealous Fire', 1]
	];

	monk.skills = [
		['Greater calling', 0],
		['Inner Balance', 1],
		['Openhanded', 2],
		['Vow Of Freedom', 3]
	];

	necromancer.skills = [
		['Army Of Death', 3],
		['Corpse Blast', 1],
		['Dark Pact', 2],
		['Deathly Haste', 1],
		['Dying Command', 3],
		['Fury Of Undeath', 1],
		['Raise Dead', 0],
		['Reanimate', 0],
		['Reapers Scythe', 0, twohand],
		['Undead Might', 2],
		['Vampiric Blood', 2]
	];

	prophet.skills = [
		['All Seeing', 2],
		['Battle Vision', 1],
		['Focused Insights', 3],
		['Forewarning', 1],
		['Grim Fate', 1],
		['Iron Flail', 0, hand],
		['Lifeline', 2],
		['Omniscience', 3],
		['Sages Tome', 0, item],
		['Soothing Insight', 0],
		['Victory Foretold', 2]
	];

	runemaster.skills = [
		['Arcane Bolt', 0, twohand],
		['Break The Rune', 3],
		['Exploding Rune', 1],
		['Ghost Armor', 1],
		['Inscribe Rune', 1],
		['Iron Will', 2],
		['Quick Casting', 3],
		['Rune Mastery', 2],
		['Runic Knowledge', 0],
		['Runic Sorcery', 2]
	];

	shadowwalker.skills = [
		['Dark Servant', 1],
		['Dark Shift', 2],
		['Endless Void', 2],
		['Faithful Friend', 1],
		['Feathered Hatchet', 0, hand],
		['Otherworldly', 2],
		['Shadow Puppet', 3],
		['Shadow Soul', 0],
		['Shadow Step', 3],
		['Soul Bound', 0],
		['Through The Veil', 1],
		['Tribal Cloak', 0, armor]
	];

	skirmisher.skills = [
		['Back In Action', 1],
		['Born In Battle', 2],
		['Carve A Path', 3],
		['Deep Wounds', 1],
		['Dual Strike', 0],
		['Ever In Motion', 2],
		['Jagged Handaxe', 0, hand],
		['Keen Edge', 1],
		['Rusted Handaxe', 0, hand],
		['Unrelenting', 2],
		['Unstoppable', 3]
	];

	spiritspeaker.skills = [
		['Ancestor Spirits', 3],
		['Cloud Of Mist', 2],
		['Drain Spirit', 1],
		['Healing Rain', 1],
		['Natures Bounty', 2],
		['Oak Staff', 0, twohand],
		['Shared Pain', 1],
		['Stoneskin', 0],
		['Tempest', 2],
		['Vigor', 3]
	];

	stalker.skills = [
		['Ambush', 3],
		['Black Widows Web', 0, hand],
		['Easy Prey', 2],
		['Exploit', 1],
		['Hunters Mark', 1],
		['Hunting Knife', 0, hand],
		['Lay Of The Land', 2],
		['Makeshift Trap', 1],
		['Poison Barbs', 2],
		['Set Trap', 0],
		['Upper Hand', 3]
	];

	steelcaster.skills = [
		['Iron Blooded', 3],
		['Rune Grafting', 1],
		['Runeguard', 0],
		['Shield Mage', 2]
	];

	thief.skills = [
		['Appraisal', 1],
		['Bushwack', 3],
		['Caltrops', 2],
		['Dirty Tricks', 1],
		['Greedy', 0],
		['Lucky Charm', 0, item],
		['Lurk', 3],
		['Sneaky', 1],
		['Throwing Knives', 0, hand],
		['Tumble', 2],
		['Unseen', 2]
	];

	treasureHunter.skills = [
		['Delver', 0],
		['Dungeoneer', 1],
		['Finders Keepers', 3],
		['Gold Rush', 1],
		['Guard The Spoils', 2],
		['Leather Whip', 0, hand],
		['Lure Of Fortune', 2],
		['Sleight Of Hand', 2],
		['Survey', 1],
		['The Dead Mans Compass', 0, item],
		['Trail Of Riches', 3]
	];

	watchman.skills = [
		['Quick Recovery', 1],
		['Trailblazer', 2],
		['Unity', 3],
		['Vigilance', 0]
	];

	wildlander.skills = [
		['Accurate', 1],
		['Black Arrow', 3],
		['Bow Mastery', 2],
		['Danger Sense', 1],
		['Eagle Eyes', 1],
		['First Strike', 2],
		['Fleet Of Foot', 2],
		['Nimble', 0],
		['Running Shot', 3],
		['Yew Shortbow', 0, twohand]
	];

//Archetypes
var wiz = {},
	war = {},
	rog = {},
	sup = {};

	wiz.title = 'Mage';
	wiz.classes = [battlemage, conjurer, geomancer, hexer, necromancer, runemaster];
	war.title = 'Warrior';
	war.classes = [beastmaster, berserker, champion, knight, marshal, skirmisher, steelcaster];
	rog.title = 'Scout';
	rog.classes = [bountyHunter, monk, shadowwalker, stalker, thief, treasureHunter, wildlander];
	sup.title = 'Healer';
	sup.classes = [apothecary, bard, disciple, prophet, spiritspeaker, watchman];

var ARCHETYPE_CLASSES = 'mage warrior scout healer';
var ARCHETYPES_LIST = [wiz, war, rog, sup];

var CLASSES = {};
var ARCHETYPES = {};
var CLASSES_ITEMS = [];

for (var i = 0; i < ARCHETYPES_LIST.length; i++) {
	for (var j = 0; j < ARCHETYPES_LIST[i].classes.length; j++) {
		var classObject = ARCHETYPES_LIST[i].classes[j];
		classObject.archetype = ARCHETYPES_LIST[i];
		CLASSES[classObject.title] = classObject;
		for (var k = 0; k < classObject.skills.length; k++) {
			if (classObject.skills[k][2] != undefined) {
				var classItem = [];
				classItem[0] = classObject.skills[k][0];
				classItem[1] = classObject.title.replace(new RegExp(" ",'g'), '').toLowerCase();
				classItem[2] = classObject.skills[k][2];
				CLASSES_ITEMS.push(classItem);
			}
		}
	}
	ARCHETYPES[ARCHETYPES_LIST[i].title] = ARCHETYPES_LIST[i];
}

// Hybrid classes options
monk.newArchetype = sup;
watchman.newArchetype = rog;
steelcaster.newArchetype = wiz;
battlemage.newArchetype = war;
var HYBRID_CLASSES = [monk, steelcaster, battlemage, watchman];

var HEROES_LIST = [
	['Ronan of the Wild',10,5,rog],
	['Hugo the Glorious',12,3,war],
	['Aurim',8,5,sup],
	['Bogran the Shadow',10,4,rog],
	['Eliam',12,5,war],
	['Brother Glyr',12,3,sup],
	['Kirga',12,3,rog],
	['Landrec the Wise',10,4,wiz],
	['Mad Carthos',8,3,wiz],
	['Red Scorpion',8,5,rog],
	['Tobin Farslayer',12,3,rog],
	['Varikas the Dead',12,3,war],
	['Ashrian',10,4,sup],
	['Grisban the Thirsty',14,4,war],
	['Jain Fairwood',8,5,rog],
	['Leoric of the Book',8,5,wiz],
	['Avric Albright',12,4,sup],
	['Syndrael',12,4,war],
	['Tomble Burrowell',8,5,rog],
	['Widow Tarha',10,4,wiz],
	['Elder Mok',10,4,sup],
	['Laurel of Bloodwood',8,5,rog],
	['Shiver',10,4,wiz],
	['Trenloe the Strong',12,3,war],
	['Brother Gherinn',12,4,sup],
	['Corbin',12,5,war],
	['Jaes the Exile',12,3,wiz],
	['Lindel',10,5,rog],
	['Andira Runehand',12,4,sup],
	['Astarra',10,5,wiz],
	['Tahlia',14,4,war],
	['Tetherys',10,4,rog],
	['Sahla',10,4,sup],
	['Mordrog',14,4,war],
	['Silhouette',10,4,rog],
	['Lord Hawthorne',12,4,war],
	['Ispher',10,4,sup],
	['Master Thorn',8,4,wiz],
	['Nanok of the Blade',12,4,war],
	['Nara the Fang',10,4,war],
	['Sir Valadir',12,4,war],
	['Challara',10,4,wiz],
	['High Mage Quellen',10,4,wiz],
	['Reynhart the Worthy',12,4,war],
	['Alys Raine',12,4,war],
	['Thaiden Mistpeak',10,5,rog],
	['Ulma Grimstone',8,5,sup],
	['Pathfinder Durik',10,4,war],
	['Logan Lashley',10,4,rog],
	['Dezra the Vile',8,4,wiz],
	['Serena',8,6,sup],
	['Rendiel',10,4,sup],
	['Orkell the Swift',10,5,war],
	['Tinashi the Wanderer',12,4,rog],
	['Ravaella Lightfoot',8,5,wiz],
	['Roganna the Shade',10,4,rog],
	['Augur Grisom',12,5,sup],
	['Raythen',14,4,rog],
	['Grey Ker',12,5,rog],
	['Seer Kel',10,4,wiz],
	['One Fist',10,4,war],
	['Arvel Worldwalker',10,4,rog],
	['Karnon',14,3,war],
	['Steelhorns',14,3,war],
	['Vyrah the Falconer',10,4,rog],
	['Lyssa',8,5,wiz],
	['Zyla',8,5,wiz],
	['Tatianna',12,4,rog],
	['Okaluk and Rakash',8,3,sup],
	['Krutzbeck',12,4,war],
	['Jonas the Kind',10,4,sup],
	['Laughin Buldar',14,3,war]
];

var HEROES = {};

for (var i = 0; i < HEROES_LIST.length; i++) {
	var hero = {};
	hero.title = HEROES_LIST[i][0];
	hero.hp = HEROES_LIST[i][1];
	hero.stamina = HEROES_LIST[i][2];
	hero.archetype = HEROES_LIST[i][3];
	HEROES[HEROES_LIST[i][0]] = hero;
}

MONSTERS_LIST.sort(listsort);
HEROES_LIST.sort(listsort);

ALLIES_LIST = [
	'Serena',
	'Raythen'
];

ALLIES_SKILLS = {};
ALLIES_SKILLS['Serena'] = ['Aura Of Might', 'Healing Aura', 'Holy Hammer'];
ALLIES_SKILLS['Raythen'] = ['Back Strike', 'Night Prowler', 'Sharp Eyes'];

FAMILIARS_LIST = [
	['Brightblaze',true],
	['Mirror Image',false],
	['Pico',true],
	['Raven Flock',true],
	['Reanimate',true],
	['Scourge',true],
	['Shadow Soul',true],
	['Skye',true],
	['Summoned Stone',true],
	['Trap',false],
	['Wolf',true],
];

VILLAGERS_LIST = [
	['Villager Female',false],
	['Villager Male',false]
];

MAP_TILES_LIST_COMPLETE = [
	['1',8,6],
	['2',6,6],
	['3',6,4],
	['4',6,6],
	['5',6,4],
	['6',6,4],
	['7',6,4],
	['8',4,4],
	['9',4,4],
	['10',4,4],
	['11',4,4],
	['12',5,5],
	['13',6,6],
	['14',4,4],
	['15',5,4],
	['16',4,4],
	['17',4,4],
	['18',4,4],
	['19',6,3],
	['20',8,3],
	['21',6,3],
	['22',6,2],
	['23',6,2],
	['24',6,2],
	['25',6,2],
	['26',4,3],
	['27',4,2],
	['28',4,2],
	['29',4,2],
	['30',4,2],
	['31',6,6],
	['32',4,4],
	['33',4,2],
	['34',6,3],
	['35',5,5],
	['36',8,8],
	['37',9,6],
	['38',7,6],
	['39',7,8],
	['40',6,5],
	['41',6,2],
	['42',6,2],
	['43',2,2],
	['44',6,6],
	['45',8,3],
	['46',4,3],
	['47',2,2],
	['48',7,7],
	['49',7,7],
	['50',6,6],
	['51',6,4],
	['52',5,4],
	['53',4,4],
	['54',4,4],
	['55',6,4],
	['56',6,4],
	['57',6,4],
	['58',6,3],
	['59',5,5],
	['60',5,5],
	['61',4,4],
	['62',3,3],
	['63',5,3],
	['64',5,3],
	['65',4,2],
	['66',4,2],
	['67',2,2],
	['68',2,2],
	['69',2,2],
	['70',6,6],
	['71',6,6],
	['72',6,4],
	['73',6,3],
	['74',5,4],
	['75',4,4],
	['76',4,2],
	['77',2,2],
	['78',2,2],
	['79',2,2],
	['80',4,2],
	['81',5,5],
	['82',3,4],
	['83',6,3],
	['84',7,5],
	['85',6,6],
	['86',8,3],
	['87',8,8],
	['S1',4,4],
	['S2',4,3],
	['End',2,1],
	['Nerekhall end',2,1],
	['Manor end',2,1],
	['Nerekhall extension 1x2',2,1],
	['Nerekhall connection 1x2',2,1],
	['Entrance',2,2],
	['Exit',2,2],
	['Nerekhall exit',2,2],
	['Mists entrance',2,2],
	['Extension1x2',2,1],
	['Extension2x2',2,2],
	['Portal Extension 2x2',2,2],
	['Cobble-stone Extension 2x2',2,2],
	['Crumbling',1,1]
];

MAP_TILES_LIST = [];
MAP_TILES_SIZES = {};

for (var i = 0; i < MAP_TILES_LIST_COMPLETE.length; i++) {
	MAP_TILES_LIST.push(MAP_TILES_LIST_COMPLETE[i][0]);
	MAP_TILES_SIZES[MAP_TILES_LIST_COMPLETE[i][0]] = {'width':MAP_TILES_LIST_COMPLETE[i][1], 'height':MAP_TILES_LIST_COMPLETE[i][2]};
}

DOORS_LIST = [
	'Blue Rune Blocked',
	'Door',
	'Red Rune Blocked',
	'Shrubbery',
	'Yellow Rune Blocked',
	'Portcullis',
	'Wall'
];

BLOCKS_LIST = [
	'1x1',
	'2x2'
];

OBJECTIVES_LIST = [
	'Green',
	'Blue',
	'Red',
	'White',
	'Unknown'
];

MISCELLANEOUS_LIST = [
	'Challenge',
	'Search',
	'Secret Entrance Indoors',
	'Secret Entrance Outdoors',
	'Sun Stone'
];

CONDITIONS_INITIAL = [
	['Bleeding',true],
	['Burning',true],
	['Cursed',true],
	['Diseased',true],
	['Doomed',true],
	['Immobilized',true],
	['Poisoned',true],
	['Stunned',true],
	['Terrified',true],
	['Weakened',true],
	['Elixir',false],
	['Fortune',false],
	['Hexed',false],
	['Infected',false],
	['Insight',false],
	['Tracked',false],
	['Objective',false],
	['Threat',false],
	['Valor',false]
];

var CONDITIONS = {};
var CONDITIONS_LIST = [];

for (var i = 0; i < CONDITIONS_INITIAL.length; i++) {
	CONDITIONS_LIST.push(CONDITIONS_INITIAL[i][0]);
	CONDITIONS[CONDITIONS_INITIAL[i][0]] = {'hasConditionCard' : CONDITIONS_INITIAL[i][1]};
}

TRACKING_TOKENS_INITIAL = [
	['Bleeding',true],
	['Burning',true],
	['Cursed',true],
	['Diseased',true],
	['Doomed',true],
	['Immobilized',true],
	['Poisoned',true],
	['Stunned',true],
	['Terrified',true],
	['Weakened',true],
	['Elixir',false],
	['Fortune',false],
	['Hexed',false],
	['Infected',false],
	['Insight',false],
	['Tracked',false],
	['Objective',false],
	['Threat',false],
	['Valor',false]
];

var TRACKING_TOKENS = {};
var TRACKING_TOKENS_LIST = [];

for (var i = 0; i < TRACKING_TOKENS_INITIAL.length; i++) {
	TRACKING_TOKENS_LIST.push(TRACKING_TOKENS_INITIAL[i][0]);
	TRACKING_TOKENS[TRACKING_TOKENS_INITIAL[i][0]] = {'hasConditionCard' : TRACKING_TOKENS_INITIAL[i][1]};
}


OVERLORD_CARDS_LIST = [
	['Critical Blow', 'Basic', 1, ''],
	['Dark Charm', 'Basic', 1, ''],
	['Dark Fortune', 'Basic', 2, ''],
	['Dark Might', 'Basic', 2, ''],
	['Dash', 'Basic', 2, ''],
	['Frenzy', 'Basic', 2, ''],
	['Pit Trap', 'Basic', 1, ''],
	['Poison Dart', 'Basic', 1, ''],
	['Tripwire', 'Basic', 2, ''],
	['Word Of Misery', 'Basic', 1, ''],
	['Befuddle', 'Basic2', 2, ''],
	['Blinding Speed', 'Basic2', 2, ''],
	['Dirty Fighting', 'Basic2', 2, ''],
	['Flurry', 'Basic2', 1, ''],
	['Grease Trap', 'Basic2', 1, ''],
	['Mental Error', 'Basic2', 1, ''],
	['Mimic', 'Basic2', 1, ''],
	['Overwhelm', 'Basic2', 1, ''],
	['Reflective Ward', 'Basic2', 1, ''],
	['Sign Of Weakness', 'Basic2', 1, ''],
	['Uncontrolled Power', 'Basic2', 2, ''],
	['Dragonbone Pendant', 'Enchanter', 1, '1'],
	['Elixir Of Stone', 'Enchanter', 1, '1'],
	['Rings Of ZholAlam', 'Enchanter', 1, '1'],
	['Wristlet Of Wind', 'Enchanter', 1, '1'],
	['Rune Of The Phoenix', 'Enchanter', 1, '2'],
	['Ward Of Peace', 'Enchanter', 1, '2'],
	['Sign Of The Last Zenith', 'Enchanter', 1, '3'],
	['Adaptive Contagion', 'Infector', 1, '1'],
	['Airborne', 'Infector', 1, '1'],
	['Contaminated', 'Infector', 1, '1'],
	['Virulent Infection', 'Infector', 1, '1'],
	['Outbreak', 'Infector', 1, '2'],
	['Tainted Blow', 'Infector', 1, '2'],
	['Dark Host', 'Infector', 1, '3'],
	['Unholy Ritual', 'Magus', 2, '1'],
	['Word Of Pain', 'Magus', 2, '1'],
	['Rise Again', 'Magus', 1, '2'],
	['Word Of Despair', 'Magus', 1, '2'],
	['Diabolic Power', 'Magus', 1, '3'],
	['No Rest For The Wicked', 'Punisher', 2, '1'],
	['Trading Pains', 'Punisher', 2, '1'],
	['Exploit Weakness', 'Punisher', 1, '2'],
	['Price Of Prevention', 'Punisher', 1, '2'],
	['Blood Bargaining', 'Punisher', 1, '3'],
	['Explosive Runes', 'Saboteur', 1, '1'],
	['Web Trap', 'Saboteur', 1, '1'],
	['Curse Of The Monkey God', 'Saboteur', 1, '2'],
	['Wicked Laughter', 'Saboteur', 1, '2'],
	['Uthuk Demon Trap', 'Saboteur', 1, '3'],
	['Imploding Rift', 'Shadowmancer', 1, '1'],
	['Mistrust', 'Shadowmancer', 1, '1'],
	['Out Of Darkness', 'Shadowmancer', 1, '1'],
	['Shadow Of Doubt', 'Shadowmancer', 1, '1'],
	['Black Out', 'Shadowmancer', 1, '2'],
	['Shadow Walk', 'Shadowmancer', 1, '2'],
	['Treacherous Shadows', 'Shadowmancer', 1, '3'],
	['Dark Silhouette', 'Soulbinder', 1, '1'],
	['Grotesque', 'Soulbinder', 1, '1'],
	['Possessive', 'Soulbinder', 1, '1'],
	['Restless Spirit', 'Soulbinder', 1, '1'],
	['Ties That Bind', 'Soulbinder', 1, '1'],
	['Haunted Steps', 'Soulbinder', 1, '2'],
	['Unblinking', 'Soulbinder', 1, '2'],
	['Dance Macabre', 'Soulbinder', 1, '3'],
	['Beneath The Shadow', 'Unkindness', 1, '1'],
	['Beware', 'Unkindness', 1, '1'],
	['Call Of The Ravens', 'Unkindness', 1, '1'],
	['Feast', 'Unkindness', 1, '1'],
	['Ill Omen', 'Unkindness', 1, '1'],
	['Imitation', 'Unkindness', 1, '2'],
	['Sudden Flurry', 'Unkindness', 1, '2'],
	['Envelop', 'Unkindness', 1, '3'],
	['Blood Rage', 'Warlord', 2, '1'],
	['Dark Fortitude', 'Warlord', 2, '1'],
	['Bloodlust', 'Warlord', 1, '2'],
	['Expert Blow', 'Warlord', 1, '2'],
	['Reinforce', 'Warlord', 1, '2'],
	['Dark Remedy', 'Universal', 2, '1'],
	['Dark Resilience', 'Universal', 1, '1'],
	['Placebo', 'Universal', 1, '1'],
	['Plan Ahead', 'Universal', 2, '1'],
	['Refresh', 'Universal', 1, '1'],
	['Schemes', 'Universal', 1, '1'],
	['Solidarity', 'Universal', 1, '1'],
	['Upgrade', 'Universal', 1, '1'],
	['Diverse Means', 'Universal', 1, '2'],
	['Down And Out', 'Overlord Reward', 1, ''],
	['Endless Supply', 'Overlord Reward', 1, ''],
	['Fire Gems', 'Overlord Reward', 1, ''],
	['Forgotten Sorcery', 'Overlord Reward', 1, ''],
	['Hags Hunger', 'Overlord Reward', 1, ''],
	['Mockery', 'Overlord Reward', 1, ''],
	['Offertory Affliction', 'Overlord Reward', 1, ''],
	['Power in Numbers', 'Overlord Reward', 1, ''],
	['Secrets of Flesh', 'Overlord Reward', 1, ''],
	['Splice', 'Overlord Reward', 1, ''],
	['Spligs Revenge', 'Overlord Reward', 1, ''],
	['The Wyrm Queens Favor', 'Overlord Reward', 1, ''],
	['The Wyrm Queens Favor', 'Overlord Reward', 1, ''],
	['Toxic Reprisal', 'Overlord Reward', 1, ''],
	['Twin Souls', 'Overlord Reward', 1, ''],
	['Twin Souls', 'Overlord Reward', 1, ''],
	['Unbroken', 'Overlord Reward', 1, ''],
	['Unseen Wings', 'Overlord Reward', 1, ''],
];

var OVERLORD_CARDS = {};

for (var i = 0; i < OVERLORD_CARDS_LIST.length; i++) {
	var card = {};
	card.title = OVERLORD_CARDS_LIST[i][0];
	card.number = OVERLORD_CARDS_LIST[i][2];
	if (OVERLORD_CARDS[OVERLORD_CARDS_LIST[i][1]] == undefined) {
		OVERLORD_CARDS[OVERLORD_CARDS_LIST[i][1]] = [];
	}
	OVERLORD_CARDS[OVERLORD_CARDS_LIST[i][1]].push(card);
}

CORRUPTED_CITIZEN_CARDS = [
	'The Civilian',
	'The Executioner',
	'The Guardsman',
	'The Hero',
	'The Mage',
	'The Magistrate',
	'The Scholar',
	'The Scoundrel',
	'The Siren'
];

var PLOT_DECKS = [
		['Burning Ambition', [
		['Blazing Rage',3,1],
		['Crushing Exhaustion',3,2],
		['Demons Bargain',3,0],
		['Enkindle',1,1],
		['Inferno',0,2],
		['Scorching Presence',2,1],
		['Shifting Earth',2,1],
		['Summon Gargan Mirklace',3,2],
		['Taste Of The Forbidden',2,0],
		['Ynfernael Bonds',2,1]]],
	['Cursed By Power', [
		['Bolt From The Blue',3,1],
		['Cabal',4,1],
		['Dark Pact',0,0],
		['Greater Power',2,1],
		['Masques',2,1],
		['Mystic Might',3,1],
		['Summon Merick',3,2],
		['Thaumaturgy',3,1],
		['The Dark Mark',2,0],
		['The Grasping Grave',2,2]]],
	['Dark Illusions', [
		['Darkness Falls',3,1],
		['Enthrall',2,1],
		['Intricate Schemes',1,0],
		['Malediction',2,1],
		['Mirage',2,1],
		['Misdirection',0,1],
		['Phantasm',3,1],
		['Summon Ariad',3,2],
		['Tainted Blood',1,1],
		['The Ritual Continues',4,0]]],
	['Dragons Greed', [
		['Aurium Plating',3,2],
		['Guardians Of The Hoard',4,0],
		['Iron-Hard Scales',2,1],
		['Jealous Rage',3,2],
		['Massive Bulk',3,1],
		['Mine All Mine',0,0],
		['Punish The Weak',3,1],
		['Summon Valyndra',3,2],
		['Terrifying Presence',2,1],
		['Valyndras Shadow',4,1]]],
	['Endless Thirst', [
		['Bad Dreams',1,1],
		['Bloodline',0,0],
		['Fangs In The Dark',2,1],
		['Nights Embrace',2,1],
		['Nighttime Hunt',3,1],
		['Scent Of Blood',3,1],
		['Summon Eliza',3,2],
		['The Ladys Care',3,1],
		['The Power Of Blood',2,1],
		['The Taste Of Suffering',3,1]]],
	['Goblin Uprising', [
		['Dive Into Cover',3,1],
		['Emergency Rations',2,1],
		['Goblin Ambush',3,1],
		['Meat Shield',2,1],
		['Overfed',2,1],
		['Raided Armory',4,2],
		['Scavenge',4,1],
		['Spirited Retreat',0,1],
		['Summon Splig',3,2]]],
	['Hybrid Loyalty', [
		['Bribery',2,2],
		['Cut A Deal',2,0],
		['Dual Training',0,1],
		['End It',2,1],
		['Fight With Honor',2,0],
		['Hazard Pay',4,0],
		['Make Our Own Luck',2,1],
		['Resourceful',3,1],
		['Show Of Force',2,1],
		['Summon Belthir',2,3]]],
	['Inner Corruption', [
		['Deceitful Scribe',3,0],
		['False Informant',3,0],
		['Friend Or Foe',0,1],
		['Mages Guild',4,1],
		['Merchants Guild',2,0],
		['One Of Us',3,2],
		['Shadow Council',2,1],
		['Summon Rylan Olliven',3,2],
		['Thieves Guild',2,1],
		['Traitorous Friend',3,1]]],
	['Raging Infection', [
		['Affliction Aura',2,2],
		['Envenom',2,1],
		['Fetid Stench',2,1],
		['Infected',2,1],
		['Mass Mutation',2,1],
		['Plague Release',0,1],
		['Summon Bolgoreth',3,2],
		['Virulent Cloud',4,1],
		['Weakened Spirit',3,1],
		['Weakness Within',2,2]]],
	['Seeds Of Betrayal', [
		['Always Prepared',2,1],
		['False Friends',3,2],
		['Meticulous Planning',4,1],
		['Nefarious Power',2,1],
		['Rush Of Power',2,1],
		['Scrying And Plotting',1,3],
		['Sole Purpose',0,0],
		['Summon Zachareth',3,2],
		['Trouble On The Road',3,2],
		['Two-Pronged Gambit',2,1]]],
	['Silent Protector', [
		['Brethren',0,1],
		['Curative Spirit',2,1],
		['Diplomatic',1,1],
		['Oath Of Silence',3,1],
		['Pacify',2,1],
		['Pity The Weak',2,1],
		['Power In Mourning',3,1],
		['Shared Burdens',3,1],
		['Summon Serena',3,2],
		['Travelers Rest',3,2]]],
	['Skulduggery', [
		['Bait And Switch',3,2],
		['Concealment',2,0],
		['Covetous',2,1],
		['Cursed Treasure',3,0],
		['Distraction',2,2],
		['Foiled Again',2,1],
		['Guarded Treasure',3,0],
		['Petty Theft',0,1],
		['Slippery',2,1],
		['Summon Raythen',3,2]]],
	['Tangled Web', [
		['Embrace Darkness',2,1],
		['Entangling Weave',2,1],
		['Feral Instincts',2,1],
		['Hidden Predator',2,1],
		['Natural Camouflage',0,1],
		['Savage Exploitation',4,2],
		['Solitary Prey',3,1],
		['Summon Queen Ariad',3,2],
		['Unsafe Passage',2,2],
		['Web Of Deception',2,1]]],
	['The Fallen Elite', [
		['Armor Of Darkness',0,1],
		['Dark Champions',3,3],
		['Fight in Formation',3,1],
		['Vengeful Resolve',3,1],
		['Knight Training',3,1],
		['Refuse To Die',4,3],
		['Summon Alric',3,2],
		['Trial Of Knighthood',2,1],
		['Unkillable',3,2],
		['Veteran Council',2,1]]],
	['Twisted Soul', [
		['Bitter Rage',2,1],
		['Delusional Path',3,1],
		['Desolation',2,2],
		['Faithful Guardian',4,0],
		['Possessive Nature',1,0],
		['Summon Skarn',3,2],
		['Thick Scars',2,1],
		['Thunderous Fall',2,1],
		['Unknown Origin',3,0],
		['What Doesnt Kill',0,1]]],
	['Unseen Legions', [
		['Always Watching',4,1],
		['Envious Swarm',2,1],
		['Flee The Light',2,1],
		['Ignoble Sacrifice',2,1],
		['In Every Shadow',2,0],
		['Infestation',2,1],
		['Initiation',3,1],
		['Into The Shadows',3,1],
		['Mouths To Feed',0,0],
		['Summon Verminous',3,2]]],
	['Unstable Forces', [
		['Descend To Madness',3,1],
		['Explosive Fall',2,1],
		['Love Of Chaos',3,1],
		['Mortal Coil',2,2],
		['Onslaught',3,2],
		['Pariah',2,0],
		['Power And Sacrifice',3,0],
		['Soul Ensnare',3,1],
		['Summon Tristayne Olliven',3,2],
		['Wild Energy',0,0]]],
	['Eternal Agony', [
		['Branded',2,1],
		['Idle Hands',3,1],
		['If Looks Could Kill',1,2],
		['Long Suffering',1,1],
		['Make No Excuse',1,1],
		['Pins And Needles',2,0],
		['Sadist',3,2],
		['Spite',0,1],
		['Summon Zarihell',3,2],
		['Time On The Rack',3,1]]],
	['First Legion', [
		['Camaraderie',2,1],
		['Defensive Position',3,2],
		['Fealty',2,1],
		['Loyality Rewarded',4,1],
		['Retribution',2,1],
		['Rise to the Challenge',4,0],
		['Strength in Numbers',0,1],
		['Swarming Tide',2,1],
		['Summon Ardus IxErebus',3,2],
		['Threatening Masses',2,1]]],
	['Vital Essence', [
		['Bleed it out',3,0],
		['Broken',0,0],
		['Dangerous Knowledge',2,0],
		['Invest in the Flesh',3,1],
		['Last Words',1,1],
		['No Interference',2,1],
		['Plague of the Mind',2,1],
		['Slow Bones',3,1],
		['Summon Kyndrithul',3,2],
		['Worn Down',3,1]]]
];

var SHOWING_CLASSES = [];
SHOWING_CLASSES[1] = 'showOneCell';
SHOWING_CLASSES[2] = 'showTwoCells';
SHOWING_CLASSES[3] = 'showThreeCells';

var monsterNumber = 1;
var sackNumber = 1;
var conditionNumber = 1;

var config = {};

var defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJFdHRpbiIsIm1hc3RlciI6dHJ1ZSwieCI6IjEwIiwieSI6IjAiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMTYiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkV0dGluIiwibWFzdGVyIjpmYWxzZSwieCI6IjEwIiwieSI6IjIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6dHJ1ZSwieCI6IjEzIiwieSI6IjQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNCIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTQiLCJ5IjoiNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6W119LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE0IiwieSI6IjYiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNCIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjpbXX1dLCJoZXJvMSI6eyJ0aXRsZSI6IkFzaHJpYW4iLCJ4IjoiMTIiLCJ5IjoiOCIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkRpc2NpcGxlIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFybW9yIE9mIEZhaXRoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGVzc2VkIFN0cmlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2xlYW5zaW5nIFRvdWNoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEaXZpbmUgRnVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSG9seSBQb3dlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIEhlYWxpbmciLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIFBlYWNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSYWRpYW50IExpZ2h0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJUaW1lIE9mIE5lZWQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIE1hY2UiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6W119LCJoZXJvMiI6eyJ0aXRsZSI6IlN5bmRyYWVsIiwieCI6IjEyIiwieSI6IjkiLCJocCI6IjEyIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJLbmlnaHQiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWR2YW5jZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2hhbGxlbmdlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRlZmVuc2UgVHJhaW5pbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkd1YXJkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTaGllbGQgU2xhbSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIExvbmdzd29yZCIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjpbXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBCb29rIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiI4Iiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJSdW5lbWFzdGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkJyZWFrIFRoZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFeHBsb2RpbmcgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR2hvc3QgQXJtb3IiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkluc2NyaWJlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIklyb24gV2lsbCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUXVpY2sgQ2FzdGluZyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuZSBNYXN0ZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5pYyBLbm93bGVkZ2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgU29yY2VyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkFyY2FuZSBCb2x0IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6W119LCJoZXJvNCI6eyJ0aXRsZSI6IkphaW4gRmFpcndvb2QiLCJ4IjoiMTIiLCJ5IjoiMTEiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IldpbGRsYW5kZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWNjdXJhdGUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJsYWNrIEFycm93IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCb3cgTWFzdGVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGFuZ2VyIFNlbnNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFYWdsZSBFeWVzIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGaXJzdCBTdHJpa2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkZsZWV0IE9mIEZvb3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk5pbWJsZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5uaW5nIFNob3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJZZXcgU2hvcnRib3ciLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjpbXX0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjEyIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjYiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMyIsInkiOiI1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjEifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbXX0sImxpZXV0ZW5hbnRzIjpbXSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTB9';
var actOne = true;

var CAMPAIGNS = [
		['The Shadow Rune','TSR'],
		['Heirs of Blood','Hob'],
		['Lair of the Wyrm','LotW'],
		['Labyrinth of Ruin','LoR'],
		['The Trollfens','TF'],
		['Shadow of Nerekhall','SoN'],
		['Manor of Ravens','MoR'],
		['Mists of Bilehall','MoB'],
		['The Chains That Rust','CTR'],
		['H&M Collections','HM']
		//,['Custom','Custom']
];
var ALL_CAMPAIGNS_CLASSES =''
for (var i = 0; i < CAMPAIGNS.length; i++) {
	ALL_CAMPAIGNS_CLASSES += CAMPAIGNS[i][1] + ' ';
}

var MAP_HASES_LIST = [
	['TSR','First Blood', "eyJ0aWxlcyI6W3sidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiI1IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbXSwieHMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTMiLCJ5IjoiNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiIxIn1dLCJtb25zdGVycyI6W3sidGl0bGUiOiJFdHRpbiIsIm1hc3RlciI6dHJ1ZSwieCI6IjciLCJ5IjoiMSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIxNiIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiRXR0aW4iLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNyIsInkiOiIxIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOnRydWUsIngiOiIxMSIsInkiOiI1IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTEiLCJ5IjoiNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6W119LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjExIiwieSI6IjUiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMSIsInkiOiI1IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTEiLCJ5IjoiNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6W119XSwibGlldXRlbmFudHMiOltdLCJhY3RPbmUiOnRydWV9"],
	['TSR','A Fat Goblin - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiMiIsInkiOiI5IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMiIsInkiOiI5IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMiIsInkiOiI5IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMiIsInkiOiI5IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMiIsInkiOiI5IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6Ik9wZW4gR3JvdXAiLCJtYXN0ZXIiOnRydWUsIngiOiIxMiIsInkiOiI2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjAiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IkFzaHJpYW4iLCJ4IjoiMTIiLCJ5IjoiOCIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkRpc2NpcGxlIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFybW9yIE9mIEZhaXRoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGVzc2VkIFN0cmlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2xlYW5zaW5nIFRvdWNoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEaXZpbmUgRnVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSG9seSBQb3dlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIEhlYWxpbmciLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIFBlYWNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSYWRpYW50IExpZ2h0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJUaW1lIE9mIE5lZWQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIE1hY2UiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMiI6eyJ0aXRsZSI6IlN5bmRyYWVsIiwieCI6IjEyIiwieSI6IjkiLCJocCI6IjEyIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJLbmlnaHQiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWR2YW5jZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2hhbGxlbmdlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRlZmVuc2UgVHJhaW5pbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkd1YXJkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTaGllbGQgU2xhbSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIExvbmdzd29yZCIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBCb29rIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiI4Iiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJSdW5lbWFzdGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkJyZWFrIFRoZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFeHBsb2RpbmcgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR2hvc3QgQXJtb3IiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkluc2NyaWJlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIklyb24gV2lsbCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUXVpY2sgQ2FzdGluZyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuZSBNYXN0ZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5pYyBLbm93bGVkZ2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgU29yY2VyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkFyY2FuZSBCb2x0IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvNCI6eyJ0aXRsZSI6IkphaW4gRmFpcndvb2QiLCJ4IjoiMTIiLCJ5IjoiMTEiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IldpbGRsYW5kZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWNjdXJhdGUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJsYWNrIEFycm93IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCb3cgTWFzdGVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGFuZ2VyIFNlbnNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFYWdsZSBFeWVzIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGaXJzdCBTdHJpa2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkZsZWV0IE9mIEZvb3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk5pbWJsZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5uaW5nIFNob3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJZZXcgU2hvcnRib3ciLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sInRpbGVzIjpbeyJ0aXRsZSI6IjIwIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE4Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjExIiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W10sInhzIjpbeyJ0aXRsZSI6IjF4MSIsIngiOiI2IiwieSI6IjgifSx7InRpdGxlIjoiMXgxIiwieCI6IjciLCJ5IjoiOCJ9XSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJSZWQiLCJ4IjoiNSIsInkiOiI3In0seyJ0aXRsZSI6IlJlZCIsIngiOiI1IiwieSI6IjQifSx7InRpdGxlIjoiUmVkIiwieCI6IjgiLCJ5IjoiNCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiOCIsInkiOiI3In1dLCJvdmVybG9yZCI6eyJjYXJkcyI6W119LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6InRlc3QiLCJvdmVsb3JkVmljdG9yeSI6IiIsImN1cnJlbnRTdGF0dXMiOiIiLCJyZWluZm9yY2VtZW50cyI6IiJ9LCJwbG90Ijp7InRpdGxlIjoiIn0sIm1vbnN0ZXJUcmFpdHMiOnsiYnVpbGRpbmciOiJidWlsZGluZyIsImNhdmUiOiJjYXZlIiwiY2l2aWxpemVkIjoiY2l2aWxpemVkIiwiY29sZCI6ImNvbGQiLCJjdXJzZWQiOiJjdXJzZWQiLCJkYXJrIjoiZGFyayIsImhvdCI6ImhvdCIsIm1vdW50YWluIjoibW91bnRhaW4iLCJ3YXRlciI6IndhdGVyIiwid2lsZGVybmVzcyI6IndpbGRlcm5lc3MifSwiZXhwYW5zaW9ucyI6eyJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiOiJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiLCJib25kc29mdGhld2lsZCI6ImJvbmRzb2Z0aGV3aWxkIiwiY3Jvd25vZmRlc3RpbnkiOiJjcm93bm9mZGVzdGlueSIsImNydXNhZGVvZnRoZWZvcmdvdHRlbiI6ImNydXNhZGVvZnRoZWZvcmdvdHRlbiIsImd1YXJkaWFuc29mZGVlcGhhbGwiOiJndWFyZGlhbnNvZmRlZXBoYWxsIiwibGFieXJpbnRob2ZydWluIjoibGFieXJpbnRob2ZydWluIiwibGFpcm9mdGhld3lybSI6ImxhaXJvZnRoZXd5cm0iLCJtYW5vcm9mcmF2ZW5zIjoibWFub3JvZnJhdmVucyIsIm9hdGhvZnRoZW91dGNhc3QiOiJvYXRob2Z0aGVvdXRjYXN0Iiwic2hhcmRzb2ZldmVyZGFyayI6InNoYXJkc29mZXZlcmRhcmsiLCJzaGFkb3dvZm5hcmVraGFsbCI6InNoYWRvd29mbmFyZWtoYWxsIiwic3Rld2FyZHNvZnRoZXNlY3JldCI6InN0ZXdhcmRzb2Z0aGVzZWNyZXQiLCJ0aGV0cm9sbGZlbnMiOiJ0aGV0cm9sbGZlbnMiLCJ0cmVhdHlvZmNoYW1waW9ucyI6InRyZWF0eW9mY2hhbXBpb25zIiwidmlzaW9uc29mZGF3biI6InZpc2lvbnNvZmRhd24iLCJjb252ZXJzaW9ua2l0IjoiY29udmVyc2lvbmtpdCIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifX0="],
	['TSR','A Fat Goblin - E2', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiNCIsInkiOiIxMCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiMTAiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiI0IiwieSI6IjEwIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNCIsInkiOiIxMCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiMTAiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiQ2F2ZSBTcGlkZXIiLCJtYXN0ZXIiOnRydWUsIngiOiIxNCIsInkiOiIzIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkNhdmUgU3BpZGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE0IiwieSI6IjMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiQ2F2ZSBTcGlkZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTQiLCJ5IjoiMyIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJDYXZlIFNwaWRlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNCIsInkiOiIzIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IkFzaHJpYW4iLCJ4IjoiMTIiLCJ5IjoiOCIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkRpc2NpcGxlIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFybW9yIE9mIEZhaXRoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGVzc2VkIFN0cmlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2xlYW5zaW5nIFRvdWNoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEaXZpbmUgRnVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSG9seSBQb3dlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIEhlYWxpbmciLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIFBlYWNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSYWRpYW50IExpZ2h0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJUaW1lIE9mIE5lZWQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIE1hY2UiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMiI6eyJ0aXRsZSI6IlN5bmRyYWVsIiwieCI6IjEyIiwieSI6IjkiLCJocCI6IjEyIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJLbmlnaHQiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWR2YW5jZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2hhbGxlbmdlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRlZmVuc2UgVHJhaW5pbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkd1YXJkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTaGllbGQgU2xhbSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIExvbmdzd29yZCIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBCb29rIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiI4Iiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJSdW5lbWFzdGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkJyZWFrIFRoZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFeHBsb2RpbmcgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR2hvc3QgQXJtb3IiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkluc2NyaWJlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIklyb24gV2lsbCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUXVpY2sgQ2FzdGluZyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuZSBNYXN0ZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5pYyBLbm93bGVkZ2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgU29yY2VyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkFyY2FuZSBCb2x0IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvNCI6eyJ0aXRsZSI6IkphaW4gRmFpcndvb2QiLCJ4IjoiMTIiLCJ5IjoiMTEiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IldpbGRsYW5kZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWNjdXJhdGUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJsYWNrIEFycm93IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCb3cgTWFzdGVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGFuZ2VyIFNlbnNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFYWdsZSBFeWVzIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGaXJzdCBTdHJpa2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkZsZWV0IE9mIEZvb3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk5pbWJsZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5uaW5nIFNob3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJZZXcgU2hvcnRib3ciLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTUiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMSIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI3IiwieSI6IjgiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEyIiwieSI6IjciLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiOCIsIm9wZW5lZCI6ZmFsc2V9XSwieHMiOltdLCJhbGxpZXMiOltdLCJmYW1pbGlhcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiI2In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiI3In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiI1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiIxMiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTIiLCJ5IjoiNCJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOltdfSwibGlldXRlbmFudHMiOlt7InRpdGxlIjoiU3BsaWciLCJ4IjoiMyIsInkiOiI5IiwiaHAiOiIxMyIsImNvbmRpdGlvbnMiOnt9LCJoYXNCYWNrIjp0cnVlLCJ2ZXJ0aWNhbCI6ZmFsc2UsInJlbGljcyI6W10sInNraWxscyI6W119XSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiIiwib3ZlbG9yZFZpY3RvcnkiOiIiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiIifSwicGxvdCI6eyJ0aXRsZSI6IiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjYXZlIjoiY2F2ZSIsImNpdmlsaXplZCI6ImNpdmlsaXplZCIsImNvbGQiOiJjb2xkIiwiY3Vyc2VkIjoiY3Vyc2VkIiwiZGFyayI6ImRhcmsiLCJob3QiOiJob3QiLCJtb3VudGFpbiI6Im1vdW50YWluIiwid2F0ZXIiOiJ3YXRlciIsIndpbGRlcm5lc3MiOiJ3aWxkZXJuZXNzIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwiY29udmVyc2lvbmtpdCI6ImNvbnZlcnNpb25raXQiLCJtaXN0c29mYmlsZWhhbGwiOiJtaXN0c29mYmlsZWhhbGwiLCJjaGFpbnN0aGF0cnVzdCI6ImNoYWluc3RoYXRydXN0In19"],
	['TSR','Castle Daerion - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJPcGVuIEdyb3VwIiwibWFzdGVyIjp0cnVlLCJ4IjoiMTQiLCJ5IjoiMTMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiT3BlbiBHcm91cCIsIm1hc3RlciI6dHJ1ZSwieCI6IjUiLCJ5IjoiNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIwIiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiJBc2hyaWFuIiwieCI6IjEyIiwieSI6IjgiLCJocCI6IjEwIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJEaXNjaXBsZSIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJBcm1vciBPZiBGYWl0aCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQmxlc3NlZCBTdHJpa2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkNsZWFuc2luZyBUb3VjaCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGl2aW5lIEZ1cnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkhvbHkgUG93ZXIiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlByYXllciBPZiBIZWFsaW5nIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlByYXllciBPZiBQZWFjZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUmFkaWFudCBMaWdodCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiVGltZSBPZiBOZWVkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBNYWNlIiwiaGFuZDIiOiJXb29kZW4gU2hpZWxkIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwiaGVybzIiOnsidGl0bGUiOiJTeW5kcmFlbCIsIngiOiIxMiIsInkiOiI5IiwiaHAiOiIxMiIsInN0YW1pbmEiOiI0IiwiY2xhc3NOYW1lIjoiS25pZ2h0IiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFkdmFuY2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkNoYWxsZW5nZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGVmZW5kIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJHdWFyZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSW5zcGlyYXRpb24iLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk9hdGggT2YgSG9ub3IiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2hpZWxkIFNsYW0iLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlN0YWx3YXJ0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBMb25nc3dvcmQiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMyI6eyJ0aXRsZSI6Ikxlb3JpYyBvZiB0aGUgQm9vayIsIngiOiIxMiIsInkiOiIxMCIsImhwIjoiOCIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiUnVuZW1hc3RlciIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJCcmVhayBUaGUgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRXhwbG9kaW5nIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkdob3N0IEFybW9yIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNjcmliZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJcm9uIFdpbGwiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlF1aWNrIENhc3RpbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmUgTWFzdGVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgS25vd2xlZGdlIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmljIFNvcmNlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJBcmNhbmUgQm9sdCIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwiaGVybzQiOnsidGl0bGUiOiJKYWluIEZhaXJ3b29kIiwieCI6IjEyIiwieSI6IjExIiwiaHAiOiI4Iiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJXaWxkbGFuZGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFjY3VyYXRlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGFjayBBcnJvdyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQm93IE1hc3RlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRhbmdlciBTZW5zZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRWFnbGUgRXllcyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRmlyc3QgU3RyaWtlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGbGVldCBPZiBGb290IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJOaW1ibGUiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVubmluZyBTaG90IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiWWV3IFNob3J0Ym93IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJ0aWxlcyI6W3sidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjciLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjEwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIxNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjgiLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMiIsInkiOiI1Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiOSIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMSIsInkiOiIxMSIsIm9wZW5lZCI6ZmFsc2V9XSwieHMiOltdLCJhbGxpZXMiOltdLCJmYW1pbGlhcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiI3IiwieSI6IjIifSx7InRpdGxlIjoiUmVkIiwieCI6IjIiLCJ5IjoiMTIifSx7InRpdGxlIjoiUmVkIiwieCI6IjExIiwieSI6IjkifSx7InRpdGxlIjoiUmVkIiwieCI6IjE1IiwieSI6IjE2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiIxNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiMTQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiMiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiI1In1dLCJvdmVybG9yZCI6eyJjYXJkcyI6W119LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sInBsb3QiOnsidGl0bGUiOiIifSwibW9uc3RlclRyYWl0cyI6eyJidWlsZGluZyI6ImJ1aWxkaW5nIiwiY2F2ZSI6ImNhdmUiLCJjaXZpbGl6ZWQiOiJjaXZpbGl6ZWQiLCJjb2xkIjoiY29sZCIsImN1cnNlZCI6ImN1cnNlZCIsImRhcmsiOiJkYXJrIiwiaG90IjoiaG90IiwibW91bnRhaW4iOiJtb3VudGFpbiIsIndhdGVyIjoid2F0ZXIiLCJ3aWxkZXJuZXNzIjoid2lsZGVybmVzcyJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsImNvbnZlcnNpb25raXQiOiJjb252ZXJzaW9ua2l0IiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9fQ=="],
	['TSR','Castle Daerion - E2', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJPcGVuIEdyb3VwIiwibWFzdGVyIjp0cnVlLCJ4IjoiMTAiLCJ5IjoiNyIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIwIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJFdHRpbiIsIm1hc3RlciI6dHJ1ZSwieCI6IjYiLCJ5IjoiMSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI4IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJFdHRpbiIsIm1hc3RlciI6ZmFsc2UsIngiOiI2IiwieSI6IjEiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiWm9tYmllIiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiNyIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiJBc2hyaWFuIiwieCI6IjEyIiwieSI6IjgiLCJocCI6IjEwIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJEaXNjaXBsZSIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJBcm1vciBPZiBGYWl0aCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQmxlc3NlZCBTdHJpa2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkNsZWFuc2luZyBUb3VjaCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGl2aW5lIEZ1cnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkhvbHkgUG93ZXIiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlByYXllciBPZiBIZWFsaW5nIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlByYXllciBPZiBQZWFjZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUmFkaWFudCBMaWdodCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiVGltZSBPZiBOZWVkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBNYWNlIiwiaGFuZDIiOiJXb29kZW4gU2hpZWxkIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwiaGVybzIiOnsidGl0bGUiOiJTeW5kcmFlbCIsIngiOiIxMiIsInkiOiI5IiwiaHAiOiIxMiIsInN0YW1pbmEiOiI0IiwiY2xhc3NOYW1lIjoiS25pZ2h0IiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFkdmFuY2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkNoYWxsZW5nZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGVmZW5kIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJHdWFyZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSW5zcGlyYXRpb24iLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk9hdGggT2YgSG9ub3IiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2hpZWxkIFNsYW0iLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlN0YWx3YXJ0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBMb25nc3dvcmQiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMyI6eyJ0aXRsZSI6Ikxlb3JpYyBvZiB0aGUgQm9vayIsIngiOiIxMiIsInkiOiIxMCIsImhwIjoiOCIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiUnVuZW1hc3RlciIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJCcmVhayBUaGUgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRXhwbG9kaW5nIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkdob3N0IEFybW9yIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNjcmliZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJcm9uIFdpbGwiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlF1aWNrIENhc3RpbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmUgTWFzdGVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgS25vd2xlZGdlIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmljIFNvcmNlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJBcmNhbmUgQm9sdCIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwiaGVybzQiOnsidGl0bGUiOiJKYWluIEZhaXJ3b29kIiwieCI6IjEyIiwieSI6IjExIiwiaHAiOiI4Iiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJXaWxkbGFuZGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFjY3VyYXRlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGFjayBBcnJvdyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQm93IE1hc3RlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRhbmdlciBTZW5zZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRWFnbGUgRXllcyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRmlyc3QgU3RyaWtlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGbGVldCBPZiBGb290IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJOaW1ibGUiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVubmluZyBTaG90IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiWWV3IFNob3J0Ym93IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJ0aWxlcyI6W3sidGl0bGUiOiIxIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxNCIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxOSIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjYiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjExIiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W10sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJXaGl0ZSIsIngiOiIzIiwieSI6IjciLCJocCI6IjI1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI0IiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiNiJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOltdfSwibGlldXRlbmFudHMiOlt7InRpdGxlIjoiU2lyIEFscmljIEZhcnJvdyIsIngiOiIxMCIsInkiOiIxIiwiaHAiOiIxNiIsImNvbmRpdGlvbnMiOnt9LCJoYXNCYWNrIjp0cnVlLCJ2ZXJ0aWNhbCI6ZmFsc2UsInJlbGljcyI6W10sInNraWxscyI6W119XSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiIiwib3ZlbG9yZFZpY3RvcnkiOiIiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiIifSwicGxvdCI6eyJ0aXRsZSI6IiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjYXZlIjoiY2F2ZSIsImNpdmlsaXplZCI6ImNpdmlsaXplZCIsImNvbGQiOiJjb2xkIiwiY3Vyc2VkIjoiY3Vyc2VkIiwiZGFyayI6ImRhcmsiLCJob3QiOiJob3QiLCJtb3VudGFpbiI6Im1vdW50YWluIiwid2F0ZXIiOiJ3YXRlciIsIndpbGRlcm5lc3MiOiJ3aWxkZXJuZXNzIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwiY29udmVyc2lvbmtpdCI6ImNvbnZlcnNpb25raXQiLCJtaXN0c29mYmlsZWhhbGwiOiJtaXN0c29mYmlsZWhhbGwiLCJjaGFpbnN0aGF0cnVzdCI6ImNoYWluc3RoYXRydXN0In19"],
	['TSR','The Cardinals Plight - E1', 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJGbGVzaCBNb3VsZGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiOSIsInkiOiIyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkZsZXNoIE1vdWxkZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiOSIsInkiOiIyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkZsZXNoIE1vdWxkZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiOSIsInkiOiIyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkZsZXNoIE1vdWxkZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiOSIsInkiOiIyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6Ik9wZW4gR3JvdXAiLCJtYXN0ZXIiOnRydWUsIngiOiIzIiwieSI6IjYiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMCIsImNvbmRpdGlvbnMiOnt9fV0sImhlcm8xIjp7InRpdGxlIjoiQXNocmlhbiIsIngiOiIxMiIsInkiOiI4IiwiaHAiOiIxMCIsInN0YW1pbmEiOiI0IiwiY2xhc3NOYW1lIjoiRGlzY2lwbGUiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQXJtb3IgT2YgRmFpdGgiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJsZXNzZWQgU3RyaWtlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJDbGVhbnNpbmcgVG91Y2giLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRpdmluZSBGdXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJIb2x5IFBvd2VyIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJQcmF5ZXIgT2YgSGVhbGluZyIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJQcmF5ZXIgT2YgUGVhY2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJhZGlhbnQgTGlnaHQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlRpbWUgT2YgTmVlZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6Iklyb24gTWFjZSIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm8yIjp7InRpdGxlIjoiU3luZHJhZWwiLCJ4IjoiMTIiLCJ5IjoiOSIsImhwIjoiMTIiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IktuaWdodCIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJBZHZhbmNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJDaGFsbGVuZ2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRlZmVuZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGVmZW5zZSBUcmFpbmluZyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR3VhcmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkluc3BpcmF0aW9uIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJPYXRoIE9mIEhvbm9yIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlNoaWVsZCBTbGFtIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTdGFsd2FydCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6Iklyb24gTG9uZ3N3b3JkIiwiaGFuZDIiOiJXb29kZW4gU2hpZWxkIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwiaGVybzMiOnsidGl0bGUiOiJMZW9yaWMgb2YgdGhlIEJvb2siLCJ4IjoiMTIiLCJ5IjoiMTAiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IlJ1bmVtYXN0ZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQnJlYWsgVGhlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkV4cGxvZGluZyBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJHaG9zdCBBcm1vciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSW5zY3JpYmUgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSXJvbiBXaWxsIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJRdWljayBDYXN0aW5nIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5lIE1hc3RlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmljIEtub3dsZWRnZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5pYyBTb3JjZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiQXJjYW5lIEJvbHQiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm80Ijp7InRpdGxlIjoiSmFpbiBGYWlyd29vZCIsIngiOiIxMiIsInkiOiIxMSIsImhwIjoiOCIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiV2lsZGxhbmRlciIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJBY2N1cmF0ZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQmxhY2sgQXJyb3ciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJvdyBNYXN0ZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEYW5nZXIgU2Vuc2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkVhZ2xlIEV5ZXMiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkZpcnN0IFN0cmlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRmxlZXQgT2YgRm9vdCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiTmltYmxlIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bm5pbmcgU2hvdCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IllldyBTaG9ydGJvdyIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwidGlsZXMiOlt7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI5IiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiI0Iiwib3BlbmVkIjpmYWxzZX1dLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W3sidGl0bGUiOiJWaWxsYWdlciBNYWxlIiwieCI6IjEzIiwieSI6IjExIiwiaHAiOiIiLCJjb25kaXRpb25zIjp7fX1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiIxNCIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNCIsInkiOiI3In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNiIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNiIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMiIsInkiOiIyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiIwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNiIsInkiOiI4In1dLCJvdmVybG9yZCI6eyJjYXJkcyI6W119LCJsaWV1dGVuYW50cyI6W3sidGl0bGUiOiJMb3JkIE1lcmljayBGYXJyb3ciLCJ4IjoiMTgiLCJ5IjoiNiIsImhwIjoiMTMiLCJjb25kaXRpb25zIjp7fSwiaGFzQmFjayI6dHJ1ZSwidmVydGljYWwiOmZhbHNlLCJyZWxpY3MiOltdLCJza2lsbHMiOltdfV0sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sInBsb3QiOnsidGl0bGUiOiIifSwibW9uc3RlclRyYWl0cyI6eyJidWlsZGluZyI6ImJ1aWxkaW5nIiwiY2F2ZSI6ImNhdmUiLCJjaXZpbGl6ZWQiOiJjaXZpbGl6ZWQiLCJjb2xkIjoiY29sZCIsImN1cnNlZCI6ImN1cnNlZCIsImRhcmsiOiJkYXJrIiwiaG90IjoiaG90IiwibW91bnRhaW4iOiJtb3VudGFpbiIsIndhdGVyIjoid2F0ZXIiLCJ3aWxkZXJuZXNzIjoid2lsZGVybmVzcyJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSJ9fQ=='],
	['TSR','The Cardinals Plight - E2', 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJab21iaWUiLCJtYXN0ZXIiOnRydWUsIngiOiIxMiIsInkiOiIxMCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI2IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJPcGVuIEdyb3VwIiwibWFzdGVyIjp0cnVlLCJ4IjoiOSIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjAiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IkFzaHJpYW4iLCJ4IjoiMTIiLCJ5IjoiOCIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkRpc2NpcGxlIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFybW9yIE9mIEZhaXRoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGVzc2VkIFN0cmlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2xlYW5zaW5nIFRvdWNoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEaXZpbmUgRnVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSG9seSBQb3dlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIEhlYWxpbmciLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIFBlYWNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSYWRpYW50IExpZ2h0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJUaW1lIE9mIE5lZWQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIE1hY2UiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMiI6eyJ0aXRsZSI6IlN5bmRyYWVsIiwieCI6IjEyIiwieSI6IjkiLCJocCI6IjEyIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJLbmlnaHQiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWR2YW5jZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2hhbGxlbmdlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRlZmVuc2UgVHJhaW5pbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkd1YXJkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTaGllbGQgU2xhbSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIExvbmdzd29yZCIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBCb29rIiwieCI6IjQiLCJ5IjoiMTAiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IlJ1bmVtYXN0ZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQnJlYWsgVGhlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkV4cGxvZGluZyBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJHaG9zdCBBcm1vciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSW5zY3JpYmUgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSXJvbiBXaWxsIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJRdWljayBDYXN0aW5nIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5lIE1hc3RlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmljIEtub3dsZWRnZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5pYyBTb3JjZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiQXJjYW5lIEJvbHQiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm80Ijp7InRpdGxlIjoiSmFpbiBGYWlyd29vZCIsIngiOiIxMiIsInkiOiIxMSIsImhwIjoiOCIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiV2lsZGxhbmRlciIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJBY2N1cmF0ZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQmxhY2sgQXJyb3ciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJvdyBNYXN0ZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEYW5nZXIgU2Vuc2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkVhZ2xlIEV5ZXMiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkZpcnN0IFN0cmlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRmxlZXQgT2YgRm9vdCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiTmltYmxlIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bm5pbmcgU2hvdCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IllldyBTaG9ydGJvdyIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwidGlsZXMiOlt7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI4Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTAiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiNSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTgiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTkiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxOSIsInkiOiIxMyIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMSIsInkiOiI4Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjUiLCJ5IjoiMTAiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTIiLCJ5IjoiMTMiLCJvcGVuZWQiOmZhbHNlfV0sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbeyJ0aXRsZSI6IlZpbGxhZ2VyIE1hbGUiLCJ4IjoiMTMiLCJ5IjoiMTEiLCJocCI6IiIsImNvbmRpdGlvbnMiOnt9fV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiV2hpdGUiLCJ4IjoiOSIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOCIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOSIsInkiOiIxNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTMiLCJ5IjoiMTMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiMTEifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbXX0sImxpZXV0ZW5hbnRzIjpbXSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiIiwib3ZlbG9yZFZpY3RvcnkiOiIiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiIifSwicGxvdCI6eyJ0aXRsZSI6IiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjYXZlIjoiY2F2ZSIsImNpdmlsaXplZCI6ImNpdmlsaXplZCIsImNvbGQiOiJjb2xkIiwiY3Vyc2VkIjoiY3Vyc2VkIiwiZGFyayI6ImRhcmsiLCJob3QiOiJob3QiLCJtb3VudGFpbiI6Im1vdW50YWluIiwid2F0ZXIiOiJ3YXRlciIsIndpbGRlcm5lc3MiOiJ3aWxkZXJuZXNzIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIn19'],
	['TSR','The Masquerade Ball - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiIxIiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI5IiwieSI6IjEifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjkiLCJ5IjoiNSJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjYiLCJ5IjoiNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjExIiwieSI6IjMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiI0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiNyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjExIiwieSI6IjgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNSIsInkiOiIzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiNCJ9XX0="],
	['TSR','The Masquerade Ball - E2', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIzIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjQiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIxOCIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxOSIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjAiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIxNyIsInkiOiIyIiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI2IiwieSI6IjIifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMyIsInkiOiI2In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjE3IiwieSI6IjYifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE5IiwieSI6IjQifSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTgiLCJ5IjoiMSJ9XSwib2JqZWN0aXZlcyI6W119'],
	['TSR','Death on the Wing - E1', "eyJ0aWxlcyI6W3sidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIwIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjAiLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W10sInhzIjpbXX0="],
	['TSR','Death on the Wing - E2', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjciLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTkiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W119'],
	['TSR','The Monsters Hoard - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJNZXJyaW9kIiwibWFzdGVyIjp0cnVlLCJ4IjoiMTIiLCJ5IjoiMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI3IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJNZXJyaW9kIiwibWFzdGVyIjpmYWxzZSwieCI6IjEyIiwieSI6IjIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOnt9fV0sImhlcm8xIjp7InRpdGxlIjoiIn0sImhlcm8yIjp7InRpdGxlIjoiIn0sImhlcm8zIjp7InRpdGxlIjoiIn0sImhlcm80Ijp7InRpdGxlIjoiIn0sInRpbGVzIjpbeyJ0aXRsZSI6IjIiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQSIsIngiOiIzMiIsInkiOiI0IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjIiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjExIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjIiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkEiLCJ4IjoiMjIiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjEyIiwic2lkZSI6IkEiLCJ4IjoiMjEiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkEiLCJ4IjoiMjYiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNiIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjYiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjE4IiwieSI6IjEiLCJvcGVuZWQiOmZhbHNlfV0sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbeyJ0aXRsZSI6IlZpbGxhZ2VyIE1hbGUiLCJ4IjoiMyIsInkiOiIzIiwiaHAiOiIyMCIsImNvbmRpdGlvbnMiOnt9fV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE1IiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjExIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyNSIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyOCIsInkiOiI3In1dLCJvdmVybG9yZCI6eyJjYXJkcyI6W3sic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJlZnVkZGxlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmxpbmRpbmcgU3BlZWQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEaXJ0eSBGaWdodGluZyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkZsdXJyeSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkdyZWFzZSBUcmFwIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiTWVudGFsIEVycm9yIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiTWltaWMifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJPdmVyd2hlbG0ifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJSZWZsZWN0aXZlIFdhcmQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJTaWduIE9mIFdlYWtuZXNzIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiVW5jb250cm9sbGVkIFBvd2VyIn1dfSwibGlldXRlbmFudHMiOltdLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiJJZiB0aGVyZSBhcmUgbm8gZ29ibGluIGFyY2hlcnMgYW5kIG5vIGdvYmxpbiB3aXRjaGVycyBvbiB0aGUgbWFwIiwib3ZlbG9yZFZpY3RvcnkiOiJJZiBhIGdvYmxpbiBtb3ZlcyBvZmYgdGhlIG1hcCB3aGlsZSBjYXJyeWluZyB0aGUgY2FwdGl2ZSB3b21hbiAocmVkIG9iamVjdGl2ZSB0b2tlbikiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiJBdCB0aGUgc3RhcnQgb2YgZWFjaCBvdmVybG9yZCB0dXJuOiAxIGdvYmxpbiBhcmNoZXIgb24gdGhlIFdpbGQgR2FyZGVuICgyNkEpIGFuZCAxIGdvYmxpbiB3aXRjaGVyIG9uIHRoZSBQb25kICgxMkEpIn0sIm1vbnN0ZXJUcmFpdHMiOnsibW91bnRhaW4iOiJtb3VudGFpbiIsIndhdGVyIjoid2F0ZXIiLCJ3aWxkZXJuZXNzIjoid2lsZGVybmVzcyJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifSwicGxvdCI6eyJ0aXRsZSI6IiJ9fQ=="],
	['TSR','The Monsters Hoard - E2', "eyJtb25zdGVycyI6W10sImhlcm8xIjp7InRpdGxlIjoiIn0sImhlcm8yIjp7InRpdGxlIjoiIn0sImhlcm8zIjp7InRpdGxlIjoiIn0sImhlcm80Ijp7InRpdGxlIjoiIn0sInRpbGVzIjpbeyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjMiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMCIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjI5Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjkiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIxMiIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiNSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjEwIiwic2lkZSI6IkIiLCJ4IjoiMTgiLCJ5IjoiNyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjIyIiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjciLCJ5IjoiMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTQiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE4IiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIyIiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI5IiwieSI6IjIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNiIsInkiOiIyIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiOCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE2IiwieSI6IjE1In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiOSIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjkiLCJ5IjoiOSJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJDcml0aWNhbCBCbG93In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFyayBDaGFybSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgRm9ydHVuZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgTWlnaHQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXNoIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRnJlbnp5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUGl0IFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJQb2lzb24gRGFydCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlRyaXB3aXJlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiV29yZCBPZiBNaXNlcnkifV19LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sInBsb3QiOnsidGl0bGUiOiIifSwibW9uc3RlclRyYWl0cyI6eyJkYXJrIjoiZGFyayJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsImNvbnZlcnNpb25raXQiOiJjb252ZXJzaW9ua2l0IiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9fQ=="],
	['TSR','The Shadow Vault', 'eyJ4cyI6W3sidGl0bGUiOiIyeDIiLCJ4IjoiMyIsInkiOiIxIn1dLCJ0aWxlcyI6W3sidGl0bGUiOiI0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjAiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjYiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIxMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjMwIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMTIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyOSIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjE1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjE2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxOCIsInkiOiIyMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjE5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTciLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxOCIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE4IiwieSI6IjI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQSIsIngiOiIxOSIsInkiOiIyNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiIyNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMjMiLCJ5IjoiMjYiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJBIiwieCI6IjIwIiwieSI6IjI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiIzNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNyIsInNpZGUiOiJBIiwieCI6IjE4IiwieSI6IjMxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMSIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjMwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMzMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMzMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMzgiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI2IiwieSI6IjEwIn0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMyIsInkiOiIxNiJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJSZWQiLCJ4IjoiNyIsInkiOiIzIn0seyJ0aXRsZSI6IlJlZCIsIngiOiI3IiwieSI6IjYifV19'],
	['TSR','The Overlord Revealed', "eyJ0aWxlcyI6W3sidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiMjQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI1Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjMwIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjIxIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIxMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI4Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiMTciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjEiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24yeDIiLCJzaWRlIjoiQiIsIngiOiIxOCIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjYiLCJ5IjoiNCJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNyIsInkiOiIxMCJ9XSwieHMiOltdfQ=="],
	['TSR','The Ritual of Shadows - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJGbGVzaCBNb3VsZGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiNiIsInkiOiIxMyIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI1IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJGbGVzaCBNb3VsZGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjYiLCJ5IjoiMTMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiRmxlc2ggTW91bGRlciIsIm1hc3RlciI6ZmFsc2UsIngiOiI2IiwieSI6IjEzIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkZsZXNoIE1vdWxkZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNiIsInkiOiIxMyIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJPcGVuIEdyb3VwIiwibWFzdGVyIjp0cnVlLCJ4IjoiNCIsInkiOiI2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjAiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6Ik9wZW4gR3JvdXAiLCJtYXN0ZXIiOnRydWUsIngiOiIxMSIsInkiOiI2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjAiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IkFzaHJpYW4iLCJ4IjoiMTIiLCJ5IjoiOCIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkRpc2NpcGxlIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFybW9yIE9mIEZhaXRoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGVzc2VkIFN0cmlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2xlYW5zaW5nIFRvdWNoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEaXZpbmUgRnVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSG9seSBQb3dlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIEhlYWxpbmciLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIFBlYWNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSYWRpYW50IExpZ2h0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJUaW1lIE9mIE5lZWQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIE1hY2UiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMiI6eyJ0aXRsZSI6IlN5bmRyYWVsIiwieCI6IjEyIiwieSI6IjkiLCJocCI6IjEyIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJLbmlnaHQiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWR2YW5jZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2hhbGxlbmdlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRlZmVuc2UgVHJhaW5pbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkd1YXJkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTaGllbGQgU2xhbSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIExvbmdzd29yZCIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBCb29rIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiI4Iiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJSdW5lbWFzdGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkJyZWFrIFRoZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFeHBsb2RpbmcgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR2hvc3QgQXJtb3IiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkluc2NyaWJlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIklyb24gV2lsbCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUXVpY2sgQ2FzdGluZyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuZSBNYXN0ZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5pYyBLbm93bGVkZ2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgU29yY2VyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkFyY2FuZSBCb2x0IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvNCI6eyJ0aXRsZSI6IkphaW4gRmFpcndvb2QiLCJ4IjoiMTIiLCJ5IjoiMTEiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IldpbGRsYW5kZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWNjdXJhdGUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJsYWNrIEFycm93IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCb3cgTWFzdGVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGFuZ2VyIFNlbnNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFYWdsZSBFeWVzIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGaXJzdCBTdHJpa2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkZsZWV0IE9mIEZvb3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk5pbWJsZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5uaW5nIFNob3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJZZXcgU2hvcnRib3ciLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTciLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjciLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTMiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTMiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjExIiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbXSwieHMiOltdLCJhbGxpZXMiOltdLCJmYW1pbGlhcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyIiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE1IiwieSI6IjEyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjExIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjE2In1dLCJvdmVybG9yZCI6eyJjYXJkcyI6W119LCJsaWV1dGVuYW50cyI6W3sidGl0bGUiOiJMb3JkIE1lcmljayBGYXJyb3ciLCJ4IjoiNSIsInkiOiIxNCIsImhwIjoiMTMiLCJjb25kaXRpb25zIjp7fSwiaGFzQmFjayI6dHJ1ZSwidmVydGljYWwiOmZhbHNlLCJyZWxpY3MiOlsiU3RhZmYgT2YgU2hhZG93cyJdLCJza2lsbHMiOltdfV0sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sInZpbGxhZ2VycyI6W10sInBsb3QiOnsidGl0bGUiOiIifSwibW9uc3RlclRyYWl0cyI6eyJjdXJzZWQiOiJjdXJzZWQifSwiZXhwYW5zaW9ucyI6eyJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiOiJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiLCJib25kc29mdGhld2lsZCI6ImJvbmRzb2Z0aGV3aWxkIiwiY3Jvd25vZmRlc3RpbnkiOiJjcm93bm9mZGVzdGlueSIsImNydXNhZGVvZnRoZWZvcmdvdHRlbiI6ImNydXNhZGVvZnRoZWZvcmdvdHRlbiIsImd1YXJkaWFuc29mZGVlcGhhbGwiOiJndWFyZGlhbnNvZmRlZXBoYWxsIiwibGFieXJpbnRob2ZydWluIjoibGFieXJpbnRob2ZydWluIiwibGFpcm9mdGhld3lybSI6ImxhaXJvZnRoZXd5cm0iLCJtYW5vcm9mcmF2ZW5zIjoibWFub3JvZnJhdmVucyIsIm9hdGhvZnRoZW91dGNhc3QiOiJvYXRob2Z0aGVvdXRjYXN0Iiwic2hhcmRzb2ZldmVyZGFyayI6InNoYXJkc29mZXZlcmRhcmsiLCJzaGFkb3dvZm5hcmVraGFsbCI6InNoYWRvd29mbmFyZWtoYWxsIiwic3Rld2FyZHNvZnRoZXNlY3JldCI6InN0ZXdhcmRzb2Z0aGVzZWNyZXQiLCJ0aGV0cm9sbGZlbnMiOiJ0aGV0cm9sbGZlbnMiLCJ0cmVhdHlvZmNoYW1waW9ucyI6InRyZWF0eW9mY2hhbXBpb25zIiwidmlzaW9uc29mZGF3biI6InZpc2lvbnNvZmRhd24iLCJjb252ZXJzaW9ua2l0IjoiY29udmVyc2lvbmtpdCIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifX0="],

	['TSR','The Ritual of Shadows - E2', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJGbGVzaCBNb3VsZGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiNiIsInkiOiIxMyIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI1IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJGbGVzaCBNb3VsZGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjYiLCJ5IjoiMTMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiRmxlc2ggTW91bGRlciIsIm1hc3RlciI6ZmFsc2UsIngiOiI2IiwieSI6IjEzIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkZsZXNoIE1vdWxkZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNiIsInkiOiIxMyIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJPcGVuIEdyb3VwIiwibWFzdGVyIjp0cnVlLCJ4IjoiNCIsInkiOiI2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjAiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6Ik9wZW4gR3JvdXAiLCJtYXN0ZXIiOnRydWUsIngiOiIxMyIsInkiOiIxMSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIwIiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiJBc2hyaWFuIiwieCI6IjEyIiwieSI6IjgiLCJocCI6IjEwIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJEaXNjaXBsZSIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJBcm1vciBPZiBGYWl0aCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQmxlc3NlZCBTdHJpa2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkNsZWFuc2luZyBUb3VjaCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGl2aW5lIEZ1cnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkhvbHkgUG93ZXIiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlByYXllciBPZiBIZWFsaW5nIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlByYXllciBPZiBQZWFjZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUmFkaWFudCBMaWdodCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiVGltZSBPZiBOZWVkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBNYWNlIiwiaGFuZDIiOiJXb29kZW4gU2hpZWxkIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwiaGVybzIiOnsidGl0bGUiOiJTeW5kcmFlbCIsIngiOiIxMiIsInkiOiI5IiwiaHAiOiIxMiIsInN0YW1pbmEiOiI0IiwiY2xhc3NOYW1lIjoiS25pZ2h0IiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFkdmFuY2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkNoYWxsZW5nZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGVmZW5kIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJHdWFyZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSW5zcGlyYXRpb24iLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk9hdGggT2YgSG9ub3IiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2hpZWxkIFNsYW0iLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlN0YWx3YXJ0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBMb25nc3dvcmQiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMyI6eyJ0aXRsZSI6Ikxlb3JpYyBvZiB0aGUgQm9vayIsIngiOiIxMiIsInkiOiIxMCIsImhwIjoiOCIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiUnVuZW1hc3RlciIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJCcmVhayBUaGUgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRXhwbG9kaW5nIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkdob3N0IEFybW9yIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNjcmliZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJcm9uIFdpbGwiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlF1aWNrIENhc3RpbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmUgTWFzdGVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgS25vd2xlZGdlIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmljIFNvcmNlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJBcmNhbmUgQm9sdCIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwiaGVybzQiOnsidGl0bGUiOiJKYWluIEZhaXJ3b29kIiwieCI6IjEyIiwieSI6IjExIiwiaHAiOiI4Iiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJXaWxkbGFuZGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFjY3VyYXRlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGFjayBBcnJvdyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQm93IE1hc3RlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRhbmdlciBTZW5zZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRWFnbGUgRXllcyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRmlyc3QgU3RyaWtlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGbGVldCBPZiBGb290IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJOaW1ibGUiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVubmluZyBTaG90IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiWWV3IFNob3J0Ym93IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJ0aWxlcyI6W3sidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMSIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxOSIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMjUiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIxMSIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI3IiwieSI6IjUiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE1IiwieSI6IjciLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiOSIsInkiOiIxMCIsIm9wZW5lZCI6dHJ1ZX1dLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTUiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjciLCJ5IjoiMTYifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbXX0sImxpZXV0ZW5hbnRzIjpbeyJ0aXRsZSI6IkxvcmQgTWVyaWNrIEZhcnJvdyIsIngiOiI1IiwieSI6IjE0IiwiaHAiOiIxMyIsImNvbmRpdGlvbnMiOnt9LCJoYXNCYWNrIjp0cnVlLCJ2ZXJ0aWNhbCI6ZmFsc2UsInJlbGljcyI6WyJTdGFmZiBPZiBTaGFkb3dzIl0sInNraWxscyI6W119XSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInZpbGxhZ2VycyI6W10sInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiIiwib3ZlbG9yZFZpY3RvcnkiOiIiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiIifSwibW9uc3RlclRyYWl0cyI6eyJjdXJzZWQiOiJjdXJzZWQifSwicGxvdCI6eyJ0aXRsZSI6IiJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsImNvbnZlcnNpb25raXQiOiJjb252ZXJzaW9ua2l0IiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9fQ=="],
	['LoR','Ruinous Whispers', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjM2Iiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiMTAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTIiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNyIsInkiOiIxIn0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNSIsInkiOiI4In1dfQ=="],
	['LoR','Gathering Foretold - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjM4Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNDMiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNDAiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiOSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIxNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyMSIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjExIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIyIiwieSI6IjExIiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTkiLCJ5IjoiMTMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMSJ9XX0="],
	['LoR','Gathering Foretold - E2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxNCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxOCIsInNpZGUiOiJBIiwieCI6IjExIiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI0MyIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI5IiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIxIiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI5IiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjExIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTIifV19"],
	['LoR','Honor Among Thieves - E2', "eyJ0aWxlcyI6W3sidGl0bGUiOiI4Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzAiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjM4Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiU2hydWJiZXJ5IiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOSIsInkiOiI2In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMyIsInkiOiI2In0seyJ0aXRsZSI6IlNocnViYmVyeSIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjkiLCJ5IjoiMTQifV0sInhzIjpbeyJ0aXRsZSI6IjJ4MiIsIngiOiIxNSIsInkiOiI3In0seyJ0aXRsZSI6IjJ4MiIsIngiOiIzIiwieSI6IjEyIn1dfQ=="],
	['LoR','Reclamation - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiMTQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMSIsInkiOiIxNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjExIiwieSI6IjE0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTEiLCJ5IjoiMTQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMSIsInkiOiIxNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiIifSwiaGVybzIiOnsidGl0bGUiOiIifSwiaGVybzMiOnsidGl0bGUiOiIifSwiaGVybzQiOnsidGl0bGUiOiIifSwidGlsZXMiOlt7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjQiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIxOCIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjEyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTgiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiI0IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjQwIiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjIxIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMSIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjIiLCJzaWRlIjoiQSIsIngiOiIxNyIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNiIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjgiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjQyIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjEyIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMTMiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjE0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiIxMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjExIiwieSI6IjciLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiIxMiIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI0IiwieSI6IjciLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJTaHJ1YmJlcnkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMCIsInkiOiI3Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlNocnViYmVyeSIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEwIiwieSI6IjExIiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlNocnViYmVyeSIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiOSIsInkiOiI4Iiwib3BlbmVkIjpmYWxzZX1dLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE1IiwieSI6IjMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjciLCJ5IjoiMTMifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmVmdWRkbGUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCbGluZGluZyBTcGVlZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRpcnR5IEZpZ2h0aW5nIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRmx1cnJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiR3JlYXNlIFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNZW50YWwgRXJyb3IifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNaW1pYyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik92ZXJ3aGVsbSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlJlZmxlY3RpdmUgV2FyZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlNpZ24gT2YgV2Vha25lc3MifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJVbmNvbnRyb2xsZWQgUG93ZXIifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJDYWxsIE9mIFRoZSBSYXZlbnMifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJUaWVzIFRoYXQgQmluZCJ9XX0sImxpZXV0ZW5hbnRzIjpbXSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiIiwib3ZlbG9yZFZpY3RvcnkiOiIiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiIifSwibW9uc3RlclRyYWl0cyI6eyJidWlsZGluZyI6ImJ1aWxkaW5nIiwibW91bnRhaW4iOiJtb3VudGFpbiJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifSwicGxvdCI6eyJ0aXRsZSI6IlVuc2VlbiBMZWdpb25zIiwiY2FyZHMiOltbIkFsd2F5cyBXYXRjaGluZyIsZmFsc2UsZmFsc2VdLFsiRW52aW91cyBTd2FybSIsZmFsc2UsZmFsc2VdLFsiRmxlZSBUaGUgTGlnaHQiLGZhbHNlLGZhbHNlXSxbIklnbm9ibGUgU2FjcmlmaWNlIix0cnVlLGZhbHNlXSxbIkluIEV2ZXJ5IFNoYWRvdyIsZmFsc2UsZmFsc2VdLFsiSW5mZXN0YXRpb24iLGZhbHNlLGZhbHNlXSxbIkluaXRpYXRpb24iLGZhbHNlLGZhbHNlXSxbIkludG8gVGhlIFNoYWRvd3MiLGZhbHNlLGZhbHNlXSxbIk1vdXRocyBUbyBGZWVkIix0cnVlLGZhbHNlXSxbIlN1bW1vbiAtIFZlcm1pbm91cyIsZmFsc2UsZmFsc2VdXSwibnVtYmVyIjoiMyJ9fQ=="],
	['LoR','Reclamation - E2', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiMTEiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiI0IiwieSI6IjExIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOnRydWUsIngiOiI0IiwieSI6IjExIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNCIsInkiOiIxMSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiMTEiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiQ2FycmlvbiBEcmFrZSIsIm1hc3RlciI6dHJ1ZSwieCI6IjQiLCJ5IjoiNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI4IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJDYXJyaW9uIERyYWtlIiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI2IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJDYXJyaW9uIERyYWtlIiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI2IiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiIifSwiaGVybzIiOnsidGl0bGUiOiIifSwiaGVybzMiOnsidGl0bGUiOiIifSwiaGVybzQiOnsidGl0bGUiOiIifSwidGlsZXMiOlt7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxOCIsInkiOiIxMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyMSIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjEiLCJ5IjoiMTEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiOCIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjM5Iiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjI5Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMCIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjAiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjQiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJBIiwieCI6IjE4IiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiU2hydWJiZXJ5IiwidmVydGljYWwiOnRydWUsIngiOiIxOCIsInkiOiI3Iiwib3BlbmVkIjpmYWxzZX1dLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIwIiwieSI6IjEwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjgifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiNiJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCZWZ1ZGRsZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsaW5kaW5nIFNwZWVkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGlydHkgRmlnaHRpbmcifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJGbHVycnkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJHcmVhc2UgVHJhcCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1lbnRhbCBFcnJvciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1pbWljIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiT3ZlcndoZWxtIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUmVmbGVjdGl2ZSBXYXJkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiU2lnbiBPZiBXZWFrbmVzcyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlVuY29udHJvbGxlZCBQb3dlciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkNhbGwgT2YgVGhlIFJhdmVucyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlRpZXMgVGhhdCBCaW5kIn1dfSwibGlldXRlbmFudHMiOltdLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiIiLCJvdmVsb3JkVmljdG9yeSI6IiIsImN1cnJlbnRTdGF0dXMiOiIiLCJyZWluZm9yY2VtZW50cyI6IiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjYXZlIjoiY2F2ZSIsImhvdCI6ImhvdCIsIndhdGVyIjoid2F0ZXIiLCJ3aWxkZXJuZXNzIjoid2lsZGVybmVzcyJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifSwicGxvdCI6eyJ0aXRsZSI6IlVuc2VlbiBMZWdpb25zIiwiY2FyZHMiOltbIkFsd2F5cyBXYXRjaGluZyIsZmFsc2UsZmFsc2VdLFsiRW52aW91cyBTd2FybSIsZmFsc2UsZmFsc2VdLFsiRmxlZSBUaGUgTGlnaHQiLGZhbHNlLGZhbHNlXSxbIklnbm9ibGUgU2FjcmlmaWNlIix0cnVlLGZhbHNlXSxbIkluIEV2ZXJ5IFNoYWRvdyIsZmFsc2UsZmFsc2VdLFsiSW5mZXN0YXRpb24iLGZhbHNlLGZhbHNlXSxbIkluaXRpYXRpb24iLGZhbHNlLGZhbHNlXSxbIkludG8gVGhlIFNoYWRvd3MiLGZhbHNlLGZhbHNlXSxbIk1vdXRocyBUbyBGZWVkIix0cnVlLGZhbHNlXSxbIlN1bW1vbiAtIFZlcm1pbm91cyIsZmFsc2UsZmFsc2VdXSwibnVtYmVyIjoiNSJ9fQ=="],
	['LoR','Barrow of Barris - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjQzIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI0MyIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTMiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIzOSIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxNCIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyIiwieSI6IjExIn1dfQ=="],
	['LoR','Barrow of Barris - E2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzgiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI5Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjMiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiMTIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjkiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjYiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxNCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI0IiwieSI6IjEwIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxNSIsInkiOiI3In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjE0IiwieSI6IjgifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE1IiwieSI6IjExIn1dLCJvYmplY3RpdmVzIjpbXX0="],
	['LoR','Secrets In Stone - E1', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMTAiLCJ5IjoiNyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTAiLCJ5IjoiOSJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTIiLCJ5IjoiNyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTIiLCJ5IjoiOSJ9XSwidGlsZXMiOlt7InRpdGxlIjoiNCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzciLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkEiLCJ4IjoiMTYiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjEwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjQyIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjEyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNDAiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTMiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjEwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjExIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiMTgiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMiIsInkiOiI1In0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjIiLCJ5IjoiMTMifSx7InRpdGxlIjoiV2hpdGUiLCJ4IjoiMTkiLCJ5IjoiMSJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTgiLCJ5IjoiMTgifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE2IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjMiLCJ5IjoiMTUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjE0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjQifV19"],
	['LoR','Back Fron The Dead - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJHb2JsaW4gV2l0Y2hlciIsIm1hc3RlciI6dHJ1ZSwieCI6IjUiLCJ5IjoiNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI1IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gV2l0Y2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiI1IiwieSI6IjQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIFdpdGNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNSIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBXaXRjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjUiLCJ5IjoiNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJab21iaWUiLCJtYXN0ZXIiOnRydWUsIngiOiIyIiwieSI6IjE2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjYiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlpvbWJpZSIsIm1hc3RlciI6ZmFsc2UsIngiOiIyIiwieSI6IjE2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlpvbWJpZSIsIm1hc3RlciI6ZmFsc2UsIngiOiIyIiwieSI6IjE2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlpvbWJpZSIsIm1hc3RlciI6ZmFsc2UsIngiOiIyIiwieSI6IjE2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlpvbWJpZSIsIm1hc3RlciI6ZmFsc2UsIngiOiIyIiwieSI6IjE2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IiJ9LCJoZXJvMiI6eyJ0aXRsZSI6IiJ9LCJoZXJvMyI6eyJ0aXRsZSI6IiJ9LCJoZXJvNCI6eyJ0aXRsZSI6IiJ9LCJ0aWxlcyI6W3sidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMTgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI3Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI5IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjE0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjYiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIxOSIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI3IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI4IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxMyIsImFuZ2xlIjoiIn1dLCJkb29ycyI6W3sidGl0bGUiOiJEb29yIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMyIsInkiOiI4Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxIiwieSI6IjEyIiwib3BlbmVkIjpmYWxzZX1dLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiMTUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiI4In0seyJ0aXRsZSI6IlJlZCIsIngiOiI2IiwieSI6IjgiLCJocCI6IjQifSx7InRpdGxlIjoiUmVkIiwieCI6IjQiLCJ5IjoiMTMiLCJocCI6IjAifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmVmdWRkbGUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCbGluZGluZyBTcGVlZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRpcnR5IEZpZ2h0aW5nIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRmx1cnJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiR3JlYXNlIFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNZW50YWwgRXJyb3IifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNaW1pYyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik92ZXJ3aGVsbSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlJlZmxlY3RpdmUgV2FyZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlNpZ24gT2YgV2Vha25lc3MifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJVbmNvbnRyb2xsZWQgUG93ZXIifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJDYWxsIE9mIFRoZSBSYXZlbnMifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJHcm90ZXNxdWUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJQb3NzZXNzaXZlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiVGllcyBUaGF0IEJpbmQifV19LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sIm1vbnN0ZXJUcmFpdHMiOnsiYnVpbGRpbmciOiJidWlsZGluZyIsImNhdmUiOiJjYXZlIiwibW91bnRhaW4iOiJtb3VudGFpbiJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifSwicGxvdCI6eyJ0aXRsZSI6IlVuc2VlbiBMZWdpb25zIiwiY2FyZHMiOltbIkFsd2F5cyBXYXRjaGluZyIsdHJ1ZSxmYWxzZV0sWyJFbnZpb3VzIFN3YXJtIixmYWxzZSxmYWxzZV0sWyJGbGVlIFRoZSBMaWdodCIsZmFsc2UsZmFsc2VdLFsiSWdub2JsZSBTYWNyaWZpY2UiLHRydWUsZmFsc2VdLFsiSW4gRXZlcnkgU2hhZG93IixmYWxzZSxmYWxzZV0sWyJJbmZlc3RhdGlvbiIsdHJ1ZSxmYWxzZV0sWyJJbml0aWF0aW9uIixmYWxzZSxmYWxzZV0sWyJJbnRvIFRoZSBTaGFkb3dzIixmYWxzZSxmYWxzZV0sWyJNb3V0aHMgVG8gRmVlZCIsdHJ1ZSxmYWxzZV0sWyJTdW1tb24gLSBWZXJtaW5vdXMiLGZhbHNlLGZhbHNlXV0sIm51bWJlciI6IjQifX0="],
	['LoR','Back Fron The Dead - E2', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJHb2JsaW4gV2l0Y2hlciIsIm1hc3RlciI6dHJ1ZSwieCI6IjEyIiwieSI6IjUiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOnt9fV0sImhlcm8xIjp7InRpdGxlIjoiIn0sImhlcm8yIjp7InRpdGxlIjoiIn0sImhlcm8zIjp7InRpdGxlIjoiIn0sImhlcm80Ijp7InRpdGxlIjoiIn0sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIzIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNDAiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI0IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNDMiLCJzaWRlIjoiQSIsIngiOiI0IiwieSI6IjkiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzAiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjkiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI0MyIsInNpZGUiOiJBIiwieCI6IjExIiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIzOCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IiIsIngiOiIiLCJ5IjoiIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiI0IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlNocnViYmVyeSIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjMiLCJ5IjoiOCIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJTaHJ1YmJlcnkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMCIsInkiOiI4Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlNocnViYmVyeSIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNiIsInkiOiI2Iiwib3BlbmVkIjpmYWxzZX1dLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNyIsInkiOiIxMCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjQiLCJ5IjoiOSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEyIiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiI4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiI3In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMiIsInkiOiIxIn1dLCJvdmVybG9yZCI6eyJjYXJkcyI6W3sic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJlZnVkZGxlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmxpbmRpbmcgU3BlZWQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEaXJ0eSBGaWdodGluZyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkZsdXJyeSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkdyZWFzZSBUcmFwIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiTWVudGFsIEVycm9yIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiTWltaWMifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJPdmVyd2hlbG0ifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJSZWZsZWN0aXZlIFdhcmQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJTaWduIE9mIFdlYWtuZXNzIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiVW5jb250cm9sbGVkIFBvd2VyIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQ2FsbCBPZiBUaGUgUmF2ZW5zIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiR3JvdGVzcXVlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUG9zc2Vzc2l2ZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlRpZXMgVGhhdCBCaW5kIn1dfSwibGlldXRlbmFudHMiOlt7InRpdGxlIjoiQXJpYWQiLCJ4IjoiNSIsInkiOiI0IiwiaHAiOiIxNiIsImNvbmRpdGlvbnMiOnt9LCJoYXNCYWNrIjp0cnVlLCJ2ZXJ0aWNhbCI6ZmFsc2UsInJlbGljcyI6W10sInNraWxscyI6W119LHsidGl0bGUiOiJTcGxpZyIsIngiOiI1IiwieSI6IjciLCJocCI6IjEzIiwiY29uZGl0aW9ucyI6e30sImhhc0JhY2siOnRydWUsInZlcnRpY2FsIjpmYWxzZSwicmVsaWNzIjpbXSwic2tpbGxzIjpbXX1dLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiIiLCJvdmVsb3JkVmljdG9yeSI6IiIsImN1cnJlbnRTdGF0dXMiOiIiLCJyZWluZm9yY2VtZW50cyI6IiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjYXZlIjoiY2F2ZSIsIm1vdW50YWluIjoibW91bnRhaW4ifSwiZXhwYW5zaW9ucyI6eyJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiOiJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiLCJib25kc29mdGhld2lsZCI6ImJvbmRzb2Z0aGV3aWxkIiwiY3Jvd25vZmRlc3RpbnkiOiJjcm93bm9mZGVzdGlueSIsImNydXNhZGVvZnRoZWZvcmdvdHRlbiI6ImNydXNhZGVvZnRoZWZvcmdvdHRlbiIsImd1YXJkaWFuc29mZGVlcGhhbGwiOiJndWFyZGlhbnNvZmRlZXBoYWxsIiwibGFieXJpbnRob2ZydWluIjoibGFieXJpbnRob2ZydWluIiwibGFpcm9mdGhld3lybSI6ImxhaXJvZnRoZXd5cm0iLCJtYW5vcm9mcmF2ZW5zIjoibWFub3JvZnJhdmVucyIsIm9hdGhvZnRoZW91dGNhc3QiOiJvYXRob2Z0aGVvdXRjYXN0Iiwic2hhcmRzb2ZldmVyZGFyayI6InNoYXJkc29mZXZlcmRhcmsiLCJzaGFkb3dvZm5hcmVraGFsbCI6InNoYWRvd29mbmFyZWtoYWxsIiwic3Rld2FyZHNvZnRoZXNlY3JldCI6InN0ZXdhcmRzb2Z0aGVzZWNyZXQiLCJ0aGV0cm9sbGZlbnMiOiJ0aGV0cm9sbGZlbnMiLCJ0cmVhdHlvZmNoYW1waW9ucyI6InRyZWF0eW9mY2hhbXBpb25zIiwidmlzaW9uc29mZGF3biI6InZpc2lvbnNvZmRhd24iLCJtaXN0c29mYmlsZWhhbGwiOiJtaXN0c29mYmlsZWhhbGwiLCJjaGFpbnN0aGF0cnVzdCI6ImNoYWluc3RoYXRydXN0In0sInBsb3QiOnsidGl0bGUiOiJVbnNlZW4gTGVnaW9ucyIsImNhcmRzIjpbWyJBbHdheXMgV2F0Y2hpbmciLHRydWUsdHJ1ZV0sWyJFbnZpb3VzIFN3YXJtIixmYWxzZSxmYWxzZV0sWyJGbGVlIFRoZSBMaWdodCIsZmFsc2UsZmFsc2VdLFsiSWdub2JsZSBTYWNyaWZpY2UiLHRydWUsZmFsc2VdLFsiSW4gRXZlcnkgU2hhZG93IixmYWxzZSxmYWxzZV0sWyJJbmZlc3RhdGlvbiIsdHJ1ZSxmYWxzZV0sWyJJbml0aWF0aW9uIixmYWxzZSxmYWxzZV0sWyJJbnRvIFRoZSBTaGFkb3dzIixmYWxzZSxmYWxzZV0sWyJNb3V0aHMgVG8gRmVlZCIsdHJ1ZSxmYWxzZV0sWyJTdW1tb24gLSBWZXJtaW5vdXMiLGZhbHNlLGZhbHNlXV0sIm51bWJlciI6IjMifX0="],
	['LoR','Fortune and Glory - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJFdHRpbiIsIm1hc3RlciI6dHJ1ZSwieCI6IjExIiwieSI6IjkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiOCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiRXR0aW4iLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTEiLCJ5IjoiOSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI1IiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiIifSwiaGVybzIiOnsidGl0bGUiOiIifSwiaGVybzMiOnsidGl0bGUiOiIifSwiaGVybzQiOnsidGl0bGUiOiIifSwidGlsZXMiOlt7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIxMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjEzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI0Iiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiMTUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTUiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjYiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNiIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNiIsInNpZGUiOiJCIiwieCI6IjIxIiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjIiLCJ5IjoiMTciLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjUiLCJ5IjoiOCIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNiIsInkiOiI3Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI2IiwieSI6IjExIiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyMSIsInkiOiIxMCIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMyIsInkiOiI2Iiwib3BlbmVkIjpmYWxzZX1dLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiVW5rbm93biIsIngiOiIyIiwieSI6IjgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNSIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE2IiwieSI6IjUifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIyMyIsInkiOiIxNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIxNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTEiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIzIiwieSI6IjcifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmVmdWRkbGUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCbGluZGluZyBTcGVlZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRpcnR5IEZpZ2h0aW5nIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRmx1cnJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiR3JlYXNlIFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNZW50YWwgRXJyb3IifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNaW1pYyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik92ZXJ3aGVsbSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlJlZmxlY3RpdmUgV2FyZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlNpZ24gT2YgV2Vha25lc3MifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJVbmNvbnRyb2xsZWQgUG93ZXIifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJDYWxsIE9mIFRoZSBSYXZlbnMifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJHcm90ZXNxdWUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJQb3NzZXNzaXZlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiVGllcyBUaGF0IEJpbmQifV19LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sIm1vbnN0ZXJUcmFpdHMiOnsiYnVpbGRpbmciOiJidWlsZGluZyIsImNhdmUiOiJjYXZlIiwiZGFyayI6ImRhcmsiLCJob3QiOiJob3QiLCJ3aWxkZXJuZXNzIjoid2lsZGVybmVzcyJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifSwicGxvdCI6eyJ0aXRsZSI6IlVuc2VlbiBMZWdpb25zIiwiY2FyZHMiOltbIkFsd2F5cyBXYXRjaGluZyIsdHJ1ZSxmYWxzZV0sWyJFbnZpb3VzIFN3YXJtIixmYWxzZSxmYWxzZV0sWyJGbGVlIFRoZSBMaWdodCIsdHJ1ZSxmYWxzZV0sWyJJZ25vYmxlIFNhY3JpZmljZSIsdHJ1ZSxmYWxzZV0sWyJJbiBFdmVyeSBTaGFkb3ciLGZhbHNlLGZhbHNlXSxbIkluZmVzdGF0aW9uIix0cnVlLGZhbHNlXSxbIkluaXRpYXRpb24iLHRydWUsZmFsc2VdLFsiSW50byBUaGUgU2hhZG93cyIsZmFsc2UsZmFsc2VdLFsiTW91dGhzIFRvIEZlZWQiLHRydWUsZmFsc2VdLFsiU3VtbW9uIC0gVmVybWlub3VzIixmYWxzZSxmYWxzZV1dLCJudW1iZXIiOiI3In19"],
	['LoR','Fortune and Glory - E2', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMiIsInkiOiIzIn0seyJ0aXRsZSI6IjF4MSIsIngiOiI4IiwieSI6IjE0In0seyJ0aXRsZSI6IjF4MSIsIngiOiIxNiIsInkiOiIxMyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMjEiLCJ5IjoiMyJ9XSwidGlsZXMiOlt7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzkiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjIwIiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjEiLCJ5IjoiMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjI0IiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNiIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjMiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEiLCJ5IjoiMyJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI3IiwieSI6IjEzIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxNSIsInkiOiIxMiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMjAiLCJ5IjoiMyJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjE1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOCIsInkiOiIxMiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMjMiLCJ5IjoiNCJ9XX0="],
	['TF','Ghost Town', "eyJtb25zdGVycyI6W10sImhlcm8xIjp7InRpdGxlIjoiIn0sImhlcm8yIjp7InRpdGxlIjoiIn0sImhlcm8zIjp7InRpdGxlIjoiIn0sImhlcm80Ijp7InRpdGxlIjoiIn0sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIxIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjciLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI0NSIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjExIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiIxNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxNiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiOSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTMiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjE0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiMTUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI0MyIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzAiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjgiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIyNyIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjYiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI2Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIxMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOltdLCJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMTQiLCJ5IjoiOSJ9XSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiNiIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNSIsInkiOiIxNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiIxNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjkiLCJ5IjoiMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE1IiwieSI6IjQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI1IiwieSI6IjcifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI5IiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI5IiwieSI6IjExIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTQiLCJ5IjoiMTMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiIxOCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiMTUifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmVmdWRkbGUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCbGluZGluZyBTcGVlZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRpcnR5IEZpZ2h0aW5nIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRmx1cnJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiR3JlYXNlIFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNZW50YWwgRXJyb3IifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNaW1pYyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik92ZXJ3aGVsbSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlJlZmxlY3RpdmUgV2FyZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlNpZ24gT2YgV2Vha25lc3MifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJVbmNvbnRyb2xsZWQgUG93ZXIifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCbG9vZCBSYWdlIn1dfSwibGlldXRlbmFudHMiOltdLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiJLaWxsIFRyaXN0YXluZSIsIm92ZWxvcmRWaWN0b3J5IjoiQ29sbGVjdCA0IGNpdGl6ZW5zIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiQXQgdGhlIHN0YXJ0IG9mIGVhY2ggb3ZlcmxvcmQgdHVybjogMSBjaGFuZ2VsaW5nIG9uIGV4aXQuIn0sIm1vbnN0ZXJUcmFpdHMiOnt9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifSwicGxvdCI6eyJ0aXRsZSI6IlRhbmdsZWQgV2ViIiwiY2FyZHMiOltbIkVtYnJhY2UgRGFya25lc3MiLGZhbHNlLGZhbHNlXSxbIkVudGFuZ2xpbmcgV2VhdmUiLGZhbHNlLGZhbHNlXSxbIkZlcmFsIEluc3RpbmN0cyIsZmFsc2UsZmFsc2VdLFsiSGlkZGVuIFByZWRhdG9yIixmYWxzZSxmYWxzZV0sWyJOYXR1cmFsIENhbW91ZmxhZ2UiLHRydWUsZmFsc2VdLFsiU2F2YWdlIEV4cGxvaXRhdGlvbiIsZmFsc2UsZmFsc2VdLFsiU29saXRhcnkgUHJleSIsZmFsc2UsZmFsc2VdLFsiU3VtbW9uIC0gUXVlZW4gQXJpYWQiLGZhbHNlLGZhbHNlXSxbIlVuc2FmZSBQYXNzYWdlIixmYWxzZSxmYWxzZV0sWyJXZWIgT2YgRGVjZXB0aW9uIixmYWxzZSxmYWxzZV1dLCJudW1iZXIiOiIwIn19"],
	['TF','Food For Worms', "eyJtb25zdGVycyI6W10sImhlcm8xIjp7InRpdGxlIjoiIn0sImhlcm8yIjp7InRpdGxlIjoiIn0sImhlcm8zIjp7InRpdGxlIjoiIn0sImhlcm80Ijp7InRpdGxlIjoiIn0sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjQ4Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiI1IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTIiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjAiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJBIiwieCI6IjExIiwieSI6IjEiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjMiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI5IiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjQ5Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjEwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNDMiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjIwIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxMiIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W10sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTEiLCJ5IjoiMTMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjMiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiMCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiOCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiOSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjYiLCJ5IjoiOCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjYiLCJ5IjoiOSJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCZWZ1ZGRsZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsaW5kaW5nIFNwZWVkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGlydHkgRmlnaHRpbmcifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJGbHVycnkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJHcmVhc2UgVHJhcCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1lbnRhbCBFcnJvciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1pbWljIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiT3ZlcndoZWxtIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUmVmbGVjdGl2ZSBXYXJkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiU2lnbiBPZiBXZWFrbmVzcyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlVuY29udHJvbGxlZCBQb3dlciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgU2lsaG91ZXR0ZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlBvc3Nlc3NpdmUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJSZXN0bGVzcyBTcGlyaXQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJUaWVzIFRoYXQgQmluZCJ9XX0sImxpZXV0ZW5hbnRzIjpbeyJ0aXRsZSI6IkJvbGdvcmV0aCIsIngiOiIyIiwieSI6IjkiLCJocCI6IjE4IiwiY29uZGl0aW9ucyI6e30sImhhc0JhY2siOnRydWUsInZlcnRpY2FsIjpmYWxzZSwicmVsaWNzIjpbXSwic2tpbGxzIjpbXX1dLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiJLaWxsIFRyaXN0YXluZSIsIm92ZWxvcmRWaWN0b3J5IjoiQ29sbGVjdCA0IGNpdGl6ZW5zIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiQXQgdGhlIHN0YXJ0IG9mIGVhY2ggb3ZlcmxvcmQgdHVybjogMSBjaGFuZ2VsaW5nIG9uIGV4aXQuIn0sIm1vbnN0ZXJUcmFpdHMiOnsiY2l2aWxpemVkIjoiY2l2aWxpemVkIiwiY3Vyc2VkIjoiY3Vyc2VkIiwibW91bnRhaW4iOiJtb3VudGFpbiIsIndpbGRlcm5lc3MiOiJ3aWxkZXJuZXNzIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9LCJwbG90Ijp7InRpdGxlIjoiVGFuZ2xlZCBXZWIiLCJjYXJkcyI6W1siRW1icmFjZSBEYXJrbmVzcyIsZmFsc2UsZmFsc2VdLFsiRW50YW5nbGluZyBXZWF2ZSIsZmFsc2UsZmFsc2VdLFsiRmVyYWwgSW5zdGluY3RzIixmYWxzZSxmYWxzZV0sWyJIaWRkZW4gUHJlZGF0b3IiLHRydWUsZmFsc2VdLFsiTmF0dXJhbCBDYW1vdWZsYWdlIix0cnVlLGZhbHNlXSxbIlNhdmFnZSBFeHBsb2l0YXRpb24iLGZhbHNlLGZhbHNlXSxbIlNvbGl0YXJ5IFByZXkiLGZhbHNlLGZhbHNlXSxbIlN1bW1vbiAtIFF1ZWVuIEFyaWFkIixmYWxzZSxmYWxzZV0sWyJVbnNhZmUgUGFzc2FnZSIsZmFsc2UsZmFsc2VdLFsiV2ViIE9mIERlY2VwdGlvbiIsdHJ1ZSxmYWxzZV1dLCJudW1iZXIiOiIyIn19"],
	['TF','Three Heads, One Mind', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJIYXJweSIsIm1hc3RlciI6dHJ1ZSwieCI6IjEyIiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMTMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkhhcnB5IiwibWFzdGVyIjpmYWxzZSwieCI6IjE1IiwieSI6IjEwIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkhhcnB5IiwibWFzdGVyIjpmYWxzZSwieCI6IjE1IiwieSI6IjEwIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkhhcnB5IiwibWFzdGVyIjpmYWxzZSwieCI6IjE1IiwieSI6IjEwIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkV0dGluIiwibWFzdGVyIjp0cnVlLCJ4IjoiMTQiLCJ5IjoiNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIxNiIsImNvbmRpdGlvbnMiOnt9fV0sImhlcm8xIjp7InRpdGxlIjoiT25lIEZpc3QiLCJ4IjoiOSIsInkiOiIxMiIsImhwIjoiMTIiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkJlYXN0bWFzdGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIlByZWRhdG9yIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJDaGFuZ2luZyBTa2lucyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2hhZG93IEh1bnRlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2F2YWdlcnkiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRmVyYWwgRnJlbnp5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTdXJ2aXZhbGlzdCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTdGFsa2VyIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJlc3RpYWwgUmFnZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQm91bmQgYnkgdGhlIEh1bnQiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiV29sZiIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiQm9uZSBCbGFkZSIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiV29ya21hbnMgUmluZyIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm8yIjp7InRpdGxlIjoiQXJ2ZWwgV29ybGR3YWxrZXIiLCJ4IjoiOSIsInkiOiIxMyIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNiIsImNsYXNzTmFtZSI6IlNoYWRvdyBXYWxrZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siRGFyayBTZXJ2YW50IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEYXJrIFNoaWZ0Iix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkVuZGxlc3MgVm9pZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRmFpdGhmdWwgRnJpZW5kIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk90aGVyd29ybGRseSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2hhZG93IFB1cHBldCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2hhZG93IFNvdWwiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2hhZG93IFN0ZXAiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU291bCBCb3VuZCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJUaHJvdWdoIFRoZSBWZWlsIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiQ3Jvc3Nib3ciLCJoYW5kMiI6IiIsImFybW9yIjoiQmFyb25zIENsb2FrIiwiaXRlbSI6IlVuZHlpbmcgU2t1bGwiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMyI6eyJ0aXRsZSI6IkNoYWxsYXJhIiwieCI6IjEwIiwieSI6IjEyIiwiaHAiOiIxMCIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiUnVuZW1hc3RlciIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJCcmVhayBUaGUgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRXhwbG9kaW5nIFJ1bmUiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR2hvc3QgQXJtb3IiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkluc2NyaWJlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIklyb24gV2lsbCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJRdWljayBDYXN0aW5nIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5lIE1hc3RlcnkiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgS25vd2xlZGdlIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmljIFNvcmNlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJBcmNhbmUgQm9sdCIsImhhbmQyIjoiIiwiYXJtb3IiOiJIZWF2eSBDbG9hayIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvNCI6eyJ0aXRsZSI6IlJvZ2FubmEgdGhlIFNoYWRlIiwieCI6IjEwIiwieSI6IjEzIiwiaHAiOiIxMSIsInN0YW1pbmEiOiI0IiwiY2xhc3NOYW1lIjoiTW9uayIsImh5YnJpZENsYXNzTmFtZSI6IlByb3BoZXQiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siR3JlYXRlciBjYWxsaW5nIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIklubmVyIEJhbGFuY2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT3BlbmhhbmRlZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiVm93IE9mIEZyZWVkb20iLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkFsbCBTZWVpbmciLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQmF0dGxlIFZpc2lvbiIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGb2N1c2VkIEluc2lnaHRzIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGb3Jld2FybmluZyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR3JpbSBGYXRlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJMaWZlbGluZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT21uaXNjaWVuY2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlNvb3RoaW5nIEluc2lnaHQiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiVmljdG9yeSBGb3JldG9sZCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiQm93IE9mIEJvbmUiLCJoYW5kMiI6IiIsImFybW9yIjoiTGVhdGhlciBBcm1vciIsIml0ZW0iOiJTYWdlcyBUb21lIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwidGlsZXMiOlt7InRpdGxlIjoiNDYiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI0OSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNDQiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE3IiwieSI6IjMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI0NyIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjI5Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI0MyIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMTAiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI0NSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQSIsIngiOiI5IiwieSI6IjEyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE0IiwieSI6IjIiLCJvcGVuZWQiOmZhbHNlfV0sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbeyJ0aXRsZSI6IldvbGYiLCJ4IjoiMTIiLCJ5IjoiMSIsImhwIjoiMyIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiU2NvdXJnZSIsIngiOiIxMyIsInkiOiIxIiwiaHAiOiIiLCJjb25kaXRpb25zIjp7fX1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMTUifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxIiwieSI6IjcifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE3IiwieSI6IjEwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiMSJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJDcml0aWNhbCBCbG93In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFyayBDaGFybSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgRm9ydHVuZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgTWlnaHQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXNoIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRnJlbnp5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUGl0IFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJQb2lzb24gRGFydCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlRyaXB3aXJlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiV29yZCBPZiBNaXNlcnkifV19LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sInBsb3QiOnsidGl0bGUiOiJUYW5nbGVkIFdlYiIsImNhcmRzIjpbWyJFbWJyYWNlIERhcmtuZXNzIixmYWxzZSxmYWxzZV0sWyJFbnRhbmdsaW5nIFdlYXZlIixmYWxzZSxmYWxzZV0sWyJGZXJhbCBJbnN0aW5jcyIsZmFsc2UsZmFsc2VdLFsiSGlkZGVuIFByZWRhdG9yIix0cnVlLGZhbHNlXSxbIk5hdHVyYWwgQ2Ftb3VmbGFnZSIsdHJ1ZSxmYWxzZV0sWyJTYXZhZ2UgRXhwbG9pdGF0aW9uIixmYWxzZSxmYWxzZV0sWyJTb2xpdGFyeSBQcmV5IixmYWxzZSxmYWxzZV0sWyJTdW1tb24gUXVlZW4gQXJpYWQiLGZhbHNlLGZhbHNlXSxbIlVuc2FmZSBQYXNzYWdlIixmYWxzZSxmYWxzZV0sWyJXZWIgT2YgRGVjZXB0aW9uIix0cnVlLGZhbHNlXV0sIm51bWJlciI6IjMifSwibW9uc3RlclRyYWl0cyI6eyJjYXZlIjoiY2F2ZSJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsImNvbnZlcnNpb25raXQiOiJjb252ZXJzaW9ua2l0IiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9fQ=="],
	['SoN','A Demonstration', "eyJ4cyI6W3sidGl0bGUiOiIyeDIiLCJ4IjoiNSIsInkiOiI0In1dLCJ0aWxlcyI6W3sidGl0bGUiOiI1MCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2MSIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNjYiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1OCIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjciLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI2OCIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiMTEiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU5Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiNyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQiIsIngiOiIxNyIsInkiOiI5IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNCIsInkiOiIzIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiI3IiwieSI6IjMifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjQiLCJ5IjoiNiJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNyIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjYifV19"],
	['SoN','Prey', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBleGl0Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1NSIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGNvbm5lY3Rpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2OCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjY2Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNjAiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIxMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNjciLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjEzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBjb25uZWN0aW9uIDF4MiIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNTciLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNjQiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNTgiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGNvbm5lY3Rpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiNyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjU0Iiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIxNSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTMiLCJhbmdsZSI6IiJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjEyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiIxMiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOCIsInkiOiI4In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiI2IiwieSI6IjgifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjEyIiwieSI6IjQifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjQiLCJ5IjoiMTQifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjE2IiwieSI6IjExIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNSIsInkiOiIxIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNiIsInkiOiIxIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNCIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiMTUifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxOSIsInkiOiI5In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTkiLCJ5IjoiMTAifV19"],
	['SoN','The Incident', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXQgU3dhcm0iLCJtYXN0ZXIiOnRydWUsIngiOiIyMSIsInkiOiIzIiwidmVydGljYWwiOnRydWUsImhwIjoiNSIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiUmF0IFN3YXJtIiwibWFzdGVyIjpmYWxzZSwieCI6IjIxIiwieSI6IjMiLCJ2ZXJ0aWNhbCI6dHJ1ZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJSYXQgU3dhcm0iLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMjEiLCJ5IjoiMyIsInZlcnRpY2FsIjp0cnVlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlJhdCBTd2FybSIsIm1hc3RlciI6ZmFsc2UsIngiOiIyMSIsInkiOiIzIiwidmVydGljYWwiOnRydWUsImhwIjoiNCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiQ2F2ZSBTcGlkZXIiLCJtYXN0ZXIiOnRydWUsIngiOiIxNyIsInkiOiIxMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI1IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJDYXZlIFNwaWRlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNyIsInkiOiIxMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJDYXZlIFNwaWRlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNyIsInkiOiIxMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJDYXZlIFNwaWRlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNyIsInkiOiIxMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJDYXZlIFNwaWRlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNyIsInkiOiIxMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiIifSwiaGVybzIiOnsidGl0bGUiOiIifSwiaGVybzMiOnsidGl0bGUiOiIifSwiaGVybzQiOnsidGl0bGUiOiIifSwidGlsZXMiOlt7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI2Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIxIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkNvYmJsZS1zdG9uZSBFeHRlbnNpb24gMngyIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjEzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUzIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIxNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIxOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjYiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjkiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMTQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEwIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxNCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjE4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiIxOCIsInkiOiIxOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU0Iiwic2lkZSI6IkEiLCJ4IjoiMTYiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjIwIiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNiIsInkiOiIxIiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjE0IiwieSI6IjEiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiMTEiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjMiLCJ5IjoiMTIiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiMTciLCJvcGVuZWQiOmZhbHNlfV0sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbeyJ0aXRsZSI6IlZpbGxhZ2VyIEZlbWFsZSIsIngiOiI5IiwieSI6IjkiLCJocCI6IjEyIiwiY29uZGl0aW9ucyI6e319XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMyIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMyIsInkiOiIxNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiIxOCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjMiLCJ5IjoiNyJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiNSIsInkiOiI3In0seyJ0aXRsZSI6IlJlZCIsIngiOiI4IiwieSI6IjgifSx7InRpdGxlIjoiR3JlZW4iLCJ4IjoiMTEiLCJ5IjoiNCJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiIxMSIsInkiOiI1In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiMiJ9LHsidGl0bGUiOiJXaGl0ZSIsIngiOiIxNiIsInkiOiI5In0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjE2IiwieSI6IjEwIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMSIsInkiOiIxMyJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMTMiLCJ5IjoiMTMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI4IiwieSI6IjE2In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiMTYifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmVmdWRkbGUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCbGluZGluZyBTcGVlZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRpcnR5IEZpZ2h0aW5nIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRmx1cnJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiR3JlYXNlIFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNZW50YWwgRXJyb3IifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNaW1pYyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik92ZXJ3aGVsbSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlJlZmxlY3RpdmUgV2FyZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlNpZ24gT2YgV2Vha25lc3MifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJVbmNvbnRyb2xsZWQgUG93ZXIifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCbG9vZCBSYWdlIn1dfSwibGlldXRlbmFudHMiOltdLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiJLaWxsIFRyaXN0YXluZSIsIm92ZWxvcmRWaWN0b3J5IjoiQ29sbGVjdCA0IGNpdGl6ZW5zIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiQXQgdGhlIHN0YXJ0IG9mIGVhY2ggb3ZlcmxvcmQgdHVybjogMSBjaGFuZ2VsaW5nIG9uIGV4aXQuIn0sIm1vbnN0ZXJUcmFpdHMiOnsiYnVpbGRpbmciOiJidWlsZGluZyIsImNhdmUiOiJjYXZlIiwiY29sZCI6ImNvbGQifSwiZXhwYW5zaW9ucyI6eyJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiOiJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiLCJib25kc29mdGhld2lsZCI6ImJvbmRzb2Z0aGV3aWxkIiwiY3Jvd25vZmRlc3RpbnkiOiJjcm93bm9mZGVzdGlueSIsImNydXNhZGVvZnRoZWZvcmdvdHRlbiI6ImNydXNhZGVvZnRoZWZvcmdvdHRlbiIsImd1YXJkaWFuc29mZGVlcGhhbGwiOiJndWFyZGlhbnNvZmRlZXBoYWxsIiwibGFieXJpbnRob2ZydWluIjoibGFieXJpbnRob2ZydWluIiwibGFpcm9mdGhld3lybSI6ImxhaXJvZnRoZXd5cm0iLCJtYW5vcm9mcmF2ZW5zIjoibWFub3JvZnJhdmVucyIsIm9hdGhvZnRoZW91dGNhc3QiOiJvYXRob2Z0aGVvdXRjYXN0Iiwic2hhcmRzb2ZldmVyZGFyayI6InNoYXJkc29mZXZlcmRhcmsiLCJzaGFkb3dvZm5hcmVraGFsbCI6InNoYWRvd29mbmFyZWtoYWxsIiwic3Rld2FyZHNvZnRoZXNlY3JldCI6InN0ZXdhcmRzb2Z0aGVzZWNyZXQiLCJ0aGV0cm9sbGZlbnMiOiJ0aGV0cm9sbGZlbnMiLCJ0cmVhdHlvZmNoYW1waW9ucyI6InRyZWF0eW9mY2hhbXBpb25zIiwidmlzaW9uc29mZGF3biI6InZpc2lvbnNvZmRhd24iLCJtaXN0c29mYmlsZWhhbGwiOiJtaXN0c29mYmlsZWhhbGwiLCJjaGFpbnN0aGF0cnVzdCI6ImNoYWluc3RoYXRydXN0In0sInBsb3QiOnsidGl0bGUiOiJVbnN0YWJsZSBGb3JjZXMiLCJjYXJkcyI6W1siRGVzY2VuZCBUbyBNYWRkbmVzcyIsZmFsc2UsZmFsc2VdLFsiRXhwbG9zaXZlIEZhbGwiLHRydWUsZmFsc2VdLFsiTG92ZSBPZiBDaGFvcyIsZmFsc2UsZmFsc2VdLFsiTW9ydGFsIENvaWwiLGZhbHNlLGZhbHNlXSxbIk9uc2xhdWdodCIsZmFsc2UsZmFsc2VdLFsiUGFyaWFoIixmYWxzZSxmYWxzZV0sWyJQb3dlciBBbmQgU2FjcmlmaWNlIix0cnVlLGZhbHNlXSxbIlNvdWwgRW5zbmFyZSIsZmFsc2UsZmFsc2VdLFsiU3VtbW9uIC0gVHJpc3RheW5lIixmYWxzZSxmYWxzZV0sWyJXaWxkIEVuZXJneSIsdHJ1ZSxmYWxzZV1dLCJudW1iZXIiOiIxIn19"],
	['SoN','The Rat-Thing King - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIxIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjAiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiI0IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTMiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI3IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNCIsInkiOiIwIn0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjUiLCJ5IjoiNCJ9LHsidGl0bGUiOiJXaGl0ZSIsIngiOiIxMiIsInkiOiIzIn0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjEyIiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiI4In1dfQ=="],
	['SoN','The Rat-Thing King - E2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjEiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1MiIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1MyIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIwIiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiMSJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiIxIn0seyJ0aXRsZSI6IlBvcnRjdWxsaXMiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjgiLCJ5IjoiNiJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJSZWQiLCJ4IjoiMTAiLCJ5IjoiNCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMTAiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMiIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiIwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNSIsInkiOiI1In1dfQ=="],
	['SoN','Respected Citizen - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJab21iaWUiLCJtYXN0ZXIiOnRydWUsIngiOiI1IiwieSI6IjIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiWm9tYmllIiwibWFzdGVyIjpmYWxzZSwieCI6IjUiLCJ5IjoiMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJab21iaWUiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNSIsInkiOiIyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlpvbWJpZSIsIm1hc3RlciI6ZmFsc2UsIngiOiI1IiwieSI6IjIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiWm9tYmllIiwibWFzdGVyIjpmYWxzZSwieCI6IjUiLCJ5IjoiMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJZbmZlcm5hZWwgSHVsayIsIm1hc3RlciI6dHJ1ZSwieCI6IjE4IiwieSI6IjMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiOSIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiWW5mZXJuYWVsIEh1bGsiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTgiLCJ5IjoiMyIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI4IiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiIifSwiaGVybzIiOnsidGl0bGUiOiIifSwiaGVybzMiOnsidGl0bGUiOiIifSwiaGVybzQiOnsidGl0bGUiOiIifSwidGlsZXMiOlt7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjIiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjU4Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNjQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNjgiLCJzaWRlIjoiQSIsIngiOiIxOSIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTkiLCJzaWRlIjoiQSIsIngiOiIxNyIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyMiIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNjEiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI0IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2MyIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiI4IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNjUiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiI4IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMjIiLCJ5IjoiNSJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMjIiLCJ5IjoiNCJ9XSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbeyJ0aXRsZSI6IlZpbGxhZ2VyIE1hbGUiLCJ4IjoiOCIsInkiOiIxIiwiaHAiOiIxMCIsImNvbmRpdGlvbnMiOnt9fV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTUiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMjAiLCJ5IjoiNiJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCZWZ1ZGRsZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsaW5kaW5nIFNwZWVkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGlydHkgRmlnaHRpbmcifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJGbHVycnkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJHcmVhc2UgVHJhcCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1lbnRhbCBFcnJvciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1pbWljIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiT3ZlcndoZWxtIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUmVmbGVjdGl2ZSBXYXJkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiU2lnbiBPZiBXZWFrbmVzcyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlVuY29udHJvbGxlZCBQb3dlciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsb29kIFJhZ2UifV19LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IktpbGwgVHJpc3RheW5lIiwib3ZlbG9yZFZpY3RvcnkiOiJDb2xsZWN0IDQgY2l0aXplbnMiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiJBdCB0aGUgc3RhcnQgb2YgZWFjaCBvdmVybG9yZCB0dXJuOiAxIGNoYW5nZWxpbmcgb24gZXhpdC4ifSwibW9uc3RlclRyYWl0cyI6eyJidWlsZGluZyI6ImJ1aWxkaW5nIiwiaG90IjoiaG90In0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9LCJwbG90Ijp7InRpdGxlIjoiVW5zdGFibGUgRm9yY2VzIiwiY2FyZHMiOltbIkRlc2NlbmQgVG8gTWFkZG5lc3MiLGZhbHNlLGZhbHNlXSxbIkV4cGxvc2l2ZSBGYWxsIix0cnVlLGZhbHNlXSxbIkxvdmUgT2YgQ2hhb3MiLGZhbHNlLGZhbHNlXSxbIk1vcnRhbCBDb2lsIixmYWxzZSxmYWxzZV0sWyJPbnNsYXVnaHQiLGZhbHNlLGZhbHNlXSxbIlBhcmlhaCIsZmFsc2UsZmFsc2VdLFsiUG93ZXIgQW5kIFNhY3JpZmljZSIsdHJ1ZSx0cnVlXSxbIlNvdWwgRW5zbmFyZSIsZmFsc2UsZmFsc2VdLFsiU3VtbW9uIC0gVHJpc3RheW5lIixmYWxzZSxmYWxzZV0sWyJXaWxkIEVuZXJneSIsdHJ1ZSx0cnVlXV0sIm51bWJlciI6IjEifX0="],
	['SoN','Respected Citizen - E2', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJZbmZlcm5hZWwgSHVsayIsIm1hc3RlciI6dHJ1ZSwieCI6IjExIiwieSI6IjciLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMjEiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IiJ9LCJoZXJvMiI6eyJ0aXRsZSI6IiJ9LCJoZXJvMyI6eyJ0aXRsZSI6IiJ9LCJoZXJvNCI6eyJ0aXRsZSI6IiJ9LCJ0aWxlcyI6W3sidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNTMiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjMiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjU1Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI1IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNTEiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjEiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1OCIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2OCIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjEwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI2NSIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjUiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI2NiIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjYiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W3sidGl0bGUiOiJWaWxsYWdlciBNYWxlIiwieCI6IjMiLCJ5IjoiMyIsImhwIjoiMTUiLCJjb25kaXRpb25zIjp7fX1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMyIsInkiOiI1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjEwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjYifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI3IiwieSI6IjEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI3IiwieSI6IjMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMSIsInkiOiIxIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTMiLCJ5IjoiMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEzIiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI4IiwieSI6IjkifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmVmdWRkbGUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCbGluZGluZyBTcGVlZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRpcnR5IEZpZ2h0aW5nIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRmx1cnJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiR3JlYXNlIFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNZW50YWwgRXJyb3IifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJNaW1pYyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik92ZXJ3aGVsbSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlJlZmxlY3RpdmUgV2FyZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlNpZ24gT2YgV2Vha25lc3MifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJVbmNvbnRyb2xsZWQgUG93ZXIifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCbG9vZCBSYWdlIn1dfSwibGlldXRlbmFudHMiOltdLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiJLaWxsIFRyaXN0YXluZSIsIm92ZWxvcmRWaWN0b3J5IjoiQ29sbGVjdCA0IGNpdGl6ZW5zIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiQXQgdGhlIHN0YXJ0IG9mIGVhY2ggb3ZlcmxvcmQgdHVybjogMSBjaGFuZ2VsaW5nIG9uIGV4aXQuIn0sIm1vbnN0ZXJUcmFpdHMiOnsiYnVpbGRpbmciOiJidWlsZGluZyIsImhvdCI6ImhvdCJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifSwicGxvdCI6eyJ0aXRsZSI6IlVuc3RhYmxlIEZvcmNlcyIsImNhcmRzIjpbWyJEZXNjZW5kIFRvIE1hZGRuZXNzIixmYWxzZSxmYWxzZV0sWyJFeHBsb3NpdmUgRmFsbCIsdHJ1ZSxmYWxzZV0sWyJMb3ZlIE9mIENoYW9zIixmYWxzZSxmYWxzZV0sWyJNb3J0YWwgQ29pbCIsZmFsc2UsZmFsc2VdLFsiT25zbGF1Z2h0IixmYWxzZSxmYWxzZV0sWyJQYXJpYWgiLGZhbHNlLGZhbHNlXSxbIlBvd2VyIEFuZCBTYWNyaWZpY2UiLHRydWUsdHJ1ZV0sWyJTb3VsIEVuc25hcmUiLHRydWUsZmFsc2VdLFsiU3VtbW9uIC0gVHJpc3RheW5lIixmYWxzZSxmYWxzZV0sWyJXaWxkIEVuZXJneSIsdHJ1ZSxmYWxzZV1dLCJudW1iZXIiOiIyIn19"],
	['SoN','Price of Power - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjYyIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1OSIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1NCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1NyIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI2MSIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjU4Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiI5IiwieSI6IjEwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNjYiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXhpdCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjEyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiIxMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiNSJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMiIsInkiOiI5In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjgiLCJ5IjoiNiJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiOSJ9LHsidGl0bGUiOiJXaGl0ZSIsIngiOiIxIiwieSI6IjQifSx7InRpdGxlIjoiV2hpdGUiLCJ4IjoiMSIsInkiOiI1In0seyJ0aXRsZSI6IlJlZCIsIngiOiIyIiwieSI6IjQifSx7InRpdGxlIjoiUmVkIiwieCI6IjIiLCJ5IjoiNSJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMyIsInkiOiI0In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIzIiwieSI6IjUifSx7InRpdGxlIjoiR3JlZW4iLCJ4IjoiNCIsInkiOiI0In0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjQiLCJ5IjoiNSJ9XX0="],
	['SoN','Price of Power - E2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjU3Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXhpdCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU5Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMTMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI2MiIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiVW5rbm93biIsIngiOiIzIiwieSI6IjAiLCJocCI6IjIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiIxMCIsImhwIjoiMiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjQiLCJ5IjoiMTQiLCJocCI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjMiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiI0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI4IiwieSI6IjE0In1dfQ=="],
	['SoN','Without Mercy', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjgiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1MiIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjE1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIxNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjE4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiI5IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI2IiwieSI6IjQifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNCIsInkiOiI1In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjMiLCJ5IjoiMTAifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiOSJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNiIsInkiOiIxMyJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNiIsInkiOiIxNiJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTciLCJ5IjoiMTYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMTcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNiIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjYiLCJ5IjoiMTcifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI2IiwieSI6IjIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiIyMCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjgiLCJ5IjoiMjAifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI5IiwieSI6IjIwIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMSIsInkiOiIxOCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMTEiLCJ5IjoiMTkifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjE0IiwieSI6IjE4In0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjkiLCJ5IjoiMTUifV19"],
	['SoN','Local Politics - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJDaGFuZ2VsaW5nIiwibWFzdGVyIjp0cnVlLCJ4IjoiNCIsInkiOiIxNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI2IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJDaGFuZ2VsaW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiMTUiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiQ2hhbmdlbGluZyIsIm1hc3RlciI6ZmFsc2UsIngiOiI0IiwieSI6IjE1IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkNoYW5nZWxpbmciLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNCIsInkiOiIxNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJFdHRpbiIsIm1hc3RlciI6dHJ1ZSwieCI6IjIyIiwieSI6IjAiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiOCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiRXR0aW4iLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMjIiLCJ5IjoiMSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI1IiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiIifSwiaGVybzIiOnsidGl0bGUiOiIifSwiaGVybzMiOnsidGl0bGUiOiIifSwiaGVybzQiOnsidGl0bGUiOiIifSwidGlsZXMiOlt7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI3Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNTIiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMTUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMTgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjExIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjEzIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTkiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIxNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTkiLCJ5IjoiMTUiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjMiLCJ5IjoiNyIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOCIsInkiOiIxMSIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJQb3J0Y3VsbGlzIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxMyIsIm9wZW5lZCI6ZmFsc2V9XSwieHMiOltdLCJhbGxpZXMiOltdLCJmYW1pbGlhcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMyIsInkiOiIyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIzIiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjciLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiMTgifSx7InRpdGxlIjoiUmVkIiwieCI6IjEyIiwieSI6IjExIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiI3IiwieSI6IjgifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjciLCJ5IjoiOSJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCZWZ1ZGRsZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsaW5kaW5nIFNwZWVkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGlydHkgRmlnaHRpbmcifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJGbHVycnkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJHcmVhc2UgVHJhcCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1lbnRhbCBFcnJvciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1pbWljIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiT3ZlcndoZWxtIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUmVmbGVjdGl2ZSBXYXJkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiU2lnbiBPZiBXZWFrbmVzcyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlVuY29udHJvbGxlZCBQb3dlciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsb29kIFJhZ2UifV19LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IktpbGwgVHJpc3RheW5lIiwib3ZlbG9yZFZpY3RvcnkiOiJDb2xsZWN0IDQgY2l0aXplbnMiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiJBdCB0aGUgc3RhcnQgb2YgZWFjaCBvdmVybG9yZCB0dXJuOiAxIGNoYW5nZWxpbmcgb24gZXhpdC4ifSwibW9uc3RlclRyYWl0cyI6eyJ3YXRlciI6IndhdGVyIiwid2lsZGVybmVzcyI6IndpbGRlcm5lc3MifSwiZXhwYW5zaW9ucyI6eyJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiOiJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiLCJib25kc29mdGhld2lsZCI6ImJvbmRzb2Z0aGV3aWxkIiwiY3Jvd25vZmRlc3RpbnkiOiJjcm93bm9mZGVzdGlueSIsImNydXNhZGVvZnRoZWZvcmdvdHRlbiI6ImNydXNhZGVvZnRoZWZvcmdvdHRlbiIsImd1YXJkaWFuc29mZGVlcGhhbGwiOiJndWFyZGlhbnNvZmRlZXBoYWxsIiwibGFieXJpbnRob2ZydWluIjoibGFieXJpbnRob2ZydWluIiwibGFpcm9mdGhld3lybSI6ImxhaXJvZnRoZXd5cm0iLCJtYW5vcm9mcmF2ZW5zIjoibWFub3JvZnJhdmVucyIsIm9hdGhvZnRoZW91dGNhc3QiOiJvYXRob2Z0aGVvdXRjYXN0Iiwic2hhcmRzb2ZldmVyZGFyayI6InNoYXJkc29mZXZlcmRhcmsiLCJzaGFkb3dvZm5hcmVraGFsbCI6InNoYWRvd29mbmFyZWtoYWxsIiwic3Rld2FyZHNvZnRoZXNlY3JldCI6InN0ZXdhcmRzb2Z0aGVzZWNyZXQiLCJ0aGV0cm9sbGZlbnMiOiJ0aGV0cm9sbGZlbnMiLCJ0cmVhdHlvZmNoYW1waW9ucyI6InRyZWF0eW9mY2hhbXBpb25zIiwidmlzaW9uc29mZGF3biI6InZpc2lvbnNvZmRhd24iLCJtaXN0c29mYmlsZWhhbGwiOiJtaXN0c29mYmlsZWhhbGwiLCJjaGFpbnN0aGF0cnVzdCI6ImNoYWluc3RoYXRydXN0In0sInBsb3QiOnsidGl0bGUiOiJVbnN0YWJsZSBGb3JjZXMiLCJjYXJkcyI6W1siRGVzY2VuZCBUbyBNYWRkbmVzcyIsZmFsc2UsZmFsc2VdLFsiRXhwbG9zaXZlIEZhbGwiLHRydWUsdHJ1ZV0sWyJMb3ZlIE9mIENoYW9zIixmYWxzZSxmYWxzZV0sWyJNb3J0YWwgQ29pbCIsZmFsc2UsZmFsc2VdLFsiT25zbGF1Z2h0IixmYWxzZSxmYWxzZV0sWyJQYXJpYWgiLGZhbHNlLGZhbHNlXSxbIlBvd2VyIEFuZCBTYWNyaWZpY2UiLHRydWUsdHJ1ZV0sWyJTb3VsIEVuc25hcmUiLHRydWUsdHJ1ZV0sWyJTdW1tb24gLSBUcmlzdGF5bmUiLGZhbHNlLGZhbHNlXSxbIldpbGQgRW5lcmd5Iix0cnVlLGZhbHNlXV0sIm51bWJlciI6IjIifX0="],
	['SoN','Local Politics - E2', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJDaGFuZ2VsaW5nIiwibWFzdGVyIjp0cnVlLCJ4IjoiIiwieSI6IiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI2IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJDaGFuZ2VsaW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IiIsInkiOiIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiQ2hhbmdlbGluZyIsIm1hc3RlciI6ZmFsc2UsIngiOiIiLCJ5IjoiIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkNoYW5nZWxpbmciLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiIiwieSI6IiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJJcm9uYm91bmQiLCJtYXN0ZXIiOnRydWUsIngiOiIiLCJ5IjoiIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjEwIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJJcm9uYm91bmQiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiIiwieSI6IiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI4IiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiIifSwiaGVybzIiOnsidGl0bGUiOiIifSwiaGVybzMiOnsidGl0bGUiOiIifSwiaGVybzQiOnsidGl0bGUiOiIifSwidGlsZXMiOlt7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjYwIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjYyIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNTEiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1OCIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTUiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjY5Iiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBjb25uZWN0aW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjkiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNTQiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgY29ubmVjdGlvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIxMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIxMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMTYiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjUiLCJ5IjoiMyIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMiIsInkiOiI2Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI4IiwieSI6IjYiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiMTAiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiUG9ydGN1bGxpcyIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE0IiwieSI6IjkiLCJvcGVuZWQiOmZhbHNlfV0sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjgifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjciLCJ5IjoiMTAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE2IiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjMiLCJ5IjoiMTMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI4IiwieSI6IjEyIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiOCIsInkiOiIxMyJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCZWZ1ZGRsZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsaW5kaW5nIFNwZWVkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGlydHkgRmlnaHRpbmcifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJGbHVycnkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJHcmVhc2UgVHJhcCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1lbnRhbCBFcnJvciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1pbWljIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiT3ZlcndoZWxtIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUmVmbGVjdGl2ZSBXYXJkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiU2lnbiBPZiBXZWFrbmVzcyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlVuY29udHJvbGxlZCBQb3dlciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsb29kIFJhZ2UifV19LCJsaWV1dGVuYW50cyI6W3sidGl0bGUiOiJSeWxhbiBPbGxpdmVuIiwieCI6IjE2IiwieSI6IjgiLCJocCI6IjEyIiwiY29uZGl0aW9ucyI6e30sImhhc0JhY2siOmZhbHNlLCJ2ZXJ0aWNhbCI6ZmFsc2UsInJlbGljcyI6W10sInNraWxscyI6W119XSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiS2lsbCBUcmlzdGF5bmUiLCJvdmVsb3JkVmljdG9yeSI6IkNvbGxlY3QgNCBjaXRpemVucyIsImN1cnJlbnRTdGF0dXMiOiIiLCJyZWluZm9yY2VtZW50cyI6IkF0IHRoZSBzdGFydCBvZiBlYWNoIG92ZXJsb3JkIHR1cm46IDEgY2hhbmdlbGluZyBvbiBleGl0LiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjYXZlIjoiY2F2ZSIsImNpdmlsaXplZCI6ImNpdmlsaXplZCIsImNvbGQiOiJjb2xkIiwiY3Vyc2VkIjoiY3Vyc2VkIiwiZGFyayI6ImRhcmsiLCJob3QiOiJob3QiLCJtb3VudGFpbiI6Im1vdW50YWluIiwid2F0ZXIiOiJ3YXRlciIsIndpbGRlcm5lc3MiOiJ3aWxkZXJuZXNzIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9LCJwbG90Ijp7InRpdGxlIjoiVW5zdGFibGUgRm9yY2VzIiwiY2FyZHMiOltbIkRlc2NlbmQgVG8gTWFkZG5lc3MiLGZhbHNlLGZhbHNlXSxbIkV4cGxvc2l2ZSBGYWxsIix0cnVlLGZhbHNlXSxbIkxvdmUgT2YgQ2hhb3MiLGZhbHNlLGZhbHNlXSxbIk1vcnRhbCBDb2lsIixmYWxzZSxmYWxzZV0sWyJPbnNsYXVnaHQiLGZhbHNlLGZhbHNlXSxbIlBhcmlhaCIsZmFsc2UsZmFsc2VdLFsiUG93ZXIgQW5kIFNhY3JpZmljZSIsdHJ1ZSx0cnVlXSxbIlNvdWwgRW5zbmFyZSIsdHJ1ZSxmYWxzZV0sWyJTdW1tb24gLSBUcmlzdGF5bmUiLGZhbHNlLGZhbHNlXSxbIldpbGQgRW5lcmd5Iix0cnVlLGZhbHNlXV0sIm51bWJlciI6IjIifX0="],
	['SoN','Traitors Among Us', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1OCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTciLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNjgiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUxIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjU5Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgY29ubmVjdGlvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUyIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiIxNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMTgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIyNCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJQb3J0Y3VsbGlzIiwidmVydGljYWwiOnRydWUsIngiOiIyIiwieSI6IjYifSx7InRpdGxlIjoiUG9ydGN1bGxpcyIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiOCIsInkiOiI3In0seyJ0aXRsZSI6IlBvcnRjdWxsaXMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI0IiwieSI6IjE1In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyIiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiMTkifSx7InRpdGxlIjoiUmVkIiwieCI6IjYiLCJ5IjoiMSJ9XX0="],
	['SoN','Overdue Demise', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBleGl0Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNjEiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI2NCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgY29ubmVjdGlvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjE3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjEwIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNjMiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1OCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMTMiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIxOSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNTUiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiIxNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiIxNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiIxOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBjb25uZWN0aW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIyMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIyNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiIyNSIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMiIsInkiOiIxMiJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMiIsInkiOiIxNiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiIxOCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjMiLCJ5IjoiNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI5IiwieSI6IjE2In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMiIsInkiOiIxNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjMiLCJ5IjoiMjIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiIyNyJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiI3IiwieSI6IjIwIn0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjciLCJ5IjoiMjEifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjEzIiwieSI6IjIzIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxNCIsInkiOiIyMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTEiLCJ5IjoiMjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjciLCJ5IjoiMjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMTMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEwIiwieSI6IjgifSx7InRpdGxlIjoiV2hpdGUiLCJ4IjoiNyIsInkiOiIyMSJ9XX0="],
	['SoN','Into the Dark - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1NCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJQb3J0YWwgRXh0ZW5zaW9uIDJ4MiIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjYzIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIxMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI2NiIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNjEiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiIwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNjIiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJBIiwieCI6IjIwIiwieSI6IjMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQSIsIngiOiIyNiIsInkiOiIzIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTgiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiI3IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyNiIsInkiOiI4IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMiIsInkiOiI1In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyMSIsInkiOiI2In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjIifSx7InRpdGxlIjoiR3JlZW4iLCJ4IjoiNyIsInkiOiI1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNyIsInkiOiI4In0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjE0IiwieSI6IjEwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiIyIn0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjE4IiwieSI6IjAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE5IiwieSI6IjkifSx7InRpdGxlIjoiR3JlZW4iLCJ4IjoiMjYiLCJ5IjoiOSJ9XX0="],
	['SoN','Into the Dark - E2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBleGl0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjYwIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNTgiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjExIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjYyIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI2MyIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjYiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgY29ubmVjdGlvbiAxeDIiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTMiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MiIsInNpZGUiOiJCIiwieCI6IjE5IiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjAiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjI0IiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjU5Iiwic2lkZSI6IkEiLCJ4IjoiMTkiLCJ5IjoiNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyNCIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjIwIiwieSI6IjEyIiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMTQiLCJ5IjoiNSJ9LHsidGl0bGUiOiJQb3J0Y3VsbGlzIiwidmVydGljYWwiOnRydWUsIngiOiIxOCIsInkiOiI3In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiIxMiIsInkiOiIxMyJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMjQiLCJ5IjoiMyJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiIyMiIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMjAiLCJ5IjoiNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMjQiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTIiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiIxMyJ9XX0="],
	['SoN','Lost - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI2MyIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU1Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNTEiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjYiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjEyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI2NiIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMTMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI2MiIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1NyIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjEyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMTciLCJ5IjoiMTYiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlBvcnRjdWxsaXMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI1IiwieSI6IjExIn0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEyIiwieSI6IjEyIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiIxNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIxNCJ9XX0="],
	['SoN','Lost - E2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjU1Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1MCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1OSIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjE1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUxIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIxNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxMSIsImFuZ2xlIjoiOTAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjEiLCJ5IjoiMiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjExIiwieSI6IjIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI4IiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMyIsInkiOiIxNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMTEifV19"],
	['SoN','The City Falls', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjU0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1NiIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJQb3J0YWwgRXh0ZW5zaW9uIDJ4MiIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiUG9ydGFsIEV4dGVuc2lvbiAyeDIiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNjciLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjYzIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI4IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1OSIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjYwIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiIxMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU4Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiIxMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiMTEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNTciLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxNyIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTUiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiIxMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyMSIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjYyIiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiMTUiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlBvcnRjdWxsaXMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxIiwieSI6IjYifSx7InRpdGxlIjoiUG9ydGN1bGxpcyIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjYiLCJ5IjoiNyJ9LHsidGl0bGUiOiJQb3J0Y3VsbGlzIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMTIiLCJ5IjoiNSJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMiIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjE2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOSIsInkiOiIxMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEiLCJ5IjoiMTAifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI4IiwieSI6IjEzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiNyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE4IiwieSI6IjE2In1dfQ=="],
	['MoR','Spread Your Wings', "eyJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxMCJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxNSJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI2IiwieSI6IjE1In1dLCJ0aWxlcyI6W3sidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjI0IiwieSI6IjIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI3MyIsInNpZGUiOiJBIiwieCI6IjIxIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyMiIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyMSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjcyIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI3NiIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjE1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNzciLCJzaWRlIjoiQSIsIngiOiIxNyIsInkiOiIxNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjE1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMzAiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNzciLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNzAiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI3NSIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiI4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjgiLCJhbmdsZSI6IjE4MCJ9XSwieHMiOltdfQ=="],
	['MoR','Finders and Keepers', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ijc1Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI5Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjkiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ijc0Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjcxIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiI4IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIxNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ijc3Iiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyIiwieSI6IjExIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMiIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI5IiwieSI6IjEyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNiIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjMiLCJ5IjoiOCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjQiLCJ5IjoiMTEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI3IiwieSI6IjEwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiOCIsInkiOiIxMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNCIsInkiOiIyIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTUiLCJ5IjoiNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiI4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiMTMifV19"],
	['MoR','My House, my Rules', "#eyJtb25zdGVycyI6W3sidGl0bGUiOiJXcmFpdGgiLCJtYXN0ZXIiOnRydWUsIngiOiIxMiIsInkiOiIyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjciLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IldyYWl0aCIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMiIsInkiOiIyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IldyYWl0aCIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMiIsInkiOiIyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IiJ9LCJoZXJvMiI6eyJ0aXRsZSI6IiJ9LCJoZXJvMyI6eyJ0aXRsZSI6IiJ9LCJoZXJvNCI6eyJ0aXRsZSI6IiJ9LCJ0aWxlcyI6W3sidGl0bGUiOiI3MCIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxNyIsInkiOiIzIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMiIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNzMiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiI4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI3MSIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiNiIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiNyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjcyIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxNiIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjEwIiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNzciLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjE2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI3NCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI3NyIsInNpZGUiOiJBIiwieCI6IjExIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIxMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE3IiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNiIsInkiOiI2Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjgiLCJ5IjoiOCIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNiIsInkiOiI1Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI2IiwieSI6IjExIiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjYiLCJ5IjoiOSIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI4IiwieSI6IjUiLCJvcGVuZWQiOmZhbHNlfV0sInhzIjpbXSwiYWxsaWVzIjpbeyJ0aXRsZSI6IiIsIngiOiIiLCJ5IjoiIiwiaHAiOiIiLCJjb25kaXRpb25zIjp7fSwic2tpbGxzIjpbXX1dLCJmYW1pbGlhcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiMTAifSx7InRpdGxlIjoiV2hpdGUiLCJ4IjoiMiIsInkiOiIxNCJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiIxNCIsInkiOiI0In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMiIsInkiOiIxNiJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTYiLCJ5IjoiNyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE2IiwieSI6IjExIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTUiLCJ5IjoiMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjQiLCJ5IjoiMTQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiIxOCJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiIyIiwieSI6IjEifSx7InRpdGxlIjoiV2hpdGUiLCJ4IjoiMSIsInkiOiIyIn0seyJ0aXRsZSI6IlJlZCIsIngiOiIzIiwieSI6IjIifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjIiLCJ5IjoiMyJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCZWZ1ZGRsZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsaW5kaW5nIFNwZWVkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGlydHkgRmlnaHRpbmcifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJGbHVycnkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJHcmVhc2UgVHJhcCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1lbnRhbCBFcnJvciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1pbWljIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiT3ZlcndoZWxtIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUmVmbGVjdGl2ZSBXYXJkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiU2lnbiBPZiBXZWFrbmVzcyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlVuY29udHJvbGxlZCBQb3dlciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsb29kIFJhZ2UifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJPdXQgT2YgRGFya25lc3MifV19LCJsaWV1dGVuYW50cyI6W3sidGl0bGUiOiJTa2FybiIsIngiOiI3IiwieSI6IjgiLCJocCI6IjE4IiwiY29uZGl0aW9ucyI6e30sImhhc0JhY2siOnRydWUsInZlcnRpY2FsIjpmYWxzZSwicmVsaWNzIjpbXSwic2tpbGxzIjpbXX1dLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiJLaWxsIFRyaXN0YXluZSIsIm92ZWxvcmRWaWN0b3J5IjoiQ29sbGVjdCA0IGNpdGl6ZW5zIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiQXQgdGhlIHN0YXJ0IG9mIGVhY2ggb3ZlcmxvcmQgdHVybjogMSBjaGFuZ2VsaW5nIG9uIGV4aXQuIn0sIm1vbnN0ZXJUcmFpdHMiOnsiYnVpbGRpbmciOiJidWlsZGluZyIsImN1cnNlZCI6ImN1cnNlZCIsIndhdGVyIjoid2F0ZXIifSwiZXhwYW5zaW9ucyI6eyJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiOiJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiLCJib25kc29mdGhld2lsZCI6ImJvbmRzb2Z0aGV3aWxkIiwiY3Jvd25vZmRlc3RpbnkiOiJjcm93bm9mZGVzdGlueSIsImNydXNhZGVvZnRoZWZvcmdvdHRlbiI6ImNydXNhZGVvZnRoZWZvcmdvdHRlbiIsImd1YXJkaWFuc29mZGVlcGhhbGwiOiJndWFyZGlhbnNvZmRlZXBoYWxsIiwibGFieXJpbnRob2ZydWluIjoibGFieXJpbnRob2ZydWluIiwibGFpcm9mdGhld3lybSI6ImxhaXJvZnRoZXd5cm0iLCJtYW5vcm9mcmF2ZW5zIjoibWFub3JvZnJhdmVucyIsIm9hdGhvZnRoZW91dGNhc3QiOiJvYXRob2Z0aGVvdXRjYXN0Iiwic2hhcmRzb2ZldmVyZGFyayI6InNoYXJkc29mZXZlcmRhcmsiLCJzaGFkb3dvZm5hcmVraGFsbCI6InNoYWRvd29mbmFyZWtoYWxsIiwic3Rld2FyZHNvZnRoZXNlY3JldCI6InN0ZXdhcmRzb2Z0aGVzZWNyZXQiLCJ0aGV0cm9sbGZlbnMiOiJ0aGV0cm9sbGZlbnMiLCJ0cmVhdHlvZmNoYW1waW9ucyI6InRyZWF0eW9mY2hhbXBpb25zIiwidmlzaW9uc29mZGF3biI6InZpc2lvbnNvZmRhd24iLCJtaXN0c29mYmlsZWhhbGwiOiJtaXN0c29mYmlsZWhhbGwiLCJjaGFpbnN0aGF0cnVzdCI6ImNoYWluc3RoYXRydXN0In0sInBsb3QiOnsidGl0bGUiOiJVbnN0YWJsZSBGb3JjZXMiLCJjYXJkcyI6W1siRGVzY2VuZCBUbyBNYWRkbmVzcyIsZmFsc2UsZmFsc2VdLFsiRXhwbG9zaXZlIEZhbGwiLHRydWUsZmFsc2VdLFsiTG92ZSBPZiBDaGFvcyIsZmFsc2UsZmFsc2VdLFsiTW9ydGFsIENvaWwiLGZhbHNlLGZhbHNlXSxbIk9uc2xhdWdodCIsZmFsc2UsZmFsc2VdLFsiUGFyaWFoIixmYWxzZSxmYWxzZV0sWyJQb3dlciBBbmQgU2FjcmlmaWNlIix0cnVlLGZhbHNlXSxbIlNvdWwgRW5zbmFyZSIsdHJ1ZSxmYWxzZV0sWyJTdW1tb24gLSBUcmlzdGF5bmUiLGZhbHNlLGZhbHNlXSxbIldpbGQgRW5lcmd5Iix0cnVlLGZhbHNlXV0sIm51bWJlciI6IjcifX0="],
	['HoB','Acolyte of Saradyn', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjUiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI3IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMTIiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjEzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMjEiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxNCIsImFuZ2xlIjoiIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjEwIn1dfQ=="],
	['HoB','Rellegars Rest - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiMiIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMiIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMiIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMiIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMiIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IiJ9LCJoZXJvMiI6eyJ0aXRsZSI6IiJ9LCJoZXJvMyI6eyJ0aXRsZSI6IiJ9LCJoZXJvNCI6eyJ0aXRsZSI6IiJ9LCJ0aWxlcyI6W3sidGl0bGUiOiIxOCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjAiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTIiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMSIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQSIsIngiOiI5IiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiNSIsImFuZ2xlIjoiMCJ9XSwiZG9vcnMiOltdLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNiIsInkiOiIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiOCIsInkiOiIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiOSIsInkiOiIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiMCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjExIiwieSI6IjAifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQ3JpdGljYWwgQmxvdyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgQ2hhcm0ifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXJrIEZvcnR1bmUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXJrIE1pZ2h0In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFzaCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkZyZW56eSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlBpdCBUcmFwIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUG9pc29uIERhcnQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJUcmlwd2lyZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IldvcmQgT2YgTWlzZXJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFyayBSZW1lZHkifV19LCJsaWV1dGVuYW50cyI6W3sidGl0bGUiOiJTcGxpZyIsIngiOiIxMSIsInkiOiIxIiwiaHAiOiIxMyIsImNvbmRpdGlvbnMiOnt9LCJoYXNCYWNrIjp0cnVlLCJ2ZXJ0aWNhbCI6ZmFsc2UsInJlbGljcyI6W10sInNraWxscyI6W119XSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiIiwib3ZlbG9yZFZpY3RvcnkiOiIiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiIifSwicGxvdCI6eyJ0aXRsZSI6IiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJ3YXRlciI6IndhdGVyIiwid2lsZGVybmVzcyI6IndpbGRlcm5lc3MifSwiZXhwYW5zaW9ucyI6eyJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiOiJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiLCJib25kc29mdGhld2lsZCI6ImJvbmRzb2Z0aGV3aWxkIiwiY3Jvd25vZmRlc3RpbnkiOiJjcm93bm9mZGVzdGlueSIsImNydXNhZGVvZnRoZWZvcmdvdHRlbiI6ImNydXNhZGVvZnRoZWZvcmdvdHRlbiIsImd1YXJkaWFuc29mZGVlcGhhbGwiOiJndWFyZGlhbnNvZmRlZXBoYWxsIiwibGFieXJpbnRob2ZydWluIjoibGFieXJpbnRob2ZydWluIiwibGFpcm9mdGhld3lybSI6ImxhaXJvZnRoZXd5cm0iLCJtYW5vcm9mcmF2ZW5zIjoibWFub3JvZnJhdmVucyIsIm9hdGhvZnRoZW91dGNhc3QiOiJvYXRob2Z0aGVvdXRjYXN0Iiwic2hhcmRzb2ZldmVyZGFyayI6InNoYXJkc29mZXZlcmRhcmsiLCJzaGFkb3dvZm5hcmVraGFsbCI6InNoYWRvd29mbmFyZWtoYWxsIiwic3Rld2FyZHNvZnRoZXNlY3JldCI6InN0ZXdhcmRzb2Z0aGVzZWNyZXQiLCJ0aGV0cm9sbGZlbnMiOiJ0aGV0cm9sbGZlbnMiLCJ0cmVhdHlvZmNoYW1waW9ucyI6InRyZWF0eW9mY2hhbXBpb25zIiwidmlzaW9uc29mZGF3biI6InZpc2lvbnNvZmRhd24iLCJjb252ZXJzaW9ua2l0IjoiY29udmVyc2lvbmtpdCIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifX0="],
	['HoB','Rellegars Rest - E2', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiNiIsInkiOiIxNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjYiLCJ5IjoiMTQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiI2IiwieSI6IjE0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNiIsInkiOiIxNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjYiLCJ5IjoiMTQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOnt9fV0sImhlcm8xIjp7InRpdGxlIjoiIn0sImhlcm8yIjp7InRpdGxlIjoiIn0sImhlcm8zIjp7InRpdGxlIjoiIn0sImhlcm80Ijp7InRpdGxlIjoiIn0sInRpbGVzIjpbeyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIxIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjEiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjE1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjIxIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTkiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMTkiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjQiLCJ5IjoiMTIiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEiLCJ5IjoiMTQiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjQiLCJ5IjoiNiIsIm9wZW5lZCI6ZmFsc2V9XSwieHMiOlt7InRpdGxlIjoiMXgxIiwieCI6IjUiLCJ5IjoiMTcifV0sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjMiLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiIyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiNCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNCIsInkiOiIwIiwiaHAiOiIyIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiI3IiwieSI6IjkiLCJocCI6IjQifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjIiLCJ5IjoiMTMiLCJocCI6IjQifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjciLCJ5IjoiMTciLCJocCI6IjQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxIiwieSI6IjE5In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMSIsInkiOiIyMCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjMiLCJ5IjoiMTkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIzIiwieSI6IjIwIn1dLCJvdmVybG9yZCI6eyJjYXJkcyI6W3sic2Vjb25kYXJ5IjoxLCJ0aXRsZSI6IkNyaXRpY2FsIEJsb3cifSx7InNlY29uZGFyeSI6MSwidGl0bGUiOiJEYXJrIENoYXJtIn0seyJzZWNvbmRhcnkiOjEsInRpdGxlIjoiRGFyayBGb3J0dW5lIn0seyJzZWNvbmRhcnkiOjIsInRpdGxlIjoiRGFyayBNaWdodCJ9LHsic2Vjb25kYXJ5IjoxLCJ0aXRsZSI6IkRhc2gifSx7InNlY29uZGFyeSI6MSwidGl0bGUiOiJGcmVuenkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJQaXQgVHJhcCJ9LHsic2Vjb25kYXJ5IjoxLCJ0aXRsZSI6IlBvaXNvbiBEYXJ0In0seyJzZWNvbmRhcnkiOjEsInRpdGxlIjoiVHJpcHdpcmUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJXb3JkIE9mIE1pc2VyeSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgUmVtZWR5In1dfSwibGlldXRlbmFudHMiOlt7InRpdGxlIjoiTG9yZCBNZXJpY2sgRmFycm93IiwieCI6IjQiLCJ5IjoiMSIsImhwIjoiMTMiLCJjb25kaXRpb25zIjp7fSwiaGFzQmFjayI6dHJ1ZSwidmVydGljYWwiOmZhbHNlLCJyZWxpY3MiOltdLCJza2lsbHMiOltdfV0sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sInBsb3QiOnsidGl0bGUiOiIifSwibW9uc3RlclRyYWl0cyI6eyJidWlsZGluZyI6ImJ1aWxkaW5nIiwiZGFyayI6ImRhcmsifSwiZXhwYW5zaW9ucyI6eyJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiOiJzZWNvbmRlZGl0aW9uYmFzZWdhbWUiLCJib25kc29mdGhld2lsZCI6ImJvbmRzb2Z0aGV3aWxkIiwiY3Jvd25vZmRlc3RpbnkiOiJjcm93bm9mZGVzdGlueSIsImNydXNhZGVvZnRoZWZvcmdvdHRlbiI6ImNydXNhZGVvZnRoZWZvcmdvdHRlbiIsImd1YXJkaWFuc29mZGVlcGhhbGwiOiJndWFyZGlhbnNvZmRlZXBoYWxsIiwibGFieXJpbnRob2ZydWluIjoibGFieXJpbnRob2ZydWluIiwibGFpcm9mdGhld3lybSI6ImxhaXJvZnRoZXd5cm0iLCJtYW5vcm9mcmF2ZW5zIjoibWFub3JvZnJhdmVucyIsIm9hdGhvZnRoZW91dGNhc3QiOiJvYXRob2Z0aGVvdXRjYXN0Iiwic2hhcmRzb2ZldmVyZGFyayI6InNoYXJkc29mZXZlcmRhcmsiLCJzaGFkb3dvZm5hcmVraGFsbCI6InNoYWRvd29mbmFyZWtoYWxsIiwic3Rld2FyZHNvZnRoZXNlY3JldCI6InN0ZXdhcmRzb2Z0aGVzZWNyZXQiLCJ0aGV0cm9sbGZlbnMiOiJ0aGV0cm9sbGZlbnMiLCJ0cmVhdHlvZmNoYW1waW9ucyI6InRyZWF0eW9mY2hhbXBpb25zIiwidmlzaW9uc29mZGF3biI6InZpc2lvbnNvZmRhd24iLCJjb252ZXJzaW9ua2l0IjoiY29udmVyc2lvbmtpdCIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifX0="],
	['HoB','The Baron Returns - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJab21iaWUiLCJtYXN0ZXIiOnRydWUsIngiOiIzIiwieSI6IjEwIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjYiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlpvbWJpZSIsIm1hc3RlciI6ZmFsc2UsIngiOiIzIiwieSI6IjEwIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlpvbWJpZSIsIm1hc3RlciI6ZmFsc2UsIngiOiIzIiwieSI6IjEwIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlpvbWJpZSIsIm1hc3RlciI6ZmFsc2UsIngiOiIzIiwieSI6IjEwIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlpvbWJpZSIsIm1hc3RlciI6ZmFsc2UsIngiOiIzIiwieSI6IjEwIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOnRydWUsIngiOiIxNCIsInkiOiIxNyIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE0IiwieSI6IjE4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTUiLCJ5IjoiMTgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNCIsInkiOiIxOSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE1IiwieSI6IjE5IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IiJ9LCJoZXJvMiI6eyJ0aXRsZSI6IiJ9LCJoZXJvMyI6eyJ0aXRsZSI6IiJ9LCJoZXJvNCI6eyJ0aXRsZSI6IiJ9LCJ0aWxlcyI6W3sidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTMiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxNCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjE4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTkiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxOCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMiIsInkiOiI1Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMiIsInkiOiI3Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyIiwieSI6IjEyIiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI1IiwieSI6IjEzIiwib3BlbmVkIjpmYWxzZX1dLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiVW5rbm93biIsIngiOiIyIiwieSI6IjEzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNCIsInkiOiIxNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiMTcifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI4IiwieSI6IjE1In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTIiLCJ5IjoiNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE1IiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiIxNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNSIsInkiOiIxMSJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJDcml0aWNhbCBCbG93In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFyayBDaGFybSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgRm9ydHVuZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgTWlnaHQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXNoIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRnJlbnp5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUGl0IFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJQb2lzb24gRGFydCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlRyaXB3aXJlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiV29yZCBPZiBNaXNlcnkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXJrIFJlbWVkeSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik91dCBPZiBEYXJrbmVzcyJ9XX0sImxpZXV0ZW5hbnRzIjpbeyJ0aXRsZSI6IkxhZHkgRWxpemEgRmFycm93IiwieCI6IjE1IiwieSI6IjE3IiwiaHAiOiIxMiIsImNvbmRpdGlvbnMiOnt9LCJoYXNCYWNrIjp0cnVlLCJ2ZXJ0aWNhbCI6ZmFsc2UsInJlbGljcyI6WyJTaGllbGQgT2YgWm9yZWtzIEZhdm9yIl0sInNraWxscyI6W119XSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiIiwib3ZlbG9yZFZpY3RvcnkiOiIiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiIifSwicGxvdCI6eyJ0aXRsZSI6IiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjdXJzZWQiOiJjdXJzZWQiLCJ3aWxkZXJuZXNzIjoid2lsZGVybmVzcyJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsImNvbnZlcnNpb25raXQiOiJjb252ZXJzaW9ua2l0IiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9fQ=="],
	['HoB','The Baron Returns - E2', "eyJtb25zdGVycyI6W10sImhlcm8xIjp7InRpdGxlIjoiIn0sImhlcm8yIjp7InRpdGxlIjoiIn0sImhlcm8zIjp7InRpdGxlIjoiIn0sImhlcm80Ijp7InRpdGxlIjoiIn0sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjEiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMSIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxOCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjE2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI5IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiMTUiLCJhbmdsZSI6IiJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjciLCJ5IjoiMTUiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNSIsInkiOiIxMCIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMSIsInkiOiIxMCIsIm9wZW5lZCI6ZmFsc2V9XSwieHMiOltdLCJhbGxpZXMiOltdLCJmYW1pbGlhcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IldoaXRlIiwieCI6IjgiLCJ5IjoiOSJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMTYiLCJ5IjoiMTEifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjgiLCJ5IjoiMTkifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjEiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjEwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiMTMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjE5In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMSIsInkiOiIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMiIsInkiOiIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMyIsInkiOiIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNCIsInkiOiIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMSIsInkiOiIyMCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjIiLCJ5IjoiMjAifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQ3JpdGljYWwgQmxvdyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgQ2hhcm0ifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXJrIEZvcnR1bmUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXJrIE1pZ2h0In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFzaCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkZyZW56eSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlBpdCBUcmFwIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUG9pc29uIERhcnQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJUcmlwd2lyZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IldvcmQgT2YgTWlzZXJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFyayBSZW1lZHkifV19LCJsaWV1dGVuYW50cyI6W3sidGl0bGUiOiJCYXJvbiBaYWNoYXJldGgiLCJ4IjoiOCIsInkiOiIxMCIsImhwIjoiMTYiLCJjb25kaXRpb25zIjp7fSwiaGFzQmFjayI6dHJ1ZSwidmVydGljYWwiOmZhbHNlLCJyZWxpY3MiOlsiVGhlIFNoYWRvdyBSdW5lIl0sInNraWxscyI6W119XSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiIiwib3ZlbG9yZFZpY3RvcnkiOiIiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiIifSwicGxvdCI6eyJ0aXRsZSI6IiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjYXZlIjoiY2F2ZSIsImNpdmlsaXplZCI6ImNpdmlsaXplZCIsImNvbGQiOiJjb2xkIiwiY3Vyc2VkIjoiY3Vyc2VkIiwiZGFyayI6ImRhcmsiLCJob3QiOiJob3QiLCJtb3VudGFpbiI6Im1vdW50YWluIiwid2F0ZXIiOiJ3YXRlciIsIndpbGRlcm5lc3MiOiJ3aWxkZXJuZXNzIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9fQ=="],
	['HoB','Blood Will Tell', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI4Iiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTUiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjEyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyMCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjE1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiMyJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiI0IiwieSI6IjIifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMyIsInkiOiIxMiJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiI5IiwieSI6IjgifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTMiLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTQiLCJ5IjoiOSJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMTIiLCJ5IjoiMCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMSIsInkiOiI0In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMyIsInkiOiIxMiJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiNiIsInkiOiI4In0seyJ0aXRsZSI6IlJlZCIsIngiOiI3IiwieSI6IjgifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjE1In1dfQ=="],
	['HoB','Rise of Urthko - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTUiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiIwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNCIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjQiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI2IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjUiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTWFub3IgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMTciLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiOSIsImFuZ2xlIjoiIn1dLCJkb29ycyI6W3sidGl0bGUiOiJEb29yIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMTIiLCJ5IjoiMyJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiI1In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI4IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTciLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTYiLCJ5IjoiNiJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTAiLCJ5IjoiMTAiLCJocCI6IjEyIn1dfQ=="],
	['HoB','Rise of Urthko - E2', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiNyIsInkiOiI3In0seyJ0aXRsZSI6IjF4MSIsIngiOiI4IiwieSI6IjcifV0sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI5IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE4Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI4IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMiIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiOCIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiI5In0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEwIiwieSI6IjMifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiV2hpdGUiLCJ4IjoiNyIsInkiOiI4In0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjgiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTQiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiMiJ9XX0="],
	['HoB','Caladens Crossing - E1', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiMTQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMSIsInkiOiIxNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjExIiwieSI6IjE0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTEiLCJ5IjoiMTQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMSIsInkiOiIxNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiIifSwiaGVybzIiOnsidGl0bGUiOiIifSwiaGVybzMiOnsidGl0bGUiOiIifSwiaGVybzQiOnsidGl0bGUiOiIifSwidGlsZXMiOlt7InRpdGxlIjoiMTMiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiI0IiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI3Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjEzIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI0IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMTQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxNCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJEb29yIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMSIsInkiOiI1Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMCIsInkiOiI1Iiwib3BlbmVkIjpmYWxzZX1dLCJ4cyI6W3sidGl0bGUiOiIyeDIiLCJ4IjoiOCIsInkiOiI0In1dLCJhbGxpZXMiOltdLCJmYW1pbGlhcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiI3IiwieSI6IjIifSx7InRpdGxlIjoiUmVkIiwieCI6IjYiLCJ5IjoiMSJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTIiLCJ5IjoiMSJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTEiLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjYifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjEsInRpdGxlIjoiQ3JpdGljYWwgQmxvdyJ9LHsic2Vjb25kYXJ5IjoxLCJ0aXRsZSI6IkRhcmsgQ2hhcm0ifSx7InNlY29uZGFyeSI6MiwidGl0bGUiOiJEYXJrIEZvcnR1bmUifSx7InNlY29uZGFyeSI6MiwidGl0bGUiOiJEYXJrIE1pZ2h0In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFzaCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkZyZW56eSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlBpdCBUcmFwIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUG9pc29uIERhcnQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJUcmlwd2lyZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IldvcmQgT2YgTWlzZXJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFyayBSZW1lZHkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJPdXQgT2YgRGFya25lc3MifV19LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sInBsb3QiOnsidGl0bGUiOiIifSwibW9uc3RlclRyYWl0cyI6eyJidWlsZGluZyI6ImJ1aWxkaW5nIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9fQ=="],
	['HoB','Caladens Crossing - E2', "eyJtb25zdGVycyI6W10sImhlcm8xIjp7InRpdGxlIjoiIn0sImhlcm8yIjp7InRpdGxlIjoiIn0sImhlcm8zIjp7InRpdGxlIjoiIn0sImhlcm80Ijp7InRpdGxlIjoiIn0sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiNiIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiIzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjI4Iiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiIxOSIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjgiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24yeDIiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTYiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTgiLCJ5IjoiOSIsImFuZ2xlIjoiOTAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjExIiwieSI6IjMiLCJvcGVuZWQiOmZhbHNlfV0sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbeyJ0aXRsZSI6IlZpbGxhZ2VyIE1hbGUiLCJ4IjoiNiIsInkiOiI0IiwiaHAiOiIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlZpbGxhZ2VyIEZlbWFsZSIsIngiOiI2IiwieSI6IjQiLCJocCI6IiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiVmlsbGFnZXIgTWFsZSIsIngiOiI2IiwieSI6IjQiLCJocCI6IiIsImNvbmRpdGlvbnMiOnt9fV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiV2hpdGUiLCJ4IjoiOCIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI0IiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE1IiwieSI6IjMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiNiJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJDcml0aWNhbCBCbG93In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFyayBDaGFybSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgRm9ydHVuZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkRhcmsgTWlnaHQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXNoIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRnJlbnp5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUGl0IFRyYXAifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJQb2lzb24gRGFydCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlRyaXB3aXJlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiV29yZCBPZiBNaXNlcnkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEYXJrIFJlbWVkeSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkltcGxvZGluZyBSaWZ0In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiT3V0IE9mIERhcmtuZXNzIn1dfSwibGlldXRlbmFudHMiOltdLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiIiLCJvdmVsb3JkVmljdG9yeSI6IiIsImN1cnJlbnRTdGF0dXMiOiIiLCJyZWluZm9yY2VtZW50cyI6IiJ9LCJwbG90Ijp7InRpdGxlIjoiIn0sIm1vbnN0ZXJUcmFpdHMiOnsiYnVpbGRpbmciOiJidWlsZGluZyIsImN1cnNlZCI6ImN1cnNlZCIsIm1vdW50YWluIjoibW91bnRhaW4iLCJ3aWxkZXJuZXNzIjoid2lsZGVybmVzcyJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifX0="],
	['HoB','From the Wreckage', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJNZXJyaW9kIiwibWFzdGVyIjp0cnVlLCJ4IjoiMiIsInkiOiIxNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI3IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJNZXJyaW9kIiwibWFzdGVyIjpmYWxzZSwieCI6IjIiLCJ5IjoiMTQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6dHJ1ZSwieCI6IjciLCJ5IjoiOSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjciLCJ5IjoiOSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjciLCJ5IjoiOSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjciLCJ5IjoiOSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjciLCJ5IjoiOSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiJTYWhsYSIsIngiOiIyIiwieSI6IjIiLCJocCI6IjEyIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJQcm9waGV0IiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFsbCBTZWVpbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJhdHRsZSBWaXNpb24iLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRm9jdXNlZCBJbnNpZ2h0cyIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGb3Jld2FybmluZyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR3JpbSBGYXRlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJMaWZlbGluZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT21uaXNjaWVuY2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlNvb3RoaW5nIEluc2lnaHQiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiVmljdG9yeSBGb3JldG9sZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IlN0YWZmIE9mIExpZ2h0IiwiaGFuZDIiOiIiLCJhcm1vciI6IldoaXRlIFdvbGYgQ2xvYWsiLCJpdGVtIjoiU2FnZXMgVG9tZSIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm8yIjp7InRpdGxlIjoiVGFobGlhIiwieCI6IjEiLCJ5IjoiMiIsImhwIjoiMTQiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IktuaWdodCIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJBZHZhbmNlIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkNoYWxsZW5nZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGVmZW5kIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJHdWFyZCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTaGllbGQgU2xhbSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJCb25lIEJsYWRlIiwiaGFuZDIiOiJXb29kZW4gU2hpZWxkIiwiYXJtb3IiOiJCYXJvbnMgQ2xvYWsiLCJpdGVtIjoiRWx2ZW4gQm9vdHMiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbIlRyaWRlbnQiLCJTb3VsYm91bmQgU3dvcmQiLCJHdWFyZGlhbiBBeGUiXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMyI6eyJ0aXRsZSI6IkhpZ2ggTWFnZSBRdWVsbGVuIiwieCI6IjIiLCJ5IjoiMSIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6Ikdlb21hbmNlciIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJDYXRhY2x5c20iLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkVhcnRoZW4gQW5ndWlzaCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR3Jhdml0eSBTcGlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiTGV5IExpbmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk1vbHRlbiBGdXJ5Iix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlF1YWtpbmcgV29yZCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTdG9uZSBUb25ndWUiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3VtbW9uZWQgU3RvbmUiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiVGVycmFjYWxsIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIldheXMgT2YgU3RvbmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJbW1vbGF0aW9uIiwiaGFuZDIiOiIiLCJhcm1vciI6IkNsb2FrIE9mIE1pc3RzIiwiaXRlbSI6Ik1hbmEgV2VhdmUiLCJpdGVtMiI6IlVuZHlpbmcgU2t1bGwifSwic2FjayI6WyJTaGFyZHMgT2YgSXRoeW5kcnVzIl0sImNvbmRpdGlvbnMiOnt9fSwiaGVybzQiOnsidGl0bGUiOiJUYXRpYW5uYSIsIngiOiIxIiwieSI6IjEiLCJocCI6IjEyIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJXaWxkbGFuZGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFjY3VyYXRlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGFjayBBcnJvdyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQm93IE1hc3RlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRhbmdlciBTZW5zZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFYWdsZSBFeWVzIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGaXJzdCBTdHJpa2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRmxlZXQgT2YgRm9vdCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiTmltYmxlIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bm5pbmcgU2hvdCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IllldyBTaG9ydGJvdyIsImhhbmQyIjoiIiwiYXJtb3IiOiJIZWF2eSBDbG9hayIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJ0aWxlcyI6W3sidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTkiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMTgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24yeDIiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMSIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMiIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjEzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTkiLCJ5IjoiMTUiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE0IiwieSI6IjYiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE0IiwieSI6IjEyIiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjExIiwieSI6IjgiLCJvcGVuZWQiOmZhbHNlfV0sInhzIjpbeyJ0aXRsZSI6IjF4MSIsIngiOiIxOCIsInkiOiI5In1dLCJhbGxpZXMiOltdLCJmYW1pbGlhcnMiOlt7InRpdGxlIjoiU3VtbW9uZWQgU3RvbmUiLCJ4IjoiMSIsInkiOiIwIiwiaHAiOiIyIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJTdW1tb25lZCBTdG9uZSIsIngiOiIyIiwieSI6IjAiLCJocCI6IjIiLCJjb25kaXRpb25zIjp7fX1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI0IiwieSI6IjE0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMyIsInkiOiIxNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTIiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTgiLCJ5IjoiMiJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiIzIiwieSI6IjEwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyIiwieSI6IjgifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE5IiwieSI6IjEyIn1dLCJvdmVybG9yZCI6eyJjYXJkcyI6W119LCJsaWV1dGVuYW50cyI6W3sidGl0bGUiOiJMYWR5IEVsaXphIEZhcnJvdyIsIngiOiIyIiwieSI6IjE5IiwiaHAiOiIxMiIsImNvbmRpdGlvbnMiOnt9LCJoYXNCYWNrIjp0cnVlLCJ2ZXJ0aWNhbCI6ZmFsc2UsInJlbGljcyI6WyJTY29ycGlvbnMgS2lzcyJdLCJza2lsbHMiOltdfSx7InRpdGxlIjoiTG9yZCBNZXJpY2sgRmFycm93IiwieCI6IjE4IiwieSI6IjEwIiwiaHAiOiIxMyIsImNvbmRpdGlvbnMiOnt9LCJoYXNCYWNrIjp0cnVlLCJ2ZXJ0aWNhbCI6ZmFsc2UsInJlbGljcyI6W10sInNraWxscyI6W119XSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiIiwib3ZlbG9yZFZpY3RvcnkiOiIiLCJjdXJyZW50U3RhdHVzIjoiIiwicmVpbmZvcmNlbWVudHMiOiIifSwidmlsbGFnZXJzIjpbXSwicGxvdCI6eyJ0aXRsZSI6IiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjYXZlIjoiY2F2ZSIsImNpdmlsaXplZCI6ImNpdmlsaXplZCIsImNvbGQiOiJjb2xkIiwiY3Vyc2VkIjoiY3Vyc2VkIiwiZGFyayI6ImRhcmsiLCJob3QiOiJob3QiLCJtb3VudGFpbiI6Im1vdW50YWluIiwid2F0ZXIiOiJ3YXRlciIsIndpbGRlcm5lc3MiOiJ3aWxkZXJuZXNzIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwiY29udmVyc2lvbmtpdCI6ImNvbnZlcnNpb25raXQiLCJtaXN0c29mYmlsZWhhbGwiOiJtaXN0c29mYmlsZWhhbGwiLCJjaGFpbnN0aGF0cnVzdCI6ImNoYWluc3RoYXRydXN0In19"],
	['HoB','Saradyn in Flames', "eyJ4cyI6W3sidGl0bGUiOiIyeDIiLCJ4IjoiMTMiLCJ5IjoiNiJ9XSwidGlsZXMiOlt7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTkiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjExIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjAiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIyMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIyMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNyIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjIwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjIxIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjE0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxIiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNyIsInkiOiI2IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI1IiwieSI6IjExIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI1IiwieSI6IjE1In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI3IiwieSI6IjIwIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjQiLCJ5IjoiMTIifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiMjEifSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEyIiwieSI6IjIifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiVW5rbm93biIsIngiOiI1IiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxIiwieSI6IjE0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE0IiwieSI6IjEzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMiIsInkiOiIyMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiMjQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiIxOSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE2IiwieSI6IjE5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNiIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNiIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMiIsInkiOiIxMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIyNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTYiLCJ5IjoiMjEifV19"],
	['HoB','Prison of Khynn - E1', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMTYiLCJ5IjoiMSJ9XSwidGlsZXMiOlt7InRpdGxlIjoiMjAiLCJzaWRlIjoiQSIsIngiOiI0IiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI5IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIxIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjEiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjMiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTQiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNiIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiMCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI5IiwieSI6IjMifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNyIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI5IiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjYifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiI4IiwiaHAiOiIwIn1dfQ=="],
	['HoB','Prison of Khynn - E2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjUiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIxMCIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjExIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEyIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOCIsInkiOiIzIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI1IiwieSI6IjEwIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMSIsInkiOiI5In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI4IiwieSI6IjAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTEiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIxNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiOCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjQiLCJ5IjoiMTEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI3IiwieSI6IjE0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiMTQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiIxMiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE1IiwieSI6IjE1In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTQiLCJ5IjoiOSJ9XX0="],
	['HoB','Shadowfall Mountain - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjEzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMjgiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI3Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTIiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiIxMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI4IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNiIsInkiOiIxMiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiIxNCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTEiLCJ5IjoiNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTIiLCJ5IjoiMTMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE1IiwieSI6IjE3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiIxMiJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMSIsInkiOiIxNCJ9XX0="],
	['HoB','Shadowfall Mountain - E2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMTEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTAiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIxMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjE4IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyIiwieSI6IjQifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjIiLCJ5IjoiMTAifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEyIiwieSI6IjQifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEyIiwieSI6IjEwIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjExIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMiIsInkiOiI4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiI1In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiMTAifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiIxMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE1IiwieSI6IjcifSx7InRpdGxlIjoiR3JlZW4iLCJ4IjoiMiIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIyIiwieSI6IjExIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxNSIsInkiOiI0In0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjE1IiwieSI6IjExIn1dfQ=="],
	['HoB','Piercing Darkness - E1', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiNyIsInkiOiI0In0seyJ0aXRsZSI6IjF4MSIsIngiOiI3IiwieSI6IjUifSx7InRpdGxlIjoiMXgxIiwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiNyIsInkiOiI3In1dLCJ0aWxlcyI6W3sidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiI0IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTQiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTYiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI2IiwieSI6IjgifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMiIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjYifV19"],
	['HoB','Piercing Darkness - E2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjI1Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI0Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIxNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxIiwieSI6IjIifSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjExIiwieSI6IjIifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEiLCJ5IjoiOCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMTEiLCJ5IjoiOCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNiIsInkiOiI5In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjQiLCJ5IjoiNCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiI0In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiIyIiwieSI6IjAifSx7InRpdGxlIjoiUmVkIiwieCI6IjIiLCJ5IjoiMSJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTMiLCJ5IjoiMCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTMiLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiI0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiIyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjYifV19"],
	['HoB','Blood and Betrayal - E1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiI3IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMiIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMTEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEyIiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMTciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjYiLCJ5IjoiNiJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMSIsInkiOiIxMCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI5IiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjE1In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxMiIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxMyIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNCIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNSIsInkiOiI0In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMyIsInkiOiI1In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxNCIsInkiOiI1In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxNSIsInkiOiI1In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMiIsInkiOiI1In0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjE2IiwieSI6IjQifV19"],
	['HoB','Blood and Betrayal - E2A', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMTIiLCJ5IjoiNyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTIiLCJ5IjoiOCJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTMiLCJ5IjoiNyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTMiLCJ5IjoiOCJ9XSwidGlsZXMiOlt7InRpdGxlIjoiNCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjciLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxNyIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjExIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI1Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMTUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIxNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjE4IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyIiwieSI6IjkifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI4In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxNiIsInkiOiIxMSJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOCIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMiIsInkiOiIxMSJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMSIsInkiOiI1In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxMCIsInkiOiIxMCJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiI5IiwieSI6IjExIn0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjE3IiwieSI6IjYifV19"],
	['HoB','Blood and Betrayal - E3', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNyIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI0Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjUiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiI5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMiIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjE4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMTciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIxNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjE3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiMTEiLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOCIsInkiOiI3Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxIiwieSI6IjgiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE1IiwieSI6IjgiLCJvcGVuZWQiOmZhbHNlfV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTgiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiIyMSJ9XX0="],
	['MoB','Strange Awakening', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjExIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIzIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjciLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ijc5Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNzgiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiODUiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI3OCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEzIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjE1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjgzIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ijg2Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJNaXN0cyBlbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjE3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkNydW1ibGluZyIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMTAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJDcnVtYmxpbmciLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiQ3J1bWJsaW5nIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMSIsImFuZ2xlIjoiMCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiV2FsbCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI5In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI3IiwieSI6IjYifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjkiLCJ5IjoiOCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxMCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIzIiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiMTAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEwIiwieSI6IjEzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTQiLCJ5IjoiMTMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNSIsInkiOiIxMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEzIiwieSI6IjE0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTUiLCJ5IjoiMTQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNCIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE0IiwieSI6IjE2In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTUiLCJ5IjoiMTYifV19"],
	['HM','VoD - Trucebreaker', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJGbGVzaCBNb3VsZGVyIiwibWFzdGVyIjp0cnVlLCJ4IjoiNCIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkZsZXNoIE1vdWxkZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNCIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkZsZXNoIE1vdWxkZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNCIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkZsZXNoIE1vdWxkZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNCIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6Ik9ncmUiLCJtYXN0ZXIiOnRydWUsIngiOiI4IiwieSI6IjQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiOCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiT2dyZSIsIm1hc3RlciI6ZmFsc2UsIngiOiI4IiwieSI6IjQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiVHJvbGwiLCJtYXN0ZXIiOnRydWUsIngiOiIxMSIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjEwIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJUcm9sbCIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMSIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjgiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6IiJ9LCJoZXJvMiI6eyJ0aXRsZSI6IiJ9LCJoZXJvMyI6eyJ0aXRsZSI6IiJ9LCJoZXJvNCI6eyJ0aXRsZSI6IiJ9LCJ0aWxlcyI6W3sidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjMiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMSIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjciLCJzaWRlIjoiQSIsIngiOiI0IiwieSI6IjYiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMTIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjEwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI1Iiwic2lkZSI6IkEiLCJ4IjoiMTgiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjE4IiwieSI6IjEiLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W10sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjE0IiwieSI6IjIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNCIsInkiOiI1In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTciLCJ5IjoiMiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE3IiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiI4In1dLCJvdmVybG9yZCI6eyJjYXJkcyI6W3sic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJlZnVkZGxlIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmxpbmRpbmcgU3BlZWQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJEaXJ0eSBGaWdodGluZyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkZsdXJyeSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkdyZWFzZSBUcmFwIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiTWVudGFsIEVycm9yIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiTWltaWMifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJPdmVyd2hlbG0ifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJSZWZsZWN0aXZlIFdhcmQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJTaWduIE9mIFdlYWtuZXNzIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiVW5jb250cm9sbGVkIFBvd2VyIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiQmxvb2QgUmFnZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik91dCBPZiBEYXJrbmVzcyJ9XX0sImxpZXV0ZW5hbnRzIjpbXSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTAsInF1ZXN0T2JqZWN0aXZlcyI6eyJoZXJvZXNWaWN0b3J5IjoiS2lsbCBUcmlzdGF5bmUiLCJvdmVsb3JkVmljdG9yeSI6IkNvbGxlY3QgNCBjaXRpemVucyIsImN1cnJlbnRTdGF0dXMiOiIiLCJyZWluZm9yY2VtZW50cyI6IkF0IHRoZSBzdGFydCBvZiBlYWNoIG92ZXJsb3JkIHR1cm46IDEgY2hhbmdlbGluZyBvbiBleGl0LiJ9LCJtb25zdGVyVHJhaXRzIjp7ImJ1aWxkaW5nIjoiYnVpbGRpbmciLCJjYXZlIjoiY2F2ZSIsImNpdmlsaXplZCI6ImNpdmlsaXplZCIsIm1vdW50YWluIjoibW91bnRhaW4iLCJ3aWxkZXJuZXNzIjoid2lsZGVybmVzcyJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsIm1pc3Rzb2ZiaWxlaGFsbCI6Im1pc3Rzb2ZiaWxlaGFsbCIsImNoYWluc3RoYXRydXN0IjoiY2hhaW5zdGhhdHJ1c3QifSwicGxvdCI6eyJ0aXRsZSI6IlVuc3RhYmxlIEZvcmNlcyIsImNhcmRzIjpbWyJEZXNjZW5kIFRvIE1hZGRuZXNzIixmYWxzZSxmYWxzZV0sWyJFeHBsb3NpdmUgRmFsbCIsdHJ1ZSx0cnVlXSxbIkxvdmUgT2YgQ2hhb3MiLGZhbHNlLGZhbHNlXSxbIk1vcnRhbCBDb2lsIixmYWxzZSxmYWxzZV0sWyJPbnNsYXVnaHQiLGZhbHNlLGZhbHNlXSxbIlBhcmlhaCIsZmFsc2UsZmFsc2VdLFsiUG93ZXIgQW5kIFNhY3JpZmljZSIsdHJ1ZSxmYWxzZV0sWyJTb3VsIEVuc25hcmUiLHRydWUsZmFsc2VdLFsiU3VtbW9uIC0gVHJpc3RheW5lIixmYWxzZSxmYWxzZV0sWyJXaWxkIEVuZXJneSIsdHJ1ZSxmYWxzZV1dLCJudW1iZXIiOiI3In19"],
	['HM','SotS - Stewards of the Secret', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjEyIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjciLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxIiwieSI6IjQifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNSIsInkiOiI2In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMyIsInkiOiI0In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIzIiwieSI6IjEifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjExIiwieSI6IjAifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjE1IiwieSI6IjYifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjE1IiwieSI6IjEzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNSIsInkiOiIwIn1dfQ=="],
	['HM','CotF - Crusade of the Forgotten', "eyJtb25zdGVycyI6W3sidGl0bGUiOiJCYXJnaGVzdCIsIm1hc3RlciI6dHJ1ZSwieCI6IjQiLCJ5IjoiNyIsInZlcnRpY2FsIjp0cnVlLCJocCI6IjYiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkJhcmdoZXN0IiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiNyIsInZlcnRpY2FsIjp0cnVlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkJhcmdoZXN0IiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiNyIsInZlcnRpY2FsIjp0cnVlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkJhcmdoZXN0IiwibWFzdGVyIjpmYWxzZSwieCI6IjQiLCJ5IjoiNyIsInZlcnRpY2FsIjp0cnVlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6Ik1lZHVzYSIsIm1hc3RlciI6dHJ1ZSwieCI6IjkiLCJ5IjoiNCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI5IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJNZWR1c2EiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiOSIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjYiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6Ik1lZHVzYSIsIm1hc3RlciI6ZmFsc2UsIngiOiI5IiwieSI6IjQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNiIsImNvbmRpdGlvbnMiOnt9fV0sImhlcm8xIjp7InRpdGxlIjoiIn0sImhlcm8yIjp7InRpdGxlIjoiIn0sImhlcm8zIjp7InRpdGxlIjoiIn0sImhlcm80Ijp7InRpdGxlIjoiIn0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTciLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiI4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjAiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjYiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjEiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjEyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIxNCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMTEiLCJ5IjoiMSIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIyMCIsInkiOiI1Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjIyIiwieSI6IjUiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjciLCJ5IjoiMTIiLCJvcGVuZWQiOmZhbHNlfV0sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbeyJ0aXRsZSI6IlZpbGxhZ2VyIE1hbGUiLCJ4IjoiMTMiLCJ5IjoiMSIsImhwIjoiIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJWaWxsYWdlciBGZW1hbGUiLCJ4IjoiMTAiLCJ5IjoiNCIsImhwIjoiIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJWaWxsYWdlciBNYWxlIiwieCI6IjIwIiwieSI6IjYiLCJocCI6IiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiVmlsbGFnZXIgRmVtYWxlIiwieCI6IjIzIiwieSI6IjciLCJocCI6IiIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiVmlsbGFnZXIgTWFsZSIsIngiOiI5IiwieSI6IjEzIiwiaHAiOiIiLCJjb25kaXRpb25zIjp7fX1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiIzIiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiMiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMjIiLCJ5IjoiMTAifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbeyJzZWNvbmRhcnkiOjEsInRpdGxlIjoiQ3JpdGljYWwgQmxvdyJ9LHsic2Vjb25kYXJ5IjoxLCJ0aXRsZSI6IkRhcmsgQ2hhcm0ifSx7InNlY29uZGFyeSI6MiwidGl0bGUiOiJEYXJrIEZvcnR1bmUifSx7InNlY29uZGFyeSI6MiwidGl0bGUiOiJEYXJrIE1pZ2h0In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFzaCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkZyZW56eSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlBpdCBUcmFwIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUG9pc29uIERhcnQifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJUcmlwd2lyZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IldvcmQgT2YgTWlzZXJ5In0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGFyayBSZW1lZHkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJJbXBsb2RpbmcgUmlmdCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik91dCBPZiBEYXJrbmVzcyJ9XX0sImxpZXV0ZW5hbnRzIjpbXSwiYWN0T25lIjpmYWxzZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sInBsb3QiOnsidGl0bGUiOiIifSwibW9uc3RlclRyYWl0cyI6eyJjdXJzZWQiOiJjdXJzZWQiLCJob3QiOiJob3QiLCJtb3VudGFpbiI6Im1vdW50YWluIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9fQ=="],
	['HM','CoD - Burning Harvest', "#eyJtb25zdGVycyI6W3sidGl0bGUiOiJHaWFudCIsIm1hc3RlciI6dHJ1ZSwieCI6IjE2IiwieSI6IjIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMTIiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkdpYW50IiwibWFzdGVyIjpmYWxzZSwieCI6IjE2IiwieSI6IjIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMTAiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkxhdmEgQmVldGxlIiwibWFzdGVyIjp0cnVlLCJ4IjoiNSIsInkiOiI4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkxhdmEgQmVldGxlIiwibWFzdGVyIjpmYWxzZSwieCI6IjUiLCJ5IjoiOCIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIzIiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJMYXZhIEJlZXRsZSIsIm1hc3RlciI6ZmFsc2UsIngiOiI1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiTGF2YSBCZWV0bGUiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiNSIsInkiOiI4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX1dLCJoZXJvMSI6eyJ0aXRsZSI6Ik9uZSBGaXN0IiwieCI6IjYiLCJ5IjoiNiIsImhwIjoiMTIiLCJzdGFtaW5hIjoiMyIsImNsYXNzTmFtZSI6IkJlYXN0bWFzdGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIlByZWRhdG9yIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJDaGFuZ2luZyBTa2lucyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2hhZG93IEh1bnRlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2F2YWdlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkZlcmFsIEZyZW56eSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTdXJ2aXZhbGlzdCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTdGFsa2VyIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCZXN0aWFsIFJhZ2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJvdW5kIGJ5IHRoZSBIdW50Iix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIldvbGYiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6Ikh1bnRpbmcgU3BlYXIiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOlsiU2tpbm5pbmcgS25pZmUiXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMiI6eyJ0aXRsZSI6IkxvZ2FuIExhc2hsZXkiLCJ4IjoiOCIsInkiOiI2IiwiaHAiOiIxMCIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiVHJlYXN1cmUgSHVudGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkRlbHZlciIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEdW5nZW9uZWVyIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGaW5kZXJzIEtlZXBlcnMiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkdvbGQgUnVzaCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR3VhcmQgVGhlIFNwb2lscyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiTHVyZSBPZiBGb3J0dW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTbGVpZ2h0IE9mIEhhbmQiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3VydmV5Iix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlRyYWlsIE9mIFJpY2hlcyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkxlYXRoZXIgV2hpcCIsImhhbmQyIjoiVHJpZGVudCIsImFybW9yIjoiIiwiaXRlbSI6IlRoZSBEZWFkIE1hbnMgQ29tcGFzcyIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm8zIjp7InRpdGxlIjoiTWFzdGVyIFRob3JuIiwieCI6IjciLCJ5IjoiNiIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IlJ1bmVtYXN0ZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQnJlYWsgVGhlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkV4cGxvZGluZyBSdW5lIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkdob3N0IEFybW9yIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNjcmliZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJcm9uIFdpbGwiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlF1aWNrIENhc3RpbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJ1bmUgTWFzdGVyeSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5pYyBLbm93bGVkZ2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgU29yY2VyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkFyY2FuZSBCb2x0IiwiaGFuZDIiOiIiLCJhcm1vciI6IlJ1bmUgUGxhdGUiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwiaGVybzQiOnsidGl0bGUiOiJFbGRlciBNb2siLCJ4IjoiNiIsInkiOiI1IiwiaHAiOiIxMCIsInN0YW1pbmEiOiI0IiwiY2xhc3NOYW1lIjoiRGlzY2lwbGUiLCJmZWF0VXNlZCI6dHJ1ZSwic2tpbGxzIjpbWyJBcm1vciBPZiBGYWl0aCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQmxlc3NlZCBTdHJpa2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2xlYW5zaW5nIFRvdWNoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEaXZpbmUgRnVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSG9seSBQb3dlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIEhlYWxpbmciLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIFBlYWNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSYWRpYW50IExpZ2h0Iix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlRpbWUgT2YgTmVlZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6Ikpld2VsZWQgTWFjZSIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IlBob2VuaXggUGVuZGFudCIsIml0ZW0yIjoiIn0sInNhY2siOlsiSXJvbiBNYWNlIiwiU2xpbmciXSwiY29uZGl0aW9ucyI6e319LCJ0aWxlcyI6W3sidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIyIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjciLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI4Iiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTIiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjYiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiI1IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEyIiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiMSIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNCIsInkiOiI0Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiNyIsIm9wZW5lZCI6ZmFsc2V9XSwieHMiOltdLCJhbGxpZXMiOltdLCJmYW1pbGlhcnMiOlt7InRpdGxlIjoiV29sZiIsIngiOiI4IiwieSI6IjUiLCJocCI6IjMiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IlNjb3VyZ2UiLCJ4IjoiMyIsInkiOiI0IiwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJSYXZlbiBGbG9jayIsIngiOiI4IiwieSI6IjIiLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI0IiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTMiLCJ5IjoiMTEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI0IiwieSI6IjEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI3IiwieSI6IjQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI5IiwieSI6IjUifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMSIsInkiOiI3In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiMTAifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNSIsInkiOiIxMCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTAiLCJ5IjoiNCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTYiLCJ5IjoiMyJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTAiLCJ5IjoiOSJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTYiLCJ5IjoiOSJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOlt7InNlY29uZGFyeSI6MCwidGl0bGUiOiJCZWZ1ZGRsZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IkJsaW5kaW5nIFNwZWVkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiRGlydHkgRmlnaHRpbmcifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJGbHVycnkifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJHcmVhc2UgVHJhcCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1lbnRhbCBFcnJvciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ik1pbWljIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiT3ZlcndoZWxtIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiUmVmbGVjdGl2ZSBXYXJkIn0seyJzZWNvbmRhcnkiOjAsInRpdGxlIjoiU2lnbiBPZiBXZWFrbmVzcyJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlVuY29udHJvbGxlZCBQb3dlciJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6Ikdyb3Rlc3F1ZSJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlBvc3Nlc3NpdmUifSx7InNlY29uZGFyeSI6MCwidGl0bGUiOiJUaWVzIFRoYXQgQmluZCJ9LHsic2Vjb25kYXJ5IjowLCJ0aXRsZSI6IlVuYmxpbmtpbmcifV19LCJsaWV1dGVuYW50cyI6W10sImFjdE9uZSI6dHJ1ZSwibWFwV2lkdGgiOjQwLCJtYXBIZWlnaHQiOjUwLCJxdWVzdE9iamVjdGl2ZXMiOnsiaGVyb2VzVmljdG9yeSI6IiIsIm92ZWxvcmRWaWN0b3J5IjoiIiwiY3VycmVudFN0YXR1cyI6IiIsInJlaW5mb3JjZW1lbnRzIjoiIn0sInBsb3QiOnsidGl0bGUiOiJVbnNlZW4gTGVnaW9ucyIsImNhcmRzIjpbWyJBbHdheXMgV2F0Y2hpbmciLHRydWUsZmFsc2VdLFsiRW52aW91cyBTd2FybSIsZmFsc2UsZmFsc2VdLFsiRmxlZSBUaGUgTGlnaHQiLHRydWUsZmFsc2VdLFsiSWdub2JsZSBTYWNyaWZpY2UiLHRydWUsZmFsc2VdLFsiSW4gRXZlcnkgU2hhZG93IixmYWxzZSxmYWxzZV0sWyJJbmZlc3RhdGlvbiIsdHJ1ZSxmYWxzZV0sWyJJbml0aWF0aW9uIix0cnVlLGZhbHNlXSxbIkludG8gVGhlIFNoYWRvd3MiLGZhbHNlLGZhbHNlXSxbIk1vdXRocyBUbyBGZWVkIix0cnVlLGZhbHNlXSxbIlN1bW1vbiAtIFZlcm1pbm91cyIsZmFsc2UsZmFsc2VdXSwibnVtYmVyIjoiNyJ9LCJtb25zdGVyVHJhaXRzIjp7ImRhcmsiOiJkYXJrIn0sImV4cGFuc2lvbnMiOnsic2Vjb25kZWRpdGlvbmJhc2VnYW1lIjoic2Vjb25kZWRpdGlvbmJhc2VnYW1lIiwiYm9uZHNvZnRoZXdpbGQiOiJib25kc29mdGhld2lsZCIsImNyb3dub2ZkZXN0aW55IjoiY3Jvd25vZmRlc3RpbnkiLCJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iOiJjcnVzYWRlb2Z0aGVmb3Jnb3R0ZW4iLCJndWFyZGlhbnNvZmRlZXBoYWxsIjoiZ3VhcmRpYW5zb2ZkZWVwaGFsbCIsImxhYnlyaW50aG9mcnVpbiI6ImxhYnlyaW50aG9mcnVpbiIsImxhaXJvZnRoZXd5cm0iOiJsYWlyb2Z0aGV3eXJtIiwibWFub3JvZnJhdmVucyI6Im1hbm9yb2ZyYXZlbnMiLCJvYXRob2Z0aGVvdXRjYXN0Ijoib2F0aG9mdGhlb3V0Y2FzdCIsInNoYXJkc29mZXZlcmRhcmsiOiJzaGFyZHNvZmV2ZXJkYXJrIiwic2hhZG93b2ZuYXJla2hhbGwiOiJzaGFkb3dvZm5hcmVraGFsbCIsInN0ZXdhcmRzb2Z0aGVzZWNyZXQiOiJzdGV3YXJkc29mdGhlc2VjcmV0IiwidGhldHJvbGxmZW5zIjoidGhldHJvbGxmZW5zIiwidHJlYXR5b2ZjaGFtcGlvbnMiOiJ0cmVhdHlvZmNoYW1waW9ucyIsInZpc2lvbnNvZmRhd24iOiJ2aXNpb25zb2ZkYXduIiwiY29udmVyc2lvbmtpdCI6ImNvbnZlcnNpb25raXQiLCJtaXN0c29mYmlsZWhhbGwiOiJtaXN0c29mYmlsZWhhbGwiLCJjaGFpbnN0aGF0cnVzdCI6ImNoYWluc3RoYXRydXN0In19"],
	['HM','BotW - One Mans Trash', "#eyJtb25zdGVycyI6W3sidGl0bGUiOiJLb2JvbGQiLCJtYXN0ZXIiOnRydWUsIngiOiI5IiwieSI6IjYiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiS29ib2xkIiwibWFzdGVyIjp0cnVlLCJ4IjoiOSIsInkiOiI2IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IktvYm9sZCIsIm1hc3RlciI6dHJ1ZSwieCI6IjkiLCJ5IjoiNiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI1IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJIZWxsaG91bmQiLCJtYXN0ZXIiOnRydWUsIngiOiIzIiwieSI6IjAiLCJ2ZXJ0aWNhbCI6dHJ1ZSwiaHAiOiI2IiwiY29uZGl0aW9ucyI6e319LHsidGl0bGUiOiJIZWxsaG91bmQiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMyIsInkiOiIwIiwidmVydGljYWwiOnRydWUsImhwIjoiNCIsImNvbmRpdGlvbnMiOnt9fSx7InRpdGxlIjoiSGVsbGhvdW5kIiwibWFzdGVyIjpmYWxzZSwieCI6IjMiLCJ5IjoiMCIsInZlcnRpY2FsIjp0cnVlLCJocCI6IjQiLCJjb25kaXRpb25zIjp7fX0seyJ0aXRsZSI6IkhlbGxob3VuZCIsIm1hc3RlciI6ZmFsc2UsIngiOiIzIiwieSI6IjAiLCJ2ZXJ0aWNhbCI6dHJ1ZSwiaHAiOiI0IiwiY29uZGl0aW9ucyI6e319XSwiaGVybzEiOnsidGl0bGUiOiJBbHlzIFJhaW5lIiwieCI6IjEiLCJ5IjoiMSIsImhwIjoiMTIiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6Ik1hcnNoYWwiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQnkgVGhlIEJvb2siLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkNydXNoaW5nIEJsb3ciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkkgQW0gVGhlIExhdyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSnVzdCBSZXdhcmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkxhc3QgU3RhbmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJldHJpYnV0aW9uIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlNob2Nrd2F2ZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiVmlnaWxhbnQgV2F0Y2giLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlplYWxvdXMgRmlyZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiV2FyIEhhbW1lciIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiU2lnbmV0IFJpbmciLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6e319LCJoZXJvMiI6eyJ0aXRsZSI6IkF2cmljIEFsYnJpZ2h0IiwieCI6IjEiLCJ5IjoiMSIsImhwIjoiMTIiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkRpc2NpcGxlIiwiZmVhdFVzZWQiOnRydWUsInNraWxscyI6W1siQXJtb3IgT2YgRmFpdGgiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJsZXNzZWQgU3RyaWtlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJDbGVhbnNpbmcgVG91Y2giLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRpdmluZSBGdXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJIb2x5IFBvd2VyIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJQcmF5ZXIgT2YgSGVhbGluZyIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJQcmF5ZXIgT2YgUGVhY2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJhZGlhbnQgTGlnaHQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlRpbWUgT2YgTmVlZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6Iklyb24gTWFjZSIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sImhlcm8zIjp7InRpdGxlIjoiSmFpbiBGYWlyd29vZCIsIngiOiIxIiwieSI6IjEiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IlRyZWFzdXJlIEh1bnRlciIsImZlYXRVc2VkIjpmYWxzZSwic2tpbGxzIjpbWyJEZWx2ZXIiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRHVuZ2VvbmVlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRmluZGVycyBLZWVwZXJzIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJHb2xkIFJ1c2giLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkd1YXJkIFRoZSBTcG9pbHMiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkx1cmUgT2YgRm9ydHVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU2xlaWdodCBPZiBIYW5kIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTdXJ2ZXkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlRyYWlsIE9mIFJpY2hlcyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkxlYXRoZXIgV2hpcCIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiVGhlIERlYWQgTWFucyBDb21wYXNzIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOnt9fSwiaGVybzQiOnsidGl0bGUiOiJDb3JiaW4iLCJ4IjoiMSIsInkiOiIxIiwiaHAiOiIxMiIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiQmVyc2Vya2VyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkV4ZWN1dGUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRlYXRoIFJhZ2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIldoaXJsd2luZCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiV2VhcG9uIE1hc3RlcnkiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkNoYXJnZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ3JpcHBsZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ291bnRlciBBdHRhY2siLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQnJ1dGUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIlJhZ2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkNoaXBwZWQgR3JlYXRheGUiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjp7fX0sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI0IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjMiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJBIiwieCI6IjExIiwieSI6IjYiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIxIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIxOCIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjAiLCJ5IjoiNiIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiI5IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTciLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjEzIiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W10sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTEiLCJ5IjoiMiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMyIsInkiOiI4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTMiLCJ5IjoiMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE2IiwieSI6IjEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNSIsInkiOiIzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTIiLCJ5IjoiNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE2IiwieSI6IjUifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNiIsInkiOiI4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTMiLCJ5IjoiOSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE1IiwieSI6IjEwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiMTIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNCIsInkiOiIxMiJ9XSwib3ZlcmxvcmQiOnsiY2FyZHMiOltdfSwibGlldXRlbmFudHMiOltdLCJhY3RPbmUiOnRydWUsIm1hcFdpZHRoIjo0MCwibWFwSGVpZ2h0Ijo1MCwicXVlc3RPYmplY3RpdmVzIjp7Imhlcm9lc1ZpY3RvcnkiOiJJZiB0aGVyZSBhcmUgbm8gQmFyZ2hlc3RzIG9uIHRoZSBtYXAiLCJvdmVsb3JkVmljdG9yeSI6IklmIHRoZXJlIGFyZSA3IGZhdGlndWUgdG9rZW5zIGluIHRoZSBvdmVybG9yZCdzIHBsYXkgYXJlYSIsImN1cnJlbnRTdGF0dXMiOiIiLCJyZWluZm9yY2VtZW50cyI6IkF0IHRoZSBlbmQgb2YgZWFjaCBvdmVybG9yZCB0dXJuLCB0aGUgb3ZlcmxvcmQgbWF5IHBsYWNlXG51cCB0byAyIGdvYmxpbiBhcmNoZXJzIG9uIHRoZSBMYWlyLCByZXNwZWN0aW5nIGdyb3VwIGxpbWl0cy4ifSwicGxvdCI6eyJ0aXRsZSI6IkN1cnNlZCBCeSBQb3dlciIsImNhcmRzIjpbWyJCb2x0IEZyb20gVGhlIEJsdWUiLGZhbHNlLGZhbHNlXSxbIkNhYmFsIixmYWxzZSxmYWxzZV0sWyJEYXJrIFBhY3QiLHRydWUsZmFsc2VdLFsiRnJpZW5kcyBJbiBIaWdoIFBsYWNlcyIsZmFsc2UsZmFsc2VdLFsiTWFzcXVlcyIsZmFsc2UsZmFsc2VdLFsiTXlzdGljIE1pZ2h0IixmYWxzZSxmYWxzZV0sWyJTdW1tb24gLSBNZXJpY2siLGZhbHNlLGZhbHNlXSxbIlRoYXVtYXR1cmd5IixmYWxzZSxmYWxzZV0sWyJUaGUgRGFyayBNYXJrIixmYWxzZSxmYWxzZV0sWyJUaGUgR3Jhc3BpbmcgR3JhdmUiLGZhbHNlLGZhbHNlXV0sIm51bWJlciI6IjEifSwibW9uc3RlclRyYWl0cyI6eyJidWlsZGluZyI6ImJ1aWxkaW5nIiwiY2F2ZSI6ImNhdmUiLCJjaXZpbGl6ZWQiOiJjaXZpbGl6ZWQiLCJjb2xkIjoiY29sZCIsImN1cnNlZCI6ImN1cnNlZCIsImRhcmsiOiJkYXJrIiwiaG90IjoiaG90IiwibW91bnRhaW4iOiJtb3VudGFpbiIsIndhdGVyIjoid2F0ZXIiLCJ3aWxkZXJuZXNzIjoid2lsZGVybmVzcyJ9LCJleHBhbnNpb25zIjp7InNlY29uZGVkaXRpb25iYXNlZ2FtZSI6InNlY29uZGVkaXRpb25iYXNlZ2FtZSIsImJvbmRzb2Z0aGV3aWxkIjoiYm9uZHNvZnRoZXdpbGQiLCJjcm93bm9mZGVzdGlueSI6ImNyb3dub2ZkZXN0aW55IiwiY3J1c2FkZW9mdGhlZm9yZ290dGVuIjoiY3J1c2FkZW9mdGhlZm9yZ290dGVuIiwiZ3VhcmRpYW5zb2ZkZWVwaGFsbCI6Imd1YXJkaWFuc29mZGVlcGhhbGwiLCJsYWJ5cmludGhvZnJ1aW4iOiJsYWJ5cmludGhvZnJ1aW4iLCJsYWlyb2Z0aGV3eXJtIjoibGFpcm9mdGhld3lybSIsIm1hbm9yb2ZyYXZlbnMiOiJtYW5vcm9mcmF2ZW5zIiwib2F0aG9mdGhlb3V0Y2FzdCI6Im9hdGhvZnRoZW91dGNhc3QiLCJzaGFyZHNvZmV2ZXJkYXJrIjoic2hhcmRzb2ZldmVyZGFyayIsInNoYWRvd29mbmFyZWtoYWxsIjoic2hhZG93b2ZuYXJla2hhbGwiLCJzdGV3YXJkc29mdGhlc2VjcmV0Ijoic3Rld2FyZHNvZnRoZXNlY3JldCIsInRoZXRyb2xsZmVucyI6InRoZXRyb2xsZmVucyIsInRyZWF0eW9mY2hhbXBpb25zIjoidHJlYXR5b2ZjaGFtcGlvbnMiLCJ2aXNpb25zb2ZkYXduIjoidmlzaW9uc29mZGF3biIsImNvbnZlcnNpb25raXQiOiJjb252ZXJzaW9ua2l0IiwibWlzdHNvZmJpbGVoYWxsIjoibWlzdHNvZmJpbGVoYWxsIiwiY2hhaW5zdGhhdHJ1c3QiOiJjaGFpbnN0aGF0cnVzdCJ9fQ=="],
];

var mapWidth = 40;
var mapHeight = 50;

var monsterList = [];
var mapObjects = [];
//var conditionsToShow = {};

var overlordRelicNumber = 0;
