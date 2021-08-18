//样式
//reactui
//three的runtime

import './app.styl'
import $ from "jquery";
import { setTimeout } from 'core-js';
let time = 0
let ws = {
    wsLink: config.ws,
    wsPool: null,
}
let isplaying=false
ws.wsPool = new WebSocket(ws.wsLink)
function toPrint(print) {
    if(isplaying) return
    isplaying=true
    $('.zoom_box').css('transition','0.8s')
    $('.zoom_box').addClass('zoom_out_in')
    setTimeout(() => {
        $('.zoom_box').css('transform', 'translateX(' + -print * 100 + 'vw)')
        setTimeout(() => {
            $('.zoom_box').removeClass('zoom_out_in')
            
            if(print>=4&&print<8){//是视频
                // console.log('是视频');
                for(let i=1 ; i<5;i++){
                    const c = '.vv'+i
                    $(c)[0].pause()
                    $(c)[0].currentTime = 0
                }
                const c = '.vv'+(print-3)
                // console.log(c);
                $(c)[0].play()
            }
            isplaying=false
        }, 1300)
    }, 300)
}

// function send (obj) {
//     ws.wsPool.send(JSON.stringify(obj))
// }
// let obj = {
//     code: 20601,
//     msg: "切换背景", 
// }
// $('.t1').on('click',function(){
//     obj.data=2
//     send(obj)
// })
// $('.t2').on('click',function(){
//     obj.data=2
//     send(obj)
// })
// $('.t3').on('click',function(){
//     obj.data=3
//     send(obj)
// })
// $('.t4').on('click',function(){
//     obj.data=4
//     send(obj)
// })
// $('.v1').on('click',function(){
//     obj.data=5
//     send(obj)
// })
// $('.v2').on('click',function(){
//     obj.data=6
//     send(obj)
// })
// $('.v3').on('click',function(){
//     obj.data=7
//     send(obj)
// })
// $('.v4').on('click',function(){
//     obj.data=8
//     send(obj)
// })
ws.wsPool.onmessage = onMessage
ws.wsPool.onopen = onConnect
ws.wsPool.onclose = onClose
ws.wsPool.onerror = onError
function onMessage (evt) {
        // ping or pong 过滤
        if (evt.data == "ping" || evt.data == "pong") {
          return
        }
        const data = JSON.parse(evt.data)
        switch (data.code) {
          case 200001:
            console.log("加入成功")
            break
          case 20601 :
              toPrint(data.data-1)
        }
}
function  onConnect (evt) {
  console.log('连接上了')

  ws.timer = setInterval(() => {
      time+=15
      ws.wsPool.send("ping")
      console.log('无操作: ',time,'s');
      
  }, 15000)
}
function  onClose (evt) {
  console.log("on closed", evt)
}
function  onError (evt) {
  console.log("on error", evt)
}