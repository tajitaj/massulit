var ResultsLayer = cc.Layer.extend({
	layerBackground:null,
	spriteHeader:null,
	spriteFooter:null,
	spriteLogo:null,
	labelLocation:null,
	buttonLocation:null,
	menuHeader:null,
	textSearch:null,
	spriteSearch:null,
	tableCategory:null,
	buttonHome:null,
	buttonPostAnAd:null,
	buttonMyPosts:null,
	buttonSettings:null,
	menuFooter:null,
	arrayCategories:[],
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

		//Search Block
		this.textSearch = new cc.EditBox(cc.size(600, 70), new cc.Scale9Sprite(res.pngOneBox_png));
		this.textSearch.attr({
			x: size.width * 0.5,
			y: size.height * 0.825,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.textSearch.setPlaceholderFontSize(24);
		this.textSearch.setPlaceHolder('What service do you need?');
		this.textSearch.setFontSize(24);
		this.textSearch.setFontColor(cc.color(0, 0, 0));
		this.textSearch.setMaxLength(50);
		this.textSearch.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
		this.textSearch.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
		this.textSearch.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE);
		this.textSearch.setDelegate(this);
		this.textSearch.setReturnType(1);
		this.addChild(this.textSearch, 0);

		this.spriteSearch = new cc.Sprite(res.pngSearch_png);
		this.spriteSearch.attr({
			x: size.width * 0.9,
			y: size.height * 0.825,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spriteSearch, 0);

		//Body Block
		this.tableCategory = new cc.TableView(this, cc.size(600, 540));
		this.tableCategory.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.tableCategory.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		this.tableCategory.attr({
			x: size.width * 0.5 - 300,
			y: size.height * 0.5 - 285
		});
		this.tableCategory.setDelegate(this);
		this.addChild(this.tableCategory, 0);

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

		if (g_search[3] == true) {
			this.parseLoadResults();
			g_search[3] == false;
			this.layerLoading = new LoadingLayer();
			this.addChild(this.layerLoading, 100);
		}

		return true;
	},
	
	parseLoadResults:function () {
		var that = this;
		var xhr = cc.loader.getXMLHttpRequest();
		if (g_search[0] == "Search") {
			xhr.open("POST", g_config.parseConfig1 + "getSearchResults", true);
		} else if (g_search[0] == "Subcategory") {
			xhr.open("POST", g_config.parseConfig1 + "getCategoryResults", true);
		}
		xhr.setRequestHeader(g_config.parseConfig2, g_config.parseConfig3);
		xhr.setRequestHeader(g_config.parseConfig4, g_config.parseConfig5);
		//xhr.setRequestHeader(g_config.parseConfig6, sessionToken);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
				var jResponse = JSON.parse(xhr.responseText);
				that.arrayCategories = jResponse.result;
				that.tableCategory.reloadData();
				var actWait = new cc.Sequence(new cc.DelayTime(1),
						new cc.CallFunc(function () {
							that.layerLoading.removeFromParent();
						}, this));
				that.layerLoading.runAction(actWait);
			} else if (xhr.readyState == 4 && xhr.status == 400) {

			}
		};
		xhr.send('{"sSearch":"' + g_search[1] +
				'","sLocation":"' + g_search[2] + '"}');
	},

	scrollViewDidScroll:function (view) {
	},

	scrollViewDidZoom:function (view) {
	},

	tableCellHighlight:function (table, cell) {
		var spriteCellBox = cell.getChildByTag(100);
		if (cell.getIdx() == 0) {
			spriteCellBox.setTexture(res.pngBigTableCellA2_png);
		} else if (cell.getIdx() == this.arrayCategories.length - 1) {
			spriteCellBox.setTexture(res.pngBigTableCellC2_png);
		} else {
			spriteCellBox.setTexture(res.pngBigTableCellB2_png);
		}
	},

	tableCellUnhighlight:function (table, cell) {
		var spriteCellBox = cell.getChildByTag(100);
		if (cell.getIdx() == 0) {
			spriteCellBox.setTexture(res.pngBigTableCellA1_png);
		} else if (cell.getIdx() == this.arrayCategories.length - 1) {
			spriteCellBox.setTexture(res.pngBigTableCellC1_png);
		} else {
			spriteCellBox.setTexture(res.pngBigTableCellB1_png);
		}
	},

	tableCellTouched:function (table, cell) {
		g_post = JSON.parse(this.arrayCategories[parseInt(cell.getIdx())]);
		var nextScene = new ViewScene();
		cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
	},

	tableCellSizeForIndex:function (table, idx) {
		return cc.size(600, 180);
	},

	tableCellAtIndex:function (table, idx) {
		var cellSize = this.tableCellSizeForIndex(table, idx);
		var strValue = idx.toFixed(0);
		var cell = table.dequeueCell();
		var jService = JSON.parse(this.arrayCategories[parseInt(strValue)]);
		var spriteCellBox;
		var labelCellBox1;
		var labelCellBox2;
		var labelCellBox3;
		var labelCellBox4;
		var spriteStar1;
		var spriteStar2;
		var spriteStar3;
		var spriteStar4;
		var spriteStar5;
		var sReviews;
		var iStars;
		var iReviews;
		if (!cell) {
			cell = new CustomTableViewCell();

			spriteCellBox = new cc.Sprite(res.pngBigTableCellB1_png);
			spriteCellBox.attr({
				x: cellSize.width * 0.5,
				y: cellSize.height * 0.5,
				anchorX: 0.5,
				anchorY: 0.5,
				tag: 100
			});
			cell.addChild(spriteCellBox);
			if (parseInt(strValue) == 0) {
				spriteCellBox.setTexture(res.pngBigTableCellA1_png);
			} else if (parseInt(strValue) == this.arrayCategories.length - 1) {
				spriteCellBox.setTexture(res.pngBigTableCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngBigTableCellB1_png);
			}
			
			labelCellBox1 = new cc.LabelBMFont(parseInt(strValue) + 1 + ". " + jService.sName, res.fntmasSulit32_fnt);
			labelCellBox1.attr({
				x: cellSize.width * 0.05,
				y: cellSize.height * 0.8,
				anchorX: 0,
				anchorY: 0.5,
				tag: 101
			});
			labelCellBox1.setColor(cc.color(0, 0, 0));
			cell.addChild(labelCellBox1);
			
			labelCellBox2 = new cc.LabelBMFont(jService.sDate, res.fntmasSulit24_fnt);
			labelCellBox2.attr({
				x: cellSize.width * 0.05,
				y: cellSize.height * 0.6,
				anchorX: 0,
				anchorY: 0.5,
				tag: 102
			});
			labelCellBox2.setColor(cc.color(128, 128, 128));
			cell.addChild(labelCellBox2);
			
			labelCellBox3 = new cc.LabelBMFont(jService.sLocation, res.fntmasSulit24_fnt);
			labelCellBox3.attr({
				x: cellSize.width * 0.05,
				y: cellSize.height * 0.4,
				anchorX: 0,
				anchorY: 0.5,
				tag: 103
			});
			labelCellBox3.setColor(cc.color(128, 128, 128));
			cell.addChild(labelCellBox3);
			
			if (jService.iReviews <= 1) {
				sReviews = " Review";
			} else {
				sReviews = " Reviews";
			}
			
			labelCellBox4 = new cc.LabelBMFont(jService.iReviews + sReviews, res.fntmasSulit32_fnt);
			labelCellBox4.attr({
				x: cellSize.width * 0.45,
				y: cellSize.height * 0.2,
				anchorX: 0,
				anchorY: 0.5,
				tag: 104
			});
			labelCellBox4.setColor(cc.color(128, 128, 128));
			cell.addChild(labelCellBox4);
			
			spriteStar1 = new cc.Sprite(res.pngStar1_png);
			spriteStar1.attr({
				x: cellSize.width * 0.075,
				y: cellSize.height * 0.2,
				anchorX: 0.5,
				anchorY: 0.5,
				tag: 105
			});
			cell.addChild(spriteStar1);
			
			spriteStar2 = new cc.Sprite(res.pngStar1_png);
			spriteStar2.attr({
				x: cellSize.width * 0.15,
				y: cellSize.height * 0.2,
				anchorX: 0.5,
				anchorY: 0.5,
				tag: 106
			});
			cell.addChild(spriteStar2);
			
			spriteStar3 = new cc.Sprite(res.pngStar1_png);
			spriteStar3.attr({
				x: cellSize.width * 0.225,
				y: cellSize.height * 0.2,
				anchorX: 0.5,
				anchorY: 0.5,
				tag: 107
			});
			cell.addChild(spriteStar3);
			
			spriteStar4 = new cc.Sprite(res.pngStar1_png);
			spriteStar4.attr({
				x: cellSize.width * 0.3,
				y: cellSize.height * 0.2,
				anchorX: 0.5,
				anchorY: 0.5,
				tag: 108
			});
			cell.addChild(spriteStar4);
			
			spriteStar5 = new cc.Sprite(res.pngStar1_png);
			spriteStar5.attr({
				x: cellSize.width * 0.375,
				y: cellSize.height * 0.2,
				anchorX: 0.5,
				anchorY: 0.5,
				tag: 109
			});
			cell.addChild(spriteStar5);
			
			for (var x = 1; x <= 5; x++) {
				var spriteStar = cell.getChildByTag(x + 104);
				if (x <= jService.iStars) {
					spriteStar.setTexture(res.pngStar2_png);
				} else {
					spriteStar.setTexture(res.pngStar1_png);
				}
			}
		} else {
			spriteCellBox = cell.getChildByTag(100);
			if (parseInt(strValue) == 0) {
				spriteCellBox.setTexture(res.pngBigTableCellA1_png);
			} else if (parseInt(strValue) == this.arrayCategories.length - 1) {
				spriteCellBox.setTexture(res.pngBigTableCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngBigTableCellB1_png);
			}
			
			if (jService.iReviews <= 1) {
				sReviews = " Review";
			} else {
				sReviews = " Reviews";
			}

			labelCellBox1 = cell.getChildByTag(101);
			labelCellBox1.setString(parseInt(strValue) + 1 + ". " + jService.sName);
			
			labelCellBox2 = cell.getChildByTag(102);
			labelCellBox2.setString(jService.sDate);
			
			labelCellBox3 = cell.getChildByTag(103);
			labelCellBox3.setString(jService.sLocation);
			
			labelCellBox4 = cell.getChildByTag(104);
			labelCellBox4.setString(jService.iReviews + sReviews);
			
			for (var x = 1; x <= 5; x++) {
				var spriteStar = cell.getChildByTag(x + 104);
				if (x <= jService.iStars) {
					spriteStar.setTexture(res.pngStar2_png);
				} else {
					spriteStar.setTexture(res.pngStar1_png);
				}
			}
		}

		return cell;
	},

	numberOfCellsInTableView:function (table) {
		return this.arrayCategories.length;
	},

	editBoxReturn: function (box) {
		g_search[0] = "Search";
		g_search[1] = box.getString();
		g_search[2] = this.labelLocation.getString();
		g_search[3] = true;
		var nextScene = new ResultsScene();
		cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
	}
});

var ResultsScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new ResultsLayer();
		this.addChild(layer);
	}
});