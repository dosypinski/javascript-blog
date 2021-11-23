
{
  'use strict';


  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.tags .list';
  const optCloudClassCount = 6;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorsListSelector = '.list .authors';



  const titleClickHandler = function(event) {
    event.preventDefault();

    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  };



  const generateTitleLinks = function(customSelector = '') {

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    let html = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for (let article of articles) {

      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();



  const calculateTagsParams = function(tags) {
    const params = {
      min: 999999,
      max: 0
    };
    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');

      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  };



  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1 ) + 1);
    return optCloudClassPrefix + classNumber;
  };



  const generateTags = function() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for (let tag of articleTagsArray) {
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        html = html + linkHTML;

        if(!allTags[tag]) {
          allTags[tag] = 1;
        }
        else {
          allTags[tag]++;
        }
      }
      tagsWrapper.innerHTML = html;
    }

    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    let allTagsHTML = '';

    for(let tag in allTags){
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + ' " href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ') </a></li>';
      allTagsHTML += tagLinkHTML;
    }

    tagList.innerHTML = allTagsHTML;
  };

  generateTags();



  const tagClickHandler = function(event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-','');
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let tagLink of tagLinks) {
      tagLink.classList.remove('active');
    }

    const tagEqualLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let tagEqualLink of tagEqualLinks) {
      tagEqualLink.classList.add('active');
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
  };



  const addClickListenersToTags = function() {
    const tags = document.querySelectorAll('a[href^="#tag-"]');

    for (let tag of tags) {
      tag.addEventListener('click', tagClickHandler);
    }
  };

  addClickListenersToTags();



  const calculateAuthorParams = function(authorTags) {
    const params = {
      min: 999999,
      max: 0
    };
    for (let authorTag in authorTags) {
      console.log(authorTag + ' is used ' + authorTags[authorTag] + ' times');

      if (authorTags[authorTag] > params.max) {
        params.max = authorTags[authorTag];
      }
      if (authorTags[authorTag] < params.min) {
        params.min = authorTags[authorTag];
      }
    }
    return params;
  };



  const calculateAuthorClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1 ) + 1);
    return optCloudClassPrefix + classNumber;
  };



  const generateAuthors = function() {
    /* [NEW] create a new variable allTags with an empty object */
    let allAuthors = {};
    console.log ('authors:', allAuthors);

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const authorTag = article.getAttribute('data-author');
      const linkHTML = `<a href="#author-${authorTag}">${authorTag}</a>`;
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors[authorTag]) {
      /* [NEW] add tag to allAuthors object */
        allAuthors[authorTag] = 1;
      }
      else {
        allAuthors[authorTag]++;
      }
      authorsWrapper.innerHTML = html;
    }

    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector('.authors');

    /*[NEW] calculate authors parameters */
    const authorParams = calculateAuthorParams(allAuthors);
    console.log('authorParams:', authorParams);

    /* [NEW] find list of authors in right colu
    mn */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allAuthors: */
    for (let authorTag in allAuthors) {

      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const authorlinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[authorTag], authorParams) + ' " href="#author-' + authorTag + '">' + authorTag + '(' + allAuthors[authorTag] + ') </a></li>';
      allAuthorsHTML += authorlinkHTML;

    /* [NEW] END LOOP: for each tag in allAuthors: */
    }
    /*[NEW] add HTML from allAuthorsHTML to tagList */
    authorList.innerHTML = allAuthorsHTML;
  };
  generateAuthors();



  const authorClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    for (let authorLink of authorLinks) {
      authorLink.classList.remove('active');
    }

    const authorEqualLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let authorEqualLink of authorEqualLinks) {
      authorEqualLink.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  };



  const addClickListenersToAuthors = function() {
    const authors = document.querySelectorAll('a[href^="#author-"]');

    for (let author of authors){
      author.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();

}
