# ZeroFixFramework
# Module:    Example Fix
# Version:   v0.1.0
# Copyright: VoQn
# License:   MIT
###
Customized ZERO watch page
###
zero_fix.set_conf
  stylesheet:
    '#videoHeader, #ichibaPanel, #playerCommentPanel, #videoInformationWrapper, #textMarquee, #playlist':
      display: 'none'
    '#playerContainer':
      padding: '0 0 5px 5px'
      margin: '0'
    '#playerCommentPanelOuter:hover':
      opacity: '1'
    '#playerCommentPanelOuter':
      opacity: '0.3'
    '#playerCommentPanelOuter > #videoInformation':
      background: '-webkit-linear-gradient(left,rgba(0,0,0,0.3),rgb(0,0,0)) no-repeat'
      color: 'white'
      'text-align': 'left'
      padding: '5px'
      height: '100%'
    '#playerCommentPanelOuter #videoThumbnailImage':
      display: 'none'
    '#playerCommentPanelOuter #videoInfoHead .videoPostedAt':
      'font-size': '8pt'
    '#playerCommentPanelOuter #videoInfoHead .videoTitleText':
      display: 'block'
    '#playerCommentPanelOuter #userProfile .userIcon':
      float: 'left'
      height: '43px'
      width: '43px'
    '#searchResultExplorer':
      margin: '0 auto'
      'margin-right': '8px'
    '#playerCommentPanelOuter #userProfile .profile':
      float: 'left'
      'padding-left': '10px'
    '#playerCommentPanelOuter #videoShareLinks':
      clear: 'both'
      'padding-top': '10px'
    '#playerCommentPanelOuter #videoStats li span':
      display: 'inline-block'
      'font-weight': 'bold'
      'padding-left': '10px'
    '.oldType':
      background: '#000'
      'border-radius': '5px'
      'margin-top': '5px'
    '.oldType .commentInner':
      'box-shadow':
        'inset #666 0px 1px, inset #666 1px 0, inset #666 0 -1px'
      'border-radius': '5px'
    '.oldType .commandInput':
      'border-right': '1px solid #333'
    '.oldType .commentInput input':
      color: '#fff'
    '.oldType .commentSubmit input':
      'text-shadow': 'none'
      color: '#fc6'
      'border': 'thin solid #960'
      'border-radius': '0 4px 4px 0'
      'background':
        '#000 -webkit-linear-gradient(#543, #432 50%, #321 50%, #210) no-repeat'
      'box-shadow': 'inset 0 0 5px #963'
  restruct : () ->
    $i = ( i ) -> document.getElementById i
    $q = ( q ) -> document.querySelector q
    lazy_fix = () ->
      tag_blind = $q '.filter'
      tag_blind.parentNode.removeChild tag_blind
      _info = $i 'videoInformation'
      info  = _info.cloneNode yes
      comment_view = $i 'playerCommentPanel'
      comment_view.parentNode.appendChild info, comment_view
      _info.parentNode.removeChild _info
      return
    setTimeout lazy_fix, 3000
    return
