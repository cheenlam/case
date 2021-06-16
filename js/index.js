// index.js code
var UserToken = null;
var GaType = null;
var LangJson = null;

$(document).ready(function () {

    // 輪撥圖
    var swiper = new Swiper('#bannerSwiper', {
        direction: 'horizontal',
        spaceBetween: 0,
        speed: 500,
        autoplay: {
            delay: 5000,
        },

    });

    //遊戲館左右滑動
    var swiperGame = new Swiper('#swiper-container-Game', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            transitionEnd: function (e) {
                var btnActive = $(".game-btn").siblings(".active");
                switch (e.activeIndex) {
                    case 0:
                        btnActive.removeClass("active");
                        $("#game-btn-slot").addClass("active")
                        break;
                    case 1:
                        btnActive.removeClass("active");
                        $("#game-btn-live").addClass("active")
                        break;
                    case 2:
                        btnActive.removeClass("active");
                        $("#game-btn-board").addClass("active")
                        break;
                }
            },
        },
    });

    // index game menu
    $(".game-btn").on("click", function () {
        var btnActive = $(".game-btn").siblings(".active");
        if ($(this).hasClass("btn-slot")) {
            //$(".game-container").removeClass("show");
            //$(".game-container.slot").addClass("show");
            btnActive.removeClass("active");
            $(this).addClass("active");
            swiperGame.slideTo(0, 1000, false);
        }
        if ($(this).hasClass("btn-live")) {
            //$(".game-container").removeClass("show");
            //$(".game-container.live").addClass("show");
            btnActive.removeClass("active");
            $(this).addClass("active");
            swiperGame.slideTo(1, 1000, false);
        }
        if ($(this).hasClass("btn-board")) {
            //$(".game-container").removeClass("show");
            //$(".game-container.board").addClass("show");
            btnActive.removeClass("active");
            $(this).addClass("active");
            swiperGame.slideTo(2, 1000, false)
        }

    });

    var param = $.UrlParam("gameindex");
    if (param != null) {
        switch (param) {
            case "0":
                swiperGame.slideTo(0, 1000, false);
                break;
            case "1":
                swiperGame.slideTo(1, 1000, false);
                break;
            case "2":
                swiperGame.slideTo(2, 1000, false);
                break;
        }
    }

    var lang = GetLanguage();

    if (lang != undefined) {
        $("#Culture").val(lang);
    }
    else {
        $("#Culture").val("en-us");
    }   

    //語系data
    var data1 = [
        {
            text: '簡体中文',
            value: 1
        },
        {
            text: '繁體中文',
            value: 2
        },
        {
            text: 'English',
            value: 3
        },
        {
            text: ' ภาษาไทย ',
            value: 4
        },
        {
            text: 'Việt Nam',
            value: 5
        },
        {
            text: 'မြန်မာ',
            value: 6
        },
        {
            text: '한국어',
            value: 7
        }
    ];

    var indexLang = GetLanguageIndex($("#Culture").val());
    var picker = new Picker({
        data: [data1],
        selectedIndex: [indexLang],
        title: ''
    });

    picker.on('picker.valuechange', function (selectedVal, selectedIndex) {

        switch (selectedVal.toString()) {
            case '1'://簡
                $("#Culture").val('zh-cn');
                break;
            case '2'://繁文
                $("#Culture").val('zh-tw');
                break;
            case '3'://英文
                $("#Culture").val('en-us');
                break;
            case '4'://泰文
                $("#Culture").val('th-th');
                break;
            case '5'://越南文
                $("#Culture").val('vi-vn');
                break;
            case '6'://緬文
                $("#Culture").val('my-mm');
                break;
            case '7'://韓文
                $("#Culture").val('ko-kr');
                break;
        }
        SetLanguage($("#Culture").val());
        languageBind();
        BulletinSelect(NewsSuccess, NewsError);
    });

    $("#langPicker").click(function () {
        picker.show();
    });
    
    UserToken = GetUserToken();

    $("#userInfo").html('');
    if (UserToken != null) {          
        $("#userInfo").append('<div class="user-id">' + UserToken.result.clubcname + '</div> <div class="user-wallet" > ' + toCurrency( UserToken.result.now_xinyong) + ' <i class= "iconfont ic-problem" ></i ></div >');
       
    }
    else {       
        $("#userInfo").append('<div class="user-id"><span id="Text3"> HI,會員請先登入</span></div>');
    }

    languageBind();

    //公告
    var News = BulletinSelect(NewsSuccess, NewsError);
});

