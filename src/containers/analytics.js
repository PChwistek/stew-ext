(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga')


window.ga_debug = {trace: true}
ga('create', 'UA-140783934-3', 'auto')

ga('set', 'checkProtocolTask', null); // Disables file protocol checking.
ga('send', 'pageview', '/popup'); // Set page, avoiding rejection due to chrome-extension protocol 


export function trackOpenExtension(userId) {
  ga('send', 'event', 'popup', 'opened')
}

export function trackLogin(isSuccess) {
  ga('send', 'event', 'auth', `login-${isSuccess ? 'success': 'failed'}`)
}

export function trackLogout() {
  ga('send', 'event', 'auth', 'logout')
}

export function trackViewSettings() {
  ga('send', 'event', 'nav', 'settings')
}

export function viewRecipe() {
  ga('send', 'event', 'nav', 'recipe-detail')
}

export function openCreate() {
  ga('send', 'event', 'nav', 'create')
}

export function launchedRecipe(fromListView) {
  ga('send', 'event', 'recipe', `launch-${fromListView ? 'from-list': 'from-detail'}`)
}


//add analytics events