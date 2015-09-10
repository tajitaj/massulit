var AdvertiseLayer = cc.Layer.extend({
	layerBackground:null,
	layerHeader:null,
	layerFooter:null,
	layerCover:null,
	tableData:null,
	arrayAdvertise1:[],
	arrayAdvertise2:[],
	arrayAdvertise3:[],
	ctor:function () {
		this._super();
		var size = cc.winSize;

		this.layerBackground = new cc.LayerColor(cc.color(235,235,235,255), size.width, size.height);
		this.addChild(this.layerBackground, 0);

		this.layerHeader = new HeaderLayer();
		this.addChild(this.layerHeader, 0);

		this.layerFooter = new FooterLayer();
		this.addChild(this.layerFooter, 0);

		var spriteAdvertise = new cc.Sprite(res.pngTwoBox_png);
		spriteAdvertise.attr({
			x: size.width * 0.5,
			y: size.height * 0.8,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteAdvertise, 0);

		var labelAdvertise1 = new cc.LabelBMFont('masSULIT for Business', res.fntmasSulit32_fnt);
		labelAdvertise1.setColor(cc.color(0, 0, 0));
		labelAdvertise1.attr({
			x: spriteAdvertise.getContentSize().width * 0.5,
			y: spriteAdvertise.getContentSize().height * 0.66,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteAdvertise.addChild(labelAdvertise1, 0);

		var labelAdvertise2 = new cc.LabelBMFont('Meet the people who will love your business', res.fntmasSulit24_fnt);
		labelAdvertise2.setColor(cc.color(0, 0, 0));
		labelAdvertise2.attr({
			x: spriteAdvertise.getContentSize().width * 0.5,
			y: spriteAdvertise.getContentSize().height * 0.33,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteAdvertise.addChild(labelAdvertise2, 0);
		
		var spriteAdPhoto = new cc.Sprite(res.pngAdvertise_png);
		spriteAdPhoto.attr({
			x: size.width * 0.5,
			y: size.height * 0.62,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteAdPhoto, 0);
		
		var spritePrice = new cc.Sprite(res.pngOneBox_png);
		spritePrice.attr({
			x: size.width * 0.5,
			y: size.height * 0.45,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spritePrice, 0);

		var labelPrice1 = new cc.LabelBMFont('Get featured for as low as Php 200 / week', res.fntmasSulit24_fnt);
		labelPrice1.setColor(cc.color(0, 0, 0));
		labelPrice1.attr({
			x: spritePrice.getContentSize().width * 0.5,
			y: spritePrice.getContentSize().height * 0.66,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spritePrice.addChild(labelPrice1, 0);

		var labelPrice2 = new cc.LabelBMFont('Raise Brand Awareness', res.fntmasSulit24_fnt);
		labelPrice2.setColor(cc.color(128, 128, 128));
		labelPrice2.attr({
			x: spritePrice.getContentSize().width * 0.5,
			y: spritePrice.getContentSize().height * 0.33,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spritePrice.addChild(labelPrice2, 0);
		
		this.tableData = new cc.TableView(this, cc.size(600, 180));
		this.tableData.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.tableData.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		this.tableData.attr({
			x: size.width * 0.5 - 300,
			y: size.height * 0.5 - 285
		});
		this.tableData.setDelegate(this);
		this.addChild(this.tableData, 0);
		
		this.arrayAdvertise1 = ['Email Us', 'Call Us'];
		this.arrayAdvertise2 = ['team.marasigames@gmail.com', '+63 933 580 5554'];
		this.arrayAdvertise3 = [res.pngEmail_png, res.pngPhone_png];
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