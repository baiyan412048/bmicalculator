var bmiBtnOn = document.getElementById('bmi-btn-on');
var bmiBtnClose = document.getElementById('bmi-btn-close');

var bmiNumber = document.getElementById('bmi-number');
var loopClass = document.getElementById('loopClass');
var mass = document.getElementById('bmiMassName');

var data = JSON.parse(localStorage.getItem('BMI')) || [];
var toDay = new Date();
upData(data);

bmiBtnOn.addEventListener('click', setBmi);
bmiBtnClose.addEventListener('click', setBmi);
// bmiBtnOn.addEventListener('click', setBmi);

// var Today = new Date();
// document.write("今天日期是 " + Today.getFullYear() + " 年 " + (Today.getMonth() + 1) + " 月 " + Today.getDate() + " 日");
//('0'+ Today.getMonth()).substr(-2); 補 0
// 轉物件 JSON.parse
// 轉字串 JSON.stringify

//計算BMI及記錄至localStorage
function setBmi() {
  var h = document.getElementById('height').value;
  var w = document.getElementById('weight').value;
  var bmi = JSON.stringify(Math.ceil(w / ((h / 100) * (h / 100)) * 100) / 100);
  var toDay = new Date();
  var newDate = ('0' + (toDay.getMonth() + 1)).substr(-2) + '-' + ('0' + toDay.getDate()).substr(-2) + '-' + toDay.getFullYear();

  var bmiList = {
    cm: h,
    kg: w,
    bmiMass: bmi,
    date: newDate,
  };

  data.push(bmiList);
  localStorage.setItem('BMI', JSON.stringify(data));

  document.querySelector('.bmi-btn-show').style.display = "none";
  document.querySelector('.bmi-btn-none').style.display = "flex";
  upData(data);
};


// 新增測驗結果
function upData(txt) {

  str = '';
  var len = txt.length;
  var bmiList = document.querySelector('.bmilist');

  for (i = 0; len > i; i++) {
    //bmi list
    var bmiMassName = '';
    var bmiMassClass = '';
    //bmi calculator btn
    var bmiBtnMassClass = '';
    var bmiBtnClass = '';
    var loop = '';
    
    var num = txt[i].bmiMass;
    massName = '';

    if (18.5 < num && num <= 26) {
      bmiMassName = '理想';
      bmiMassClass = 'm'
      bmiBtnMassClass = 'm-p';
      bmiBtnClass = 'm-bmi-btn';
      loop = 'm-loop';
    } else if (26 < num && num <= 31) {
      bmiMassName = '過重';
      bmiMassClass = 'l'
      bmiBtnMassClass = 'l-p';
      bmiBtnClass = 'l-bmi-btn';
      loop = 'l-loop';
    } else if (31 < num && num <= 36) {
      bmiMassName = '輕度肥胖';
      bmiMassClass = 'xl'
      bmiBtnMassClass = 'xl-p';
      bmiBtnClass = 'xl-bmi-btn';
      loop = 'xl-loop';
    } else if (36 < num && num <= 41) {
      bmiMassName = '中度肥胖';
      bmiMassClass = 'xl'
      bmiBtnMassClass = 'xl-p';
      bmiBtnClass = 'xl-bmi-btn';
      loop = 'xl-loop';
    } else if (41 < num) {
      bmiMassName = '重度肥胖';
      bmiMassClass = 'xxl'
      bmiBtnMassClass = 'xxl-p';
      bmiBtnClass = 'xxl-bmi-btn';
      loop = 'xxl-loop';
    } else {
      bmiMassName = '過輕';
      bmiMassClass = 's'
      bmiBtnMassClass = 's-p';
      bmiBtnClass = 's-bmi-btn';
      loop = 's-loop';
    };

    str += '<li class="' + bmiMassClass + '"><p>' + bmiMassName + '</p><p><span>BMI</span>' + txt[i].bmiMass + '</p><p><span>weight</span>' + txt[i].kg + 'kg</p><p><span>height</span>' + txt[i].cm + 'cm</p><span>' + txt[i].date + '</span></li>';
    //bmi calculator btn event
    massName += bmiMassName;
    mass.textContent = massName;
    mass.className = bmiBtnMassClass;
    //bmi calculator btn
    bmiNumber.textContent = txt[i].bmiMass;
    bmiBtnClose.className = bmiBtnClass;
    loopClass.className = loop;
  };

  bmiList.innerHTML = str;
};
upData(data);

// 清空input
var hei = document.getElementById('height');
var wei = document.getElementById('weight');

hei.addEventListener('focus', change);
wei.addEventListener('focus', change);

function change() {

  if (this.value !== '') {
    this.value = '';
  };

};