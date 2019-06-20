
function setDate(){

	var eventdate = new Date("May 30, 2013")  //Your date should be in this format (MONTH DAY, YEAR)
	var now = new Date();

	count=Math.floor((now.getTime()-eventdate.getTime())/1000);

	document.clock.secs.value = count%60;
	count = Math.floor(count/60);
	document.clock.mins.value = count%60;
	count = Math.floor(count/60);
	document.clock.hours.value = count%24;
	count = Math.floor(count/24);

	if (count >= 365){
		document.clock.days.value = count - 365*Math.floor(count/365);
	}
	else{
		document.clock.days.value = count
	}
	count=Math.floor(count/365);
	document.clock.years.value=count

	hour = new Number(document.clock.hours.value)
	min = new Number(document.clock.mins.value)
	sec = new Number(document.clock.secs.value)
	day = new Number(document.clock.days.text)
	year = new Number(document.clock.years.value)
	timer()

}

function timer(){

	if ((min < 10) && (min != "00")){
	        dismin = "0" + min
	}
	else{
	        dismin = min
	}

	if ((hour < 10) && (hour != "00")){
	        dishour = "0" + hour
	}
	else{
	        dishour = hour
	}

	dissec = (sec < 10) ? sec = "0" + sec : sec
	document.clock.secs.value = dissec
	document.clock.mins.value = dismin
	document.clock.hours.value = dishour
	document.clock.days.value = day
	document.clock.years.value = year

	if (sec < 59){
		sec++
	}

	else{
		sec = "0"
		min++
		if (min > 59){
			min = "00"
			hour++
			if (hour > 23){
				hour = "0"
				day++
				if (day >364){
					day = "0"
					year++
				}
			}
		}

	}



        	window.setTimeout("timer()",1000)
}
