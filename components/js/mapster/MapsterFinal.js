
var $map 
(function(window,L,List) {
  
  var Mapster = (function(){
    function Mapster(element,options) {
    this.ws = new WebSocket('ws://193.136.93.45:4000')
    this.lMap = L.map(element,options);
    $map = this;

    var mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam9hb3J1ZmlubyIsImEiOiJjamY4NDJkMXowZDMwMndvYnptY2M0cWtyIn0.OGEHlY7S0hSuSdWaRWx5jQ', {
   //L.tileLayer('http://193.136.93.188:8080/styles/klokantech-basic/{z}/{x}/{y}.png', {
    id: 'mapbox.streets'
  })
    this.drawnItems = L.featureGroup().addTo(this.lMap)
   	
   	L.control.layers({
        "Offline": L.tileLayer('http://127.0.0.1:8080/styles/klokantech-basic/{z}/{x}/{y}.png',{id: 'osm.streets'}).addTo(this.lMap),
        "Mapbox": mapbox.addTo(this.lMap),
       	"Google": L.tileLayer('http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'),
       	"Satellite": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'),
       	"Osm":    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{id: 'custom.streets'}).addTo(this.lMap)
    }, { 'Traces': this.drawnItems }, { position: 'topright', collapsed: false }).addTo(this.lMap);
   
    	this.lMap.addControl(new L.Control.Draw({
        edit: {
            featureGroup: this.drawnItems,
            poly: {
                allowIntersection: false
            }
        },
	    draw: {
		    polygon: {
			    allowIntersection: false,
			    showArea: true
	            }
            }
        
    }));
	  

  this.markerCluster = L.markerClusterGroup();
  this.markers= List.create();
  this.newMarker;
  this.vehicle;

  }
 
  Mapster.prototype = {
  				clickListener: function () {
				self=this;
			/*	this.lMap.on('click', function(event){
					evt=event
					self._form(evt)
				});
			*/
				this.lMap.on(L.Draw.Event.CREATED, function (event) { 		
				var layer = event.layer;
				if(event.layerType=="marker"){
				self._form(layer)
				}else{
        			self.drawnItems.addLayer(layer);
				}
					
    			});
				/*this.markerCluster.on('click', function (a) {
					console.log(a)
						self.removeMarker(a.sourceTarget)
				});*/		

				return false	
			},
			addClusterer: function(){
				this.lMap.addLayer(this.markerCluster);
			},
			updateVehiclePosition: function(opts){
				if(this.vehicle){
					this.removeMarker(this.vehicle)
				/*	this.lMap.removeLayer(this.vehicle);
					this.markerCluster.removeLayer(this.vehicle);
					this.markers.remove(this.vehicle);*/
				}
				if(!opts.latlng){
					opts.latlng=[opts.lat,opts.lng];
				}
				/*var point = this.lMap.latLngToContainerPoint(opts.latlng);
				var newPoint = L.point([point.x + 5, point.y + 25]);
				var newLatLng = this.lMap.containerPointToLatLng(newPoint);*/

				this.vehicle = this._createMarker({
							latlng : opts.latlng,
				            content :   '<div id="google-popup"><center><p><h4>Vehicle</h4>' +
	          					    	 '<img src=/components/images/car.svg style="width:57px;height:59px;">' +
	          							 '</center><h5>ID:1</h5></p></div>' ,
				            icon: '/components/images/car.svg'
				       		 });
				//Drop a new Marker with our Edit Form
				this.vehicle.addTo(this.lMap);
				},
			removeMarker: function(marker){

				this.markers.remove(marker);
				this.markerCluster.removeLayer(marker);
				this.lMap.removeLayer(marker);
			},
			_form: function(event){
				var e=event;
				console.log(e._latlng);
				self=this
				if(this.newMarker){
					self.lMap.removeLayer(this.marker)	
				}
				var contentString = $('<div class="marker-info-win">'+
					'<div class="marker-inner-win"><span class="info-content">'+
					'<h1 class="marker-heading"><center>'+"NEW MARKER"+'</center></h1>'+
                                        Mapster.TRACESFORM+
					Mapster.CAUSECODEFORM+
					'</span><button name="remove-marker" class="remove-marker" title="Remove Marker">Remove Marker</button>'+
					'</div></div>');
				this.newMarker = this._createMarker({
							latlng : e.getLatLng(),
				            content : contentString[0],
				            icon: '/components/images/new.svg'
				       		 });
				
				var removeBtn 	= contentString.find('button.remove-marker')[0];
				var saveBtn 	= contentString.find('button.save-marker')[0];

				//Drop a new Marker with our Edit Form
				this.newMarker.addTo(this.lMap);
				this.newMarker.openPopup();
				self.marker=this.newMarker;

				L.DomEvent.on(removeBtn, "click", function(event) {
					self.lMap.removeLayer(self.marker)	
					
				});
		
		if(typeof saveBtn !== 'undefined') //continue only when save button is present
		{
			
			//add click listner to save marker button
			L.DomEvent.on(saveBtn, "click", function(event) {
				var traces = parseInt(contentString.find('select.traces-type')[0].value) //type of traces  
				var code = contentString.find('select.event-type')[0].value //type of marker 
				var i
				for (i = 0; i < traces; i++){
					var polyline = new  L.Draw.Polyline(self.lMap);
					console.log(e._latlng)
				        polyline.enable();
					polyline.addVertex(e.getLatLng())

				}
				var codes = code.split(',')
				var latlng = self.marker.getLatLng()
				self.removeMarker(self.marker)
				self.ws.send(JSON.stringify({ 
					Msg_type : 0, 
			        CauseCode : parseInt(codes[0]),
			        SubCauseCode: parseInt(codes[1]), 
			        Lat: parseInt(latlng.lat*10000000), 
			        Lng: parseInt(latlng.lng*10000000),
			        Timestamp: new Date().getTime() + 1072915200000,
			        Termination: 0
						}));
					});
				}

				return false
				},
			
			_on: function(opts){
				var self = this;
				opts.obj.on(opts.event, function(e){
				opts.callback.call(self,e,opts.obj);
				});
			},

			//add marker
			//in order to keep the other method private
			//not sure if it is the best option
			addMarker: function(opts){
				var marker, //need this to pass to event
				self = this;
				if(!opts.latlng){
				opts.latlng = [opts.lat,opts.lng]
				}
				console.log(opts.timestamp)
				console.log(opts.latlng)				
				var code = this.switch_opts(opts);
				opts.content=code.content;
				opts.icon=code.icon;
				marker=this._createMarker(opts);
				//this._addMarker(marker);
				console.log(marker)
				this.markerCluster.addLayer(marker);
				this.markers.add(marker);


				if(opts.events){
					this._attachEvents(marker,opts.events);
				}
				if(opts.content) {
					 // to pass to other function
					this._on({
						obj: marker,
						event: 'mouseover',
						callback: function(c){
							c.target.openPopup();

						}
					}),
					this._on({
						obj: marker,
						event: 'mouseout',
						callback: function(c){
							c.target.closePopup();
						}
					})
					
				}
				return marker; //for info window
			},
			_attachEvents: function(obj, events){
				var self = this;
				events.forEach(function(event){
					self._on({
						obj: obj,
						event: event.name,
						callback: event.callback
						});
					});
			},
			switch_opts: function(opts){
					var content
					var icon
					console.log(opts.timestamp);
		switch(opts.code){
      	 case 2:
          switch(opts.subcode) {
            //Common Accident
            case 0:
            content = "Normal car accident"
            icon = "/components/images/accident.svg"
            break;

            //Multiple Vehicle Accident
            case 1:
            content = "Car accident involving multiple vehicles"
            icon = "/components/images/accident_multiple_vehicles.svg"
            break;

            //Heavy Accident
            case 2:
            content = "Heavy car accident"
            icon = "/components/images/accident_heavy.svg"
            break;

            //Lorry Accident
            case 3:
            content = "Car accident involving lorry"
            icon = "/components/images/accident_lorry.svg"
            break;

            //Bus Accident
            case 4:
            content = "Bus accident"
            icon = "/components/images/accident_bus.svg"
            break;

            //Hazardous Accident
            case 5:
            content = "Car accident involving hazardous materials"
            icon = "/components/images/accident_hazardous_materials.svg"
            break;

            //Unsecured Accident
            case 7:
            content = "Unsecured accident"
            icon = "/components/images/accident_unsecured.svg"
            break;

            default:
            content = "Car accident"
            icon = "/components/images/default.svg"
            break;
          }
        	break;
        //RoadWorks
        case 3:
          switch(opts.subcode) {
            case 0:
            content = "Road works"
            icon = "/components/images/road_works.svg"
            break;
            case 3:
            content = "Slow moving vehicle"
            icon = "/components/images/slow_moving_vehicle.svg"
            break;
	    default:
            content = "Road works"
            icon = "/components/images/default.svg"
            break;
          }
          break;

        //Objects on the road
        case 10:
          switch(opts.subcode) {
            case 0:
            content = "Objects on the road"
            icon = "/components/images/obstacle.svg"
            break;
            default:
            content = "Objects on the road"
            icon = "/components/images/default.svg"
            break;
          }
          break;

          
        //Animals on the road
        case 11:
          switch(opts.subcode) {
            case 0:
            content = "Animal on the road"
            icon = "/components/images/animals_on_the_road.svg"
            break;
            case 1:
            content = "Wild animal on the road"
            icon = "/components/images/animals_on_the_road_wild.svg"
            break;
            case 2:
            content = "Herd of animals on the road"
            icon = "/components/images/animals_on_the_road_herd.svg"
            break;
            case 3:
            content = "Small animal on the road"
            icon = "/components/images/animals_on_the_road_small.svg"
            break;
            case 4:
            content = "Large animal on the road"
            icon = "/components/images/animals_on_the_road_large.svg"
            break;
            default:
            content = "Animals on the road"
            icon = "/components/images/default.svg"
            break;
          }
          
          break;

        //People on the road 
        case 12:
          switch(opts.subcode) {
            case 0:
            content = "Human presence on the road"
            icon = "/components/images/human_on_the_road.svg"
            break;
            default:
            content = "Human presence on the road"
            icon = "/components/images/default.svg"
            break;
          }
          break;

        //Reduced visibility
        case 18:
          switch(opts.subcode) {
            case 0: 
            content = "Visibility Low"
            icon = "/components/images/visibility_low.svg"
            break;
            case 1:
            content = "Fog - Visibiliy Reduced"
            icon = "/components/images/visibility_fog.svg"
            break;
            default:
            content = "Reduced Visibility"
            icon = "/components/images/default.svg"
            break;
          }
          break;
        //Dangerous situation
        case 99:
          switch(opts.subcode) {
            case 1:
            content = "Emergency eletronic break lights"
            icon = "/components/images/eletronic_breaks.svg"
            break;

            default:
            content = "Dangerous Situation"
            icon = "/components/images/default.svg"
            break;
          }
          break;  

        case 69:
        switch(opts.subcode) {
        	        //PIKACHU FOR THE WIN
	        case 1:
	          content = "PIKA!!! PIKA!!"
	          icon = "/components/images/pikapika.svg"
	          break;
        case 2:
          content = "GRRRRRRARRR"
          icon = "/components/images/charizard.svg"
          break;
        default:
            content = "Dangerous Situation"
            icon = "/components/images/default.svg"
            break;
        }
        break;

        default:
          console.log("DEFAULT")
          content = "DENM code unkown"
            icon = "/components/images/default.svg"
            break;
			
		}
			var timestamp =new Date(opts.timestamp + 1072915200000) 
			return { 'content' : '<div id="google-popup"><center><p><h3>' + content + '</h3>' + '<img src=' + icon +' style="width:57px;height:59px;">'+
      				'<h4>'+timestamp.toLocaleString('en-GB', { timeZone: 'Europe/Lisbon' })+'</h4>' +
      				'<h6>Code: ' + opts.code + ',' + opts.subcode +' .' +'</h6></center>',
      				//opts.timestamp +'</h6></p></div>', 
       				'icon' : icon }
      	},


			findBy: function(callback){
				this.markers.find(callback);
			},
			removeBy:function(callback){
				var self = this;
				self.markers.find(callback,function(markers){
					markers.forEach(function(marker){

							self.markers.remove(marker);
							self.markerCluster.removeLayer(marker);
							self.lMap.removeLayer(marker);

					});
				});
			},
			_refresh: function(){
				this.pruneCluster.ProcessView();
			},
			updateBy:function(callback,pos){
				var self = this;
				self.markers.find(callback,function(markers){
					markers.forEach(function(marker){
							console.log(pos)
							marker.setPosition(pos)
					});
				});
			},
			_createMarker: function(opts) {
        	opts.map = this.lMap;
        	var icon = L.icon({
			    iconUrl: opts.icon,
			    iconSize:     [28, 30], // size of the icon
			    iconAnchor:   [10, 30], // point of the icon which will correspond to marker's location
			    popupAnchor:  [4,-30] // point from which the popup should open relative to the iconAnchor
			});
			var options = Mapster.MARKER_OPTIONS
			options.icon = icon;
			if(opts.id==7)
			{
			return L.marker(this.vehicle.getLatLng(), Mapster.MARKER_OPTIONS).bindPopup(opts.content,{
	            			keepInView: true,
	            			closeButton: false
	            			})
     		 }
        	return L.marker(opts.latlng, Mapster.MARKER_OPTIONS).bindPopup(opts.content,{
	            			keepInView: true,
	            			closeButton: false
	            			})
      }
  };
  return Mapster;
}());

	Mapster.showCoordinates = function (e) {
		console.log(e);
        alert(e.latlng);
      }
     Mapster.delete = function(e) {
     	var latlng = e.relatedTarget.getLatLng();
     	var content = e.relatedTarget.getPopup().getContent();
     	content = content.substring(content.lastIndexOf(":")+1,content.lastIndexOf("."));
     	codes=content.split(",");

     	$map.ws.send(JSON.stringify({ 
			Msg_type : 0, 
		    CauseCode : parseInt(codes[0]),
		    SubCauseCode: parseInt(codes[1]), 
		    Lat: parseInt(latlng.lat*10000000), 
		    Lng: parseInt(latlng.lng*10000000),
		    Timestamp: new Date().getTime(),
		    Termination: 1
			}));

     	//$map.removeMarker(e.relatedTarget)
     }    
      
Mapster.create=function(element,opts){
		return new Mapster(element,opts);
	};
	//connect to the window
	window.Mapster = Mapster;
  
}(window, L,List));
