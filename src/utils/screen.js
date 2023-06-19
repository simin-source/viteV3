import puppeteer from 'puppeteer';
async function screen() {
    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: {//设置截图大小
            width: 400,
            height: 600
        }
    });
    const page = await browser.newPage();
    await page.goto(
        "https://www.amazon.com/Explorer-2-SUV-Minivan-Tent/dp/B0001WTY0E/ref=mp_s_a_1_1_sspa?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&crid=184FG15DI00BB&keywords=b075ld3z3x&qid=1683166736&sprefix=b075ld3z3x%2Caps%2C442&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzSjdVSkJYTlc0M1VLJmVuY3J5cHRlZElkPUEwNzgzNjU4MlhUWVFXSjczTTZVSCZlbmNyeXB0ZWRBZElkPUEwMjgxNzgzTEdaQTVYSVU4QU84JndpZGdldE5hbWU9c3BfcGhvbmVfc2VhcmNoX210ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU="
    );
    await page.screenshot({ path: "./img/good1.png" });
    await browser.close();
    return 'good1.png';
}
function test() {
    return new Promise((resolve, reject) => {
        resolve(screen());
    })
}
test().then(res => {
    console.log('成功' + res);
}).catch(error => {
    console.error('Promise rejected:', err);
});
// (async () => {
//     const browser = await puppeteer.launch({
//         defaultViewport: {//设置截图大小
//             width: 400,
//             height: 600
//         }
//     });
//     const page = await browser.newPage();
//     // page.waitForNavigation({ waitUntil: 'networkidle0' }),
//     // page.click('');
//     await page.goto(
//         "https://www.amazon.com/Explorer-2-SUV-Minivan-Tent/dp/B0001WTY0E/ref=mp_s_a_1_1_sspa?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&crid=184FG15DI00BB&keywords=b075ld3z3x&qid=1683166736&sprefix=b075ld3z3x%2Caps%2C442&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzSjdVSkJYTlc0M1VLJmVuY3J5cHRlZElkPUEwNzgzNjU4MlhUWVFXSjczTTZVSCZlbmNyeXB0ZWRBZElkPUEwMjgxNzgzTEdaQTVYSVU4QU84JndpZGdldE5hbWU9c3BfcGhvbmVfc2VhcmNoX210ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU="
//     );
//     await page.screenshot({ path: "./img/good1.png" });
//     await browser.close();
// })();