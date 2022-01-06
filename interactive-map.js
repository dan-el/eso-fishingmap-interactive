/* hide element #id
 */
function hideIdElement(id) {
  var x = document.getElementById(id);
  if (x !== null) {
    x.style.display = 'none';
  }
}

/* hide all elements .classname
 */
function hideClassElements(classname) {
  var x = document.getElementsByClassName(classname);
  for (var i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
}

/* toggle element #id
 */
function toggleIdElement(id) {
  var x = document.getElementById(id);
  if (x !== null) {
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
}

/* toggle all elements .classname
 */
function toggleClassElements(classname) {
  var x = document.getElementsByClassName(classname);
  for (var i = 0; i < x.length; i++) {
    if (x[i].style.display === 'none') {
      x[i].style.display = 'block';
    } else {
      x[i].style.display = 'none';
    }
  }
}

/* toggle #id active via css class
 */
function toggleIdActive(id) {
  var x = document.getElementById(id);
  if (x !== null) {
    if (x.classList.contains('active')) {
      x.classList.remove('active');
    } else {
      x.classList.add('active');
    }
  }
}

/* toggle #id beautiful via css class
 */
function toggleIdBeautiful(id) {
  var x = document.getElementById(id);
  if (x !== null) {
    if (x.classList.contains('beautiful')) {
      x.classList.remove('beautiful');
    } else {
      x.classList.add('beautiful');
    }
  }
}

/* toggle .classname active via css class
 */
function toggleClassActive(classname) {
  var x = document.getElementsByClassName(classname);
  for (var i = 0; i < x.length; i++) {
    if (x[i].classList.contains('active')) {
      x[i].classList.remove('active');
    } else {
      x[i].classList.add('active');
    }
  }
}

/* unset .classname active via css class
 */
function unsetClassActive(classname) {
  var x = document.getElementsByClassName(classname);
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove('active');
  }
}

/* do we have a valid location in the url which we can
 * use to jump to the proper sub map?
 */
function getLocation(zoneOrAlliance) {
  var validLocations = [
    /* structure:
    ['alliance-shortname', 'alliance-name',
      ['zone-1', 'zone-1', 'zone-3',...]],...
    */
    /* ad zones */
    ['ad', 'aldmeri-dominion',
      ['auridon', 'grahtwood', 'greenshade', 'malabaltor', 'reapersmarch', 'khenarthisroost'] ],
    /* dc zones */
    ['dc', 'daggerfall-covenant',
      ['glenumbra', 'stormhaven', 'rivenspire', 'alikrdesert', 'bangkorai', 'betnikh', 'strosmkai'] ],
    /* ep zones */
    ['ep', 'ebonheart-pact',
      ['stonefalls', 'deshaan', 'shadowfen', 'eastmarch', 'therift', 'bleakrockisle', 'balfoyen',
      'blackreach-mzark' ] ],
    /* cyro & Nnutral zones */
    ['cyro-neutral', 'cyro-neutral',
      ['cyrodiil', 'coldharbour', 'craglorn', 'imperialcity'] ],
    /* dlc & chapter zones */
    ['dlc-chapter', 'dlc-chapter',
      ['wrothgar', 'hewsbane', 'goldcoast', 'clockworkcity', 'vvardenfell', 'summerset',
      'artaeum', 'murkmire', 'elsweyr', 'northernelsweyr', 'southernelsweyr', 'westernskyrim',
      'blackreach', 'blackreach-greymoor', 'thereach', 'blackreach-arkthzand', 'blackwood',
      'deadlands', 'deadlands-fargrave'] ],
    /* dummy zones */
    ['overlay', 'overlay-alliance',
      ['overlay', 'overlay-zone'] ],
    /* alliances & dummy alliances */
    ['alliance', 'alliance',
      ['aldmeri-dominion', 'daggerfall-covenant', 'ebonheart-pact', 'cyro-neutral', 'dlc-chapter',
      'overlay-alliance'] ]
  ];

  var locZA = '';

  if (zoneOrAlliance) { /* grab from parameter */
    locZA = zoneOrAlliance;
  } else { /* grab from url */
    locZA = window.location.hash.substr(1); /* extract anchor */
  }

  for (var i = 0; i < validLocations.length; i++) {
    for (var j = 0; j < validLocations[i][2].length; j++) {
      if (locZA === validLocations[i][2][j]) {
        if (validLocations[i][2][j] === 'elsweyr') { /* keep the legacy 'elsweyr' location remapped to 'northernelsweyr' */
          var retval = [validLocations[i][1], 'northernelsweyr'];
        } else if (validLocations[i][2][j] === 'blackreach') { /* keep the legacy 'blackreach' location remapped to 'blackreach-greymoor' */
          var retval = [validLocations[i][1], 'blackreach-greymoor'];
        } else if (validLocations[i][2][j] === 'overlay') { /* keep the legacy 'overlay' location remapped to 'overlay-zone' */
          var retval = [validLocations[i][1], 'overlay-zone'];
        } else {
          var retval = [validLocations[i][1], validLocations[i][2][j]];
        }
        return retval;
      }
    }
  }
  return [false, false]; /* return [alliance, zone] */
}

/* return zone name based on data-name
*/
function getZoneName(zone) {
  var locZ = getLocation(zone)[1]; /* sanitize zone or alliance */
  var locZName = document.getElementById(locZ).getAttribute('data-name');

  /* return zone name */
  if (locZName !== '' && locZName) {
    return locZName;
  } else {
    return '';
  }
}

/* do we have foul or oily holes in our zone? (only needed in cwc)
 */
function foulOrOily(zone) {
  var locZ = getLocation(zone)[1]; /* sanitize zone */
  var x = document.getElementById(locZ).getElementsByClassName('foul fh'); /* foul fishing holes */
  var y = document.getElementById(locZ).getElementsByClassName('oily fh'); /* oily fishing holes */

  if (y.length > 0 && x.length === 0) {
    return 'oily';
  } else {
    return 'foul';
  }
}

/* count fishing holes of a certain type in a certain zone and
 * add the numbers to the type-buttons
 */
function countFishingHoles(zone, type) {
  var locZ = getLocation(zone)[1]; /* sanitize zone */
  var x = ''; /* hole type */
  if (type === 'oily') { /* oily is equal to foul in terms of button id */
    x = 'foul';
  } else {
    x = type;
  }
  var y = document.getElementById('tb-' + x); /* toggle button for hole types */
  if (locZ === 'overlay-zone' && type === 'foul') { /* add oily holes number to foul ones in overlay-zone - we have both! */
    var z = document.getElementById(locZ).getElementsByClassName('oily' + ' fh').length +
            document.getElementById(locZ).getElementsByClassName(type + ' fh').length;
  } else {
    var z = document.getElementById(locZ).getElementsByClassName(type + ' fh').length; /* zone fishing holes of a certain type */
  }

  /* replace button text */
  if (y !== null) {
    y.innerHTML = type + ' (' + z + ')';
  }

  /* also return the number of fishing holes */
  return z;
}

/* count all fishing holes in a zone or an alliance
 */
function countAllFishingHoles(zoneOrAlliance) {
  var locZA = getLocation(zoneOrAlliance)[1]; /* sanitize zone or alliance */
  var x = document.getElementById(locZA).getElementsByClassName('fh').length; /* zone or alliance fishing holes */

  return x;
}

/* return rare fish info for requested zone
 */
function getRareFish(zone) {
  var locZ = getLocation(zone)[1]; /* sanitize zone */

  switch(locZ) {
    /* Aldmeri Dominion */
    case 'auridon':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', 'Shimmerpike'],
        ['saltwater', 'Blue Monkfish', 'Thrassian Eel'],
        ['lake', 'Ilyadifish'] ],
        [ ['green'],
        ['foul', ''],
        ['river', 'Blackspotted Pike', 'Bristlemouths', 'Muskie'],
        ['saltwater', 'Eucla Cod', 'Mola'],
        ['lake', 'Barbel', 'Mudfish', 'Sturgeon'] ] ]
      break;
    case 'grahtwood':
      fish = [
        [ ['blue'],
        ['foul', 'Bilious Catfish'],
        ['river', 'Greater Fangfin'],
        ['saltwater', 'Magrove Shark'],
        ['lake', 'Stickleback'] ],
        [ ['green'],
        ['foul', 'Snapper Eel', 'Swamp Eel'],
        ['river', 'Hog Sucker', 'Tiger Perch'],
        ['saltwater', 'Devil Ray', 'Mojarra'],
        ['lake', 'Dreughfish', 'Koi'] ] ]
      break;
    case 'greenshade':
      fish = [
        [ ['blue'],
        ['foul', 'Viperfish'],
        ['river', 'Xylo Piranha'],
        ['saltwater', 'Zebra Pompano'],
        ['lake', 'Jungle Bass'] ],
        [ ['green'],
        ['foul', 'Cusk Eel', 'Wolf-Eel'],
        ['river', 'Lyretail', 'Walleye'],
        ['saltwater', 'Manefish', 'Triggerfish'],
        ['lake', 'Archerfish', 'Murray Cod'] ] ]
      break;
    case 'malabaltor':
      fish = [
        [ ['blue'],
        ['foul', 'Ouze Toadfish'],
        ['river', 'Strident Leechfin'],
        ['saltwater', 'Abecean Halibut'],
        ['lake', 'Z\'en\'s Whitefish'] ],
        [ ['green'],
        ['foul', 'Ghastel Bass', 'Stargazer'],
        ['river', 'Mrigal', 'Stonefish'],
        ['saltwater', 'Ono', 'Sea Bass'],
        ['lake', 'Arowana', 'Inconnu'] ] ]
      break;
    case 'reapersmarch':
      fish = [
        [ ['blue'],
        ['foul', 'Slimeslither'],
        ['river', 'Strid Shad'],
        ['saltwater', ''],
        ['lake', 'Forest Bream', 'Preposterous Mackerel'] ],
        [ ['green'],
        ['foul', 'Brotula', 'Reaper\'s Eel', 'Red Gurnard'],
        ['river', 'Flying Fish', 'Sheepshead', 'Sweetfish'],
        ['saltwater', ''],
        ['lake', 'Brown Trout', 'Ladyfish'] ] ]
      break;
    case 'khenarthisroost':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', 'Pyandonean Ray'],
        ['lake', ''] ],
        [ ['green'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', ''],
        ['lake', ''] ] ]
      break;
    /* Daggerfall Covenant */
    case 'glenumbra':
      fish = [
        [ ['blue'],
        ['foul', 'Hag Fen Hagfish'],
        ['river', 'Brook Trout'],
        ['saltwater', 'Azurian Flounder'],
        ['lake', 'Cambray Perch'] ],
        [ ['green'],
        ['foul', 'Dragonfish', 'Lamprey'],
        ['river', 'Catfish', 'Warmouth'],
        ['saltwater', 'Finless Sole', 'Tuna'],
        ['lake', 'Powen', 'Rock Bass'] ] ]
      break;
    case 'stormhaven':
      fish = [
        [ ['blue'],
        ['foul', 'Gray Loach'],
        ['river', 'Dreugh Shrimp'],
        ['saltwater', 'Alcaire Pike'],
        ['lake', 'Silver Walleye'] ],
        [ ['green'],
        ['foul', 'Sawfish', 'Yellow Moray'],
        ['river', 'Grass Carp', 'River Stingray'],
        ['saltwater', 'Dab', 'Stormhaven Flounder'],
        ['lake', 'Barfish', 'Yellow Bass'] ] ]
      break;
    case 'rivenspire':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', 'Ruby Trench'],
        ['saltwater', 'Northpoint Cod', 'Snakehead'],
        ['lake', 'Ichory Chub'] ],
        [ ['green'],
        ['foul', ''],
        ['river', 'Ribbon Eel', 'Stream Catfish', 'Turbot'],
        ['saltwater', 'Dusky Grouper', 'Hake'],
        ['lake', 'Nase', 'Rivenspire Trout', 'Writhing Scrab'] ] ]
      break;
    case 'alikrdesert':
      fish = [
        [ ['blue'],
        ['foul', 'Midget Salmon', 'Sand Eel'],
        ['river', ''],
        ['saltwater', 'Bonefish'],
        ['lake', 'Desert Pupfish'] ],
        [ ['green'],
        ['foul', 'Cutthroat Eel', 'Sand Moray'],
        ['river', ''],
        ['saltwater', 'Alewife', 'Driftfish', 'Sablefish'],
        ['lake', 'Banded Killifish', 'Lungfish', 'Saw Belly'] ] ]
      break;
    case 'bangkorai':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', 'Prickleback'],
        ['saltwater', 'Bjoulsae Hake'],
        ['lake', 'Lake Snapper', 'Scaly Lungfish'] ],
        [ ['green'],
        ['foul', ''],
        ['river', 'Lenok', 'Panga', 'Pupfish'],
        ['saltwater', 'Morid Cod', 'Swai', 'Toadfish'],
        ['lake', 'Gar', 'Paddlefish'] ] ]
      break;
    case 'betnikh':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', ''],
        ['lake', ''] ],
        [ ['green'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', ''],
        ['lake', ''] ] ]
      break;
    case 'strosmkai':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', 'Eltheric Grouper'],
        ['lake', ''] ],
        [ ['green'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', ''],
        ['lake', ''] ] ]
      break;
    /* Ebonheart Pact */
    case 'stonefalls':
      fish = [
        [ ['blue'],
        ['foul', 'Scum Carp'],
        ['river', 'Ash Shad'],
        ['saltwater', 'Akaviri Wrasse'],
        ['lake', 'Rainbow Zander'] ],
        [ ['green'],
        ['foul', 'Fungusfish', 'Stinkfish'],
        ['river', 'Ricefish', 'Thorny Catfish'],
        ['saltwater', 'Armorhead', 'Travally'],
        ['lake', 'Lake Chub', 'Tench'] ] ]
      break;
    case 'deshaan':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', 'Toadstool Tilapia'],
        ['saltwater', 'Pikeblenny'],
        ['lake', 'Mud Lamprey', 'Old Man Gar'] ],
        [ ['green'],
        ['foul', ''],
        ['river', 'Cutthroat Trout', 'Deshaan Chub', 'Mouthbrooder'],
        ['saltwater', 'Gibberfish', 'Monkfish', 'Mustard Eel'],
        ['lake', 'Gourami', 'Ide'] ] ]
      break;
    case 'shadowfen':
      fish = [
        [ ['blue'],
        ['foul', 'Coelcanth', 'Toxic Xoach'],
        ['river', 'Shark Tadpole'],
        ['saltwater', ''],
        ['lake', 'Histcarp'] ],
        [ ['green'],
        ['foul', 'Eel-Goby', 'Pricklefish'],
        ['river', 'Boga', 'Hardyhead', 'Opah'],
        ['saltwater', ''],
        ['lake', 'Orange Roughy', 'Quillback', 'Zander'] ] ]
      break;
    case 'eastmarch':
      fish = [
        [ ['blue'],
        ['foul', 'Ice Remora'],
        ['river', 'White River Pickerel'],
        ['saltwater', 'Ghost Haddock'],
        ['lake', 'King Sturgeon'] ],
        [ ['green'],
        ['foul', 'Modoc Sucker', 'Snipe Eel'],
        ['river', 'Ice Fish', 'Steelhead'],
        ['saltwater', 'Golem Shark', 'Pigfish'],
        ['lake', 'Char', 'Eastmarch Pike'] ] ]
      break;
    case 'therift':
      fish = [
        [ ['blue'],
        ['foul', 'Sulfursucker'],
        ['river', 'Muskellunge', 'White Roughy'],
        ['saltwater', ''],
        ['lake', 'Ilinalta Trout'] ],
        [ ['green'],
        ['foul', 'Bream', 'Skate', 'Skorm'],
        ['river', 'Grouper', 'Sockeye Salmon'],
        ['saltwater', ''],
        ['lake', 'Ice Koi', 'Jarl Salmon', 'Zebra Oto'] ] ]
      break;
    case 'bleakrockisle':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', 'Inner Sea Scalyfin'],
        ['lake', ''] ],
        [ ['green'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', ''],
        ['lake', ''] ] ]
      break;
    case 'balfoyen':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', ''],
        ['lake', ''] ],
        [ ['green'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', ''],
        ['lake', ''] ] ]
      break;
    /* Cyrodiil & Neutral */
    case 'cyrodiil':
      fish = [
        [ ['blue'],
        ['foul', 'Sewer Eel'],
        ['river', 'Nibenay Trout'],
        ['saltwater', 'Topal Fanche'],
        ['lake', 'Rumare Bream'] ],
        [ ['green'],
        ['foul', 'Pufferfish', 'Quillfish'],
        ['river', 'Glassfish', 'Pirate Perch'],
        ['saltwater', 'Emperor Angelfish', 'Jewel Fish'],
        ['lake', 'Rainbow Fish', 'Yellow Perch'] ] ]
      break;
    case 'coldharbour':
      fish = [
        [ ['blue'],
        ['foul', 'Ghoulfish'],
        ['foul', 'Heinous Gar'],
        ['foul', 'Moray Leech'],
        ['foul', 'Stingerpike'] ],
        [ ['green'],
        ['foul', 'Azure Eel', 'Bichir'],
        ['foul', 'Blue Slimefish', 'Cavefish'],
        ['foul', 'Fang Shark', 'Harbour Gar'],
        ['foul', 'Plasm Darter', 'Venomfish'] ] ]
      break;
    case 'craglorn':
      fish = [
        [ ['blue'],
        ['river', 'Nedic Eel'],
        ['river', 'Yokudan Cod'],
        ['lake', 'Crag Salmon'],
        ['lake', 'Glasshead Barreleye'] ],
        [ ['green'],
        ['river', 'Bitterling', 'Dragon Goby'],
        ['river', 'Mermouth', 'Spiny Orcfish'],
        ['lake', 'Croaker', 'Forlorn Catfish'],
        ['lake', 'Ghost Knifefish', 'Nirn Flounder'] ] ]
      break;
    case 'imperialcity':
      fish = [
        [ ['blue'],
        ['foul', 'Aphotic Batfish'],
        ['foul', 'Cannibal Lancet'],
        ['foul', 'Glow-Spotted Blenny'],
        ['foul', ''] ],
        [ ['green'],
        ['foul', 'Blobfin', 'Flabby Whalefish', 'Guiyu'],
        ['foul', 'Hatchetfish', 'Humpback Angler', 'Imperial Loosejaw'],
        ['foul', 'Scabrous Grenadier', 'Trapjaw Eel', 'Wen Loach'],
        ['foul', ''] ] ]
      break;
    /* DLC and Chapter Zones */
    case 'wrothgar':
      fish = [
        [ ['blue'],
        ['foul', 'Greater Ashmouth'],
        ['river', 'Chinlea'],
        ['saltwater', 'Blue-Ringed Octopus'],
        ['lake', 'Giant Hammerjaw'] ],
        [ ['green'],
        ['foul', 'Lesser Ashmouth', 'Pariah Lumpfish'],
        ['river', 'Nelma', 'Tum Weever'],
        ['saltwater', 'Black Scabbardfish', 'Hairy Coffinfish'],
        ['lake', 'Matron Eelpout', 'Vorkiposh'] ],
        [ ['purple'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', 'Crab-Slaughter Crane'],
        ['lake', ''] ] ]
      break;
    case 'hewsbane':
      fish = [
        [ ['blue'],
        ['foul', 'Keuppia'],
        ['river', 'Glass Catfish'],
        ['saltwater', 'Sparkling Anglermouth'],
        ['lake', 'Cichlid'] ],
        [ ['green'],
        ['foul', 'Daggertooth', 'Fringed Mudskipper'],
        ['river', 'Firemouth', 'Hew\'s Rasbora'],
        ['saltwater', 'Beggar Shark', 'Crestfish'],
        ['lake', 'Bala Shark', 'Cherry Barb'] ] ]
      break;
    case 'goldcoast':
      fish = [
        [ ['blue'],
        ['foul', 'Ghastly Batfish'],
        ['river', 'Bullface Wingfin'],
        ['saltwater', 'Sleeper Shark'],
        ['lake', 'Palatine Sabertooth'] ],
        [ ['green'],
        ['foul', 'Black Anvil Loach', 'Spiny Frogfish'],
        ['river', 'Gold Coast Crayfish', 'Longmouth Pike'],
        ['saltwater', 'Rattail', 'Scorpionfish'],
        ['lake', 'Hammer Bombil', 'Spotted Bass'] ] ]
      break;
    case 'clockworkcity':
      fish = [
        [ ['blue'],
        ['oily', 'Ancestor Wrasse'],
        ['oily', 'Barilzar\'s Grenadier'],
        ['oily', 'Enmegalabzu'],
        ['oily', ''] ],
        [ ['green'],
        ['oily', 'Clicking Travally', 'Copperclaw Crayfish', 'Coppery Cucumber'],
        ['oily', 'Imperfect Blobfin', 'Oil-Eater Whalefish', 'Operant Eel'],
        ['oily', 'Orod', 'Verminous Catfish', 'Whisper Knifefish'],
        ['oily', ''] ] ]
      break;
    case 'vvardenfell':
      fish = [
        [ ['blue'],
        ['foul', 'Oanna'],
        ['river', 'Ash Blindfish'],
        ['saltwater', 'Resdaynian Sailfin'],
        ['lake', 'Shalk-Brother Crayfish'] ],
        [ ['green'],
        ['foul', 'Firemouth Guiyu', 'Sleeper Coffinfish'],
        ['river', 'Netch-Hook Eel', 'Pilgrim Goby'],
        ['saltwater', 'Ghost Octopus', 'Weeping Pygmy Shark'],
        ['lake', 'Hoaga Oto', 'Pity Bombil'] ] ]
      break;
    case 'summerset':
      fish = [
        [ ['blue'],
        ['foul', 'Senche Flathead'],
        ['river', 'Great Yellowfin'],
        ['saltwater', 'Lingweloce'],
        ['lake', 'Crystal Hannia'] ],
        [ ['green'],
        ['foul', 'Burnish Groper', 'Copper Oreodory'],
        ['river', 'Anu\'s Travally', 'Eton Sprat'],
        ['saltwater', 'Quicksilver Lingwe', 'Radiant Dory'],
        ['lake', 'Blooming Flowerhorn', 'Dusk Arowana'] ] ]
      break;
    case 'artaeum':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', 'Pearlescent Crayfish'],
        ['lake', ''] ],
        [ ['green'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', 'Abyssal Sea Pig', 'Weaving Octopus'],
        ['lake', ''] ] ]
      break;
    case 'murkmire':
      fish = [
        [ ['blue'],
        ['foul', 'Michinitl'],
        ['river', 'Hist Sap Shiner'],
        ['saltwater', 'Longlure Eelfin'],
        ['lake', 'Moist Scale Burrower'] ],
        [ ['green'],
        ['foul', 'Ayotichin', 'Lined Sole'],
        ['river', 'Kuuyicet', 'Thick Scaled Mullet'],
        ['saltwater', 'Fat Sleeper', 'Spotted Seatrout'],
        ['lake', 'Bowfin', 'Redear Sunfish'] ] ]
      break;
    case 'northernelsweyr':
      fish = [
        [ ['blue'],
        ['river', 'Greater Senchefin'],
        ['river', 'Hircine\'s Pupfish'],
        ['river', 'Moon-Sugar Shrimp'],
        ['river', 'Northern Elsweyr Moon Tetra'] ],
        [ ['green'],
        ['river', 'Cudgeon', 'Desert Sucker'],
        ['river', 'Freshwater Blenny', 'Galaxias'],
        ['river', 'Grayling', 'Reedfish'],
        ['river', 'Rimmen Bichir', 'Speckled Dace'] ] ]
      break;
    case 'southernelsweyr':
      fish = [
        [ ['blue'],
        ['foul', 'Radhin Zhab'],
        ['river', 'Roh-ri'],
        ['saltwater', 'Khaj\'Roh'],
        ['lake', ''] ],
        [ ['green'],
        ['foul', 'Fif Cat', 'Pellitine Tilapia', 'Ruin Sucker'],
        ['river', 'Elsweyr River Perch', 'Fresh-Water Sardinella', 'Shaveskin Darter'],
        ['saltwater', 'Pellitine Horse Mackerel', 'Wedgefish', 'Zha\'ja Roh'],
        ['lake', ''] ] ]
      break;
    case 'blackreach-mzark':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', ''],
        ['lake', ''] ],
        [ ['green'],
        ['foul', ''],
        ['river', ''],
        ['saltwater', ''],
        ['lake', ''] ] ]
      break;
    case 'westernskyrim':
      fish = [
        [ ['blue'],
        ['foul', 'Sanguine Lamprey'],
        ['river', 'Blue Muskie'],
        ['saltwater', 'Birtingr'],
        ['lake', 'Lodsilungur'] ],
        [ ['green'],
        ['foul', 'Hypogean Tetra', 'Vandellia'],
        ['river', 'Chillwind Pike', 'Morthal Longfin'],
        ['saltwater', 'Ghost Salmon', 'Skyrim Gurry Shark'],
        ['lake', 'Frigid Char', 'Solitude Loach'] ] ]
      break;
    case 'blackreach-greymoor':
      fish = [
        [ ['blue'],
        ['foul', 'Sanguine Lamprey'],
        ['river', 'Blue Muskie'],
        ['saltwater', 'Birtingr'],
        ['lake', 'Lodsilungur'] ],
        [ ['green'],
        ['foul', 'Hypogean Tetra', 'Vandellia'],
        ['river', 'Chillwind Pike', 'Morthal Longfin'],
        ['saltwater', 'Ghost Salmon', 'Skyrim Gurry Shark'],
        ['lake', 'Frigid Char', 'Solitude Loach'] ] ]
      break;
    case 'thereach':
      fish = [
        [ ['blue'],
        ['foul', ''],
        ['river', 'Blackreach Pilgrim', 'Fretfish'],
        ['saltwater', ''],
        ['lake', 'Druadach Garpike'] ],
        [ ['green'],
        ['foul', ''],
        ['river', 'Lost Valley Tench', 'Nchuand Cavetrout'],
        ['saltwater', ''],
        ['lake', 'Pinegilled Drum', 'Hagfin Vendace', 'Karth Crayfish'] ] ]
      break;
    case 'blackreach-arkthzand':
      fish = [
        [ ['blue'],
        ['foul', 'Briarthorn Goby'],
        ['river', 'Blackreach Pilgrim', 'Fretfish'],
        ['saltwater', ''],
        ['lake', ''] ],
        [ ['green'],
        ['foul', 'Leechtooth Eel', 'Muckbelly Frogfish', 'Siltwallow Burrfish'],
        ['river', 'Lost Valley Tench', 'Nchuand Cavetrout'],
        ['saltwater', ''],
        ['lake', ''] ] ]
      break;
      case 'blackwood':
        fish = [
          [ ['blue'],
          ['foul', 'Stained Porgy'],
          ['river', 'Pantherfish'],
          ['saltwater', 'Opaline Albacore'],
          ['lake', 'Blackwater Bullhead'] ],
          [ ['green'],
          ['foul', 'Inkspur Cuttlefish', 'Muddy Razorgill'],
          ['river', 'Ivory Darter', 'Onkobra Muskie'],
          ['saltwater', 'Harvester Octopus', 'Topal Nautilus'],
          ['lake', 'Red Zander', 'Speckled Sauger'] ] ]
        break;
      case 'deadlands':
        fish = [
          [ ['blue'],
          ['foul', 'Needlefish'],
          ['foul', 'Rustbelly Loach'],
          ['foul', 'Molten Nudibranch'],
          ['foul', 'Ogrim Goonch'] ],
          [ ['green'],
          ['foul', 'Dusk Angler', 'Slag Eel'],
          ['foul', 'Corpus Hagfin', 'Deadlands Trout'],
          ['foul', 'Banegil', 'Vile Crayfish'],
          ['foul', 'Black-Eyed Croaker', 'Ebony Mudfish'] ] ]
        break;
      case 'deadlands-fargrave':
        fish = [
          [ ['blue'],
          ['foul', ''],
          ['river', ''],
          ['saltwater', ''],
          ['lake', ''] ],
          [ ['green'],
          ['foul', ''],
          ['river', ''],
          ['saltwater', ''],
          ['lake', ''] ] ]
        break;
    default:
      return false;
  }
  return fish;
}

