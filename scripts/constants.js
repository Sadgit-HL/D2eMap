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
	['Crypt Dragon',2,3,true,GoD,[Dark,Cursed],true],
	['Crow Hag',1,1,true,ToC,[Dark,Civilized],true],
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
	['Zombie',1,1,false,bg2e,[Cursed,Building],true]
];

var EXPANSIONS = [bg2e, BoW, CoD, CotF, GoD, LoR, LoW, MoR, OotO, SoE, SoN, SotS, TF, ToC, VoD, CK, MoB, CtR];
var selectedExpansions = {};
for (var i=0; i < EXPANSIONS.length; i++) {
	selectedExpansions[folderize(EXPANSIONS[i])] = folderize(EXPANSIONS[i]);
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
	['Mirklace', true, 2, 2],
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
	['Crypt Dragon',5,7,7,10],
	['Crow Hag',5,7,7,9],
	['Dark Priest',2,5,7,9],
	['Deep Elf',7,9,8,10],
	['Deep Elf CK',7,9,8,10],
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
	['Hellhound CK',3,6,5,8],
	['Hybrid Sentinel',5,8,6,9],
	['Ice Wyrm',7,9,11,14],
	['Ironbound',8,10,10,12],
	['Kobold',2,5,4,7],
	['Kobold CK',2,4,4,6],
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
	['Zombie',3,6,5,9]
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
		['Rehersal', 2],
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
	['Jonas the Kind',10,4,sup]
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

FAMILIARS_LIST = [
	['Brightblaze',true],
	['Image',false],
	['Kata',false],
	['Mata',false],
	['Pico',true],
	['Raven Flock',true],
	['Reanimate',true],
	['Scourge',true],
	['Shadow Soul',true],
	['Skye',true],
	['Summoned Stone',true],
	['Trap',false],
	['Wolf',true],
	['Villager Female',false],
	['Villager Male',false],
	['Desmond',true]
];

ALLIES_LIST = [
	'Serena',
	'Raythen'
];

ALLIES_SKILLS = {};
ALLIES_SKILLS['Serena'] = ['Aura Of Might', 'Healing Aura', 'Holy Hammer'];
ALLIES_SKILLS['Raythen'] = ['Back Strike', 'Night Prowler', 'Sharp Eyes'];

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
	'Purple',
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

OVERLORD_CARDS_LIST = [
	['Critical Blow', 'basic', 1],
	['Dark Charm', 'basic', 1],
	['Dark Fortune', 'basic', 2],
	['Dark Might', 'basic', 2],
	['Dash', 'basic', 2],
	['Frenzy', 'basic', 2],
	['Pit Trap', 'basic', 1],
	['Poison Dart', 'basic', 1],
	['Tripwire', 'basic', 2],
	['Word Of Misery', 'basic', 1],
	['Befuddle', 'basic2', 2],
	['Blinding Speed', 'basic2', 2],
	['Dirty Fighting', 'basic2', 2],
	['Flurry', 'basic2', 1],
	['Grease Trap', 'basic2', 1],
	['Mental Error', 'basic2', 1],
	['Mimic', 'basic2', 1],
	['Overwhelm', 'basic2', 1],
	['Reflective Ward', 'basic2', 1],
	['Sign Of Weakness', 'basic2', 1],
	['Uncontrolled Power', 'basic2', 2],
	['Adaptive Contagion', 'infector', 1],
	['Airborne', 'infector', 1],
	['Contaminated', 'infector', 1],
	['Dark Host', 'infector', 1],
	['Outbreak', 'infector', 1],
	['Tainted Blow', 'infector', 1],
	['Virulent Infection', 'infector', 1],
	['Diabolic Power', 'magus', 1],
	['Rise Again', 'magus', 1],
	['Unholy Ritual', 'magus', 1],
	['Word Of Despair', 'magus', 1],
	['Word Of Pain', 'magus', 1],
	['Offertory Affliction', 'overlord_reward', 1],
	['Secrets Of Flesh', 'overlord_reward', 1],
	['Toxic Reprisal', 'overlord_reward', 1],
	['Blood Bargaining', 'punisher', 1],
	['Exploit Weakness', 'punisher', 1],
	['No Rest For The Wicked', 'punisher', 1],
	['Price Of Prevention', 'punisher', 1],
	['Trading Pains', 'punisher', 1],
	['Spligs Revenge', 'quest_reward', 1],
	['Twin Souls', 'quest_reward', 1],
	['The Wyrm Queens Favor', 'rumor_reward', 1],
	['Curse Of The Monkey God', 'saboteur', 1],
	['Explosive Runes', 'saboteur', 1],
	['Uthuk Demon Trap', 'saboteur', 1],
	['Web Trap', 'saboteur', 1],
	['Wicked Laughter', 'saboteur', 1],
	['Dark Remedy', 'universal', 2],
	['Dark Resilience', 'universal', 2],
	['Placebo', 'universal', 1],
	['Plan Ahead', 'universal', 1],
	['Refresh', 'universal', 1],
	['Schemes', 'universal', 1],
	['Solidarity', 'universal', 1],
	['Upgrade', 'universal', 1],
	['Diverse Means', 'universal', 1],
	['Blood Lust', 'warlord', 1],
	['Blood Rage', 'warlord', 2],
	['Dark Fortitude', 'warlord', 1],
	['Expert Blow', 'warlord', 1],
	['Reinforce', 'warlord', 1],
	['Down And Out', 'rumor_reward', 1],
	['Beneath The Shadow', 'unkindness', 1],
	['Beware', 'unkindness', 1],
	['Call Of The Ravens', 'unkindness', 1],
	['Feast', 'unkindness', 1],
	['Ill Omen', 'unkindness', 1],
	['Imitation', 'unkindness', 1],
	['Sudden Flurry', 'unkindness', 1],
	['Envelop', 'unkindness', 1],
	['Imploding Rift', 'shadowmancer', 1],
	['Mistrust', 'shadowmancer', 1],
	['Shadow Of Doubt', 'shadowmancer', 1],
	['Out Of Darkness', 'shadowmancer', 1],
	['Black Out', 'shadowmancer', 1],
	['Shadow Walk', 'shadowmancer', 1],
	['Treacherous Shadows', 'shadowmancer', 1],
	['Dragonbone Pendant', 'enchanter', 1],
	['Rings Of ZholAlam', 'enchanter', 1],
	['Elixir Of Stone', 'enchanter', 1],
	['Wristlet Of Wind', 'enchanter', 1],
	['Ward Of Peace', 'enchanter', 1],
	['Rune Of The Phoenix', 'enchanter', 1],
	['Sign Of The Last Zenith', 'enchanter', 1],
	['Dance Macabre', 'soulbinder', 1],
	['Dark Silhouette', 'soulbinder', 1],
	['Grotesque', 'soulbinder', 1],
	['Haunted Steps', 'soulbinder', 1],
	['Possessive', 'soulbinder', 1],
	['Restless Spirit', 'soulbinder', 1],
	['Ties That Bind', 'soulbinder', 1],
	['Unblinking', 'soulbinder', 1]
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
		['Summon - Mirklace',3,2],
		['Taste Of The Forbidden',2,0],
		['Ynfernael Bonds',2,1]]],
	['Cursed By Power', [
		['Bolt From The Blue',3,1],
		['Cabal',4,1],
		['Dark Pact',0,0],
		['Friends In High Places',2,1],
		['Masques',2,1],
		['Mystic Might',3,1],
		['Summon - Merick',3,2],
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
		['Summon - Ariad',3,2],
		['Tainted Blood',1,1],
		['The Ritual Continues',4,0]]],
	['Dragons Greed', [
		['Aurim Plating',3,2],
		['Guardians Of The Hoard',4,0],
		['Iron-Hard Scales',2,1],
		['Jealous Rage',3,2],
		['Massive Bulk',3,1],
		['Mine All Mine',0,0],
		['Punish The Weak',3,1],
		['Summon - Valyndra',3,2],
		['Terrifying Presence',2,1],
		['Valyndras Shadow',4,1]]],
	['Endless Thirst', [
		['Bad Dreams',1,1],
		['Bloodline',0,0],
		['Fangs In The Dark',2,1],
		['Nights Embrace',2,1],
		['Nighttime Hunt',3,1],
		['Scent Of Blood',3,1],
		['Summon - Eliza',3,2],
		['The Ladys Care',3,1],
		['The Power Of Blood',2,1],
		['The Taste Of Suffering',3,1]]],
	['Goblin Uprising', [
		['Dive Into Cover',3,1],
		['Emergency Rations',2,1],
		['Feral Instincts',2,1],
		['Goblin Ambush',3,1],
		['Meat Shield',2,1],
		['Overfed',2,1],
		['Raided Armory',4,2],
		['Scavenge',4,1],
		['Spirited Retreat',0,1],
		['Summon - Splig',3,2]]],
	['Hybrid Loyalty', [
		['Bribery',2,2],
		['Cut A Deal',2,0],
		['Dual Training',0,1],
		['End It!',2,1],
		['Fight With Honor',2,0],
		['Hazard Pay',4,0],
		['Make Our Own Luck',2,1],
		['Resourceful',3,1],
		['Show Of Force',2,1],
		['Summon - Belthir',2,3]]],
	['Inner Corruption', [
		['Deceitful Scribe',3,0],
		['False Informant',3,0],
		['Friend Or Foe',0,1],
		['Mages Guild',4,1],
		['Merchants Guild',2,0],
		['One Of Us',3,2],
		['Shadow Council',2,1],
		['Summon - Rylan',3,2],
		['Thieves Guild',2,1],
		['Traitorous Friend',3,1]]],
	['Raging Infection', [
		['Afflication Aura',2,2],
		['Envenom',2,1],
		['Fetid Stench',2,1],
		['Infected',2,1],
		['Mass Mutation',2,1],
		['Plague Release',0,1],
		['Summon - Bolgoreth',3,2],
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
		['Summon - Zachareth',3,2],
		['Trouble On The Road',3,2],
		['Two-Pronged Gambit',2,1]]],
	['Silent Protector', [
		['Brethren',0,1],
		['Curative Spirit',2,1],
		['Diplomatic',1,1],
		['Oath Of Silense',3,1],
		['Pacify',2,1],
		['Pity The Weak',2,1],
		['Power In Mourning',3,1],
		['Shared Burdens',3,1],
		['Summon - Serena',3,2],
		['Travelers Rest',3,2]]],
	['Skullduggery', [
		['Bait And Switch',3,2],
		['Concealment',2,0],
		['Covetous',2,1],
		['Cursed Treasure',3,0],
		['Distraction',2,2],
		['Foiled Again',2,1],
		['Guarded Treasure',3,0],
		['Petty Theft',0,1],
		['Slippery',2,1],
		['Summon - Raythen',3,2]]],
	['Tangled Web', [
		['Embrace Darkness',2,1],
		['Entangling Weave',2,1],
		['Feral Instincts',1,1],
		['Hidden Predator',2,1],
		['Natural Camouflage',0,1],
		['Savage Exploitation',4,2],
		['Solitary Prey',3,1],
		['Summon - Queen Ariad',3,2],
		['Unsafe Passage',2,2],
		['Web Of Deception',2,1]]],
	['The Fallen Elite', [
		['Armor Of Darkness',0,1],
		['Dark Champions',3,3],
		['Elite Guard',3,1],
		['Fight In Formation',2,1],
		['Knight Training',3,1],
		['Refuse To Die',4,3],
		['Summon - Alric',3,2],
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
		['Summon - Verminous',3,2]]],
	['Unstable Forces', [
		['Descend To Maddness',3,1],
		['Explosive Fall',2,1],
		['Love Of Chaos',3,1],
		['Mortal Coil',2,2],
		['Onslaught',3,2],
		['Pariah',2,0],
		['Power And Sacrifice',3,0],
		['Soul Ensnare',3,1],
		['Summon - Tristayne',3,2],
		['Wild Energy',0,0]]]
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

