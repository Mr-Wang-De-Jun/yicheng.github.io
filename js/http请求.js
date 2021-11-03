// 使用node创建一个web服务器
// 在node中专门提供了一个核心模块：http
// http这个模块的职责就是帮你创建编写服务器的
// 1.加载http核心模块
var http = require('http')
// 加载一个fs核心模块
var fs = require('fs')
// 2.使用http.createServer()方法创建一个web服务器
// 返回一个Server实例
var server = http.createServer()
// 3.服务器可以做的操作
/*
	1.发请求
	2.接收请求
	3.处理请求
	4.给出反馈（响应）
*/
// 注册一个请求事件，当客户端请求网址时就会触发这个方法，然后回调这个函数
// 这个回调函数内有两个形参，第一个表示请求对象，第二个表示响应数据
server.on('request',function(req,res){
	console.log('客户端想我发送了请求，请及时给出数据')
	console.log('请求我的客户端的端口号是：'+req.socket.remotePort)
	console.log('请求我客户端的ip地址：'+req.socket.remoteAddress)
	// 加上这句话防止中文乱码，text/plain表示普通文本的意思，如果你发送的是html格式的字符串则需要改为text/html
	res.setHeader('Content-Type','text/plain; charset=UTF-8')
	
	// req.url可以获取当前请求地址端口号后面的所有内容，res.end表示响应服务器请求，并将内容传递给页面
	var url = req.url
	if(url === '/index.page'){
		fs.readFile('../音乐排行列表/index.html','utf-8',function(error,data){
			if(error){
				res.setHeader('Content-Type','text/plain')
				res.end('数据加载失败')
			}else{
				res.setHeader('Content-Type','text/html')
				res.end(data)
			}
		})
	}else if(url === '/login.page'){
		res.end('这里是login。page页面')
	}else if(url === '/data.page'){

		var arrData = [
		{name:'张三',age:18},
		{name:'李四',age:19},
		{name:'王五',age:20},
		{name:'赵六',age:21},
		{name:'周七',age:22},
		]
		// JSON.stringify(arrData)将数组转换成json字符串
		res.end(JSON.stringify(arrData))
	}else if(url === '/'){
		//发送一个html字符串
		res.setHeader('Content-Type','text/html; charset=UTF-8')
		res.end('<h3>main.page页面</h3>')
	}else if(url === '/image'){
		fs.readFile('1.png',function(error,data){
			if(error){
				res.setHeader('Content-Type','text/plain; charset=UTF-8')
				res.end('数据请求失败，内容无法正常显示')
			}else{
				res.setHeader('Content-Type','image/png')
				res.end(data)
			}
		});
	}else{
		res.end('404 is not find')
	}
})
// 4.绑定一个端口号，用于开启服务器，客户端方便请求
server.listen(3000,function(){
	console.log('服务器开启成功，可以通过http://127.0.0.1:3000/来进行请求')
})