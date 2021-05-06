var pykalanro = 0;
var lukunro = 0;
var esivu = "";

function openPopupWindow(theURL,winName,features) {
  window.open(theURL,winName,features);
}

function ahah(url,target) {
  document.getElementById(target).innerHTML = 'loading data...';
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {ahahDone(target);};
    req.open("GET", url, true);
    req.send(null);
  }
  else if (window.ActiveXObject) {
    req = new ActiveXObject("Microsoft.XMLHTTP");
    if (req) {
      req.onreadystatechange = function() {ahahDone(target);};
      req.open("GET", url, true);
      req.send();
    }
  }
}

function ahahDone(target) {
   // only if req is "loaded"
   if (req.readyState == 4) {
       // only if "OK"
       if (req.status == 200 || req.status == 304) {
           results = req.responseText;
           document.getElementById(target).innerHTML = results;
           pykalajutut();
       }
       else {
           document.getElementById(target).innerHTML="ahah error:\n" + req.statusText;
       }
   }
}

function pykalajutut() {
	alkupiilotus();
	if (pykalanro > 0) {
		var pykid = "pyk" + pykalanro;
		var pyk = document.getElementById(pykid);
		pyk.className = "toc_7taso_auki";
		aukaiseParent(pyk);
	}
	skrollaa_kohtaan();
}

function skrollaa_kohtaan() {
	if (window.location.search) {
		if (window.location.search != "") {
			var get = window.location.search.substr(1).split("&")
			for (var i = 0; i < get.length; i++) {
				var valuepair = get[i].split("=");
				if (valuepair[0] == 'c') {
					var id = "L" + valuepair[1];
					var obj = document.getElementById(id);
					var y = 0;
					if (obj.offsetParent) {
						do {
							y += obj.offsetTop;
						} while (obj = obj.offsetParent);
					}
					if (y > 0) {
						var ysize = 0;
						// All except Explorer
						if (self.innerHeight) {
							ysize = self.innerHeight;
						}
						// Explorer 6 Strict Mode
						else if (document.documentElement && document.documentElement.clientHeight) {
							ysize = document.documentElement.clientHeight;
						}
						// Other Explorers
						else if (document.body) {
							ysize = document.body.clientHeight;
						}
						if (y > ysize) {
							location.hash = id;
						}
						//alert("y = " + y + ", ysize = " + ysize + ", id = " + id);
					}
				}
			}
		}
	}
}

function esivujutut() {
	alkupiilotus();
	if (esivu.substring(0, 8) == "johdanto") {
		var johdid = esivu;
		var johd = document.getElementById(johdid);
		aukaiseParent(johd);
	}
}

function alkupiilotus() {
	var pysty = document.getElementById("pystynavigaatio");
  var elements = pysty.getElementsByTagName("div");
  for (i = 0; i < elements.length; i++) {
		if (elements[i].className == "toc_1taso_cont") {
			elements[i].className = "toc_1taso_cont_hide";
		}
		else  if (elements[i].className == "toc_2taso_cont") {
			elements[i].className = "toc_2taso_cont_hide";
		}
		else  if (elements[i].className == "toc_3taso_cont") {
			elements[i].className = "toc_3taso_cont_hide";
		}
		else  if (elements[i].className == "toc_4taso_cont") {
			elements[i].className = "toc_4taso_cont_hide";
		}
		else  if (elements[i].className == "toc_5taso_cont") {
			elements[i].className = "toc_5taso_cont_hide";
		}
		else  if (elements[i].className == "toc_6taso_cont") {
			elements[i].className = "toc_6taso_cont_hide";
		}
  }
	if (lukunro > 0 && lukunro < 43) {
		var lukuID = 'L' + lukunro;
		var lukuNode = document.getElementById(lukuID);
		lukuNode.className = "toc_2taso_cont";
		aukaiseParent(lukuNode);
	}
}

function aukaiseParent(node) {  
  var parent = node.parentNode;
  if (parent.className == "toc_6taso_cont_hide") {
    parent.className = "toc_6taso_cont";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_5taso_cont_hide") {
    parent.className = "toc_5taso_cont";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_4taso_cont_hide") {
    parent.className = "toc_4taso_cont";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_3taso_cont_hide") {
    parent.className = "toc_3taso_cont";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_2taso_cont_hide") {
    parent.className = "toc_2taso_cont";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_1taso_cont_hide") {
    parent.className = "toc_1taso_cont";
    aukaiseParent(parent);
  }
}

function aukaiseParent2(node) {  
  var parent = node.parentNode;
  if (parent.className == "toc_6taso_cont") {
    parent.className = "toc_6taso_cont_auki";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_5taso_cont") {
    parent.className = "toc_5taso_cont_auki";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_4taso_cont") {
    parent.className = "toc_4taso_cont_auki";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_3taso_cont") {
    parent.className = "toc_3taso_cont_auki";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_2taso_cont") {
    parent.className = "toc_2taso_cont_auki";
    aukaiseParent(parent);
  }
  else if (parent.className == "toc_1taso_cont") {
    parent.className = "toc_1taso_cont_auki";
    aukaiseParent(parent);
  }
}

