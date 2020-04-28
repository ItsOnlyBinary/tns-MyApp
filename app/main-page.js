const PlanetSelectViewModel = require("./main-view-model");
const Observable = require("tns-core-modules/data/observable").Observable;
const gestures = require("tns-core-modules/ui/gestures");
const dialogs = require("tns-core-modules/ui/dialogs");
const Image = require("tns-core-modules/ui/image").Image;
const Label = require("tns-core-modules/ui/label").Label;
const ToolTip = require("nativescript-tooltip").ToolTip;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/


// this is a function, could also be like
// const planetPath = function planetPath(id) { return '~/images/group/planets/planet' + id + '.png'; }
const planetPath = (id) => { return `~/images/group/planets/planet${id}.png`; }
const planetSelect = '~/images/select.png';
const planetNotSelect = '~/images/nonselect.png';

const planetsCount = 14;
const planets = [];

let sn = 0;
let planetImage = null;


function onNavigatingTo(args) {
    console.log('onNavigatingTo');
    const page = args.object;
    page.bindingContext = new PlanetSelectViewModel();

    planetImage = page.getViewById('planet-image');

    let xmlPlanets = page.getViewById('planets');
    for (let i = 0; i < planetsCount; i++) {
        let planet = new Image();
        if (i === sn) {
            planetImage.set('src', planetPath(i));
            planet.src = planetSelect;
        } else {
            planet.src = planetNotSelect;
        }
        planet.class = 'planets-circles';
        planets.push(planet);
        xmlPlanets.addChild(planet);
    }
    console.log('planetsLength', planets.length);
}

function onSelect() {
    console.log('onSelect');
    dialogs.confirm({
        title: "Are you sure?",
        message: "Do you want this to be your planet?",
        okButtonText: "Launch",
        cancelButtonText: "Abort",
    }).then(function (result) {
        // result argument is boolean
        console.log("Dialog result: " + result);
    });
}

function onSwipe(args) {
    console.log('onSwipe');
    if (args.direction == 2) {
        sn++;
    } else {
        sn--;
    }

    if (sn >= planets.length) {
        console.log("exceed");
        sn = 0;
    } else if (sn < 0) {
        sn = planets.length - 1;
    }

    console.log('sn:', sn);
    console.log('length:', planets.length);

    for (let i = 0; i < planets.length; i++) {
        if (i === sn) {
            planets[i].set('src', planetSelect);
            planetImage.set('src', planetPath(i));
        } else {
            planets[i].set('src', planetNotSelect);

        }
    }

}

function onHelpTap() {
    console.log('onHelpTap');
    let tip = new ToolTip(planetImage, { position: 'bottom', text: "Swipe to switch planets<br/>Tap to select"} );
    tip.show()
}



exports.onSwipe = onSwipe;
exports.onSelect = onSelect;
exports.onNavigatingTo = onNavigatingTo;
exports.onHelpTap = onHelpTap;