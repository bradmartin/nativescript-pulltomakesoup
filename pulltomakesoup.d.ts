/**
 * Contains the PullToMakeSoup class, which represents a Layout that contains the UI pattern for a custom pull-to-refresh
 */
declare module "nativescript-pulltomakesoup" {
    import dependencyObservable = require("ui/core/dependency-observable");
    import view = require("ui/core/view");
    import observable = require("data/observable");
    import contentView = require("ui/content-view");
    
    /**
     * Represents a standard PullToMakeSoup Layout
     */
    export class PullToMakeSoup extends contentView.ContentView {
        public static isRefreshingProperty: dependencyObservable.Property;

        /**
         * String value used when hooking to the onRefresh event.
         */
        public static refreshEvent: string;
       
        /**
         * Gets the native [android widget](https://github.com/Yalantis/pull-to-make-soup) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* com.yalantis.pulltomakesoup.PullToRefreshView */;
        
        /**
         * Because of iOS specific this returns the basic UIView. In order to access UIRefreshControl use the refreshControl property!
         */
        ios: any
        
        /**
         * Returns the native iOS UIRefreshControl
         */
        refreshControl: UIRefreshControl
        
        /*
        * Gets or sets if the view is refreshing
        */
        refreshing: boolean;

        /**
         * Raised when a refresh event occurs.
         */
        on(event: string, callback: (args: observable.EventData) => void, thisArg?: any);
        on(event: "refresh", callback: (args: observable.EventData) => void, thisArg?: any);
    }

}