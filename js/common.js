$(function(){
    $('.next').click(function(){
        var ul = $('.slide ul')
        ul.animate({
            left:'-1002px',
        },800,function(){
            // 回调函数里面需要操作当把第一个li移到最后面
            ul.find("li").eq(0).appendTo('.slide ul')
            // 插入到最后一个之后还需要把ul的位置还原
            ul.css({left:'0px'})
            // console.log( $('.slide ul li').eq(0));
        })
    })

    $('.prev').click(function(){
        var ul = $('.slide ul')
        ul.find('li').last().prependTo(ul);
        ul.css('left','-1002px')
        ul.animate({
            left:"0px",
        },800)
    })

    var timer ; 
    timer = setInterval(function(){
        var ul = $('.slide ul')
        ul.animate({
            left:'-1002px',
        },800,function(){
            // 回调函数里面需要操作当把第一个li移到最后面
            ul.find("li").eq(0).appendTo('.slide ul')
            // 插入到最后一个之后还需要把ul的位置还原
            ul.css({left:'0px'})
            // console.log( $('.slide ul li').eq(0));
        })
    
    },2000)
    $('.slider-box').mouseover(function(){
        clearInterval(timer)
    })
    $('.slider-box').mouseout(function(){
        timer = setInterval(function(){
            var ul = $('.slide ul')
            ul.animate({
                left:'-1002px',
            },800,function(){
                // 回调函数里面需要操作当把第一个li移到最后面
                ul.find("li").eq(0).appendTo('.slide ul')
                // 插入到最后一个之后还需要把ul的位置还原
                ul.css({left:'0px'})
                // console.log( $('.slide ul li').eq(0));
            })
        
        },2000)
    })
})