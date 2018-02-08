export function unescapeHTMLSymbol(string) {
			if (string && string.length > 0) {
				string = string.replace(/&amp;/g, '&');
				string = string.replace(/&lt;sub&gt;/g, '<sub>');
				string = string.replace(/&lt;\/sub&gt;/g, '</sub>');
				string = string.replace(/&lt;sup&gt;/g, '<sup>');
				string = string.replace(/&lt;\/sup&gt;/g, '</sup>');
			}
			return string;
		}