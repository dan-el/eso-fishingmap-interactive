/* Hide element of a certain id
 */
function hideIdElement(id) {
     var x = document.getElementById(id);

  x.style.display = 'none';
}

/* Hide all elements of a certain class
 */
function hideClassElements(classname) {
  var x = document.getElementsByClassName(classname);

  for (var i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
}

/* Toggle element of a certain id
 */
function toggleIdElement(id) {
  var x = document.getElementById(id);

  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}

/* Toggle all elements of a certain class
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

/* Set/Unset #id active via css class
 */
function toggleIdActive(id) {
  var x = document.getElementById(id);

  if (x.classList.contains('active')) {
    x.classList.remove('active');
  } else {
    x.classList.add('active');
  }
}

/* Set/Unset all elements of classname active via css class
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

/* Unset all elements of .classname active via css class
 */
function unsetClassActive(classname) {
  var x = document.getElementsByClassName(classname);

  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove('active');
  }
}

/* Test if we have a valid location in the address
 * that we can use to jump to the proper sub map
 */
function getLocation(zone) {
  var validLocations = [
    'auridon','grahtwood','greenshade','malabaltor','reapersmarch','khenarthisroost',
    'glenumbra','stormhaven','rivenspire','alikrdesert','bangkorai','betnikh','strosmkai',
    'stonefalls','deshaan','shadowfen','eastmarch','therift','bleakrockisle','balfoyen',
    'cyrodiil','coldharbour','craglorn',
    'imperialcity','wrothgar','hewsbane','goldcoast','clockworkcity','vvardenfell','summerset',
    'artaeum','murkmire','elsweyr','northernelsweyr',
    'overlay'
  ];

  if (zone) { /* grab from parameter */
    var loc = zone;
  } else { /* grab from URL */
    var loc = window.location.href;
  }

  for (var i = 0; i < validLocations.length; i++) {
    if (loc.indexOf(validLocations[i]) > -1) {
      if (validLocations[i] == 'elsweyr') { /* to keep the legacy 'elsweyr' location remapped to 'northernelsweyr' */
        return 'northernelsweyr';
      } else {
        return(validLocations[i]);
      }
    }
  }
  return false;
}

/* do we have foul or oily holes?
 * Only needed in Clockwork City (dlc-chaper.html)
 */
function foulOrOily(id) {
  var x = document.getElementById(id).getElementsByClassName('foul fh'); /* foul holes? */
  var y = document.getElementById(id).getElementsByClassName('oily fh'); /* oily holes? */

  if (y.length = 0) {
    return 'foul';
  } else if (y.length > 0 && x.length > 0) {
    return 'foul oily';
  } else {
    return 'oily';
  }
}

/* Toggle zone map active - only one zone 
 * map is active at a time
 */
function toggleZone(zone) {
  var loc = getLocation(zone); /* sanitize zone */
  var u = document.getElementById('tb-' + zone); /* zone name button */
  var v = document.getElementsByClassName('fh'); /* fishing holes */
  var y = document.getElementById('img-' + zone); /* map image */

  hideClassElements('zoco'); // hide all zone containers */
  toggleIdElement(loc); /* now show one specific zone container by id */
  hideClassElements('fishing-map-image'); /* hide all fishing maps */
  toggleIdElement('img-' + loc); /* now show one specific fishing map by id */
  unsetClassActive('zone-button'); /* unset all zone-buttons */
  toggleIdActive('tb-' + loc); /* now set one specific zone-buttonactive by id */

  /* recount holes on zone change */
  countFishingHoles(loc,foulOrOily(loc));
  countFishingHoles(loc,'river');
  countFishingHoles(loc,'lake');
  countFishingHoles(loc,'saltwater');
  /* generate info text */
  generateInfoText(document.getElementById(loc).parentElement.id,loc);
}

/* Do we have foul or oily fishing holes in our zone?
*/
function foulOrOily(zone) {
  var loc = getLocation(zone); /* sanitize zone */
  var x = document.getElementById(loc).getElementsByClassName('foul fh'); /* foul fishing holes */
  var y = document.getElementById(loc).getElementsByClassName('oily fh'); /* oily fishing holes */

  if (y.length > 0 && x.length == 0) {
    return 'oily';
  } else {
    return 'foul';
  }
}

/* Count ALL fishing holes in the zones of
 * an alliance or zone
 */
function countAllFishingHoles(id) {
  var x = document.getElementById(id).getElementsByClassName('fh'); /* alliance or zone fishing holes */

  return x.length;
}

