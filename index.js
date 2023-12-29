var form = document.querySelector('form');
var contentInput = document.getElementById('content');
var urlInput = document.getElementById('url');
var optionSelect = document.getElementById('select');
var display = document.querySelector('.DisplayData')
var charCount = document.querySelector('.charcount')
var toggle_btn = document.querySelector('.toggle_btn');

let filteration = document.querySelectorAll(".filter_btn");

// filteration.forEach(function (elem) {
//     elem.addEventListener("click", function (e) {
//       console.log(e.target.innerHTML);
//       const category_filter = e.target.innerHTML;
//       // Retrieve user data from local storage
//       var UserData = JSON.parse(localStorage.getItem('UserDetail')) || [];
      
//       // Filter data based on the selected option text
//       var filteredData = UserData.filter(function(post) {
//         return post.option === category_filter;
//       });
      
//       if (filteredData.length > 0) {
//         console.log(filteredData);
//       } else {
//         console.log("Data not found");
//       }
//     });
//   });
  




// toggle_btn.addEventListener('click', function () {
//     if (form.style.display === "none") {
//         form.style.display = "block";
//         button.innerText = "Close";
//       } else {
//         form.style.display = "none";
//         button.innerText = "Add More";
//       }
// });

function adddislike(btn, content) { 
    let countdislike = parseInt(btn.querySelector('.counter_dislike').innerText) || 0;
    countdislike += 1;
    btn.querySelector('.counter_dislike').innerText = countdislike;
    let UserData = JSON.parse(localStorage.getItem('UserDetail')) || [];
    let existingPostIndex = UserData.findIndex(post => post.content === content);

    if (existingPostIndex !== -1) {
        UserData[existingPostIndex]["countdislike"] = countdislike; // Note the property name with a space
    }
    localStorage.setItem('UserDetail', JSON.stringify(UserData));
    console.log(UserData);
}

function addlike(btn, content) { 
    let countlike = parseInt(btn.querySelector('.counter_like').innerText) || 0;
    countlike += 1;
    btn.querySelector('.counter_like').innerText = countlike;

    // Retrieve and update the UserDetail array from local storage
    let UserData = JSON.parse(localStorage.getItem('UserDetail')) || [];

    // Find the corresponding object in UserData array based on the url
    let existingPostIndex = UserData.findIndex(post => post.content === content);

    if (existingPostIndex !== -1) {
        // If the post exists in UserData, update the count with the correct property name
        UserData[existingPostIndex]["countlike"] = countlike; // Note the property name with a space
    }

    localStorage.setItem('UserDetail', JSON.stringify(UserData));
    console.log(UserData);
}
	

function addCounter(btn, content) { 
    let count = parseInt(btn.querySelector('.counter_area').innerText) || 0;
    count += 1;
    btn.querySelector('.counter_area').innerText = count;

    // Retrieve and update the UserDetail array from local storage
    let UserData = JSON.parse(localStorage.getItem('UserDetail')) || [];

    // Find the corresponding object in UserData array based on the url
    let existingPostIndex = UserData.findIndex(post => post.content === content);
    if (existingPostIndex !== -1) {
        // If the post exists in UserData, update the count with the correct property name
        UserData[existingPostIndex]["count"] = count; // Note the property name with a space
    }

    localStorage.setItem('UserDetail', JSON.stringify(UserData));
    console.log(UserData);
}


//   character counter
contentInput.addEventListener('input', counter);
function counter() {
	let removespace =  contentInput.value.replace(/\s/g, '')
	charCount.innerHTML = removespace.length + ' char.';
	// let showchar = charCount.replace(/\s/g, '').length;
	// charCount.innerHTML = showchar;
}

window.addEventListener('load', () => {
	displaydata();
	
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	var content = contentInput.value;
	var url = urlInput.value;
	var option = optionSelect.options[optionSelect.selectedIndex].text;

	contentInput.value= " ";
	urlInput.value=" "; 

	// console.log(content, url, option);

	var UserData = JSON.parse(localStorage.getItem('UserDetail')) || [];

	UserData.push({
		'content': content,
		'url': url,
		'option': option,
		'count' : 0 , 
		'countlike':0,
		'countdislike':0
	});

	localStorage.setItem('UserDetail', JSON.stringify(UserData));
	displaydata();
});

let displaydata = (filterOption) => {
    let UserData = JSON.parse(localStorage.getItem('UserDetail')) || [];
    let FinalData = [];
  
    UserData.forEach((Element, index) => {
        debugger
      // Add a condition to filter based on the option
      if (filterOption==='ALL' || filterOption==undefined ||  Element.option === filterOption ) {
        
        FinalData.push(`<div class="mainSec">
          <div class="card_content">
            <div class="card_content_inner">
            <p>${Element.content} <span><a href="${Element.url}">(SOURCE)</a></span></p>
             
            </div>
            <div class="card_content_btn">
              <button class="btn">${Element.option}</button>
            </div>
          </div>
          <div class="card_btn">
            <div><button class="btn_counter" onclick="addCounter(this , '${Element.content}')">😆 <span class='counter_area'>${Element['count']}</span> </button></div>
            <div><button class="btn_counter" onclick="addlike(this , '${Element.content}')">💖 <span class='counter_like'>${Element['countlike'] || 0}</span> </button></div>
            <div><button class="btn_counter" onclick="adddislike(this , '${Element.content}')">👎 <span class='counter_dislike'>${Element['countdislike'] || 0}</span> </button></div>
          </div>
        </div>`);
      }
    });
  
    display.innerHTML = FinalData.join('');
  };
  
  // Example of using the displaydata function with a filter
  filteration.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
      const category_filter = e.target.innerHTML;
      if(!category_filter){
        debugger
        displaydata();
      } else{
        displaydata(category_filter);
      }
      displaydata(category_filter);
    });
  });
  