var LocationLayer = cc.Layer.extend({
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
		this.layerHeader.setToggleLocation(false);
		this.layerHeader.setLocation("Select Location");
		this.addChild(this.layerHeader, 0);

		this.layerFooter = new FooterLayer();
		this.addChild(this.layerFooter, 0);

		var textSearch = new cc.EditBox(cc.size(600, 70), new cc.Scale9Sprite(res.pngOneBox_png));
		textSearch.attr({
			x: size.width * 0.5,
			y: size.height * 0.825,
			anchorX: 0.5,
			anchorY: 0.5
		});
		textSearch.setPlaceholderFontSize(24);
		textSearch.setPlaceHolder('Search a location?');
		textSearch.setFontSize(24);
		textSearch.setFontColor(cc.color(0, 0, 0));
		textSearch.setMaxLength(50);
		textSearch.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
		textSearch.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
		textSearch.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE);
		textSearch.setDelegate(this);
		textSearch.setReturnType(1);
		this.addChild(textSearch, 0);

		spriteSearch = new cc.Sprite(res.pngSearch_png);
		spriteSearch.attr({
			x: size.width * 0.9,
			y: size.height * 0.825,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteSearch, 0);

		//Body Block
		this.tableData = new cc.TableView(this, cc.size(600, 540));
		this.tableData.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.tableData.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		this.tableData.attr({
			x: size.width * 0.5 - 300,
			y: size.height * 0.5 - 285
		});
		this.tableData.setDelegate(this);
		this.addChild(this.tableData, 0);
		
		this.arrayData = g_locations;
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
		this.layerHeader.setLocation(cell.getChildByTag(101).getString());
		cc.sys.localStorage.setItem("sLocation", cell.getChildByTag(101).getString());
		var nextScene = new HomeScene();
		cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
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
			
			if (labelCellBox.getString().indexOf("(") > -1) {
				labelCellBox.attr({
					x: cellSize.width * 0.05
				});
			}

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
			
			if (labelCellBox.getString().indexOf("(") > -1) {
				labelCellBox.attr({
					x: cellSize.width * 0.05
				});
			} else {
				labelCellBox.attr({
					x: cellSize.width * 0.1
				});
			}
		}

		return cell;
	},

	numberOfCellsInTableView:function (table) {
		return this.arrayData.length;
	},
	
	editBoxReturn: function (box) {
		if (box.getString().length != 0) {
			var arrayLocations = [];
			for (var int = 0; int < g_locations.length; int++) {
				if (g_locations[int].indexOf(box.getString()) > -1) {
					arrayLocations.push(g_locations[int]);
				}
			}
			if (arrayLocations.length > 0) {
				this.arrayData = arrayLocations;
				this.tableData.reloadData();
			} else {
				this.arrayData = g_locations;
				this.tableData.reloadData();
			}
		}
	}
});

var LocationScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new LocationLayer();
		this.addChild(layer);
	}
});