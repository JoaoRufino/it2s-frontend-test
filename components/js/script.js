var $mapster;
var $i;
(function(window, $) {
     //ws = new WebSocket('ws://193.136.92.95:4000')
     ws = new WebSocket('ws://193.136.93.45:4000')
    ws.onopen = onOpen;
    ws.onmessage =onMessage;
    ws.onclose = onOpen;
    ws.onmessage =onMessage;
    //map options
    $mapster = $('#mapid').mapster(Mapster.MAP_OPTIONS);
     $mapster.mapster('clickListener');
     $mapster.mapster('addClusterer');
     /*$mapster.mapster('addMarker',{
     	lat: 40.632141, 
     	lng: -8.745390,
     	code: 2,
     	subcode:0
     })*/
     $i=0;
     //repeat(); 
}(window,jQuery));

function onOpen (evt) {
/*            lat: 40.6459110, 
            lng: -8.7453900,
            id: 1,
          });*/
/*
      ws.send(JSON.stringify({ 
        Msg_type : 0, 
        ID : 1,
        CauseCode : 2,
        SubCauseCode: 4, 
        Lat: 406459110, 
        Lng: -86314730,
        Timestamp: 1,
        Termination: 0,
        Title: "2,4"
      }))
       */ 
/*       var timestamp = new Date().getTime() -1072915200000
       ws.send(JSON.stringify({ 
        Msg_type : 0, 
        ID : 1,
        CauseCode : 2,
        SubCauseCode: 4, 
        Lat: 406321410, 
        Lng: -87453900,
        Timestamp: timestamp,
        Termination: 0,
      }));
*/
 /*           ws.send(JSON.stringify({ 
        Msg_type : 0, 
        ID : 1,
        CauseCode : 12,
        SubCauseCode: 0, 
        Lat: 406321410, 
        Lng: -87453900,
        Timestamp: timestamp,
        Termination: 0,
      }));*/


   }
  
  function onMessage (evt)   {
    console.log("MESSAGE RECEIVED AT:" + evt.data)
    if(isJson(evt.data)) {
    ops = JSON.parse(evt.data);
    switch (ops.Msg_type) {
        case 1:
        console.log("CAM")
            $mapster.mapster('updateVehiclePosition',{
            lat: ops.Lat/10000000,
            lng: ops.Lng/10000000}
        );
        break;
        case 0:
        if(ops.Termination==1){
          $mapster.mapster('removeMarkers', function(marker) {
                //value=""+ops.ID+","+ops.CauseCode+","+ops.SubCauseCode
                return marker.getPopup().getContent().includes(ops.CauseCode+","+ops.SubCauseCode)
              }); }

        else{
        console.log(ops.Timestamp)
        console.log("DENM |"+ ops.CauseCode)
            marker=$mapster.mapster('addMarker',{
            latlng: [ops.Lat/10000000,ops.Lng/10000000],
            code: ops.CauseCode,
            subcode:ops.SubCauseCode,
            timestamp: ops.Timestamp,
            id: ops.ID
        });
        console.log(marker);
        }
        break;
        default:
        alert("message unknown")
        break;
      }
  }else{
  console.log("ERROR MESSAGE NOT IN JSON")
}
}

  function isJson(str) 
{
    try 
    {
        JSON.parse(str);
    } 
    catch (e) 
    {
        return false;
    }
    return true;
}

function repeat(){
            $mapster.mapster('updateVehiclePosition',{
            lat: latitude[$i]/10000000,
            lng: longitude[$i]/10000000})
            $i++
          if($i>=latitude.length-1)
          {
            $i=0;
          }

          setTimeout(repeat,500)
}
