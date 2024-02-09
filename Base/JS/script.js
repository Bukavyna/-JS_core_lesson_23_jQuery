"use strict"

$(document).ready(function () {

	const puzzle = $('.puzzle');
	const leftBox = $('#box-left');
	const rightBox = $('#box-right');
	const imageUrl = `url("Images/puzzle.jpg")`;
	const pieces = 16;
	let number;

	// Ініціалізація гри
	function initializeGame() {
		leftBox.empty();
		rightBox.empty();

		for (let i = 0; i < pieces; i++) {
			const piece = $('<div class="puzzle"></div>');
			let number = $('<div class="number"></div>').text(i + 1);
			piece.css({
				backgroundImage: imageUrl,
				backgroundPosition: `-${i % 4 * 50}px -${Math.floor(i / 4) * 50}px`
			});

			piece.append(number);
			leftBox.append(piece);
		}

		// Перетягування
		$('.box').sortable({
			connectWith: '#box-left, #box-right',
			containment: '.block-puzzles'
		});
	}

	initializeGame();

	// Перемішування
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
	const radioButtons = $('.radio');

	// Кнопка старт, початок гри
	startBtn.on('click', () => {
		$('.puzzle').css({
			pointerEvents: 'auto'
		});
		startBtn.css({backgroundColor: '#EE8683'});
		leftBox.children().shuffle();
		startBtn.prop('disabled', true);
		checkBtn.prop('disabled', false);
		radioButtons.prop('disabled', true);
		startTimer();
	});

	const slideBtnCheck = $('#info_slide-check_btn-check');
	const slideBtnClose = $('#info_slide-check_btn-close');
	let slideCheck = $('.info_modal');
	let slideCheckText = $('.info_modal_text');

	// Кнопка для відкриття модального вікна і інформації
	checkBtn.prop('disabled', true);
	checkBtn.on('click', () => {
		checkBtn.css({backgroundColor: '#EE8683'});
		slideCheck.show();
		modalContainer.css({
			display: 'block',
			opacity: 0.5
		})
	});

	// Кнопка встановлення нової гри
	newBtn.on('click', () => {
		startBtn.css({backgroundColor: '#EB4446'});
		checkBtn.css({backgroundColor: '#EB4446'});
		startBtn.prop('disabled', false);
		checkBtn.prop('disabled', true);
		radioButtons.prop('disabled', false);
		clearInterval(countdown);
		initializeGame();
		updateTimer();
	});

	let text2 = $('.text2');
	let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
	let check = true;
	let countdown;

	// Кнопка для інформації
	slideBtnCheck.on('click', () => {
		for (let i = 0; i < $('.number').length; i++) {
			if ($('.number').eq(i).text() != numbers[i]) {
				check = false;
				break;
			}
		}
		if (check) {
			text2.text('Woohoo, well done you did it!');
			slideBtnCheck.hide();
			slideCheckText.hide();
			text2.show();
			clearInterval(countdown);
		}
		else {
			check = true;
			slideBtnCheck.hide();
			text2.show();
			text2.text('Its a pity, but you lost');
			slideCheckText.hide();
		}
	});

	// Кнопка для закриття модального вікна
	slideBtnClose.on('click', () => {
		modalContainer.hide();
		slideCheck.hide();
		slideBtnCheck.show();
		text2.hide();
		slideCheckText.show();
	})

	let seconds = 60;

	// Оновлює значення таймера відповідно до обраної радіокнопки
	function updateTimer() {
		const selectedRadio = $('input[name="time"]:checked');
		seconds = parseInt(selectedRadio.val());
		showTimer.text(formatTime(seconds));
	}

	// Функція яка форматує час в хвилини та секунди
	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
	}

	// Функція яка запускає таймер
	function startTimer() {
		countdown = setInterval(() => {
			seconds--;
			showTimer.text(formatTime(seconds));
			if (seconds === 0) {
				clearInterval(countdown);
				showModal();
			}
		}, 1000);
	}

	// Обробники подій для радіокнопок
	radioButtons.change(updateTimer);

	// Викликаємо updateTimer для початкового встановлення значень
	updateTimer();

	// Функція яка інформує що чаз вийшов
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