/* Count fishing holes of a certain type in a certain zone and
 * add the numbers to the type-buttons
 */
function countFishingHoles(zone,type) {
  var loc = getLocation(zone); /* sanitize zone */
  if (type == 'oily') { /* oily is equal to foul in terms of button id */
    var w = 'foul';
  } else { 
    var w = type;
  }
  var x = document.getElementById('tb-' + w); /* toggle button for hole types */
  var y = document.getElementById(loc).getElementsByClassName(type + ' fh'); /* zone fishing holes of a certain type */

  /* replace button text */
  x.innerHTML = type + ' (' + y.length + ')';
}

/* Return rare fish info for requested zone
*/
function getRareFish(zone) {
  var loc = getLocation(zone); /* sanitize zone */

  switch(loc) {
    /* Aldmeri Dominion */
    case 'auridon':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river','Shimmerpike'],
        ['saltwater','Blue Monkfish','Thrassian Eel'],
        ['lake','Ilyadifish'] ],
        [ ['green'],
        ['foul',''],
        ['river','Blackspotted Pike','Bristlemouths','Muskie'],
        ['saltwater','Eucla Cod','Mola'],
        ['lake','Barbel','Mudfish','Sturgeon'] ] ]
      break;
    case 'grahtwood':
      fish = [
        [ ['blue'],
        ['foul','Bilious Catfish'],
        ['river','Greater Fangfin'],
        ['saltwater','Magrove Shark'],
        ['lake','Stickleback'] ],
        [ ['green'],
        ['foul','Snapper Eel','Swamp Eel'],
        ['river','Hog Sucker','Tiger Perch'],
        ['saltwater','Devil Ray','Mojarra'],
        ['lake','Dreughfish','Koi'] ] ]
      break;
    case 'greenshade':
      fish = [
        [ ['blue'],
        ['foul','Viperfish'],
        ['river','Xylo Piranha'],
        ['saltwater','Zebra Pompano'],
        ['lake','Jungle Bass'] ],
        [ ['green'],
        ['foul','Cusk Eel','Wolf-Eel'],
        ['river','Lyretail','Walleye'],
        ['saltwater','Manefish','Triggerfish'],
        ['lake','Archerfish','Murray Cod'] ] ]
      break;
    case 'malabaltor':
      fish = [
        [ ['blue'],
        ['foul','Ouze Toadfish'],
        ['river','Strident Leechfin'],
        ['saltwater','Abecean Halibut'],
        ['lake','Z\'en\'s Whitefish'] ],
        [ ['green'],
        ['foul','Ghastel Bass','Stargazer'],
        ['river','Mrigal','Stonefish'],
        ['saltwater','Ono','Sea Bass'],
        ['lake','Arowana','Inconnu'] ] ]
      break;
    case 'reapersmarch':
      fish = [
        [ ['blue'],
        ['foul','Slimeslither'],
        ['river','Strid Shad'],
        ['saltwater',''],
        ['lake','Forest Bream','Preposterous Mackerel'] ],
        [ ['green'],
        ['foul','Brotula','Reaper\'s Eel','Red Gurnard'],
        ['river','Flying Fish','Sheepshead','Sweetfish'],
        ['saltwater',''],
        ['lake','Brown Trout','Ladyfish'] ] ]
      break;
    case 'khenarthisroost':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river',''],
        ['saltwater','Pyandonean Ray'],
        ['lake',''] ],
        [ ['green'],
        ['foul',''],
        ['river',''],
        ['saltwater',''],
        ['lake',''] ] ]
      break;
    /* Daggerfall Covenant */
    case 'glenumbra':
      fish = [
        [ ['blue'],
        ['foul','Hag Fen Hagfish'],
        ['river','Brook Trout'],
        ['saltwater','Azurian Flounder'],
        ['lake','Cambray Perch'] ],
        [ ['green'],
        ['foul','Dragonfish','Lamprey'],
        ['river','Catfish','Warmouth'],
        ['saltwater','Finless Sole','Tuna'],
        ['lake','Powen','Rock Bass'] ] ]
      break;
    case 'stormhaven':
      fish = [
        [ ['blue'],
        ['foul','Gray Loach'],
        ['river','Dreugh Shrimp'],
        ['saltwater','Alcaire Pike'],
        ['lake','Silver Walleye'] ],
        [ ['green'],
        ['foul','Sawfish','Yellow Moray'],
        ['river','Grass Carp','River Stingray'],
        ['saltwater','Dab','Stormhaven Flounder'],
        ['lake','Barfish','Yellow Bass'] ] ]
      break;
    case 'rivenspire':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river','Ruby Trench'],
        ['saltwater','Northpoint Cod','Snakehead'],
        ['lake','Ichory Chub'] ],
        [ ['green'],
        ['foul',''],
        ['river','Ribbon Eel','Stream Catfish','Turbot'],
        ['saltwater','Dusky Grouper','Hake'],
        ['lake','Nase','Rivenspire Trout','Writhing Scrab'] ] ]
      break;
    case 'alikrdesert':
      fish = [
        [ ['blue'],
        ['foul','Midget Salmon','Sand Eel'],
        ['river',''],
        ['saltwater','Bonefish'],
        ['lake','Desert Pupfish'] ],
        [ ['green'],
        ['foul','Cutthroat Eel','Sand Moray'],
        ['river',''],
        ['saltwater','Alewife','Driftfish','Sablefish'],
        ['lake','Banded Killifish','Lungfish','Saw Belly'] ] ]
      break;
    case 'bangkorai':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river','Prickleback'],
        ['saltwater','Bjoulsae Hake'],
        ['lake','Lake Snapper','Scaly Lungfish'] ],
        [ ['green'],
        ['foul',''],
        ['river','Lenok','Panga','Pupfish'],
        ['saltwater','Morid Cod','Swai','Toadfish'],
        ['lake','Gar','Paddlefish'] ] ]
      break;
    case 'betnikh':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river',''],
        ['saltwater',''],
        ['lake',''] ],
        [ ['green'],
        ['foul',''],
        ['river',''],
        ['saltwater',''],
        ['lake',''] ] ]
      break;
    case 'strosmkai':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river',''],
        ['saltwater','Eltheric Grouper'],
        ['lake',''] ],
        [ ['green'],
        ['foul',''],
        ['river',''],
        ['saltwater',''],
        ['lake',''] ] ]
      break;
    /* Ebonheart Pact */
    case 'stonefalls':
      fish = [
        [ ['blue'],
        ['foul','Scum Carp'],
        ['river','Ash Shad'],
        ['saltwater','Akaviri Wrasse'],
        ['lake','Rainbow Zander'] ],
        [ ['green'],
        ['foul','Fungusfish','Stinkfish'],
        ['river','Ricefish','Thorny Catfish'],
        ['saltwater','Armorhead','Travally'],
        ['lake','Lake Chub','Tench'] ] ]
      break;
    case 'deshaan':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river','Toadstool Tilapia'],
        ['saltwater','Pikeblenny'],
        ['lake','Mud Lamprey','Old Man Gar'] ],
        [ ['green'],
        ['foul',''],
        ['river','Cutthroat Trout','Deshaan Chub','Mouthbrooder'],
        ['saltwater','Gibberfish','Monkfish','Mustard Eel'],
        ['lake','Gourami','Ide'] ] ]
      break;
    case 'shadowfen':
      fish = [
        [ ['blue'],
        ['foul','Coelcanth','Toxic Xoach'],
        ['river','Shark Tadpole'],
        ['saltwater',''],
        ['lake','Histcarp'] ],
        [ ['green'],
        ['foul','Eel-Goby','Pricklefish'],
        ['river','Boga','Hardyhead','Opah'],
        ['saltwater',''],
        ['lake','Orange Roughy','Quillback','Zander'] ] ]
      break;
    case 'eastmarch':
      fish = [
        [ ['blue'],
        ['foul','Ice Remora'],
        ['river','White River Pickerel'],
        ['saltwater','Ghost Haddock'],
        ['lake','King Sturgeon'] ],
        [ ['green'],
        ['foul','Modoc Sucker','Snipe Eel'],
        ['river','Ice Fish','Steelhead'],
        ['saltwater','Golem Shark','Pigfish'],
        ['lake','Char','Eastmarch Pike'] ] ]
      break;
    case 'therift':
      fish = [
        [ ['blue'],
        ['foul','Sulfursucker'],
        ['river','Muskellunge','White Roughy'],
        ['saltwater',''],
        ['lake','Ilinalta Trout'] ],
        [ ['green'],
        ['foul','Bream','Skate','Skorm'],
        ['river','Grouper','Sockeye Salmon'],
        ['saltwater',''],
        ['lake','Ice Koi','Jarl Salmon','Zebra Oto'] ] ]
      break;
    case 'bleakrockisle':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river',''],
        ['saltwater','Inner Sea Scalyfin'],
        ['lake',''] ],
        [ ['green'],
        ['foul',''],
        ['river',''],
        ['saltwater',''],
        ['lake',''] ] ]
      break;
    case 'balfoyen':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river',''],
        ['saltwater',''],
        ['lake',''] ],
        [ ['green'],
        ['foul',''],
        ['river',''],
        ['saltwater',''],
        ['lake',''] ] ]
      break;
    /* Cyrodiil & Neutral */
    case 'cyrodiil':
      fish = [
        [ ['blue'],
        ['foul','Sewer Eel'],
        ['river','Nibenay Trout'],
        ['saltwater','Topal Fanche'],
        ['lake','Rumare Bream'] ],
        [ ['green'],
        ['foul','Pufferfish','Quillfish'],
        ['river','Glassfish','Pirate Perch'],
        ['saltwater','Emperor Angelfish','Jewel Fish'],
        ['lake','Rainbow Fish','Yellow Perch'] ] ]
      break;
    case 'coldharbour':
      fish = [
        [ ['blue'],
        ['foul','Ghoulfish'],
        ['foul','Heinous Gar'],
        ['foul','Moray Leech'],
        ['foul','Stingerpike'] ],
        [ ['green'],
        ['foul','Azure Eel','Bichir'],
        ['foul','Blue Slimefish','Cavefish'],
        ['foul','Fang Shark','Harbour Gar'],
        ['foul','Plasm Darter','Venomfish'] ] ]
      break;
    case 'craglorn':
      fish = [
        [ ['blue'],
        ['river','Nedic Eel'],
        ['river','Yokudan Cod'],
        ['lake','Crag Salmon'],
        ['lake','Glasshead Barreleye'] ],
        [ ['green'],
        ['river','Bitterling','Dragon Goby'],
        ['river','Mermouth','Spiny Orcfish'],
        ['lake','Croaker','Forlorn Catfish'],
        ['lake','Ghost Knifefish','Nirn Flounder'] ] ]
      break;
    /* DLC and Chapter Zones */
    case 'imperialcity':
      fish = [
        [ ['blue'],
        ['foul','Aphotic Batfish'],
        ['foul','Cannibal Lancet'],
        ['foul','Glow-Spotted Blenny'],
        ['foul',''] ],
        [ ['green'],
        ['foul','Blobfin','Flabby Whalefish','Guiyu'],
        ['foul','Hatchetfish','Humpback Angler','Imperial Loosejaw'],
        ['foul','Scabrous Grenadier','Trapjaw Eel','Wen Loach'], 
        ['foul',''] ] ]
      break;
    case 'wrothgar':
      fish = [
        [ ['blue'],
        ['foul','Greater Ashmouth'],
        ['river','Chinlea'],
        ['saltwater','Blue-Ringed Octopus'],
        ['lake','Giant Hammerjaw'] ],
        [ ['green'],
        ['foul','Lesser Ashmouth','Pariah Lumpfish'],
        ['river','Nelma','Tum Weever'],
        ['saltwater','Black Scabbardfish','Hairy Coffinfish'],
        ['lake','Matron Eelpout','Vorkiposh'] ],
        [ ['purple'],
        ['foul',''],
        ['river',''],
        ['saltwater','Crab-Slaughter Crane'],
        ['lake',''] ] ]
      break;
    case 'hewsbane':
      fish = [
        [ ['blue'],
        ['foul','Keuppia'],
        ['river','Glass Catfish'],
        ['saltwater','Sparkling Anglermouth'],
        ['lake','Cichlid'] ],
        [ ['green'],
        ['foul','Daggertooth','Fringed Mudskipper'],
        ['river','Firemouth','Hew\'s Rasbora'],
        ['saltwater','Beggar Shark','Crestfish'],
        ['lake','Bala Shark','Cherry Barb'] ] ]
      break;
    case 'goldcoast':
      fish = [
        [ ['blue'],
        ['foul','Ghastly Batfish'],
        ['river','Bullface Wingfin'],
        ['saltwater','Sleeper Shark'],
        ['lake','Palatine Sabertooth'] ],
        [ ['green'],
        ['foul','Black Anvil Loach','Spiny Frogfish'],
        ['river','Gold Coast Crayfish','Longmouth Pike'],
        ['saltwater','Rattail','Scorpionfish'],
        ['lake','Hammer Bombil','Spotted Bass'] ] ]
      break;
    case 'clockworkcity':
      fish = [
        [ ['blue'],
        ['oily','Ancestor Wrasse'],
        ['oily','Barilzar\'s Grenadier'],
        ['oily','Enmegalabzu'],
        ['oily',''] ],
        [ ['green'],
        ['oily','Clicking Travally','Copperclaw Crayfish','Coppery Cucumber'],
        ['oily','Imperfect Blobfin','Oil-Eater Whalefish','Operant Eel'],
        ['oily','Orod','Verminous Catfish','Whisper Knifefish'],
        ['oily',''] ] ]
      break;
    case 'vvardenfell':
      fish = [
        [ ['blue'],
        ['foul','Oanna'],
        ['river','Ash Blindfish'],
        ['saltwater','Resdaynian Sailfin'],
        ['lake','Shalk-Brother Crayfish'] ],
        [ ['green'],
        ['foul','Firemouth Guiyu','Sleeper Coffinfish'],
        ['river','Netch-Hook Eel','Pilgrim Goby'],
        ['saltwater','Ghost Octopus','Weeping Pygmy Shark'],
        ['lake','Hoaga Oto','Pity Bombil'] ] ]
      break;
    case 'summerset':
      fish = [
        [ ['blue'],
        ['foul','Senche Flathead'],
        ['river','Great Yellowfin'],
        ['saltwater','Lingweloce'],
        ['lake','Crystal Hannia'] ],
        [ ['green'],
        ['foul','Burnish Groper','Copper Oreodory'],
        ['river','Anu\'s Travally','Eton Sprat'],
        ['saltwater','Quicksilver Lingwe','Radiant Dory'],
        ['lake','Blooming Flowerhorn','Dusk Arowana'] ] ]
      break;
    case 'artaeum':
      fish = [
        [ ['blue'],
        ['foul',''],
        ['river',''],
        ['saltwater','Pearlescent Crayfish'],
        ['lake',''] ],
        [ ['green'],
        ['foul',''],
        ['river',''],
        ['saltwater','Abyssal Sea Pig','Weaving Octopus'],
        ['lake',''] ] ]
      break;
    case 'murkmire':
      fish = [
        [ ['blue'],
        ['foul','Michinitl'],
        ['river','Hist Sap Shiner'],
        ['saltwater','Longlure Eelfin'],
        ['lake','Moist Scale Burrower'] ],
        [ ['green'],
        ['foul','Ayotichin','Lined Sole'],
        ['river','Kuuyicet','Thick Scaled Mullet'],
        ['saltwater','Fat Sleeper','Spotted Seatrout'],
        ['lake','Bowfin','Redear Sunfish'] ] ]
      break;
    case 'northernelsweyr':
      fish = [
        [ ['blue'],
        ['river','Greater Senchefin'],
        ['river','Hircine\'s Pupfish'],
        ['river','Moon-Sugar Shrimp'],
        ['river','Northern Elsweyr Moon Tetra'] ],
        [ ['green'],
        ['river','Cudgeon','Desert Sucker'],
        ['river','Freshwater Blenny','Galaxias'],
        ['river','Grayling','Reedfish'],
        ['river','Rimmen Bichir','Speckled Dace'] ] ]
      break;
  default:
    return false;
  }
  return fish;
}

