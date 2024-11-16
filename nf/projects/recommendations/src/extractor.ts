interface ExtractResult {
  head: string[];
  body: string[];
  comp: string[];
}

const HTMLExtractor = (targetElement: string, html: string) => {
  const PREFIX = 'http://localhost:4001/';

  const prefixUrls = (tag: string): string => {
    // Handle src attributes
    tag = tag.replace(/src="([^"]+)"/g, (match, url) => {
      if (url.startsWith('http')) return match;
      return `src="${PREFIX}${url}"`;
    });

    // Handle href attributes
    tag = tag.replace(/href="([^"]+)"/g, (match, url) => {
      if (url.startsWith('http')) return match;
      return `href="${PREFIX}${url}"`;
    });

    return tag;
  };

  const extract = (): ExtractResult => {
    // Extract head content
    const headRegex = /<head[^>]*>([\s\S]*?)<\/head>/i;
    const headContent = html.match(headRegex)?.[1] || '';

    // Extract body content
    const bodyRegex = /<body[^>]*>([\s\S]*?)<\/body>/i;
    const bodyContent = html.match(bodyRegex)?.[1] || '';

    // Function to extract elements with proper handling of style tags
    const extractElements = (content: string): string[] => {
      const elements: string[] = [];
      
      // Handle full style tags with content
      const styleRegex = /<style\b[^>]*>[\s\S]*?<\/style>/gi;
      let match;
      while ((match = styleRegex.exec(content)) !== null) {
        elements.push(match[0]);
      }
      
      // Handle link and script tags
      const otherRegex = /<(?:script|link)\b[^>]*>(?:[\s\S]*?<\/script>)?/gi;
      while ((match = otherRegex.exec(content)) !== null) {
        elements.push(prefixUrls(match[0]));
      }
      
      return elements;
    };

    // Extract target component
    const componentRegex = new RegExp(`<${targetElement}[^>]*>[\\s\\S]*?<\\/${targetElement}>`, 'gi');
    const comp = html.match(componentRegex) || [];

    return {
      head: extractElements(headContent),
      body: extractElements(bodyContent),
      comp
    };
  };

  return { extract };
};

export { HTMLExtractor };
export type { ExtractResult };