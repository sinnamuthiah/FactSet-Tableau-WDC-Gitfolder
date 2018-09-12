(function ()
	{
    var myConnector = tableau.makeConnector();
	
	myConnector.init = function(initCallback)
	{
		tableau.authType = tableau.authTypeEnum.basic;
		initCallback();
	}
	
	myConnector.getSchema = function (schemaCallback)
		{
		var Fields =
			[
			{id: "TICKER",		dataType: tableau.dataTypeEnum.string},
			{id: "DATE",		dataType: tableau.dataTypeEnum.date},
			{id: "SALES",		dataType: tableau.dataTypeEnum.float},
			{id: "COGS",		dataType: tableau.dataTypeEnum.float},
			{id: "GROSS_INC",	dataType: tableau.dataTypeEnum.float},
			{id: "OPER_INC",	dataType: tableau.dataTypeEnum.float},
			{id: "EBIT_OPER",	dataType: tableau.dataTypeEnum.float},
			{id: "PTX_INC",		dataType: tableau.dataTypeEnum.float},
			{id: "INC_TAX",		dataType: tableau.dataTypeEnum.float},
			{id: "NET_INC",		dataType: tableau.dataTypeEnum.float},
			{id: "EPS",			dataType: tableau.dataTypeEnum.float},
			{id: "EPS_DIL",		dataType: tableau.dataTypeEnum.float},
			{id: "DPS",			dataType: tableau.dataTypeEnum.float},
			{id: "EBITDA_OPER",	dataType: tableau.dataTypeEnum.float},
			{id: "BPS",			dataType: tableau.dataTypeEnum.float}
			];

		var tableSchema = {id: "FINANCIAL_TABLE", columns: Fields};
		schemaCallback([tableSchema]);
		};
	
    myConnector.getData = function(table, doneCallback)
		{
		// var url	= "https://datadirect-beta.factset.com/services/fastfetch?factlet=ExtractFormulaHistory&ids="+tableau.connectionData+"&items=FF_SALES,FF_COGS,FF_GROSS_INC,FF_OPER_INC,FF_EBIT_OPER,FF_PTX_INC,FF_INC_TAX,F_NET_INC,FF_EPS,FF_EPS_DIL,FF_DPS,FF_EBITDA_OPER,FF_BPS&format=xml&dates=0:-15AY:AY";
		var url		= "http://localhost:8889/datadirect-beta.factset.com/services/fastfetch?factlet=ExtractFormulaHistory&ids="+tableau.connectionData+"&items=FF_SALES,FF_COGS,FF_GROSS_INC,FF_OPER_INC,FF_EBIT_OPER,FF_PTX_INC,FF_INC_TAX,F_NET_INC,FF_EPS,FF_EPS_DIL,FF_DPS,FF_EBITDA_OPER,FF_BPS&format=xml&dates=0:-15AY:AY";
		
		function xmlToJson(xml)
			{
			var obj = {};
			if (xml.nodeType == 1)
				{
				if (xml.attributes.length > 0)
					{
					obj["@attributes"] = {};
					for (var j = 0; j < xml.attributes.length; j++)
						{
						var attribute = xml.attributes.item(j);
						obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
						}
					}
				}
				else if (xml.nodeType == 3)
					{obj = xml.nodeValue;}
				if (xml.hasChildNodes())
				{
				for(var i = 0; i < xml.childNodes.length; i++)
					{
					var item = xml.childNodes.item(i);
					var nodeName = item.nodeName;
					if (typeof(obj[nodeName]) == "undefined")
						{obj[nodeName] = xmlToJson(item);}
					else
						{
						if (typeof(obj[nodeName].push) == "undefined")
							{
							var old = obj[nodeName];
							obj[nodeName] = [];
							obj[nodeName].push(old);
							}
						obj[nodeName].push(xmlToJson(item));
						}
					}
				}
			return obj;
			};
		
		$.ajax(
			{
			type:'GET',
			url:url,
			dataType:'xml',
			jsonp: false,
			contentType: 'application/xml',
			xhrFields: {withCredentials: true},
			beforeSend: function (xhr) {xhr.setRequestHeader('Authorization', 'Basic ' + btoa(tableau.username + ':' + tableau.password));},
			crossDomain: true,
			success: function(data)
				{
				var JSONData = xmlToJson(data);
				var RESULT = JSONData.FASTFETCH.RESPONSE.FACTLET.OUTPUT.BODY;
				var FinancialData = [];
							
				for (var i = 1, len = RESULT['@attributes'].rows; i < len; i++)
					{
						FinancialData.push(
						{
						"TICKER"		: RESULT.ROW[i].CELL[0]['#text'],
						"DATE"			: RESULT.ROW[i].CELL[1]['#text'],
						"SALES"			: Number(RESULT.ROW[i].CELL[2]['#text']),
						"COGS"			: Number(RESULT.ROW[i].CELL[3]['#text']),
						"GROSS_INC"		: Number(RESULT.ROW[i].CELL[4]['#text']),
						"OPER_INC"		: Number(RESULT.ROW[i].CELL[5]['#text']),
						"EBIT_OPER"		: Number(RESULT.ROW[i].CELL[6]['#text']),
						"PTX_INC"		: Number(RESULT.ROW[i].CELL[7]['#text']),
						"INC_TAX"		: Number(RESULT.ROW[i].CELL[8]['#text']),
						"NET_INC"		: Number(RESULT.ROW[i].CELL[9]['#text']),
						"EPS"			: Number(RESULT.ROW[i].CELL[10]['#text']),
						"EPS_DIL"		: Number(RESULT.ROW[i].CELL[11]['#text']),
						"DPD"			: Number(RESULT.ROW[i].CELL[12]['#text']),
						"EBITDA_OPER"	: Number(RESULT.ROW[i].CELL[13]['#text']),
						"BPS"			: Number(RESULT.ROW[i].CELL[14]['#text'])
						})
					}
				console.log(FinancialData);
				
				table.appendRows(FinancialData);
				// tableau.log("test")
				// tableau.log(FinancialData);
				// tableau.log(table);
				doneCallback();
				},
			error: function(){alert("AJAX call not successful");}	
			});
		};
    
	tableau.registerConnector(myConnector);
	
	$(document).ready(function ()
		{
		$("#submitbtn").click(function ()
			{
			tableau.connectionName 	= "FactSet Financial Data";
			tableau.connectionData	= document.getElementById('tick').value;
			tableau.username 		= document.getElementById('username').value;
			tableau.password 		= document.getElementById('password').value;
			tableau.submit();
			});
		});
	})();