/* Generate info text with finshing hole sums
 * and write it into the info-container
 */
function generateInfoText(alliance,zone) {
  var loc = getLocation(zone); /* sanitize zone */
  var x = document.getElementById('a-' + loc);
  var y = document.getElementById(alliance);
  var z = document.getElementById('info-container');
  var fish = getRareFish(loc);
  var txt = '';
  var innertxt = '';

  /* add zone as class to info container */
  z.className = '';
  z.classList.add('info-element ' + loc);

  /* add close button */
  txt = txt + '<div class="close" onclick="toggleClassElements(\'info-element\');">X</div>';

  // generate info text with statistics
  txt = txt + '<p>All fishing holes in ' + y.getAttribute('data-name') + ': <b>' + countAllFishingHoles(alliance) + '</b></p>';
  if (loc !== 'overlay') {
    txt = txt + '<p>All fishing holes in ' + x.innerHTML + ': <b>' + countAllFishingHoles(loc) + '</b></p>';
  }

  // generate rare fish info
  if (fish) {
    if (fish[1][1][2] && fish[1][2][2] && fish[1][3][2] && fish[1][4][2]) { // we have 4 columns
      var colclass = '-4';
      var containerclass = 'full';
    } else if ((!fish[1][1][2] && !fish[1][2][2] && !fish[1][3][2]) || // 1,2,3 // we only have 1 columns
               (!fish[1][1][2] && !fish[1][2][2] && !fish[1][4][2]) || // 1,2,4
               (!fish[1][1][2] && !fish[1][3][2] && !fish[1][4][2]) || // 1,3,4
               (!fish[1][2][2] && !fish[1][3][2] && !fish[1][4][2])) { // 2,3,4
      var colclass = '-1';
      var containerclass = 'dyn';
  } else { // we have more than 1 and less than 4 columns
    var colclass = '-3';
    var containerclass = 'full';
  }
  txt = txt + '<div id="rare-fish-container"><div class="rare-fish ' + containerclass + '">'; // table container
    for (i = 1; i < fish[0].length; i++) { // i ... number of columns: 4, 3, 1
      if (fish[0][i][1]) {
        innertxt = innertxt + '<div class="col col' + colclass + '"><div class="cell head ' + fish[0][i][0] + '"><div class="inner">' + fish[0][i][0] + '</div></div>';
        for (var j = 0; j < fish.length; j++) { // j ... fish raritiy: green, blue, purple
          if (fish[j]) {
            for (var k = 1; k < fish[j][i].length; k++) { // k ... rare fish name
              if (fish[j][i][k]) {
                innertxt = innertxt + '<div class="cell fish ' + fish[j][0][0] + '"><div class="inner">' + fish[j][i][k] + '</div></div>';
              }
            }
          }
        }
      innertxt = innertxt + '</div>';
      }
    }
  if (innertxt) {
    txt = txt + innertxt;
  } else {
    txt = txt + '<em>No rare fish here :-(</em>';
  }
  txt = txt + '</div></div>';
  }

  // replace info-container content
  document.getElementById('info-container').innerHTML = txt;
}

