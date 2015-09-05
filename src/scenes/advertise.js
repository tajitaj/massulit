var AdvertiseLayer = cc.Layer.extend({
	layerBackground:null,
	spriteHeader:null,
	spriteFooter:null,
	spriteLogo:null,
	labelLocation:null,
	buttonLocation:null,
	menuHeader:null,
	spriteAdvertise:null,
	labelAdvertise1:null,
	labelAdvertise2:null,
	spriteAdPhoto:null,
	spritePrice:null,
	labelPrice1:null,
	labelPrice2:null,
	buttonHome:null,
	buttonPostAnAd:null,
	buttonMyPosts:null,
	buttonSettings:null,
	menuFooter:null,
	layerLoading:null,
	arrayAdvertise1:[],
	arrayAdvertise2:[],
	arrayAdvertise3:[],
	tableAdvertise:null,
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

		//Advertise Block
		this.spriteAdvertise = new cc.Sprite(res.pngTwoBox_png);
		this.spriteAdvertise.attr({
			x: size.width * 0.5,
			y: size.height * 0.8,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spriteAdvertise, 0);

		this.labelAdvertise1 = new cc.LabelBMFont('masSULIT for Business', res.fntmasSulit32_fnt);
		this.labelAdvertise1.setColor(cc.color(0, 0, 0));
		this.labelAdvertise1.attr({
			x: this.spriteAdvertise.getContentSize().width * 0.5,
			y: this.spriteAdvertise.getContentSize().height * 0.66,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spriteAdvertise.addChild(this.labelAdvertise1, 0);

		this.labelAdvertise2 = new cc.LabelBMFont('Meet the people who will love your business', res.fntmasSulit24_fnt);
		this.labelAdvertise2.setColor(cc.color(0, 0, 0));
		this.labelAdvertise2.attr({
			x: this.spriteAdvertise.getContentSize().width * 0.5,
			y: this.spriteAdvertise.getContentSize().height * 0.33,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spriteAdvertise.addChild(this.labelAdvertise2, 0);
		
		this.spriteAdPhoto = new cc.Sprite(res.pngAdvertise_png);
		this.spriteAdPhoto.attr({
			x: size.width * 0.5,
			y: size.height * 0.62,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spriteAdPhoto, 0);
		
		this.spritePrice = new cc.Sprite(res.pngOneBox_png);
		this.spritePrice.attr({
			x: size.width * 0.5,
			y: size.height * 0.45,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(this.spritePrice, 0);

		this.labelPrice1 = new cc.LabelBMFont('Get featured for as low as Php 200 / week', res.fntmasSulit24_fnt);
		this.labelPrice1.setColor(cc.color(0, 0, 0));
		this.labelPrice1.attr({
			x: this.spritePrice.getContentSize().width * 0.5,
			y: this.spritePrice.getContentSize().height * 0.66,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spritePrice.addChild(this.labelPrice1, 0);

		this.labelPrice2 = new cc.LabelBMFont('Raise Brand Awareness', res.fntmasSulit24_fnt);
		this.labelPrice2.setColor(cc.color(128, 128, 128));
		this.labelPrice2.attr({
			x: this.spritePrice.getContentSize().width * 0.5,
			y: this.spritePrice.getContentSize().height * 0.33,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spritePrice.addChild(this.labelPrice2, 0);
		
		//Table Block
		this.tableAdvertise = new cc.TableView(this, cc.size(600, 180));
		this.tableAdvertise.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.tableAdvertise.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		this.tableAdvertise.attr({
			x: size.width * 0.5 - 300,
			y: size.height * 0.5 - 285
		});
		this.tableAdvertise.setDelegate(this);
		this.addChild(this.tableAdvertise, 0);

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
		
		this.arrayAdvertise1 = ['Email Us', 'Call Us'];
		this.arrayAdvertise2 = ['team.marasigames@gmail.com', '+63 933 580 5554'];
		this.arrayAdvertise3 = [res.pngEmail_png, res.pngPhone_png];
		this.tableAdvertise.reloadData();

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
		} else if (cell.getIdx() == this.arrayAdvertise1.length - 1) {
			spriteCellBox.setTexture(res.pngTableCellC2_png);
		} else {
			spriteCellBox.setTexture(res.pngTableCellB2_png);
		}
	},

	tableCellUnhighlight:function (table, cell) {
		var spriteCellBox = cell.getChildByTag(100);
		if (cell.getIdx() == 0) {
			spriteCellBox.setTexture(res.pngTableCellA1_png);
		} else if (cell.getIdx() == this.arrayAdvertise1.length - 1) {
			spriteCellBox.setTexture(res.pngTableCellC1_png);
		} else {
			spriteCellBox.setTexture(res.pngTableCellB1_png);
		}
	},

	tableCellTouched:function (table, cell) {
		switch (cell.getChildByTag(101).getString()) {
		case 'Email Us':
			break;
		case 'Call Us':
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
		var labelCellBox2;
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
			} else if (parseInt(strValue) == this.arrayAdvertise1.length  - 1) {
				spriteCellBox.setTexture(res.pngTableCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngTableCellB1_png);
			}

			labelCellBox = new cc.LabelBMFont(this.arrayAdvertise1[parseInt(strValue)], res.fntmasSulit32_fnt);
			labelCellBox.attr({
				x: cellSize.width * 0.2,
				y: cellSize.height * 0.66,
				anchorX: 0,
				anchorY: 0.5,
				tag: 101
			});
			labelCellBox.setColor(cc.color(0, 0, 0));
			cell.addChild(labelCellBox);
			
			labelCellBox2 = new cc.LabelBMFont(this.arrayAdvertise2[parseInt(strValue)], res.fntmasSulit24_fnt);
			labelCellBox2.attr({
				x: cellSize.width * 0.2,
				y: cellSize.height * 0.33,
				anchorX: 0,
				anchorY: 0.5,
				tag: 103
			});
			labelCellBox2.setColor(cc.color(0, 0, 0));
			cell.addChild(labelCellBox2);

			spriteCellTab = new cc.Sprite(this.arrayAdvertise3[parseInt(strValue)]);
			spriteCellTab.attr({
				x: cellSize.width * 0.1,
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
			} else if (parseInt(strValue) == this.arrayAdvertise1.length  - 1) {
				spriteCellBox.setTexture(res.pngTableCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngTableCellB1_png);
			}

			labelCellBox = cell.getChildByTag(101);
			labelCellBox.setString(this.arrayAdvertise1[parseInt(strValue)]);
			
			labelCellBox2 = cell.getChildByTag(103);
			labelCellBox2.setString(this.arrayAdvertise2[parseInt(strValue)]);
			
			spriteCellTab = cell.getChildByTag(103);
			spriteCellTab.setTexture(this.arrayAdvertise3[parseInt(strValue)]);
		}

		return cell;
	},

	numberOfCellsInTableView:function (table) {
		return this.arrayAdvertise1.length;
	}
});

var AdvertiseScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new AdvertiseLayer();
		this.addChild(layer);
	}
});