/* generate info text with finshing hole sums
 * and write it to the info-container
 */
function generateInfoText(zone) {
  var locA = getLocation(zone)[0]; /* sanitize alliance */
  var locZ = getLocation(zone)[1]; /* sanitize zone */
  var x = document.getElementById('a-' + locZ);
  var y = document.getElementById(locA);
  var z = document.getElementById('info-container');
  var fish = getRareFish(locZ);
  var fishcaught = 13580; /* total number of fish caught */
  var perfectroe = 141; /* total number of perfect roe from fish */
  var txt = '';
  var innerTxt = '';
  var colClass = '';
  var containerClass = '';

  /* add zone as class to info container */
  z.className = '';
  z.classList.add('info-element');
  z.classList.add(locZ);

  /* add close button */
  txt = txt + '<div class="close" onclick="toggleClassElements(\'info-element\');">X</div>';
  /* generate info text with statistics */
  txt = txt + '<p>All fishing holes in ' + y.getAttribute('data-name') + ': <b>' + countAllFishingHoles(locA) + '</b></p>';
  if (locZ !== 'overlay-zone' && x !== null) {
    txt = txt + '<p>All fishing holes in ' + x.innerHTML + ': <b>' + countAllFishingHoles(locZ) + '</b></p>';
  }
  txt = txt + '<p>Perfect Roe Rate: ' + perfectroe + '/' + fishcaught + ' (<b>' + Number(Math.round((perfectroe/fishcaught*100)+'e2')+'e-2') + '%</b>)</p>'

  /* generate rare fish info */
  if (fish) {
    if (fish[1][1][2] && fish[1][2][2] && fish[1][3][2] && fish[1][4][2]) { /* we have 4 columns */
      colClass = '-4';
      containerClass = 'full';
    } else if ((!fish[1][1][2] && !fish[1][2][2] && !fish[1][3][2]) || /* 1, 2, 3 - we only have 1 column */
               (!fish[1][1][2] && !fish[1][2][2] && !fish[1][4][2]) || /* 1, 2, 4 */
               (!fish[1][1][2] && !fish[1][3][2] && !fish[1][4][2]) || /* 1, 3, 4 */
               (!fish[1][2][2] && !fish[1][3][2] && !fish[1][4][2])) { /* 2, 3, 4 */
      colClass = '-1';
      containerClass = 'dyn';
    } else { /* we have more than 1 and less than 4 columns */
      if ((!fish[1][1][2] && !fish[1][2][2]) || /* 1, 2 - we only have 2 columns */
          (!fish[1][1][2] && !fish[1][3][2]) || /* 1, 3 */
          (!fish[1][1][2] && !fish[1][4][2]) || /* 1, 4 */
          (!fish[1][2][2] && !fish[1][3][2]) || /* 2, 3 */
          (!fish[1][2][2] && !fish[1][4][2]) || /* 2, 4 */
          (!fish[1][3][2] && !fish[1][4][2])) { /* 3, 4 */
        colClass = '-2';
        containerClass = 'dyn';
      } else { /* leaves us with 3 columns in the end */
        colClass = '-3';
        containerClass = 'full';
      }
    }
  txt = txt + '<div id="rare-fish-container"><div class="rare-fish ' + containerClass + '">'; /* table container */
    for (i = 1; i < fish[0].length; i++) { /* i ... number of columns: 4, 3, 1 */
      if (fish[0][i][1]) {
        innerTxt = innerTxt + '<div class="col col' + colClass + '"><div class="cell head ' + fish[0][i][0] + '"><div class="inner">' + fish[0][i][0] + '</div></div>';
        for (var j = 0; j < fish.length; j++) { /* j ... fish raritiy: green, blue, purple */
          if (fish[j]) {
            for (var k = 1; k < fish[j][i].length; k++) { /* k ... rare fish name */
              if (fish[j][i][k]) {
                innerTxt = innerTxt + '<div class="cell fish ' + fish[j][0][0] + '"><div class="inner">' + fish[j][i][k] + '</div></div>';
              }
            }
          }
        }
        innerTxt = innerTxt + '</div>';
      }
    }
  if (innerTxt) {
    txt = txt + innerTxt;
  } else {
    txt = txt + '<em>No rare fish here :-(</em>';
  }
  txt = txt + '</div></div>';
  }

  /* replace info-container content */
  document.getElementById('info-container').innerHTML = txt;
}

