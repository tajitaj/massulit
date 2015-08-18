var ViewLayer = cc.Layer.extend({
	layerBackground:null,
	spriteHeader:null,
	spriteFooter:null,
	spriteLogo:null,
	labelLocation:null,
	buttonLocation:null,
	menuHeader:null,
	buttonHome:null,
	buttonPostAnAd:null,
	buttonMyPosts:null,
	buttonSettings:null,
	menuFooter:null,
	layerLoading:null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		this.layerBackground = new cc.LayerColor(cc.color(235,235,235,255), size.width, size.height);
		this.layerBackground.attr({
			x: 0,
			y: 0
		});
		this.addChild(this.layerBackground, 0);

		//Header Block
		this.spriteHeader = new cc.Sprite(res.pngHeader_png);
		this.spriteHeader.attr({
			x: size.width * 0.5,
			y: size.height * 1,
			anchorX: 0.5,
			anchorY: 1
		});
		this.addChild(this.spriteHeader, 0);

		this.spriteLogo = new cc.Sprite(res.pngLogo_png);
		this.spriteLogo.attr({
			x: this.spriteHeader.getContentSize().width * 0.5,
			y: this.spriteHeader.getContentSize().height * 0.6,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spriteHeader.addChild(this.spriteLogo, 0);

		var sLocation = cc.sys.localStorage.getItem('sLocation') || 'Metro Manila (NCR)';
		this.labelLocation = new cc.LabelBMFont(sLocation, res.fntmasSulit24_fnt);
		this.labelLocation.setColor(cc.color(128, 128, 128));
		this.labelLocation.attr({
			x: this.spriteHeader.getContentSize().width * 0.5,
			y: this.spriteHeader.getContentSize().height * 0.25,
			anchorX: 0.5,
			anchorY: 0.5
		});
		this.spriteHeader.addChild(this.labelLocation, 0);

		this.buttonLocation = new cc.MenuItemImage(
				res.pngLocation1_png,
				res.pngLocation2_png,
				res.pngLocation2_png,
				function () {
					var nextScene = new LocationScene();
					cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
				}, this);
		this.buttonLocation.attr({
			x: this.spriteHeader.getContentSize().width * 0.9,
			y: this.spriteHeader.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.menuHeader = new cc.Menu(this.buttonLocation);
		this.menuHeader.attr({
			x: 0,
			y: 0
		});
		this.spriteHeader.addChild(this.menuHeader, 0);

		var scrollView = new ccui.ScrollView();
		scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
		scrollView.setTouchEnabled(true);
		scrollView.setBounceEnabled(false);
		scrollView.setBackGroundImage(res.pngViewBox_png);
		scrollView.setContentSize(cc.size(600, 650));
		scrollView.setInnerContainerSize(cc.size(600, 1000));
		scrollView.setAnchorPoint(cc.p(0.5, 0.5));
		scrollView.setPosition(cc.p(size.width * 0.5, size.height * 0.525));
		this.addChild(scrollView);
		
		//Scroll Block
		var yLatestHeight = 5;
		
		var labelBack = new cc.LabelBMFont("< Back to Search List", res.fntmasSulit32_fnt);
		labelBack.setColor(cc.color(25, 110, 240));
		var buttonBack = new cc.MenuItemLabel(
			labelBack,
			function () {
				var nextScene = new ResultsScene();
				cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
			}, this);
		yLatestHeight = yLatestHeight + buttonBack.height;
		buttonBack.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		var menuBack = new cc.Menu(buttonBack);
		menuBack.attr({
			x: 0,
			y: 0
		});
		scrollView.addChild(menuBack, 0);
		
		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteDiv, 0);
		
		var labelWriteReview = new cc.LabelBMFont("Write a Review >", res.fntmasSulit32_fnt);
		labelWriteReview.setColor(cc.color(25, 110, 240));
		var buttonWriteReview = new cc.MenuItemLabel(
				labelWriteReview,
				function () {
					
				}, this);
		yLatestHeight = yLatestHeight + buttonWriteReview.height;
		buttonWriteReview.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		var menuWrite = new cc.Menu(buttonWriteReview);
		menuWrite.attr({
			x: 0,
			y: 0
		});
		scrollView.addChild(menuWrite, 0);
		
		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteDiv, 0);
		
		if (g_post.iReviews > 3) {
			var labelMoreReview = new cc.LabelBMFont("More Reviews >", res.fntmasSulit32_fnt);
			labelMoreReview.setColor(cc.color(25, 110, 240));
			var buttonMoreReview = new cc.MenuItemLabel(
					labelMoreReview,
					function () {

					}, this);
			yLatestHeight = yLatestHeight + buttonMoreReview.height;
			buttonMoreReview.attr({
				x: scrollView.width * 0.5,
				y: yLatestHeight,
				anchorX: 0.5,
				anchorY: 1
			});
			var menuMore = new cc.Menu(buttonMoreReview);
			menuMore.attr({
				x: 0,
				y: 0
			});
			scrollView.addChild(menuMore, 0);
			
			var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
			yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
			spriteDiv.attr({
				x: scrollView.width * 0.5,
				y: yLatestHeight,
				anchorX: 0.5,
				anchorY: 1
			});
			scrollView.addChild(spriteDiv, 0);
		}
		
		if (g_post.aReviews.length > 0 && g_post.iReviews > 0) {
			for (var x = 0; x < g_post.aReviews.length; x++) {
				var aReview = g_post.aReviews[x].split("||");
				
				var labelReviewer = new cc.LabelBMFont('By ' + aReview[4], res.fntmasSulit24_fnt);
				labelReviewer.setColor(cc.color(128, 128, 128));
				yLatestHeight = yLatestHeight + labelReviewer.getContentSize().height;
				labelReviewer.attr({
					x: scrollView.width * 0.05,
					y: yLatestHeight,
					anchorX: 0,
					anchorY: 1
				});
				scrollView.addChild(labelReviewer, 0);
				
				var labelDateReviewed = new cc.LabelBMFont(aReview[3], res.fntmasSulit24_fnt);
				labelDateReviewed.setColor(cc.color(128, 128, 128));
				labelDateReviewed.attr({
					x: scrollView.width * 0.95,
					y: yLatestHeight,
					anchorX: 1,
					anchorY: 1
				});
				scrollView.addChild(labelDateReviewed, 0);
				
				var labelReviewDesc = new cc.LabelBMFont(aReview[2], res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
				labelReviewDesc.setColor(cc.color(0, 0, 0));
				yLatestHeight = yLatestHeight + labelReviewDesc.getContentSize().height;
				labelReviewDesc.attr({
					x: scrollView.width * 0.05,
					y: yLatestHeight,
					anchorX: 0,
					anchorY: 1
				});
				scrollView.addChild(labelReviewDesc, 0);
				
				var spriteStar = new cc.Sprite(res.pngStar1_png);
				yLatestHeight = yLatestHeight + spriteStar.getContentSize().height;
				for (var y = 1; y <= 5; y++) {
					var spriteStar = new cc.Sprite(res.pngStar1_png);
					if (y <= parseInt(aReview[0])) {
						spriteStar.setTexture(res.pngStar2_png);
					} else {
						spriteStar.setTexture(res.pngStar1_png);
					}
					spriteStar.attr({
						x: scrollView.width * 0.075 * y,
						y: yLatestHeight,
						anchorX: 0.5,
						anchorY: 1
					});
					scrollView.addChild(spriteStar);
				}
				
				var labelReviewTitle = new cc.LabelBMFont(aReview[1], res.fntmasSulit32_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
				labelReviewTitle.setColor(cc.color(0, 0, 0));
				yLatestHeight = yLatestHeight + labelReviewTitle.getContentSize().height;
				labelReviewTitle.attr({
					x: scrollView.width * 0.05,
					y: yLatestHeight,
					anchorX: 0,
					anchorY: 1
				});
				scrollView.addChild(labelReviewTitle, 0);
				
				var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
				yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
				spriteDiv.attr({
					x: scrollView.width * 0.5,
					y: yLatestHeight,
					anchorX: 0.5,
					anchorY: 1
				});
				scrollView.addChild(spriteDiv, 0);
			}
		}
		
		var spriteStar = new cc.Sprite(res.pngStar1_png);
		yLatestHeight = yLatestHeight + spriteStar.getContentSize().height;
		for (var y = 1; y <= 5; y++) {
			var spriteStar = new cc.Sprite(res.pngStar1_png);
			if (y <= g_post.iStars) {
				spriteStar.setTexture(res.pngStar2_png);
			} else {
				spriteStar.setTexture(res.pngStar1_png);
			}
			spriteStar.attr({
				x: scrollView.width * 0.075 * y + scrollView.width * 0.15,
				y: yLatestHeight,
				anchorX: 0.5,
				anchorY: 1
			});
			scrollView.addChild(spriteStar);
		}
		
		var sReviews;
		if (g_post.iReviews <= 1) {
			sReviews = "Review";
		} else {
			sReviews = "Reviews";
		}
		var labelReviews = new cc.LabelBMFont(g_post.iReviews + ' ' + sReviews, res.fntmasSulit32_fnt);
		labelReviews.setColor(cc.color(128, 128, 128));
		labelReviews.attr({
			x: scrollView.width * 0.6,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelReviews, 0);
		
		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteDiv, 0);
		
		var spritePhoto = new cc.Sprite(res.pngNoPhoto_png);
		yLatestHeight = yLatestHeight + spritePhoto.getContentSize().height;
		spritePhoto.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spritePhoto, 0);
		
		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteDiv, 0);
		
		var labelFullDescription = new cc.LabelBMFont(g_post.sDescription, res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelFullDescription.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelFullDescription.getContentSize().height;
		labelFullDescription.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelFullDescription, 0);
		
		var labelDescription = new cc.LabelBMFont('Description', res.fntmasSulit32_fnt);
		labelDescription.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelDescription.getContentSize().height;
		labelDescription.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelDescription, 0);
		
		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteDiv, 0);
		
		var labelFBPage2 = new cc.LabelBMFont(g_post.sPage, res.fntmasSulit24_fnt, 315, cc.TEXT_ALIGNMENT_LEFT);
		yLatestHeight = yLatestHeight + labelFBPage2.getContentSize().height * 1.5;
		labelFBPage2.setColor(cc.color(128, 128, 128));
		labelFBPage2.attr({
			x: scrollView.width * 0.45,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelFBPage2, 0);
		
		var labelFBPage1 = new cc.LabelBMFont('Facebook Page', res.fntmasSulit24_fnt);
		labelFBPage1.setColor(cc.color(0, 0, 0));
		labelFBPage1.attr({
			x: scrollView.width * 0.15,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelFBPage1, 0);
		
		var spriteSmallIcon6 = new cc.Sprite(res.pngSmallIcon6_png);
		spriteSmallIcon6.attr({
			x: scrollView.width * 0.075,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteSmallIcon6, 0);
		
		var labelWorkingHours2 = new cc.LabelBMFont(g_post.sHours, res.fntmasSulit24_fnt, 315, cc.TEXT_ALIGNMENT_LEFT);
		labelWorkingHours2.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelWorkingHours2.getContentSize().height * 1.5;
		labelWorkingHours2.attr({
			x: scrollView.width * 0.45,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelWorkingHours2, 0);

		var labelWorkingHours1 = new cc.LabelBMFont('Working Hours', res.fntmasSulit24_fnt);
		labelWorkingHours1.setColor(cc.color(0, 0, 0));
		labelWorkingHours1.attr({
			x: scrollView.width * 0.15,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelWorkingHours1, 0);
		
		var spriteSmallIcon5 = new cc.Sprite(res.pngSmallIcon5_png);
		spriteSmallIcon5.attr({
			x: scrollView.width * 0.075,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteSmallIcon5, 0);
		
		var labelContactPerson2 = new cc.LabelBMFont(g_post.sPerson, res.fntmasSulit24_fnt, 315, cc.TEXT_ALIGNMENT_LEFT);
		labelContactPerson2.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelContactPerson2.getContentSize().height * 1.5;
		labelContactPerson2.attr({
			x: scrollView.width * 0.45,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelContactPerson2, 0);

		var labelContactPerson1 = new cc.LabelBMFont('Contact Person', res.fntmasSulit24_fnt);
		labelContactPerson1.setColor(cc.color(0, 0, 0));
		labelContactPerson1.attr({
			x: scrollView.width * 0.15,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelContactPerson1, 0);

		var spriteSmallIcon4 = new cc.Sprite(res.pngSmallIcon4_png);
		spriteSmallIcon4.attr({
			x: scrollView.width * 0.075,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteSmallIcon4, 0);
		
		var labelAddress2 = new cc.LabelBMFont(g_post.sAddress, res.fntmasSulit24_fnt, 315, cc.TEXT_ALIGNMENT_LEFT);
		labelAddress2.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelAddress2.getContentSize().height * 1.5;
		labelAddress2.attr({
			x: scrollView.width * 0.45,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelAddress2, 0);

		var labelAddress1 = new cc.LabelBMFont('Address', res.fntmasSulit24_fnt);
		labelAddress1.setColor(cc.color(0, 0, 0));
		labelAddress1.attr({
			x: scrollView.width * 0.15,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelAddress1, 0);

		var spriteSmallIcon3 = new cc.Sprite(res.pngSmallIcon3_png);
		spriteSmallIcon3.attr({
			x: scrollView.width * 0.075,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteSmallIcon3, 0);
		
		var labelEmail2 = new cc.LabelBMFont(g_post.sEmail, res.fntmasSulit24_fnt, 315, cc.TEXT_ALIGNMENT_LEFT);
		labelEmail2.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelEmail2.getContentSize().height * 1.5;
		labelEmail2.attr({
			x: scrollView.width * 0.45,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelEmail2, 0);

		var labelEmail1 = new cc.LabelBMFont('Email', res.fntmasSulit24_fnt);
		labelEmail1.setColor(cc.color(0, 0, 0));
		labelEmail1.attr({
			x: scrollView.width * 0.15,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelEmail1, 0);

		var spriteSmallIcon2 = new cc.Sprite(res.pngSmallIcon2_png);
		spriteSmallIcon2.attr({
			x: scrollView.width * 0.075,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteSmallIcon2, 0);
		
		var labelMobile2 = new cc.LabelBMFont(g_post.sMobile, res.fntmasSulit24_fnt, 315, cc.TEXT_ALIGNMENT_LEFT);
		labelMobile2.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelMobile2.getContentSize().height * 1.5;
		labelMobile2.attr({
			x: scrollView.width * 0.45,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelMobile2, 0);

		var labelMobile1 = new cc.LabelBMFont('Mobile', res.fntmasSulit24_fnt);
		labelMobile1.setColor(cc.color(0, 0, 0));
		labelMobile1.attr({
			x: scrollView.width * 0.15,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelMobile1, 0);

		var spriteSmallIcon1 = new cc.Sprite(res.pngSmallIcon1_png);
		spriteSmallIcon1.attr({
			x: scrollView.width * 0.075,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteSmallIcon1, 0);
		
		var labelPhone2 = new cc.LabelBMFont(g_post.sPhone, res.fntmasSulit24_fnt, 315, cc.TEXT_ALIGNMENT_LEFT);
		labelPhone2.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelPhone2.getContentSize().height * 1.5;
		labelPhone2.attr({
			x: scrollView.width * 0.45,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelPhone2, 0);

		var labelPhone1 = new cc.LabelBMFont('Phone', res.fntmasSulit24_fnt);
		labelPhone1.setColor(cc.color(0, 0, 0));
		labelPhone1.attr({
			x: scrollView.width * 0.15,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelPhone1, 0);

		var spriteSmallIcon1 = new cc.Sprite(res.pngSmallIcon1_png);
		spriteSmallIcon1.attr({
			x: scrollView.width * 0.075,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1
		});
		scrollView.addChild(spriteSmallIcon1, 0);
		
		var labelServiceName = new cc.LabelBMFont(g_post.sName, res.fntmasSulit32_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelServiceName.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelServiceName.getContentSize().height * 1.5;
		labelServiceName.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1
		});
		scrollView.addChild(labelServiceName, 0);
		
		scrollView.setInnerContainerSize(cc.size(600, yLatestHeight + 5));

		//Footer Block
		this.spriteFooter = new cc.Sprite(res.pngFooter_png);
		this.spriteFooter.attr({
			x: size.width * 0.5,
			y: size.height * 0,
			anchorX: 0.5,
			anchorY: 0
		});
		this.addChild(this.spriteFooter, 0);

		this.buttonHome = new cc.MenuItemImage(
				res.pngHome1_png,
				res.pngHome2_png,
				res.pngHome2_png,
				function () {
					var nextScene = new HomeScene();
					cc.director.runScene(new cc.TransitionFade(1, nextScene, cc.color(255, 255, 255, 255)));
				}, this);
		this.buttonHome.attr({
			x: this.spriteFooter.getContentSize().width * 0.15,
			y: this.spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.buttonPostAnAd = new cc.MenuItemImage(
				res.pngPostAnAd1_png,
				res.pngPostAnAd2_png,
				res.pngPostAnAd2_png,
				function () {

				}, this);
		this.buttonPostAnAd.attr({
			x: this.spriteFooter.getContentSize().width * 0.375,
			y: this.spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.buttonMyPosts = new cc.MenuItemImage(
				res.pngMyPosts1_png,
				res.pngMyPosts2_png,
				res.pngMyPosts2_png,
				function () {

				}, this);
		this.buttonMyPosts.attr({
			x: this.spriteFooter.getContentSize().width * 0.625,
			y: this.spriteFooter.getContentSize().height * 0.5,
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
			x: this.spriteFooter.getContentSize().width * 0.85,
			y: this.spriteFooter.getContentSize().height * 0.5,
			anchorX: 0.5,
			anchorY: 0.5
		});

		this.menuFooter = new cc.Menu(this.buttonHome, this.buttonPostAnAd, this.buttonMyPosts, this.buttonSettings);
		this.menuFooter.attr({
			x: 0,
			y: 0
		});
		this.spriteFooter.addChild(this.menuFooter, 0);

		return true;
	}
});

var ViewScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new ViewLayer();
		this.addChild(layer);
	}
});