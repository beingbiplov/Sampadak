

var myCodeMirror = CodeMirror(document.getElementById('editor_section'), {
			lineNumbers: true,
			lineWrapping: true,
			spellcheck: true,
		 	mode:  "markdown",
		    highlightFormatting: true,
		    styleActiveLine: true,
		    autoCloseBrackets: true,
		    highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
		    extraKeys: {
		        "F11": function(cm) {
		          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
		        },
		        "Esc": function(cm) {
		          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
		        }
		      }
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

default_text = `# SAMPADAK
Sampadak is an online Markdown editor with the live preview support. You can type your markdown on the editor and see the real time HTML on the preview section.

## Features:
- Markdown to HTML live preview.
- Export the document as a Markdown or an HTML file.
- Three different theme support.
- Fullscreen editor support. (Press F11 while on editor to enter fullscrene and Esc to exit out)

### Markdown?
>Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML).

## Tech Stack
Sampadak make use of some awesome open source projects:
- [CodeMirror] : A versatile text editor implemented in JavaScript for the browser.
- [Showdownjs] : A Markdown to HTML bidirectional converter.
- [Django] : A high-level Python Web framework that encourages rapid development and clean, pragmatic design
- [Bootstrap] : An open source toolkit for developing with HTML, CSS, and JS.
- [jQuery] :  A fast, small, and feature-rich JavaScript library.

## Want to contribute?
Sampadak is in early stages of development. You can visit our repository on [Github] to contribute to the project. You can report a bug or  recommend new features.
**You can help Sampadak be Great.**
<br>
## License
MIT

### *Build something Great Today!!*

[CodeMirror]: <https://codemirror.net/>
[Showdownjs]: <http://showdownjs.com/>
[Bootstrap]: <https://getbootstrap.com/>
[jQuery]: <https://jquery.com/>
[Django]: <https://www.djangoproject.com/>
[GitHub]: <https://github.com/>
`
myCodeMirror.setValue(default_text);
$('#preview_section').html(markdown_to_html());


var input = document.getElementById("select");
function selectTheme() {
    var theme = input.value;
    myCodeMirror.setOption("theme", theme);
    
  }
  var choice = (location.hash && location.hash.slice(1)) ||
               (document.location.search &&
                decodeURIComponent(document.location.search.slice(1)));
  if (choice) {
    input.value = choice;
    myCodeMirror.setOption("theme", choice);
  }
  CodeMirror.on(window, "hashchange", function() {
    var theme = location.hash.slice(1);
    if (theme) { input.value = theme; selectTheme(); }
  });

function export_html(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
function export_markdown(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/markdown;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

// Start file download.
function export_as_html(){
	var text = markdown_to_html();
	var filename = document.getElementById('file_name').value;
	if (filename.length ==0){
		filename = "Sampadak_.html"
	}
	export_html(filename, text);
}

function export_as_markdowm(){
	var text = myCodeMirror.getValue();
	var filename = document.getElementById('file_name');
	if (filename.length ==0){
		filename = "Sampadak_.md"
	}
	export_markdown(filename, text);
}


$(document).ready(function() {
	$('.preview_md_toggle').on('click',
			function(){
				$('.editor_div, .preview_div').toggle();
				$('#preview_toggle, #markdown_toggle').toggle();
			})

	$(window).resize(function() {
        // This will fire each time the window is resized:
        if($(window).width() >= 768) {
            // if larger or equal
            $('.editor_div').show();
            $('.preview_div').show();
            $('#preview_toggle').hide();
            $('#markdown_toggle').hide();
        } 
        if($(window).width() < 768) {
        	$('#preview_toggle').show();
        	$('.preview_div').hide()
        }
    }).resize();


}
)