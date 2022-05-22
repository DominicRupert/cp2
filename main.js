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
       <div class="col-md-6 px-5"  >
    
    <div class="card" style="width: 18rem;" >
    <img class="img-fluid card-img-top"  src="${upgrade.image}" alt="">
    <div class="card-body">
    <h3 class="card-title">${upgrade.name}: ${upgrade.qty}</h3>
    <h4>adds ${upgrade.brains} brains per click </h4>
    <button class="btn btn-primary" type="button"  id="upButton" onclick="buy('${key}')" >buy <span class="mdi mdi-brain"></span>${upgrade.price}</button> 
    </div>
    </div>
    </div>
    `;
    console.log('disable button', upgrade);
  }
  document.getElementById("upgrades").innerHTML = template;
  // update()
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
    <div class="col-md-6 px-5" >
    <div class="card" style="width: 18rem;">
    <img class="img-fluid card-img-top"   src="${autoUpgrade.image}" alt="">
    <div class="card-body">
    <h3 class="card-title">${autoUpgrade.name}: ${autoUpgrade.qty}</h3>
    <h4>adds ${autoUpgrade.brains} brains per second </h4>
    <button  type="button"  class="btn btn-primary" id="autoButton"  onclick="aBuy('${key}')" >buy <span class="mdi mdi-brain">${autoUpgrade.price}</span></button>
    </div>
    </div>
    </div>
    `;
  }
  
 
  document.getElementById("autoUpgrades").innerHTML = template;
  // update()
}
drawUpgrades();
  drawAutoUpgrades();
update()
function buy(name) {
  console.log(name);
  let upgrade = upgrades[name];
  

  if (brain < upgrade.price) {
    upgrade.qty += 0;
  }
  if (upgrade.qty >= 0) {
    upgrade.qty += 1;
    brain -= upgrade.price;
    upgrade.price += 50;
  }

  update();
}

function aBuy(name) {
  // updateAutoButtons()

  let autoUpgrade = autoUpgrades[name];
  if (autoUpgrade.qty >= 0) {
    autoUpgrade.qty++;
    brain -= autoUpgrade.price;
    autoUpgrade.price += 100;
  }
 
  //   console.log(upgrade, "bought");

  //   console.log();
  update();
}

function update() {
  if (brain < 0) {
    brain = 0;
  }
  
    for (const price in upgrades) {
      let upgrade = upgrades[price];
      if (brain.toString() < upgrade.price) {
        document.querySelector("#button").disabled = true;
      }
    }
    for (const price in autoUpgrades) {
      let autoUpgrade = autoUpgrades[price];
    
    if (brain.toString() < autoUpgrade.price) {
      document.querySelector("#button").disabled = true;
    }
  }
      
  
   
  }

 
  document.getElementById("brainCount").innerHTML = brain.toString();
  // drawUpgrades()


drawUpgrades();
drawAutoUpgrades();
update();


// function disButton() {
//   for (const key in upgrades) {
//     let upgrade = upgrades[key];
//     if (brain < upgrade.price) {
//       document.getElementById("upButton").disabled = true;
//     }
//   }
//   update()
// }
// function disAutoButton() {
//   for (const key in autoUpgrades) {
//     let autoUpgrade = autoUpgrades[key];
//     if (brain < autoUpgrade.price) {
//       document.getElementById("autoButton").disabled = true;
//     }
//   }
//   update()
// }

function shoot(name) {
  for (const key in upgrades) {
    let upgrade = upgrades[key];
    brain += upgrade.qty * upgrade.brains;
    console.log(upgrade);
  }
  let upgrade = upgrades[name];
  if (brain >= 0) {
    brain += 25;
  }
  update();
}

function autoShoot(name) {
  for (const key in autoUpgrades) {
    let autoUpgrade = autoUpgrades[key];

    if (autoUpgrade.qty > 0) {
      brain += autoUpgrade.brains * autoUpgrade.qty;
    }
  }
  document.getElementById("brainCount").innerHTML = brain.toString();
 
}

let autoshootInterval = setInterval(autoShoot, 1000);
drawUpgrades();
drawAutoUpgrades();

update()
