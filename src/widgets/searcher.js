var SearcherLayer = cc.Layer.extend({
	textSearch:null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		this.textSearch = new cc.EditBox(cc.size(600, 70), new cc.Scale9Sprite(res.pngOneBox_png));
		this.textSearch.attr({
			x: size.width * 0.5,
			y: size.height * 0.825,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.textSearch.setPlaceholderFontSize(24);
		this.textSearch.setPlaceHolder('What service do you need?');
		this.textSearch.setFontSize(24);
		this.textSearch.setFontColor(cc.color(0, 0, 0));
		this.textSearch.setMaxLength(50);
		this.textSearch.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
		this.textSearch.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
		this.textSearch.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE);
		this.textSearch.setDelegate(this);
		this.textSearch.setReturnType(1);
		this.addChild(this.textSearch, 0);

		var spriteSearch = new cc.Sprite(res.pngSearch_png);
		spriteSearch.attr({
			x: size.width * 0.9,
			y: size.height * 0.825,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteSearch, 0);

		return true;
	},

	editBoxReturn: function (box) {
		if (box.getString().length != 0) {
			g_search[0] = "Search";
			g_search[1] = box.getString();
			g_search[2] = cc.sys.localStorage.getItem('sLocation') || 'Metro Manila (NCR)';
			g_search[3] = true;
			var nextScene = new ResultsScene();
			cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
		}
	}
});