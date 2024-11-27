
export const mapper = (remoteName: string, baseUrl: string) => {
  const extractFragment = (resp: string, tagName: string, key = '', value = '') => {
    const startTag = (key && value) ? `<${tagName} ${key}="${value}"` : `<${tagName}`;
    const start = resp.indexOf(startTag);
    const end = resp.indexOf('</' + tagName + '>', start);
  
    if (start === -1 || end === -1) {
      return '';
    }
    let html = resp.substring(start, end + tagName.length + 3);
    return html;
  }

  return (html: string) => {
    const comp = extractFragment(html, remoteName);

    const style = extractFragment(html, 'style', 'ng-app-id', remoteName);
    const state = extractFragment(
      html,
      'script',
      'id',
      remoteName + `-state`
    );
  
    return `${comp}\n${style}\n${state}`;
  }
}