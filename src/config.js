var CustomTableViewCell = cc.TableViewCell.extend({
	draw:function (ctx) {
		this._super(ctx);
	}
});

var LoadingLayer = cc.Layer.extend({
	layerBackground:null,
	buttonBlank:null,
	menuBlank:null,
	spriteLoading1:null,
	spriteLoading2:null,
	spriteLoading3:null,
	spriteLoading4:null,
	spriteLoading5:null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		this.layerBackground = new cc.LayerColor(cc.color(0,0,0,125), size.width, size.height);
		this.layerBackground.setPosition(cc.p(0,0));
		this.addChild(this.layerBackground, 0);

		this.buttonBlank = new cc.MenuItemImage(
				res.pngBlank_png,
				res.pngBlank_png,
				function () {

				}, this);
		this.buttonBlank.attr({
			x: size.width * 0.5,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.menuBlank = new cc.Menu(this.buttonBlank);
		this.menuBlank.x = 0;
		this.menuBlank.y = 0;
		this.addChild(this.menuBlank, 0);

		this.spriteLoading1 = new cc.Sprite(res.pngLoading1_png);
		this.spriteLoading1.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spriteLoading1, 5);
		
		this.spriteLoading2 = new cc.Sprite(res.pngLoading2_png);
		this.spriteLoading2.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spriteLoading2, 4);
		
		this.spriteLoading3 = new cc.Sprite(res.pngLoading3_png);
		this.spriteLoading3.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spriteLoading3, 3);
		
		this.spriteLoading4 = new cc.Sprite(res.pngLoading4_png);
		this.spriteLoading4.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spriteLoading4, 2);
		
		this.spriteLoading5 = new cc.Sprite(res.pngLoading5_png);
		this.spriteLoading5.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spriteLoading5, 1);
		
		var bezierPoints1 = [cc.p(0, 0),cc.p(75, 165),cc.p(150, 0)];
		var bezierPoints2 = [cc.p(0, 0),cc.p(-75, -165),cc.p(-150, 0)];
		var delay1 = cc.delayTime(0);
		var delay2 = cc.delayTime(0.25);
		var delay3 = cc.delayTime(0.5);
		var delay4 = cc.delayTime(0.75);
		var delay5 = cc.delayTime(1);
		
		var actionBezier1A = cc.bezierBy(1, bezierPoints1);
		var actionBezier1B = cc.bezierBy(1, bezierPoints2);
		var actionBezier1C = cc.sequence(delay1, actionBezier1A, delay5, delay1, actionBezier1B, delay5).repeatForever();
		this.spriteLoading1.runAction(actionBezier1C);
		
		var actionBezier2A = cc.bezierBy(1, bezierPoints1);
		var actionBezier2B = cc.bezierBy(1, bezierPoints2);
		var actionBezier2C = cc.sequence(delay2, actionBezier2A, delay4, delay2, actionBezier2B, delay4).repeatForever();
		this.spriteLoading2.runAction(actionBezier2C);
		
		var actionBezier3A = cc.bezierBy(1, bezierPoints1);
		var actionBezier3B = cc.bezierBy(1, bezierPoints2);
		var actionBezier3C = cc.sequence(delay3, actionBezier3A, delay3, delay3, actionBezier3B, delay3).repeatForever();
		this.spriteLoading3.runAction(actionBezier3C);
		
		var actionBezier4A = cc.bezierBy(1, bezierPoints1);
		var actionBezier4B = cc.bezierBy(1, bezierPoints2);
		var actionBezier4C = cc.sequence(delay4, actionBezier4A, delay2, delay4, actionBezier4B, delay2).repeatForever();
		this.spriteLoading4.runAction(actionBezier4C);

		var actionBezier5A = cc.bezierBy(1, bezierPoints1);
		var actionBezier5B = cc.bezierBy(1, bezierPoints2);
		var actionBezier5C = cc.sequence(delay5, actionBezier5A, delay1, delay5, actionBezier5B, delay1).repeatForever();
		this.spriteLoading5.runAction(actionBezier5C);

		return true;
	}
});

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