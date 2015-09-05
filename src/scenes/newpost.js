var NewPostLayer = cc.Layer.extend({
	layerBackground:null,
	layerHeader:null,
	layerFooter:null,
	layerCover:null,
	selectedField:null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		this.layerBackground = new cc.LayerColor(cc.color(235,235,235,255), size.width, size.height);
		this.addChild(this.layerBackground, 0);

		this.layerHeader = new HeaderLayer();
		this.addChild(this.layerHeader, 0);
		
		this.layerFooter = new FooterLayer();
		this.layerFooter.setTogglePostAnAd(false);
		this.addChild(this.layerFooter, 0);
		
		var textEntry = new cc.EditBox(cc.size(600, 70), new cc.Scale9Sprite(res.pngOneBox_png));
		textEntry.attr({
			x: size.width * 0.5,
			y: size.height * 0.825,
			anchorX: 0.5,
			anchorY: 0.5
		});
		textEntry.setPlaceholderFontSize(24);
		textEntry.setPlaceHolder('masSULIT your #1 services classifieds');
		textEntry.setFontSize(24);
		textEntry.setFontColor(cc.color(0, 0, 0));
		//textEntry.setMaxLength(50);
		textEntry.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
		textEntry.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
		textEntry.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE);
		textEntry.setDelegate(this);
		textEntry.setReturnType(1);
		textEntry.setEnabled(false);
		this.addChild(textEntry, 0);

		var scrollView = new ccui.ScrollView();
		scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
		scrollView.setTouchEnabled(true);
		scrollView.setBounceEnabled(false);
		scrollView.setBackGroundImage(res.pngNewBox_png);
		scrollView.setContentSize(cc.size(600, 560));
		scrollView.setInnerContainerSize(cc.size(600, 600));
		scrollView.setAnchorPoint(cc.p(0.5, 0.5));
		scrollView.setPosition(cc.p(size.width * 0.5, size.height * 0.485));
		this.addChild(scrollView);

		//Scroll Block
		var aScrollViewObjects = [];
		
		var yLatestHeight = 5;

		var labelPostAd = new cc.LabelBMFont("Post My Ad >", res.fntmasSulit32_fnt);
		labelPostAd.setColor(cc.color(25, 110, 240));
		var buttonPostAd = new cc.MenuItemLabel(
				labelPostAd,
				function () {
					
				}, this);
		yLatestHeight = yLatestHeight + buttonPostAd.height;
		buttonPostAd.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 1
		});
		var menuPostAd = new cc.Menu(buttonPostAd);
		menuPostAd.attr({
			x: 0,
			y: 0
		});
		scrollView.addChild(menuPostAd, 0);
		aScrollViewObjects.push(buttonPostAd);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 2
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var spritePhoto = new cc.Sprite(res.pngNoPhoto_png);
		yLatestHeight = yLatestHeight + spritePhoto.getContentSize().height;
		spritePhoto.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 3
		});
		scrollView.addChild(spritePhoto, 0);
		aScrollViewObjects.push(spritePhoto);
		
		var labelHeader = new cc.LabelBMFont('Photos', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 4
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Upload", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditPhoto = new cc.MenuItemLabel(
				labelEdit,
				function () {

				}, this);
		buttonEditPhoto.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 5
		});
		aScrollViewObjects.push(buttonEditPhoto);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 6
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelDescription = new cc.LabelBMFont('Edit your own description here', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelDescription.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelDescription.getContentSize().height;
		labelDescription.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 7
		});
		scrollView.addChild(labelDescription, 0);
		aScrollViewObjects.push(labelDescription);

		var labelHeader = new cc.LabelBMFont('Description', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 8
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditDescription = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.selectedField = 7;
					textEntry.setText(labelDescription.getString());
				}, this);
		buttonEditDescription.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 9
		});
		aScrollViewObjects.push(buttonEditDescription);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 10
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelFBPage = new cc.LabelBMFont('www.facebook.com/massulit', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelFBPage.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelFBPage.getContentSize().height;
		labelFBPage.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 11
		});
		scrollView.addChild(labelFBPage, 0);
		aScrollViewObjects.push(labelFBPage);

		var labelHeader = new cc.LabelBMFont('Facebook Page', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 12
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditFBPage = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.selectedField = 11;
					textEntry.setText(labelFBPage.getString());
				}, this);
		buttonEditFBPage.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 13
		});
		aScrollViewObjects.push(buttonEditFBPage);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 14
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelWorkHours = new cc.LabelBMFont('Mon - Fri 8:00 AM - 6:00 PM', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelWorkHours.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelWorkHours.getContentSize().height;
		labelWorkHours.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 15
		});
		scrollView.addChild(labelWorkHours, 0);
		aScrollViewObjects.push(labelWorkHours);

		var labelHeader = new cc.LabelBMFont('Working Hours', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 16
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditWorkHours = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.selectedField = 15;
					textEntry.setText(labelWorkHours.getString());
				}, this);
		buttonEditWorkHours.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 17
		});
		aScrollViewObjects.push(buttonEditWorkHours);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 18
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelContactPerson = new cc.LabelBMFont('Mr. Juan dela Cruz', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelContactPerson.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelContactPerson.getContentSize().height;
		labelContactPerson.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 19
		});
		scrollView.addChild(labelContactPerson, 0);
		aScrollViewObjects.push(labelContactPerson);

		var labelHeader = new cc.LabelBMFont('Contact Person', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 20
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditContactPerson = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.selectedField = 19;
					textEntry.setText(labelContactPerson.getString());
				}, this);
		buttonEditContactPerson.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 21
		});
		aScrollViewObjects.push(buttonEditContactPerson);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 22
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelAddress = new cc.LabelBMFont('[Unit Number], [Street Number] [Street Name] [Barangay Name], [City] [Postal Code] [Region] [Country]', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelAddress.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelAddress.getContentSize().height;
		labelAddress.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 23
		});
		scrollView.addChild(labelAddress, 0);
		aScrollViewObjects.push(labelAddress);

		var labelHeader = new cc.LabelBMFont('Address', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 24
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditAddress = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.selectedField = 23;
					textEntry.setText(labelAddress.getString());
				}, this);
		buttonEditAddress.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 25
		});
		aScrollViewObjects.push(buttonEditAddress);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 26
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelEmail = new cc.LabelBMFont('massulit@marasigames.com', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelEmail.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelEmail.getContentSize().height;
		labelEmail.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 27
		});
		scrollView.addChild(labelEmail, 0);
		aScrollViewObjects.push(labelEmail);

		var labelHeader = new cc.LabelBMFont('Email', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 27
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditEmail = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.selectedField = 27;
					textEntry.setText(labelEmail.getString());
				}, this);
		buttonEditEmail.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 29
		});
		aScrollViewObjects.push(buttonEditEmail);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 30
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelMobile = new cc.LabelBMFont('+63 123 4567890', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelMobile.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelMobile.getContentSize().height;
		labelMobile.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 31
		});
		scrollView.addChild(labelMobile, 0);
		aScrollViewObjects.push(labelMobile);

		var labelHeader = new cc.LabelBMFont('Mobile', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 32
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditMobile = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.selectedField = 31;
					textEntry.setText(labelMobile.getString());
				}, this);
		buttonEditMobile.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 33
		});
		aScrollViewObjects.push(buttonEditMobile);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 34
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelPhone = new cc.LabelBMFont('(02)123-4567', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelPhone.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelPhone.getContentSize().height;
		labelPhone.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 35
		});
		scrollView.addChild(labelPhone, 0);
		aScrollViewObjects.push(labelPhone);

		var labelHeader = new cc.LabelBMFont('Phone', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 36
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditPhone = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.selectedField = 35;
					textEntry.setText(labelPhone.getString());
				}, this);
		buttonEditPhone.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 37
		});
		aScrollViewObjects.push(buttonEditPhone);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 38
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelLocation = new cc.LabelBMFont('Select your service location', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelLocation.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelLocation.getContentSize().height;
		labelLocation.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 39
		});
		scrollView.addChild(labelLocation, 0);
		aScrollViewObjects.push(labelLocation);

		var labelHeader = new cc.LabelBMFont('Location', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 40
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditLocation = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.layerCover = new SelecterLayer("Select Location", g_locations, labelLocation);
					this.addChild(this.layerCover, 100);
				}, this);
		buttonEditLocation.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 41
		});
		aScrollViewObjects.push(buttonEditLocation);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 42
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelSubcategory = new cc.LabelBMFont('Select your service subcategory', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelSubcategory.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelSubcategory.getContentSize().height;
		labelSubcategory.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 43
		});
		scrollView.addChild(labelSubcategory, 0);
		aScrollViewObjects.push(labelSubcategory);

		var labelHeader = new cc.LabelBMFont('Subcategory', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 44
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditSubcategory = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.parseLoadSubcategories(labelSubcategory, labelCategory.getString());
				}, this);
		buttonEditSubcategory.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 45
		});
		aScrollViewObjects.push(buttonEditSubcategory);

		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 46
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelCategory = new cc.LabelBMFont('Select your service category', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelCategory.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelCategory.getContentSize().height;
		labelCategory.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 47
		});
		scrollView.addChild(labelCategory, 0);
		aScrollViewObjects.push(labelCategory);
		
		var labelHeader = new cc.LabelBMFont('Category', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 48
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);
		
		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditCategory = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.parseLoadCategories(labelCategory);
				}, this);
		buttonEditCategory.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 49
		});
		aScrollViewObjects.push(buttonEditCategory);
		
		var spriteDiv = new cc.Sprite(res.pngViewDivider_png);
		yLatestHeight = yLatestHeight + spriteDiv.getContentSize().height;
		spriteDiv.attr({
			x: scrollView.width * 0.5,
			y: yLatestHeight,
			anchorX: 0.5,
			anchorY: 1,
			tag: 50
		});
		scrollView.addChild(spriteDiv, 0);
		aScrollViewObjects.push(spriteDiv);
		
		var labelServiceName = new cc.LabelBMFont('masSULIT your #1 services classifieds', res.fntmasSulit24_fnt, 540, cc.TEXT_ALIGNMENT_LEFT);
		labelServiceName.setColor(cc.color(128, 128, 128));
		yLatestHeight = yLatestHeight + labelServiceName.getContentSize().height;
		labelServiceName.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 51
		});
		scrollView.addChild(labelServiceName, 0);
		aScrollViewObjects.push(labelServiceName);

		var labelHeader = new cc.LabelBMFont('Business Name / Service Name', res.fntmasSulit32_fnt);
		labelHeader.setColor(cc.color(0, 0, 0));
		yLatestHeight = yLatestHeight + labelHeader.getContentSize().height;
		labelHeader.attr({
			x: scrollView.width * 0.05,
			y: yLatestHeight,
			anchorX: 0,
			anchorY: 1,
			tag: 52
		});
		scrollView.addChild(labelHeader, 0);
		aScrollViewObjects.push(labelHeader);

		var labelEdit = new cc.LabelBMFont("Edit", res.fntmasSulit24_fnt);
		labelEdit.setColor(cc.color(25, 110, 240));
		var buttonEditServiceName = new cc.MenuItemLabel(
				labelEdit,
				function () {
					this.selectedField = 51;
					textEntry.setText(labelServiceName.getString());
				}, this);
		buttonEditServiceName.attr({
			x: labelHeader.getPositionX() + labelHeader.getContentSize().width + 10,
			y: labelHeader.getPositionY(),
			anchorX: 0,
			anchorY: 1,
			tag: 53
		});
		aScrollViewObjects.push(buttonEditServiceName);
		
		var menuEdits = new cc.Menu(buttonEditPhoto, buttonEditDescription, buttonEditFBPage, buttonEditWorkHours, buttonEditContactPerson, buttonEditAddress, buttonEditEmail, buttonEditMobile, buttonEditPhone, buttonEditLocation, buttonEditSubcategory, buttonEditCategory, buttonEditServiceName);
		menuEdits.attr({
			x: 0,
			y: 0
		});
		scrollView.addChild(menuEdits, 0);
		
		scrollView.setInnerContainerSize(cc.size(600, yLatestHeight + 5));
		
		this.selectedField = 51;
		
		var aDivs = [2,6,10,14,18,22,26,30,34,38,42,46,50];
		var aChangeables = [7,11,15,19,23,27,31,35,39,43,47,51];
		var aLabels = [4,8,12,16,20,24,28,32,36,40,44,48,52];
		var aEdits = [5,9,13,17,21,25,29,33,37,41,45,49,53];
		
		var actTimer = new cc.Sequence(new cc.DelayTime(0.25),new cc.CallFunc(function () {
			var labelField = scrollView.getChildByTag(this.selectedField);
			labelField.setString(textEntry.getText());
			
			//auto correct spacing
			yLatestHeight = 5;
			for (var x = 0; x < aScrollViewObjects.length; x++) {
				var svObject = aScrollViewObjects[x];
				if (aDivs.indexOf(svObject.getTag()) != -1) {
					yLatestHeight = yLatestHeight + svObject.getContentSize().height;
					svObject.attr({
						x: scrollView.width * 0.5,
						y: yLatestHeight
					});
				}
				if (aLabels.indexOf(svObject.getTag()) != -1) {
					yLatestHeight = yLatestHeight + svObject.getContentSize().height;
					svObject.attr({
						x: scrollView.width * 0.05,
						y: yLatestHeight
					});
				}
				if (aEdits.indexOf(svObject.getTag()) != -1) {
					var svLabel = aScrollViewObjects[x-1];
					svObject.attr({
						x: svLabel.getPositionX() + svLabel.getContentSize().width + 10,
						y: svLabel.getPositionY()
					});
				}
				if (aChangeables.indexOf(svObject.getTag()) != -1) {
					yLatestHeight = yLatestHeight + svObject.getContentSize().height;
					svObject.attr({
						x: scrollView.width * 0.05,
						y: yLatestHeight
					});
				}
				if (svObject.getTag() == 1 || svObject.getTag() == 3) {
					yLatestHeight = yLatestHeight + svObject.getContentSize().height;
					svObject.attr({
						x: scrollView.width * 0.5,
						y: yLatestHeight
					});
				}
			}
			
			scrollView.setInnerContainerSize(cc.size(600, yLatestHeight + 5));
		}, this)).repeatForever();
		scrollView.runAction(actTimer);

		return true;
	},

	parseLoadCategories:function (objReceiver) {
		this.layerCover = new LoaderLayer();
		this.addChild(this.layerCover, 100);
		
		var that = this;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", g_config.parseConfig1 + "getCategories", true);
		xhr.setRequestHeader(g_config.parseConfig2, g_config.parseConfig3);
		xhr.setRequestHeader(g_config.parseConfig4, g_config.parseConfig5);
		//xhr.setRequestHeader(g_config.parseConfig6, sessionToken);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
				var jResponse = JSON.parse(xhr.responseText);
				var actWait = new cc.Sequence(new cc.DelayTime(1),
						new cc.CallFunc(function () {
							that.layerCover.removeFromParent();
							that.layerCover = new SelecterLayer("Select Category", jResponse.result, objReceiver);
							that.addChild(that.layerCover, 100);
						}, this));
				that.layerCover.runAction(actWait);
			} else if (xhr.readyState == 4 && xhr.status == 400) {
				that.layerCover.removeFromParent();
				that.layerCover = new AlerterLayer("masSULIT", "Unable to load data from server.");
				that.addChild(that.layerCover, 100);
			}
		};
		xhr.send('{}');
	},

	parseLoadSubcategories:function (objReceiver, sCategory) {
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
				var actWait = new cc.Sequence(new cc.DelayTime(1),
						new cc.CallFunc(function () {
							that.layerCover.removeFromParent();
							that.layerCover = new SelecterLayer("Select Category", jResponse.result, objReceiver);
							that.addChild(that.layerCover, 100);
						}, this));
				that.layerCover.runAction(actWait);
			} else if (xhr.readyState == 4 && xhr.status == 400) {
				that.layerCover.removeFromParent();
				that.layerCover = new AlerterLayer("masSULIT", "Unable to load data from server.");
				that.addChild(that.layerCover, 100);
			}
		};
		xhr.send('{"sCategory":"' + sCategory + '"}');
	}
});

var NewPostScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new NewPostLayer();
		this.addChild(layer);
	}
});