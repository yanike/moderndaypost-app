class Config {
	constructor() {
		this.app_name = "Modern-Day Post";
		this.app_author = "Yanike Mann";
		this.app_company = "Yurjo";
	}
}

const allArticles = document.getElementById("all_articles");
const searchButton = document.getElementById("search_button");

// Search object
let search = {
	processing: false,
	term: "",
	category: "",
	count: 10,
	offset: 0,
	type: "search",
	set searchTerm(term) {
		this.searchTerm = term;
	},
	set searchOffset(offset) {
		this.searchTerm = term;
	}
}

/**
 * Makes API call to Modern-Day Post to get articles
 *
 * @param {string} query
 * @param {number} count
 * @param {number} offset
 * @returns {json} articles
 */
function apiCallSearch(query, count, offset) {
	console.log("apiCallSearch... start");

	if (search.processing == false) {
		search.processing = true;
		// Get configurations
		config = new Config();

		// Construct the request url
		var url = "https://moderndaypost.com/wp-json/rest/v1/category/";

		// Return the request response
		var newsJson;

		$.ajax({
			url: url + query + "/" + offset, //+ "&count=" + count + "&mkt=" + mkt + "&safeSearch=" + safeSearch,
			type: "GET",
			/*
			beforeSend: function (xhr) {
				xhr.setRequestHeader(config.ocp_key, config.ocp_apim_subscription_key);
			},
			*/
			success: function (data) {
				buildArticles(data);
				search.processing = false;
			}
		});
	}

	console.log("apiCallSearch... end");
}

/**
 * Makes API call to Azure Bing Search to get category news articles
 *
 * @param {string} category
 * @param {number} count
 * @param {number} offset
 * @returns {json} articles
 */
function apiCallCategory(category, count, offset) {
	console.log("apiCallCategory... start");

	if (search.processing == false) {
		search.processing = true;
		// Get configurations
		config = new Config();

		// Construct the request url
		var url = "https://moderndaypost.com/wp-json/rest/v1/category/";

		// Return the request response
		var newsJson;

		$.ajax({
			url: url + category + "/" + offset, //+ "&count=" + count,
			type: "GET",
			/*
			beforeSend: function (xhr) {
				xhr.setRequestHeader(config.ocp_key, config.ocp_apim_subscription_key);
			},
			*/
			success: function (data) {
				if(data){
					buildArticles(data);
					search.processing = false;
				}
			},
			error: function (data){
				search.processing = false;
			}
		});
	}

	console.log("apiCallCategory... end");
}

/**
 * Builds the articles on the app screen
 *
 * @param {json} data
 */
function buildArticles(data) {
	console.log("buildArticles... start");

	for (var i in data) {
		var article = data[i];

		// Split news image URL to get Hi-Res URL
		var articleImage;

		if (article.hasOwnProperty("image")){
			var articleImage = article.image;
		} else {
			var newsImage = "imaes/yurjo_news_image_placeholder.jpg";
			var articleImage = newsImage;
		}

		// Article Information
		var articleTitle = article.post_title;
		var articleDescription = article.summary;
		var articleLink = article.guid;
		var articleProvider = "Modern-Day Post";
		var articleDate = article.post_modified_gmt;
		var d = new Date(articleDate);
		var articleDate = d.toLocaleDateString();

		// Generate new article
		var newArticle = "<article class='media'><figure class='media-left'>" +
			"<p class='image is-128x128'>" +
			"<img id='image' src='" + articleImage + "'>" +
			"</p></figure><div class='media-content'><div class='content article'>" +
			"<div class='article_title'>" + articleTitle + "</div>" +
			"<div class='article_description'>" + articleDescription + "</div>" +
			"<small><a href='" + articleLink + "' target='_blank'>Read more</a> @" + articleProvider + " | " + articleDate + "</small>" +
			"</div></div></div></article>";

		allArticles.innerHTML += newArticle;
	}

	console.log("buildArticles... end");
}

// Reached the bottom of the scroll and load more articles
$("#all_articles").scroll(function () {

	// Calculate the scroll top and height together to see if they match
	// or greater than scrollHeight - 150
	if (($("#all_articles").scrollTop() + $("#all_articles").height()) >= (document.getElementById("all_articles").scrollHeight - 150)) {
		search.offset = search.offset + 10;

		if(search.type == "search"){
			apiCallSearch(search.term, search.count, search.offset);
		} else if(search.type == "category") {
			apiCallCategory(search.category, search.count, search.offset);
		}
	}
});

// Search button
$("#search_button").click(function () {
	allArticles.innerHTML = "";
	search.term = document.getElementById("search_box").value;
	search.offset = 0;
	search.type = "search";
	apiCallSearch(search.term, search.count, search.offset);
});

// Auto button
$("#search_auto_button").click(function () {
	allArticles.innerHTML = "";
	search.offset = 0;
	search.category = "automotive";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);
});

// Business button
$("#search_business_button").click(function () {
	allArticles.innerHTML = "";
	search.offset = 0;
	search.category = "business";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);
});

// Entertainment button
$("#search_entertainment_button").click(function () {
	allArticles.innerHTML = "";
	search.offset = 0;
	search.category = "entertainment";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);
});

// Food button
$("#search_food_button").click(function () {
	allArticles.innerHTML = "";
	search.offset = 0;
	search.category = "food";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);
});

// Lifestyle button
$("#search_lifestyle_button").click(function () {
	allArticles.innerHTML = "";
	search.offset = 0;
	search.category = "lifestyle";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);
});

// Miscellaneous button
$("#search_miscellaneous_button").click(function () {
	allArticles.innerHTML = "";
	search.offset = 0;
	search.category = "uncategorized";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);
});

// News button
$("#search_news_button").click(function () {
	allArticles.innerHTML = "";
	search.offset = 0;
	search.category = "news";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);
});

// Sports button
$("#search_sports_button").click(function () {
	allArticles.innerHTML = "";
	search.offset = 0;
	search.category = "sports";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);
});

// Tech button
$("#search_tech_button").click(function () {
	allArticles.innerHTML = "";
	search.offset = 0;
	search.category = "technology";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);
});

// Yurjo button
$("#search_mdp_button").click(function () {
	window.open("https://www.moderndaypost.com", "_blank");
});

/**
 * Get the top news articles from Bing Search
 *
 * @returns articles - JSON format
 */
 function getNewsArticles() {
	console.log("getNewsArticles... start");
	search.offset = 0;
	search.category = "news";
	search.type = "category";
	apiCallCategory(search.category, search.count, search.offset);

	console.log("getNewsArticles... end");
}

// Run on startup
getNewsArticles();
