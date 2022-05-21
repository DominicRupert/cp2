let brains = 0;

let upgrades = {
  samEdge: {
    name: "Samurai Edge",
    brains: 1,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/920568/ss_2a38bab3de07ed4a1f7a25e6a5ffab1397950144.1920x1080.jpg?t=1592792440",
    qty: 0,
    price: 25,
  },
  sGun: {
    name: "striker",
    brains: 5,
    image:
      "https://www.evilresource.com/images/data/full/re4/striker.png?b830e8cf",
    qty: 0,
    price: 100,
  },
};

let autoUpgrades = {
  miniGun: {
    name: "MiniGun",
    brains: 25,
    image:
      "https://www.evilresource.com/images/data/full/re5/gatling-gun.png?5131483f",
    qty: 0,
    price: 200,
  },
  prl: {
    name: "PRL-412",
    brains: 50,
    image: "https://i.redd.it/04bbux2bvei81.jpg",
    qty: 0,
    price: 500,
  },
};
update();
function buy(name) {
  console.log(name);
  let upgrade = upgrades[name];

  //   console.log(upgrade, "bought");
  
  if (upgrade.qty >= 0) {
    upgrade.qty++;
    brains -= upgrade.price;
  }

  //   console.log();
  drawUpgrades();
}

function aBuy(name) {
  console.log(name);
  let aUpgrade = autoUpgrades[name];
  //   console.log(upgrade, "bought");

  if (aUpgrade.qty >= 0) {
    aUpgrade.qty++;
    brains -= aUpgrade.price;
  }

  //   console.log();
  drawAutoUpgrades();
}
function drawUpgrades() {
  let template = "";
  for (const key in upgrades) {
    let upgrade = upgrades[key];

    console.log(key, "key");

    template +=
      /*html*/
      ` <div class="col-6 px-5">
        
        <div class="card" style="width: 18rem;">
        <img class="img-fluid card-img-top"  src="${upgrade.image}" alt="">
        <div class="card-body">
        <h3 class="card-title">${upgrade.name}: ${upgrade.qty}</h3>
        <h4>adds ${upgrade.brains} brains per click </h4>
        <button class="btn btn-primary" type="button"  id="btn" onclick="buy('${key}')" >buy <span class="mdi mdi-brain">${upgrade.price}</span></button> 
        </div>
        </div>
        </div>
    
        
        
        `;
        
  }
  document.getElementById("upgrades").innerHTML = template;
}

function drawAutoUpgrades() {
  let template = "";

  for (const key in autoUpgrades) {
    let aUpgrade = autoUpgrades[key];
    console.log(aUpgrade, "upgrades");
    template +=
      /*html*/
      ` <div class="col-6 px-5">
  <div class="card" style="width: 18rem;">
  <img class="img-fluid card-img-top"  src="${aUpgrade.image}" alt="">
  <div class="card-body">
  <h3 class="card-title">${aUpgrade.name}: ${aUpgrade.qty}</h3>
  <button id="aBtn" type="button" class="btn btn-primary"  onclick="aBuy('${key}')">buy<span class="mdi mdi-brain">${aUpgrade.price}</span></button>
  </div>
  </div>
  </div>
          
  
      </div>`;

    document.getElementById("autoUpgrades").innerHTML = template;
  }
}
function update(name) {
  let upgrade = upgrades[name];
  let aUpgrade = autoUpgrades[name];

  document.getElementById("brainCount").innerHTML = brains.toString();
  // @ts-ignore

  // @ts-ignore
}
function shoot(name) {
  //   console.log(name);
  for (const key in upgrades) {
    let upgrade = upgrades[key];

    console.log(upgrade);
    brains += upgrade.qty * upgrade.brains;
  }
  let upgrade = upgrades[name];
  if (brains >= 0) {
    brains++;
  }

  console.log(brains);
}
update();
function autoShoot(name) {
  for (const key in autoUpgrades) {
    let aUpgrade = autoUpgrades[key];
    console.log(buy);
    setInterval(() => {
      if (aUpgrade.qty > 0) {
        brains += aUpgrade.brains * aUpgrade.qty;
      }
      update();
    }, 500);
    console.log(brains);
  }
}

function updateButtons() {
    if (brains < upgrades.samEdge.price) {
        document.getElementById("btn").disabled = true;
      } else{
        document.getElementById("btn").disabled = false;
      }
  
}


autoShoot();

drawUpgrades();
drawAutoUpgrades();
