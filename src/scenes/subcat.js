var SubCatLayer = cc.Layer.extend({
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
		this.addChild(this.layerFooter, 0);

		this.layerSearcher = new SearcherLayer();
		this.addChild(this.layerSearcher, 0);

		this.tableData = new cc.TableView(this, cc.size(600, 540));
		this.tableData.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.tableData.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		this.tableData.attr({
			x: size.width * 0.5 - 300,
			y: size.height * 0.5 - 285
		});
		this.tableData.setDelegate(this);
		this.addChild(this.tableData, 0);

		this.parseLoadSubCat();

		return true;
	},

	parseLoadSubCat:function () {
		this.layerCover = new LoaderLayer();
		this.addChild(this.layerCover, 100);

		var that = this;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", g_config.parseConfig1 + "getSubCategories", true);
		xhr.setRequestHeader(g_config.parseConfig2, g_config.parseConfig3);
		xhr.setRequestHeader(g_config.parseConfig4, g_config.parseConfig5);
		//xhr.setRequestHeader(g_config.parseConfig6, sessionToken);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
				var jResponse = JSON.parse(xhr.responseText);
				that.arrayData = jResponse.result;
				that.tableData.reloadData();
				var actWait = new cc.Sequence(new cc.DelayTime(1),
						new cc.CallFunc(function () {
							that.layerCover.removeFromParent();
						}, this));
				that.layerCover.runAction(actWait);
			} else if (xhr.readyState == 4 && xhr.status == 400) {
				that.layerCover.removeFromParent();
				that.LayerCover = new AlerterLayer("masSULIT", "Unable to load data from server.");
				that.addChild(that.layerCover, 100);
			}
		};
		xhr.send('{"sCategory":"' + g_category + '"}');
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
		g_search[0] = "Subcategory";
		g_search[1] = cell.getChildByTag(101).getString();
		g_search[2] = this.layerHeader.getLocation();
		g_search[3] = true;
		var nextScene = new ResultsScene();
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
	}
});

var SubCatScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new SubCatLayer();
		this.addChild(layer);
	}
});