let wrapperMenu = document.querySelector('.wrapper-menu')
let menuInfo = document.querySelector('.menu__info')
let hidden = document.querySelector('body')
let scroll = document.querySelector('.scroll');

document.querySelector('.filter-content__sorting-text').onclick = function filterSorting(event) {
	event.preventDefault();
	document.querySelector('.filter-contents__sorting').classList.toggle('open-filters');
	document.querySelector('.filter-content__sorting-text a').classList.toggle('close-filteres');
}
document.querySelector('.filter-content__price-text a').onclick = function filterSorting(event) {
	event.preventDefault();
	document.querySelector('.filter-contents__price').classList.toggle('open-filter');
	document.querySelector('.filter-content__price-text a').classList.toggle('close-filter');
}
document.querySelector('.filter-content__color-text a').onclick = function filterSorting(event) {
	event.preventDefault();
	document.querySelector('.filter-content__color-info').classList.toggle('open-filter');
	document.querySelector('.filter-content__color-text a').classList.toggle('close-filter');
}
document.querySelector('.filter-content__volume-liters-text a').onclick = function filterSorting(event) {
	event.preventDefault();
	document.querySelector('.filter-contents__volume-liters').classList.toggle('open-filter');
	document.querySelector('.filter-content__volume-liters-text a').classList.toggle('close-filter');
}
document.querySelector('.filter-content__save-text a').onclick = function filterSorting(event) {
	event.preventDefault();
	document.querySelector('.filter-contents__save').classList.toggle('open-filter');
	document.querySelector('.filter-content__save-text a').classList.toggle('close-filter');
}
document.querySelector('.close-filter-content a').onclick = function filterSorting(event) {
	event.preventDefault();
	document.querySelector('.filter-content').classList.toggle('close-filters');
	hidden.classList.toggle('hidden');
}
document.querySelector('.basket').onclick = function basket(event) {
	event.preventDefault();
	document.querySelector('.mini-cart').classList.toggle('close-basket');
} 
// document.querySelector('.closes-basket').onclick = function closesBasket(event) {
// 	event.preventDefault();
// 	document.querySelector('.mini-cart').classList.toggle('close-basket');
// } 
wrapperMenu.addEventListener('click', function () {
	wrapperMenu.classList.toggle('open')
	menuInfo.classList.toggle('active')
	hidden.classList.toggle('hidden')
})

scroll.onclick = function scrollUpfunction() {
	document.body.scrollTop = 0
	document.documentElement.scrollTop = 0
}
// let swiper = new Swiper('.swiper-container', {
// 	direction: 'vertical',
// 	spaceBetween: 30,
// 	effect: 'fade',
// 	pagination: {
// 		el: '.swiper-pagination',
// 		clickable: true,
// 	},
// 	autoplay: {
// 		delay: 3000,
// 		disableOnInteraction: false,
// 	},
// });
let cart = {};
function init(){
	$.getJSON("goods.json", goodsOut );
}
function goodsOut(data){
	let out = '';
	for(let key in data){
		out +=`<div class="content__block ${data[key].color}" data-price="${data[key].costs}" data-rating="${data[key].rating}" data-volume="${data[key].volume}" data-discountPercentage="${data[key].discountPercentage}">`;
		out +='<div class="content__block-img">';
		out +='<div class="content__block-imgs">';
		out +=`<a href="#"> <img src="${data[key].img}"></a>`;
		out +=`<h2 class=${data[key].discount}>${data[key].discountPercentage}</h2>`;
		out +='</div>';
		out +='</div>';
		out +='	<div class="content__block-text">';
		out +=`<a href="#"><h3>${data[key].name}</h3></a>`;

		out +=`<div class="discounts-content"><a href="#" class=${data[key].discount}><h3>€ ${data[key].costs}</h3></a>`;
		out +=`<a href="#" class=${data[key].discount}><p>€ ${data[key].cost}</p></a></div>`;
		out +=`<button class="add-to-cart" data-id="${key}">Добавить в корзину</button>`;
		out +='</div>';
		out +='</div>';
	}
	let containerMain = document.querySelector('.container__main');
	$(containerMain).html(out);
	$('.add-to-cart').on('click', addToCart);
}
function insertAfter(elem, refElem) {
	refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}
