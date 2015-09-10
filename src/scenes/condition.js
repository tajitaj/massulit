var ConditionLayer = cc.Layer.extend({
	layerBackground:null,
	layerHeader:null,
	layerFooter:null,
	layerCover:null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		this.layerBackground = new cc.LayerColor(cc.color(235,235,235,255), size.width, size.height);
		this.addChild(this.layerBackground, 0);

		this.layerHeader = new HeaderLayer();
		this.addChild(this.layerHeader, 0);

		this.layerFooter = new FooterLayer();
		this.addChild(this.layerFooter, 0);

		var spriteCondition = new cc.Sprite(res.pngTwoBox_png);
		spriteCondition.attr({
			x: size.width * 0.5,
			y: size.height * 0.8,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.addChild(spriteCondition, 0);

		var labelCondition1 = new cc.LabelBMFont('Conditions of Use', res.fntmasSulit32_fnt);
		labelCondition1.setColor(cc.color(0, 0, 0));
		labelCondition1.attr({
			x: spriteCondition.getContentSize().width * 0.5,
			y: spriteCondition.getContentSize().height * 0.66,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteCondition.addChild(labelCondition1, 0);

		var labelCondition2 = new cc.LabelBMFont('If you do not agree, you may not use this app/website', res.fntmasSulit24_fnt);
		labelCondition2.setColor(cc.color(0, 0, 0));
		labelCondition2.attr({
			x: spriteCondition.getContentSize().width * 0.5,
			y: spriteCondition.getContentSize().height * 0.33,
			anchorX: 0.5,
			anchorY: 0.5
		});
		spriteCondition.addChild(labelCondition2, 0);
		
		var scrollView = new ccui.ScrollView();
		scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
		scrollView.setTouchEnabled(true);
		scrollView.setBounceEnabled(false);
		scrollView.setBackGroundImage(res.pngConditionBox_png);
		scrollView.setContentSize(cc.size(600, 500));
		scrollView.setInnerContainerSize(cc.size(600, 1120));
		scrollView.setAnchorPoint(cc.p(0.5, 0.5));
		scrollView.setPosition(cc.p(size.width * 0.5, size.height * 0.465));
		this.addChild(scrollView);
		
		var labelTitle1 = new cc.LabelBMFont('Introduction', res.fntmasSulit32_fnt);
		labelTitle1.setColor(cc.color(0, 0, 0));
		labelTitle1.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 20,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelTitle1, 0);
		
		var labelDesc1 = new cc.LabelBMFont("The terms 'masSULIT' and 'masSULIT.com' are used in this document (or agreement) to refer to the website itself and to masSULIT.com, the company which owns and operates the masSULIT website.", res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelDesc1.setColor(cc.color(128, 128, 128));
		labelDesc1.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 60,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelDesc1, 0);
		
		var labelTitle2 = new cc.LabelBMFont('Terms of Service', res.fntmasSulit32_fnt);
		labelTitle2.setColor(cc.color(0, 0, 0));
		labelTitle2.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 140,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelTitle2, 0);
		
		var labelDesc2 = new cc.LabelBMFont("We do not control the truth or accuracy of content posted or the safety, or legality of the services advertised.", res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelDesc2.setColor(cc.color(128, 128, 128));
		labelDesc2.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 180,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelDesc2, 0);
		
		var labelTitle3 = new cc.LabelBMFont('Contributing Content', res.fntmasSulit32_fnt);
		labelTitle3.setColor(cc.color(0, 0, 0));
		labelTitle3.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 240,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelTitle3, 0);

		var labelDesc3 = new cc.LabelBMFont("You truthfully assert that the content being contributed is your creation and that you own the copyright to the content. \nWe are not responsible or liable for loss if visitors to the site violate your copyright and distribute your copyrighted content without your permission. \nYou grant us exclusive unlimited Internet distribution rights and electronic distribution rights.", res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelDesc3.setColor(cc.color(128, 128, 128));
		labelDesc3.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 280,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelDesc3, 0);
		
		var labelTitle4 = new cc.LabelBMFont("Using masSULIT's Services", res.fntmasSulit32_fnt);
		labelTitle4.setColor(cc.color(0, 0, 0));
		labelTitle4.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 460,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelTitle4, 0);

		var labelDesc4 = new cc.LabelBMFont("You agree that: \nmasSULIT may electronically block or otherwise deny access to the masSULIT website, to any user deemed to be in violation of any of the terms in this document. \nmasSULIT is not obliged to ensure that the website is available to all users at all times. \nA possibility exists that the site could include inaccuracies or errors. \nThis site may contain links to other websites operated by third parties. You acknowledge that masSULIT neither endorse nor are affiliated with the linked site.", res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelDesc4.setColor(cc.color(128, 128, 128));
		labelDesc4.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 500,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelDesc4, 0);
		
		var labelTitle5 = new cc.LabelBMFont("Limitation of Liability", res.fntmasSulit32_fnt);
		labelTitle5.setColor(cc.color(0, 0, 0));
		labelTitle5.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 750,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelTitle5, 0);

		var labelDesc5 = new cc.LabelBMFont("In no event shall masSULIT.com, be liable for any direct, indirect, incidental, special, punitive, consequential damages, or any damages whatsoever, including, but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses.", res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelDesc5.setColor(cc.color(128, 128, 128));
		labelDesc5.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 790,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelDesc5, 0);
		
		var labelTitle6 = new cc.LabelBMFont("Termination", res.fntmasSulit32_fnt);
		labelTitle6.setColor(cc.color(0, 0, 0));
		labelTitle6.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 900,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelTitle6, 0);

		var labelDesc6 = new cc.LabelBMFont("masSULIT.com, reserves the right to discontinue in whole or in part any portion of masSULIT services or programs with or without notice.", res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelDesc6.setColor(cc.color(128, 128, 128));
		labelDesc6.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 940,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelDesc6, 0);
		
		var labelTitle7 = new cc.LabelBMFont("Independent Investigation", res.fntmasSulit32_fnt);
		labelTitle7.setColor(cc.color(0, 0, 0));
		labelTitle7.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 1000,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelTitle7, 0);

		var labelDesc7 = new cc.LabelBMFont("You acknowledge that you have read this agreement and agree to all its terms and conditions.", res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelDesc7.setColor(cc.color(128, 128, 128));
		labelDesc7.attr({
			x: scrollView.width * 0.05,
			y: scrollView.getInnerContainerSize().height - 1040,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelDesc7, 0);

		return true;
	}
});

var ConditionScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new ConditionLayer();
		this.addChild(layer);
	}
});