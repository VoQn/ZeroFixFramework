# ZeroFixFramework
# Module:    Example Fix
# Version:   v0.3.0
# Copyright: VoQn
# License:   MIT
###
Customized ZERO watch page
###
zero_fix.set_conf
  stylesheet :
    '#videoHeader, #ichibaPanel, #playerCommentPanel' :
      display : 'none'
  options : () ->
    $q = ( q ) -> document.querySelectorAll q
    tag_blind = $q '.filter'
    tag_blind.parentNode.removeChild tag_blind
    return

