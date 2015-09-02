var HeaderLayer = cc.Layer.extend({
	labelLocation:null,
	buttonLocation:null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		var spriteHeader = new cc.Sprite(res.pngHeader_png);
		spriteHeader.attr({
			x: size.width * 0.5,
			y: size.height * 1,
			anchorX: 0.5,
			anchorY: 1
		});
		this.addChild(spriteHeader, 0);

		var spriteLogo = new cc.Sprite(res.pngLogo_png);
		spriteLogo.attr({
			x: spriteHeader.getContentSize().width * 0.5,
			y: spriteHeader.getContentSize().height * 0.6,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteHeader.addChild(spriteLogo, 0);

		var sLocation = cc.sys.localStorage.getItem('sLocation') || 'Metro Manila (NCR)';
		this.labelLocation = new cc.LabelBMFont(sLocation, res.fntmasSulit24_fnt);
		this.labelLocation.setColor(cc.color(128, 128, 128));
		this.labelLocation.attr({
			x: spriteHeader.getContentSize().width * 0.5,
			y: spriteHeader.getContentSize().height * 0.25,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteHeader.addChild(this.labelLocation, 0);

		this.buttonLocation = new cc.MenuItemImage(
				res.pngLocation1_png,
				res.pngLocation2_png,
				res.pngLocation2_png,
				function () {
					var nextScene = new LocationScene();
					cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
				}, this);
		this.buttonLocation.attr({
			x: spriteHeader.getContentSize().width * 0.9,
			y: spriteHeader.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menuHeader = new cc.Menu(this.buttonLocation);
		menuHeader.attr({
			x: 0,
			y: 0
		});
		spriteHeader.addChild(menuHeader, 0);

		return true;
	},
	
	getLocation:function () {
		return this.labelLocation.getString();
	},
	
	setLocation:function (sLocation) {
		this.labelLocation.setString(sLocation);
	},
	
	setToggleLocation:function (bToggle) {
		this.buttonLocation.setEnabled(bToggle);
	}
});