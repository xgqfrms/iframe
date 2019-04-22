/**设置页面title**/
function setTitle(title) {
    document.title = title;
    let userAgent = window.navigator.userAgent.toLowerCase();
    let isiOS = userAgent.indexOf("applewebkit") >= 0;
    if (!isiOS) {
        let iframe = document.createElement("iframe");
        iframe.src = "../img/logo-dd.png";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        iframe.onload = function() {
            setTimeout(function() {
                iframe.remove();
            }, 0);
        };
    }
}

/**判断空值**/
function isEmpty(source) {
    return (
        source == undefined ||
        source == null ||
        source == "" ||
        source == "--" ||
        source == -1.7976931348623157e308 ||
        source == -2147483648
    );
}
/**获取请求参数**/
function getParam(name) {
    var str = decodeURIComponent(window.location.search);
    var start = str.indexOf("?") + 1;
    if (start == 0) {
        return "";
    }
    var value = "";
    var queryString = str.substring(start);
    var paraNames = queryString.split("&");
    for (var i = 0; i < paraNames.length; i++) {
        var eindex = paraNames[i].indexOf("=");
        if (eindex > 0) {
            pname = paraNames[i].substring(0, eindex);
            pvalue = paraNames[i].substring(eindex + 1);
            if (name == pname) {
                return pvalue;
            }
        }
    }
    return value;
}
/**初始化底部按钮状态**/
function initBtnState(ele, flag) {
    var className = ele.attr("name");
    if (flag) {
        ele.addClass(className + "Active");
    } else {
        ele.removeClass(className + "Active");
    }
}
