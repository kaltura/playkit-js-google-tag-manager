/*
   These tags have been copied from
   https://tagmanager.google.com/#/admin/accounts/1111673187/containers/68727907/install?containerDraftId=9
*/
export const HEAD_TAG = `
(function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-XXXXXX');
`;

export const BODY_TAG = `
     <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
              height="0"
              width="0"
              style="display:none;
              visibility:hidden">
      </iframe>
    </noscript>
 `;