/* Generate HTML meta info data
*/
function generateMetaTitle(zone) {
  var locZ = getLocation(zone)[1]; /* sanitize zone */
  var metaTitle = 'Captain Trout’s Interactive Fishing Map' /* meta title base string */

  /* append zone name to meta title */
  if (locZ !== '' && locZ) {
    var retval = metaTitle + ' - ' + getZoneName(locZ);
  } else {
    var retval = metaTitle;
  }
  return retval;
}

/* Toggle zone map active - only one is active at a time
 */
function toggleZone(zone) {
  var locZ = getLocation(zone)[1]; /* sanitize zone */
  var numFoulHoles = 0; 
  var numRiverHoles = 0;
  var numLakeHoles = 0;
  var numSaltwaterHoles = 0;

  hideClassElements('zoco'); /* hide all zone containers */
  toggleIdElement(locZ); /* now show one specific zone container by id */
  hideClassElements('fishing-map-image'); /* hide all fishing maps */
  toggleIdElement('img-' + locZ); /* now show one specific fishing map by id */
  unsetClassActive('zone-button'); /* unset all zone-buttons */
  toggleIdActive('tb-' + locZ); /* now set one specific zone-button active by id */

  /* recount holes on zone change */
  numFoulHoles = countFishingHoles(locZ, foulOrOily(locZ));
  numRiverHoles = countFishingHoles(locZ, 'river');
  numLakeHoles = countFishingHoles(locZ, 'lake');
  numSaltwaterHoles = countFishingHoles(locZ, 'saltwater');

  /* highlight rare fishing holes (rare means less than a certain percentage) */
  if (numFoulHoles/countAllFishingHoles(locZ)*100 < 6.5) { /* less than 6.5% of all zone fishoing holes? */
    var foulHoles = document.getElementById(locZ).getElementsByClassName(foulOrOily(locZ) + ' fh');
    for (var i = 0; i < foulHoles.length; i++) {
      foulHoles[i].classList.add('rare');
    }
  }
  if (numRiverHoles/countAllFishingHoles(locZ)*100 < 6.5) { /* less than 6.5% of all zone fishoing holes? */
    var riverHoles = document.getElementById(locZ).getElementsByClassName('river fh');
    for (var i = 0; i < riverHoles.length; i++) {
      riverHoles[i].classList.add('rare');
    }
  }
  if (numLakeHoles/countAllFishingHoles(locZ)*100 < 6.5) { /* less than 6.5% of all zone fishoing holes? */
    var lakeHoles = document.getElementById(locZ).getElementsByClassName('lake fh');
    for (var i = 0; i < lakeHoles.length; i++) {
      lakeHoles[i].classList.add('rare');
    }
  }
  if (numSaltwaterHoles/countAllFishingHoles(locZ)*100 < 6.5) { /* less than 6.5% of all zone fishoing holes? */
    var saltwaterHoles = document.getElementById(locZ).getElementsByClassName('saltwater fh');
    for (var i = 0; i < saltwaterHoles.length; i++) {
      saltwaterHoles[i].classList.add('rare');
    }
  }

  /* generate info text */
  generateInfoText(locZ);
}

