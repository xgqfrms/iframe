// UA 检测工具
class UAChecker {
    constructor(ua = "") {
        if(ua !== "") {
            this.ua = ua.toLocaleLowerCase();
        } else {
            this.ua = navigator.userAgent.toLocaleLowerCase();
        }
        this.os = "unknow";
        this.osVersion = "unknow";
        this.platform = "unknow";
        this.engine = "unknow";
        this.browser = "unknow";
        this.browserVersion = "unknow";
        this.init();
    }
    static regexTester(regex, ua) {
        return regex.test(ua);
    }
    static versionTester(regex, ua) {
        return (ua.match(regex) + "").replace(/[^0-9|_.]/g, "").replace(/_/g, ".");
    }
    getOS() {
        // 系统
        if (UAChecker.regexTester(/windows|win32|win64|wow32|wow64/g, this.ua)) {
            // windows 系统
            this.os = "Windows";
        } else if (UAChecker.regexTester(/macintosh|macintel/g, this.ua)) {
            // macos 系统
            this.os = "macOS";
        } else if (UAChecker.regexTester(/x11/g, this.ua)) {
            // linux 系统, unbuntu, fedora, redhat ...
            this.os = "Linux";
        } else if (UAChecker.regexTester(/android|adr/g, this.ua)) {
            // android 系统
            this.os = "Android";
        } else if (UAChecker.regexTester(/ios|iphone|ipod/g, this.ua)) {
            // ios 系统
            this.os = "iOS";
        } else if (UAChecker.regexTester(/ipad/g, this.ua)) {
            // ios ipad 系统
            this.os = "iPadOS";
        } else if (UAChecker.regexTester(/iwatch/g, this.ua)) {
            // ios watch 系统
            this.os = "watchOS";
        }
        return this.os;
    }
    getOSVersion() {
        // 系统版本
        if(this.os === "unknow") {
            this.getOS();
        }
        switch (this.os) {
            case "Windows":
                if (UAChecker.versionTester(/windows nt 5.0|windows 2000/g, this.ua)) {
                    this.osVersion = "2000";
                } else if (UAChecker.versionTester(/windows nt 5.1|windows xp/g, this.ua)) {
                    this.osVersion = "Windows XP";
                } else if (UAChecker.versionTester(/windows nt 5.2|windows 2003/g, this.ua)) {
                    this.osVersion = "Windows 2003";
                } else if (UAChecker.versionTester(/windows nt 6.0|windows vista/g, this.ua)) {
                    this.osVersion = "Windows Vista";
                } else if (UAChecker.versionTester(/windows nt 6.1|windows 7/g, this.ua)) {
                    this.osVersion = "Windows 7";
                } else if (UAChecker.versionTester(/windows nt 6.2|windows 8/g, this.ua)) {
                    this.osVersion = "Windows 8";
                } else if (UAChecker.versionTester(/windows nt 6.3|windows 8.1/g, this.ua)) {
                    this.osVersion = "Windows 8.1";
                } else if (UAChecker.versionTester(/windows nt 10.0|windows 10/g, this.ua)) {
                    this.osVersion = "Windows 10";
                } else {
                    // this.osVersion = "Windows Next";
                }
                break;
            case "macOS":
                // 系统名称 Map
                // if (UAChecker.versionTester(/mac os x 10_12/g, this.ua)) {
                //     this.osVersion = "macOS 10.12";
                // } else if (UAChecker.versionTester(/mac os x 10_13/g, this.ua)) {
                //     this.osVersion = "macOS 10.13";
                // } else if (UAChecker.versionTester(/mac os x 10_14/g, this.ua)) {
                //     this.osVersion = "macOS 10.14";
                // } else if (UAChecker.versionTester(/mac os x 10_15/g, this.ua)) {
                //     this.osVersion = "macOS 10.15";
                // } else {
                //     this.osVersion = versionTester(/os x [\d._]+/g, this.ua);
                // }
                this.osVersion = UAChecker.versionTester(/os x [\d._]+/g, this.ua);
                break;
            case "Android":
                this.osVersion = UAChecker.versionTester(/android [\d._]+/g, this.ua);
                break;
            case "iOS":
                this.osVersion = UAChecker.versionTester(/os [\d._]+/g, this.ua);
                break;
            case "Linux":
                this.osVersion = "Linux";
                // this.osVersion = this.ua.match(/os [\d._]+/g, this.ua)[1];
                // mozilla/5.0 (x11; ubuntu; linux x86_64; rv:79.0) gecko/20100101 firefox/79.0"
                break;
            default:
                break;
        }
        return this.osVersion;
    }
    getPlatform() {
        const OS = this.os !== "unknow" ? this.os : this.getOS();
        if (OS === "Windows" || OS === "macOS" || OS === "Linux") {
            // 桌面端
            this.platform = "Desktop";
        } else if (OS === "Android" || OS === "iOS" || UAChecker.regexTester(/mobile/g, this.ua)) {
            // 移动端
            this.platform = "Mobile";
        }
        return this.platform;
    }
    getBrowser() {
        // 浏览器
        if (UAChecker.regexTester(/applewebkit/g, this.ua)) {
            // webkit 内核
            if(UAChecker.regexTester(/blink/g, this.ua)) {
                this.engine = "Blick";
            } else {
                this.engine = "WebKit";
            }
            if (UAChecker.regexTester(/chrome/g, this.ua)) {
                this.browser = "Chrome";
            }
            if (UAChecker.regexTester(/safari/g, this.ua)) {
                this.browser = "Safari";
            }
            if (UAChecker.regexTester(/edg/g, this.ua)) {
                this.browser = "Edge";
            }
        } else if (UAChecker.regexTester(/gecko/g, this.ua) && UAChecker.regexTester(/firefox/g, this.ua)) {
            // gecko内核
            this.engine = "Gecko";
            this.browser = "Firefox";
        } else if (UAChecker.regexTester(/trident|compatible|msie/g, this.ua)) {
            // trident内核
            this.engine = "Trident";
            this.browser = "IE";
        } else if (UAChecker.regexTester(/opr/g, this.ua) || UAChecker.regexTester(/presto/g, this.ua)) {
            // presto 内核
            this.engine = "presto";
            this.browser = "Opera";
        } else if (UAChecker.regexTester(/micromessenger/g, this.ua)) {
            this.browser = "微信浏览器";
        } else if (UAChecker.regexTester(/qqbrowser/g, this.ua)) {
            this.browser = "QQ 浏览器";
        } else if (UAChecker.regexTester(/ubrowser/g, this.ua)) {
            this.browser  = "UC 浏览器";
        } else if (UAChecker.regexTester(/2345explorer/g, this.ua)) {
            this.browser  = "2345 浏览器";
        } else if (UAChecker.regexTester(/metasr/g, this.ua)) {
            this.browser = "搜狗浏览器";
        } else if (UAChecker.regexTester(/lbbrowser/g, this.ua)) {
            this.browser = "猎豹浏览器";
        } else if (UAChecker.regexTester(/maxthon/g, this.ua)) {
            this.browser = "遨游浏览器";
        } else if (UAChecker.regexTester(/bidubrowser/g, this.ua)) {
            this.browser = "百度浏览器";
        } else {
            this.browser = "unknow 浏览器";
        }
        return this.browser;
    }
    getBrowserVersion() {
        const browser = this.browser !== "unknow" ? this.browser : this.getBrowser();
        // 浏览器版本
        switch (browser) {
            case "Chrome":
                this.browserVersion = UAChecker.versionTester(/chrome\/[\d._]+/g, this.ua);
                break;
            case "Safari":
                this.browserVersion = UAChecker.versionTester(/safari\/[\d._]+/g, this.ua);
                break;
            case "Edge":
                this.browserVersion = UAChecker.versionTester(/edg?\/[\d._]+/g, this.ua);
                break;
            case "Opera":
                this.browserVersion = UAChecker.versionTester(/opr\/[\d._]+/g, this.ua);
                break;
            case "Firefox":
                this.browserVersion = UAChecker.versionTester(/firefox\/[\d._]+/g, this.ua);
                break;
            case "IE":
                this.browserVersion = UAChecker.versionTester(/trident|compatible|msie\/[\d._]+/g, this.ua);
                break;
            case "百度浏览器":
                this.browserVersion = UAChecker.versionTester(/bidubrowser\/[\d._]+/g, this.ua);
                break;
            case "微信浏览器":
                this.browserVersion = UAChecker.versionTester(/micromessenger\/[\d._]+/g, this.ua);
                break;
            case "QQ 浏览器":
                this.browserVersion = UAChecker.versionTester(/qqbrowser\/[\d._]+/g, this.ua);
                break;
            case "搜狗浏览器":
                this.browserVersion = UAChecker.versionTester(/metasr\/[\d._]+/g, this.ua);
                break;
            case "猎豹浏览器":
                this.browserVersion = UAChecker.versionTester(/lbbrowser\/[\d._]+/g, this.ua);
                break;
            case "遨游浏览器":
                this.browserVersion = UAChecker.versionTester(/maxthon\/[\d._]+/g, this.ua);
                break;
            case "2345 浏览器":
                this.browserVersion = UAChecker.versionTester(/2345explorer\/[\d._]+/g, this.ua);
                break;
            case "UC 浏览器":
                this.browserVersion = UAChecker.versionTester(/ubrowser\/[\d._]+/g, this.ua);
                break;
            default:
                // others
                this.browserVersion = "unkown 浏览器版本";
                break;
        }
        return this.browserVersion;
    }
    getBrowserEngine() {
        if(this.engine === "unknow") {
            this.getBrowser();
        }
        return this.engine;
    }
    init() {
        this.getOS();
        this.getOSVersion();
        this.getPlatform();
        this.getBrowser();
        this.getBrowserVersion();
    }
    getAll() {
        return {
            os: this.os,
            osVersion: this.osVersion,
            browser: this.browser,
            browserVersion: this.browserVersion,
            engine: this.engine,
            platform: this.platform,
            ua: this.ua,
        };
    }
}

export default UAChecker;
