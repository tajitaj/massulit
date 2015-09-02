var AlerterLayer = cc.Layer.extend({
	ctor:function (sTitle, sMessage) {
		this._super();
		var size = cc.winSize;

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

		var spriteMessageBox = new cc.Sprite(res.pngMessageBox_png);
		spriteMessageBox.attr({
			x: size.width * 0.5,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteMessageBox, 0);	

		var buttonMessageBox = new cc.MenuItemImage(
				res.pngMessageBoxBtn1_png,
				res.pngMessageBoxBtn2_png,
				function () {
					this.removeFromParent();
				}, this);
		buttonMessageBox.attr({
			x: spriteMessageBox.getContentSize().width * 0.5,
			y: spriteMessageBox.getContentSize().height * 0,
			anchorX: 0.5,
			anchorY: 0
		});

		var menuMessageBox = new cc.Menu(buttonMessageBox);
		menuMessageBox.x = 0;
		menuMessageBox.y = 0;
		spriteMessageBox.addChild(menuMessageBox, 0);

		var labelButton = new cc.LabelBMFont('Okay', res.fntmasSulit24_fnt);
		labelButton.setColor(cc.color(25, 110, 240));
		labelButton.attr({
			x: buttonMessageBox.getContentSize().width * 0.5,
			y: buttonMessageBox.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		buttonMessageBox.addChild(labelButton, 0);

		var labelTitle = new cc.LabelBMFont(sTitle, res.fntmasSulit32_fnt, 460, cc.TEXT_ALIGNMENT_CENTER);
		labelTitle.setColor(cc.color(0, 0, 0));
		labelTitle.attr({
			x: spriteMessageBox.getContentSize().width * 0.5,
			y: spriteMessageBox.getContentSize().height * 0.8,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteMessageBox.addChild(labelTitle, 0);

		var labelMessage = new cc.LabelBMFont(sMessage, res.fntmasSulit24_fnt, 460, cc.TEXT_ALIGNMENT_CENTER);
		labelMessage.setColor(cc.color(0, 0, 0));
		labelMessage.attr({
			x: spriteMessageBox.getContentSize().width * 0.5,
			y: spriteMessageBox.getContentSize().height * 0.55,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteMessageBox.addChild(labelMessage, 0);

		return true;
	}
});