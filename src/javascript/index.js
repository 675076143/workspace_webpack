var themeMarketDetail = $(".themeMarketDetail");
var closeQRCode = $(".closeQRCode");
var QRCode = $(".QRCode");
var themeMarket = $(".themeMarket");
var themeMarketNav = $(".themeMarket ul");
var themeMarketDetail = $(".themeMarketDetail");
var locatePosition = $(".locatePosition");
var rightPanel = $(".rightPanel");
var topLi = $(".top li");

$(document).ready(function(){
	self_adaption();
	$(window).resize(function(){
		self_adaption();
	});
	closeQRCode.click(function(){
		this.remove();
		QRCode.remove();
	})
	themeMarketNav.hover(function(){
		themeMarketDetail.show();
		//themeMarketDetail.css("opacity","1");
	},function(){
		themeMarketDetail.hide();
		//themeMarketDetail.css("opacity","0");
	})
	themeMarketDetail.hover(function(){
		themeMarketDetail.show();
	},function(){
		themeMarketDetail.hide();
	});
})

function self_adaption(){
	themeMarketDetail.css("left",themeMarket.position().left+themeMarket.width());
	themeMarketDetail.css("top",themeMarket.position().top);
	locatePosition.css("left",rightPanel.position().left+1000)
}