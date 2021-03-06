(function(){

var $ = function(selector, elem) {
  return (elem || document).querySelector(selector);
};

var $$ = function(selector, elem) {
  var elems = (elem || document).querySelectorAll(selector);
  var elemArr = [];
  for (var i = 0; i < elems.length; i++) {
    elemArr.push(elems[i]);
  }
  return elemArr;
};

var $c = function(tag) {
  return document.createElement(tag);
}

var click = function(elem) {
  var event = document.createEvent("MouseEvents");
  event.initEvent("click", false, true);
  elem.dispatchEvent(event);
}

var willFlash = true;

var selectLists = $('.style1');

var typeSelectorLabel = $c('span');
typeSelectorLabel.style.cssText =
  $('.style1 > span').style.cssText;
typeSelectorLabel.textContent = '学部（共通教育）';

var typeSelector = $c('select');
typeSelector.style.cssText = $('#Dropdownlist2').style.cssText;
typeSelector.style.backgroundColor = 'firebrick';

selectLists.insertBefore(
  typeSelector, $('#Dropdownlist2').nextSibling);
selectLists.insertBefore(
  typeSelectorLabel, $('#Dropdownlist2').nextSibling);
selectLists.insertBefore(
  $c('br'), $('#Dropdownlist2').nextSibling);

$$('#RadioButtonList1 label').forEach(function(elem){
  var opt = $c('option');
  var value = elem.getAttribute('for');
  if ($('#'+value).checked)
    opt.setAttribute('selected', 'true');
  opt.textContent = elem.textContent;
  opt.setAttribute('value', value);
  typeSelector.appendChild(opt);
});

if ($('#'+typeSelector.value).checked === false) {
  var elem = $('#'+typeSelector.value);
  elem.checked = true;
  if (elem.getAttribute('onclick')) {
    willFlash = false;
    location.href = elem.getAttribute('onclick');
  }
}

typeSelector.addEventListener('change', function(){
  var elem = $('#'+typeSelector.value);
  elem.checked = true;
  if (elem.getAttribute('onclick')) {
    willFlash = false;
    location.href = elem.getAttribute('onclick');
  }
});

var timeTableCels = $$('[id*=Label').filter(function(elem){
  return (elem.id.match(/^Label\d{2}$/));
});

timeTableCels.forEach(function(elem){
  var wday = elem.id.match(/^Label(\d)\d/)[1];
  var hour = elem.id.match(/^Label\d(\d)/)[1];
  elem.addEventListener('click', function(){
    var param = {wday: wday, hour: hour};
    localStorage['param'] = JSON.stringify(param);
    $$('[name="RadioButtonList2"]').forEach(function(elem){
      if (elem.value == wday) {
        elem.checked = true;
        if (elem.getAttribute('onclick')) {
          willFlash = false;
          location.href = elem.getAttribute('onclick');
        }
      }
    });
    $$('[name="RadioButtonList3"]').forEach(function(elem){
      if (elem.value == hour) {
        elem.checked = true;
        if (elem.getAttribute('onclick')) {
          willFlash = false;
          location.href = elem.getAttribute('onclick');
        }
      }
    });
  });
});

if (localStorage['param']) {
  var param = JSON.parse(localStorage['param']);
  var selWdayRadio = $('[name="RadioButtonList2"]:checked');
  if (!(selWdayRadio && selWdayRadio.value == param.wday)) {
    $$('[name="RadioButtonList2"]').forEach(function(elem){
      if (elem.value == param.wday) {
        elem.checked = true;
        if (elem.getAttribute('onclick')) {
          willFlash = false;
          location.href = elem.getAttribute('onclick');
        }
      }
    });
  }
  var selHourRadio = $('[name="RadioButtonList3"]:checked');
  if (selHourRadio && selHourRadio.value == param.hour) {
    delete localStorage['param'];
  } else {
    $$('[name="RadioButtonList3"]').forEach(function(elem){
      if (elem.value == param.hour) {
        elem.checked = true;
        if (elem.getAttribute('onclick')) {
          willFlash = false;
          location.href = elem.getAttribute('onclick');
        }
      }
    });
  }
}

$('#Button3').addEventListener('click', function(){
  willFlash = false;
});
$('#ListBox1').addEventListener('click', function(){
  willFlash = false;
});

window.onbeforeunload = function(e){
  if (willFlash)
    return '申し込みボタンを押しましたか？\n押さないと登録されません！';
  return;
};

})();
