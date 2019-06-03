//组件的方式 构造函数 
function Carousel($ct) {
    this.init($ct)
    this.bind()
        //自动启动轮播
        // this.autoPlay()
}
Carousel.prototype = {
        constructor: Carousel,
        init: function($ct) {
            console.log(this)
            this.$ct = $ct
            this.$imgCt = this.$ct.find('.img-ct')
            this.$imgs = this.$ct.find('.img-ct >li')
            this.$preBtn = this.$ct.find('.pre')
            this.$nextBtn = this.$ct.find('.next')
            this.$bullets = this.$ct.find('.bullet li')
            this.imgWidth = this.$imgs.width()
            this.imgCount = this.$imgs.length
            this.index = 0
                //防止重复点击
            this.isAnimate = false
                //前后各添加一个DOM节点
            this.$imgCt.append(this.$imgs.first().clone())
            this.$imgCt.prepend(this.$imgs.last().clone())
                //设置ul父容器的宽度 让li变成一行排列
            this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
                //初始化图片
            this.$imgCt.css('left', -this.imgWidth)
        },
        bind: function() {
            var _this = this
            this.$preBtn.on('click', function() {
                _this.playPre(1)
            })
            this.$nextBtn.on('click', function() {
                _this.playNext(1)
            })
            this.$bullets.on('click', function() {
                var index = $(this).index()
                if (_this.index > index) {
                    _this.playPre(_this.index - index)
                } else {
                    _this.playNext(index - _this.index)
                }
            })
        },
        //封装轮播左右点击按钮  方便维护 
        playNext: function(len) {
            var _this = this
            if (this.isAnimate) return
            this.isAnimate = true
            console.log('你好')
            this.$imgCt.animate({
                left: '-=' + this.imgWidth * len
            }, function() {
                _this.index += len
                if (_this.index === _this.imgCount) {
                    _this.$imgCt.css('left', -_this.imgWidth)
                    _this.index = 0
                }
                //下面的状态
                _this.setBullet()
                _this.isAnimate = false
            })
        },
        playPre: function(len) {
            var _this = this
            if (this.isAnimate) return
            this.isAnimate = true
            this.$imgCt.animate({
                left: '+=' + this.imgWidth * len
            }, function() {
                _this.index -= len
                if (_this.index < 0) {
                    _this.$imgCt.css('left', -_this.imgWidth * _this.imgCount)
                    _this.index = _this.imgCount - 1
                }
                _this.setBullet()
                _this.isAnimate = false
            })
        },
        //圆点状态
        setBullet: function() {
            this.$bullets.eq(this.index).addClass('active')
                .siblings().removeClass('active')
        },
        //自动轮播
        autoPlay: function() {
            var _this = this
            this.autoClock = setInterval(function() {
                _this.playNext(1)
            }, 2000)
        },
        //清除定时器
        stopAuto: function() {
            clearInterval(this.autoPlay)
        }
    }
    //面向对象
var a = new Carousel($('.carousel').eq(0))
var b = new Carousel($('.carousel').eq(1))