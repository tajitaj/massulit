var ResultsLayer = cc.Layer.extend({
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

		if (g_search[3] == true) {
			this.parseLoadResults();
			g_search[3] == false;
		}

		return true;
	},
	
	parseLoadResults:function () {
		this.layerCover = new LoaderLayer();
		this.addChild(this.layerCover, 100);
		
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
				that.arrayData = jResponse.result;
				that.tableData.reloadData();
				var actWait = new cc.Sequence(new cc.DelayTime(1),
						new cc.CallFunc(function () {
							that.layerCover.removeFromParent();
						}, this));
				that.layerCover.runAction(actWait);
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
		} else if (cell.getIdx() == this.arrayData.length - 1) {
			spriteCellBox.setTexture(res.pngBigTableCellC2_png);
		} else {
			spriteCellBox.setTexture(res.pngBigTableCellB2_png);
		}
	},

	tableCellUnhighlight:function (table, cell) {
		var spriteCellBox = cell.getChildByTag(100);
		if (cell.getIdx() == 0) {
			spriteCellBox.setTexture(res.pngBigTableCellA1_png);
		} else if (cell.getIdx() == this.arrayData.length - 1) {
			spriteCellBox.setTexture(res.pngBigTableCellC1_png);
		} else {
			spriteCellBox.setTexture(res.pngBigTableCellB1_png);
		}
	},

	tableCellTouched:function (table, cell) {
		g_post = JSON.parse(this.arrayData[parseInt(cell.getIdx())]);
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
		var jService = JSON.parse(this.arrayData[parseInt(strValue)]);
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
			} else if (parseInt(strValue) == this.arrayData.length - 1) {
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
			} else if (parseInt(strValue) == this.arrayData.length - 1) {
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
		return this.arrayData.length;
	}
});

var ResultsScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new ResultsLayer();
		this.addChild(layer);
	}
});