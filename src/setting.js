var SettingLayer = cc.Layer.extend({
	layerBackground:null,
	spriteHeader:null,
	spriteFooter:null,
	spriteLogo:null,
	labelLocation:null,
	buttonLocation:null,
	menuHeader:null,
	spriteVersion:null,
	labelVersion1:null,
	labelVersion2:null,
	labelVersion3:null,
	tableSetting:null,
	buttonHome:null,
	buttonPostAnAd:null,
	buttonMyPosts:null,
	buttonSettings:null,
	menuFooter:null,
	arraySetting:[],
	layerLoading:null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		this.layerBackground = new cc.LayerColor(cc.color(235,235,235,255), size.width, size.height);
		this.layerBackground.attr({
			x: 0,
			y: 0
		});
		this.addChild(this.layerBackground, 0);

		//Header Block
		this.spriteHeader = new cc.Sprite(res.pngHeader_png);
		this.spriteHeader.attr({
			x: size.width * 0.5,
			y: size.height * 1,
			anchorX: 0.5,
			anchorY: 1
		});
		this.addChild(this.spriteHeader, 0);

		this.spriteLogo = new cc.Sprite(res.pngLogo_png);
		this.spriteLogo.attr({
			x: this.spriteHeader.getContentSize().width * 0.5,
			y: this.spriteHeader.getContentSize().height * 0.6,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spriteHeader.addChild(this.spriteLogo, 0);

		var sLocation = cc.sys.localStorage.getItem('sLocation') || 'Metro Manila (NCR)';
		this.labelLocation = new cc.LabelBMFont(sLocation, res.fntmasSulit24_fnt);
		this.labelLocation.setColor(cc.color(128, 128, 128));
		this.labelLocation.attr({
			x: this.spriteHeader.getContentSize().width * 0.5,
			y: this.spriteHeader.getContentSize().height * 0.25,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spriteHeader.addChild(this.labelLocation, 0);

		this.buttonLocation = new cc.MenuItemImage(
				res.pngLocation1_png,
				res.pngLocation2_png,
				res.pngLocation2_png,
				function () {
					var nextScene = new LocationScene();
					cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
				}, this);
		this.buttonLocation.attr({
			x: this.spriteHeader.getContentSize().width * 0.9,
			y: this.spriteHeader.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.menuHeader = new cc.Menu(this.buttonLocation);
		this.menuHeader.attr({
			x: 0,
			y: 0
		});
		this.spriteHeader.addChild(this.menuHeader, 0);

		//Version Block
		this.spriteVersion = new cc.Sprite(res.pngThreeBox_png);
		this.spriteVersion.attr({
			x: size.width * 0.5,
			y: size.height * 0.775,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spriteVersion, 0);
		
		this.labelVersion1 = new cc.LabelBMFont('masSULIT App for Mobile', res.fntmasSulit32_fnt);
		this.labelVersion1.setColor(cc.color(0, 0, 0));
		this.labelVersion1.attr({
			x: this.spriteVersion.getContentSize().width * 0.5,
			y: this.spriteVersion.getContentSize().height * 0.75,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spriteVersion.addChild(this.labelVersion1, 0);
		
		this.labelVersion2 = new cc.LabelBMFont('Version 1.0', res.fntmasSulit24_fnt);
		this.labelVersion2.setColor(cc.color(0, 0, 0));
		this.labelVersion2.attr({
			x: this.spriteVersion.getContentSize().width * 0.5,
			y: this.spriteVersion.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spriteVersion.addChild(this.labelVersion2, 0);
		
		this.labelVersion3 = new cc.LabelBMFont('© 2015 - 2016, Marasigames', res.fntmasSulit24_fnt);
		this.labelVersion3.setColor(cc.color(0, 0, 0));
		this.labelVersion3.attr({
			x: this.spriteVersion.getContentSize().width * 0.5,
			y: this.spriteVersion.getContentSize().height * 0.25,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spriteVersion.addChild(this.labelVersion3, 0);
		
		//Body Block
		this.tableSetting = new cc.TableView(this, cc.size(600, 450));
		this.tableSetting.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.tableSetting.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		this.tableSetting.attr({
			x: size.width * 0.5 - 300,
			y: size.height * 0.5 - 285
		});
		this.tableSetting.setDelegate(this);
		this.addChild(this.tableSetting, 0);
		
		//Footer Block
		this.spriteFooter = new cc.Sprite(res.pngFooter_png);
		this.spriteFooter.attr({
			x: size.width * 0.5,
			y: size.height * 0,
			anchorX: 0.5,
			anchorY: 0
		});
		this.addChild(this.spriteFooter, 0);

		this.buttonHome = new cc.MenuItemImage(
				res.pngHome1_png,
				res.pngHome2_png,
				res.pngHome2_png,
				function () {
					var nextScene = new HomeScene();
					cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
				}, this);
		this.buttonHome.attr({
			x: this.spriteFooter.getContentSize().width * 0.15,
			y: this.spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.buttonPostAnAd = new cc.MenuItemImage(
				res.pngPostAnAd1_png,
				res.pngPostAnAd2_png,
				res.pngPostAnAd2_png,
				function () {

				}, this);
		this.buttonPostAnAd.attr({
			x: this.spriteFooter.getContentSize().width * 0.375,
			y: this.spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.buttonMyPosts = new cc.MenuItemImage(
				res.pngMyPosts1_png,
				res.pngMyPosts2_png,
				res.pngMyPosts2_png,
				function () {

				}, this);
		this.buttonMyPosts.attr({
			x: this.spriteFooter.getContentSize().width * 0.625,
			y: this.spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.buttonSettings = new cc.MenuItemImage(
				res.pngSettings1_png,
				res.pngSettings2_png,
				res.pngSettings2_png,
				function () {
					var nextScene = new SettingScene();
					cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
				}, this);
		this.buttonSettings.attr({
			x: this.spriteFooter.getContentSize().width * 0.85,
			y: this.spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.menuFooter = new cc.Menu(this.buttonHome, this.buttonPostAnAd, this.buttonMyPosts, this.buttonSettings);
		this.menuFooter.attr({
			x: 0,
			y: 0
		});
		this.spriteFooter.addChild(this.menuFooter, 0);

		this.buttonSettings.setEnabled(false);

		this.arraySetting = ['Login using Facebook', 'Advertise with Us', 'Conditions of Use'];
		this.tableSetting.reloadData();

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
		} else if (cell.getIdx() == this.arraySetting.length - 1) {
			spriteCellBox.setTexture(res.pngTableCellC2_png);
		} else {
			spriteCellBox.setTexture(res.pngTableCellB2_png);
		}
	},

	tableCellUnhighlight:function (table, cell) {
		var spriteCellBox = cell.getChildByTag(100);
		if (cell.getIdx() == 0) {
			spriteCellBox.setTexture(res.pngTableCellA1_png);
		} else if (cell.getIdx() == this.arraySetting.length - 1) {
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
			} else if (parseInt(strValue) == this.arraySetting.length - 1) {
				spriteCellBox.setTexture(res.pngTableCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngTableCellB1_png);
			}

			labelCellBox = new cc.LabelBMFont(this.arraySetting[parseInt(strValue)], res.fntmasSulit32_fnt);
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
			} else if (parseInt(strValue) == this.arraySetting.length - 1) {
				spriteCellBox.setTexture(res.pngTableCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngTableCellB1_png);
			}

			labelCellBox = cell.getChildByTag(101);
			labelCellBox.setString(this.arraySetting[parseInt(strValue)]);
		}

		return cell;
	},

	numberOfCellsInTableView:function (table) {
		return this.arraySetting.length;
	},
	
	facebookLogin: function() {
		var that = this;
		var facebook = plugin.FacebookAgent.getInstance();
		if (facebook.isLoggedIn()) {
			facebook.api("/me", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
				if (type == plugin.FacebookAgent.CODE_SUCCEED) {
					cc.log(response);
					if(cc.sys.OS_ANDROID === cc.sys.os || cc.sys.OS_IOS === cc.sys.os){  //android/ios
						/*
						var accesstoken = facebook.getAccessToken();
						var expirationdate = new Date();
						expirationdate.setMinutes(expirationdate.getSeconds() + 3600);
						facebook.api("/me", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
							if (type == plugin.FacebookAgent.CODE_SUCCEED) {
								var userid = response["id"];
								if (userid){
									that.parseFacebookLogin(userid, accesstoken, expirationdate);
								} else {
									that.g_messageLayer.removeFromParent();
									that.messageBox("Login", 'Invalid User');
								}
							} else {
								that.g_messageLayer.removeFromParent();
								that.messageBox("Login", 'Invalid User');
							}
						});
						 */
					} else if(!cc.sys.isNative) {   //browser
						var userid = facebook._userInfo['userID'];
						var accesstoken = facebook._userInfo['accessToken'];
						var expirationdate = new Date();
						expirationdate.setMinutes(expirationdate.getSeconds() + facebook._userInfo['expiresIn']);
						if (userid){
							//that.parseFacebookLogin(userid, accesstoken, expirationdate);
							cc.log(userid + " " + accesstoken + " " + expirationdate);
						} else {
							cc.log("Facebook Login Failed1");
							//that.g_messageLayer.removeFromParent();
							//that.messageBox("Login", 'Invalid User');
						}
					}
				} else {
					cc.log("Graph API request failed, error #" + code + ": " + response);
				}
			});
		} else {
			facebook.login(["public_profile", "user_friends", "email"], function(code, response){
				if(code == plugin.FacebookAgent.CODE_SUCCEED){
					facebook.api("/me", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
						if (type == plugin.FacebookAgent.CODE_SUCCEED) {
							cc.log(response);
							if(cc.sys.OS_ANDROID === cc.sys.os || cc.sys.OS_IOS === cc.sys.os){  //android/ios
								/*
								var accesstoken = facebook.getAccessToken();
								var expirationdate = new Date();
								expirationdate.setMinutes(expirationdate.getSeconds() + 3600);
								facebook.api("/me", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
									if (type == plugin.FacebookAgent.CODE_SUCCEED) {
										var userid = response["id"];
										if (userid){
											that.parseFacebookLogin(userid, accesstoken, expirationdate);
										} else {
											that.g_messageLayer.removeFromParent();
											that.messageBox("Login", 'Invalid User');
										}
									} else {
										that.g_messageLayer.removeFromParent();
										that.messageBox("Login", 'Invalid User');
									}
								});
								 */
							} else if(!cc.sys.isNative) {   //browser
								var userid = facebook._userInfo['userID'];
								var accesstoken = facebook._userInfo['accessToken'];
								var expirationdate = new Date();
								expirationdate.setMinutes(expirationdate.getSeconds() + facebook._userInfo['expiresIn']);
								if (userid){
									//that.parseFacebookLogin(userid, accesstoken, expirationdate);
									cc.log(userid + " " + accesstoken + " " + expirationdate);
								} else {
									cc.log("Facebook Login Failed2");
									//that.g_messageLayer.removeFromParent();
									//that.messageBox("Login", 'Invalid User');
								}
							}
						} else {
							cc.log("Graph API request failed, error #" + code + ": " + response);
						}
					});
				} else {
					cc.log("Facebook Login Failed3");
					//that.g_messageLayer.removeFromParent();
					//that.messageBox("Login", 'Legion of Legends will be released soon. Head over to our FB page for more updates. Stay tuned!');
				}
			});
		}
	},

	parseFacebookLogin: function(sFacebookId, sFacebookAT, sFacebookED) {
		var that = this;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", "https://api.parse.com/1/functions/lolUserLogin", true);
		xhr.setRequestHeader("X-Parse-Application-Id", "LSZtRLpztDhGkNLRDEphKHsrD3eMChchBnnvpOav");
		xhr.setRequestHeader("X-Parse-REST-API-Key", "KcWXQYzRmRoThGh1Iiu0sHmZCFti5XdH1rufrdik");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
				var jResponse = JSON.parse(xhr.responseText);
				var jResult = JSON.parse(jResponse.result);
				if (jResult.errorMessage == 'No Error') {
					STOKEN = jResult.sSessionToken;
					SASEND = jResult.sArenaSeasonEnd;
					IBATTLERS = jResult.iParticipants;
					if (jResult.iStatus == 0) {
						var nextScene = new NameScene();
						cc.director.runScene(new cc.TransitionFade(0.5, nextScene, cc.color(255, 255, 255)));
					} else if (jResult.iStatus == 1) {
						var nextScene = new DashboardScene();
						cc.director.runScene(new cc.TransitionFade(0.5, nextScene, cc.color(255, 255, 255)));
					}
				} else {
					that.messageBox("Legion of Legends", jResult.errorMessage);
				}
			} else if (xhr.readyState == 4 && xhr.status == 400) {
				var jResponse = JSON.parse(xhr.responseText);
				if (jResponse.code == 141) {
					that.messageBox("Login", jResponse.error);
				} else if (jResponse.code == 155) {
					that.messageBox("Legion of Legends", "Server is busy, please try again");
				}
			}
		};
		xhr.send('{"sFBId":"' + sFacebookId + '","sFBAT":"' + sFacebookAT + '","sFBED":"' + sFacebookED.toISOString() + '","sAVsn":"' + CLIENT_VERSION + '"}');
	}
});

var SettingScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new SettingLayer();
		this.addChild(layer);
	}
});