document.querySelector('button.sort-asc').onclick = function () {
	sortList('data-price');
}
document.querySelector('button.sort-desc').onclick = function () {
	sortListDesc('data-price');

document.querySelector('button.sort-recommendation').onclick = function () {
	sortListDesc('data-rating');
}
document.querySelector('button.sort-discountpercentage').onclick = function () {
	sortListDesc('data-rating');
}
}
function sortList(sortType) {
	let items = document.querySelector('.container__main');
	for (let i = 0; i < items.children.length - 1; i++) {
		for (let j = i; j < items.children.length; j++) {
			if (+items.children[i].getAttribute(sortType) > +items.children[j].getAttribute(sortType)) {
					console.log(1);
					let replacedNode = items.replaceChild(items.children[j], items.children[i]);
					insertAfter(replacedNode, items.children[i]);
			}
		}
	}
}
function sortListDesc(sortType) {
	let items = document.querySelector('.container__main');
	for (let i = 0; i < items.children.length - 1; i++) {
		for (let j = i; j < items.children.length; j++) {
			if (+items.children[i].getAttribute(sortType) < +items.children[j].getAttribute(sortType)) {
					console.log(1);
					let replacedNode = items.replaceChild(items.children[j], items.children[i]);
					insertAfter(replacedNode, items.children[i]);
			}
		}
	}
}
function insertAfter(elem, refElem) {
	return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

function addToCart() {

	let id = $(this).attr('data-id');

	if(cart[id] == undefined){
		cart[id]= 1;
	}else{
		cart[id]++;
	}
	showMinCart();
	saveCart();
}
function saveCart(){
	localStorage.setItem('cart' , JSON.stringify(cart));
}
function showMinCart(){
	if(!isEmply(cart)){
		document.querySelector('.mini-cart').classList.toggle('close-basket');
	}else{
	$.getJSON('goods.json', function (data) {
		let goods = data;
		let out = '';
		let suma = 0;
		out +=`<div><p class="name-basket">Корзина</p></div>`;
		for(let id in cart){
			out +='<div class="main-carts">';
			out +=`<div class="main-cart-img"><img src="${goods[id].img}" alt=""></div>`;
			out +=`<div class="main-cart-name"><p>${goods[id].name}</p></div>`;
			out +=`<div class="main-cart-key"><a href="#"  data-id="${id}" class="minus-goods">&ndash;</a><p>${cart[id]}</p><a href="#"  data-id="${id}" class="plus-goods">+</a></div>`;
			out +=`<div class="main-cart-cost"><p>€ ${cart[id]*goods[id].cost}</p></div> `;
			out +=`<div class="main-cart-delete" " ><a href="#" data-id="${id}" class="del-goods"><img src="img/icon/close_cross_icon_128690.svg" alt=""></a></div>`;
			out +=`</div>`;
		}
		out +=`<div class="sum-tow"><p></p></div>`;
		out +=`<div сlass="open-basket" style="margin-top: 20px;">	<div class="best-silling__save"><a href="cart.html">Перейти в корзину<svg class="svg-button"><rect></rect></svg></a></div></div>`;
		for(let id in cart){
			suma += cart[id]*goods[id].cost;
		}
		$('.sum-tow з').html(suma);
		$('.mini-cart').html(out);
		$('.del-goods').on('click', delGoods);
		$('.minus-goods').on('click', minusGoods);
		$('.plus-goods').on('click', plusGoods);
	})
	}
}
function delGoods(){
	let id = $(this).attr('data-id');
	delete cart[id];
	saveCart();
	showMinCart();
}
function plusGoods(){
	let id = $(this).attr('data-id');
	cart[id]++;
	saveCart();
	showMinCart();
}
function minusGoods(){
	let id = $(this).attr('data-id');
	if (cart[id]== 1) {
		delete cart[id];
	}else{
		cart[id]--;
	}
	saveCart();
	showMinCart();
}
function isEmply(object){
	for(let key in object){
		if (object.hasOwnProperty(key)) return true;
		return false;
	}
}
function loadCart(){
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
		showMinCart();
	}
}
function filterColor(){
	$.getJSON('goods.json', function (data) {
	const filterColr = document.querySelectorAll('.filtercolr');
	let filterBoxColors = document.querySelector('.container__main');
	function filter (category, items) {
		items.forEach((item) => {
			const isItemFiltered = !item.classList.contains(category)
			const isShowAll = category.toLowerCase() === 'all'
			if (isItemFiltered && !isShowAll) {
				item.classList.add('hide-filter-color')
				$('.active-filters p').text(' ');
			} else {
				item.classList.remove('hide-filter-color')
			}
		})
}
filterColr.forEach((li) => {
			li.addEventListener('click', () =>{ 
				let newFilterCol =[];
				for(let i = 0; i < filterBoxColors.children.length; i++){
					newFilterCol[i] = filterBoxColors.children[i];
				}
				let currentCategory = li.dataset.flcolor
				filter(currentCategory, newFilterCol)
				$('.active-filters div').text(currentCategory);
			});
		});
	})
	}
