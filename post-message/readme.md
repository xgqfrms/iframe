# landing-page & heat-map

> scroll sync (iframe 与 热力图 mask 同步滚动)


https://cdn.xgqfrms.xyz/iframe/post-message/landing-page.html


https://iframe.xgqfrms.xyz/post-message/heat-map.html

<!-- https://iframe.xgqfrms.xyz/post-message/mask-scroll.html -->

## iframe parent.PostMessage bug

https://iframe.xgqfrms.xyz/post-message/bug.html

https://cdn.xgqfrms.xyz/iframe/post-message/bug.html


```js


const sendIframeDynamicHeightMessage = () => {
    const app = document.querySelector('#appt');
    const clientHeight = app.clientHeight;
    console.log('\nclientHeight =', clientHeight);
    console.log('window =', window);
    console.log('window.parent =', window.parent);
    console.log('window.location =', window.location);
    const host = window.location.host;
    // const protocol = window.location.protocol;
    // const url = `${protocol}//${host}/tools/landing-page`;
    const url = `${window.location.origin}/tools/landing-page`;
    let env = '';
    switch (host) {
        case 'dev.xgqfrms.xyz':
            env = '测试环境';
            break;
        case 'release.xgqfrms.xyz':
            env = '灰度环境';
            break;
        case 'dap.xgqfrms.xyz':
            env = '生产环境';
            break;
        default:
            break;
    }
    window.parent.postMessage({
        type: 'iframeHeight',
        height: clientHeight,
        env: env,
    }, url);
};

```
