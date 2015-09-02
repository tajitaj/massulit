var LoaderLayer = cc.Layer.extend({
	ctor:function () {
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

		var spriteLoading1 = new cc.Sprite(res.pngLoading1_png);
		spriteLoading1.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteLoading1, 5);

		var spriteLoading2 = new cc.Sprite(res.pngLoading2_png);
		spriteLoading2.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteLoading2, 4);

		var spriteLoading3 = new cc.Sprite(res.pngLoading3_png);
		spriteLoading3.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteLoading3, 3);

		var spriteLoading4 = new cc.Sprite(res.pngLoading4_png);
		spriteLoading4.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteLoading4, 2);

		var spriteLoading5 = new cc.Sprite(res.pngLoading5_png);
		spriteLoading5.attr({
			x: size.width * 0.5 - 75,
			y: size.height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteLoading5, 1);

		var bezierPoints1 = [cc.p(0, 0),cc.p(75, 165),cc.p(150, 0)];
		var bezierPoints2 = [cc.p(0, 0),cc.p(-75, -165),cc.p(-150, 0)];
		var delay1 = cc.delayTime(0);
		var delay2 = cc.delayTime(0.25);
		var delay3 = cc.delayTime(0.5);
		var delay4 = cc.delayTime(0.75);
		var delay5 = cc.delayTime(1);

		var actionBezier1A = cc.bezierBy(1, bezierPoints1);
		var actionBezier1B = cc.bezierBy(1, bezierPoints2);
		var actionBezier1C = cc.sequence(delay1, actionBezier1A, delay5, delay1, actionBezier1B, delay5).repeatForever();
		spriteLoading1.runAction(actionBezier1C);

		var actionBezier2A = cc.bezierBy(1, bezierPoints1);
		var actionBezier2B = cc.bezierBy(1, bezierPoints2);
		var actionBezier2C = cc.sequence(delay2, actionBezier2A, delay4, delay2, actionBezier2B, delay4).repeatForever();
		spriteLoading2.runAction(actionBezier2C);

		var actionBezier3A = cc.bezierBy(1, bezierPoints1);
		var actionBezier3B = cc.bezierBy(1, bezierPoints2);
		var actionBezier3C = cc.sequence(delay3, actionBezier3A, delay3, delay3, actionBezier3B, delay3).repeatForever();
		spriteLoading3.runAction(actionBezier3C);

		var actionBezier4A = cc.bezierBy(1, bezierPoints1);
		var actionBezier4B = cc.bezierBy(1, bezierPoints2);
		var actionBezier4C = cc.sequence(delay4, actionBezier4A, delay2, delay4, actionBezier4B, delay2).repeatForever();
		spriteLoading4.runAction(actionBezier4C);

		var actionBezier5A = cc.bezierBy(1, bezierPoints1);
		var actionBezier5B = cc.bezierBy(1, bezierPoints2);
		var actionBezier5C = cc.sequence(delay5, actionBezier5A, delay1, delay5, actionBezier5B, delay1).repeatForever();
		spriteLoading5.runAction(actionBezier5C);

		return true;
	}
});