filterColor();
function filterPrice(){
	document.querySelector('.filter-content__price-input-text button').onclick = function(){
		let fromPrice = Number.parseInt(document.querySelector('.from-price').value);
		let beforePrice = Number.parseInt(document.querySelector('.before-price').value);
		let filterBoxColors = document.querySelector('.container__main');
		let newFilterCol =[];
		for(let i = 0; i < filterBoxColors.children.length; i++){
			newFilterCol[i] = filterBoxColors.children[i];
			let currentCategory = Number.parseInt(newFilterCol[i].dataset.price);
			console.log(newFilterCol[i])
			if (fromPrice <= currentCategory && beforePrice >= currentCategory) {
				newFilterCol[i].style.display="flex"
			}else
			{
				newFilterCol[i].style.display="none"
			}
			document.querySelector('.all-close').onclick = function(){
				let filterBoxColors = document.querySelector('.container__main');
				let newFilterCol =[];
				for(let i = 0; i < filterBoxColors.children.length; i++){
					newFilterCol[i] = filterBoxColors.children[i];
					newFilterCol[i].style.display= "flex"
				}
				
			}
		}

	}

}
filterPrice();
function filterVolume(){
	document.querySelector('.filter-content__volume-liters-input-text button').onclick = function(){
		let fromPrice = Number.parseInt(document.querySelector('.from-prices').value);
		let beforePrice = Number.parseInt(document.querySelector('.before-prices').value);
		let filterBoxColors = document.querySelector('.container__main');
		let newFilterCol =[];
		for(let i = 0; i < filterBoxColors.children.length; i++){
			newFilterCol[i] = filterBoxColors.children[i];
			let currentCategory = Number.parseInt(newFilterCol[i].dataset.volume);
			console.log(beforePrice)
			if (fromPrice <= currentCategory && beforePrice >= currentCategory) {
				newFilterCol[i].style.display="flex"
			}else
			{
				newFilterCol[i].style.display="none"
			}
		}
	}
}
filterVolume();
function filterDiscountPercentage(){
	document.querySelector('.filter-content__save-title a').onclick = function(){
		let filterBoxColors = document.querySelector('.container__main');
		let newFilterCol =[];
	for(let i = 0; i < filterBoxColors.children.length; i++){
		newFilterCol[i] = filterBoxColors.children[i];
		let discountPercentage = document.querySelectorAll('.content__block-imgs h2');
		if(discountPercentage[i].textContent == "30%" ){
			newFilterCol[i].style.display= "flex"
		}else{
			newFilterCol[i].style.display= "none"
		}
		}
	}
}
filterDiscountPercentage();

function filterDiscountPercentages(){
	document.querySelector('.filter-content__save-titles a').onclick = function(){
		let filterBoxColors = document.querySelector('.container__main');
		let newFilterCol =[];
	for(let i = 0; i < filterBoxColors.children.length; i++){
		newFilterCol[i] = filterBoxColors.children[i];
		let discountPercentage = document.querySelectorAll('.content__block-imgs h2');
		if(discountPercentage[i].textContent == "15%"){
			newFilterCol[i].style.display= "flex"
		}else{
			newFilterCol[i].style.display= "none"
		}
		}
	}
}
filterDiscountPercentages();
$(document).ready(function (){
	init();
	loadCart();
});
