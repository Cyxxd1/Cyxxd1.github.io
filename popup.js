// popup.js
$(document).ready(function() {
  // Listen for clicks on both experience-box and projects-box
  $('.experience-box, .projects-box').on('click', function() {
    // Grab the heading text
    var title = $(this).find('h2').text();

    // Grab the hidden content from .popup-content
    var content = $(this).find('.popup-content').html() || "";

    var winId = 'popup-' + Date.now();

    // Build the popup HTML
    var $popup = $(`
      <div class="win98">
        <div class="window" id="${winId}">
          <div class="title-bar">
            <div class="title-bar-text">${title}</div>
            <div class="title-bar-controls">
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div>
          </div>
          <div class="window-body">
            <!-- Insert both the heading and hidden paragraphs into the popup -->
            <h2>${title}</h2>
            ${content}
          </div>
        </div>
      </div>
    `);

    // Append to #popup-container
    $('#popup-container').append($popup);

    if (title.trim() === "BumpLess" || title.trim() === "Photovoltaic Engineering (Intern)" || title.trim() === "Maze Solver" || title.trim() === "Fishing Website") {
      // For BumpLess and Photovoltaic Engineering, set a taller popup
      $popup.find('.window').css({
        width: '600px',
        height: '710px'
      });
    } else {
      // Default size for other popups
      $popup.find('.window').css({
        width: '600px',
        height: '500px'
      });
    }
    

    // Draggable + Resizable
    $popup.find('.window').draggable({ handle: ".title-bar" }).resizable({
      handles: "n, e, s, w, ne, se, sw, nw"
    });

    // Center on screen
    $popup.find('.window').css({
      top: 100,
      left: ($(window).width() - 400) / 2
    });

    // Close
    $popup.find('.title-bar-controls button[aria-label="Close"]').on('click', function() {
      $popup.remove();
    });

    // Maximize
    $popup.find('.title-bar-controls button[aria-label="Maximize"]').on('click', function() {
      var $win = $popup.find('.window');
      var $btn = $(this);
      if (!$win.hasClass('maximized')) {
        $win.data('prevPosition', { top: $win.css('top'), left: $win.css('left') });
        $win.data('prevSize', { width: $win.width(), height: $win.height() });
        $win.addClass('maximized').resizable("disable");
        $win.animate({
          top: 0,
          left: 0,
          width: $(window).width(),
          height: $(window).height()
        }, 300);
      } else {
        var prevPos = $win.data('prevPosition');
        var prevSize = $win.data('prevSize');
        $win.removeClass('maximized').resizable("enable");
        $win.animate({
          top: prevPos.top,
          left: prevPos.left,
          width: prevSize.width,
          height: prevSize.height
        }, 300);
        $btn.html(""); // reset icon or text
      }
    });
  });
});
