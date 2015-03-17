// predpoklada se, ze dany element obsahuje jen jeden submit
// va     validovat
// vaS    string
// vaIC   IC
// vaDIC  DIC
// vaI    integer
// vaPSC  PSC
// vaE    email
// vaT    telefon (cz)
// vaAE   muze byt prazdne

(function( $ ){
  $.fn.validate = function(options) {
	var defaults = {
		scrollToErr: true
	}
	var options = $.extend(defaults, options);

    this.each(function() {
		
		var obj = $(this);
		
		function validate(e) {
			va = new Array ('vaS', 'vaIC', 'vaDIC', 'vaI', 'vaPSC', 'vaE', 'vaT');
			e.val($.trim(e.val()))
			rule = intersect(va, e.attr('class').split(' '));
			switch (rule[0]) {
				case 'vaS' :
					var result = (e.val().length > 0)
					break;
			    case 'vaE':
			        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			        var result = re.test(e.val())
					break;
				case 'vaT' :
					var patt1 = new RegExp ('^([0-9]){9}$');
					var patt2 = new RegExp ('^\\+([0-9]){12}$');
					var result = patt1.test(e.val().replace(/ /g, '')) || patt2.test(e.val().replace(/ /g, ''))

					if (result) {
					    e.val(e.val().replace(/ /g, ''))
					    e.val(e.val().replace(/(\d{3})/g, '$1 '))
						e.val(e.val().slice(0, -1));
					}
					break;
				case 'vaIC':
					patt = new RegExp ('^([0-9]){8}$')
					var result = patt.test(e.val().replace(/ /g, ''))
					if (result) { e.val(e.val().replace(/ /g, '')) }
					break;
				case 'vaDIC':
					patt = new RegExp ('^([A-Za-z]){2}([0-9]){8,10}$')
					var result = patt.test(e.val().replace(/ /g, ''))
					if (result) { e.val(e.val().replace(/ /g, '')) }
					break;
				case 'vaI':
					patt = new RegExp("^\\d*$");
					var result = patt.test(e.val())
					break;
				case 'vaPSC':
					var patt = new RegExp("^\\d{3} ?\\d{2}$");
					var result = patt.test(e.val()) 
					break;
			}
			if (e.val() == '') { result = false }
			if (result) {
			    e.parent().addClass('correct').removeClass('error')
			} else {
			    e.parent().addClass('error').removeClass('correct')
			}
			if ((e.val() == '') && (e.hasClass('vaAE'))) { e.parent().removeClass('error').removeClass('correct') }
		}

		function intersect(arr1, arr2) {
		    var temp = new Array()
		    for (var i = 0; i < arr1.length; i++) {
		        for (var j = 0; j < arr2.length; j++) {
        		    if (arr1[i] == arr2[j]) {
                		temp[temp.length] = arr1[i];
		            }
        		}
		    }
		    return temp;
		}

		$(this).find('.va').blur(function () { validate($(this)) })
		$(this).find('input[type="submit"]').click(function (e) {
			obj.find(".va:visible").each(function(i,e) { validate($(this)) })
			if ($('.error:visible', obj).length > 0) {
				e.preventDefault()
				if (options.scrollToErr) {
				    t = obj.find('.error .va:visible').first().offset()
				    $('html, body').animate({ scrollTop: t.top - 100 }, 300);
				}
			} else {
			    $('.error .va', obj).val('')
			}
		})

    });

  };
})( jQuery );