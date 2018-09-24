(function () {
	
	var myConnector = tableau.makeConnector();
	
	myConnector.init = function(initCallback) {
        tableau.authType = tableau.authTypeEnum.basic;  
        initCallback();
		}
	
	myConnector.getSchema = function (schemaCallback) {
		var FinancialFields = [{
			id: "TICKER",
			dataType: tableau.dataTypeEnum.string
		},{
			id: "DATE",
			dataType: tableau.dataTypeEnum.date
		},{
			id: "SALES",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "SALES_YOY",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "SALES_QOQ",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "COGS",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "DEP_AMORT_EXP",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "GROSS_INC",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "SGA",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "EBIT",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "OPERATING_INC",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "PTX_INC",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "INC_TAX",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "NET_INC",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "EPS",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "EPS_DIL",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "EBITDA",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "COMMON_SHARES_OUT",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "STORES_TOT",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "STORES_YOY",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "STORES_QOQ",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "STORES_DOM",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "STORES_INTL",
			dataType: tableau.dataTypeEnum.float
		},		{
			id: "STORES_OPENED",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "STORES_CLOSED",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "AVG_SALES_STORE",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "AVG_SALES_STORE_YOY",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "AVG_SALES_STORE_QOQ",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "SAME_STORE_SALES",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "TWOYRS_STACK_SSS",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "GROSS_MARGIN",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "OPERATING_MARGIN",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "NET_MARGIN",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "NON_OPERATING_INCOME",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "UNSUAL_EXPENSES",
			dataType: tableau.dataTypeEnum.float
		},{
			id: "INTEREST_EXPENSES",
			dataType: tableau.dataTypeEnum.float
		}];
		
		var TickHistoryFields = [{
			id: "DATE",
			dataType: tableau.dataTypeEnum.date
		},{
			id: "LAST",
			dataType: tableau.dataTypeEnum.float
		}];
		
		var TickHistoryTable = {
			id: "TICKHISTORY_TABLE",
			columns: TickHistoryFields
		};
		
		var FinancialTable = {
			id: "FINANCIAL_TABLE",
			columns: FinancialFields
		};
		
		schemaCallback([FinancialTable,TickHistoryTable]);
	};
	
	myConnector.getData = function(table, doneCallback) {
		if (tableau.password.length == 0) {
            tableau.abortForAuth();
        }
		
		var FinancialURL="http://localhost:1337/datadirect-beta.factset.com/services/fastfetch?factlet=ExtractFormulaHistory&ids="+tableau.connectionData+"&items=FF_SALES(QTR,0,-15Y,FQ,,,),FF_COGS(QTR,0,-15Y,FQ,,,),FF_DEP_AMORT_EXP(QTR,0,-15Y,FQ,,,),FF_GROSS_INC(QTR,0,-15Y,FQ,,,),FF_SGA(QTR,0,-15Y,FQ,,,),FF_EBIT(QTR,0,-15Y,FQ,,,),FF_OPER_INC(QTR,0,-15Y,FQ,,,),FF_PTX_INC(QTR,0,-15Y,FQ,,,),FF_INC_TAX(QTR,0,-15Y,FQ,,,),FF_NET_INC(QTR,0,-15Y,FQ,,,),FF_EPS(QTR,0,-15Y,FQ),FF_EPS_DIL(QTR,0,-15Y,FQ),FF_EBITDA_OPER(QTR,0,-15Y,FQ,,,T),FF_COM_SHS_OUT(QTR,-15Y,0),FF_RT_STORES_REC(QTR_R_END_TOT,0,-15Y,FQ),FF_RT_STORES_REC(QTR_R_END_DOM,0,-15Y,FQ),FF_RT_STORES_REC(QTR_R_END_INTL,0,-15Y,FQ),FF_RT_STORES_REC(QTR_R_OPEN_TOT,0,-15Y,FQ),FF_RT_STORES_REC(QTR_R_CLOSE_TOT,0,-5Y,FQ),FF_RT_SALES_STORES(QTR_TOT,0,-15Y,FQ),FF_RT_COMP_SALES(QTR_TOT,0,-15Y,FQ),FF_GROSS_MGN(QTR_R,0,-15Y,FQ),FF_OPER_MGN(QTR_R,0,-15Y,FQ),FF_NET_MGN(QTR_R,0,-15Y,FQ),FF_NON_OPER_INC(QTR_R,0,-15Y,FQ,,,),FF_UNUSUAL_EXP(QTR_R,0,-15Y,FQ,,,),FF_INT_EXP_NET(QTR_R,0,-15Y,FQ,,,)&format=xml&date=0:-15Y:FQ";
		var EstimatesURL="http://localhost:1337/datadirect-beta.factset.com/services/fastfetch?factlet=ExtractFormulaHistory";
		var RequestBody="ids="+ tableau.connectionData + "&items=FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(SALES,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(COS,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(GROSS_INC,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(SGA,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+5,NOW,,FQ),,FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(DEP_AMORT,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(EBITDA,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(EBIT,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(INT_EXP,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(PTX_INC,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(INC_TAX,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(NET_INC,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(EPS,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(ST_END,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(ST_END_D,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(ST_END_I,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(STOREN_OPENED,MEAN,QTR_ROLL,+20,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+1,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+2,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+3,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+4,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+5,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+6,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+7,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+8,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+9,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+10,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+11,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+12,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+13,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+14,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+15,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+16,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+17,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+18,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+19,NOW,,FQ),FE_ESTIMATE(SAMESTORESALES,MEAN,QTR_ROLL,+20,NOW,,FQ)&format=xml";
		var TickHistoryURL="http://localhost:1337/datadirect-beta.factset.com/services/TickHistory?id="+tableau.connectionData+"&fields=DATE,LAST_1&date=20180901&ed=20180910&interval=1D&format=json";
		var FinancialData = [];
		var EstimatesData = [];
		var TickHistoryData = [];
		
		if (table.tableInfo.id == 'FINANCIAL_TABLE') {
		$.ajax({
				type:'GET',
				url:FinancialURL,
				dataType:'xml',
				jsonp: false,
				contentType: "application/xml",
				xhrFields: {
					withCredentials: true
					},
				crossDomain: true,
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Basic ' + btoa(tableau.username + ':' + tableau.password))
					},
				success: function(data){
					
					var JSONData = xmlToJson(data);
					var RESULT = JSONData.FASTFETCH.RESPONSE.FACTLET.OUTPUT.BODY;
					
					for (var i = 0, len = RESULT['@attributes'].rows; i < len; i++){
						FinancialData.push({
							"TICKER": RESULT.ROW[i].CELL[0]['#text'],
							"DATE": dateFormat(RESULT.ROW[i].CELL[1]['#text']),
							"SALES": MillionsToOne(Number(RESULT.ROW[i].CELL[2]['#text'])),
							"SALES_YOY" :0,
							"SALES_QOQ" :0,
							"COGS": MillionsToOne(Number(RESULT.ROW[i].CELL[3]['#text'])),
							"DEP_AMORT_EXP": MillionsToOne(Number(RESULT.ROW[i].CELL[4]['#text'])),
							"GROSS_INC": MillionsToOne(Number(RESULT.ROW[i].CELL[5]['#text'])),
							"SGA": MillionsToOne(Number(RESULT.ROW[i].CELL[6]['#text'])),
							"EBIT": MillionsToOne(Number(RESULT.ROW[i].CELL[7]['#text'])),
							"OPERATING_INC": MillionsToOne(Number(RESULT.ROW[i].CELL[8]['#text'])),
							"PTX_INC": MillionsToOne(Number(RESULT.ROW[i].CELL[9]['#text'])),
							"INC_TAX": MillionsToOne(Number(RESULT.ROW[i].CELL[10]['#text'])),
							"NET_INC": MillionsToOne(Number(RESULT.ROW[i].CELL[11]['#text'])),
							"EPS": Number(RESULT.ROW[i].CELL[12]['#text']),
							"EPS_DIL": Number(RESULT.ROW[i].CELL[13]['#text']),
							"EBITDA": MillionsToOne(Number(RESULT.ROW[i].CELL[14]['#text'])),
							"COMMON_SHARES_OUT": Number(RESULT.ROW[i].CELL[15]['#text']),
							"STORES_TOT": Number(RESULT.ROW[i].CELL[16]['#text']),
							"STORES_YOY": 0,
							"STORES_QOQ": 0,
							"STORES_DOM": Number(RESULT.ROW[i].CELL[17]['#text']),
							"STORES_INTL": Number(RESULT.ROW[i].CELL[18]['#text']),
							"STORES_OPENED": Number(RESULT.ROW[i].CELL[19]['#text']),
							"STORES_CLOSED": Number(RESULT.ROW[i].CELL[20]['#text']),
							"AVG_SALES_STORE": MillionsToOne(Number(RESULT.ROW[i].CELL[21]['#text'])),
							"AVG_SALES_STORE_YOY":0,
							"AVG_SALES_STORE_QOQ":0,
							"SAME_STORE_SALES": PercentConversion(Number(RESULT.ROW[i].CELL[22]['#text'])),
							"TWOYRS_STACK_SSS" : 0,
							"GROSS_MARGIN": PercentConversion(Number(RESULT.ROW[i].CELL[23]['#text'])),
							"OPERATING_MARGIN": PercentConversion(Number(RESULT.ROW[i].CELL[24]['#text'])),
							"NET_MARGIN": PercentConversion(Number(RESULT.ROW[i].CELL[25]['#text'])),
							"NON_OPERATING_INCOME": MillionsToOne(Number(RESULT.ROW[i].CELL[26]['#text'])),
							"UNSUAL_EXPENSES":MillionsToOne(Number(RESULT.ROW[i].CELL[27]['#text'])),
							"INTEREST_EXPENSES":MillionsToOne(Number(RESULT.ROW[i].CELL[28]['#text']))
							})
					}
					
					$.ajax({
						type:'POST',
						url:EstimatesURL,
						data:RequestBody,
						dataType:'xml',
						jsonp: false,
						contentType: "text/plain",
						xhrFields: {
							withCredentials: true
							},
						crossDomain: true,
						beforeSend: function (xhr) {
							xhr.setRequestHeader('Authorization', 'Basic ' + btoa(tableau.username + ':' + tableau.password))
							},
						success: function(data){
							var JSONData = xmlToJson(data);
							var RESULT = JSONData.FASTFETCH.RESPONSE.FACTLET.OUTPUT.BODY;
							for (var i = 2, len = 21; i < len; i++){
								EstimatesData.push({
									"TICKER": RESULT.ROW.CELL[0]['#text'],
									"DATE": new Date(dateFormat(RESULT.ROW.CELL[1]['#text']).setMonth(dateFormat(RESULT.ROW.CELL[1]['#text']).getMonth()+3*(i-2))),
									"SALES": MillionsToOne(Number(RESULT.ROW.CELL[i]['#text'])),
									"SALES_YOY" :0,
									"SALES_QOQ" :0,
									"COGS": MillionsToOne(Number(RESULT.ROW.CELL[i+20]['#text'])),
									"DEP_AMORT_EXP": MillionsToOne(Number(RESULT.ROW.CELL[i+80]['#text'])),
									"GROSS_INC": MillionsToOne(Number(RESULT.ROW.CELL[i+40]['#text'])),
									"SGA": MillionsToOne(Number(RESULT.ROW.CELL[i+60]['#text'])),
									"EBIT": MillionsToOne(Number(RESULT.ROW.CELL[i+120]['#text'])),
									"OPER_INC": '',
									"PTX_INC": MillionsToOne(Number(RESULT.ROW.CELL[i+160]['#text'])),
									"INC_TAX": MillionsToOne(Number(RESULT.ROW.CELL[i+180]['#text'])),
									"NET_INC": MillionsToOne(Number(RESULT.ROW.CELL[i+200]['#text'])),
									"EPS": Number(RESULT.ROW.CELL[i+220]['#text']),
									"EPS_DIL": '',
									"EBITDA": MillionsToOne(Number(RESULT.ROW.CELL[i+100]['#text'])),
									"COMMON_SHARES_OUT": '',
									"STORES_TOT": Number(RESULT.ROW.CELL[i+240]['#text']),
									"STORES_YOY": 0,
									"STORES_QOQ": 0,
									"STORES_DOM": Number(RESULT.ROW.CELL[i+260]['#text']),
									"STORES_INTL": Number(RESULT.ROW.CELL[i+280]['#text']),
									"STORES_OPENED": Number(RESULT.ROW.CELL[i+300]['#text']),
									"STORES_CLOSED": '',
									"AVG_SALES_STORE": '',
									"AVG_SALES_STORE_YOY":'',
									"AVG_SALES_STORE_QOQ":'',
									"SAME_STORE_SALES": PercentConversion(Number(RESULT.ROW.CELL[i+320]['#text'])),
									"TWOYRS_STACK_SSS" :0,
									"GROSS_MARGIN":'',
									"OPER_MARGIN":'',
									"NET_MARGIN":'',
									"NON_OPERATING_INCOME": '',
									"UNSUAL_EXPENSES":'',
									"INTEREST_EXPENSES":MillionsToOne(Number(RESULT.ROW.CELL[i+140]['#text']))
									})
								};
							var FinalData = FinancialData.concat(EstimatesData);
							for (var l=4, len=FinalData.length; l<len; l++){
								FinalData[l].SALES_YOY=(FinalData[l].SALES-FinalData[l-4].SALES)/FinalData[l-4].SALES;
								FinalData[l].SALES_QOQ=(FinalData[l].SALES-FinalData[l-1].SALES)/FinalData[l-1].SALES;
								FinalData[l].STORES_YOY=(FinalData[l].STORES_TOT-FinalData[l-4].STORES_TOT)/FinalData[l-4].STORES_TOT;
								FinalData[l].STORES_QOQ=(FinalData[l].STORES_TOT-FinalData[l-1].STORES_TOT)/FinalData[l-1].STORES_TOT;
								FinalData[l].AVG_SALES_STORE_YOY=(FinalData[l].AVG_SALES_STORE-FinalData[l-4].AVG_SALES_STORE)/FinalData[l-4].AVG_SALES_STORE;
								FinalData[l].AVG_SALES_STORE_QOQ=(FinalData[l].AVG_SALES_STORE-FinalData[l-1].AVG_SALES_STORE)/FinalData[l-1].AVG_SALES_STORE;
								FinalData[l].TWOYRS_STACK_SSS=(FinalData[l].SAME_STORE_SALES-FinalData[l-4].SAME_STORE_SALES)
							}			
							table.appendRows(FinalData);
						}
					});
					doneCallback();
				}
			});
		};	
		
		if (table.tableInfo.id == 'TICKHISTORY_TABLE') {
			$.ajax({
				type:'GET',
				url:TickHistoryURL,
				dataType:'json',
				jsonp: false,
				contentType: "application/json",
				xhrFields: {
					withCredentials: true
					},
				crossDomain: true,
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Basic ' + btoa(tableau.username + ':' + tableau.password))
					},
				success: function(data){
					RESULT = data.Values;
					for (var j = 0, len = RESULT.length; j < len; j++){
						TickHistoryData.push({
							"DATE":dateFormat(String(RESULT[j][0])),
							"LAST":RESULT[j][1]
						})
					};
					table.appendRows(TickHistoryData);
					doneCallback();
				}
			})			
		};	
		
	};
	function xmlToJson(xml) {
			// Create the return object
			var obj = {};
			if (xml.nodeType == 1) { // element
				// do attributes
				if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
					for (var j = 0; j < xml.attributes.length; j++) {
						var attribute = xml.attributes.item(j);
						obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
					}
				}
			} else if (xml.nodeType == 3) { // text
				obj = xml.nodeValue;
			}

			// do children
			if (xml.hasChildNodes()) {
				for(var i = 0; i < xml.childNodes.length; i++) {
					var item = xml.childNodes.item(i);
					var nodeName = item.nodeName;
					if (typeof(obj[nodeName]) == "undefined") {
						obj[nodeName] = xmlToJson(item);
					} else {
						if (typeof(obj[nodeName].push) == "undefined") {
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
	
	function dateFormat(date) {
		var a = date;
		var b = "-";
		var position1 = 4;
		var position2 = 6;
		var output = new Date([a.slice(0, position1), b, a.slice(position1,position2),b,a.slice(position2)].join(''));
		
		return output;	
	};
	
	function MillionsToOne(a){
		var b = a*1000000;	
		return b;
	};

	function PercentConversion(a){
		var b = a/100;	
		return b;
	};
	tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.username = $("#username").val();
		tableau.password = $("#password").val();
		tableau.connectionData = $("#ticker").val();
        tableau.connectionName = 'FactSet Financial Data';
		tableau.submit();
		});
	});
	
})();