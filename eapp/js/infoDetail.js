$('document').ready(function(){
	var comData = {};
	var tagArr = [];//标签列表
	var markUserArr = [];//标记人物头像
	var modelUserArr=[];
	var Mark,CollectMark,PraiseMark;
	var MarkUser;
	var linkUrl;
	var clickSignFlag = false;
	var clickCollectFlag = false;
	sessionStorage.setItem('clickFlag',false);
	/**请求资讯正文数据**/
   var init_lodding = $(document).dialog({
	    type : 'toast',
	    infoIcon: './dialog/images/icon/loading.gif',
	    dialogClass:"loaddingClass",
   });
	$.get("/isv/duck/info/content",{
		"id":getParam("id"),
		"token":getParam("Token")
	},function(data){
        setTimeout(() => {
            init_lodding.close();
        },1500);

		var data = data.Result ? data.Result : null;
		var TagInfo = data.TagInfo;
		var Topic = data.Topic;
		var PraiseNum = (data.PraiseNum || data.PraiseNum == 0) ? data.PraiseNum : 0;
		MarkUser =data.MarkUser;
		Mark = data.Mark;
		CollectMark = data.CollectMark;
		PraiseMark = data.PraiseMark;
		document.getElementById("iframes").src=data.Url;
		document.title=data.Title;
		setTitle(data.Title);
		linkUrl = data.Url;
//		sessionStorage.setItem("MarkUser",JSON.stringify(MarkUser));
		/**标签列表**/
	    if(!isEmpty(TagInfo)){
	        $.each(TagInfo,function(i,item){
	        	tagArr.push('<li>'+item.TagName+'</li>');
	        });
	        $(".tagCon").show().append(tagArr.join(''));
	    }else{
	        $(".tagCon").hide();
	    }
		/**人物专题or企业专题卡片**/
	    if(!isEmpty(Topic)){
	    	comData = Topic;
	    	if(Topic.Type === 5){
	        	$('.comNameBox').addClass('personName');
	        	$('.comCard').css({'top':'9px'});
	        }else{
	        	$('.comNameBox').removeClass('personName');
	        	$('.comCard').css({'top':'0px'})
	        }
	    	var PicAddress = Topic.PicAddress ? Topic.PicAddress : (Topic.Type == 1 ? "./img/icon-default-company.png" : "./img/icon-default-personage.png");
	        var Name = Topic.Name ? Topic.Name : "-";
	        Name = Name.length >11? Name.substring(0,11) +'…' : Name;
	        $(".comCardBox").show();
	        $(".comImg").attr('src',PicAddress);
	        $(".comName").html(Name);

	    }else{
	        $(".comCardBox").hide();
	    }

	    /**获取标记人物头像**/
	    if(!isEmpty(MarkUser)){
    	    var len = MarkUser.length;
        	if(MarkUser.length > 5){
        		len= 4
        	}
            $.each(MarkUser,function(i,item){
                if(item.PicAddress){
                    if(i<len){
                         markUserArr.push('<li id="'+item.UnionID+'" style="background:url('+item.PicAddress+') no-repeat center center;background-size:100% 100%"></li>');
                    }else{
                    	 markUserArr.push('<li id="'+item.UnionID+'" style="display:none;background:url('+item.PicAddress+') no-repeat center center;background-size:100% 100%"></li>');
                    }
                    modelUserArr.push('<li name="'+item.UnionID+'" style="list-style:none;"><img style="width:48px;height:48px;border-radius:50%" src="'+item.PicAddress+'" alt=""></li>');
                }else{
                    if(i<len){
                        markUserArr.push('<li id="'+item.UnionID+'" class="noImage">'+item.Name.substr(-2)+'</li>');
                    }else{
                    	markUserArr.push('<li style="display:none" id="'+item.UnionID+'" class="noImage">'+item.Name.substr(-2)+'</li>');
                    }
                    modelUserArr.push('<li name="'+item.UnionID+'" class="modelNoImg" style="list-style:none">'+item.Name.substr(-2)+'</li>');
                }
            });
            if(MarkUser.length>5){
            	 markUserArr.push('<li class="lastMore"></li>');
            }else{
            	markUserArr.push('<li style="display:none" class="lastMore"></li>');
            }
            $(".markImg ul").html(markUserArr.join(''));
            $(".markImgModel ul").html(modelUserArr.join(""));
        }

	    /**初始化底部按钮状态**/
	    initBtnState($(".sign"),Mark);
	    initBtnState($(".collect"),CollectMark);
	    initBtnState($(".praise"),PraiseMark);
	    $(".praise").html(PraiseNum);

	     /**新手引导页面**/
	    //没有公司卡片时，显示 step1 和step2   反之，显示step1 、step2、step3
	    var isVisitedPage = localStorage.getItem("isVisited");

        $(".skip").click(function(){
			$('.mask').hide();
			$(".iframBox").show();
		    localStorage.setItem("isVisited", true);
		});

	    if(!isVisitedPage){
	    	$('.mask').show();
	    	$('.step1').show();
			if(Topic&&Topic.Type == 5){
	            $("#companyorperson").html("快来探一探你感兴趣的人物");
	         }
			$(".iframBox").hide();
	    	if(isEmpty(Topic)){
		    	$('.step1').click(function () {
		            $(this).hide();
		            $('.step2').show();
		        });
		        $('.step2 .known').show().click(function(){
	            	$('.mask').hide();
					$(".iframBox").show();
	            });
		    }else{
		    	$('.step1').click(function () {
		            $(this).hide();
		            $('.step2').show();
		            $('.step2 .known').hide();

		        });
		        $('.step2').click(function(){
		        	$(this).hide();
		        	$('.step3').show();
		            $('.step3 .known').show();
		        })
		        $('.step3 .known').click(function(){
		        	$('.mask').hide();
					$(".iframBox").show();
		        })
		    }

		    $('.praise').click(function (){
		    	var isShareShown = localStorage.getItem("isShareShown");
		     	if(!isShareShown){
			    	$('.mask').show();
		            $('.step').hide();
		            $('.step4').show();
		            $(".iframBox").hide();
		            $('.step4 .known').show().click(function(){
		            	$('.mask').hide();
						$(".iframBox").show();
						localStorage.setItem("isShareShown", true);
		            });
		            $(".skip").click(function(){
						$('.mask').hide();
						$(".iframBox").show();
					    localStorage.setItem("isShareShown", true);
					});
	           }
		    });
		    /**初次加载页面设置**/
			localStorage.setItem("isVisited", true);
	    }

	});
    /**标签卡片显示和隐藏*/
	$('.arrow_up').click(function(){
    	$('.tagBoxWrap').animate({bottom:'-20px'})
    	$(this).hide();
    	$('.arrow_down').show();
    	setTimeout(()=>{
	    	$('.tagBox').css({
			  "paddingTop":"45px",
			  "height":"106px"
			});
    	},200)
    });
	$('.arrow_down').click(function(){
    	$('.tagBoxWrap').animate({bottom:'52px'});
    	$('.tagBox').css({
		  "height":"96px",
		  "paddingTop":"25px"
		});
    	$(this).hide();
    	$('.arrow_up').show()
   });
    /**人物专题or企业专题卡片跳转**/
	 $(".comCard").click(function(){
	    if(comData.Type==1){
	        dd.navigateTo({url: '/page/special/company/index?CorpID='+comData.Id});
	    }else{
	        dd.navigateTo({url: '/page/special/personage/index?fid='+comData.Id});
	    }
	});
	/**底部操作栏 标记|收藏|点赞|转发**/
	$('.sign').click(function(){
		if(clickSignFlag)return
		clickSignFlag = true;
		var activeFlag = $(this).hasClass("signActive") ? true : false;
		dd.postMessage({clickType:'sign',enter:!activeFlag});
		requestClick($(this),'/isv/duck/info/mark',activeFlag,'标记');
	}) ;
	$('.collect').click(function(){
		if(clickCollectFlag)return
		clickCollectFlag = true;
		var activeFlag = $(this).hasClass("collectActive") ? true : false;
		dd.postMessage({clickType:'collect',enter:!activeFlag});
		requestClick($(this),'/isv/duck/info/collect',activeFlag,'收藏');
	})
	$('.praise').click(function(){
		var clickFlag = JSON.parse(sessionStorage.getItem('clickFlag'));
		if(clickFlag)return
		sessionStorage.setItem('clickFlag',true)
		var activeFlag = $(this).hasClass("praiseActive") ? true : false;
		dd.postMessage({clickType:'praise',enter:!activeFlag});
		requestClick($(this),'/isv/duck/info/praise',activeFlag,'点赞');
	})

	/**底部操作栏 标记|收藏|点赞|转发**/
	function requestClick(ele,url,activeFlag,typeName){
		var className =  ele.attr("name");
	//	var MarkUserSession = JSON.parse(sessionStorage.getItem('MarkUser'));
	//	var MarkUserLen = MarkUserSession.length;
		$.get("/isv/duck/user/baseinfo",{"token":getParam("Token")},function(resInfo){
	    	var baseInfo = resInfo.Result ? resInfo.Result : {};
	        if(activeFlag){
	        	/**取消标记**/
	            $.get(url,{"id":getParam("id"),"type":2,"token":getParam("Token")},function(res){
	                 if(res.Code=="200"){
	                 	activeFlag = false;
			    		ele.removeClass(className + "Active");
	                 	if(typeName == "点赞"){
	                 		var num = $('.praise').text();
	                 		num--;
	                 		$('.praise').text(num);
	                 		sessionStorage.setItem('clickFlag',false);
	                 	}else{
	                 		$(document).dialog({
		                        type : 'toast',
		                        infoIcon: './dialog/images/icon/success.png',
		                        infoText: '取消'+typeName+'成功',
		                        autoClose: 1000
		                   });
		                    if(typeName == "收藏"){
		                    	clickCollectFlag = false;
		                    }
			    			if(typeName == "标记"){
	                            var P_ul = $('.markImg ul')[0];
	                            var PModel_ul = $('.markImgModel ul')[0];
								var markImgChild = document.getElementById(baseInfo.UnionID);
								var markImgModelChild = document.getElementsByName(baseInfo.UnionID)[0];
								P_ul.removeChild(markImgChild);
			    				PModel_ul.removeChild(markImgModelChild);
			    				if($('.markImg ul li').length == 6){
									$(".markImg ul li").show();
									$(".markImg ul .lastMore").hide();
			    				}else if($('.markImg ul li').length > 6){
			    					$(".markImg ul .lastMore").show();
									$(".markImg ul li").eq(3).show();
			    				}else{
			    					$(".markImg ul .lastMore").hide();
			    				}
								clickSignFlag = false;
			    			}
	                 	}

	                }else{
	                	sessionStorage.setItem('clickFlag',false);
	                	clickCollectFlag = false;
	                	clickSignFlag = false;
	                	$(document).dialog({
	                        type : 'toast',
	                        infoIcon: './dialog/images/icon/fail.png',
	                        infoText: '取消'+typeName+'失败',
	                        autoClose: 1000
	                    });
	                }
	            });
	        }else{
	        	/**标记**/
	            $.get(url,{"id":getParam("id"),"type":1,"token":getParam("Token")},function(res){
	                if(res.Code=="200"){
	                	activeFlag = true;
		        	    ele.addClass(className + "Active");
	                	if(typeName == "点赞"){
	                 		var num = $('.praise').text();
	                 		num++;
	                 		$('.praise').text(num);
	                 		sessionStorage.setItem('clickFlag',false);
	                 	}else{
		                 	$(document).dialog({
		                        type : 'toast',
		                        infoIcon: './dialog/images/icon/success.png',
		                        infoText: typeName + '成功',
		                        autoClose: 1000
		                   });
		                   if(typeName == "收藏"){
		                   		clickCollectFlag = false;
		                    }
		        	        if(typeName == "标记"){
	//	        	        	MarkUserSession.unshift(baseInfo);
	//	        	        	sessionStorage.setItem("MarkUser",JSON.stringify(MarkUserSession));
	        	        		if(!baseInfo.PicAddress){
		                            $(".markImg ul").prepend('<li id="'+baseInfo.UnionID+'" class="noImage">'+baseInfo.Name+'</li>');
		                            $(".markImgModel ul").prepend('<li name="'+baseInfo.UnionID+'" class="modelNoImg" style="list-style:none;width:48px;height:48px;margin-right:13px;text-align:center;line-height:54px">'+baseInfo.Name.substr(-2)+'</li>');
		                        }else{
		                            $(".markImg ul").prepend('<li id="'+baseInfo.UnionID+'" style="background:url('+baseInfo.PicAddress+') no-repeat center center;background-size:100% 100%"></li>');
		                            $(".markImgModel ul").prepend('<li name="'+baseInfo.UnionID+'" style="list-style:none;margin-right:13px;"><img style="width:48px;height:48px;border-radius:50%;" src="'+baseInfo.PicAddress+'" alt=""></li>');
		                        }
		                        if($(".markImg ul li").length > 6){
		                        	$(".markImg ul li").eq(3).nextAll().hide();
		                        	$(".markImg ul .lastMore").show();
		                        }else if($(".markImg ul li").length < 6){
	 								$(".markImg ul").find("li").show();
		                        	$(".markImg ul .lastMore").hide();
		                        }
		                        clickSignFlag = false;
			    			}
	                 	}
	                }else{
	                	sessionStorage.setItem('clickFlag',false);
						clickCollectFlag = false;
	                	clickSignFlag = false;
	                	$(document).dialog({
	                        type : 'toast',
	                        infoIcon: './dialog/images/icon/fail.png',
	                        infoText: typeName + '失败',
	                        autoClose: 1000
	                    });
	                }
	            });
	        }
	    })
	}

 	/**点击头像弹出框**/
     $('.markImg').click(function(){
     	 dd.postMessage({clickType:'sign-people'});
     	 Dialog.init("<div class='modelImgBox'>"+$(".markImgModel ul").html()+"</div>",{
	        title : '标记人物',
	    });
     })
 	/**点击文本框复制其内容到剪贴板**/
	$('.transmit').click(function(){
		dd.postMessage({linkUrl:linkUrl,clickType:'transmit'});
	})
});
