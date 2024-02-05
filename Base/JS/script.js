"use strict"



//     const puzzleBox = document.getElementById('box-left');

//==================================================

$(document).ready(function () {

	const puzzle = $('.puzzle');
	const leftBox = $('#box-left');
	const rightBox = $('#box-right');
	const imageUrl = `url("Images/puzzle.jpg")`;
	const pieces = 16;
	let number;

	function initializeGame() {
		leftBox.empty();
		rightBox.empty();

		for (let i = 0; i < pieces; i++) {
			const piece = $('<div class="puzzle"></div>');
			let number = $('<div class="number"></div>');
			number.text(i + 1);
			piece.css({
				backgroundImage: imageUrl,
				backgroundPosition: `-${i % 4 * 50}px -${Math.floor(i / 4) * 50}px`
			});

			piece.append(number);
			leftBox.append(piece);
		}

		$('.box').sortable({
			connectWith: '#box-left, #box-right',
			containment: '.block-puzzles'
		});
	}

	initializeGame();

	// let current;
	// let other;

	$.fn.shuffle = function () {
		const elements = this.get();
		for (let i = elements.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			if (elements[i] && elements[j]) {
				elements[i].parentNode.insertBefore(elements[i], elements[j]);
			}
		}
		return this;
	};

	const startBtn = $('#btn_start');
	const newBtn = $('#btn_new');
	const checkBtn = $('#btn_check');
	const modalContainer = $('.modal-container');
	let showTimer = $('.show-timer');
	checkBtn.prop('disabled', true);

	startBtn.on('click', () => {
		startBtn.css({backgroundColor: '#EE8683'});
		leftBox.children().shuffle();
		startBtn.prop('disabled', true);
		checkBtn.prop('disabled', false);
		startCountdown(120);
	});

	const slideBtnCheck = $('#info_slide-check_btn-check');
	const slideBtnClose = $('#info_slide-check_btn-close');
	let slideCheck = $('.info_slide-check');
	let slideCheckText = $('.info_slide-check_text');

	checkBtn.on('click', () => {
		checkBtn.css({backgroundColor: '#EE8683'});
		slideCheck.show();
		modalContainer.css({
			display: 'block',
			opacity: 0.5
		})
	});

	newBtn.on('click', () => {
		startBtn.css({backgroundColor: '#EB4446'});
		checkBtn.css({backgroundColor: '#EB4446'});
		startBtn.prop('disabled', false);
		checkBtn.prop('disabled', true);
		// clearInterval(countdownInterval);
		showTimer.text("01:00");
		initializeGame();
	});


	let text2 = $('.text2');
	let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
	let check = true;

	// parseFloat($('.show-timer').text()) == 0

	slideBtnCheck.on('click', () => {

		for (let i = 0; i < $('.number').length; i++) {

			if ($('.number').eq(i).text() != numbers[i]) {
			console.log('bbbbbb', $('.number').eq(i).text() != numbers[i]);
				check = false;
				break;
			}
		}
		if (check) {
			alert('YES');
		}
		else {
			alert('no');
		}
		check = false;
		slideBtnCheck.hide();
		text2.show();
		slideCheckText.hide();
	});

	slideBtnClose.on('click', () => {
		modalContainer.hide();
		slideCheck.hide();
		slideBtnCheck.show();
		text2.hide();
		slideCheckText.show();
	})





	let countdownInterval;
	let modal = $('#myModal');
	let closeModal = $('.close');
	// let showTimer = $('.show-timer');

	function startCountdown(seconds) {
		clearInterval(countdownInterval);


		let totalMilliseconds = seconds * 1000;
		let startTime = new Date().getTime();

		countdownInterval = setInterval(function() {
			let currentTime = new Date().getTime();
			let elapsedTime = currentTime - startTime;
			let remainingTime = totalMilliseconds - elapsedTime;

			if (remainingTime <= 0) {
				clearInterval(countdownInterval);
				showTimer.text("00:00");
				showModal();
			} else {
				updateTimer(remainingTime);
			}
		}, 1000);
	}

	function updateTimer(milliseconds) {
		let seconds = Math.floor(milliseconds / 1000);
		let minutes = Math.floor(seconds / 60);

		seconds = seconds < 10 ? "0" + seconds : seconds;
		minutes = minutes < 10 ? "0" + minutes : minutes;

		showTimer.text(minutes + ":" + seconds);
	}

	function showModal() {
		slideCheck.show();
		modalContainer.css({
			display: 'block',
			opacity: 0.5
		})
		slideBtnCheck.hide();
		text2.show();
		slideCheckText.hide();
	}

});

