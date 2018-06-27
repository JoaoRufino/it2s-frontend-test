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
  

  mapster.MARKER_OPTIONS={
          contextmenu: true,
          contextmenuInheritItems: true,
          contextmenuItems: markerMenuItems
  }
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
           */
        '<optgroup label="Accidents">' +
        '<option value="2,0">Unavailable</option>'+
        '<option value="2,1">Multiple</option>'+
        '<option value="2,2">Heavy</option> '+
        '<option value="2,3">Lorry</option>'+
        '<option value="2,4">Bus</option>'+
        '<option value="2,5">Hazardous Materials</option>'+
        '<option value="2,7">Unsecured Accident</option> '+

        '<optgroup label="RoadWorks">' +
        '<option value="3,0">Unavailable</option>'+
        '<option value="3,3">Slow moving vehicle</option>'+

        '<optgroup label="Obstacle on the Road">' +
        '<option value="10,0">Unavailable</option>'+

        '<optgroup label="Animal on the road">' +       
        '<option value="11,0">Unavailable</option>'+
        '<option value="11,1">Wild Animal</option> '+
        '<option value="11,2">Herd of Animals</option>'+
        '<option value="11,3">Small Animal</option>'+
        '<option value="11,4">Large Animal</option> '+

        '<optgroup label="People on the road">' +
        '<option value="12,0">Unavailable</option>'+

        '<optgroup label="Reduced Visibility">' +
        '<option value="18,0">Unavailable</option>'+
        '<option value="18,1">Fog</option>'+

        '<optgroup label="Dangerous Situation">' +
        '<option value="99,1">Emergency Eletronic Break Lights</option>'+

        '<optgroup label="Pokemons">' +
        '<option value="69,1">PIKAAA</option>'+
         '<option value="69,2">CHARIZARD</option>'+

        '</select></label>'+
        '</form>'+
        '</div></p><button name="save-marker" class="save-marker">Save Marker Details</button>';


}(window,window.Mapster || (window.Mapster={})))