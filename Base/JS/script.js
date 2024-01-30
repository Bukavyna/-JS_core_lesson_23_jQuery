"use strict"

$(document).ready(function () {

	const puzzleBox = document.getElementById('box-left');
	// const imageUrl = 'url("Images/puzzle.jpg")'
// console.log(imageUrl);
// 	const pieces = 16;

	// for (let i = 0; i < pieces; i++) {
	// 	const piece = document.createElement('div');
	// 	piece.classList.add('puzzle-piece');
	// 	piece.style.backgroundImage = imageUrl;
	// 	piece.style.backgroundPosition = `-${i % 4 * 50}px -${Math.floor(i / 4) * 50}px`;
	// 	piece.addEventListener('mousedown', startDragging);
	// 	puzzleBox.appendChild(piece);
	// }

	let activePiece = null;

	function startDragging(event) {
		activePiece = this;
		activePiece.classList.add('dragging');
		activePiece.style.zIndex = '1';
		document.addEventListener('mousemove', dragPiece);
		document.addEventListener('mouseup', stopDragging);
	}

	function dragPiece(event) {
		console.log(event);
		if (activePiece) {
			activePiece.style.left = event.pageX + 'px';
			activePiece.style.top = event.pageY + 'px';
		}
	}

	function stopDragging() {
		if (activePiece) {
			// activePiece.classList.remove('dragging');
			activePiece.style.zIndex = '0';
			activePiece = null;
			// document.removeEventListener('mousemove', dragPiece);
			// document.removeEventListener('mouseup', stopDragging);
		}
	}
})