//===============================================================

// $(function () {
// 	//variables
// 	var numberOfPieces = 12,
// 		aspect = "3:4",
// 		aspectW =parseInt(aspect.split(":")[0]),
// 		aspectH = parseInt(aspect.split(":")[1]),
// 		container = $("#puzzle"),
// 		imgContainer = container.find("figure"),
// 		img = imgContainer.find("img"),
// 		path = img.attr("src"),
// 		piece = $("<div/>"),
// 		pieceW = Math.floor(img.width() / aspectW),
// 		pieceH = Math.floor(img.height() / aspectH),
// 		idCounter = 0,
// 		positions = [],
// 		empty = {
// 			top: 0,
// 			left: 0,
// 			bottom: pieceH,
// 			right: pieceW
// 		},
// 		previous = {},
// 		timer,
// 		currentTime = {},
// 		timerDisplay = container.find("#time").find("span");
//
// 	//generate puzzle pieces
// 	for (var x = 0, y = aspectH; x < y; x++) {
// 		for (var a = 0, b = aspectW; a < b; a++) {
// 			var top = pieceH * x,
// 				left = pieceW * a;
//
// 			piece.clone().attr("id", idCounter++).css({
// 				width: pieceW,
// 				height: pieceH,
// 				position: "absolute",
// 				top: top,
// 				left: left,
// 				backgroundImage: ["url(", path, ")"].join(""),
// 				backgroundPosition: ["-", pieceW * a, "px ", "-", pieceH * x, "px"].join("")
// 			}).appendTo(imgContainer);
//
// 			//store positions
// 			positions.push({ top: top, left: left });
// 		}
// 	}
//
// 	//remove original image
// 	img.remove();
//
// 	//remove first piece from board
// 	container.find("#0").remove();
//
// 	//remove first item in positions array
// 	positions.shift();
//
// 	$("#start").on("click", function (e) {
//
// 		//shuffle the pieces randomly
// 		var pieces = imgContainer.children();
//
// 		function shuffle(array) {
// 			var i = array.length;
// 			if (i === 0) {
// 				return false;
// 			}
// 			while (--i) {
// 				var j = Math.floor(Math.random() * (i + 1)),
// 					tempi = array[i],
// 					tempj = array[j];
//
// 				array[i] = tempj;
// 				array[j] = tempi;
// 			}
// 		}
//
// 		shuffle(pieces);
//
// 		//set position of shuffled images
// 		$.each(pieces, function (i) {
// 			pieces.eq(i).css(positions[i]);
// 		});
//
// 		//replace existing pieces with shuffled pieces
// 		pieces.appendTo(imgContainer);
//
// 		//make sure empty slot is at position 0 when timer starts
// 		empty.top = 0;
// 		empty.left = 0;
//
// 		//remove any previous messages
// 		container.find("#ui").find("p").not("#time").remove();
//
// 		//cancel previous timer
// 		if (timer) {
// 			clearInterval(timer);
// 			timerDisplay.text("00:00:00");
// 		}
//
// 		//start the timer!
// 		timer = setInterval(updatetime, 1000);
// 		currentTime.seconds = 0;
// 		currentTime.minutes = 0;
// 		currentTime.hours = 0;
//
// 		//update the timer display
// 		function updatetime() {
//
// 			//stop timer if 24 hours
// 			if (currentTime.hours === 23 && currentTime.minutes === 59 && currentTime.seconds === 59) {
// 				clearinterval(timer);
// 			} else if (currentTime.minutes === 59 && currentTime.seconds === 59) {
// 				//increment hours if applicable
// 				currentTime.hours++;
// 				currentTime.minutes = 0;
// 				currentTime.seconds = 0;
// 			} else if (currentTime.seconds === 59) {
// 				//increment minutes if applicable
// 				currentTime.minutes++;
// 				currentTime.seconds = 0;
// 			} else {
// 				//increment seconds
// 				currentTime.seconds++;
// 			}
//
// 			//build time string
// 			newHours = (currentTime.hours <= 9) ? "0" + currentTime.hours : currentTime.hours;
// 			newMins = (currentTime.minutes <= 9) ? "0" + currentTime.minutes : currentTime.minutes;
// 			newSecs = (currentTime.seconds <= 9) ? "0" + currentTime.seconds : currentTime.seconds;
//
// 			//update display
// 			timerDisplay.text([newHours, ":", newMins, ":", newSecs].join(""));
// 		}
//
// 		//make pieces draggable
// 		pieces.draggable({
// 			containment: "parent",
// 			grid: [pieceW, pieceH],
// 			start: function (e, ui) {
//
// 				var current = getPosition(ui.helper);
//
// 				//set axis depending on location relative to empty space
// 				if (current.left === empty.left) {
// 					ui.helper.draggable("option", "axis", "y");
// 				} else if (current.top === empty.top) {
// 					ui.helper.draggable("option", "axis", "x");
// 				} else {
// 					ui.helper.trigger("mouseup");
// 					return false;
// 				}
//
// 				//prevent drag if not adjacent to empty space
// 				if (current.bottom < empty.top || current.top > empty.bottom || current.left > empty.right || current.right < empty.left) {
// 					ui.helper.trigger("mouseup");
// 					return false;
// 				}
//
// 				//remember current location
// 				previous.top = current.top;
// 				previous.left = current.left;
//
// 			},
// 			drag: function (e, ui) {
//
// 				var current = getPosition(ui.helper);
//
// 				//stop dragging if we are in the empty space
// 				if (current.top === empty.top && current.left === empty.left) {
// 					ui.helper.trigger("mouseup");
// 					return false;
// 				}
//
// 				//stop dragging if moving away from empty space
// 				if (current.top > empty.bottom || current.bottom < empty.top || current.left > empty.right || current.right < empty.left) {
// 					ui.helper.trigger("mouseup").css({
// 						top: previous.top,
// 						left: previous.left
// 					});
// 					return false;
// 				}
// 			},
// 			stop: function (e, ui) {
// 				var current = getPosition(ui.helper),
// 					correctPieces = 0;
//
// 				//move empty space if space now occupied
// 				if (current.top === empty.top && current.left === empty.left) {
// 					empty.top = previous.top;
// 					empty.left = previous.left;
// 					empty.bottom = previous.top + pieceH;
// 					empty.right = previous.left + pieceW;
// 				}
//
// 				//get positions of all pieces
// 				$.each(positions, function (i) {
//
// 					var currentPiece = $("#" + (i + 1)),
// 						currentPosition = getPosition(currentPiece);
//
// 					//is the current piece in the correct place?
// 					if (positions[i].top === currentPosition.top && positions[i].left === currentPosition.left) {
// 						correctPieces++;
// 					}
// 				});
//
// 				//end game
// 				if (correctPieces === positions.length) {
//
// 					//stop timer
// 					clearInterval(timer);
//
// 					//display message
// 					$("<p/>", {
// 						text: "Congratulations, You solved the puzzle!"
// 					}).appendTo("#ui");
//
// 					//convert time to seconds
// 					var totalSeconds = (currentTime.hours * 60 * 60) + (currentTime.minutes * 60) + currentTime.seconds;
//
// 					//is there a saved best time?
// 					if (localStorage.getItem("puzzlebesttime")) {
// 						var bestTime = localStorage.getItem("puzzlebesttime");
//
// 						if (totalSeconds < bestTime) {
// 							//save new best time
// 							localStorage.setItem("puzzlebesttime", totalSeconds);
//
// 							$("<p/>", {
// 								text: "Your current best time record!"
// 							}).appendTo("#ui");
// 						}
// 					} else {
// 						//save current time
// 						localStorage.setItem("puzzlebesttime", totalSeconds);
//
// 						//display another message
// 						$("<p/>", {
// 							text: "You got a new best time!"
// 						}).appendTo("#ui");
// 					}
// 				}
// 			}
// 		});
//
// 		//helper to generate location
// 		function getPosition(el) {
// 			return {
// 				top: parseInt(el.css("top")),
// 				bottom: parseInt(el.css("top")) + pieceH,
// 				left: parseInt(el.css("left")),
// 				right: parseInt(el.css("left")) + pieceW
// 			}
// 		}
// 	});
// });


	// console.log(puzzles);
	// const arr = ['a','b','c','d','e','1','2','3','4','5'];
	// for (let i = 5; i < arr.length; i++) {
	// 	let j = Math.floor(Math.random() * puzzles.length)
	// 		if (j <= 5) {
	// 		}
	//}





