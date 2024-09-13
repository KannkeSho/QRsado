var timerId; // タイマーIDを格納する変数

function sendPostRequest(userId) {
	console.log("ajax")
    $.ajax({
        url: 'http://127.0.0.1:8888/post',  // 送信先URLを指定	//FlaskアプリケーションのPOSTルート
        type: 'POST',
        data: {
            userId : userId
        },
		dataType:'json',
        success: function(response) {
            // リクエストが成功した場合の処理
            console.log('Success:', response);

			var response_json_string = JSON.stringify(response);
			var response_json_data = JSON.parse(response_json_string);
			console.log(response_json_data)

			var user_no = response_json_data["No"];
			var user_first = response_json_data["FirstName"];
			var user_last = response_json_data["LastName"];
			var current_time = response_json_data["current_time"];

			//document.getElementById('user').textContent = user_no+" "+user_last+user_first;
			//document.getElementById('time').textContent = current_time; // 時間を表示する要素にセット

			if (user_last === "田中" && user_first === "蒼") {
				// Flaskのルートに対応するURLに変更
				window.location.href = '/sadokinnzann';
			}
			else if(user_last === "佐藤" && user_first === "佳悟") {
				// Flaskのルートに対応するURLに変更
				window.location.href = '/kitazawa';
			}
			else if(user_last === "結城" && user_first === "紫苑") {
				// Flaskのルートに対応するURLに変更
				window.location.href = '/oonogame';
			}
			else if(user_last === "斎藤" && user_first === "達樹") {
				// Flaskのルートに対応するURLに変更
				window.location.href = '/sennkakuwann';
			}
			else if(user_last === "五条" && user_first === "悟") {
				// Flaskのルートに対応するURLに変更
				window.location.href = '/hutatugame';
			}
			else if(user_last === "オーキド" && user_first === "博士") {
				// Flaskのルートに対応するURLに変更
				window.location.href = '/usagi';
			}
			

        },
        error: function(xhr, status, error) {
            // リクエストが失敗した場合の処理
            console.error('Error:', error);
        }
    });
}



window.onload = (e)=>{

	let video  = document.createElement("video");
	let canvas = document.getElementById("canvas");
	let ctx    = canvas.getContext("2d");
	let msg    = document.getElementById("msg");

	const userMedia = {video: {facingMode: "environment"}};
	navigator.mediaDevices.getUserMedia(userMedia).then((stream)=>{
		video.srcObject = stream;
		video.setAttribute("playsinline", true);
		video.play();
		startTick();
	});

	function startTick(){
		msg.innerText = "Loading video...";
		if(video.readyState === video.HAVE_ENOUGH_DATA){
			canvas.height = video.videoHeight;
			canvas.width = video.videoWidth;
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
			let code = jsQR(img.data, img.width, img.height, {inversionAttempts: "dontInvert"});
			if(code){
				drawRect(code.location);// Rect		
				msg.innerText = code.data;// Data QRコードを読み込んだ結果 ここでpy
				sendPostRequest(code.data);

			}else{
				msg.innerText = "Detecting QR-Code...";
			}
		}
		setTimeout(startTick, 250);
	}

	function drawRect(location){
		drawLine(location.topLeftCorner,     location.topRightCorner);
		drawLine(location.topRightCorner,    location.bottomRightCorner);
		drawLine(location.bottomRightCorner, location.bottomLeftCorner);
		drawLine(location.bottomLeftCorner,  location.topLeftCorner);
	}

	function drawLine(begin, end){
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#FF3B58";
		ctx.beginPath();
		ctx.moveTo(begin.x, begin.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
	}
}