/* Increase fishing pin size
 */
function zoomInFishingHoles() {
  var x = document.getElementById('fishing-map-container');
  if (x.classList.contains('mminus')) {
    x.classList.remove('mminus'); // zoom -1
  } else {
    if (x.classList.contains('minus')) {
      x.classList.remove('minus'); // zoom +-0
    } else {
      if (x.classList.contains('plus')) {
        x.classList.add('pplus'); // zoom +2
      } else {
        x.classList.add('plus'); // zoom +1
      }
    }
  }
}

/* Decrease fishing pin size
 */
function zoomOutFishingHoles() {
  var x = document.getElementById('fishing-map-container');
  if (x.classList.contains('pplus')) {
    x.classList.remove('pplus'); // zoom +1
  } else {
    if (x.classList.contains('plus')) {
      x.classList.remove('plus'); // zoom +-0
    } else {
      if (x.classList.contains('minus')) {
        x.classList.add('mminus'); // zoom -2
      } else {
        x.classList.add('minus'); // zoom -1
      }
    }
  }
}

/* Increase fishing map size by increasing
 * max-width and max-height of zoom-width 
 * and zoom-height class elements
 */
function zoomInFishingMap() {
  var x = document.getElementsByClassName('zoom-width');
  var y = document.getElementsByClassName('zoom-height');
  for (var i = 0; i < x.length; i++) {
    if (parseInt(x[i].style.maxWidth.replace(/px/,"")) < 1910) {
      x[i].style.maxWidth = parseInt(x[i].style.maxWidth.replace(/px/,''))+100 + 'px';
    }
  }
  for (var i = 0; i < y.length; i++) {
    if (parseInt(y[i].style.maxHeight.replace(/px/,"")) < 1910) {
      y[i].style.maxHeight = parseInt(y[i].style.maxHeight.replace(/px/,""))+100 + 'px';
    }
  }
}

/* Increase fishing map size by decreasing
 * max-width and max-height of zoom-width 
 * and zoom-height class elements
 */
function zoomOutFishingMap() {
  var x = document.getElementsByClassName('zoom-width');
  var y = document.getElementsByClassName('zoom-height');
  for (var i = 0; i < x.length; i++) {
    if (parseInt(x[i].style.maxWidth.replace(/px/,"")) > 610) {
      x[i].style.maxWidth = parseInt(x[i].style.maxWidth.replace(/px/,""))-100 + 'px';
    }
  }
  for (var i = 0; i < y.length; i++) {
    if (parseInt(y[i].style.maxHeight.replace(/px/,"")) > 610) {
      y[i].style.maxHeight = parseInt(y[i].style.maxHeight.replace(/px/,""))-100 + 'px';
    }
  }
}