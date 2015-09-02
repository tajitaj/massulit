var CustomTableViewCell = cc.TableViewCell.extend({
	draw:function (ctx) {
		this._super(ctx);
	}
});

var g_locations = ['Metro Manila (NCR)','Manila','Caloocan','Las Pinas','Makati','Malabon','Mandaluyong','Marikina','Muntinlupa','Navotas','Paranaque','Pasay','Pasig','Pateros','Quezon City','San Juan','Taguig','Valenzuela',
                   'Metro Cebu (MC)','Carcar City','Cebu City','Compostela','Consolacion','Cordova','Danao City','Lapu-Lapu City','Liloan','Mandaue City','Minglanilla','Naga City','San Fernando','Talisay',
                   'Metro Davao (MD)','Davao City','Digos City','Panabo City','Samal City','Tagum City','Carmen','Santa Cruz',
                   'Cordillera Administrative Region (CAR)','Abra','Apayao','Baguio','Benguet','Ifugao','Kalinga','Mountain Province',
                   'Ilocos Region (R1)','Dagupan','Ilocos Norte','Ilocos Sur','La Union','Pangasinan',
                   'Cagayan Valley (R2)','Batanes','Cagayan','Isabella','Nueva Vizcaya','Quirino','Santiago',
                   'Central Luzon (R3)','Angeles','Aurora','Bataan','Bulacan','Nueva Ecija','Olongapo','Pampanga','Tarlac','Zambales',
                   'CALABARZON (R4A)','Batangas','Cavite','Laguna','Lucena','Quezon','Rizal',
                   'MIMAROPA (R4B)','Marinduque','Occidental Mindoro','Oriental Mindoro','Palawan','Puerto Princesa','Romblon',
                   'Bicol Region (R5)','Albay','Camarines Norte','Camarines Sur','Catanduanes','Masbate','Naga','Sorsogon',
                   'Western Visayas (R6)','Aklan','Antique','Capiz','Guimaras','Iloilo','Iloilo City',
                   'Central Visayas (R7)','Bohol','Cebu','Cebu City','Lapu-Lapu','Mandaue','Siquijor',
                   'Eastern Visayas (R8)','Biliran','Eastern Samar','Leyte','Northern Samar','Ormoc','Samar','Southern Leyte','Tacloban',
                   'Negros Island Region (R18)','Bacolod','Negros Occidental','Negros Oriental',
                   'Zamboanga Peninsula (R9)','Isabela City','Zamboanga City','Zamboanga del Norte','Zamboanga del Sur','Zamboanga Sibugay',
                   'Northern Mindanao (R10)','Bukidnon','Cagayan de Oro','Camiguin','Iligan','Lanao del Norte','Misamis Occidental','Misamis Oriental',
                   'Davao Region (R11)','Compostela Valley','Davao City','Davao del Norte','Davao del Sur','Davao Oriental','Davao Occidental',
                   'SOCCSKSARGEN (R12)','Cotabato','Cotabato City','General Santos','Sarangani','South Cotabato','Sultan Kudarat',
                   'Caraga (R13)','Agusan del Norte','Agusan del Sur','Butuan','Dinagat Islands','Surigao del Norte','Surigao del Sur',
                   'Autonomous Region Muslim Mindanao (ARMM)','Basilan','Lanao del Sur','Maguindanao','Sulu','Tawi-Tawi'];

var g_config = {
	parseConfig1 : "https://api.parse.com/1/functions/",
	parseConfig2 : "X-Parse-Application-Id",
	parseConfig3 : "9XYZMrEUVyTb2VJM4zOuW3cxEyOAAnPSwnkFDURM",
	parseConfig4 : "X-Parse-REST-API-Key",
	parseConfig5 : "HoW440iQCWQFVT6qW2qpo0wrVflSq7bH8VTQjOeV",
	parseConfig6 : "X-Parse-Session-Token",
	parseConfig7 : "Sample-Session-Token"
};

var g_category = "";
var g_search = [];
var g_post = JSON.parse('{"sName":"Marasigames1","sPhone":"000-00-00","sMobile":"0900-000-0000","sEmail":"sample.email@gmail.com","sAddress":"000 sample address sample village sample city sample postal","sPerson":"Mr. Sample","sHours":"8:00 AM - 6:00 PM","sPage":"www.facebook.com/sampleurl","sDescription":"This is a sample description. The Quick Brown Fox Jumps Over The Lazy Dog. The Lazy Dog Was Jumped Over By The Quick Brown Fox. This is a sample description. The Quick Brown Fox Jumps Over The Lazy Dog. The Lazy Dog Was Jumped Over By The Quick Brown Fox.","sDate":"Monday, July 27, 2015","sLocation":"Paranaque","aPhotos":[""],"iStars":4,"iReviews":4,"aReviews":["1||Fast Service!!!||The Quick Brown Fox Jumps Over The Lazy Dog. The Lazy Dog Was Jumped Over By The Quick Brown Fox.||August 1, 2015||Cha Do Yun","5||Awesome Results!||The Quick Brown Fox Jumps Over The Lazy Dog. The Lazy Dog Was Jumped Over By The Quick Brown Fox.||August 2, 2015||Ahn Yo Sub","3||Best service ever!||The Quick Brown Fox Jumps Over The Lazy Dog. The Lazy Dog Was Jumped Over By The Quick Brown Fox.||August 3, 2015||Shin Se Gi"]}');