function toggle(layerId) {
  if (document.getElementById(layerId).className == "toc_1taso_cont") {
    document.getElementById(layerId).className = "toc_1taso_cont_hide";
  }
  else  if (document.getElementById(layerId).className == "toc_2taso_cont") {
    document.getElementById(layerId).className = "toc_2taso_cont_hide";
  }
  else  if (document.getElementById(layerId).className == "toc_3taso_cont") {
    document.getElementById(layerId).className = "toc_3taso_cont_hide";
  }
  else  if (document.getElementById(layerId).className == "toc_4taso_cont") {
    document.getElementById(layerId).className = "toc_4taso_cont_hide";
  }
  else  if (document.getElementById(layerId).className == "toc_5taso_cont") {
    document.getElementById(layerId).className = "toc_5taso_cont_hide";
  }
  else  if (document.getElementById(layerId).className == "toc_6taso_cont") {
    document.getElementById(layerId).className = "toc_6taso_cont_hide";
  }
  else  if (document.getElementById(layerId).className == "toc_1taso_cont_hide") {
    document.getElementById(layerId).className = "toc_1taso_cont";
  }
  else  if (document.getElementById(layerId).className == "toc_2taso_cont_hide") {
    document.getElementById(layerId).className = "toc_2taso_cont";
  }
  else  if (document.getElementById(layerId).className == "toc_3taso_cont_hide") {
    document.getElementById(layerId).className = "toc_3taso_cont";
  }
  else  if (document.getElementById(layerId).className == "toc_4taso_cont_hide") {
    document.getElementById(layerId).className = "toc_4taso_cont";
  }
  else  if (document.getElementById(layerId).className == "toc_5taso_cont_hide") {
    document.getElementById(layerId).className = "toc_5taso_cont";
  }
  else  if (document.getElementById(layerId).className == "toc_6taso_cont_hide") {
    document.getElementById(layerId).className = "toc_6taso_cont";
  }
}
function showall() {
  var elements = document.getElementsByTagName("div");
  for (i = 0; i < elements.length; i++){
    if (elements[i].className == "toc_1taso_cont" || elements[i].className == "toc_2taso_cont" || elements[i].className == "toc_3taso_cont" || elements[i].className == "toc_4taso_cont" || elements[i].className == "toc_5taso_cont" || elements[i].className == "toc_6taso_cont") {
      elements[i].style.display = "";
    }
  } 
}
function hideall() {
  var pysty = document.getElementById("pystynavigaatio");
  var elements = pysty.getElementsByTagName("div");
  for (i = 0; i < elements.length; i++) {
    if (elements[i].className == "toc_1taso_cont") {
      elements[i].className = "toc_1taso_cont_hide";
    }
    else  if (elements[i].className == "toc_2taso_cont") {
      elements[i].className = "toc_2taso_cont_hide";
    }
    else  if (elements[i].className == "toc_3taso_cont") {
      elements[i].className = "toc_3taso_cont_hide";
    }
    else  if (elements[i].className == "toc_4taso_cont") {
      elements[i].className = "toc_4taso_cont_hide";
    }
    else  if (elements[i].className == "toc_5taso_cont") {
      elements[i].className = "toc_5taso_cont_hide";
    }
    else  if (elements[i].className == "toc_6taso_cont") {
      elements[i].className = "toc_6taso_cont_hide";
    }
  } 
}

function plusminus(elemId) {
	var a = document.getElementById(elemId).innerHTML;
	if (a.charAt(a.length - 2) == '+') {
		a = a.substr(0, a.lastIndexOf('[')) + '[&#8211;]';
	}
	else {
		a = a.substr(0, a.lastIndexOf('[')) + '[+]';
	}
	document.getElementById(elemId).innerHTML = a;
}

var xhr = false;
var elemid = "";
var divid = "";
var alinkid = "";

function makeRequest(elem, number) {
	var url = "data/sispalkki_" + number + ".php";
	elemid = "span_" + number;
	divid = "L" + number;
	alinkid = "alink" + number;
	if (elem.getAttribute("href") == "javascript:void(0);") {
		toggle(divid);
		return false;
	}
	else {
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}
		else {
			if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e) {
				}
			}
		}
		
		if (xhr) {
			xhr.onreadystatechange = showContents;
			xhr.open("GET", url, true);
			xhr.send(null);
			return false;
		}
		else {
			return true;
		}
	}
}

function showContents() {
	var result;
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			result = xhr.responseText;
			document.getElementById(elemid).innerHTML = result;
			var div = document.getElementById(divid);
			var elements = div.getElementsByTagName("div");
			for (i = 0; i < elements.length; i++) {
				if (elements[i].className == "toc_3taso_cont") {
					elements[i].className = "toc_3taso_cont_hide";
				}
				else  if (elements[i].className == "toc_4taso_cont") {
					elements[i].className = "toc_4taso_cont_hide";
				}
				else  if (elements[i].className == "toc_5taso_cont") {
					elements[i].className = "toc_5taso_cont_hide";
				}
				else  if (elements[i].className == "toc_6taso_cont") {
					elements[i].className = "toc_6taso_cont_hide";
				}
			}
			//var jsstring = 'toggle("' + divid + '")';
			var elem = document.getElementById(alinkid);
			//elem.setAttribute("onclick", jsstring);
			//elem.onClick = jsstring;
			//elem.setAttribute("title", jsstring);
			elem.setAttribute("href", "javascript:void(0);");
		}
	}
}