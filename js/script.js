document.addEventListener("DOMContentLoaded", function () {

  const navBanner = document.getElementById('display-nav-banner')
  const navBtn = document.getElementById('tsl-site-nav-btn')
  const tslSiteMenu = document.querySelector('.tsl-site-nav-menu')
  const tslCloseSiteBtn = document.querySelector('.tsl-close-nav-menu')
  const tslSiteMenuLinks = document.querySelectorAll('.tsl-site-nav-link')
  const tslModalHeader = document.querySelector('.tsl-modal-header')
  const tslBtnWs = document.querySelectorAll('.btn-site-nav-ws')
  const tslPanelContent = document.querySelectorAll('.tsl-site-header-panel-content')
  const tslMainPanel = document.getElementById('tsl-header-panel')
  const tslBtnNavEffect = document.querySelectorAll('.tsl-nav-effect')
  const tslBodySite = document.getElementById('body-animation')
  const tslFooterBtns = document.querySelectorAll('.tsl-footer-hide')
  const anchore = document.querySelectorAll('a')
  const tslPanelBg = document.querySelector('.tsl-header-panel-bg')
  const modal = document.querySelector(".modal");
  const openModalButton = document.getElementById("nav-banner-popup");
  const closeButton = document.querySelector(".close-button");
  const modalBg = document.querySelector(".tsl-modal-bg");
  
  anchore.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
    })
  })

  setTimeout(() => {
    navBanner.classList.add('show')
  }, 700);

  const getNavElementText = (link) => {
    const childNode = link.children[0]
    if (childNode.classList.contains("tsl-site-nav-link-text")) {
      const textLink = link.querySelector('.tsl-site-nav-link-text').textContent
      appendElementToNav(textLink, link)
      removeLinks()
    } else {
      return
    }
  }

  const toggleAriaAtribute = (link) => {
    const linkAtribute = link.getAttribute('aria-hidden')
    if (linkAtribute === 'true') {
      link.setAttribute("aria-hidden", "false");
    } else {
      link.setAttribute("aria-hidden", "true");
    }
  }

  const displayNavContent = (link) => {
    const navContent = link.nextElementSibling
    navContent.classList.toggle('hidde')
    toggleAriaAtribute(navContent)
  }

  const appendElementToNav = (text, link) => {
    const h2Element = document.createElement('h3')
    const arrowBack = document.createElement('button')
    arrowBack.classList.add('btn','tsl-close-nav-menu', 'd-flex')
    h2Element.classList.add('py-font-weight')
    h2Element.innerHTML = `${text}`
    tslModalHeader.appendChild(h2Element)
    arrowBack.innerHTML = `
  <svg class="tsl-modal-close-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.025 13.25a.748.748 0 0 1-1.281.53l-5.25-5.264a.75.75 0 0 1 0-1.06L9.717 2.22a.75.75 0 1 1 1.062 1.06L6.084 7.986l4.722 4.734a.748.748 0 0 1 .219.53z"></path></svg>  
  `
    tslModalHeader.appendChild(arrowBack)
    arrowBackEvent(arrowBack, h2Element, link)
    displayNavContent(link)
  }

  const removeLinks = () => {
    tslSiteMenuLinks.forEach(link => {
      link.classList.toggle('hidde')
      toggleAriaAtribute(link)
    })
  }

  const arrowBackEvent = (arrow, el, link) => {
    arrow.addEventListener('click', () => {
      el.remove()
      arrow.remove()
      removeLinks()
      displayNavContent(link)
    })
  }

  tslSiteMenuLinks.forEach((link, index) => {
    link.addEventListener('click', () => getNavElementText(link, index))

  })
  
  const removeClassElements = (element, cssclass) => {
    element.forEach((el) => {
      el.classList.remove(cssclass)
    })
  }

  const closeNavPanel = (containery) => {

      if (!containery) {
        removeClassElements(tslPanelContent, 'open-panel-content')
      }

      if (PositionCurrent === pageSectionBreackPointVid) {
        removeClassElements(tslBtnNavEffect, 'transition-btn') 
              tslMainPanel.classList.remove('open-panel')
              navBanner.classList.remove('nav-banner-bg')
              tslPanelBg.classList.remove('tsl-panel-bg')
              removeClassElements(tslBtnWs, 'btn-bg-grey')
    
      } else if (PositionCurrent >= pageSectionBreackPoint) {
        tslBtnNavEffect.forEach((button) => {
          button.classList.add('transition-btn')
        })
        tslMainPanel.classList.remove('open-panel')
        navBanner.classList.remove('nav-banner-bg')
        tslPanelBg.classList.remove('tsl-panel-bg')
        removeClassElements(tslBtnWs, 'btn-bg-grey')
      } else {
        removeClassElements(tslBtnNavEffect, 'transition-btn')
        tslMainPanel.classList.remove('open-panel')
        navBanner.classList.remove('nav-banner-bg')
        tslPanelBg.classList.remove('tsl-panel-bg')
        removeClassElements(tslBtnWs, 'btn-bg-grey')
      }

  }

  let navIsOpen = false

  const openNavContentWs = (btn, index) => {

    if (btn || index) {
      const panel = tslPanelContent[index];
      closeNavPanel()
      panel.classList.add('open-panel-content')
      btn.classList.add('btn-bg-grey')
      navBanner.classList.add('nav-banner-bg')
      tslMainPanel.classList.add('open-panel')
      tslBtnNavEffect.forEach((button) => {
        button.classList.add('transition-btn')
      })
      tslPanelBg.classList.add('tsl-panel-bg')
      return navIsOpen = true
    } else {
      return navIsOpen = false
    }

  }

  let PositionCurrent, pageSectionBreackPoint, pageSectionBreackPointVid

  
  function handleScrollBreakpoint(scrollPosition) {
    
    const pageHeight0 = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
      );

      PositionCurrent = Math.round(scrollPosition)
      pageSectionBreackPoint = Math.round(pageHeight0 / 9 )
      pageSectionBreackPointVid = Math.round((pageHeight0 / 9) * 4)

      if (PositionCurrent === pageSectionBreackPointVid) {
        return removeClassElements(tslBtnNavEffect, 'transition-btn')
      } else if (PositionCurrent >= pageSectionBreackPoint) {
        return tslBtnNavEffect.forEach((button) => {
          button.classList.add('transition-btn')
        })
      } else {
        return removeClassElements(tslBtnNavEffect, 'transition-btn')
      }

}


