import '../style.css'
import { content } from './content'

const app = document.querySelector<HTMLDivElement>('#app')!

const routes: Record<string, () => void> = {
  '/': renderHome,
  '/about': renderAboutOverview,
  '/about/vision': renderAboutVision,
  '/about/board': renderAboutBoard,
  '/about/history': renderAboutHistory,
  '/membership': renderMembershipOverview,
  '/membership/procedure': renderMembershipProcedure,
  '/membership/member-institutions': renderMembershipInstitutions,
  '/membership/obligations': renderMembershipObligations,
  '/programs': renderPrograms,
  '/contact': renderContact,
}

function renderLayout(innerHtml: string) {
  const currentPath = window.location.hash.slice(1) || '/'

  app.innerHTML = `
    <header class="container">
      <div class="header-top">
        <a href="#/">
          <img src="logo.jpg" alt="CASLS Logo" class="logo-img">
        </a>
        <h1 class="site-title">CASLS</h1>
        <p class="tagline">The Consortium of Academic and Special Libraries of Saskatchewan</p>
      </div>
      <nav>
        <ul class="nav-links">
          <li><a href="#/" class="${currentPath === '/' ? 'active' : ''}">Home</a></li>
          <li class="has-dropdown">
            <a href="#/about" class="${currentPath.startsWith('/about') ? 'active' : ''}">About CASLS</a>
            <ul class="dropdown-menu">
              <li><a href="#/about">Overview</a></li>
              <li><a href="#/about/vision">Vision, Mission & Values</a></li>
              <li><a href="#/about/board">Board of Directors</a></li>
              <li><a href="#/about/history">History</a></li>
            </ul>
          </li>
          <li class="has-dropdown">
            <a href="#/membership" class="${currentPath.startsWith('/membership') ? 'active' : ''}">Membership</a>
            <ul class="dropdown-menu">
              <li><a href="#/membership/procedure">Application Procedure</a></li>
              <li><a href="#/membership/member-institutions">Member Institutions</a></li>
              <li><a href="#/membership/obligations">Obligations of Membership</a></li>
            </ul>
          </li>
          <li><a href="#/programs" class="${currentPath === '/programs' ? 'active' : ''}">Programs</a></li>
          <li><a href="#/contact" class="${currentPath === '/contact' ? 'active' : ''}">Contact Us</a></li>
        </ul>
      </nav>
    </header>
    <main class="container">
      <div class="entry-content">
        ${innerHtml}
      </div>
    </main>
    <footer>
      <div class="container text-center">
        <p>&copy; ${new Date().getFullYear()} CASLS – The Consortium of Academic and Special Libraries of Saskatchewan</p>
      </div>
    </footer>
  `
}

function renderHome() {
  renderLayout(`
    <section>
      <h1>${content.home.title}</h1>
      ${content.home.body}
    </section>
  `)
}

function renderAboutOverview() {
  renderContentPage(content.about.overview.title, content.about.overview.body)
}

function renderAboutVision() {
  renderContentPage(content.about.vision.title, content.about.vision.body)
}

function renderAboutBoard() {
  renderContentPage(content.about.board.title, content.about.board.body)
}

function renderAboutHistory() {
  renderContentPage(content.about.history.title, content.about.history.body)
}

function renderMembershipOverview() {
  // Default to procedure page for now, or could serve as a landing
  renderContentPage('Membership', `
    <p>Please select a submenu item:</p>
    <ul>
      <li><a href="#/membership/procedure">Application Procedure</a></li>
      <li><a href="#/membership/member-institutions">Member Institutions</a></li>
      <li><a href="#/membership/obligations">Obligations of Membership</a></li>
    </ul>
  `)
}

function renderMembershipObligations() {
  renderContentPage(content.membership.obligations.title, content.membership.obligations.body)
}

function renderMembershipProcedure() {
  renderContentPage(content.membership.procedure.title, content.membership.procedure.body)
}

function renderMembershipInstitutions() {
  const createCard = (m: any) => `
    <div class="member-card">
      <div class="member-logo">
        <img src="${m.logo}" alt="${m.name} logo">
      </div>
      <a href="${m.link}" target="_blank" rel="noopener noreferrer">${m.name}</a>
    </div>
  `;

  // @ts-ignore
  const fullHtml = content.membership.institutions.full.map(createCard).join('');
  // @ts-ignore
  const associateHtml = content.membership.institutions.associate.map(createCard).join('');

  renderLayout(`
    <section>
      <h1>${content.membership.institutions.title}</h1>
      
      <h2>Full Members</h2>
      <div class="member-grid">
        ${fullHtml}
      </div>

      <h2>Associate Members</h2>
      <div class="member-grid">
        ${associateHtml}
      </div>
    </section>
  `)
}


function renderPrograms() {
  renderLayout(`
    <section>
      <h1>${content.programs.title}</h1>
      ${content.programs.body}
    </section>
  `)
}

function renderContact() {
  renderLayout(`
    <section>
      <h1>${content.contact.title}</h1>
      ${content.contact.body}
    </section>
  `)
}

// Renamed from renderSubNavLayout as it no longer has sub-nav sidebar
function renderContentPage(title: string, bodyContent: string) {
  renderLayout(`
    <section>
      <h1>${title}</h1>
      <div class="page-body">
        ${bodyContent}
      </div>
    </section>
  `)
}

function router() {
  const path = window.location.hash.slice(1) || '/'
  const render = routes[path] || renderHome
  render()
  window.scrollTo(0, 0)
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)
router()
