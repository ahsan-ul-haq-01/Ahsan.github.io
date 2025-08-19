// Minimal dark mode toggle logic
document.addEventListener('DOMContentLoaded', function() {
  var toggleBtn = document.getElementById('darkModeToggle');
  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      toggleBtn.innerHTML = '<i class="fa fa-sun-o"></i>';
    } else {
      toggleBtn.innerHTML = '<i class="fa fa-moon-o"></i>';
    }
  });
});
(function($) {
  "use strict";
  document.getElementById("feedback-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        message: this.message.value
    };

    // 🚨 Replace with your Google Apps Script Web App URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbwRPWlTfJSM7PbW6jfbvO6Z4GzE5dnAdD9bUMBC6IKqtXVXDbkuDtztwFZWs3R5bbY9/exec";

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(response => {
        if (response.result === "success") {
            document.getElementById("feedback-success").style.display = "block";
            this.reset();
            setTimeout(() => {
                document.getElementById("feedback-success").style.display = "none";
            }, 4000);
        }
    })
    .catch(err => console.error("Error!", err));
});

  // Page scrolling using jQuery easing
  $(document).on('click', 'a.page-scroll', function(event) {
    var $anchor = $(this);
    var target = $($anchor.attr('href'));
    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: (target.offset().top - 60)
      }, 900, 'easeInOutExpo');
      event.preventDefault();
    }
  });

  // Highlight top nav on scroll
  $('body').scrollspy({ target: '.navbar-fixed-top', offset: 120 });

  // Close responsive menu on item click
  $('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
  });

  // Affix / offset for Main Navigation (Bootstrap v3)
  $('#mainNav').affix({ offset: { top: 80 } });

  // On DOM ready
  $(document).ready(function() {
    // Auto-hide feedback success message after 4s & clear form if success=1
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
      // scroll to feedback so user sees it
      setTimeout(function() {
        var $feedback = $('#feedback');
        if ($feedback.length) {
          $('html, body').animate({ scrollTop: $feedback.offset().top - 60 }, 600);
        }
      }, 200);

      // fade out message after 4 seconds
      setTimeout(function() {
        $(".alert-success").fadeOut("slow");
      }, 4000);

      // clear inputs immediately (page was reloaded with ?success=1)
      $(".feedback-form")[0] && $(".feedback-form")[0].reset();
    }

    // Lecture-card click behavior placeholder (makes them focusable / clickable)
    $('.lecture-card').on('click keypress', function(e) {
      if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
        // placeholder - you can add a modal or redirect
        var title = $(this).attr('data-title') || 'Lecture';
        alert('Open lecture: ' + title + '\nReplace this alert with modal or link to lecture content.');
      }
    });

  });

})(jQuery);
