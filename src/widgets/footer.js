var FooterLayer = cc.Layer.extend({
	buttonHome:null,
	buttonPostAnAd:null,
	buttonMyPosts:null,
	buttonSettings:null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		var spriteFooter = new cc.Sprite(res.pngFooter_png);
		spriteFooter.attr({
			x: size.width * 0.5,
			y: size.height * 0,
			anchorX: 0.5,
			anchorY: 0
		});
		this.addChild(spriteFooter, 0);

		this.buttonHome = new cc.MenuItemImage(
				res.pngHome1_png,
				res.pngHome2_png,
				res.pngHome2_png,
				function () {
					var nextScene = new HomeScene();
					cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
				}, this);
		this.buttonHome.attr({
			x: spriteFooter.getContentSize().width * 0.15,
			y: spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.buttonPostAnAd = new cc.MenuItemImage(
				res.pngPostAnAd1_png,
				res.pngPostAnAd2_png,
				res.pngPostAnAd2_png,
				function () {
					var nextScene = new NewPostScene();
					cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
				}, this);
		this.buttonPostAnAd.attr({
			x: spriteFooter.getContentSize().width * 0.375,
			y: spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.buttonMyPosts = new cc.MenuItemImage(
				res.pngMyPosts1_png,
				res.pngMyPosts2_png,
				res.pngMyPosts2_png,
				function () {
					//var nextScene = new HomeScene();
					//cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
				}, this);
		this.buttonMyPosts.attr({
			x: spriteFooter.getContentSize().width * 0.625,
			y: spriteFooter.getContentSize().height * 0.5,
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
			x: spriteFooter.getContentSize().width * 0.85,
			y: spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menuFooter = new cc.Menu(this.buttonHome, this.buttonPostAnAd, this.buttonMyPosts, this.buttonSettings);
		menuFooter.attr({
			x: 0,
			y: 0
		});
		spriteFooter.addChild(menuFooter, 0);

		return true;
	},

	setToggleHome:function (bToggle) {
		this.buttonHome.setEnabled(bToggle);
	},
	
	setTogglePostAnAd:function (bToggle) {
		this.buttonPostAnAd.setEnabled(bToggle);
	},
	
	setToggleMyPosts:function (bToggle) {
		this.buttonMyPosts.setEnabled(bToggle);
	},
	
	setToggleSettings:function (bToggle) {
		this.buttonSettings.setEnabled(bToggle);
	}
});