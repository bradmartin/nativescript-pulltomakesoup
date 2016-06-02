import { EventData, Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Color } from "color";
import * as app from "application";
import * as platformModule from "platform";


let users = [
    { name: 'Billy Bob' },
    { name: 'Tweeder' },
    { name: 'Mox' },
    { name: 'Coach' }, 
    { name: 'Lance' },
    { name: 'Johnson' },
    { name: 'William' },
    { name: 'Franklin' }
]; 
let viewModel = new Observable({
    users: new ObservableArray(users)
});

function pageLoaded(args) {
    let page = args.object;
    // Change statusbar color on Lollipop

    if (app.android && platformModule.device.sdkVersion >= "21") {
        let window = app.android.startActivity.getWindow();
        window.setStatusBarColor(new Color("#1976D2").android);
    }
    page.bindingContext = viewModel; 
    loadItems();
}
exports.pageLoaded = pageLoaded;

function loadItems() {
    return new Promise(function (resolve, reject) {
        try { 
            (20).times(function (i) {
                var item = users[Math.floor(Math.random() * users.length)];
                viewModel.users.unshift(item);
            });
            resolve("great success");

        } catch (ex) {
            reject(ex);
        }
    });
}

function refreshList(args) {

    let pullRefresh = args.object;

    loadItems().then(function (response) {
        console.log(response);
        // ONLY USING A TIMEOUT TO SIMULATE/SHOW OFF THE REFRESHING
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 4500);
    }, function (err) {
        pullRefresh.refreshing = false;
        alert(err);
    }); 
}
exports.refreshList = refreshList;


function refreshLoaded(args) {
    console.log('REFRESH LOADED');
}
exports.refreshLoaded = refreshLoaded;


Number.prototype.times = function (func) {
    for (let i = 0; i < Number(this) ; i++) {
        func(i);
    }
}