var CustomTableViewCell = cc.TableViewCell.extend({
	draw:function (ctx) {
		this._super(ctx);
	}
});

var Base64 = {


		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


		encode: function(input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;

			input = Base64._utf8_encode(input);

			while (i < input.length) {

				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

			}

			return output;
		},


		decode: function(input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;

			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			while (i < input.length) {

				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output = output + String.fromCharCode(chr1);

				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}

			}

			output = Base64._utf8_decode(output);

			return output;

		},

		_utf8_encode: function(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		},

		_utf8_decode: function(utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;

			while (i < utftext.length) {

				c = utftext.charCodeAt(i);

				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}

			}

			return string;
		}

}

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