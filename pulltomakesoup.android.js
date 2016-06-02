"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./pulltomakesoup-common");
function refreshingPropertyChanged(data) {
    var pullRefresh = data.object;
    if (!pullRefresh.android) {
        return;
    }
    pullRefresh.android.setRefreshing(data.newValue);
}
common.PullToMakeSoup.refreshingProperty.metadata.onSetNativeValue = refreshingPropertyChanged;
global.moduleMerge(common, exports);
var PullToMakeSoup = (function (_super) {
    __extends(PullToMakeSoup, _super);
    function PullToMakeSoup() {
        _super.call(this);
    }
    Object.defineProperty(PullToMakeSoup.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PullToMakeSoup.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    PullToMakeSoup.prototype._createUI = function () {
        this._android = new com.yalantis.pulltomakesoup.PullToRefreshView(this._context);
        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
        var that = new WeakRef(this);
        this._android.setOnRefreshListener(new com.yalantis.pulltomakesoup.PullToRefreshView.OnRefreshListener({
            get owner() {
                return that.get();
            },
            onRefresh: function (v) {
                var owner = that.get();
                if (owner) {
                    owner.refreshing = true;
                    owner._emit(common.PullToMakeSoup.refreshEvent);
                }
            }
        }));
    };
    return PullToMakeSoup;
}(common.PullToMakeSoup));
exports.PullToMakeSoup = PullToMakeSoup;
//# sourceMappingURL=pulltomakesoup.android.js.map