/* increase fishing hole pin size
 */
function zoomInFishingHoles() {
  var x = document.getElementById('fishing-map-container');
  if (x.classList.contains('mmminus')) {
    x.classList.remove('mmminus') /* zoom -2 */
  } else if (x.classList.contains('mminus')) {
    x.classList.remove('mminus'); /* zoom -1 */
  } else if (x.classList.contains('minus')) {
    x.classList.remove('minus'); /* zoom +-0 */
  } else if (x.classList.contains('plus')) {
    x.classList.add('pplus'); /* zoom +2 */
  } else {
    x.classList.add('plus'); /* zoom +1 */
  }
}

/* decrease fishing hole pin size
 */
function zoomOutFishingHoles() {
  var x = document.getElementById('fishing-map-container');

  if (x.classList.contains('pplus')) {
    x.classList.remove('pplus'); /* zoom +1 */
  } else if (x.classList.contains('plus')) {
    x.classList.remove('plus'); /* zoom +-0 */
  } else if (x.classList.contains('mminus')) {
    x.classList.add('mmminus'); /* zoom -3 */
  } else if (x.classList.contains('minus')) {
    x.classList.add('mminus'); /* zoom -2 */
  } else {
    x.classList.add('minus'); /* zoom -1 */
  }
}

/* increase fishing map size by increasing max-width and
 * max-height of zoom-width and zoom-height class elements
 */
