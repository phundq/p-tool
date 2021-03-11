let container = document.getElementById("container");
let searchBtn = document.getElementById("searchBtn");
let clearBtn = document.getElementById("clearBtn");
let searchText = document.getElementById("searchText");
let tabHeaders = document.querySelectorAll(".tab-header");
let sqlString = document.getElementById("sqlString");
let sqlResult = document.getElementById("sqlResult");
let clearSqlParamBtn = document.getElementById("clearSqlParamBtn");

var imgURL = chrome.runtime.getURL("assets/images/background.png");
container.style.background = "url(" + encodeURI(imgURL) + ")";

searchText.addEventListener("keyup", async (e) => {
  if (e.key === 'Enter') {
    if (searchText?.value) {
      search(searchText.value);
    }
  }
})

clearBtn.addEventListener("click", async () => {
  searchText.value = "";
})

searchBtn.addEventListener("click", async () => {
  search(searchText.value);
});

search = (text) => {
  let newURL = "https://www.google.com/search?q=" + text + " site%3Astackoverflow.com";
  chrome.tabs.create({ url: newURL })
}

activeTab(tabHeaders[0].id)
tabHeaders.forEach((tabHeader) => {
  tabHeader.addEventListener("click", (e) => {
    console.log(tabHeader.id);

    activeTab(tabHeader.id)
  })
})

function activeTab(id) {
  tabHeaders.forEach((tabHeader) => {
    if (tabHeader.id == id) {
      tabHeader.classList.add("active")
      document.getElementById(tabHeader.id + '-area').classList.remove("d-none");
    }
    else {
      tabHeader.classList.remove("active");
      document.getElementById(tabHeader.id + '-area').classList.add("d-none");
    }
  })
}





//SQL PARAM 


sqlString.addEventListener("blur", () => {
  fnRender();
})

function fnRender() {
  var sqlStr = sqlString.value;
  if (sqlStr != undefined && sqlStr != null && sqlStr.toString().trim() !== '') {
    var params = sqlStr.substr(sqlStr.indexOf("param:"), sqlStr.length).replace("param:", "");
    var arrSqlParam = params.split('][').join(']|[').split("|");
    console.log(arrSqlParam);
    var param = [];
    for (var idx in arrSqlParam) {
      var arrTmp = arrSqlParam[idx].split("-");
      if (arrTmp[1] == undefined || arrTmp == null)
        return;
      param.push(arrTmp[1].substring(0, arrTmp[1].length - 1));

      var replaceVal = arrTmp[1].substring(0, arrTmp[1].length - 1);
      if (replaceVal == "NULL") {
        sqlStr = sqlStr.replace("?", "NULL");
        continue;
      }
      sqlStr = sqlStr.replace("?", "\'" + replaceVal + "\'");
    }
    sqlResult.value = sqlStr.substring(0, sqlStr.indexOf("> param"));
    sqlResult.focus();
    sqlResult.select();
    document.execCommand('copy');
  }
}

clearSqlParamBtn.addEventListener("click", () => {
  sqlString.value = "";
  sqlResult.value = ""
})













// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

// chrome.scripting.executeScript({
//   target: { tabId: tab.id },
//   function: setPageBackgroundColor,
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// // The body of this function will be execuetd as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }