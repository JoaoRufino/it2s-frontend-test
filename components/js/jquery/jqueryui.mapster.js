(function(window, Mapster){

	$.widget( "mapster.mapster", {
      // default options
      options: {
        // Callbacks
      },
 
      // The constructor
      _create: function() {
       var element = this.element[0], //jquery element its the first
       options = this.options;
       this.map = Mapster.create(element,options);
      },
 
      // Called when created, and later when changing options
      _refresh: function() {
       
      },
      updateVehiclePosition: function(opts){
        return this.map.updateVehiclePosition(opts)
      },
      addClusterer: function(){
        return this.map.addClusterer()
      },
      // public methods
      // can be called directly via .mapster( "random" )
      addMarker: function( opts ) {
       return this.map.addMarker(opts)
      },
      initZones: function() {
        return this.map.initZones()
      },
      clickListener: function() {
        return this.map.clickListener()
      },
      findMarkers:function(callback) {
      	return this.map.findBy(callback)
      },
      removeMarkers:function(callback) {
      	return this.map.removeBy(callback)
      },
      updateMarker:function(callback,pos){
        return this.map.updateBy(callback,pos)
      },
      switch_opts:function(opts){
        return this.map.switch_opts(opts)
      },
 
      // Events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
       
      },
 
      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply(arguments);
        this._refresh();
      },
 
      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
      	this._super(key,value);
        // prevent invalid color values
       }
    });


}(window, Mapster))
