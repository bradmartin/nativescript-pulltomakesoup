import  * as common from "./pulltomakesoup-common";
import { PropertyChangeData } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";


function refreshingPropertyChanged(data: PropertyChangeData) {
    var pullRefresh = <PullToMakeSoup>data.object;
    if (!pullRefresh.android) {
        return;
    }

    pullRefresh.android.setRefreshing(data.newValue);
}

// register the setNativeValue callback
(<PropertyMetadata>common.PullToMakeSoup.refreshingProperty.metadata).onSetNativeValue = refreshingPropertyChanged;


global.moduleMerge(common, exports);

declare var android: any;

export class PullToMakeSoup extends common.PullToMakeSoup {    
    private _android: com.yalantis.pulltomakesoup.PullToRefreshView;
    private _androidViewId: number;
    
    constructor() {
        super();
    }

    get android(): com.yalantis.pulltomakesoup.PullToRefreshView {
        return this._android;
    }

    get _nativeView(): com.yalantis.pulltomakesoup.PullToRefreshView {
        return this._android;
    }

    public _createUI() { 

        this._android = new com.yalantis.pulltomakesoup.PullToRefreshView(this._context);

        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);

        let that = new WeakRef(this);
        
        this._android.setOnRefreshListener(new com.yalantis.pulltomakesoup.PullToRefreshView.OnRefreshListener({
            get owner() {
                return that.get();
            },

            onRefresh: function (v) {
                let owner = that.get();
                if (owner) {
                    owner.refreshing = true;
                    owner._emit(common.PullToMakeSoup.refreshEvent);
                }
            }
        }));
    }
}