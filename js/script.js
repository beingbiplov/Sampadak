

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