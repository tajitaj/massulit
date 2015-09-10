var SettingLayer = cc.Layer.extend({
	layerBackground:null,
	layerHeader:null,
	layerFooter:null,
	layerSearcher:null,
	layerCover:null,
	tableData:null,
	arrayData:[],
	ctor:function () {
		this._super();
		var size = cc.winSize;

		this.layerBackground = new cc.LayerColor(cc.color(235,235,235,255), size.width, size.height);
		this.addChild(this.layerBackground, 0);

		this.layerHeader = new HeaderLayer();
		this.addChild(this.layerHeader, 0);

		this.layerFooter = new FooterLayer();
		this.layerFooter.setToggleSettings(false);
		this.addChild(this.layerFooter, 0);

		var spriteVersion = new cc.Sprite(res.pngThreeBox_png);
		spriteVersion.attr({
			x: size.width * 0.5,
			y: size.height * 0.775,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteVersion, 0);
		
		var labelVersion1 = new cc.LabelBMFont('masSULIT App for Mobile', res.fntmasSulit32_fnt);
		labelVersion1.setColor(cc.color(0, 0, 0));
		labelVersion1.attr({
			x: spriteVersion.getContentSize().width * 0.5,
			y: spriteVersion.getContentSize().height * 0.75,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteVersion.addChild(labelVersion1, 0);
		
		var labelVersion2 = new cc.LabelBMFont('Version 1.0', res.fntmasSulit24_fnt);
		labelVersion2.setColor(cc.color(0, 0, 0));
		labelVersion2.attr({
			x: spriteVersion.getContentSize().width * 0.5,
			y: spriteVersion.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteVersion.addChild(labelVersion2, 0);
		
		var labelVersion3 = new cc.LabelBMFont('© 2015 - 2016, Marasigames', res.fntmasSulit24_fnt);
		labelVersion3.setColor(cc.color(0, 0, 0));
		labelVersion3.attr({
			x: spriteVersion.getContentSize().width * 0.5,
			y: spriteVersion.getContentSize().height * 0.25,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteVersion.addChild(labelVersion3, 0);
		
		this.tableData = new cc.TableView(this, cc.size(600, 450));
		this.tableData.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.tableData.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		this.tableData.attr({
			x: size.width * 0.5 - 300,
			y: size.height * 0.5 - 285
		});
		this.tableData.setDelegate(this);
		this.addChild(this.tableData, 0);

		var sSesken = cc.sys.localStorage.getItem("sSesken") || "";
		var sUseame = cc.sys.localStorage.getItem("sUseame") || "";
		if (sUseame != "" && sSesken != "") {
			this.arrayData = ['Hi ' + sUseame + ', Logout?', 'Advertise with Us', 'Conditions of Use'];
		} else {
			this.arrayData = ['Login using Facebook', 'Advertise with Us', 'Conditions of Use'];
		}
		this.tableData.reloadData();

		return true;
	},

	scrollViewDidScroll:function (view) {
	},

	scrollViewDidZoom:function (view) {
	},

	tableCellHighlight:function (table, cell) {
		var spriteCellBox = cell.getChildByTag(100);
		if (cell.getIdx() == 0) {
			spriteCellBox.setTexture(res.pngTableCellA2_png);
		} else if (cell.getIdx() == this.arrayData.length - 1) {
			spriteCellBox.setTexture(res.pngTableCellC2_png);
		} else {
			spriteCellBox.setTexture(res.pngTableCellB2_png);
		}
	},

	tableCellUnhighlight:function (table, cell) {
		var spriteCellBox = cell.getChildByTag(100);
		if (cell.getIdx() == 0) {
			spriteCellBox.setTexture(res.pngTableCellA1_png);
		} else if (cell.getIdx() == this.arrayData.length - 1) {
			spriteCellBox.setTexture(res.pngTableCellC1_png);
		} else {
			spriteCellBox.setTexture(res.pngTableCellB1_png);
		}
	},

	tableCellTouched:function (table, cell) {
		switch (cell.getChildByTag(101).getString()) {
		case 'Advertise with Us':
			var nextScene = new AdvertiseScene();
			cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
			break;
		case 'Conditions of Use':
			var nextScene = new ConditionScene();
			cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
			break;
		case 'Login using Facebook':
			this.facebookLogin();
			break;
		default:
			cc.sys.localStorage.removeItem("sSesken");
			cc.sys.localStorage.removeItem("sUseame");
			this.arrayData = ['Login using Facebook', 'Advertise with Us', 'Conditions of Use'];
			this.tableData.reloadData();
			break;
		}
	},

	tableCellSizeForIndex:function (table, idx) {
		return cc.size(600, 90);
	},

	tableCellAtIndex:function (table, idx) {
		var cellSize = this.tableCellSizeForIndex(table, idx);
		var strValue = idx.toFixed(0);
		var cell = table.dequeueCell();
		var spriteCellBox;
		var labelCellBox;
		var spriteCellTab;
		if (!cell) {
			cell = new CustomTableViewCell();

			spriteCellBox = new cc.Sprite(res.pngTableCellB1_png);
			spriteCellBox.attr({
				x: cellSize.width * 0.5,
				y: cellSize.height * 0.5,
				anchorX: 0.5,
				anchorY: 0.5,
				tag: 100
			});
			cell.addChild(spriteCellBox);
			if (parseInt(strValue) == 0) {
				spriteCellBox.setTexture(res.pngTableCellA1_png);
			} else if (parseInt(strValue) == this.arrayData.length - 1) {
				spriteCellBox.setTexture(res.pngTableCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngTableCellB1_png);
			}

			labelCellBox = new cc.LabelBMFont(this.arrayData[parseInt(strValue)], res.fntmasSulit32_fnt);
			labelCellBox.attr({
				x: cellSize.width * 0.1,
				y: cellSize.height * 0.5,
				anchorX: 0,
				anchorY: 0.5,
				tag: 101
			});
			labelCellBox.setColor(cc.color(0, 0, 0));
			cell.addChild(labelCellBox);

			spriteCellTab = new cc.Sprite(res.pngCellTab_png);
			spriteCellTab.attr({
				x: cellSize.width * 0.925,
				y: cellSize.height * 0.5,
				anchorX: 0.5,
				anchorY: 0.5,
				tag: 102
			});
			cell.addChild(spriteCellTab);

		} else {
			spriteCellBox = cell.getChildByTag(100);
			if (parseInt(strValue) == 0) {
				spriteCellBox.setTexture(res.pngTableCellA1_png);
			} else if (parseInt(strValue) == this.arrayData.length - 1) {
				spriteCellBox.setTexture(res.pngTableCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngTableCellB1_png);
			}

			labelCellBox = cell.getChildByTag(101);
			labelCellBox.setString(this.arrayData[parseInt(strValue)]);
		}

		return cell;
	},

	numberOfCellsInTableView:function (table) {
		return this.arrayData.length;
	},
	
	facebookLogin: function() {
		var that = this;
		var facebook = plugin.FacebookAgent.getInstance();
		if (facebook.isLoggedIn()) {
			facebook.api("/me", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
				if (type == plugin.FacebookAgent.CODE_SUCCEED) {
					cc.log(response);
					var userId = response["id"];
					var userEmail = response["email"];
					var userName = response["name"];
					if(cc.sys.OS_ANDROID === cc.sys.os || cc.sys.OS_IOS === cc.sys.os){  //android/ios
						var accessToken = facebook.getAccessToken();
						var expirationDate = new Date();
						expirationDate.setMinutes(expirationDate.getSeconds() + 3600);
					} else if(!cc.sys.isNative) {   //browser
						var userId = facebook._userInfo['userID'];
						var accessToken = facebook._userInfo['accessToken'];
						var expirationDate = new Date();
						expirationDate.setMinutes(expirationDate.getSeconds() + facebook._userInfo['expiresIn']);
					}
					if (userId) {
						that.layerCover = new LoaderLayer();
						that.addChild(that.layerCover, 100);
						that.parseFacebookLogin(userId, accessToken, expirationDate, userEmail, userName);
					} else {
						that.layerCover = new AlerterLayer("masSULIT", "Facebook Login Failed");
						that.addChild(that.layerCover, 100);
					}
				} else {
					that.layerCover = new AlerterLayer("masSULIT", "Facebook Login Failed");
					that.addChild(that.layerCover, 100);
				}
			});
		} else {
			facebook.login(["public_profile", "user_friends", "email"], function(code, response){
				if(code == plugin.FacebookAgent.CODE_SUCCEED){
					facebook.api("/me", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
						if (type == plugin.FacebookAgent.CODE_SUCCEED) {
							cc.log(response);
							var userId = response["id"];
							var userEmail = response["email"];
							var userName = response["name"];
							if(cc.sys.OS_ANDROID === cc.sys.os || cc.sys.OS_IOS === cc.sys.os){  //android/ios
								var accessToken = facebook.getAccessToken();
								var expirationDate = new Date();
								expirationDate.setMinutes(expirationDate.getSeconds() + 3600);
							} else if(!cc.sys.isNative) {   //browser
								var userId = facebook._userInfo['userID'];
								var accessToken = facebook._userInfo['accessToken'];
								var expirationDate = new Date();
								expirationDate.setMinutes(expirationDate.getSeconds() + facebook._userInfo['expiresIn']);
							}
							if (userId) {
								that.layerCover = new LoaderLayer();
								that.addChild(that.layerCover, 100);
								that.parseFacebookLogin(userId, accessToken, expirationDate, userEmail, userName);
							} else {
								that.layerCover = new AlerterLayer("masSULIT", "Facebook Login Failed");
								that.addChild(that.layerCover, 100);
							}
						} else {
							that.layerCover = new AlerterLayer("masSULIT", "Facebook Login Failed");
							that.addChild(that.layerCover, 100);
						}
					});
				} else {
					that.layerCover = new AlerterLayer("masSULIT", "Facebook Login not yet in public");
					that.addChild(that.layerCover, 100);
				}
			});
		}
	},

	parseFacebookLogin: function(sFacebookId, sFacebookAT, sFacebookED, sFacebookEA, sFacebookUN) {
		var that = this;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", g_config.parseConfig1 + "masSulitLogin", true);
		xhr.setRequestHeader(g_config.parseConfig2, g_config.parseConfig3);
		xhr.setRequestHeader(g_config.parseConfig4, g_config.parseConfig5);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
				var jResponse = JSON.parse(xhr.responseText);
				var aData = Base64.decode(jResponse.result).split(";");
				if (aData.length == 2) {
					cc.sys.localStorage.setItem("sSesken", aData[0]);
					cc.sys.localStorage.setItem("sUseame", aData[1]);
					that.arrayData = ['Hi ' + aData[1] + ', Logout?', 'Advertise with Us', 'Conditions of Use'];
					that.tableData.reloadData();
					var actWait = new cc.Sequence(new cc.DelayTime(1),
							new cc.CallFunc(function () {
								that.layerCover.removeFromParent();
							}, this));
					that.layerCover.runAction(actWait);
				} else {
					var actWait = new cc.Sequence(new cc.DelayTime(1),
							new cc.CallFunc(function () {
								that.layerCover.removeFromParent();
								that.layerCover = new AlerterLayer("masSULIT", "Facebook Login Failed");
								that.addChild(that.layerCover, 100);
							}, this));
					that.layerCover.runAction(actWait);
				}
			} else if (xhr.readyState == 4 && xhr.status == 400) {
				var actWait = new cc.Sequence(new cc.DelayTime(1),
						new cc.CallFunc(function () {
							that.layerCover.removeFromParent();
							that.layerCover = new AlerterLayer("masSULIT", "Facebook Login Failed");
							that.addChild(that.layerCover, 100);
						}, this));
				that.layerCover.runAction(actWait);
			}
		};
		var sTransfer = '{"sFBId":"' + sFacebookId + '","sFBAT":"' + sFacebookAT + '","sFBED":"' + sFacebookED.toISOString() + '","sFBEA":"' + sFacebookEA + '","sFBUN":"' + sFacebookUN + '"}';
		xhr.send('{"sEncoded":"' + Base64.encode(sTransfer) + '"}');
	}
});

var SettingScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new SettingLayer();
		this.addChild(layer);
	}
});