var MAP_HASES_LIST = [
	['2e - First Blood', "eyJ0aWxlcyI6W3sidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiI1IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbXSwieHMiOltdfQ=="],
	['2e - Fat Goblin - encounter 1', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiNiIsInkiOiI4In0seyJ0aXRsZSI6IjF4MSIsIngiOiI3IiwieSI6IjgifV0sInRpbGVzIjpbeyJ0aXRsZSI6IjIwIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE4Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjExIiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiUmVkIiwieCI6IjUiLCJ5IjoiNyJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiNSIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiI4IiwieSI6IjQifSx7InRpdGxlIjoiUmVkIiwieCI6IjgiLCJ5IjoiNyJ9XX0="],
	['2e - Fat Goblin - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTUiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMSIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI3IiwieSI6IjgifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEyIiwieSI6IjcifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiOCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiNyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjYifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiI3In1dfQ=="],
	['2e - Castle Daerion - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNyIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyIiwieSI6IjUifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI5In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjExIiwieSI6IjExIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiI3IiwieSI6IjIifSx7InRpdGxlIjoiUmVkIiwieCI6IjIiLCJ5IjoiMTIifSx7InRpdGxlIjoiUmVkIiwieCI6IjExIiwieSI6IjkifSx7InRpdGxlIjoiUmVkIiwieCI6IjE1IiwieSI6IjE2In1dfQ=="],
	['2e - Castle Daerion - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjEiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxOCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMTEiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJXaGl0ZSIsIngiOiIzIiwieSI6IjciLCJocCI6IjI1In1dfQ=="],
	['2e - Cardinals Plight - encounter 1', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxNCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTIiLCJ5IjoiNCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJSZWQiLCJ4IjoiMTQiLCJ5IjoiNCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTQiLCJ5IjoiNyJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTYiLCJ5IjoiNCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTYiLCJ5IjoiNyJ9XX0='],
	['2e - Cardinals Plight - encounter 2', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNiIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEwIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE4IiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxNyIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTkiLCJ5IjoiMTMiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiOCJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiI1IiwieSI6IjEwIn0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEyIiwieSI6IjEzIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IldoaXRlIiwieCI6IjkiLCJ5IjoiOSJ9XX0='],
	['2e - The Masquerade Ball - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiIxIiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI5IiwieSI6IjEifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjkiLCJ5IjoiNSJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjYiLCJ5IjoiNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjExIiwieSI6IjMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiI0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiNyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjExIiwieSI6IjgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNSIsInkiOiIzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiNCJ9XX0="],
	['2e - The Masquerade Ball - encounter 2', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIzIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjQiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIxOCIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxOSIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjAiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIxNyIsInkiOiIyIiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI2IiwieSI6IjIifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMyIsInkiOiI2In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjE3IiwieSI6IjYifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE5IiwieSI6IjQifSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTgiLCJ5IjoiMSJ9XSwib2JqZWN0aXZlcyI6W119'],
	['2e - Death on the Wing - encounter 1', "eyJ0aWxlcyI6W3sidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIwIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjAiLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W10sInhzIjpbXX0="],
	['2e - Death on the Wing - encounter 2', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjciLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTkiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W119'],
	['2e - The Shadow Vault - interlude', 'eyJ4cyI6W3sidGl0bGUiOiIyeDIiLCJ4IjoiMyIsInkiOiIxIn1dLCJ0aWxlcyI6W3sidGl0bGUiOiI0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjAiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjYiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIxMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjMwIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMTIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyOSIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjE1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjE2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxOCIsInkiOiIyMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjE5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTciLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxOCIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE4IiwieSI6IjI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQSIsIngiOiIxOSIsInkiOiIyNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiIyNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMjMiLCJ5IjoiMjYiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJBIiwieCI6IjIwIiwieSI6IjI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiIzNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNyIsInNpZGUiOiJBIiwieCI6IjE4IiwieSI6IjMxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMSIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjMwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMzMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMzMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMzgiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI2IiwieSI6IjEwIn0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMyIsInkiOiIxNiJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJSZWQiLCJ4IjoiNyIsInkiOiIzIn0seyJ0aXRsZSI6IlJlZCIsIngiOiI3IiwieSI6IjYifV19'],
	['2e - The Overlord Revealed - interlude', "eyJ0aWxlcyI6W3sidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiMjQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI1Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjMwIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjIxIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIxMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI4Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiMTciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjEiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24yeDIiLCJzaWRlIjoiQiIsIngiOiIxOCIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjYiLCJ5IjoiNCJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNyIsInkiOiIxMCJ9XSwieHMiOltdfQ=="],
	['LoR - Ruinous Whispers', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjM2Iiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiMTAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTIiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNyIsInkiOiIxIn0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNSIsInkiOiI4In1dfQ=="],
	['LoR - Gathering Foretold - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjM4Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNDMiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNDAiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiOSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIxNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyMSIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjExIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIyIiwieSI6IjExIiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTkiLCJ5IjoiMTMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMSJ9XX0="],
	['LoR - Gathering Foretold - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxNCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxOCIsInNpZGUiOiJBIiwieCI6IjExIiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI0MyIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI5IiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIxIiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI5IiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjExIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTIifV19"],
	['LoR - Honor Among Thieves - encounter 2', "eyJ0aWxlcyI6W3sidGl0bGUiOiI4Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzAiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjM4Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiU2hydWJiZXJ5IiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOSIsInkiOiI2In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMyIsInkiOiI2In0seyJ0aXRsZSI6IlNocnViYmVyeSIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjkiLCJ5IjoiMTQifV0sInhzIjpbeyJ0aXRsZSI6IjJ4MiIsIngiOiIxNSIsInkiOiI3In0seyJ0aXRsZSI6IjJ4MiIsIngiOiIzIiwieSI6IjEyIn1dfQ=="],
	['LoR - Barrow of Barris - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjQzIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI0MyIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTMiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIzOSIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxNCIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyIiwieSI6IjExIn1dfQ=="],
	['LoR - Barrow of Barris - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzgiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI5Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjMiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiMTIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjkiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjYiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxNCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI0IiwieSI6IjEwIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxNSIsInkiOiI3In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjE0IiwieSI6IjgifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE1IiwieSI6IjExIn1dLCJvYmplY3RpdmVzIjpbXX0="],
	['LoR - Fortune and Glory - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxOSIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjExIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiOSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjEzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjE1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE4Iiwic2lkZSI6IkIiLCJ4IjoiMjAiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiIyMSIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjIyIiwieSI6IjE3IiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI1IiwieSI6IjYifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiNyJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOCIsInkiOiIxMSJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMjEiLCJ5IjoiMTAifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiV2hpdGUiLCJ4IjoiMiIsInkiOiI4In0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjE1IiwieSI6IjE1In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNiIsInkiOiI1In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIyMyIsInkiOiIxNyJ9XX0="],
	['LoR - Fortune and Glory - encounter 2', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMiIsInkiOiIzIn0seyJ0aXRsZSI6IjF4MSIsIngiOiI4IiwieSI6IjE0In0seyJ0aXRsZSI6IjF4MSIsIngiOiIxNiIsInkiOiIxMyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMjEiLCJ5IjoiMyJ9XSwidGlsZXMiOlt7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzkiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjIwIiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjEiLCJ5IjoiMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjI0IiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNiIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjMiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEiLCJ5IjoiMyJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI3IiwieSI6IjEzIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxNSIsInkiOiIxMiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMjAiLCJ5IjoiMyJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjE1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOCIsInkiOiIxMiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMjMiLCJ5IjoiNCJ9XX0="],
	['LoR - Secrets In Stone - encounter 1', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMTAiLCJ5IjoiNyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTAiLCJ5IjoiOSJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTIiLCJ5IjoiNyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTIiLCJ5IjoiOSJ9XSwidGlsZXMiOlt7InRpdGxlIjoiNCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzciLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkEiLCJ4IjoiMTYiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjEwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjQyIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjEyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNDAiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTMiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjEwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjExIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiMTgiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMiIsInkiOiI1In0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjIiLCJ5IjoiMTMifSx7InRpdGxlIjoiV2hpdGUiLCJ4IjoiMTkiLCJ5IjoiMSJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTgiLCJ5IjoiMTgifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE2IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjMiLCJ5IjoiMTUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjE0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjQifV19"],
	['SoN - A demonstration', "eyJ4cyI6W3sidGl0bGUiOiIyeDIiLCJ4IjoiNSIsInkiOiI0In1dLCJ0aWxlcyI6W3sidGl0bGUiOiI1MCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2MSIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNjYiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1OCIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjciLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI2OCIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiMTEiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU5Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiNyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQiIsIngiOiIxNyIsInkiOiI5IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNCIsInkiOiIzIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiI3IiwieSI6IjMifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjQiLCJ5IjoiNiJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNyIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjYifV19"],
	['SoN - Prey', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBleGl0Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1NSIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGNvbm5lY3Rpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2OCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjY2Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNjAiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIxMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNjciLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjEzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBjb25uZWN0aW9uIDF4MiIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNTciLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNjQiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNTgiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGNvbm5lY3Rpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiNyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjU0Iiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIxNSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTMiLCJhbmdsZSI6IiJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjEyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiIxMiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOCIsInkiOiI4In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiI2IiwieSI6IjgifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjEyIiwieSI6IjQifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjQiLCJ5IjoiMTQifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjE2IiwieSI6IjExIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNSIsInkiOiIxIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNiIsInkiOiIxIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNCIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiMTUifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxOSIsInkiOiI5In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTkiLCJ5IjoiMTAifV19"],
	['SoN - The Incident', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjE4Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNiIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJDb2JibGUtc3RvbmUgRXh0ZW5zaW9uIDJ4MiIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1NiIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXhpdCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxOSIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIxNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1MyIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMTciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMTgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI5IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjE0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNyIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjYiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTQiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIxNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIxOCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTgiLCJ5IjoiMTkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1NCIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiI3IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjYiLCJ5IjoiMSIsIm9wZW5lZCI6ZmFsc2V9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxNCIsInkiOiIxIiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI4IiwieSI6IjExIiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIzIiwieSI6IjEyIiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI4IiwieSI6IjE3Iiwib3BlbmVkIjpmYWxzZX1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIzIiwieSI6IjMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjE1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI0IiwieSI6IjE4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMyIsInkiOiI3In0seyJ0aXRsZSI6IlJlZCIsIngiOiI1IiwieSI6IjcifSx7InRpdGxlIjoiUmVkIiwieCI6IjgiLCJ5IjoiOCJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiIxMSIsInkiOiI0In0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjExIiwieSI6IjUifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNiIsInkiOiIyIn0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjE2IiwieSI6IjkifSx7InRpdGxlIjoiV2hpdGUiLCJ4IjoiMTYiLCJ5IjoiMTAifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjExIiwieSI6IjEzIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMyIsInkiOiIxMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjgiLCJ5IjoiMTYifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNiIsInkiOiIxNiJ9XX0="],
	['SoN - The Rat-Thing King - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIxIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjAiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiI0IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTMiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI3IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNCIsInkiOiIwIn0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjUiLCJ5IjoiNCJ9LHsidGl0bGUiOiJXaGl0ZSIsIngiOiIxMiIsInkiOiIzIn0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjEyIiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiI4In1dfQ=="],
	['SoN - The Rat-Thing King - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjEiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1MiIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1MyIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIwIiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiMSJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiIxIn0seyJ0aXRsZSI6IlBvcnRjdWxsaXMiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjgiLCJ5IjoiNiJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJSZWQiLCJ4IjoiMTAiLCJ5IjoiNCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMTAiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMiIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiIwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNSIsInkiOiI1In1dfQ=="],
	['SoN - Respected Citizen - encounter 1', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMjIiLCJ5IjoiNSJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMjIiLCJ5IjoiNCJ9XSwidGlsZXMiOlt7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjIiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjU4Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNjQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNjgiLCJzaWRlIjoiQSIsIngiOiIxOSIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTkiLCJzaWRlIjoiQSIsIngiOiIxNyIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyMiIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNjEiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI0IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2MyIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiI4IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNjUiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiI4IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMiIsInkiOiIwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI5IiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE1IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIwIiwieSI6IjYifV19"],
	['SoN - Price of Power - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjYyIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1OSIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1NCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1NyIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI2MSIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjU4Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiI5IiwieSI6IjEwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNjYiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXhpdCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjEyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiIxMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiNSJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMiIsInkiOiI5In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjgiLCJ5IjoiNiJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiOSJ9LHsidGl0bGUiOiJXaGl0ZSIsIngiOiIxIiwieSI6IjQifSx7InRpdGxlIjoiV2hpdGUiLCJ4IjoiMSIsInkiOiI1In0seyJ0aXRsZSI6IlJlZCIsIngiOiIyIiwieSI6IjQifSx7InRpdGxlIjoiUmVkIiwieCI6IjIiLCJ5IjoiNSJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMyIsInkiOiI0In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIzIiwieSI6IjUifSx7InRpdGxlIjoiR3JlZW4iLCJ4IjoiNCIsInkiOiI0In0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjQiLCJ5IjoiNSJ9XX0="],
	['SoN - Price of Power - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjU3Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXhpdCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU5Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMTMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI2MiIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiVW5rbm93biIsIngiOiIzIiwieSI6IjAiLCJocCI6IjIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiIxMCIsImhwIjoiMiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjQiLCJ5IjoiMTQiLCJocCI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjMiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiI0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI4IiwieSI6IjE0In1dfQ=="],
	['SoN - Without Mercy', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjgiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1MiIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjE1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIxNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjE4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiI5IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI2IiwieSI6IjQifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNCIsInkiOiI1In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjMiLCJ5IjoiMTAifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiOSJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNiIsInkiOiIxMyJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNiIsInkiOiIxNiJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTciLCJ5IjoiMTYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMTcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNiIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjYiLCJ5IjoiMTcifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI2IiwieSI6IjIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiIyMCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjgiLCJ5IjoiMjAifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI5IiwieSI6IjIwIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMSIsInkiOiIxOCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMTEiLCJ5IjoiMTkifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjE0IiwieSI6IjE4In0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjkiLCJ5IjoiMTUifV19"],
	['SoN - Local Politics - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQSIsIngiOiI0IiwieSI6IjMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNyIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjExIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI0IiwieSI6IjEzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUyIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjE1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI0IiwieSI6IjE4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTMiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjciLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjE1IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIzIiwieSI6IjcifSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiMTEifSx7InRpdGxlIjoiUG9ydGN1bGxpcyIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTIiLCJ5IjoiMTMifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjMiLCJ5IjoiNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNyIsInkiOiIxMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiIxOCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTIiLCJ5IjoiMTEifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjciLCJ5IjoiOCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNyIsInkiOiI5In1dfQ=="],
	['SoN - Local Politics - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1NiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI2MiIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUxIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNTgiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU1Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2OSIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXhpdCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjciLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgY29ubmVjdGlvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiI5IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjU0Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIxMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4dGVuc2lvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGNvbm5lY3Rpb24gMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjE2IiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI1IiwieSI6IjMifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjIiLCJ5IjoiNiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOCIsInkiOiI2In0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI4IiwieSI6IjEwIn0seyJ0aXRsZSI6IlBvcnRjdWxsaXMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxNCIsInkiOiI5In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIzIiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjciLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNyIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTYiLCJ5IjoiNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiIxMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjgiLCJ5IjoiMTIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI4IiwieSI6IjEzIn1dfQ=="],
	['SoN - Traitors Among Us', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1OCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTciLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNjgiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUxIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjU5Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgY29ubmVjdGlvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUyIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiIxNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMTgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIyNCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJQb3J0Y3VsbGlzIiwidmVydGljYWwiOnRydWUsIngiOiIyIiwieSI6IjYifSx7InRpdGxlIjoiUG9ydGN1bGxpcyIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiOCIsInkiOiI3In0seyJ0aXRsZSI6IlBvcnRjdWxsaXMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI0IiwieSI6IjE1In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyIiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiMTkifSx7InRpdGxlIjoiUmVkIiwieCI6IjYiLCJ5IjoiMSJ9XX0="],
	['SoN - Overdue Demise', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBleGl0Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNjEiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI2NCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgY29ubmVjdGlvbiAxeDIiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjE3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjEwIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNjMiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1OCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMTMiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIxOSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNTUiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiIxNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiIxNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiIxOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBjb25uZWN0aW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIyMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIyNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiIyNSIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMiIsInkiOiIxMiJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMiIsInkiOiIxNiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiIxOCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjMiLCJ5IjoiNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI5IiwieSI6IjE2In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMiIsInkiOiIxNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjMiLCJ5IjoiMjIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiIyNyJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiI3IiwieSI6IjIwIn0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjciLCJ5IjoiMjEifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjEzIiwieSI6IjIzIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxNCIsInkiOiIyMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTEiLCJ5IjoiMjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjciLCJ5IjoiMjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMTMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEwIiwieSI6IjgifSx7InRpdGxlIjoiV2hpdGUiLCJ4IjoiNyIsInkiOiIyMSJ9XX0="],
	['SoN - Into the Dark - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1NCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJQb3J0YWwgRXh0ZW5zaW9uIDJ4MiIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjYzIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIxMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI2NiIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNjEiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiIwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNjIiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJBIiwieCI6IjIwIiwieSI6IjMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQSIsIngiOiIyNiIsInkiOiIzIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTgiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiI3IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyNiIsInkiOiI4IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMiIsInkiOiI1In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyMSIsInkiOiI2In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjIifSx7InRpdGxlIjoiR3JlZW4iLCJ4IjoiNyIsInkiOiI1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNyIsInkiOiI4In0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjE0IiwieSI6IjEwIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiIyIn0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjE4IiwieSI6IjAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE5IiwieSI6IjkifSx7InRpdGxlIjoiR3JlZW4iLCJ4IjoiMjYiLCJ5IjoiOSJ9XX0="],
	['SoN - Into the Dark - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBleGl0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjYwIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNTgiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjExIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjYyIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI2MyIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1MSIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjYiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgY29ubmVjdGlvbiAxeDIiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTMiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MiIsInNpZGUiOiJCIiwieCI6IjE5IiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjAiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjI0IiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjU5Iiwic2lkZSI6IkEiLCJ4IjoiMTkiLCJ5IjoiNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyNCIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjIwIiwieSI6IjEyIiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMTQiLCJ5IjoiNSJ9LHsidGl0bGUiOiJQb3J0Y3VsbGlzIiwidmVydGljYWwiOnRydWUsIngiOiIxOCIsInkiOiI3In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiIxMiIsInkiOiIxMyJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMjQiLCJ5IjoiMyJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiIyMiIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMjAiLCJ5IjoiNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMjQiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTIiLCJ5IjoiOSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiIxMyJ9XX0="],
	['SoN - Lost - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI2MyIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU1Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNTEiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjYiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjEyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI2NiIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMTMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI2MiIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1NyIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjEyIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMTciLCJ5IjoiMTYiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlBvcnRjdWxsaXMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI1IiwieSI6IjExIn0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEyIiwieSI6IjEyIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiIxNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIxNCJ9XX0="],
	['SoN - Lost - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjU1Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI1MCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1OSIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjE1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUxIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIxNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjU2Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZW5kIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxMSIsImFuZ2xlIjoiOTAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjEiLCJ5IjoiMiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjExIiwieSI6IjIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI4IiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMyIsInkiOiIxNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMTEifV19"],
	['Son - The City Falls', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjU0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1MCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1NiIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJQb3J0YWwgRXh0ZW5zaW9uIDJ4MiIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiUG9ydGFsIEV4dGVuc2lvbiAyeDIiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNjciLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjYzIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI4IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1OSIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjYwIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiIxMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU4Iiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiIxMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBleHRlbnNpb24gMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiMTEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNTciLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjY1Iiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxNyIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNTUiLCJzaWRlIjoiQSIsIngiOiIxNSIsInkiOiIxMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIyMSIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjYyIiwic2lkZSI6IkEiLCJ4IjoiMTciLCJ5IjoiMTUiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlBvcnRjdWxsaXMiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxIiwieSI6IjYifSx7InRpdGxlIjoiUG9ydGN1bGxpcyIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjYiLCJ5IjoiNyJ9LHsidGl0bGUiOiJQb3J0Y3VsbGlzIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMTIiLCJ5IjoiNSJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMiIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjE2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOSIsInkiOiIxMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEiLCJ5IjoiMTAifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI4IiwieSI6IjEzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiNyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE4IiwieSI6IjE2In1dfQ=="],
	['MoR - Spread Your Wings', "eyJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxMCJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxNSJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI2IiwieSI6IjE1In1dLCJ0aWxlcyI6W3sidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjI0IiwieSI6IjIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI3MyIsInNpZGUiOiJBIiwieCI6IjIxIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyMiIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyMSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjcyIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI3NiIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjE1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNzciLCJzaWRlIjoiQSIsIngiOiIxNyIsInkiOiIxNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjE1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMzAiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNzciLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNzAiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI3NSIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiI4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjgiLCJhbmdsZSI6IjE4MCJ9XSwieHMiOltdfQ=="],
	['MoR - Finders and Keepers', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ijc1Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI5Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjkiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ijc0Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjcxIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiI4IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIxNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6Ijc3Iiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyIiwieSI6IjExIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMiIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI5IiwieSI6IjEyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNiIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjMiLCJ5IjoiOCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjQiLCJ5IjoiMTEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI3IiwieSI6IjEwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiOCIsInkiOiIxMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNCIsInkiOiIyIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTUiLCJ5IjoiNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiI4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiMTMifV19"],
	['HoB - Acolyte of Saradyn', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjUiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI3IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMTIiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjEzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMjEiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxNCIsImFuZ2xlIjoiIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjEwIn1dfQ=="],
	['HoB - Rellegars Rest - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjE4Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjIxIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiI1IiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNiIsInkiOiIwIn1dfQ=="],
	['HoB - Rellegars Rest - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIxIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjEiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjE1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjIxIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTkiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMTkiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjQiLCJ5IjoiMTIifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEiLCJ5IjoiMTQifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjQiLCJ5IjoiNiJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI0In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiI0IiwieSI6IjAiLCJocCI6IjIifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjciLCJ5IjoiOSIsImhwIjoiNCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMiIsInkiOiIxMyIsImhwIjoiNCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNyIsInkiOiIxNyIsImhwIjoiNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEiLCJ5IjoiMTkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxIiwieSI6IjIwIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMyIsInkiOiIxOSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjMiLCJ5IjoiMjAifV19"],
	['HoB - Blood Will Tell', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI4Iiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTUiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjEyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyMCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjE1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiMyJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiI0IiwieSI6IjIifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMyIsInkiOiIxMiJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiI5IiwieSI6IjgifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMyIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTMiLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTQiLCJ5IjoiOSJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMTIiLCJ5IjoiMCJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMSIsInkiOiI0In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMyIsInkiOiIxMiJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiNiIsInkiOiI4In0seyJ0aXRsZSI6IlJlZCIsIngiOiI3IiwieSI6IjgifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEzIiwieSI6IjE1In1dfQ=="],
	['HoB - Rise of Urthko - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTUiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxMSIsInkiOiIwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNCIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjQiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI2IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjUiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTWFub3IgZW5kIiwic2lkZSI6IkIiLCJ4IjoiMTciLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiOSIsImFuZ2xlIjoiIn1dLCJkb29ycyI6W3sidGl0bGUiOiJEb29yIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMTIiLCJ5IjoiMyJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiI1In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI4IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjkiLCJ5IjoiMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTciLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTYiLCJ5IjoiNiJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTAiLCJ5IjoiMTAiLCJocCI6IjEyIn1dfQ=="],
	['HoB - Rise of Urthko - encounter 2', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiNyIsInkiOiI3In0seyJ0aXRsZSI6IjF4MSIsIngiOiI4IiwieSI6IjcifV0sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI5IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE4Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI4IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMiIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiOCIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiI5In0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEwIiwieSI6IjMifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiV2hpdGUiLCJ4IjoiNyIsInkiOiI4In0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjgiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTQiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiMiJ9XX0="],
	['HoB - Saradyn in Flames', "eyJ4cyI6W3sidGl0bGUiOiIyeDIiLCJ4IjoiMTMiLCJ5IjoiNiJ9XSwidGlsZXMiOlt7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTkiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjExIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjAiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiNCIsInkiOiIyMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIyMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNyIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjIwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjIxIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjE0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiI2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxIiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNyIsInkiOiI2IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI1IiwieSI6IjExIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI1IiwieSI6IjE1In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI3IiwieSI6IjIwIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjQiLCJ5IjoiMTIifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiMjEifSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEyIiwieSI6IjIifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiVW5rbm93biIsIngiOiI1IiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxIiwieSI6IjE0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE0IiwieSI6IjEzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMiIsInkiOiIyMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiMjQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiIxOSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE2IiwieSI6IjE5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNiIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNiIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMiIsInkiOiIxMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIyNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTYiLCJ5IjoiMjEifV19"],
	['HoB - Prison of Khynn - endounter 1', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMTYiLCJ5IjoiMSJ9XSwidGlsZXMiOlt7InRpdGxlIjoiMjAiLCJzaWRlIjoiQSIsIngiOiI0IiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI5IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIxIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjEiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjMiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTQiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNiIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiMCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI5IiwieSI6IjMifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNyIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI5IiwieSI6IjEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjYifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiI4IiwiaHAiOiIwIn1dfQ=="],
	['HoB - Prison of Khynn - endounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjUiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIxMCIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjExIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjEyIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOCIsInkiOiIzIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI1IiwieSI6IjEwIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMSIsInkiOiI5In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI4IiwieSI6IjAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTEiLCJ5IjoiOCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIxNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiOCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjQiLCJ5IjoiMTEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI3IiwieSI6IjE0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiMTQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiIxMiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE1IiwieSI6IjE1In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTQiLCJ5IjoiOSJ9XX0="],
	['HoB - Shadowfall Mountain - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjEzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMjgiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI3Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTIiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiIxMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI4IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNiIsInkiOiIxMiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiIxNCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTEiLCJ5IjoiNSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTIiLCJ5IjoiMTMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE1IiwieSI6IjE3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiIxMiJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMSIsInkiOiIxNCJ9XX0="],
	['HoB - Shadowfall Mountain - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMTEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMTUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTAiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIxMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjE4IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyIiwieSI6IjQifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjIiLCJ5IjoiMTAifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEyIiwieSI6IjQifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEyIiwieSI6IjEwIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI2IiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjQifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjExIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMiIsInkiOiI4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiI1In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiMTAifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiIxMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE1IiwieSI6IjcifSx7InRpdGxlIjoiR3JlZW4iLCJ4IjoiMiIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIyIiwieSI6IjExIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxNSIsInkiOiI0In0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjE1IiwieSI6IjExIn1dfQ=="],
	['HoB - Piercing Darkness - encounter 1', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiNyIsInkiOiI0In0seyJ0aXRsZSI6IjF4MSIsIngiOiI3IiwieSI6IjUifSx7InRpdGxlIjoiMXgxIiwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiNyIsInkiOiI3In1dLCJ0aWxlcyI6W3sidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiMiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiI0IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTQiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTYiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI2IiwieSI6IjgifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMiIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiMTEifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjYifV19"],
	['HoB - Piercing Darkness - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjI1Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI0Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxIiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIxMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIxNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxIiwieSI6IjIifSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjExIiwieSI6IjIifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEiLCJ5IjoiOCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMTEiLCJ5IjoiOCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNiIsInkiOiI5In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjQiLCJ5IjoiNCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMCIsInkiOiI0In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiIyIiwieSI6IjAifSx7InRpdGxlIjoiUmVkIiwieCI6IjIiLCJ5IjoiMSJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTMiLCJ5IjoiMCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTMiLCJ5IjoiMSJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiI0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiIyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjYifV19"],
	['HoB - Blood and Betrayal - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiIxMSIsInkiOiI3IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMiIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMTEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEyIiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMTciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjYiLCJ5IjoiNiJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMSIsInkiOiIxMCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiI4In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI5IiwieSI6IjcifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjIiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjE1In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxMiIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxMyIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNCIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNSIsInkiOiI0In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMyIsInkiOiI1In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxNCIsInkiOiI1In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxNSIsInkiOiI1In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIxMiIsInkiOiI1In0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjE2IiwieSI6IjQifV19"],
	['HoB - Blood and Betrayal - encounter 2A', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMTIiLCJ5IjoiNyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTIiLCJ5IjoiOCJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTMiLCJ5IjoiNyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMTMiLCJ5IjoiOCJ9XSwidGlsZXMiOlt7InRpdGxlIjoiNCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjciLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxNyIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjExIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI1Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMTUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIxNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjE4IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyIiwieSI6IjkifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI4In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxNiIsInkiOiIxMSJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiIzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOCIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMiIsInkiOiIxMSJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiMSIsInkiOiI1In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxMCIsInkiOiIxMCJ9LHsidGl0bGUiOiJHcmVlbiIsIngiOiI5IiwieSI6IjExIn0seyJ0aXRsZSI6IldoaXRlIiwieCI6IjE3IiwieSI6IjYifV19"],
	['HoB - Blood and Betrayal - encounter 3', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNyIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI0Iiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjUiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiI5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMiIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjE4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiMTciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIxNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjE3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTMiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiMTEiLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOCIsInkiOiI3Iiwib3BlbmVkIjpmYWxzZX0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxIiwieSI6IjgiLCJvcGVuZWQiOmZhbHNlfSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE1IiwieSI6IjgiLCJvcGVuZWQiOmZhbHNlfV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTgiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiIyMSJ9XX0="],
	['MoB - Strange Awakening', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjExIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIzIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjciLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ijc5Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNzgiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiODUiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI3OCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQiIsIngiOiI1IiwieSI6IjEzIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjE1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjgzIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6Ijg2Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJNaXN0cyBlbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjE3IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkNydW1ibGluZyIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMTAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJDcnVtYmxpbmciLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiQ3J1bWJsaW5nIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMSIsImFuZ2xlIjoiMCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiV2FsbCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI5In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI3IiwieSI6IjYifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjkiLCJ5IjoiOCJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxMCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIzIiwieSI6IjYifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiMTAifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEwIiwieSI6IjEzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTQiLCJ5IjoiMTMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNSIsInkiOiIxMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEzIiwieSI6IjE0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTUiLCJ5IjoiMTQifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNCIsInkiOiIxNSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE0IiwieSI6IjE2In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTUiLCJ5IjoiMTYifV19"],
	['VoD - Trucebreaker', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNyIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiIxMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMTAiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjUiLCJzaWRlIjoiQSIsIngiOiIxOCIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTgiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjE0IiwieSI6IjIifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNCIsInkiOiI1In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTciLCJ5IjoiMiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE3IiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjgiLCJ5IjoiMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiI4In1dfQ=="],
	['SoS - Stewards of the Secret', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjEyIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjciLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjExIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxIiwieSI6IjQifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNSIsInkiOiI2In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMyIsInkiOiI0In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIzIiwieSI6IjEifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjExIiwieSI6IjAifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjE1IiwieSI6IjYifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjE1IiwieSI6IjEzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNCIsInkiOiIxMCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxNSIsInkiOiIwIn1dfQ=="],
	['TF - Ghost Town', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMTQiLCJ5IjoiOSJ9XSwidGlsZXMiOlt7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTQiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjEiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNyIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjQ1Iiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiI4IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxMSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMTYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMTQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiIxNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjQzIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzMCIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiOCIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjEwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiMTEiLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjYiLCJ5IjoiMyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTAiLCJ5IjoiNiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMTUiLCJ5IjoiMTUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjQiLCJ5IjoiMTYifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI5IiwieSI6IjMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNSIsInkiOiI0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNSIsInkiOiI3In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiOSIsInkiOiI5In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiOSIsInkiOiIxMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjE0IiwieSI6IjEzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTIiLCJ5IjoiMTgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI3IiwieSI6IjE1In1dfQ=="],
	['TF - Food For Worms', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjQ4Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiI1IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTIiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjAiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJBIiwieCI6IjExIiwieSI6IjEiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjMiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiI5IiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjQ5Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjEwIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiNDMiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjIwIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxMiIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjEzIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIzIiwieSI6IjEyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMSIsInkiOiI1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI4IiwieSI6IjAifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI1IiwieSI6IjgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI1IiwieSI6IjkifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI2IiwieSI6IjgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiI2IiwieSI6IjkifV19"]
];

var MAP_HASHES = {};

for (var i = 0; i < MAP_HASES_LIST.length; i++) {
	MAP_HASHES[MAP_HASES_LIST[i][0]] = MAP_HASES_LIST[i][1]; 
}

var mapWidth = 40;
var mapHeight = 50;

var monsterList = [];
var mapObjects = [];
var conditionsToShow = {};

var overlordRelicNumber = 0;