window.addEventListener('scroll', function() {

  const scrolly = window.scrollY;
  handleScrollBreakpoint(scrolly)

});



window.addEventListener('resize', () => {
  const windowWidth = window.innerWidth;
  if (windowWidth <= 600) {
    tslFooterBtns.forEach((btn) => {
      btn.setAttribute("aria-hidden", "true")
      btn.classList.add('hidde')
    })
  } else {
    tslFooterBtns.forEach((btn) => {
      btn.setAttribute("aria-hidden", "false")
      btn.classList.remove('hidde')
    })
  }
})



  window.addEventListener('mousemove', (event) => {

    const y = event.clientY;
    const target = event.target
    const panelHeight = tslMainPanel.offsetHeight;

    tslBtnWs.forEach((btn, index) => {
      if (target === btn) openNavContentWs(btn, index)
    })

    switch (navIsOpen) {
      case true:
        if (panelHeight < y) closeNavPanel(y)
        
        break;
      case false:
        break;
      default:
        break;
    }
    
  });



  function openModal() {
    modal.classList.toggle('show-modal')
    modalBg.classList.toggle('show-modal-bg')
  }

  const openNavBar = () => {
    tslSiteMenu.classList.toggle('tsl-site-nav-menu-open')
    tslBodySite.classList.toggle('hide-overflow')
    tslSiteMenu.setAttribute("aria-hidden", "false")
  }
  
  const closeNavBar = () => {
    tslSiteMenu.classList.toggle('tsl-site-nav-menu-open')
    tslBodySite.classList.toggle('hide-overflow')
    tslSiteMenu.setAttribute("aria-hidden", "true")
  }

  function closeModal() {
    modal.classList.toggle('show-modal')
    modalBg.classList.toggle('show-modal-bg')

  }

  tslCloseSiteBtn.addEventListener("click", closeNavBar)
  openModalButton.addEventListener("click", openModal);
  navBtn.addEventListener("click", openNavBar);
  closeButton.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modalBg) {
      closeModal();
    }
  });

});