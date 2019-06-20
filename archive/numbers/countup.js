

/*
Count Up - Script
Visit http://rainbow.arch.scriptmania.com/scripts/
 for this script and many more
*/

function setcountup(theyear,themonth,theday){
yr=theyear;mo=themonth;da=theday
}

var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
var crosscount=''

function start_countup(){
if (document.layers)
document.countupnsmain.visibility="show"
else if (document.all||document.getElementById)
crosscount=document.getElementById&&!document.all?document.getElementById("countupie") : countupie
countup()
}

window.onload=start_countup


function countup(){
var today=new Date()
var todayy=today.getYear()
if (todayy < 1000)
todayy+=1900
var todaym=today.getMonth()
var todayd=today.getDate()
var todayh=today.getHours()
var todaymin=today.getMinutes()
var todaysec=today.getSeconds()
var todaystring=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec
paststring=montharray[mo-1]+" "+da+", "+yr
dd=Date.parse(todaystring)-Date.parse(paststring)
dday=Math.floor(dd/(60*60*1000*24)*1)
dhour=Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1)
dmin=Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1)
dsec=Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1)

$('.countDay').text(dday);
$('.countHours').text(dhour);
$('.countMinutes').text(dmin);
$('.countSeconds').text(dsec);

setTimeout("countup()",1000)
}
