function getData() {

		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var ticker = document.getElementById("ticker").value;	
		console.log(username+password+ticker)
		//var url="https://datadirect-beta.factset.com/services/fastfetch?factlet=ExtractFormulaHistory&ids="+ticker+"&items=FF_SALES,FF_COGS,FF_GROSS_INC,FF_OPER_INC,FF_EBIT_OPER,FF_PTX_INC,FF_INC_TAX,F_NET_INC,FF_EPS,FF_EPS_DIL,FF_DPS,FF_EBITDA_OPER,FF_BPS&format=xml&dates=0:-1AY:AY";
		var url="http://localhost:8889/datadirect-beta.factset.com/services/fastfetch?factlet=ExtractFormulaHistory&ids="+ticker+"&items=FF_SALES,FF_COGS,FF_GROSS_INC,FF_OPER_INC,FF_EBIT_OPER,FF_PTX_INC,FF_INC_TAX,F_NET_INC,FF_EPS,FF_EPS_DIL,FF_DPS,FF_EBITDA_OPER,FF_BPS&format=xml&dates=0:-1AY:AY";
		
		$.ajax({
				type:'GET',
				url:url,
				dataType:'xml',
				jsonp: false,
				contentType: "application/xml",
				xhrFields: {
					withCredentials: true
					},
				crossDomain: true,
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password))
					},
				success: function(data){
					console.log(data)
				}
		 });
	
};
