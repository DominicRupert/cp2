//NOTE why wont button get disabled
let brain = 0;

let upgrades = {
  samEdge: {
    name: "Samurai Edge",
    price: 25,
    brains: 1,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/920568/ss_2a38bab3de07ed4a1f7a25e6a5ffab1397950144.1920x1080.jpg?t=1592792440",
    qty: 0,
  },

  shotGun: {
    name: "striker",
    price: 100,
    brains: 5,
    image:
      "https://www.evilresource.com/images/data/full/re4/striker.png?b830e8cf",
    qty: 0,
  },
};
function drawUpgrades() {
  let template = "";

  for (const key in upgrades) {
    let upgrade = upgrades[key];

    template +=
      /*html*/
      `
       <div class="col-lg-6 d-flex align-items-center" >
    
    <div class="card " style="width: " >
    <img class="img-fluid card-img-top "style= ""   src="${upgrade.image}" alt="">
    <div class="card-body">
    <h4 class="card-title">${upgrade.name}: ${upgrade.qty}</h4>
    <h5>adds ${upgrade.brains} brains per click </h5>
    <button class="btn btn-primary pb-2" type="button"  id="upButton${upgrade.name}" onclick="buy('${key}')" >buy <span class="mdi mdi-brain"></span>${upgrade.price}</button> 
    </div>
    </div>
    </div>
    `;
    
  }
  
  // update()
  document.getElementById("upgrades").innerHTML = template;
  
}

let autoUpgrades = {
  miniGun: {
    name: "MiniGun",
    price: 200,
    brains: 25,
    image:
      "https://www.evilresource.com/images/data/full/re5/gatling-gun.png?5131483f",
    qty: 0,
  },
  prl: {
    name: "PRL-412",
    price: 500,
    brains: 50,
    image: "https://i.redd.it/04bbux2bvei81.jpg",
    qty: 0,
  },
};

function drawAutoUpgrades() {
  let template = "";

  for (const key in autoUpgrades) {
    let autoUpgrade = autoUpgrades[key];

    template +=
      /*html*/
      ` 
    <div class="col-lg-6 px-3 d-flex align-items-center" >
    <div class="card" style="width: ">
    <img class="img-fluid card-img-top"   src="${autoUpgrade.image}" alt="">
    <div class="card-body">
    <h4 class="card-title">${autoUpgrade.name}: ${autoUpgrade.qty}</h4>
    <h5>adds ${autoUpgrade.brains} brains per second </h5>
    <button  type="button"  class="btn btn-primary" id="autoButton${autoUpgrade.name}"  onclick="aBuy('${key}')" >buy <span class="mdi mdi-brain">${autoUpgrade.price}</span></button>
    </div>
    </div>
    </div>
    `;
  }
  document.getElementById("autoUpgrades").innerHTML = template;
}


function saveGame(){
  window.localStorage.setItem("upgrades", JSON.stringify(upgrades))
  window.localStorage.setItem("autoUpgrades", JSON.stringify(autoUpgrades))
  window.localStorage.setItem("brain", JSON.stringify(brain))
  
}
function loadGame(){
  let clickUpgrade=JSON.parse(window.localStorage.getItem("upgrades"))
  let autoUpgrade=JSON.parse(window.localStorage.getItem("autoUpgrades"))
  let gameData=JSON.parse(window.localStorage.getItem("brain"))
  if (gameData) {
    autoUpgrades= autoUpgrade
    upgrades = clickUpgrade
    brain = gameData
    
  }
 
 
}
function clearData(){
  
  localStorage.clear()
  saveGame()
  loadGame()
  console.log("cleared", clearData);
}
function buy(name) {
  
  let upgrade = upgrades[name];
  if (upgrade.qty >= 0) {
    upgrade.qty += 1;
    brain -= upgrade.price;
    upgrade.price += 50;
  }
  update();
}
function aBuy(name) {
  let autoUpgrade = autoUpgrades[name];
  if (autoUpgrade.qty >= 0) {
    autoUpgrade.qty++;
    brain -= autoUpgrade.price;
    autoUpgrade.price += 100;
  }
 
  update();
}
function update() {
  hunk()
  
  drawUpgrades();
  drawAutoUpgrades();
  
  if (brain < 0) {
    brain = 0;
  }
  for (const price in upgrades) {
    let upgrade = upgrades[price];
    if (brain < upgrade.price) {
      // @ts-ignore
      document.getElementById(`upButton${upgrade.name}`).disabled = true;
    }
  }
  for (const price in autoUpgrades) {
    let autoUpgrade = autoUpgrades[price];
    if (brain < autoUpgrade.price) {
      // @ts-ignore
      document.getElementById(`autoButton${autoUpgrade.name}`).disabled = true;
    }
  }
  document.getElementById("brainCount").innerHTML = brain.toString();
  
}
function shoot(name) {
  for (const key in upgrades) {
    let upgrade = upgrades[key];
    brain += upgrade.qty * upgrade.brains;
    
  }
  // @ts-ignore
  let upgrade = upgrades[name];
  if (brain >= 0) {
    brain += 1;
  }
  document.getElementById("brainCount").innerHTML = brain.toString();
  update();
  saveGame()
}
// @ts-ignore
function autoShoot(name) {
  
  for (const key in autoUpgrades) {
    let autoUpgrade = autoUpgrades[key];

    if (autoUpgrade.qty > 0) {
      brain += autoUpgrade.brains * autoUpgrade.qty;
    }
  }
  document.getElementById("brainCount").innerHTML = brain.toString();
  update();
  saveGame()
}
let autoshootInterval = setInterval(autoShoot, 1000);
function hunk(){
  document.querySelector('#hunk').play()
}
console.log("cleared", clearData);

// clearData()
loadGame()
update();
