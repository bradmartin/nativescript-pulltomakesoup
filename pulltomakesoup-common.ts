import * as definition from "nativescript-pulltomakesoup";
import { ContentView } from "ui/content-view";
import { DependencyObservable, Property, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { View, Options } from "ui/core/view";
import { PropertyMetadata } from "ui/core/proxy";

export class PullToMakeSoup extends ContentView implements definition.PullToMakeSoup {
    public static refreshEvent = "refresh";

    public static refreshingProperty = new Property(
        "refreshing",
        "PullToMakeSoup",
        new PropertyMetadata(false, PropertyMetadataSettings.None)
    );

    constructor(options?: Options) {
        super(options);
    }

    get refreshing(): boolean {
        return this._getValue(PullToMakeSoup.refreshingProperty);
    }

    set refreshing(value: boolean) {
        this._setValue(PullToMakeSoup.refreshingProperty, value);
    }
    
    public _addChildFromBuilder(name: string, value: any) {
        // Copy inheirtable style property values
        var originalColor = value.style.color || null;
        
        if (value instanceof View) {
            this.content = value;
        }
        
        // Reset inheritable style property values as we do not want those to be inherited
        value.style.color = originalColor;
    }
}