function zoomInFishingMap(scrolled, targetZoom) {
  var x = document.getElementsByClassName('zoom-width');
  var y = document.getElementsByClassName('zoom-height');
  var z = document.getElementById('fishing-map-container');
  var s = false;
  var tz = 0;

  /* is it a mousewheel zoom? */
  if (scrolled) {
    s = true;
  }

  /* do we have a targetZoom size? */
  if (parseInt(targetZoom) > 0) {
    tz = parseInt(targetZoom);
  }

  /* set zoom step - less for mouse wheel zooming */
  zoomStep = 100; /* pixels per click/wheel action */
  if (s) {
    zoomStep = 10; /* pixels per click/wheel action */
  }
  
  if (z.style.maxWidth.replace(/px/, '') < document.body.clientWidth) { /* only zoom in if there is space available */
    for (var i = 0; i < x.length; i++) {
      if (parseInt(x[i].style.maxWidth.replace(/px/, '')) < 1910) { /* width */
        if (tz > 0 && tz < 1910) { /* zoom directly to target zoom level */
          x[i].style.maxWidth = tz + 'px';
        } else {
          x[i].style.maxWidth = parseInt(x[i].style.maxWidth.replace(/px/, ''))+zoomStep + 'px';
        }
      }
    }
    for (var i = 0; i < y.length; i++) {
      if (parseInt(y[i].style.maxHeight.replace(/px/, '')) < 1910) { /* height */
        if (tz > 0 && tz < 1910) { /* zoom directly to target zoom level */
          y[i].style.maxHeight = tz + 'px';
        } else {
          y[i].style.maxHeight = parseInt(y[i].style.maxHeight.replace(/px/, ''))+zoomStep + 'px';
        }
      }
    }
  }
}

