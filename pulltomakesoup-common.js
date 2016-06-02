"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var content_view_1 = require("ui/content-view");
var dependency_observable_1 = require("ui/core/dependency-observable");
var view_1 = require("ui/core/view");
var proxy_1 = require("ui/core/proxy");
var PullToMakeSoup = (function (_super) {
    __extends(PullToMakeSoup, _super);
    function PullToMakeSoup(options) {
        _super.call(this, options);
    }
    Object.defineProperty(PullToMakeSoup.prototype, "refreshing", {
        get: function () {
            return this._getValue(PullToMakeSoup.refreshingProperty);
        },
        set: function (value) {
            this._setValue(PullToMakeSoup.refreshingProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PullToMakeSoup.prototype._addChildFromBuilder = function (name, value) {
        var originalColor = value.style.color || null;
        if (value instanceof view_1.View) {
            this.content = value;
        }
        value.style.color = originalColor;
    };
    PullToMakeSoup.refreshEvent = "refresh";
    PullToMakeSoup.refreshingProperty = new dependency_observable_1.Property("refreshing", "PullToMakeSoup", new proxy_1.PropertyMetadata(false, dependency_observable_1.PropertyMetadataSettings.None));
    return PullToMakeSoup;
}(content_view_1.ContentView));
exports.PullToMakeSoup = PullToMakeSoup;
//# sourceMappingURL=pulltomakesoup-common.js.map