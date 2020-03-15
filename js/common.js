// 封装插件
(function () {
    $.fn.extend({
        "backBtn": function (options) {
            // console.log("调用了方法");
            var obj = {
                isBack: true,
                scrollTop: 0,
                position: "left",
                width: 1000,
                offset: 10,
                speed: 800,
                ifShow: false,
                bottom: 100
            }
            // 对象融合的方式如有有就替换，没有就添加
            var ops = $.extend(obj, options)
            var $window = $(window), $dom = $(this)
            var opr = {
                // 获取想要的值，设置想要的值，实现功能
                getLeft: function () {
                    var l //距离
                    var ww = $window.width();
                    var dw = $dom.outerWidth()
                    if (ops.position === "left") {
                        l = (ww - ops.width) / 2 - ops.offset - dw
                    }
                    else if (ops.position === "right") {
                        l = (ww - ops.width) / 2 + ops.width + ops.offset
                    }
                    return l;
                },
                getTop: function () {
                    var t;
                    var wh = $window.height();
                    var dh = $dom.outerHeight()
                    t = wh - dh - ops.bottom
                    return t
                },
                setPosition: function () {
                    var L = this.getLeft()
                    var T = this.getTop()
                    $dom.css({
                        left: L + 'px',
                        top: T + 'px'
                    })
                },
                init: function () {
                    this.setPosition();
                    $window.resize(function () {
                        opr.setPosition();
                    })
                    $window.scroll(function () {
                        if ($window.scrollTop() > ops.scrollTop) {
                            $dom.show()

                        }
                        else {
                            $dom.hide()

                        }
                    })
                    if (ops.ifShow) {
                        $dom.show()
                    }
                    else {
                        $dom.hide()
                    }
                    if (ops.isBack) {
                        $dom.on('click', function () {
                            $('body,html').animate({
                                scrollTop: 0
                            }, ops.speed)
                        })
                    }

                }
            }
            opr.init()
            return $dom
        }
    })
})()



$('#backTop').backBtn({
    isBack: true,
    scrollTop: 100,
    position: "left",
    offset: 100
});


$(function () {
    var slide ={
        // 面向对象就是
        stop:true, //是否自动轮播
        animate:false, //判断是否在执行动画

    }

    $('.next').click(function () {
        var ul = $('.slide ul')
        if (!ul.is(":animated")) {
            ul.animate({
                left: '-1002px',
            }, 800, function () {
                // 回调函数里面需要操作当把第一个li移到最后面
                ul.find("li").eq(0).appendTo('.slide ul')
                // 插入到最后一个之后还需要把ul的位置还原
                ul.css({ left: '0px' })
                // console.log( $('.slide ul li').eq(0));
            })
        }

    })

    $('.prev').click(function () {
        // 不执行动画的时候才做这个操作
        var ul = $('.slide ul')
        if (!ul.is(":animated")) {
            ul.find('li').last().prependTo(ul);
            ul.css('left', '-1002px')
            ul.animate({
                left: "0px",
            }, 800)
        }

    })

    var timer;
    timer = setInterval(function () {
        var ul = $('.slide ul')
        ul.animate({
            left: '-1002px',
        }, 800, function () {
            // 回调函数里面需要操作当把第一个li移到最后面
            ul.find("li").eq(0).appendTo('.slide ul')
            // 插入到最后一个之后还需要把ul的位置还原
            ul.css({ left: '0px' })
            // console.log( $('.slide ul li').eq(0));
        })

    }, 2000)
    $('.slider-box').mouseover(function () {
        clearInterval(timer)
    })
    $('.slider-box').mouseout(function () {
        timer = setInterval(function () {
            var ul = $('.slide ul')
            ul.animate({
                left: '-1002px',
            }, 800, function () {
                // 回调函数里面需要操作当把第一个li移到最后面
                ul.find("li").eq(0).appendTo('.slide ul')
                // 插入到最后一个之后还需要把ul的位置还原
                ul.css({ left: '0px' })
                // console.log( $('.slide ul li').eq(0));
            })

        }, 2000)
    })

    // 请求数据
    var indexNum = 0; //统计当前的请求次数
    $('.Commore').click(function () {
        var self = $(this);
        // 代表的是点击的这个标签
        self.html("正在加载中").removeClass('cl').addClass('loading');
        $.ajax({
            type: 'post',
            url: 'json/json.js',
            dataType: 'json',

            success: function (res) {
                // console.log(res);
                var data1 = res[indexNum];
                var str = "";
                data1.forEach(function (item) {
                    // console.log(item);
                    str += `<li>
                    <img src="${item.img}" width="220" height="130"/>
                    <div class="info">
                        <p class="name">${item.text}</span></p>
                        <div class="tip fix">
                            <span class="price left">${item.price}</span>
                            <div class="right icon">
                                <span class="xin">3</span>
                                <span class="look">3</span>
                            </div>
                        </div>
                    </div>
                </li>
                    `
                })

                $('.cool ul').append(str)
                indexNum++;
                self.html("点击加载更多").removeClass('loading').addClass('cl');
                if (indexNum >= res.length) {
                    self.parent().html("没有更多了~")
                }

            }

        })
    });
    // 返回顶部的按钮
    // $(window).scroll(function () {
    //     // console.log($(window).scrollTop());
    //     if ($(window).scrollTop() > 100) {
    //         $('#backTop').show()
    //     }

    //     else {
    //         $('#backTop').hide()

    //     }
    // })

    // // 当点击返回顶部按钮时
    // $('#backTop').click(function () {
    //     $('html,body').animate({
    //         scrollTop: 0
    //     }, 800)
    // })

})