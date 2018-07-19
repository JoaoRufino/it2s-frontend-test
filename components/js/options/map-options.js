(function(window,mapster){
  var bounds = [
      [
        40.6475641,
        -8.6888123
      ],
      [
        40.6149949,
        -8.7571335,
      ]];


//MAP menu ITEMS

      var mapMenuItems = [{
          text: 'Show coordinates',
          icon: 'images/deleted.svg',
          callback: Mapster.showCoordinates
      }];

      var markerMenuItems = [{
        text: 'Marker item',
        index: 0
    }, {
        separator: true,
        index: 1
      },
      {
          text: 'Delete',
          icon: 'images/deleted.svg',
          callback: Mapster.delete,
          context: this
        }];
  
//MAP OPTIONS
  mapster.MAP_OPTIONS ={
      center: [40.632141, -8.745390],
      //minZoom:14,
      zoom: 14,
      maxZoom:18,
      maxBounds:null,

      contextmenu: true,
      contextmenuWidth: 200,
      contextmenuItems: mapMenuItems,
      preferCanvas: false,
      attributionControl: false,
      zoomControl: false,
      closePopupOnClick: true,
      zoomSnap: 1,
      zoomDelta: 0.5,
      cluster: false,
      maxBounds: bounds,
      touchZoom:false 
    }
  
//MARKER OPTIONS
  mapster.MARKER_OPTIONS={
          contextmenu: true,
          contextmenuInheritItems: true,
          contextmenuItems: markerMenuItems
  }


//LEFT SLIDING MENU (DENM)
mapster.SLIDINGMENU = '<div class="form-style-10">' +
'<form>' +
  '<input id="management" class="toggle" type="checkbox" checked>'+
  '<label for="management" class="lbl-toggle">' +
  '<div class="section"><span>1</span>Management</div>'+
  '</label>' +
          '<div class="collapsible-content">' +
              '<div class="inner-wrap">' +
                  '<label>ActionID <input type="number" name="actionID" /></label>' +
                  '<label>DetectionTime  <input type="number" name="detectionTIme"></label>' +
                  '<label>ReferenceTime  <input type="number" name="ReferenceTIme"></label>' +
                  '<label>StationType  <select name="StationType">'+
                                      '<option value="0">Unknown</option>'+
                                      '<option value="1">Pedestrian</option>'+
                                      '<option value="2">Cyclist</option>'+
                                      '<option value="3">Moped</option>'+
                                      '<option value="4">Motorcycle</option>'+
                                      '<option value="5">PassengerCar</option>'+
                                      '<option value="6">Bus</option>'+
                                      '<option value="7">LightTruck</option>'+
                                      '<option value="8">HeavyTruck</option>'+
                                      '<option value="9">Trailer</option>'+
                                      '<option value="10">Tram</option>'+
                                      '<option selected="selected "value="15">RoadSideUnit</option>'+
              '</select></label>' +
              '</div>' +
            '</div>' +

    '<input id="situation" class="toggle" type="checkbox">'+
    '<label for="situation" class="lbl-toggle">' +
     '<div class="section"><span>2</span>Situation</div>' +
    '</label>' +
          '<div class="collapsible-content">' +
                '<div class="inner-wrap">' +
                '<label>Email Address <input type="email" name="field3" /></label>' +
                '<label>Phone Number <input type="text" name="field4" /></label>' +
                '</div>' +
            '</div>' +

    '<input id="location" class="toggle" type="checkbox">'+
    '<label for="location" class="lbl-toggle">' +
     '<div class="section"><span>3</span>Location</div>' + 
      '</label>' +
          '<div class="collapsible-content">' +
              '<div class="inner-wrap">' +
                '</div>' +
            '</div>' +
    
    '<input id="alacarte" class="toggle" type="checkbox">'+
    '<label for="alacarte" class="lbl-toggle">' +
    '<div class="section"><span>4</span>Alacarte</div>' +  
  '</label>' +
        '<div class="collapsible-content">' +
            '<div class="inner-wrap">' +
             '<label>Password <input type="password" name="field5" /></label>' +
             '<label>Confirm Password <input type="password" name="field6" /></label>' +
            '</div>' +
          '</div>' +

    '<div class="button-section">' +
     '<input type="submit" name="Submit" value="Submit"/>' +
      '<input type="reset" name="Reset" value="Reset"/>' +
    '</div>' +
'</form>' +
'</div>';



//MAPSTER OPTIONS

  mapster.EDITFORM = '<p><div class="marker-edit">'+
        '<form action="ajax-save.php" method="POST" name="SaveMarker" id="SaveMarker">'+
        '<label for="pType"><span>Type :</span> <select name="pType" class="save-type">'+
        /*
        '<optgroup label="Joao">' +
        '<option value="1,0">Hand</option>'+
        '<option value="1,1">Park</option>'+
        '<option value="1,2">Car</option> '+
        '<option value="1,3">Antenna</option>'+
        '<option value="1,4">Wifi</option>'+
        '<option value="1,5">temperature</option>'+
           
        '<optgroup label="Traffic Condition (1)">' +
        '<option value="1,0">Unavailable (0)</option>'+
        '<option value="1,1">Conditioned (1)</option>'+
        '<option value="1,2">Traffic Jam slowly increasing (2)</option> '+
        '<option value="1,3">Traffic Jam increasing (3)</option>'+
        '<option value="1,4">Traffic Jam strongly increasing (4)</option>'+
        '<option value="1,5">Traffic stationary (5)</option>'+
        '<option value="1,6">Traffic jam slightly decreasing (6)</option> '+
        '<option value="1,7">Traffic jam decreasing (7)</option> '+
        '<option value="1,8">Traffic jam strongly decreasing (8)</option> '+
*/
        '<optgroup label="Accidents (2)">' +
        '<option value="2,0">Unavailable (0)</option>'+
        '<option value="2,1">Multiple (1)</option>'+
        '<option value="2,2">Heavy (2)</option> '+
        '<option value="2,3">Lorry (3)</option>'+
        '<option value="2,4">Bus (4)</option>'+
        '<option value="2,5">Hazardous Materials (5)</option>'+
        '<option value="2,7">Unsecured Accident (7)</option> '+
        '<option value="2,8">Assistance requested (e-call) (8)</option> '+

        '<optgroup label="RoadWorks">' +
        '<option value="3,0">Unavailable (0)</option>'+
        '<option value="3,2">Road Making Work (2)</option>'+
        '<option value="3,3">Slow Moving Road Maintance (3)</option>'+
        '<option value="3,4">Stationary RoadWorks (4)</option>'+
        '<option value="3,5">Street cleaning (5)</option>'+
        '<option value="3,6">Winter Service (6)</option>'+

        '<optgroup label="Adheson (6)">' +
        '<option value="6,0">Unavailable (0)</option>'+
        '<option value="6,2">Fuel on Road (2)</option>'+          
        '<option value="6,3">Mud on Road (3)</option>'+          
        '<option value="6,4">Snow on Road (4)</option>'+          
        '<option value="6,5">Ice on Road (5)</option>'+          
        '<option value="6,6">Black Ice on Road (6)</option>'+          
        '<option value="6,7">Oil on Road (7)</option>'+          
        '<option value="6,8">Loose Chippings (8)</option>'+    

        '<optgroup label="Surface condition (9)">' +
        '<option value="9,0">Unavailable (0)</option>'+
        '<option value="9,5">Snow Drifts (5)</option>'+


        '<optgroup label="Obstacle on the Road (10)">' +
        '<option value="10,0">Unavailable (0)</option>'+
        '<option value="10,1">Shed Load (1)</option>'+
        '<option value="10,5">Fallen Trees (5)</option>'+

        '<optgroup label="Animal on the road (11)">' +       
        '<option value="11,0">Unavailable (0)</option>'+
        '<option value="11,1">Wild Animal (1)</option> '+
        '<option value="11,2">Herd of Animals (2)</option>'+
        '<option value="11,3">Small Animal (3)</option>'+
        '<option value="11,4">Large Animal (4)</option> '+

        '<optgroup label="People on the road (12)">' +
        '<option value="12,0">Unavailable (0)</option>'+
        '<option value="12,1">Children (1)</option>'+
        '<option value="12,1">Cyclists (2)</option>'+

        '<optgroup label="Wrong way driving (14)">' +
        '<option value="14,0">Unavailable (0)</option>'+
        '<option value="14,1">Wrong lane (1)</option>'+
        '<option value="14,2">Wrong driving direction (2)</option>'+

        '<optgroup label="Rescue and recover (15)">' +
        '<option value="15,0">Unavailable (0)</option>'+

        '<optgroup label="Extreme Weather Conditions (17)">' +
        '<option value="17,0">Unavailable (0) </option>'+
        '<option value="17,1">Wind (1)</option>'+

        '<optgroup label="Reduced Visibility (18)">' +
        '<option value="18,0">Unavailable (0)</option>'+
        '<option value="18,1">Fog (1)</option>'+
        '<option value="18,2">Smoke (2)</option>'+
        '<option value="18,3">Heavy Snowfall (3)</option>'+
        '<option value="18,6">Low Sun Glare (6)</option>'+

        '<optgroup label="Percipitation (19)">' +
        '<option value="19,0">Unavailable (0)</option>'+
        '<option value="19,1">Heavy Rain (1)</option>'+
        '<option value="19,2">Heavy SnowFall (2)</option>'+

        '<optgroup label="Slow Vehicle (26)">' +
        '<option value="26,0">Unavailable (0)</option>'+

          '<optgroup label="Dangerous End of Queue (27)">' +
          '<option value="27,0">Unavailable (0)</option>'+
        
        '<optgroup label="Vehicle Breakdow (91)">' +
          '<option value="91,0">Unavailable (0)</option>'+
          '<option value="91,1">Lack of Fuel (1)</option>'+
          '<option value="91,2">Lack of battery (2)</option>'+
          '<option value="91,3">Engine  (3)</option>'+
          '<option value="91,4">Transmission (4)</option>'+
          '<option value="91,5">Engine Cooling (5)</option>'+
          '<option value="91,6">Breaking system (6)</option>'+
          '<option value="91,7">Steering (7)</option>'+
          '<option value="91,8">Tyre puncture (8)</option>'+

        '<optgroup label="Post Crash (92)">' +
          '<option value="92,0">Unavailable (0)</option>'+
          '<option value="92,1">Without e-call (1)</option>'+
          '<option value="92,2">E-call Mannually Triggered (2)</option>'+
          '<option value="92,3">E-call Automatically Triggered (3)</option>'+
          '<option value="92,4">E-call triggered no cell network (4)</option>'+
      
        '<optgroup label="Post Crash (93)">' +
          '<option value="93,0">Unavailable (0)</option>'+
          '<option value="93,1">Glycaemia Problem (1)</option>'+
          '<option value="93,2">Hearth Problem (2)</option>'+

        '<optgroup label="Stationary Vehicle (94)">' +
        '<option value="94,1">Human Problem (1)</option>'+
        '<option value="94,2">Vehicle Break Down (2)</option>'+
        '<option value="94,3">Post Crash (3)</option>'+
        '<option value="94,4">Public Transport Stop (4)</option>'+
        '<option value="94,5">Carrying Dangerous Goods (5)</option>'+

        '<optgroup label="Emergency Vehicle Approaching (95)">' +
        '<option value="95,0">Unavailable (0)</option>'+
        '<option value="95,1">Emergency Vehicle Approaching (1)</option>'+
        '<option value="95,2">Prioritized Vehicle Approaching (2)</option>'+

        '<optgroup label="Indication - Dangerous Curve (96)">' +
        '<option value="96,0">Unavailable (0)</option>'+
        '<option value="96,1">Dangerous left turn curve (1)</option>'+
        '<option value="96,2">Dangerous right turn curve (2)</option>'+
        '<option value="96,2">Unknown turning direction (3)</option>'+
        '<option value="96,2">Multipl e curves with left turn (4)</option>'+
        '<option value="96,2">Multiple curves with right turn (5)</option>'+

        '<optgroup label="Collision Risk (97)">' +
        '<option value="97,0">Unavailable (0)</option>'+
        '<option value="97,0">Longitudinal Colision Risk (1)</option>'+
        '<option value="97,0">Crossing Colision Risk (2)</option>'+
        '<option value="97,0">Lateral Colision Risk (3)</option>'+
        '<option value="97,0">With Vulnerable Road User (4)</option>'+

        '<optgroup label="Signal Violation (98)">' +
        '<option value="98,0">Unavailable (0)</option>'+
        '<option value="98,0">Stop Sign Violation (1)</option>'+
        '<option value="98,0">Traffic Light Violation(2)</option>'+
        '<option value="98,0">Turning Regulation Violation (3)</option>'+

        '<optgroup label="Dangerous Situation (99)">' +
        '<option value="99,0">Unavailable (0)</option>'+
        '<option value="99,1">Eletronic Break Lights (1)</option>'+
        '<option value="99,1">Pre-Crash System Activated (2)</option>'+
        '<option value="99,1">ESP Activated (3)</option>'+
        '<option value="99,1">ABS Activated (4)</option>'+
        '<option value="99,1">AEB Activated (5)</option>'+
        '<option value="99,1">Break Warnings Activated (6)</option>'+
        '<option value="99,1">Collision Risk Warning Activated (7)</option>'+



        '<optgroup label="Pokemons">' +
        '<option value="69,1">PIKAAA</option>'+
         '<option value="69,2">CHARIZARD</option>'+

        '</select></label>'+
        '</form>'+
        '</div></p><button name="save-marker" class="save-marker">Save Marker Details</button>';


}(window,window.Mapster || (window.Mapster={})))