

var myCodeMirror = CodeMirror(document.getElementById('editor_section'), {
			lineNumbers: true,
			lineWrapping: true,
			spellcheck: true,
		 	mode:  "markdown",
		    highlightFormatting: true,
		    styleActiveLine: true,
		    autoCloseBrackets: true,
		    highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
		});


function markdown_to_html() {
	showdown.setOption('noHeaderId' , true);
  	var text =  myCodeMirror.getValue(),
      
	converter = new showdown.Converter({
					tables: true, 
					strikethrough: true,
					ghCodeBlocks: true,
					simplifiedAutoLink: true,
					smoothLivePreview: true,
					simpleLineBreaks: true,
					requireSpaceBeforeHeadingText: true,
				}),
	html = converter.makeHtml(text);
    
    return html;
}


$(document).ready(function(){
	$('#editor_section').keyup(function(){
		$('#preview_section').html(markdown_to_html());
	})
})