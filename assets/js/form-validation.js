
(function () {
  'use strict'

  window.addEventListener('load', function () {
    var forms = document.getElementsByClassName('needs-validation')

    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('click', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  }, false)
})()
