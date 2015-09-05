var SelecterLayer = cc.Layer.extend({
	tableData:null,
	arrayData:[],
	objReceiver:null,
	ctor:function (sTitle, aSelections, receiver) {
		this._super();
		var size = cc.winSize;

		this.arrayData = aSelections;
		this.objReceiver = receiver;

		var layerBackground = new cc.LayerColor(cc.color(0,0,0,125), size.width, size.height);
		this.addChild(layerBackground, 0);

		var buttonBlank = new cc.MenuItemImage(
				res.pngBlank_png,
				res.pngBlank_png,
				function () {

				}, this);
		buttonBlank.attr({
			x: size.width * 0.5,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menuBlank = new cc.Menu(buttonBlank);
		menuBlank.x = 0;
		menuBlank.y = 0;
		this.addChild(menuBlank, 0);

		var spriteSelectBox = new cc.Sprite(res.pngSelectBox_png);
		spriteSelectBox.attr({
			x: size.width * 0.5,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteSelectBox, 0);	

		var labelTitle = new cc.LabelBMFont(sTitle, res.fntmasSulit32_fnt, 460, cc.TEXT_ALIGNMENT_CENTER);
		labelTitle.setColor(cc.color(0, 0, 0));
		labelTitle.attr({
			x: spriteSelectBox.getContentSize().width * 0.5,
			y: spriteSelectBox.getContentSize().height * 0.9,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteSelectBox.addChild(labelTitle, 0);

		this.tableData = new cc.TableView(this, cc.size(500, 400));
		this.tableData.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.tableData.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		this.tableData.attr({
			x: size.width * 0.5 - spriteSelectBox.getContentSize().width * 0.5,
			y: size.height * 0.5 - spriteSelectBox.getContentSize().height * 0.5
		});
		this.tableData.setDelegate(this);
		this.addChild(this.tableData, 0);

		return true;
	},

	scrollViewDidScroll:function (view) {
	},

	scrollViewDidZoom:function (view) {
	},

	tableCellHighlight:function (table, cell) {
		var spriteCellBox = cell.getChildByTag(100);
		if (cell.getIdx() == 0) {
			spriteCellBox.setTexture(res.pngSelectCellA2_png);
		} else if (cell.getIdx() == this.arrayData.length - 1) {
			spriteCellBox.setTexture(res.pngSelectCellC2_png);
		} else {
			spriteCellBox.setTexture(res.pngSelectCellB2_png);
		}
	},

	tableCellUnhighlight:function (table, cell) {
		var spriteCellBox = cell.getChildByTag(100);
		if (cell.getIdx() == 0) {
			spriteCellBox.setTexture(res.pngSelectCellA1_png);
		} else if (cell.getIdx() == this.arrayData.length - 1) {
			spriteCellBox.setTexture(res.pngSelectCellC1_png);
		} else {
			spriteCellBox.setTexture(res.pngSelectCellB1_png);
		}
	},

	tableCellTouched:function (table, cell) {
		this.objReceiver.setString(cell.getChildByTag(101).getString());
		this.removeFromParent();
	},

	tableCellSizeForIndex:function (table, idx) {
		return cc.size(500, 80);
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

			spriteCellBox = new cc.Sprite(res.pngSelectCellB1_png);
			spriteCellBox.attr({
				x: cellSize.width * 0.5,
				y: cellSize.height * 0.5,
				anchorX: 0.5,
				anchorY: 0.5,
				tag: 100
			});
			cell.addChild(spriteCellBox);

			if (parseInt(strValue) == 0) {
				spriteCellBox.setTexture(res.pngSelectCellA1_png);
			} else if (parseInt(strValue) == this.arrayData.length - 1) {
				spriteCellBox.setTexture(res.pngSelectCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngSelectCellB1_png);
			}

			labelCellBox = new cc.LabelBMFont(this.arrayData[parseInt(strValue)], res.fntmasSulit32_fnt, 400, cc.TEXT_ALIGNMENT_CENTER);
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
				spriteCellBox.setTexture(res.pngSelectCellA1_png);
			} else if (parseInt(strValue) == this.arrayData.length - 1) {
				spriteCellBox.setTexture(res.pngSelectCellC1_png);
			} else {
				spriteCellBox.setTexture(res.pngSelectCellB1_png);
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