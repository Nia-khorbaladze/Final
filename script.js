function updateClock(data){
  let datetime = JSON.parse(data)['datetime']
  let date = datetime.split("T")[0].split("-")
  let time = datetime.split("T")[1].split(":")

  var dname = JSON.parse(data)['day_of_week'],
  mo = parseInt(date[1]),
  dnum = parseInt(date[2]),
  yr = parseInt(date[0]),
  hou = parseInt(time[0]),
  min = parseInt(time[1]),
  sec = parseInt(time[2]),
  pe = "AM";

  if(hou >= 12){
    pe = "PM";
  }
  if(hou == 0){
    hou = 12;
  }
  if(hou > 12){
    hou = hou - 12;
  }

  Number.prototype.pad = function(digits){
    for(var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  }

  var months = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
  var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
  var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
  for(var i = 0; i < ids.length; i++)
  document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); 
    xmlHttp.send(null);
}

function update(){
  httpGetAsync("http://worldtimeapi.org/api/timezone/Asia/Tbilisi", updateClock);
}

function initClock(){
  update();
  window.setInterval("update()", 1000);
}