function languageBind() {
    var culture = $("#Culture").val();
    var page = $("#PageName").val();
    var jsonpath = "../js/Language/" + culture + "/" + page + ".json";
    var son = $.getJSON(jsonpath, function (data) {
        LangJson = data;
        $("#Logout").text(data.Head.Logout);
        $("#Login").text(data.Head.Login);
        $("#btnLogout").text(data.Head.Logout);
        $("#AppDownload").text(data.Head.AppDownload);
        $("#Language").text(data.Head.Language);

        $("#SLOTGame").text(data.Head.SLOTGame);
        $("#LiveCasino").text(data.Head.LiveCasino);
        $("#BoardGame").text(data.Head.BoardGame);
        $("#Text1").text(data.Body.Text1);
        $("#Text3").text(data.Body.Text3);
        $("#TextMsg").text(data.Body.TextMsg);
        if (UserToken != null) {
            $("#NavLogout").text(data.Head.Logout);
            $("#LoginStatus").text(data.Head.Logout);
        }
        else {
            $("#NavLogout").text(data.Head.Login);
            $("#LoginStatus").text(data.Head.Login);
        }

        $("#btnMsgConfirm").text(data.Head.Confirm);
        $("#Service").text(data.Head.Service);
		$("#intro").text(data.NavSide.intro);
		$("#intro2").text(data.NavSide.intro2);
		$("#about").text(data.NavSide.about);
		$("#help").text(data.NavSide.help);
		$("#rule").text(data.NavSide.rule);
		$("#privacy").text(data.NavSide.privacy);

		$("#Home").text(data.Foot.Home);
		$("#Address").text(data.Foot.Address);
		$("#Report").text(data.Foot.Report);
		$("#Contact").text(data.Foot.Contact);
		$("#My").text(data.Foot.My);
    });

    $("#divLogo").attr("style", "background-image: url(../images/" + $("#Culture").val() + "/logo.png);");
    $("#navside-logo").attr("style", "background-image: url(../images/" + $("#Culture").val() + "/logo.png);");
    $("#imgSlot-01").attr("src", "../images/" + $("#Culture").val() + "/slot-01.png");
    $("#imgSlot-02").attr("src", "../images/" + $("#Culture").val() + "/slot-02.png");
    $("#imgSlot-03").attr("src", "../images/" + $("#Culture").val() + "/slot-03.png");
    $("#imgLive-01").attr("src", "../images/" + $("#Culture").val() + "/live-01.png");
    $("#imgLive-02").attr("src", "../images/" + $("#Culture").val() + "/live-02.png");
    $("#imgLive-04").attr("src", "../images/" + $("#Culture").val() + "/live-04.png");
    $("#imgBoard-01").attr("src", "../images/" + $("#Culture").val() + "/board-01.png");
    $("#imgModal-app").attr("src", "../images/" + $("#Culture").val() + "/modal-app.png");
}




function NewsSuccess(data) {
    if (data.status == "1") {
        var culture = $("#Culture").val();
        switch (culture) {
            case "zh-tw":
                $("#News").text(data.result[0].message_Big5);
                break;
            case "zh-cn":
                $("#News").text(data.result[0].message_Gb);
                break;
            case "en-us":
                $("#News").text(data.result[0].message_En);
                break;
            case "th-th":
                $("#News").text(data.result[0].message_Tg);
                break;
            case "my-mm":
                $("#News").text(data.result[0].message_MY);
                break;
            case "vi-vn":
                $("#News").text(data.result[0].message_VND);
                break;
            case "ko-kr":
                $("#News").text(data.result[0].message_Krw);
                break;
        }
    }
}

function NewsError(data) {
    $("#TextMsg").text("NewsError: status " + data.status);
    $("#MsgModal").show();
}

function GetInGameUrl(gtype) {
    GaType = gtype;
    if (UserToken == null) {
        $("#MsgModal").show();
    }
    else {
        var gameStatus = GetGameStatus(GaType, GetGameStatusSuccess, GetGameStatusError);        
    }
}


function GetGameStatusSuccess(data) {
    var startflag = "1";
    switch (GaType) {
        case "slot": //皇電
            startflag = data.result[0].royalgame_Startflag;
            break;
        case "gclub": //Gclub電子遊戲館
            startflag = data.result[0].gclubgame_Startflag;
            break;
        case "jdbslot"://jdb
            startflag = data.result[0].jdbgame_startflag;
            break;   
        case "live":
        case "live_green"://經典、旗艦
        case "bcbacc": //區塊鏈百家
        case "rgracing":
            startflag = data.result[0].livegame_startflag;
            break;     
        case "rtgslot": //棋牌
            startflag = data.result[0].rtggame_startflag
            break;
     
    }

    if (startflag == 1) {
        var game = UserGameUrl(GaType, GetInGameUrlSuccess, GetInGameUrlError);
    } else {
        $("#TextMsg").text(LangJson.Body.TextGameNoOpen);
        $("#MsgModal").show();

    }
}

function GetGameStatusError(data) {
    //alert("GameStatusError:" + data.responseText);
    $("#TextMsg").text("GameUrlError:" + data.responseText);
    $("#MsgModal").show();
}

function GetInGameUrlSuccess(data) {
    if (data.status == "1") {
        console.log(data.result[0]);
        $(location).attr('href', data.result);
    }
    else if (data.status == "-2") {
        //token 失效 ，直接登出
        UserLogout();
    }
    else {
        $("#TextMsg").text("GameUrlMsg: status[" + data.status+"]  desc[" + data.desc+"]");
        $("#MsgModal").show();
        $("#btnMsgConfirm").on("click", function () {
            MagConifrm(data.status);
        });
    }
}

function GetInGameUrlError(data) {    
    $("#TextMsg").text("GameUrlError:" + data.responseText);
    $("#MsgModal").show();
    $("#btnMsgConfirm").on("click", function () {
        MagConifrm(data.responseJSON.status);
    });
}

//導到下載 AndroidApp 的url
function AndroidApp() {
    OpenNewWeb( 'https://ts.bacctest.com/WhichStore.html?L=zh-tw');
}

//導到下載 IOSApp 的url
function IOSApp() {
    OpenNewWeb('https://ts.bacctest.com/WhichStore.html?L=zh-tw');
}


