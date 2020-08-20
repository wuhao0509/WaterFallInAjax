//isFinsh加锁
var isFinsh = true;

function getData() {
    if (!isFinsh) {
        return false;
    }
    isFinsh = false;
    ajax('GET', './data.json', '', renderDom, true);

}

var oLi = document.getElementsByClassName('col');
function renderDom(result) {
    isFinsh = true;
    var imgWidth = oLi[0].offsetWidth - 20 - 20;
    result.forEach(function (elem, index) {
        // 创建div.item
        var oDiv = document.createElement('div');
        oDiv.className = 'item';

        // 创建img
        var oImg = document.createElement('img');
        oImg.src = elem.img;
        // 由于img是异步加载图片，我们先将图片的位置预留出来
        var imgHeight = elem.height * imgWidth / elem.width;
        oImg.height = imgHeight;
        oDiv.appendChild(oImg);

        // 创建p
        var oP = document.createElement('p');
        oP.innerText = elem.desc;
        oDiv.appendChild(oP);

        // 创建div.item
        /*  str = `
             <img src=${elem.img} alt="">
             <span>${elem.desc}</span>
         `
         var oDiv = document.createElement('div');
         oDiv.className = 'item';
         oDiv.innerHTML = str; */

        // 向页面插入
        // oLi[index%4].appendChild(oDiv);
        var minIndex = getMinCol().minIndex;
        oLi[minIndex].appendChild(oDiv);

    })
}

// 找到最短的列
function getMinCol() {
    var minHeight = oLi[0].offsetHeight;
    var minIndex = 0;
    for (var i = 0; i < oLi.length; i++) {
        if (oLi[i].offsetHeight < minHeight) {
            minHeight = oLi[i].offsetHeight;
            minIndex = i;
        }
    }

    return {
        minHeight: minHeight,
        minIndex: minIndex
    }
}

var timer = null;
window.onscroll = function () {
    clearTimeout(timer);
    var scrollTop = document.documentElement.scrollTop;
    var clientHeight = document.documentElement.clientHeight;
    var minHeight = getMinCol().minHeight;
    if (scrollTop + clientHeight > minHeight) {
        timer = setTimeout(function () {
            getData();
        }, 300)
    }
}

getData();