/* increase fishing map size by decreasing max-width and
 * max-height of zoom-width and zoom-height class elements
 */
function zoomOutFishingMap(scrolled, targetZoom) {
  var x = document.getElementsByClassName('zoom-width');
  var y = document.getElementsByClassName('zoom-height');
  var s = false;
  var tz = 0;

  /* is it a mousewheel zoom? */
  if (scrolled) {
    s = true;
  }

  /* do we have a targetZoom size? */
  if (parseInt(targetZoom) > 0) {
    tz = parseInt(targetZoom);
  }

  /* set zoom step - less for mouse wheel zooming */
  zoomStep = 100; /* pixels per click/wheel action */
  if (s) {
    zoomStep = 10; /* pixels per click/wheel action */
  }

  for (var i = 0; i < x.length; i++) {
    if (parseInt(x[i].style.maxWidth.replace(/px/, '')) > 590) { /* width */
      if (tz > 610) { /* zoom directly to target zoom level */
        x[i].style.maxWidth = tz + 'px';
      } else {
        x[i].style.maxWidth = parseInt(x[i].style.maxWidth.replace(/px/, ''))-zoomStep + 'px';
      }
    }
  }
  for (var i = 0; i < y.length; i++) {
    if (parseInt(y[i].style.maxHeight.replace(/px/, '')) > 590) { /* height */
      if (tz > 610) { /* zoom directly to target zoom level */
        y[i].style.maxHeight = tz + 'px';
      } else {
        y[i].style.maxHeight = parseInt(y[i].style.maxHeight.replace(/px/, ''))-zoomStep + 'px';
      }
    }
  }
}

/* set fishing map zoom according to browser windows size so
 * all controls are visible on page load
 */
function setFishingMapZoom() {
  var x = document.getElementById('fishing-map-container').offsetHeight; /* conatianer with the map picture */
  var y = document.getElementById('toggle-container-container').offsetHeight; /* container with buttons underneath the map */
  var z = document.documentElement.clientHeight;

  if ((x + y) > z) { /* map plus controls take more height than available */
    zoomOutFishingMap(false, z - y);
  }
  if ((x + y) < z) { /* map plus controls take less height than available */
    zoomInFishingMap(false, z - y);
  }
}

/* use mouse wheel to zoom the fishing map
 */
function scrollToZoom() {
  document.getElementById('fishing-map-container').addEventListener('wheel', function(e) {
    e.preventDefault();
    if (e.deltaY < 0) { /* wheel scrolling up */
      zoomInFishingMap(true, 0);
    }
    if (e.deltaY > 0) { /* wheel scrolling down */
      zoomOutFishingMap(true, 0);
    }
  });
}

/* use mouse right click to navigate back on the map
 */
function clickToBack() {
  document.getElementById('fishing-map-container').addEventListener('contextmenu', function(e) {
    e.preventDefault();
    window.location.href = '../';
  });
}