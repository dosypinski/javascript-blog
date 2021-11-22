
{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);

    targetArticle.classList.add('active');
  };


  const optArticleSelector = '.post';
  const  optTitleSelector = '.post-title';
  const  optTitleListSelector = '.titles';
  const  optArticleTagsSelector = '.post-tags .list';
  const  optArticleAuthorSelector = '.post-author';


  const generateTitleLinks = function(customSelector = '') {

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    let html = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for (let article of articles){

      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      html = html + linkHTML;

    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const generateTags = function(){
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      let html = '';

      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for (let tag of articleTagsArray){
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        html = html + linkHTML;
      }
      tagsWrapper.innerHTML = html;
    }
  };

  generateTags();

  const tagClickHandler = function(event){
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-','');
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let tagLink of tagLinks){
      tagLink.classList.remove('active');
    }

    const tagEqualLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let tagEqualLink of tagEqualLinks){
      tagEqualLink.classList.add('active');
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function(){

    const tags = document.querySelectorAll('a[href^="#tag-"]');

    for (let tag of tags) {
      tag.addEventListener('click', tagClickHandler);
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);

      let html = '';

      const authorTag = article.getAttribute('data-author');
      const linkHTML = `<a href="#author-${authorTag}">${authorTag}</a>`;

      html = html + linkHTML;

      authorsWrapper.innerHTML = html;
    }
  };
  generateAuthors();

  const authorClickHandler = function(event){

    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    for (let authorLink of authorLinks){

      authorLink.classList.remove('active');
    }

    const authorEqualLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let authorEqualLink of authorEqualLinks){
      authorEqualLink.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function(){

    const authors = document.querySelectorAll('a[href^="#author-"]');

    for (let author of authors){
      author.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();
}
